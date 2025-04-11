import React from 'react';
import { SidebarPresenter } from '../presenters/SidebarPresenter.jsx';
import { SearchbarPresenter } from '../presenters/SearchbarPresenter.jsx';
import { ListViewPresenter } from '../presenters/ListViewPresenter.jsx';
import { model } from '/src/model.js';
import { Routes, Route } from 'react-router-dom';
import { SidebarPresenter } from "../presenters/SidebarPresenter.jsx";
import { SearchbarPresenter } from "../presenters/SearchbarPresenter.jsx";
import { ListViewPresenter } from '../presenters/ListViewPresenter.jsx';
import SharedView from '../pages/SharedView.jsx'; 

function MainAppLayout({ model }) {
	return (
		<div className="flex h-screen w-screen overflow-hidden">
			<div className="w-1/4 h-full bg-gradient-to-t from-[#4f3646] to-[#6747c0]">
				<SidebarPresenter model={model} />
			</div>
			<div className="w-3/4 h-full flex flex-col">
				<div className="bg-gradient-to-t from-[#6246a8] to-[#6747c0] text-white">
					<SearchbarPresenter model={model} />
				</div>
				<div className="flex-auto border bg-[#121212] relative">
		<div className="flex overflow-hidden h-screen w-screen">
			<div className="flex-auto w-40% h-full bg-gradient-to-t from-[#4f3646] to-[#6747c0]">
				<SidebarPresenter model={model} />
			</div>
			<div className="w-3/4 h-full flex flex-col">
				<div className="bg-gradient-to-t from-[#6246a8] to-[#6747c0] text-white" style={{color: "red"}}>
					<SearchbarPresenter model={model} />
				</div>
				<div className="flex-auto border bg-[#121212]">
					<ListViewPresenter model={model} />
				</div>
			</div>
		</div>
	);
}

export default App;
function App({ model }) {
	//return (
		//<Routes>
		//	<Route path="/" element={<MainAppLayout model={model} />} />
		//	<Route path="/share" element={<SharedView />} />
		//</Routes>
		return <MainAppLayout model={model} />;
	//);
}

export default App;

