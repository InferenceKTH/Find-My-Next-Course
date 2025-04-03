
import React from 'react';
import { SidebarPresenter } from "../presenters/SidebarPresenter.jsx"
import { SearchbarPresenter } from "../presenters/SearchbarPresenter.jsx"
import { ListViewPresenter } from '../presenters/ListViewPresenter.jsx';

function App(props) {
	return (
		<div className="flex h-screen w-screen">

			<div className="flex-auto w-40%  h-full bg-gradient-to-t from-[#4f3646] to-[#6747c0]">
				<SidebarPresenter model={props.model}/>
			</div>

			<div className="w-3/4 h-full flex flex-col">
				<div className="bg-blue-400 text-white">
					<SearchbarPresenter model={props.model} />
				</div>

				<div className="flex-auto border overflow-auto bg-[#121212]">
					<ListViewPresenter model={props.model} />
				</div>
				
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
							className="bg-indigo-400/70 backdrop-blur-sm h-full w-3/4 flex flex-col overflow-auto"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Container for CourseView which fills available space */}
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
