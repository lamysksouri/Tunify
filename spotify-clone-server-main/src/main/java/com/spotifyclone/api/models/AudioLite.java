package com.spotifyclone.api.models;

import java.util.ArrayList;
import java.util.List;

public class AudioLite {
    private long id;
    private String name;
    private List<ArtistLite> artists;
    private String url;
    private String avatar;

    public AudioLite() {}

    public AudioLite(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public AudioLite(long id, String name, String url, String avatar) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.avatar = avatar;
    }

    public AudioLite(long id, String name, List<ArtistLite> artists, String url, String avatar) {
        this.id = id;
        this.name = name;
        this.artists = artists;
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

    public void setUrl(String url) {
        this.url = url;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
