package com.memorygame.controller;

import com.memorygame.dto.GameResultDTO;
import com.memorygame.dto.PlayerScoreDTO;
import com.memorygame.model.GameSession;
import com.memorygame.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "http://localhost:4200")
public class GameController {
    
    @Autowired
    private GameService gameService;
    
    @PostMapping("/start")
    public ResponseEntity<GameSession> startGame(@RequestBody Map<String, Integer> request) {
        int gridSize = request.get("gridSize");
        int playerCount = request.get("playerCount");
        
        GameSession gameSession = gameService.createGameSession(gridSize, playerCount);
        return ResponseEntity.ok(gameSession);
    }
    
    @PostMapping("/complete")
    public ResponseEntity<GameResultDTO> completeGame(@RequestBody Map<String, Object> request) {
        Long sessionId = Long.valueOf(request.get("sessionId").toString());
        int totalMoves = (Integer) request.get("totalMoves");
        
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> playerScoreData = (List<Map<String, Object>>) request.get("playerScores");
        
        List<PlayerScoreDTO> playerScores = playerScoreData.stream()
            .map(data -> new PlayerScoreDTO(
                (String) data.get("playerName"),
                (Integer) data.get("score")
            ))
            .toList();
        
        GameResultDTO result = gameService.completeGame(sessionId, totalMoves, playerScores);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/recent")
    public ResponseEntity<List<GameResultDTO>> getRecentGames() {
        List<GameResultDTO> recentGames = gameService.getRecentGames();
        return ResponseEntity.ok(recentGames);
    }
    
    @GetMapping("/top-scores")
    public ResponseEntity<List<PlayerScoreDTO>> getTopScores() {
        List<PlayerScoreDTO> topScores = gameService.getTopScores();
        return ResponseEntity.ok(topScores);
    }
    
    @GetMapping("/player-scores/{playerName}")
    public ResponseEntity<List<PlayerScoreDTO>> getPlayerScores(@PathVariable String playerName) {
        List<PlayerScoreDTO> playerScores = gameService.getPlayerScores(playerName);
        return ResponseEntity.ok(playerScores);
    }
    
    @GetMapping("/stats/average-moves/{gridSize}")
    public ResponseEntity<Double> getAverageMovesForGridSize(@PathVariable int gridSize) {
        Double averageMoves = gameService.getAverageMovesForGridSize(gridSize);
        return ResponseEntity.ok(averageMoves != null ? averageMoves : 0.0);
    }
}
