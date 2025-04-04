import React, { useState } from 'react';
import { SidebarPresenter } from "../presenters/SidebarPresenter.jsx";
import { SearchbarPresenter } from "../presenters/SearchbarPresenter.jsx";
import { ListViewPresenter } from '../presenters/ListViewPresenter.jsx';
import CourseView from '../views/CourseView.jsx';
import {model} from '/src/model.js';

function App() {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	return (
		<div className="flex h-screen w-screen">
			<div className="flex-auto w-40% h-full bg-gradient-to-t from-[#4f3646] to-[#6747c0]">
				<SidebarPresenter model={model} />

			</div>
			<div className="w-3/4 h-full flex flex-col">
				<div className="bg-gradient-to-t from-[#6246a8] to-[#6747c0] text-white" style={{color: "red"}}>
				{/* bg-gradient-to-t from-[#6246a8] to-[#6747c0] */}
					<SearchbarPresenter model={model} />
				</div>
				<div className="flex-auto border overflow-auto bg-[#121212]">
					<ListViewPresenter model={model} />
				</div>
				<button
					onClick={() => setIsPopupOpen(true)}
					className="px-4 py-2 bg-blue-500 text-white"
				>
					open
				</button>
				{isPopupOpen && (
					<div
						className="backdrop-blur-sm fixed inset-0 bg-transparent flex justify-end z-100"
						onClick={() => setIsPopupOpen(false)}
					>
						<div
							className="bg-indigo-400/70 backdrop-blur-sm h-full w-3/4 flex flex-col overflow-auto"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="flex-1">
								<CourseView />
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
	);
}

export default App;