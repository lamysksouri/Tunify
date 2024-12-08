package com.spotifyclone.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spotifyclone.api.models.Artist;

public interface ArtistRepository extends JpaRepository<Artist, Long> {
    List<Artist> findByName(String name);
}
