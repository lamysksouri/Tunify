package com.spotifyclone.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spotifyclone.api.models.Audio;

public interface AudioRepository extends JpaRepository<Audio, Long> {
    List<Audio> findByName(String name);
    
    @Query("SELECT a FROM Audio a WHERE :artistId MEMBER OF a.artists")
    List<Audio> findByArtistId(Long artistId);
}
