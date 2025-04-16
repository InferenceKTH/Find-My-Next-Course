import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarPresenter } from '../presenters/SidebarPresenter.jsx';
import { SearchbarPresenter } from '../presenters/SearchbarPresenter.jsx';
import { ListViewPresenter } from '../presenters/ListViewPresenter.jsx';
import { FilterPresenter } from "../presenters/FilterPresenter.jsx";
import SharedView from '../pages/SharedView.jsx';
import { model } from '/src/model.js';

function MainAppLayout({ model }) {
	return (
		<div className="flex h-screen w-screen">
			<FilterPresenter model={model} />
			<div className="flex-auto w-40% h-full bg-gradient-to-t from-[#4f3646] to-[#6747c0]">
				<SidebarPresenter model={model} />
			</div>
			<div className="w-3/4 h-full flex flex-col">
				<div className="bg-gradient-to-t from-[#6246a8] to-[#6747c0] text-white">
					<SearchbarPresenter model={model} />
				</div>
				<div className="flex-auto border bg-[#121212] relative">
					<ListViewPresenter model={model} />
				</div>
			</div>
		</div>
	);
}

function App({ model }) {
	return (
		<Routes>
			<Route path="/" element={<MainAppLayout model={model} />} />
			<Route path="/share" element={<SharedView model={model} />} />
		</Routes>
	);
}

//function App({ model }) {
	//return (
		//<Routes>
		//	<Route path="/" element={<MainAppLayout model={model} />} />
		//	<Route path="/share" element={<SharedView />} />
		//</Routes>
		//return <MainAppLayout model={model} />;
	//);
//}

export default App;