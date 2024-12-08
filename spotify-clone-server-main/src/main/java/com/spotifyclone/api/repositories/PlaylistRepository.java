package com.spotifyclone.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spotifyclone.api.models.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    List<Playlist> findByName(String name);
    
    @Query("SELECT p FROM Playlist p WHERE p.user_id = :userId")
    List<Playlist> findByUserId(@Param("userId") long userId);
}
