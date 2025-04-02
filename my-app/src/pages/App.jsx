import React from 'react';
import SidebarView from "../views/SidebarView.jsx";
import SearchbarView from "../views/SearchBarView.jsx";
import ListView from "../views/ListView.jsx";

function App() {
	return (
		<div className="flex h-screen w-screen bg-white">

			<div className="w-1/4 h-full border border-solid border-black border-5 bg-[#49347E]">
				<SidebarView />
			</div>

			<div className="flex flex-col flex-grow">

				<div className="w-full">
					<SearchbarView />
				</div>

				<div className="flex-grow border border-solid border-black border-5">
					<ListView />
				</div>

			</div>
		</div>
	);
}

export default App;