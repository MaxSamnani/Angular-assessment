// ============================================================================
// BONUS FEATURE: Real-Time Chat with Socket.io
// ============================================================================
//
// ⚠️ CRITICAL WARNING: DO NOT USE AI TOOLS
// This assessment must be completed WITHOUT using AI tools such as Cursor, ChatGPT, 
// GitHub Copilot, or any other AI coding assistants.
// If you use AI tools to complete this assessment, you will FAIL.
//
// ============================================================================
// NOTE: This is a BONUS/OPTIONAL feature
// ============================================================================
// This chat component demonstrates real-time communication using Socket.io.
// It's part of the Social & SaaS platform requirements for Terri Quintel Astrology.
//
// This component is already implemented as a reference for:
// - Socket.io integration with Angular
// - Real-time messaging patterns
// - Observable-based reactive programming
// - Component lifecycle management (OnInit, OnDestroy)
//
// PRIMARY ASSESSMENT TASKS:
// - Task 1: Display Astrological Charts (task1.component.ts)
// - Task 2: Birth Chart Calculator (task2.component.ts)
//
// This chat feature is provided as a working example and is NOT part of the
// core assessment requirements. Focus on completing Task 1 and Task 2 first.
//
// ============================================================================

import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatMessage } from '../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-chat',
    imports: [CommonModule, FormsModule],
    template: `
    <div class="chat-container">
      <div class="chat-header">
        <h2>💬 Live Chat - Terri Quintel Astrology</h2>
        <div class="room-info">
          <span>Room: {{ currentRoom }}</span>
          <span class="status" [class.connected]="isConnected">●</span>
        </div>
      </div>

      <div class="chat-messages" #messagesContainer>
        <div *ngIf="messages.length === 0 && !isLoading" class="empty-state">
          <p>No messages yet. Start the conversation!</p>
        </div>
        <div *ngIf="isLoading" class="loading">
          <p>Loading messages...</p>
        </div>
        <div *ngFor="let message of messages" class="message" [class.own-message]="message.username === currentUsername">
          <div class="message-header">
            <span class="username">{{ message.username }}</span>
            <span class="timestamp">{{ formatTime(message.createdAt) }}</span>
          </div>
          <div class="message-content">{{ message.message }}</div>
        </div>
        <div *ngIf="typingUsers.length > 0" class="typing-indicator">
          <span *ngFor="let user of typingUsers">{{ user }} is typing...</span>
        </div>
      </div>

      <div class="chat-input-container">
        <div class="username-input" *ngIf="!currentUsername">
          <input 
            type="text" 
            [(ngModel)]="tempUsername" 
            placeholder="Enter your username"
            (keyup.enter)="setUsername()"
            class="input-field"
          />
          <button (click)="setUsername()" class="btn btn-primary">Join Chat</button>
        </div>
        <div class="message-input" *ngIf="currentUsername">
          <input 
            type="text" 
            [(ngModel)]="newMessage" 
            placeholder="Type your message..."
            (keyup.enter)="sendMessage()"
            (input)="onTyping()"
            class="input-field"
            #messageInput
          />
          <button (click)="sendMessage()" [disabled]="!newMessage.trim()" class="btn btn-primary">
            Send
          </button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .chat-container {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 200px);
      max-width: 800px;
      margin: 0 auto;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .chat-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chat-header h2 {
      margin: 0;
      font-size: 1.2rem;
    }

    .room-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .status {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #ff4444;
    }

    .status.connected {
      background: #44ff44;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      background: #f9f9f9;
    }

    .empty-state {
      text-align: center;
      color: #999;
      padding: 2rem;
    }

    .loading {
      text-align: center;
      color: #666;
      padding: 2rem;
    }

    .message {
      margin-bottom: 1rem;
      padding: 0.75rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }

    .message.own-message {
      background: #e3f2fd;
      margin-left: auto;
      max-width: 70%;
    }

    .message-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.85rem;
    }

    .username {
      font-weight: bold;
      color: #667eea;
    }

    .timestamp {
      color: #999;
      font-size: 0.75rem;
    }

    .message-content {
      color: #333;
      word-wrap: break-word;
    }

    .typing-indicator {
      color: #999;
      font-style: italic;
      font-size: 0.85rem;
      padding: 0.5rem;
    }

    .chat-input-container {
      padding: 1rem;
      background: white;
      border-top: 1px solid #e0e0e0;
    }

    .username-input,
    .message-input {
      display: flex;
      gap: 0.5rem;
    }

    .input-field {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .input-field:focus {
      outline: none;
      border-color: #667eea;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.3s;
    }

    .btn-primary {
      background: #667eea;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #5568d3;
    }

    .btn-primary:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .chat-container {
        height: calc(100vh - 150px);
      }

      .message.own-message {
        max-width: 85%;
      }
    }
  `]
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  
  messages: ChatMessage[] = [];
  newMessage: string = '';
  currentUsername: string = '';
  tempUsername: string = '';
  currentRoom: string = 'general';
  isConnected: boolean = false;
  isLoading: boolean = true;
  typingUsers: string[] = [];
  
  private messageSubscription?: Subscription;
  private typingSubscription?: Subscription;
  private typingTimeout?: any;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // Check if username is stored in localStorage
    const storedUsername = localStorage.getItem('chatUsername');
    if (storedUsername) {
      this.currentUsername = storedUsername;
    }

    // Load existing messages
    this.loadMessages();

    // Subscribe to new messages
    this.messageSubscription = this.chatService.messages$.subscribe((message) => {
      this.messages.push(message);
      this.scrollToBottom();
    });

    // Subscribe to typing indicators
    this.typingSubscription = this.chatService.onUserTyping().subscribe((data) => {
      if (data.isTyping && data.username !== this.currentUsername) {
        if (!this.typingUsers.includes(data.username)) {
          this.typingUsers.push(data.username);
        }
        // Remove typing indicator after 3 seconds
        setTimeout(() => {
          this.typingUsers = this.typingUsers.filter(u => u !== data.username);
        }, 3000);
      } else {
        this.typingUsers = this.typingUsers.filter(u => u !== data.username);
      }
    });

    // Join the room
    if (this.currentUsername) {
      this.chatService.joinRoom(this.currentRoom);
      this.isConnected = true;
    }
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    if (this.typingSubscription) {
      this.typingSubscription.unsubscribe();
    }
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.chatService.leaveRoom(this.currentRoom);
  }

  setUsername() {
    if (this.tempUsername.trim()) {
      this.currentUsername = this.tempUsername.trim();
      localStorage.setItem('chatUsername', this.currentUsername);
      this.chatService.joinRoom(this.currentRoom);
      this.isConnected = true;
      this.tempUsername = '';
    }
  }

  loadMessages() {
    this.isLoading = true;
    this.chatService.getAllMessages(this.currentRoom).subscribe({
      next: (response) => {
        if (response.success) {
          this.messages = response.data;
          this.isLoading = false;
          setTimeout(() => this.scrollToBottom(), 100);
        }
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        this.isLoading = false;
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim() && this.currentUsername) {
      this.chatService.sendMessage(this.newMessage.trim(), this.currentUsername, this.currentRoom);
      this.newMessage = '';
      this.stopTyping();
    }
  }

  onTyping() {
    if (this.newMessage.trim() && this.currentUsername) {
      this.chatService.sendTypingIndicator(this.currentUsername, this.currentRoom, true);
      
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }
      
      this.typingTimeout = setTimeout(() => {
        this.stopTyping();
      }, 1000);
    }
  }

  stopTyping() {
    if (this.currentUsername) {
      this.chatService.sendTypingIndicator(this.currentUsername, this.currentRoom, false);
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer) {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    }, 100);
  }

  formatTime(dateString?: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

