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
					<SearchbarPresenter model={props.model}/>
				</div>

				<div className="flex-auto border overflow-auto bg-[#121212]">
					<ListViewPresenter model={props.model} />
				</div>


			</div>
		</div>
	);
}

export default App;
