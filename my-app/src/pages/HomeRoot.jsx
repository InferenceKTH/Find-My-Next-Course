import { observer } from "mobx-react-lite";
import MainView from "../views/SidebarView.jsx"
import { AddToDB } from "../presenters/AddToDB"
import SidebarView from "../views/SidebarView.jsx";

export const HomeRoot = observer(function ArtistRoot({ model }) {
	return (
		<div>

			<div className="bg-blue-600 border-b border-blue-300">
				<SidebarView/>
			</div>
		<AddToDB model={model} /> {/*Presenter for more complex shit */}
		</div>
	);
});
