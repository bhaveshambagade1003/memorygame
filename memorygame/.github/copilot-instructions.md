# Copilot Instructions for Memory Game Project

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Memory Game application with an Angular frontend and Java Spring Boot backend. The game allows players to match pairs of cards in different grid sizes (4x4, 6x6, 8x8) and supports both single and multiplayer modes.

## Technologies Used
- **Frontend**: Angular 17, TypeScript, CSS3, RxJS
- **Backend**: Java 17, Spring Boot 3.2, Spring Data JPA, H2 Database
- **Architecture**: REST API with Angular consuming backend services

## Code Style Guidelines
- Use TypeScript strict mode for frontend development
- Follow Angular best practices with standalone components
- Use reactive programming patterns with RxJS
- Implement proper error handling for HTTP requests
- Follow Java naming conventions and Spring Boot patterns
- Use proper JPA entity relationships and DTOs

## Component Structure
- **GameSetupComponent**: Handles game configuration
- **GameBoardComponent**: Main game interface with card grid
- **GameService**: Manages game state and backend communication

## Backend Structure
- **Controller**: REST endpoints for game management
- **Service**: Business logic and game operations
- **Repository**: Data access layer with JPA
- **Model**: JPA entities for data persistence
- **DTO**: Data transfer objects for API communication

## Key Features to Maintain
- Responsive design that works on mobile and desktop
- Smooth animations for card flips and interactions
- Real-time score tracking and game state management
- Data persistence with proper error handling
- CORS configuration for frontend-backend communication

## Development Notes
- The game uses emoji symbols for cards
- Card matching logic includes flip animations with delays
- Game state is managed reactively with BehaviorSubject
- Backend provides statistics and leaderboard functionality
- H2 database is used for development with in-memory storage
