import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GameBoardComponent, GameSetupComponent],
  providers: [GameService],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Memory Game</h1>
      </header>
      <main class="app-main">
        <app-game-setup *ngIf="!gameService.gameStarted" (gameStarted)="onGameStarted()"></app-game-setup>
        <app-game-board *ngIf="gameService.gameStarted"></app-game-board>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }
    
    .app-header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .app-header h1 {
      color: white;
      font-size: 2.5rem;
      margin: 0;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    .app-main {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 150px);
    }
  `]
})
export class AppComponent {
  title = 'Memory Game';
  
  constructor(public gameService: GameService) {}
  
  onGameStarted() {
    // Game started event handled by service
  }
}
