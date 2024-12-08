package com.spotifyclone.api.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "tbl_album")
public class Album {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    @Column(name = "name", columnDefinition="VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_bin")
    private String name;

    @ElementCollection
    private List<Long> audios;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createdAt")
    private Date createdAt;

    @Column(name = "avatar")
    private String avatar;

    public Album () {}

    public Album (String name, List<Long> audios, Date createdAt, String avatar) {
        this.name = name;
        this.audios = audios;
        this.createdAt = createdAt;
        this.avatar = avatar;
    }

    public Album (String name, Date createdAt, String avatar) {
        this.name = name;
        this.createdAt = createdAt;
        this.avatar = avatar;
    }

    public long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public List<Long> getAudios() {
        return this.audios;
    }

    public Date getCreatedAt() {
        return this.createdAt;
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

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}

