package com.memorygame.repository;

import com.memorygame.model.PlayerScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerScoreRepository extends JpaRepository<PlayerScore, Long> {
    
    List<PlayerScore> findByGameSessionId(Long gameSessionId);
    
    @Query("SELECT p FROM PlayerScore p WHERE p.gameSession.completed = true ORDER BY p.score DESC")
    List<PlayerScore> findTopScores();
    
    @Query("SELECT p FROM PlayerScore p WHERE p.playerName = :playerName ORDER BY p.score DESC")
    List<PlayerScore> findByPlayerNameOrderByScoreDesc(String playerName);
}
