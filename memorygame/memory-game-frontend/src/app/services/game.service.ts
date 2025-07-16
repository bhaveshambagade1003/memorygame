import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Player {
  id: number;
  name: string;
  score: number;
}

export interface GameState {
  cards: Card[];
  players: Player[];
  currentPlayer: number;
  gameStarted: boolean;
  gameCompleted: boolean;
  flippedCards: Card[];
  moves: number;
  gridSize: number;
  sessionId?: number;
}

export interface GameResultDTO {
  sessionId: number;
  gridSize: number;
  playerCount: number;
  totalMoves: number;
  playerScores: PlayerScoreDTO[];
  winner: string;
}

export interface PlayerScoreDTO {
  playerName: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:8080/api/game';
  private gameStateSubject = new BehaviorSubject<GameState>({
    cards: [],
    players: [],
    currentPlayer: 0,
    gameStarted: false,
    gameCompleted: false,
    flippedCards: [],
    moves: 0,
    gridSize: 4
  });

  public gameState$ = this.gameStateSubject.asObservable();
  
  // Symbols for cards
  private symbols = ['🎮', '🎯', '🎲', '🎪', '🎭', '🎨', '🎸', '🎹', '🎺', '🎷', '🎤', '🎧', '🎬', '🎞️', '🎟️', '🎫', '🎊', '🎉', '🎈', '🎀', '🎁', '🎄', '🎃', '🎂', '🍕', '🍔', '🍟', '🍗', '🍖', '🍛', '🍜', '🍝'];

  constructor(private http: HttpClient) {}

  get gameStarted(): boolean {
    return this.gameStateSubject.value.gameStarted;
  }

  get gameState(): GameState {
    return this.gameStateSubject.value;
  }

  async initializeGame(gridSize: number, playerCount: number, playerNames: string[]): Promise<void> {
    try {
      // Create game session in backend
      const response = await this.http.post<any>(`${this.apiUrl}/start`, {
        gridSize: gridSize,
        playerCount: playerCount
      }).toPromise();

      const sessionId = response.id;
      
      // Create players
      const players: Player[] = [];
      for (let i = 0; i < playerCount; i++) {
        players.push({
          id: i,
          name: playerNames[i] || `Player ${i + 1}`,
          score: 0
        });
      }

      // Create cards
      const cards = this.createCards(gridSize * gridSize / 2);
      
      const newState: GameState = {
        cards: cards,
        players: players,
        currentPlayer: 0,
        gameStarted: true,
        gameCompleted: false,
        flippedCards: [],
        moves: 0,
        gridSize: gridSize,
        sessionId: sessionId
      };

      this.gameStateSubject.next(newState);
    } catch (error) {
      console.error('Error initializing game:', error);
      // Fallback to offline mode
      this.initializeOfflineGame(gridSize, playerCount, playerNames);
    }
  }

  private initializeOfflineGame(gridSize: number, playerCount: number, playerNames: string[]): void {
    const totalCards = gridSize * gridSize;
    const uniqueCards = totalCards / 2;
    
    // Create players
    const players: Player[] = [];
    for (let i = 0; i < playerCount; i++) {
      players.push({
        id: i,
        name: playerNames[i] || `Player ${i + 1}`,
        score: 0
      });
    }

    // Create cards
    const cards = this.createCards(uniqueCards);
    
    const newState: GameState = {
      cards: cards,
      players: players,
      currentPlayer: 0,
      gameStarted: true,
      gameCompleted: false,
      flippedCards: [],
      moves: 0,
      gridSize: gridSize
    };

    this.gameStateSubject.next(newState);
  }

  private createCards(uniqueCards: number): Card[] {
    const cards: Card[] = [];
    const selectedSymbols = this.symbols.slice(0, uniqueCards);
    
    // Create pairs
    for (let i = 0; i < uniqueCards; i++) {
      cards.push({
        id: i * 2,
        symbol: selectedSymbols[i],
        isFlipped: false,
        isMatched: false
      });
      cards.push({
        id: i * 2 + 1,
        symbol: selectedSymbols[i],
        isFlipped: false,
        isMatched: false
      });
    }

    // Shuffle cards
    return this.shuffleArray(cards);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  flipCard(cardId: number): void {
    const currentState = this.gameStateSubject.value;
    
    // Don't allow flipping if game is not started or completed
    if (!currentState.gameStarted || currentState.gameCompleted) {
      return;
    }

    // Don't allow flipping more than 2 cards
    if (currentState.flippedCards.length >= 2) {
      return;
    }

    // Find the card
    const card = currentState.cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) {
      return;
    }

    // Flip the card
    card.isFlipped = true;
    const newFlippedCards = [...currentState.flippedCards, card];

    const newState = {
      ...currentState,
      flippedCards: newFlippedCards,
      moves: currentState.moves + 1
    };

    this.gameStateSubject.next(newState);

    // Check for matches if 2 cards are flipped
    if (newFlippedCards.length === 2) {
      setTimeout(() => {
        this.checkForMatch();
      }, 1000);
    }
  }

  private async checkForMatch(): Promise<void> {
    const currentState = this.gameStateSubject.value;
    const [card1, card2] = currentState.flippedCards;

    if (card1.symbol === card2.symbol) {
      // Match found
      card1.isMatched = true;
      card2.isMatched = true;
      
      // Update current player score
      const currentPlayer = currentState.players[currentState.currentPlayer];
      currentPlayer.score += 10;

      // Check if game is completed
      const allMatched = currentState.cards.every(card => card.isMatched);
      
      const newState = {
        ...currentState,
        flippedCards: [],
        gameCompleted: allMatched
      };

      this.gameStateSubject.next(newState);

      // If game is completed, save to backend
      if (allMatched && currentState.sessionId) {
        await this.completeGame(currentState.sessionId, currentState.moves, currentState.players);
      }
    } else {
      // No match, flip cards back
      card1.isFlipped = false;
      card2.isFlipped = false;
      
      // Switch to next player (only in multiplayer)
      let nextPlayer = currentState.currentPlayer;
      if (currentState.players.length > 1) {
        nextPlayer = (currentState.currentPlayer + 1) % currentState.players.length;
      }

      const newState = {
        ...currentState,
        currentPlayer: nextPlayer,
        flippedCards: []
      };

      this.gameStateSubject.next(newState);
    }
  }

  private async completeGame(sessionId: number, totalMoves: number, players: Player[]): Promise<void> {
    try {
      const playerScores = players.map(player => ({
        playerName: player.name,
        score: player.score
      }));

      await this.http.post<GameResultDTO>(`${this.apiUrl}/complete`, {
        sessionId: sessionId,
        totalMoves: totalMoves,
        playerScores: playerScores
      }).toPromise();
    } catch (error) {
      console.error('Error completing game:', error);
    }
  }

  resetGame(): void {
    const initialState: GameState = {
      cards: [],
      players: [],
      currentPlayer: 0,
      gameStarted: false,
      gameCompleted: false,
      flippedCards: [],
      moves: 0,
      gridSize: 4
    };

    this.gameStateSubject.next(initialState);
  }

  getWinner(): Player | null {
    const currentState = this.gameStateSubject.value;
    if (!currentState.gameCompleted) {
      return null;
    }

    if (currentState.players.length === 1) {
      return currentState.players[0];
    }

    // Find player with highest score
    return currentState.players.reduce((winner, player) => 
      player.score > winner.score ? player : winner
    );
  }

  // Backend API methods
  getRecentGames(): Observable<GameResultDTO[]> {
    return this.http.get<GameResultDTO[]>(`${this.apiUrl}/recent`);
  }

  getTopScores(): Observable<PlayerScoreDTO[]> {
    return this.http.get<PlayerScoreDTO[]>(`${this.apiUrl}/top-scores`);
  }

  getPlayerScores(playerName: string): Observable<PlayerScoreDTO[]> {
    return this.http.get<PlayerScoreDTO[]>(`${this.apiUrl}/player-scores/${playerName}`);
  }

  getAverageMovesForGridSize(gridSize: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/stats/average-moves/${gridSize}`);
  }
}
