package com.rishi.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rishi.review.entity.Review;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByMovie(String movie);
}
