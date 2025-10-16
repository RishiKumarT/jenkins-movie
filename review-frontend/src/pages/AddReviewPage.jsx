import React, { useState, useEffect } from "react";
import axios from "axios";

const AddReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({
    id: "",
    user: "",
    movie: "",
    rating: "",
    comment: "",
    date: "",
  });
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setReviews(res.data);
    } catch {
      setMessage("Failed to fetch reviews.");
    }
  };

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!review.user || !review.movie || !review.rating || !review.comment) {
      setMessage("Please fill out all required fields.");
      return false;
    }
    return true;
  };

  const addReview = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, review);
      setMessage("Review added successfully!");
      fetchAllReviews();
      resetForm();
    } catch {
      setMessage("Error adding review.");
    }
  };

  const updateReview = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, review);
      setMessage("Review updated successfully!");
      fetchAllReviews();
      resetForm();
    } catch {
      setMessage("Error updating review.");
    }
  };

  const deleteReview = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllReviews();
    } catch {
      setMessage("Error deleting review.");
    }
  };

  const handleEdit = (rev) => {
    setReview(rev);
    setEditMode(true);
    setMessage(`Editing review with ID ${rev.id}`);
  };

  const resetForm = () => {
    setReview({
      id: "",
      user: "",
      movie: "",
      rating: "",
      comment: "",
      date: "",
    });
    setEditMode(false);
  };

  return (
    <div className="review-container">
      {message && (
        <div
          className={`message-banner ${
            message.toLowerCase().includes("error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <h2>🎬 Add / Manage Movie Reviews</h2>

      <div className="form-grid">
        <input type="text" name="user" placeholder="User" value={review.user} onChange={handleChange} />
        <input type="text" name="movie" placeholder="Movie" value={review.movie} onChange={handleChange} />
        <input type="number" name="rating" placeholder="Rating (1-10)" value={review.rating} onChange={handleChange} />
        <textarea name="comment" placeholder="Your Comment" value={review.comment} onChange={handleChange} />
        <input type="date" name="date" value={review.date} onChange={handleChange} />
      </div>

      <div className="btn-group">
        {!editMode ? (
          <button className="btn-blue" onClick={addReview}>Add Review</button>
        ) : (
          <>
            <button className="btn-green" onClick={updateReview}>Update Review</button>
            <button className="btn-gray" onClick={resetForm}>Cancel</button>
          </>
        )}
      </div>

      <h3>All Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th><th>User</th><th>Movie</th>
                <th>Rating</th><th>Comment</th><th>Date</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr key={rev.id}>
                  <td>{rev.id}</td>
                  <td>{rev.user}</td>
                  <td>{rev.movie}</td>
                  <td>{rev.rating}</td>
                  <td>{rev.comment}</td>
                  <td>{rev.date}</td>
                  <td>
                    <button className="btn-green" onClick={() => handleEdit(rev)}>Edit</button>
                    <button className="btn-red" onClick={() => deleteReview(rev.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddReviewPage;
