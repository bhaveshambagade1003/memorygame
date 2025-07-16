package com.memorygame.model;

import jakarta.persistence.*;

@Entity
@Table(name = "player_scores")
public class PlayerScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String playerName;
    
    @Column(nullable = false)
    private int score;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_session_id")
    private GameSession gameSession;
    
    // Constructors
    public PlayerScore() {}
    
    public PlayerScore(String playerName, int score, GameSession gameSession) {
        this.playerName = playerName;
        this.score = score;
        this.gameSession = gameSession;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
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
    
    public GameSession getGameSession() {
        return gameSession;
    }
    
    public void setGameSession(GameSession gameSession) {
        this.gameSession = gameSession;
    }
}
