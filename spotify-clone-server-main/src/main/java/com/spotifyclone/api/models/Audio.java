package com.spotifyclone.api.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_audio")
public class Audio {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    @Column(name = "name", columnDefinition="VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_bin")
    private String name;

    @ElementCollection
    private List<Long> artists;

    @ElementCollection
    @Column(name = "albums")
    private List<Long> albums;

    @Column(name = "url")
    private String url;

    @Column(name = "avatar")
    private String avatar;

    public Audio() {}

    public Audio(Long id, String name, List<Long> artists, List<Long> albums, String url, String avatar) {
        this.id = id;
        this.name = name;
        this.artists = artists;
        this.albums = albums;
        this.url = url;
        this.avatar = avatar;
    }

    public Audio(String name, List<Long> artists, List<Long> albums, String url, String avatar) {
        this.name = name;
        this.artists = artists;
        this.albums = albums;
        this.url = url;
        this.avatar= avatar;
    }

    public long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public List<Long> getArtists() {
        return this.artists;
    }

    public List<Long> getAlbums() {
        return this.albums;
    }

    public String getUrl() {
        return this.url;
    }

     public String getAvatar() {
        return this.avatar;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setArtists(List<Long> artists) {
        this.artists = artists;
    }

    public void modifyArtists(Long artist) {
        if(this.artists == null) this.artists = new ArrayList<>();

        this.artists.add(artist);
    }

    public void setAlbums(List<Long> albums) {
        this.albums = albums;
    }

    public void modifyAlbums(Long album) {
        if(this.albums == null) this.albums = new ArrayList<>();
        
        this.albums.add(album);
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
