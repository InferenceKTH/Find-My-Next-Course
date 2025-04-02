import React from 'react';
import SidebarView from "../views/SidebarView.jsx";
import SearchbarView from "../views/SearchBarView.jsx";
import ListView from "../views/ListView.jsx";

function App() {
	return (
		<div className="flex h-screen w-screen over">
			<div className="flex-auto w-40% sm:w-1/4 md:w-1/4 h-full bg-[#49347E]">
			{/* bg-gradient-to-t from-blue-900 via-cyan-600 to-lime-100 */}
				<SidebarView />
			</div>
			<div className="w-3/4 h-full flex-auto flex-col ">
				<img src=""/>
				<div className=" h-30 bg-blue-400 text-white border border-solid border-green-700 border-5">
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