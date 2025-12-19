import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
// Optional: You can use the ChartService from services/chart.service.ts instead of HttpClient directly
// import { ChartService, Chart } from '../services/chart.service';

// ============================================================================
// ASSESSMENT TASK 1: Display Astrological Charts with Real-Time Updates
// ============================================================================
//
// ⚠️ CRITICAL WARNING: DO NOT USE AI TOOLS
// This assessment must be completed WITHOUT using AI tools such as Cursor, ChatGPT, 
// GitHub Copilot, or any other AI coding assistants.
// If you use AI tools to complete this assessment, you will FAIL.
//
// ============================================================================
// REQUIREMENTS:
// ============================================================================
// 1. Fetch and display charts from GET /api/charts
//    - Display each chart showing: name, birth location, sun sign, moon sign
//    - Simple list or card layout is fine
//
// 2. Implement Socket.io for Real-Time Updates (REQUIRED)
//    - Connect to Socket.io server (http://localhost:3000)
//    - Listen for 'new_chart' event
//    - When new chart arrives, add it to the list automatically
//    - Connect on component init, disconnect on destroy
//
// 3. Basic error handling
//    - Show error message if API call fails
//
// ============================================================================
// SOCKET.IO EVENTS:
// ============================================================================
// - Server emits 'new_chart' with format: { success: true, data: Chart }
// - Use ChatService (services/chat.service.ts) as reference for Socket.io setup
//
// ============================================================================
// ESTIMATED TIME: 2-3 hours
// ============================================================================
//
// Note: 
// - ChartService available in services/chart.service.ts
// - ChatService available in services/chat.service.ts (Socket.io example)
// - API Response: { success: boolean, data: Chart[] }

interface Planet {
  sign: string;
  degree: number;
}

interface Chart {
  id: number;
  name: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  sunSign: string;
  moonSign: string;
  risingSign: string;
  planets: {
    sun: Planet;
    moon: Planet;
    mercury: Planet;
    venus: Planet;
    mars: Planet;
  };
}

@Component({
  selector: 'app-task1',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="task1-container">
      <h2>Task 1: Display Astrological Charts</h2>
      <p class="task-description">
        Fetch and display astrological charts from the API. 
        Implement the component according to the requirements in the code comments.
      </p>
      
      <!-- TODO: Implement the chart display here -->
      <div class="placeholder">
        <p>Your implementation goes here...</p>
      </div>
    </div>
  `,
  styles: [`
    .task1-container {
      max-width: 1000px;
      margin: 0 auto;
    }
    .task-description {
      color: #666;
      margin-bottom: 2rem;
    }
    .placeholder {
      padding: 3rem;
      text-align: center;
      background: #f5f5f5;
      border-radius: 8px;
      color: #999;
    }
  `]
})
export class Task1Component implements OnInit {
  // TODO: Add your implementation here

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // TODO: Fetch charts from API
  }
}

