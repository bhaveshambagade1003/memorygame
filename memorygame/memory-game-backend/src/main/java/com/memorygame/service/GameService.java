package com.memorygame.service;

import com.memorygame.dto.GameResultDTO;
import com.memorygame.dto.PlayerScoreDTO;
import com.memorygame.model.GameSession;
import com.memorygame.model.PlayerScore;
import com.memorygame.repository.GameSessionRepository;
import com.memorygame.repository.PlayerScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GameService {
    
    @Autowired
    private GameSessionRepository gameSessionRepository;
    
    @Autowired
    private PlayerScoreRepository playerScoreRepository;
    
    public GameSession createGameSession(int gridSize, int playerCount) {
        GameSession gameSession = new GameSession(gridSize, playerCount);
        return gameSessionRepository.save(gameSession);
    }
    
    public GameResultDTO completeGame(Long sessionId, int totalMoves, List<PlayerScoreDTO> playerScores) {
        Optional<GameSession> optionalSession = gameSessionRepository.findById(sessionId);
        if (!optionalSession.isPresent()) {
            throw new RuntimeException("Game session not found");
        }
        
        GameSession gameSession = optionalSession.get();
        gameSession.setTotalMoves(totalMoves);
        gameSession.setEndTime(LocalDateTime.now());
        gameSession.setCompleted(true);
        
        // Save player scores
        List<PlayerScore> scores = playerScores.stream()
            .map(dto -> new PlayerScore(dto.getPlayerName(), dto.getScore(), gameSession))
            .collect(Collectors.toList());
        
        playerScoreRepository.saveAll(scores);
        gameSessionRepository.save(gameSession);
        
        // Determine winner
        String winner = playerScores.stream()
            .max((p1, p2) -> Integer.compare(p1.getScore(), p2.getScore()))
            .map(PlayerScoreDTO::getPlayerName)
            .orElse("No winner");
        
        return new GameResultDTO(sessionId, gameSession.getGridSize(), 
                                gameSession.getPlayerCount(), totalMoves, 
                                playerScores, winner);
    }
    
    public List<GameResultDTO> getRecentGames() {
        List<GameSession> recentGames = gameSessionRepository.findByCompletedTrueOrderByEndTimeDesc();
        return recentGames.stream()
            .map(this::convertToGameResultDTO)
            .collect(Collectors.toList());
    }
    
    public List<PlayerScoreDTO> getTopScores() {
        List<PlayerScore> topScores = playerScoreRepository.findTopScores();
        return topScores.stream()
            .map(score -> new PlayerScoreDTO(score.getPlayerName(), score.getScore()))
            .collect(Collectors.toList());
    }
    
    public List<PlayerScoreDTO> getPlayerScores(String playerName) {
        List<PlayerScore> playerScores = playerScoreRepository.findByPlayerNameOrderByScoreDesc(playerName);
        return playerScores.stream()
            .map(score -> new PlayerScoreDTO(score.getPlayerName(), score.getScore()))
            .collect(Collectors.toList());
    }
    
    public Double getAverageMovesForGridSize(int gridSize) {
        return gameSessionRepository.getAverageMovesForGridSize(gridSize);
    }
    
    private GameResultDTO convertToGameResultDTO(GameSession gameSession) {
        List<PlayerScoreDTO> playerScoreDTOs = gameSession.getPlayerScores().stream()
            .map(score -> new PlayerScoreDTO(score.getPlayerName(), score.getScore()))
            .collect(Collectors.toList());
        
        String winner = playerScoreDTOs.stream()
            .max((p1, p2) -> Integer.compare(p1.getScore(), p2.getScore()))
            .map(PlayerScoreDTO::getPlayerName)
            .orElse("No winner");
        
        return new GameResultDTO(gameSession.getId(), gameSession.getGridSize(),
                                gameSession.getPlayerCount(), gameSession.getTotalMoves(),
                                playerScoreDTOs, winner);
    }
}
