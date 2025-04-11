import React from "react";
import RatingComponent from "../views/Components/RatingComponent.jsx";

export function ReviewView({
							   course,
							   reviews,
							   newReview,
							   setNewReview,
							   handleReviewSubmit,
						   }) {
	if (!course) return null;

	return (
		<div>
			<RatingComponent className="font-kanit flex justify-center items-center min-h-screen " />
			<h3 className="text-2xl font-semibold text-[#2e2e4f]">Reviews</h3>
			{/* Reviews Section */}
			<div className="mt-4">
				<div className="border border-gray-300 p-4 w-full h-64">
					<div className="mb-2">
						<input
							type="text"
							placeholder="Your review"
							className="w-full border p-2"
							value={newReview}
							onChange={(e) => setNewReview(e.target.value)}
						/>
					</div>

				</div>
				<button
					className="mt-2 bg-violet-600 text-white py-1 px-4 rounded"
					onClick={handleReviewSubmit}
				>
					Submit Review
				</button>
			</div>
			<div>
				<ul className="list-disc ml-6 text-slate-700 space-y-2">
					{reviews.map((rev, i) => (
						<li key={i}>
							<strong>{rev.userName}:</strong> {rev.text}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}