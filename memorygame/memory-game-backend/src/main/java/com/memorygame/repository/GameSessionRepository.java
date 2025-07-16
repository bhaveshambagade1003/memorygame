package com.memorygame.repository;

import com.memorygame.model.GameSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameSessionRepository extends JpaRepository<GameSession, Long> {
    
    List<GameSession> findByCompletedTrueOrderByEndTimeDesc();
    
    @Query("SELECT g FROM GameSession g WHERE g.completed = true ORDER BY g.endTime DESC")
    List<GameSession> findRecentCompletedGames();
    
    @Query("SELECT AVG(g.totalMoves) FROM GameSession g WHERE g.completed = true AND g.gridSize = :gridSize")
    Double getAverageMovesForGridSize(int gridSize);
}
