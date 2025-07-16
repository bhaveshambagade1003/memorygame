import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { GameService, GameState, Card, Player } from '../services/game.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-container">
      <!-- Game Header -->
      <div class="game-header">
        <div class="game-info">
          <div class="moves">Moves: {{gameState.moves}}</div>
          <div class="current-player" *ngIf="gameState.players.length > 1">
            Current Player: {{gameState.players[gameState.currentPlayer].name}}
          </div>
        </div>
        <div class="scores">
          <div class="player-score" *ngFor="let player of gameState.players">
            {{player.name}}: {{player.score}} points
          </div>
        </div>
      </div>

      <!-- Game Board -->
      <div class="game-board" 
           [style.grid-template-columns]="'repeat(' + gameState.gridSize + ', 1fr)'">
        <div class="card" 
             *ngFor="let card of gameState.cards" 
             [class.flipped]="card.isFlipped || card.isMatched"
             [class.matched]="card.isMatched"
             (click)="onCardClick(card)">
          <div class="card-inner">
            <div class="card-front">
              <div class="card-pattern">?</div>
            </div>
            <div class="card-back">
              <div class="card-symbol">{{card.symbol}}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Game Completed Modal -->
      <div class="game-completed-modal" *ngIf="gameState.gameCompleted">
        <div class="modal-content">
          <h2>🎉 Game Completed! 🎉</h2>
          <div class="winner-info" *ngIf="winner">
            <h3>Winner: {{winner.name}}</h3>
            <p>Score: {{winner.score}} points</p>
          </div>
          <div class="game-stats">
            <p>Total Moves: {{gameState.moves}}</p>
            <p>Grid Size: {{gameState.gridSize}}x{{gameState.gridSize}}</p>
          </div>
          <div class="modal-actions">
            <button (click)="playAgain()" class="play-again-btn">Play Again</button>
            <button (click)="newGame()" class="new-game-btn">New Game</button>
          </div>
        </div>
      </div>

      <!-- Game Controls -->
      <div class="game-controls">
        <button (click)="newGame()" class="control-btn">New Game</button>
        <button (click)="resetGame()" class="control-btn">Reset</button>
      </div>
    </div>
  `,
  styles: [`
    .game-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .game-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.1);
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 30px;
      backdrop-filter: blur(10px);
    }

    .game-info {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .moves, .current-player {
      color: white;
      font-weight: 500;
      font-size: 1.1rem;
    }

    .scores {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .player-score {
      color: white;
      font-weight: 500;
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
    }

    .game-board {
      display: grid;
      gap: 15px;
      justify-content: center;
      margin-bottom: 30px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      backdrop-filter: blur(10px);
    }

    .card {
      width: 80px;
      height: 80px;
      perspective: 1000px;
      cursor: pointer;
    }

    .card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }

    .card.flipped .card-inner {
      transform: rotateY(180deg);
    }

    .card-front, .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .card-front {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .card-back {
      background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
      transform: rotateY(180deg);
    }

    .card-pattern {
      font-size: 2rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .card-symbol {
      font-size: 2rem;
      filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
    }

    .card.matched {
      animation: matchPulse 0.5s ease-in-out;
    }

    @keyframes matchPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }

    .card:hover:not(.flipped) .card-inner {
      transform: rotateY(10deg);
    }

    .game-completed-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 40px;
      border-radius: 15px;
      text-align: center;
      max-width: 400px;
      width: 90%;
      animation: modalAppear 0.3s ease-out;
    }

    @keyframes modalAppear {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-content h2 {
      color: #333;
      margin-bottom: 20px;
      font-size: 2rem;
    }

    .winner-info {
      margin-bottom: 20px;
    }

    .winner-info h3 {
      color: #667eea;
      margin-bottom: 10px;
    }

    .game-stats {
      margin-bottom: 30px;
      color: #666;
    }

    .modal-actions {
      display: flex;
      gap: 15px;
      justify-content: center;
    }

    .play-again-btn, .new-game-btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .play-again-btn {
      background: #667eea;
      color: white;
    }

    .new-game-btn {
      background: #64b5f6;
      color: white;
    }

    .play-again-btn:hover, .new-game-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .game-controls {
      display: flex;
      gap: 15px;
      justify-content: center;
    }

    .control-btn {
      padding: 12px 24px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .control-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .card {
        width: 60px;
        height: 60px;
      }
      
      .card-symbol, .card-pattern {
        font-size: 1.5rem;
      }
      
      .game-header {
        flex-direction: column;
        gap: 15px;
      }
      
      .game-board {
        gap: 10px;
      }
    }
  `]
})
export class GameBoardComponent implements OnInit, OnDestroy {
  gameState: GameState = {
    cards: [],
    players: [],
    currentPlayer: 0,
    gameStarted: false,
    gameCompleted: false,
    flippedCards: [],
    moves: 0,
    gridSize: 4
  };
  
  winner: Player | null = null;
  private subscription?: Subscription;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.subscription = this.gameService.gameState$.subscribe(state => {
      this.gameState = state;
      if (state.gameCompleted) {
        this.winner = this.gameService.getWinner();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onCardClick(card: Card): void {
    this.gameService.flipCard(card.id);
  }

  playAgain(): void {
    const currentGridSize = this.gameState.gridSize;
    const currentPlayerCount = this.gameState.players.length;
    const currentPlayerNames = this.gameState.players.map(p => p.name);
    
    this.gameService.initializeGame(currentGridSize, currentPlayerCount, currentPlayerNames);
  }

  newGame(): void {
    this.gameService.resetGame();
  }

  resetGame(): void {
    this.playAgain();
  }
}
