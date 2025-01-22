import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "@/sanity/lib/client";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSectionProps {
  productId: string;
}

const ReviewSection = ({ productId }: ReviewSectionProps) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  // Fetch reviews for the product
  const fetchReviews = async () => {
    const query = `*[_type == "review" && product._ref == $productId && approved == true]{
      _id,
      name,
      rating,
      comment,
      date
    }`;
    const reviews = await client.fetch(query, { productId });
    setReviews(reviews);
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const review = {
      _type: "review",
      product: {
        _type: "reference",
        _ref: productId,
      },
      name,
      rating: Number(rating),
      comment,
      date: new Date().toISOString(),
      approved: false,
    };

    console.log("Submitting review:", review); // Debugging: Log the review data

    try {
      const response = await client.create(review);
      console.log("Review created successfully:", response); // Debugging: Log the response
      toast.success("Review submitted successfully! It will be visible after approval.");
      setName("");
      setRating(0);
      setComment("");
      fetchReviews(); // Refresh reviews after submission
    } catch (error) {
      console.error("Error creating review:", error); // Debugging: Log the error
      toast.error("Failed to submit review. Please try again.");
    }
  };

  // Calculate average rating
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length || 0;

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
      <div className="mb-4">
        <p className="text-lg">
          Average Rating: {averageRating.toFixed(1)} ({reviews.length} reviews)
        </p>
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>

      {/* Display Reviews */}
      <div className="mt-6 space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="p-4 bg-white rounded shadow">
            <p className="font-bold">{review.name}</p>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
            <p className="text-sm text-gray-500">
              Reviewed on: {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default ReviewSection;