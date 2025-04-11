import React, { useState } from "react";
import RatingComponent from "../views/Components/RatingComponent.jsx";

export function ReviewView({
							   course,
							   reviews,
							   newReview,
							   setNewReview,
							   handleReviewSubmit,
						   }) {
	const [selectedGrade, setSelectedGrade] = useState("");
	const [professorName, setProfessorName] = useState("");
	const [recommend, setRecommend] = useState(false);
	const grades = ["A", "B", "C", "D", "E", "F"];

	if (!course) return null;


	return (
		<div>
			{/* Reviews Section */}
			<div className="mt-4">
				<div className="border border-black p-4 w-full h-64 overflow-y-auto space-y-10 rounded shadow-lg">
					<div className="center-align">
						<p className="font-bold font-kanit items-center text-center">
							Overall rating
							<RatingComponent/>
						</p>
					</div>

					<div>
						<p className="font-bold font-kanit items-center text-center">
							Difficulty rating
							<RatingComponent/>
						</p>
					</div>

					{/* Professor Name Input */}
					<div>
						<p className="font-bold font-kanit items-center text-center">
							Professor Name & Rating
						</p>
						<div className="font-kanit flex justify-center mt-2">
							<input
								type="text"
								placeholder="Enter professor name"
								className="font-kanit border rounded-lg p-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-violet-400 shadow-sm"
								value={professorName}
								onChange={(e) => setProfessorName(e.target.value)}
							/>
						</div>
					</div>

					<div>
						<p className="font-bold font-kanit items-center text-center">
							<RatingComponent/>
						</p>
					</div>

					<div>
						<p className="font-bold font-kanit items-center text-center">
							Grade
						</p>
						<div className="flex font-kanit justify-center space-x-2 mt-2">
							{grades.map((grade) => (
								<button
									key={grade}
									onClick={() => setSelectedGrade(grade)}
									className={`px-4 py-2 rounded-md shadow-md ${
										selectedGrade === grade
											? "bg-violet-600 text-white"
											: "bg-violet-200 hover:bg-violet-300"
									}`}
								>
									{grade}
								</button>
							))}
						</div>
					</div>

					<div>
						<p className="font-bold font-kanit items-center text-center">
							Would you recommend this course?
						</p>
						<div className="flex font-kanit justify-center space-x-2 mt-2">

							<button
								onClick={() => setRecommend(true)}
								className={`px-4 py-2 rounded-md shadow-md ${
									recommend === true
										? "bg-violet-600 text-white"
										: "bg-violet-200 hover:bg-violet-300"
								}`}
							>
								Yes
							</button>

							<button
								onClick={() => setRecommend(false)}
								className={`px-4 py-2 rounded-md shadow-md ${
									recommend === false
										? "bg-violet-600 text-white"
										: "bg-violet-200 hover:bg-violet-300"
								}`}
							>
								No
							</button>
						</div>
					</div>

					<textarea
						rows={6}
						placeholder="Your review (max 2500 characters)"
						className="font-bold font-kanit resize-none border rounded-lg p-3 w-full pr-14 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-200"
						value={newReview}
						onChange={(e) => setNewReview(e.target.value.slice(0, 2500))}
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

export default ReviewView;