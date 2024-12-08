package com.spotifyclone.api.models;

import java.util.ArrayList;
import java.util.List;

public class AudioResponse {
    private long id;
    private String name;
    private List<ArtistLite> artists;
    private List<AlbumLite> albums;
    private String url;
    private String avatar;

    public AudioResponse() {}

    public AudioResponse(long id, String name, List<ArtistLite> artists, List<AlbumLite> albums, String url, String avatar) {
        this.id = id;
        this.name = name;
        this.artists = artists;
        this.albums = albums;
        this.url = url;
        this.avatar = avatar;
    }

    public long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public List<ArtistLite> getArtists() {
        return this.artists;
    }

    public List<AlbumLite> getAlbums() {
        return this.albums;
    }

    public String getUrl() {
        return this.url;
    }

    public String getAvatar() {
        return this.avatar;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setArtists(List<ArtistLite> artists) {
        this.artists = artists;
    }

    public void modifyArtists(ArtistLite artist) {
        if(this.artists == null) this.artists = new ArrayList<>();

        this.artists.add(artist);
    }

    public void setAlbums(List<AlbumLite> albums) {
        this.albums = albums;
    }

    public void modifyAlbums(AlbumLite album) {
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
