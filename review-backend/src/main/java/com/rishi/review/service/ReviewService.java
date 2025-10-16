package com.rishi.review.service;

import com.rishi.review.entity.Review;
import java.util.List;

public interface ReviewService {
    Review addReview(Review review);
    List<Review> getAllReviews();
    Review getReviewById(int id);
    Review updateReview(Review review);
    void deleteReviewById(int id);
}
