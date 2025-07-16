package com.memorygame.dto;

public class PlayerScoreDTO {
    private String playerName;
    private int score;
    
    // Constructors
    public PlayerScoreDTO() {}
    
    public PlayerScoreDTO(String playerName, int score) {
        this.playerName = playerName;
        this.score = score;
    }
    
    // Getters and Setters
    public String getPlayerName() {
        return playerName;
    }
    
    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }
    
    public int getScore() {
        return score;
    }
    
    public void setScore(int score) {
        this.score = score;
    }
}
