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
				<div className="relative">
				<textarea
				rows={6}
				placeholder="Your review (max 2500 characters)"
				className="resize-none border rounded-lg p-3 w-full pr-14 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-200"
				value={newReview}
				onChange={(e) => {
					const trimmed = e.target.value.slice(0, 2500);
					setNewReview(trimmed);
				}}
				/>
					<span className="absolute bottom-1 right-3 text-sm text-gray-500">
						{newReview.length}/2500
					</span>
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
