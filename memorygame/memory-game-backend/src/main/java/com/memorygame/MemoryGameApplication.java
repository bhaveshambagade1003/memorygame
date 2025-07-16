package com.memorygame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:4200")
public class MemoryGameApplication {
    public static void main(String[] args) {
        SpringApplication.run(MemoryGameApplication.class, args);
    }
}
