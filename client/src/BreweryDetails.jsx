import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BreweryDetails = () => {
    const { id } = useParams();
    const [breweryDetails, setBreweryDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newRating, setNewRating] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBreweryDetails = async () => {
            try {
                // Fetch brewery details from Open Brewery DB API
                const breweryResponse = await axios.get(`https://api.openbrewerydb.org/v1/breweries/${id}`);
                setBreweryDetails(breweryResponse.data);

                // Fetch reviews for the brewery from your backend (assuming DynamoDB)
                const reviewsResponse = await axios.get(`http://localhost:5000/api/breweries/${id}/reviews`);
                setReviews(reviewsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            }
        };

        fetchBreweryDetails();
    }, [id]);

    const handleRatingChange = (event) => {
        setNewRating(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setNewDescription(event.target.value);
    };

    const handleSubmitReview = async (event) => {
        event.preventDefault();

        try {
            // POST new review to backend
            await axios.post(`http://localhost:5000/api/breweries/${id}/reviews`, {
                rating: newRating,
                description: newDescription,
            });

            // Fetch updated reviews after adding new review
            const reviewsResponse = await axios.get(`http://localhost:5000/api/breweries/${id}/reviews`);
            setReviews(reviewsResponse.data);

            // Clear form fields
            setNewRating('');
            setNewDescription('');
        } catch (error) {
            console.error('Error adding review:', error);
            setError('Error adding review');
        }
    };

    if (!breweryDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>{breweryDetails.name}</h2>
            <div>
                <p><strong>Address:</strong> {breweryDetails.street}</p>
                <p><strong>Phone:</strong> {breweryDetails.phone}</p>
                <p><strong>Website:</strong> <a href={breweryDetails.website_url} target="_blank" rel="noopener noreferrer">{breweryDetails.website_url}</a></p>
                <p><strong>State, City:</strong> {breweryDetails.state}, {breweryDetails.city}</p>
            </div>

            <h3 className="my-4">Reviews</h3>
            {reviews.length === 0 ? <p>No reviews yet.</p> : (
                <ul className="list-group">
                    {reviews.map((review, index) => (
                        <li key={index} className="list-group-item">
                            <p><strong>Rating:</strong> {review.rating}</p>
                            <p><strong>Description:</strong> {review.description}</p>
                        </li>
                    ))}
                </ul>
            )}

            <h3 className="my-4">Add a Review</h3>
            <form onSubmit={handleSubmitReview}>
                <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="rating"
                        value={newRating}
                        onChange={handleRatingChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        value={newDescription}
                        onChange={handleDescriptionChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default BreweryDetails;