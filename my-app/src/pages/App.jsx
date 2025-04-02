import React, { useState } from "react";
import SidebarView from "../views/SidebarView.jsx";
import SearchbarView from "../views/SearchbarView.jsx";
import ListView from "../views/ListView.jsx";
import CourseView from "../views/CourseView.jsx";

function App() {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	return (
		<div className="flex h-screen w-screen over">
			{/* Purple Sidebar */}
			<div className="flex-auto w-40% sm:w-1/4 md:w-1/4 h-full bg-[#49347E]">
				<SidebarView />
			</div>

			{/* Main Content Area */}
			<div className="w-3/4 h-full flex-auto flex-col">
				<img src="" alt="Banner" />

				<div className="h-30 bg-blue-400 text-white border border-solid border-green-700 border-5">
					<SearchbarView />
				</div>

				<div className="flex-grow bg-black border border-solid border-white flex-1">
					<ListView />
					<button
						onClick={() => setIsPopupOpen(true)}
						className="px-4 py-2 bg-blue-500 text-white"
					>
						open
					</button>

					{/* Popup only overlays the black container */}
					{isPopupOpen && (
						<div
							className="fixed inset-0 bg-transparent flex justify-end"
							onClick={() => setIsPopupOpen(false)}
						>
							{/* Wider modal container */}
							<div
								className="bg-indigo-400/70 backdrop-blur-sm h-full w-3/4 flex flex-col "
								onClick={(e) => e.stopPropagation()}
							>
								{/* Container for CourseView which fills available space */}
								<div className="flex-1">
									{/* <CourseView /> */}
								</div>
								<button
									onClick={() => setIsPopupOpen(false)}
									className="px-4 py-2 bg-blue-500 text-white"
								>
									Close
								</button>
							</div>
						</div>
					)}

				</div>
			</div>
		</div>
	);
}

export default App;
