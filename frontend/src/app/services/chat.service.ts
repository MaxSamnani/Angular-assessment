import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

export interface ChatMessage {
  _id?: string;
  message: string;
  username: string;
  room: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = '/api';
  private socket: Socket;
  private messageSubject = new Subject<ChatMessage>();
  public messages$ = this.messageSubject.asObservable();

  constructor(private http: HttpClient) {
    // Socket.io needs direct connection to backend server
    // In development, connect to localhost:3000
    // In production, this should be configured via environment variables
    const socketUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:3000' 
      : `${window.location.protocol}//${window.location.hostname}:3000`;
    
    this.socket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    this.socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
    });

    this.socket.on('receive_message', (message: ChatMessage) => {
      this.messageSubject.next(message);
    });

    this.socket.on('error', (error: any) => {
      console.error('Socket error:', error);
    });
  }

  // REST API methods
  getAllMessages(room: string = 'general', limit: number = 50): Observable<{ success: boolean; data: ChatMessage[] }> {
    return this.http.get<{ success: boolean; data: ChatMessage[] }>(`${this.apiUrl}/chat?room=${room}&limit=${limit}`);
  }

  createMessage(message: string, username: string, room: string = 'general'): Observable<{ success: boolean; data: ChatMessage }> {
    return this.http.post<{ success: boolean; data: ChatMessage }>(`${this.apiUrl}/chat`, {
      message,
      username,
      room
    });
  }

  getRooms(): Observable<{ success: boolean; data: string[] }> {
    return this.http.get<{ success: boolean; data: string[] }>(`${this.apiUrl}/chat/rooms`);
  }

  // Socket.io methods
  joinRoom(room: string): void {
    this.socket.emit('join_room', room);
  }

  leaveRoom(room: string): void {
    this.socket.emit('leave_room', room);
  }

  sendMessage(message: string, username: string, room: string = 'general'): void {
    this.socket.emit('send_message', { message, username, room });
  }

  sendTypingIndicator(username: string, room: string, isTyping: boolean): void {
    this.socket.emit('typing', { username, room, isTyping });
  }

  onUserTyping(): Observable<{ username: string; isTyping: boolean }> {
    return new Observable(observer => {
      this.socket.on('user_typing', (data) => {
        observer.next(data);
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

