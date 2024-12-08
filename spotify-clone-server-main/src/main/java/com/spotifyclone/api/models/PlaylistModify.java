package com.spotifyclone.api.models;

public class PlaylistModify {
    private long userId;
    private long playlistId;
    private long audioId;

    PlaylistModify() {}

    PlaylistModify(long userId, long playlistId, long audioId) {
        this.userId = userId;
        this.playlistId = playlistId;
        this.audioId = audioId;
    }

    public long getUserId() {
        return this.userId;
    }

    public long getPlaylistId() {
        return this.playlistId;
    }

    public long getAudioId() {
        return this.audioId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public void setPlaylistId(long playlistId) {
        this.playlistId = playlistId;
    }

    public void setAudioId(long audioId) {
        this.audioId = audioId;
    }
}
