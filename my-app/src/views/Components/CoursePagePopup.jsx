import React, { useEffect, useRef } from "react";

function CoursePagePopup({
	favouriteCourses,
	addFavourite,
	removeFavourite,
	isOpen,
	onClose,
	course,
	prerequisiteTree,
	reviewPresenter,
}) {
	const treeRef = useRef(null);
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			window.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	const handleFavouriteClick = (course) => {
		if (favouriteCourses.some((fav) => fav.code === course.code)) {
			removeFavourite(course);
		} else {
			addFavourite(course);
		}
	};

	const handleTreeClick = () => {
		if (treeRef.current) {
			treeRef.current.focus(); // gives it focus
		}
	};

	if (!isOpen || !course) return null; // Don't render if not open or course not selected
	return (
		<div
			className="fixed backdrop-blur-sm inset-0 bg-transparent flex justify-end z-50"
			onClick={onClose}
		>
			<div
				className="bg-indigo-300/75 backdrop-blur-lg h-full w-3/4 flex flex-col overflow-auto"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex-1">
					<div className="px-10 py-10 md:px-20 md:py-16 text-slate-900 space-y-12 font-sans">
						{/* Course Title Section */}
						<div>
							<h2 className="text-5xl font-extrabold text-[#2e2e4f] ">
								<span className="text-violet-700">{course.code}</span> -{" "}
								{course.name}
								<span className="ml-4 text-lg text-violet-700 whitespace-nowrap">
									({course.credits} Credits)
								</span>
							</h2>
							<div className="my-6 h-1.5 w-full bg-violet-500"></div>
						</div>
						<div>
							<button
								className="text-yellow-500 bg-yellow-400 cursor-pointer"
								onClick={(e) => {
									e.stopPropagation(); // prevent popup from opening
									handleFavouriteClick(course.code);
								}}
							>
								{favouriteCourses.includes(course.code)
									? "Remove from Favourites"
									: "Add to Favourites"}
							</button>
						</div>

						{/* Description Section */}
						<div>
							<h3 className="text-2xl font-bold text-[#2e2e4f] mb-0.5">
								Course Description
							</h3>
							<div className="mb-3 h-0.5 w-full bg-violet-500"></div>
							<div
								className="text-lg leading-8 text-[#2e2e4f] font-semibold tracking-wide prose prose-slate max-w-full"
								dangerouslySetInnerHTML={{ __html: course.description }}
							/>
						</div>

						{/* Prerequisite Graph Tree Section */}
						<div>
							<h3 className="text-2xl font-semibold text-[#2e2e4f] mb-0.5">
								Prerequisite Graph Tree
							</h3>
							<div className="mb-4 h-0.5 w-full bg-violet-500"></div>
							<div
								className="bg-indigo-300/50 outline-none focus:outline-none focus:ring-2 focus:ring-violet-600 rounded-lg transition-shadow"
								ref={treeRef}
								onClick={handleTreeClick}
								tabIndex={0} // allows the div to receive focus
							>
								{prerequisiteTree}
							</div>
						</div>
						{reviewPresenter}
					</div>
				</div>
				<button
					onClick={onClose}
					className="px-4 py-2 bg-violet-500 text-white"
				>
					Close
				</button>
			</div>
		</div>
	);
}

export default CoursePagePopup;
