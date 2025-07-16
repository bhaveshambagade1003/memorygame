# Memory Game

A beautiful and interactive Memory Game built with Angular frontend and Java Spring Boot backend.

## Features

- 🎮 **Multiple Grid Sizes**: Choose from 4x4, 6x6, or 8x8 grids
- 👥 **Multiplayer Support**: Play solo or with a friend
- 🎯 **Score Tracking**: Keep track of your best scores
- 🏆 **Statistics**: View game statistics and leaderboards
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 💾 **Data Persistence**: Game results are saved in the backend database

## Game Rules

1. Click on cards to flip them over
2. Try to find matching pairs
3. When you find a matching pair, they stay face up
4. Match all pairs to win the game
5. Try to complete the game in the fewest moves possible

## Technologies Used

### Frontend
- Angular 17
- TypeScript
- CSS3 with animations
- RxJS for state management
- Responsive design

### Backend
- Java 17
- Spring Boot 3.2
- Spring Data JPA
- H2 Database (in-memory)
- REST API

## Project Structure

```
memory-game/
├── memory-game-frontend/     # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── game-board/   # Game board component
│   │   │   ├── game-setup/   # Game setup component
│   │   │   └── services/     # Game service
│   │   └── styles.css        # Global styles
│   └── package.json
└── memory-game-backend/      # Spring Boot application
    ├── src/main/java/
    │   └── com/memorygame/
    │       ├── controller/   # REST controllers
    │       ├── service/      # Business logic
    │       ├── model/        # JPA entities
    │       ├── dto/          # Data transfer objects
    │       └── repository/   # Data access layer
    └── pom.xml
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Java 17+
- Maven 3.6+

### Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd memory-game-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser to `http://localhost:4200`

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd memory-game-backend
   ```

2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

3. The API will be available at `http://localhost:8080`

### API Endpoints

- `POST /api/game/start` - Start a new game session
- `POST /api/game/complete` - Complete a game and save results
- `GET /api/game/recent` - Get recent game results
- `GET /api/game/top-scores` - Get top scores
- `GET /api/game/player-scores/{playerName}` - Get scores for a specific player
- `GET /api/game/stats/average-moves/{gridSize}` - Get average moves for a grid size

## Game Screenshots

The game features:
- A modern, colorful design with gradient backgrounds
- Smooth card flip animations
- Responsive layout that works on mobile and desktop
- Real-time score tracking
- Game completion modal with statistics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.
