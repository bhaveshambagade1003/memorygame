# Memory Game Backend

Spring Boot REST API for the Memory Game application.

## Features

- RESTful API endpoints for game management
- JPA entities for data persistence
- H2 in-memory database for development
- CORS configuration for frontend integration
- Game session tracking
- Player score management
- Statistics and leaderboards

## API Endpoints

### Game Management
- `POST /api/game/start` - Start a new game session
- `POST /api/game/complete` - Complete a game and save results

### Statistics
- `GET /api/game/recent` - Get recent completed games
- `GET /api/game/top-scores` - Get top player scores
- `GET /api/game/player-scores/{playerName}` - Get scores for a specific player
- `GET /api/game/stats/average-moves/{gridSize}` - Get average moves for a grid size

## Database Schema

### GameSession
- id (Primary Key)
- gridSize
- playerCount
- totalMoves
- startTime
- endTime
- completed

### PlayerScore
- id (Primary Key)
- playerName
- score
- gameSession (Foreign Key)

## Running the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## H2 Console

Access the H2 database console at `http://localhost:8080/h2-console`

- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (empty)

## Configuration

The application uses the following default configuration:
- Server port: 8080
- Database: H2 in-memory
- CORS enabled for `http://localhost:4200`
