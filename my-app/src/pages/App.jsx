import React from 'react';
import SidebarView from "../views/SidebarView.jsx";
import SearchbarView from "../views/SearchBarView.jsx";
import ListView from "../views/ListView.jsx";

function App() {
	return (
		<div className="flex h-screen w-screen">
			<div className="w-1/4 h-full border border-solid border-red-900 border-5 bg-[#49347E]">
				<SidebarView />
			</div>
			<div className="w-3/4 h-full flex flex-col ">
				<img src=""/>
				<div className="h-16 bg-blue-400 text-white border border-solid border-green-700 border-5">
					<SearchbarView />
				</div>
				<div className="flex-grow bg-black border border-solid border-white border-5">
					<ListView />
				</div>
			</div>
		</div>
	);
}

export default App;