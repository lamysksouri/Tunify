package com.spotifyclone.api.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.spotifyclone.api.entities.UserEntity;
import com.spotifyclone.api.models.Album;
import com.spotifyclone.api.models.AlbumLite;
import com.spotifyclone.api.models.AlbumResponse;
import com.spotifyclone.api.models.Artist;
import com.spotifyclone.api.models.ArtistLite;
import com.spotifyclone.api.models.Audio;
import com.spotifyclone.api.models.AudioLite;
import com.spotifyclone.api.models.AudioResponse;
import com.spotifyclone.api.models.Playlist;
import com.spotifyclone.api.models.PlaylistModify;
import com.spotifyclone.api.models.PlaylistResponse;
import com.spotifyclone.api.repositories.AlbumRepository;
import com.spotifyclone.api.repositories.ArtistRepository;
import com.spotifyclone.api.repositories.AudioRepository;
import com.spotifyclone.api.repositories.PlaylistRepository;
import com.spotifyclone.api.repositories.ResponseObject;
import com.spotifyclone.api.repositories.UserRepository;

@Service
public class MusicService {
    @Autowired
    private AudioRepository audioRepository;

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlaylistRepository playlistRepository;

    public ResponseEntity<ResponseObject> loadAllAudios() {
        try {
            List<Audio> audioSrc = audioRepository.findAll();
            List<Artist> artistSrc = artistRepository.findAll();
            List<Album> albumSrc = albumRepository.findAll();

            List<AudioResponse> audios = new ArrayList<>();

            for (Audio audio : audioSrc) {
                AudioResponse newAudio = new AudioResponse();

                newAudio.setId(audio.getId());
                newAudio.setName(audio.getName());
                newAudio.setUrl(audio.getUrl());
                newAudio.setAvatar(audio.getAvatar());

                // Get artists name
                for (Long artist : audio.getArtists()) {
                    for (Artist artistData : artistSrc) {
                        if(artist == artistData.getId()) {
                            newAudio.modifyArtists(new ArtistLite(artistData.getId(), artistData.getName(), artistData.getAvatar()));
                        }
                    }
                }

                // Get albums name
                for (Long album : audio.getAlbums()) {
                    for (Album albumData : albumSrc) {
                        if(album == albumData.getId()) {
                            newAudio.modifyAlbums(new AlbumLite(albumData.getId(), albumData.getName()));
                        }
                    }
                }

                audios.add(newAudio);
            }

            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("200", "Get audio list successfully", audios)
                );

        } catch (Exception e) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }     
    }

    public ResponseEntity<ResponseObject> getAudioByid(long id) {
        try {
            List<Artist> artistSrc = artistRepository.findAll();
            List<Album> albumSrc = albumRepository.findAll();

            Optional<Audio> targetAudio = audioRepository.findById(id);

            if(!targetAudio.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Audio not found", id)
                    );
            }

            AudioResponse newAudio = new AudioResponse();

            newAudio.setId(targetAudio.get().getId());
            newAudio.setName(targetAudio.get().getName());
            newAudio.setUrl(targetAudio.get().getUrl());
            newAudio.setAvatar(targetAudio.get().getAvatar());

            // Get artists name
            for (Long artist : targetAudio.get().getArtists()) {
                for (Artist artistData : artistSrc) {
                    if(artist == artistData.getId()) {
                        newAudio.modifyArtists(new ArtistLite(artistData.getId(), artistData.getName(), artistData.getAvatar()));
                    }
                }
            }

            // Get albums name
            for (Long album : targetAudio.get().getAlbums()) {
                for (Album albumData : albumSrc) {
                    if(album == albumData.getId()) {
                        newAudio.modifyAlbums(new AlbumLite(albumData.getId(), albumData.getName()));
                    }
                }
            }

            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("200", "Get audio successfully", newAudio)
                );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> loadAllArtists() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(
            new ResponseObject("200", "Get artist list successfully", artistRepository.findAll())
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }     
    }

    public ResponseEntity<ResponseObject> getArtistById(long id) {
        try {
            Optional<Artist> targetArtist = artistRepository.findById(id);

            if(!targetArtist.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Not found artist", id)
                );
            }

            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("200", "Get artist successfully", targetArtist)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ResponseObject("500", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> getAudiosByArtistId(long id) {
        try {
            List<Audio> audios = audioRepository.findByArtistId(id);

            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("200", "Get audios by artist successfully", audios)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ResponseObject("500", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> addNewArtist(Artist artist) {
        try {
             if(artist.getName() == null || artist.getAvatar() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("401", "Bad new artist request", artist)
                    );
            }

            // Set init follower
            artist.setFollowers(1);

            // Save new artist
            artistRepository.save(artist);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                new ResponseObject("201", "Add new artist successfully", artist)
                );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }  
    }
    
    public ResponseEntity<ResponseObject> editArtist(Artist editArtist) {
        try {
            if(editArtist.getName() == null || editArtist.getFollowers() == 0 || editArtist.getAvatar() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("401", "Bad edit artist request", editArtist)
                    );
            }

            List<Artist> artistSrc = artistRepository.findAll();
            Optional<Artist> targetArtist = artistRepository.findById(editArtist.getId());

            if(!targetArtist.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Artist not found", editArtist)
                    );
            }

            // Update artist
            for (Artist artist : artistSrc) {
                if(artist.getId() == editArtist.getId()) {
                    artist.setName(editArtist.getName());
                    artist.setFollowers(editArtist.getFollowers());
                    artist.setAvatar(editArtist.getAvatar());

                    artistRepository.save(artist);
                }
            }

            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("201", "Edit artist successfully", editArtist)
                );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> deleteArtistById(long id) {
        try {
            Optional<Artist> targetArtist = artistRepository.findById(id);

            if(!targetArtist.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Album not found", id)
                    );
            }

            artistRepository.deleteById(id);

            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("201", "Delete artist successfully", id)
                );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> loadAllAlbums() {
        try {
            List<Album> albumSrc = albumRepository.findAll();
            List<Audio> audioSrc = audioRepository.findAll();
            List<Artist> artistSrc = artistRepository.findAll();

            List<AlbumResponse> albums = new ArrayList<>();

            for (Album album : albumSrc) {
                AlbumResponse newAlbum = new AlbumResponse();

                newAlbum.setId(album.getId());
                newAlbum.setName(album.getName());
                newAlbum.setAvatar(album.getAvatar());

                // Get audio
                for (Long audio : album.getAudios()) {
                    for (Audio audioData : audioSrc) {
                        if(audio == audioData.getId()) {
                            // newAlbum.modifyAudios(new AudioLite(audioData.getId(), audioData.getName()));

                            List<ArtistLite> artists = new ArrayList<>();
                            List<Long> artistByAudio = audioData.getArtists();

                            // Get artist
                            for (Artist artist: artistSrc) {
                                if(artistByAudio.contains(artist.getId())) {
                                    artists.add(new ArtistLite(artist.getId(), artist.getName(), artist.getAvatar()));
                                }
                            }

                            newAlbum.modifyAudios(new AudioLite(
                                audioData.getId(),
                                audioData.getName(),
                                artists,
                                audioData.getUrl(),
                                audioData.getAvatar()));

                        }
                    }
                }               
            
                String formatCreatedAt = album.getCreatedAt().toString();
                newAlbum.setCreatedAt(formatCreatedAt);

                albums.add(newAlbum);
            }

            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("200", "Get album list successfully", albums)
                );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> getAlbumById(long id) {
        try {
            List<Audio> audioSrc = audioRepository.findAll();
            List<Artist> artistSrc = artistRepository.findAll();

            Optional<Album> targetAlbum = albumRepository.findById(id);

            if(!targetAlbum.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Album not found", id)
                    );
            }

            AlbumResponse newAlbum = new AlbumResponse();

            newAlbum.setId(targetAlbum.get().getId());
            newAlbum.setName(targetAlbum.get().getName());
            newAlbum.setAvatar(targetAlbum.get().getAvatar());

            // Get audio
            for (Long audio : targetAlbum.get().getAudios()) {
                for (Audio audioData : audioSrc) {
                    if(audio == audioData.getId()) {
                        List<ArtistLite> artists = new ArrayList<>();
                        List<Long> artistByAudio = audioData.getArtists();

                        // Get artist
                        for (Artist artist: artistSrc) {
                            if(artistByAudio.contains(artist.getId())) {
                                artists.add(new ArtistLite(artist.getId(), artist.getName(), artist.getAvatar()));
                            }
                        }

                        newAlbum.modifyAudios(new AudioLite(
                            audioData.getId(),
                            audioData.getName(),
                            artists,
                            audioData.getUrl(),
                            audioData.getAvatar()));

                    }
                }
            }               
        
            String formatCreatedAt = targetAlbum.get().getCreatedAt().toString();
            newAlbum.setCreatedAt(formatCreatedAt);


            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("200", "Get album successfully", newAlbum)
                );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> addNewAudio(Audio newAudio) {
        try {
            String name = newAudio.getName();
            List<Long> artists = new ArrayList<>();
            artists = newAudio.getArtists();
            List<Long> albums = new ArrayList<>();
            albums = newAudio.getAlbums();
            String url = newAudio.getUrl();
            String avatar = newAudio.getAvatar();

            Boolean checkExistArtist = true;
            Boolean checkExistAlbum = true;

            // Check bad request
            if(name == null || artists == null || albums == null || url == null || avatar == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("401", "Bad new audio request", newAudio)
                    );
            }

            // Check exist artist
            for (Long artist : artists) {
                Optional<Artist> targetArtist = artistRepository.findById(artist);

                if(!targetArtist.isPresent()) {
                    checkExistArtist = false;
                }
            }

            if(checkExistArtist == false) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Artists not found", newAudio)
                    );
            }

            // Check exist album
            for (Long album : albums) {
                Optional<Album> targetAlbum = albumRepository.findById(album);

                if(!targetAlbum.isPresent()) {
                    checkExistAlbum = false;
                }
            }

            if(checkExistAlbum == false) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Albums not found", newAudio)
                    );
            }

            // Save new audio
            audioRepository.save(newAudio);

            // Save albums
            List<Album> albumSrc = albumRepository.findAll();

            for (Album album : albumSrc) {
                for (Long albumData : newAudio.getAlbums()) {
                    if(album.getId() == albumData) {
                        album.modifyAudios(newAudio.getId());
                        albumRepository.save(album);
                    }
                }
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(
                new ResponseObject("201", "Add new audio successfully", newAudio)
                );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> deleteAudioById(long id) {
        try {
            Optional<Audio> targetAudio = audioRepository.findById(id);

            if(!targetAudio.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Audio not found", id)
                    );
            }

            // Delete audio
            audioRepository.deleteById(id);

            // Delete audio from albums
            List<Album> albumSrc = albumRepository.findAll();

            for (Album album : albumSrc) {
                for (Long audio : album.getAudios()) {
                    if(audio == id) {
                        album.filterAudios(id);

                        albumRepository.save(album);
                    }
                }
            }

            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("201", "Delete audio successfully", id)
                );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> addNewAlbum(Album newAlbum) {
        try {
            if(newAlbum.getName() == null || newAlbum.getAudios() == null || newAlbum.getAvatar() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("401", "Bad new album request", newAlbum)
                    );
            }
          
            // Created-at
            newAlbum.setCreatedAt(new Date());

            albumRepository.save(newAlbum);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                new ResponseObject("201", "Add new album successfully", newAlbum)
                );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> editAlbum(Album editAlbum) {
        try {
            if(editAlbum.getName() == null || editAlbum.getAudios() == null || editAlbum.getAvatar() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("401", "Bad edit album request", editAlbum)
                    );
            }

            List<Album> albumSrc = albumRepository.findAll();
            Optional<Album> targetAlbum = albumRepository.findById(editAlbum.getId());

            if(!targetAlbum.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Album not found", editAlbum)
                    );
            }

            // Update album
            for (Album album : albumSrc) {
                if(album.getId() == editAlbum.getId()) {
                    album.setName(editAlbum.getName());
                    album.setAudios(editAlbum.getAudios());
                    album.setAvatar(editAlbum.getAvatar());
                    albumRepository.save(album);
                }
            }

            // Add audio to album if not exist
            // for (Long audio : editAlbum.getAudios()) {
            //     if(!editAlbum.getAudios().contains(audio)) {
            //         editAlbum.modifyAudios(audio);
            //     }
            // }
            

            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("201", "Edit album successfully", editAlbum)
                );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> deleteAlbumById(long id) {
        try {
            Optional<Album> targetAlbum = albumRepository.findById(id);

            if(!targetAlbum.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Album not found", id)
                    );
            }

            albumRepository.deleteById(id);

            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("201", "Delete album successfully", id)
                );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> getAllPlaylistByUserId(long id) {
        try {
            Optional<UserEntity> targetUser = userRepository.findById(id);
            List<Audio> audioSrc = audioRepository.findAll();
            List<Artist> artistSrc = artistRepository.findAll();


            if(!targetUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "User not found", id)
                    );
            }

            List<Playlist> playlists = playlistRepository.findByUserId(id);
            List<PlaylistResponse> playlistReponse = new ArrayList<>();


            for (Playlist playlist : playlists) {
                PlaylistResponse newPlaylist = new PlaylistResponse();

                newPlaylist.setId(playlist.getId());
                newPlaylist.setUserId(targetUser.get().getId());
                newPlaylist.setName(playlist.getName());
                newPlaylist.setAvatar(playlist.getAvatar());

                for (Audio audio : audioSrc) {
                    if(playlist.getAudios().contains(audio.getId())) {

                        List<ArtistLite> artists = new ArrayList<>();
                        List<Long> artistByAudio = audio.getArtists();

                        // Get artist
                        for (Artist artist: artistSrc) {
                            if(artistByAudio.contains(artist.getId())) {
                                artists.add(new ArtistLite(artist.getId(), artist.getName(), artist.getAvatar()));
                            }
                        }

                        newPlaylist.modifyAudios(new AudioLite(
                                audio.getId(),
                                audio.getName(),
                                artists,
                                audio.getUrl(),
                                audio.getAvatar()));
                    }
                }

                playlistReponse.add(newPlaylist);
            }

            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("200", "Get playlist successfully", playlistReponse)
                );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> getPlaylistById(long id) {
        try {
            Optional<Playlist> targetPlaylist = playlistRepository.findById(id);
            List<Audio> audioSrc = audioRepository.findAll();
            List<Artist> artistSrc = artistRepository.findAll();

            if(!targetPlaylist.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Playlist not found", id)
                    );
            }

            PlaylistResponse resPlaylist = new PlaylistResponse();

            resPlaylist.setId(targetPlaylist.get().getId());
            resPlaylist.setUserId(targetPlaylist.get().getUserId());
            resPlaylist.setName(targetPlaylist.get().getName());
            resPlaylist.setAvatar(targetPlaylist.get().getAvatar());

            Optional<UserEntity> targetUser = userRepository.findById(targetPlaylist.get().getUserId());

            if(!targetUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "User not found", id)
                    );
            }

            resPlaylist.setAuthor(targetUser.get().getUsername());

            for (Audio audio : audioSrc) {
                if(targetPlaylist.get().getAudios().contains(audio.getId())) {

                    List<ArtistLite> artists = new ArrayList<>();
                    List<Long> artistByAudio = audio.getArtists();

                    // Get artist
                    for (Artist artist: artistSrc) {
                        if(artistByAudio.contains(artist.getId())) {
                            artists.add(new ArtistLite(artist.getId(), artist.getName(), artist.getAvatar()));
                        }
                    }

                    resPlaylist.modifyAudios(new AudioLite(
                        audio.getId(),
                        audio.getName(),
                        artists,
                        audio.getUrl(),
                        audio.getAvatar()));
                }
            }

            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("200", "Get playlist by id successfully", resPlaylist)
                );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> addNewPlayist(@RequestBody Playlist newPlaylist) {
        try {
            if(newPlaylist.getUserId() == 0 || newPlaylist.getName() == null ||
            newPlaylist.getAudios() == null || newPlaylist.getAvatar() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("401", "Bad playist request", newPlaylist)
                    );
            }

            Optional<UserEntity> targetUser = userRepository.findById(newPlaylist.getUserId());

            // Check user
            if(!targetUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "User not found", newPlaylist)
                    );
            }

            // Check audios
            for (Long audio : newPlaylist.getAudios()) {
                Optional<Audio> targetAudio = audioRepository.findById(audio);
                if(!targetAudio.isPresent()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("404", "Audio not found", newPlaylist)
                        );
                }
            }

            playlistRepository.save(newPlaylist);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                new ResponseObject("201", "Create new playist successfully", newPlaylist)
                );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> deletePlaylistById(long id) {
        try {
            Optional<Playlist> targetPlaylist = playlistRepository.findById(id);

            if(!targetPlaylist.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Playlist not found", id)
                    );
            }

            playlistRepository.deleteById(id);

            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("201", "Delete playist successfully", id)
                );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> editPlaylist(Playlist editPlaylist) {
        try {
            if(editPlaylist.getName() == null || editPlaylist.getAudios() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("401", "Bad edit album request", editPlaylist)
                    );
            }

            List<Playlist> playlistSrc = playlistRepository.findAll();
            Optional<Playlist> targetPlaylist = playlistRepository.findById(editPlaylist.getId());

            if(!targetPlaylist.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Playlist not found", editPlaylist)
                    );
            }

            // Update playlist
            for (Playlist playlist : playlistSrc) {
                if(playlist.getId() == editPlaylist.getId()) {
                    playlist.setName(editPlaylist.getName());
                    playlist.setAudios(editPlaylist.getAudios());
                    playlist.setAvatar(editPlaylist.getAvatar());
                    playlistRepository.save(playlist);
                }
            }        

            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("201", "Edit album successfully", editPlaylist)
                );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> modifyAddPlaylistById(PlaylistModify playlistModify) {
        try {
            if(playlistModify.getUserId() == 0 || playlistModify.getPlaylistId() == 0 || playlistModify.getAudioId() == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("400", "Bad request", playlistModify)
                    );
            }

            List<Playlist> playlistSrc = playlistRepository.findAll();
            Optional<Playlist> targetPlaylist = playlistRepository.findById(playlistModify.getPlaylistId());
            Optional<Audio> targetAudio = audioRepository.findById(playlistModify.getAudioId());

            if(!targetPlaylist.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Playlist not found", playlistModify)
                    );
            }

            if(targetPlaylist.get().getUserId() != playlistModify.getUserId()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("401", "User ID not match", playlistModify)
                    );
            }

            if(!targetAudio.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Audio not found", playlistModify)
                    );
            }

            // Update playlist audio list
            for (Playlist playlist : playlistSrc) {
                if(playlist.getId() == targetPlaylist.get().getId()) {
                    // if audio is exist
                    if(playlist.getAudios().contains(targetAudio.get().getId())) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                            new ResponseObject("400", "Audio is exist", playlistModify)
                            );
                    }
                    else {
                        playlist.modifyAudios(targetAudio.get().getId());
                        playlistRepository.save(playlist);
                    }                  
                }
            }

            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("201", "Modify playlist successfully", playlistModify)
                );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }

    public ResponseEntity<ResponseObject> modifyDeletePlaylistById(PlaylistModify playlistModify) {
        try {
            if(playlistModify.getUserId() == 0 || playlistModify.getPlaylistId() == 0 || playlistModify.getAudioId() == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("400", "Bad request", playlistModify)
                    );
            }

            List<Playlist> playlistSrc = playlistRepository.findAll();
            Optional<Playlist> targetPlaylist = playlistRepository.findById(playlistModify.getPlaylistId());
            Optional<Audio> targetAudio = audioRepository.findById(playlistModify.getAudioId());
            boolean isDelete = false;

            if(!targetPlaylist.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Playlist not found", playlistModify)
                    );
            }

            if(targetPlaylist.get().getUserId() != playlistModify.getUserId()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("401", "User ID not match", playlistModify)
                    );
            }

            if(!targetAudio.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Audio not found", playlistModify)
                    );
            }

            // Update playlist audio list
            for (Playlist playlist : playlistSrc) {
                if(playlist.getId() == targetPlaylist.get().getId()) {
                    if(playlist.getAudios().contains(targetAudio.get().getId())) {
                        playlist.filterAudios(targetAudio.get().getId());
                        playlistRepository.save(playlist);
                        isDelete = true;
                    }                 
                }
            }

            if(isDelete == true) {
                return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("201", "Modify playlist successfully", playlistModify)
                    );
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "Audio not found", playlistModify)
                    );
            }

            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("400", "Something wrong", e.getMessage())
                );
        }
    }
}
