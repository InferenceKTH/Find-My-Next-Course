import React from 'react';
import { SidebarPresenter } from '../presenters/SidebarPresenter.jsx';
import { SearchbarPresenter } from '../presenters/SearchbarPresenter.jsx';
import { ListViewPresenter } from '../presenters/ListViewPresenter.jsx';
import { FilterPresenter } from "../presenters/FilterPresenter.jsx";

function App({ model }) {
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


export default App;