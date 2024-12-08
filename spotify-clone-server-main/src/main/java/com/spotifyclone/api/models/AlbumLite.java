package com.spotifyclone.api.models;

public class AlbumLite {
    private long id;
    private String name;

    public AlbumLite() {}

    public AlbumLite(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }
}
