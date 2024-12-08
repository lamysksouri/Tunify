package com.spotifyclone.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spotifyclone.api.models.Album;

public interface AlbumRepository extends JpaRepository<Album, Long> {
    List<Album> findByName(String name);
}
