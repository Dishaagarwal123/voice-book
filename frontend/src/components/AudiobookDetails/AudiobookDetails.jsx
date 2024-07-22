import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useSelector } from "react-redux";

const AudiobookDetails = () => {

    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
    const [isReviewing, setIsReviewing] = useState(false);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:5500/auth/get-user-info",{headers}); 
                console.log("user-info",response);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5500/audiobook/${id}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching audiobook details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);


    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5500/review/${id}`, newReview);
            setData(prev => ({
                ...prev,
                reviews: [response.data, ...prev.reviews],
                averageRating: response.data.averageRating,
                reviewsCount: prev.reviewsCount + 1
            }));
            setNewReview({ rating: 0, comment: '' });
            setIsReviewing(false);
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    const handleWriteReviewClick = () => {
        if (isLoggedIn) {
            setIsReviewing(true);
        } else {
            navigate('/login'); // Redirect to login page if not logged in
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    const fullStars = Math.floor(data.averageRating);
    const hasHalfStar = (data.averageRating - fullStars) > 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <img src={data.coverImage} alt={data.title} className="w-full h-auto" />
                    </div>
                    <div className="w-full md:w-2/3 md:pl-4 ml-5">
                        <h1 className="text-2xl font-bold">{data.title}</h1>
                        <h2 className="text-xl font-semibold">{data.author}</h2>
                        <h3 className="text-lg">{data.genre}</h3>
                        <div className="my-2">
                            {/* Star Ratings Summary */}
                            <div className="flex items-center">
                                <div className="text-yellow-500">
                                    {[...Array(fullStars)].map((_, i) => (
                                        <span key={`full-${i}`} className="fa fa-star"></span>
                                    ))}
                                    {hasHalfStar && (
                                        <span className="fa fa-star-half-alt"></span>
                                    )}
                                    {[...Array(emptyStars)].map((_, i) => (
                                        <span key={`empty-${i}`} className="fa fa-star-o"></span>
                                    ))}
                                </div>
                                <span className="ml-2">({data.averageRating.toFixed(1)})</span>
                            </div>
                            <div className="mt-2">
                                <p>{data.reviewsCount} Reviews</p>
                            </div>
                        </div>
                        <p className="mt-4">{data.description}</p>

                        {/* Review Form */}
                        {isReviewing ? (
                            <form onSubmit={handleSubmitReview} className="mt-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`fa fa-star ${newReview.rating > i ? 'checked' : ''}`}
                                            onClick={() => setNewReview(prev => ({ ...prev, rating: i + 1 }))}
                                        ></span>
                                    ))}
                                </div>
                                <textarea
                                    name="comment"
                                    value={newReview.comment}
                                    onChange={handleReviewChange}
                                    placeholder="Write your review..."
                                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                                />
                                <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">Submit Review</button>
                                <button type="button" onClick={() => setIsReviewing(false)} className="ml-2 p-2 bg-gray-300 rounded">Cancel</button>
                            </form>
                        ) : (
                            <button onClick={handleWriteReviewClick} className="mt-4 p-2 bg-blue-500 text-white rounded">Write a Review</button>
                        )}

                        {/* Reviews List */}
                        <h2 className="text-xl font-semibold mt-8 mb-4">Reviews</h2>
                        {data.reviews.length ? (
                            <div className="mt-4">
                                {data.reviews.map((review) => (
                                    <div key={review._id} className="border-b border-gray-300 py-4">
                                        <div className="flex items-center">
                                            <div className="text-yellow-500">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <span key={`review-full-${i}`} className="fa fa-star"></span>
                                                ))}
                                                {[...Array(5 - review.rating)].map((_, i) => (
                                                    <span key={`review-empty-${i}`} className="fa fa-star-o"></span>
                                                ))}
                                            </div>
                                            <span className="ml-2 font-semibold">{review.userId.username}</span>
                                            <span className="ml-2 text-gray-600 text-sm">{new Date(review.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="mt-2">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-4">No reviews yet.</div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AudiobookDetails;

