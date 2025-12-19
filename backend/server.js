const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');
const Chat = require('./models/Chat');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (optional)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// API Routes
app.use('/api', routes);

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a room
    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
        socket.emit('room_joined', room);
    });

    // Leave a room
    socket.on('leave_room', (room) => {
        socket.leave(room);
        console.log(`User ${socket.id} left room: ${room}`);
    });

    // Handle new message
    socket.on('send_message', async (data) => {
        try {
            const { message, username, room = 'general' } = data;

            if (!message || !username) {
                socket.emit('error', { message: 'Message and username are required' });
                return;
            }

            // Save message to database
            const chatMessage = await Chat.create({
                message: message.trim(),
                username: username.trim(),
                room: room.trim()
            });

            // Broadcast message to all users in the room
            io.to(room).emit('receive_message', chatMessage);
        } catch (error) {
            console.error('Error handling message:', error);
            socket.emit('error', { message: 'Failed to send message' });
        }
    });

    // Handle typing indicator
    socket.on('typing', (data) => {
        socket.to(data.room).emit('user_typing', {
            username: data.username,
            isTyping: data.isTyping
        });
    });

    // Handle new chart creation (for Task 2)
    socket.on('new_chart', (chartData) => {
        try {
            console.log('New chart received via Socket.io:', chartData);
            // Broadcast the new chart to all connected clients
            io.emit('new_chart', {
                success: true,
                data: chartData
            });
        } catch (error) {
            console.error('Error broadcasting chart:', error);
            socket.emit('error', { message: 'Failed to broadcast chart' });
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Error handler (must be last)
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

server.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Socket.io server is ready`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

