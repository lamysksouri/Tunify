package com.spotifyclone.api.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spotifyclone.api.entities.UserEntity;
import com.spotifyclone.api.models.Token;
import com.spotifyclone.api.models.UserInfoDetails;
import com.spotifyclone.api.repositories.ResponseObject;
import com.spotifyclone.api.repositories.UserRepository;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtService jwtService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> userDetail = repository.findByUsername(username);
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }

    public List<UserEntity> loadAll() {
        return repository.findAll();
    }

    public ResponseEntity<ResponseObject> addUser(UserEntity user) {
        try {
            Optional<UserEntity> existUser = repository.findByUsername(user.getUsername());

            if (existUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("401", "User is already exist", user.getUsername())
                );
            }

            user.setPassword(encoder.encode(user.getPassword()));
            user.setSubscriptionStatus("FREE"); // Set default subscription status
            repository.save(user);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("201", "Add new user successfully", user)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("400", "Something wrong", e.getMessage())
            );
        }
    }

    public ResponseEntity<ResponseObject> refreshAccessToken(HttpServletRequest request) {
        try {
            Map<String, Object> claims = new HashMap<>();

            String authHeader = request.getHeader("Authorization");
            String refreshToken = null;
            String username = null;

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                refreshToken = authHeader.substring(7);
                username = jwtService.extractUsername(refreshToken);
            }

            if (username == null || username.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ResponseObject("401", "Unauthorized ", null)
                );
            }

            Token token = new Token(jwtService.createToken(claims, username, 20000),
                    jwtService.createToken(claims, username, 60000));

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("200", "Refresh token successfully", token)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("400", "Something wrong", e.getMessage())
            );
        }
    }

    public ResponseEntity<ResponseObject> getUserProfile(HttpServletRequest request) {
        try {
            String authHeader = request.getHeader("Authorization");
            String token = null;
            String username = null;

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
                username = jwtService.extractUsername(token);
            }

            if (username == null || username.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ResponseObject("401", "Unauthorized ", null)
                );
            }

            Optional<UserEntity> targetUser = repository.findByUsername(username);

            if (!targetUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("404", "User not found", null)
                );
            }

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("200", "Get user profile successfully", targetUser)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("400", "Something wrong", e.getMessage())
            );
        }
    }

    public ResponseEntity<ResponseObject> updateSubscriptionStatus(String username, String status) {
        Optional<UserEntity> userOptional = repository.findByUsername(username);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            user.setSubscriptionStatus(status);
            repository.save(user);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("200", "Subscription status updated successfully", user)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("404", "User not found", null)
            );
        }
    }
}
