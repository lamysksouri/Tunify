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
@Table(name = "tbl_playlist")
public class Playlist {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    @Column(name = "user_id")
    private long user_id;

    @Column(name = "name", columnDefinition="VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_bin")
    private String name;

    @ElementCollection
    @Column(name = "audios")
    private List<Long> audios;

    @Column(name = "avatar")
    private String avatar;

    public Playlist() {}

    public Playlist(long user_id, String name, List<Long> audios, String avatar) {
        this.user_id = user_id;
        this.name = name;
        this.audios = audios;
        this.avatar = avatar;
    }

    public long getId() {
        return this.id;
    }

    public long getUserId() {
        return this.user_id;
    }

    public String getName() {
        return this.name;
    }

    public List<Long> getAudios() {
        return this.audios;
    }

    public String getAvatar() {
        return this.avatar;
    }

    public void setUserId(long user_id) {
        this.user_id = user_id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAudios(List<Long> audios) {
        this.audios = audios;
    }

    public void modifyAudios(Long audio) {
        if(this.audios == null) this.audios = new ArrayList<>();

        this.audios.add(audio);
    }

    public void filterAudios(Long audio) {
        if(this.audios == null) this.audios = new ArrayList<>();

        List<Long> newList = new ArrayList<>();

        for (Long data : this.audios) {
            if(data != audio) newList.add(data);
        }

        this.audios = newList;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
