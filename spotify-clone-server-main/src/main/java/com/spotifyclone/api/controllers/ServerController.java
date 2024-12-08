package com.spotifyclone.api.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spotifyclone.api.repositories.ResponseObject;

@Controller
@RequestMapping(path = "/")
public class ServerController {
    @GetMapping("/")
    public ResponseEntity<ResponseObject> handleGetConnect() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("200", "Server run successfully", null)
            );
    }
}
