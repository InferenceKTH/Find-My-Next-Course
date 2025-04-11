import React from "react";

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
			{/* Reviews Section */}
			<div className="mt-4">
				<input
					type="text"
					placeholder="Your review"
					className="border rounded p-2 w-full"
					value={newReview}
					onChange={(e) => setNewReview(e.target.value)}
				/>
				<button
					className="mt-2 bg-violet-600 text-white py-1 px-4 rounded"
					onClick={handleReviewSubmit}
				>
					Submit Review
				</button>
			</div>
            <div>
				<ul className="list-disc ml-6 text-slate-700 space-y-2">
					{(reviews || []).map((rev, i) => (
						<li key={i}>
							<strong>{rev.userName}:</strong> {rev.text}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
