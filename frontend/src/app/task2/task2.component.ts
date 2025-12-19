import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// Optional: You can use the ChartService from services/chart.service.ts instead of HttpClient directly
// import { ChartService, Chart, CalculateChartRequest } from '../services/chart.service';

// ============================================================================
// ASSESSMENT TASK 2: Birth Chart Calculator with Real-Time Broadcasting
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
// 1. Create a form with 3 fields (all required):
//    - Birth Date (type="date")
//    - Birth Time (type="time")
//    - Birth Location (text input)
//
// 2. On form submit, POST to /api/charts/calculate
//    - Request body: { birthDate, birthTime, birthLocation }
//    - Display the result showing: sun sign, moon sign, rising sign
//
// 3. Implement Socket.io to Broadcast New Charts (REQUIRED)
//    - Connect to Socket.io server (http://localhost:3000)
//    - After successful calculation, emit 'new_chart' event with chart data
//    - Format: socket.emit('new_chart', chartData)
//    - Connect on component init, disconnect on destroy
//
// 4. Basic error handling
//    - Show error message if API call fails
//
// ============================================================================
// SOCKET.IO FLOW:
// ============================================================================
// 1. Submit form → POST /api/charts/calculate
// 2. On success → Emit 'new_chart' via Socket.io
// 3. Server broadcasts to all clients (Task 1 receives update)
//
// ============================================================================
// ESTIMATED TIME: 2-3 hours
// ============================================================================
//
// Note: 
// - ChartService available in services/chart.service.ts
// - ChatService available in services/chat.service.ts (Socket.io example)
// - API Request: POST /api/charts/calculate
// - Response: { success: boolean, data: Chart }

interface ChartResult {
  id: number;
  name: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  sunSign: string;
  moonSign: string;
  risingSign: string;
  planets: {
    sun: { sign: string; degree: number };
    moon: { sign: string; degree: number };
    mercury: { sign: string; degree: number };
    venus: { sign: string; degree: number };
    mars: { sign: string; degree: number };
  };
}

@Component({
  selector: 'app-task2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="task2-container">
      <h2>Task 2: Birth Chart Calculator</h2>
      <p class="task-description">
        Create a form to calculate and display birth chart information.
        Implement the component according to the requirements in the code comments.
      </p>
      
      <!-- TODO: Implement the form and result display here -->
      <div class="placeholder">
        <p>Your implementation goes here...</p>
      </div>
    </div>
  `,
  styles: [`
    .task2-container {
      max-width: 800px;
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
export class Task2Component {
  // TODO: Add your implementation here

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}
}

