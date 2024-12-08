package com.spotifyclone.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spotifyclone.api.models.Album;
import com.spotifyclone.api.models.Artist;
import com.spotifyclone.api.models.Audio;
import com.spotifyclone.api.models.Playlist;
import com.spotifyclone.api.models.PlaylistModify;
import com.spotifyclone.api.repositories.ResponseObject;
import com.spotifyclone.api.services.MusicService;

@Controller
@RequestMapping("/api/v1")
public class MusicController {
    @Autowired
    private MusicService musicService;

    @GetMapping("/audios")
    public ResponseEntity<ResponseObject> getAllAudios() {
        return musicService.loadAllAudios();
    }

    @GetMapping("/audio/{id}")
    public ResponseEntity<ResponseObject> getAudioByid(@PathVariable long id) {
        return musicService.getAudioByid(id);
    }

    @GetMapping("/audio/artist/{id}")
    public ResponseEntity<ResponseObject> getAudiosByArtistId(@PathVariable long id) {
        return musicService.getAudiosByArtistId(id);
    }

    @GetMapping("/artists")
    public ResponseEntity<ResponseObject> getAllArtists() {
        return musicService.loadAllArtists();
    }

    @GetMapping("/artist/{id}")
    public ResponseEntity<ResponseObject> getArtistById(@PathVariable long id) {
        return musicService.getArtistById(id);
    }

    @PostMapping("/add/artist")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')") 
    public ResponseEntity<ResponseObject> addNewArtist(@RequestBody Artist newArtist) {
        return musicService.addNewArtist(newArtist);
    }

    @PostMapping("/edit/artist")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')") 
    public ResponseEntity<ResponseObject> editArtist(@RequestBody Artist editArtist) {
        return musicService.editArtist(editArtist);
    }

    @PostMapping("/delete/artist/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')") 
    public ResponseEntity<ResponseObject> deleteArtistById(@PathVariable long id) {
        return musicService.deleteArtistById(id);
    }

    @GetMapping("/albums")
    public ResponseEntity<ResponseObject> getAllAlbums() {
        return musicService.loadAllAlbums();
    }

    @GetMapping("/album/{id}")
    public ResponseEntity<ResponseObject> getAlbumById(@PathVariable long id) {
        return musicService.getAlbumById(id);
    }

    @PostMapping("/add/audio")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')") 
    public ResponseEntity<ResponseObject> addNewAudio(@RequestBody Audio newAudio) {
        return musicService.addNewAudio(newAudio);
    }

    @PostMapping("/delete/audio/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')") 
    public ResponseEntity<ResponseObject> deleteAudio(@PathVariable long id) {
        return musicService.deleteAudioById(id);
    }

    @PostMapping("/add/album")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')") 
    public ResponseEntity<ResponseObject> addNewAlbum(@RequestBody Album newAlbum) {
        return musicService.addNewAlbum(newAlbum);
    }

    @PostMapping("/edit/album")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')") 
    public ResponseEntity<ResponseObject> editAlbum(@RequestBody Album editAlbum) {
        return musicService.editAlbum(editAlbum);
    }

    @PostMapping("/delete/album/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')") 
    public ResponseEntity<ResponseObject> deleteAlbum(@PathVariable long id) {
        return musicService.deleteAlbumById(id);
    }

    @GetMapping("/playlist/{id}")
    public ResponseEntity<ResponseObject> getAllPlaylistByUserId(@PathVariable long id) {
        return musicService.getAllPlaylistByUserId(id);
    }

    @GetMapping("/playlist/detail/{id}")
    public ResponseEntity<ResponseObject> getPlaylistById(@PathVariable long id) {
        return musicService.getPlaylistById(id);
    }

    @PostMapping("/add/playlist")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')") 
    public ResponseEntity<ResponseObject> addNewPlaylist(@RequestBody Playlist newPlaylist) {
        return musicService.addNewPlayist(newPlaylist);
    }

    @PostMapping("/edit/playlist")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')") 
    public ResponseEntity<ResponseObject> editPlaylist(@RequestBody Playlist editPlaylist) {
        return musicService.editPlaylist(editPlaylist);
    }

    @PutMapping("/edit/playlist")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')") 
    public ResponseEntity<ResponseObject> modifyPlaylistById(@RequestBody PlaylistModify playlistModify) {
        return musicService.modifyAddPlaylistById(playlistModify);
    }

    @DeleteMapping("/edit/playlist")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')") 
    public ResponseEntity<ResponseObject> modifyDeletePlaylistById(@RequestBody PlaylistModify playlistModify) {
        return musicService.modifyDeletePlaylistById(playlistModify);
    }

    @PostMapping("/delete/playlist/{id}")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") 
    public ResponseEntity<ResponseObject> deletePlaylist(@PathVariable long id) {
        return musicService.deletePlaylistById(id);
    }
}
