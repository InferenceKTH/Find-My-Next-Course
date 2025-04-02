import React from 'react';
import SidebarView from "../views/SidebarView.jsx";
import SearchbarView from "../views/SearchbarView.jsx"
import ListView from "../views/ListView.jsx";
import CourseView from "../views/CourseView.jsx";

function App() {
	return (
		<div className="flex h-screen w-screen">
			<div className="flex-auto w-40%  h-full bg-[#49347E]">
				<SidebarView />
			</div>

			<div className="w-3/4 h-full flex flex-col">
				<div className="bg-blue-400 text-white">
					<SearchbarView />
				</div>

				<div className="flex-auto border overflow-auto bg-[#121212]">
					<ListView />
				</div>


			</div>
		</div>
	);
}

export default App;
