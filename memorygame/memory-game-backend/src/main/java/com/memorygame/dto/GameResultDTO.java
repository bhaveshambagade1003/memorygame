package com.memorygame.dto;

import java.util.List;

public class GameResultDTO {
    private Long sessionId;
    private int gridSize;
    private int playerCount;
    private int totalMoves;
    private List<PlayerScoreDTO> playerScores;
    private String winner;
    
    // Constructors
    public GameResultDTO() {}
    
    public GameResultDTO(Long sessionId, int gridSize, int playerCount, int totalMoves, 
                        List<PlayerScoreDTO> playerScores, String winner) {
        this.sessionId = sessionId;
        this.gridSize = gridSize;
        this.playerCount = playerCount;
        this.totalMoves = totalMoves;
        this.playerScores = playerScores;
        this.winner = winner;
    }
    
    // Getters and Setters
    public Long getSessionId() {
        return sessionId;
    }
    
    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }
    
    public int getGridSize() {
        return gridSize;
    }
    
    public void setGridSize(int gridSize) {
        this.gridSize = gridSize;
    }
    
    public int getPlayerCount() {
        return playerCount;
    }
    
    public void setPlayerCount(int playerCount) {
        this.playerCount = playerCount;
    }
    
    public int getTotalMoves() {
        return totalMoves;
    }
    
    public void setTotalMoves(int totalMoves) {
        this.totalMoves = totalMoves;
    }
    
    public List<PlayerScoreDTO> getPlayerScores() {
        return playerScores;
    }
    
    public void setPlayerScores(List<PlayerScoreDTO> playerScores) {
        this.playerScores = playerScores;
    }
    
    public String getWinner() {
        return winner;
    }
    
    public void setWinner(String winner) {
        this.winner = winner;
    }
}
