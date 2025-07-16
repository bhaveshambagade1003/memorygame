import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="setup-container">
      <div class="setup-card">
        <h2>Game Setup</h2>
        
        <div class="setup-section">
          <label>Grid Size:</label>
          <div class="grid-options">
            <button 
              *ngFor="let size of gridSizes" 
              [class.selected]="selectedGridSize === size"
              (click)="selectGridSize(size)"
              class="grid-btn">
              {{size}}x{{size}}
            </button>
          </div>
        </div>

        <div class="setup-section">
          <label>Number of Players:</label>
          <div class="player-options">
            <button 
              *ngFor="let count of playerCounts" 
              [class.selected]="selectedPlayerCount === count"
              (click)="selectPlayerCount(count)"
              class="player-btn">
              {{count}} Player{{count > 1 ? 's' : ''}}
            </button>
          </div>
        </div>

        <div class="setup-section" *ngIf="selectedPlayerCount > 1">
          <label>Player Names:</label>
          <div class="player-names">
            <input 
              *ngFor="let name of playerNames; let i = index"
              [(ngModel)]="playerNames[i]"
              [placeholder]="'Player ' + (i + 1)"
              class="player-input">
          </div>
        </div>

        <button 
          (click)="startGame()" 
          [disabled]="!canStartGame()"
          class="start-btn">
          Start Game
        </button>
      </div>
    </div>
  `,
  styles: [`
    .setup-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    .setup-card {
      background: white;
      border-radius: 15px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      max-width: 500px;
      width: 100%;
    }

    .setup-card h2 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
      font-size: 2rem;
    }

    .setup-section {
      margin-bottom: 30px;
    }

    .setup-section label {
      display: block;
      margin-bottom: 15px;
      font-weight: 500;
      color: #555;
      font-size: 1.1rem;
    }

    .grid-options, .player-options {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .grid-btn, .player-btn {
      padding: 12px 20px;
      border: 2px solid #ddd;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1rem;
    }

    .grid-btn:hover, .player-btn:hover {
      border-color: #667eea;
      transform: translateY(-2px);
    }

    .grid-btn.selected, .player-btn.selected {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }

    .player-names {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .player-input {
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .player-input:focus {
      outline: none;
      border-color: #667eea;
    }

    .start-btn {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.2rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 20px;
    }

    .start-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .start-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
    }

    @media (max-width: 768px) {
      .setup-card {
        padding: 30px 20px;
      }
      
      .grid-options, .player-options {
        justify-content: center;
      }
    }
  `]
})
export class GameSetupComponent {
  @Output() gameStarted = new EventEmitter<void>();

  gridSizes = [4, 6, 8];
  playerCounts = [1, 2];
  
  selectedGridSize = 4;
  selectedPlayerCount = 1;
  playerNames: string[] = [];

  constructor(private gameService: GameService) {
    this.updatePlayerNames();
  }

  selectGridSize(size: number): void {
    this.selectedGridSize = size;
  }

  selectPlayerCount(count: number): void {
    this.selectedPlayerCount = count;
    this.updatePlayerNames();
  }

  private updatePlayerNames(): void {
    this.playerNames = Array(this.selectedPlayerCount).fill('').map((_, i) => `Player ${i + 1}`);
  }

  canStartGame(): boolean {
    if (this.selectedPlayerCount === 1) {
      return true;
    }
    return this.playerNames.every(name => name.trim().length > 0);
  }

  startGame(): void {
    if (!this.canStartGame()) {
      return;
    }

    const finalPlayerNames = this.selectedPlayerCount === 1 
      ? ['Player 1'] 
      : this.playerNames.map(name => name.trim() || 'Player');

    this.gameService.initializeGame(
      this.selectedGridSize,
      this.selectedPlayerCount,
      finalPlayerNames
    );
    
    this.gameStarted.emit();
  }
}
