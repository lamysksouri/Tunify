package com.spotifyclone.api.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_artist")
public class Artist {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    @Column(name = "name", columnDefinition="VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_bin")
    private String name;
    
    @Column(name = "followers")
    private long followers;

    @Column(name = "avatar")
    private String avatar;

    public Artist() {}

    public Artist(long id, String name, long followers, String avatar) {
        this.id = id;
        this.name = name;
        this.followers = followers;
        this.avatar = avatar;
    }

    public Artist(String name, long followers, String avatar) {
        this.name = name;
        this.followers = followers;
        this.avatar = avatar;
    }

    public long getId() {
        return this.id;
    }
    
    public String getName() {
        return this.name;
    }

    public long getFollowers() {
        return this.followers;
    }

    public String getAvatar() {
        return this.avatar;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setFollowers(long followers) {
        this.followers = followers;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
