package com.spotifyclone.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.spotifyclone.api.repositories.ResponseObject;
import com.spotifyclone.api.services.UploadImageService;
import com.spotifyclone.api.services.UploadAudioService;

@Controller
@RequestMapping("/upload")
public class UploadedController {
    @Autowired
    private UploadImageService uploadImageService;

    @Autowired
    private UploadAudioService uploadAudioService;

    @PostMapping("")
    public ResponseEntity<ResponseObject> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String generatedFileName;
            if (file.getContentType().startsWith("image")) {
                generatedFileName = uploadImageService.storeFile(file);
            } else if (file.getContentType().startsWith("audio")) {
                generatedFileName = uploadAudioService.storeFile(file);
            } else {
                throw new RuntimeException("Unsupported file type");
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "upload file successfully", generatedFileName)
            );
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                new ResponseObject("error", exception.getMessage(), "")
            );
        }
    }

    @GetMapping("/files/{fileName:.+}")
    public ResponseEntity<byte[]> readDetailFile(@PathVariable String fileName) {
        try {
            byte[] fileContent;
            if (fileName.endsWith(".png") || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
                fileContent = uploadImageService.readFileContent(fileName);
            } else if (fileName.endsWith(".mp3") || fileName.endsWith(".wav")) {
                fileContent = uploadAudioService.readFileContent(fileName);
            } else {
                throw new RuntimeException("Unsupported file type");
            }
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM).body(fileContent);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/files/{fileName:.+}")
    public ResponseEntity<ResponseObject> deleteFileById(@PathVariable String fileName) {
        try {
            boolean isDeleted;
            if (fileName.endsWith(".png") || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
                isDeleted = uploadImageService.deleteFileById(fileName);
            } else if (fileName.endsWith(".mp3") || fileName.endsWith(".wav")) {
                isDeleted = uploadAudioService.deleteFileById(fileName);
            } else {
                throw new RuntimeException("Unsupported file type");
            }
            if (isDeleted) {
                return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "delete file successfully", "")
                );
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("error", "file not found", "")
                );
            }
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                new ResponseObject("error", exception.getMessage(), "")
            );
        }
    }
}