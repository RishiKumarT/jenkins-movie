package com.rishi.review;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ReviewBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReviewBackendApplication.class, args);
        System.out.println("🎬 Movie Review API is Running!");
    }
}
