import { observer } from "mobx-react-lite";
import MainView from "../views/MainView"
import { AddToDB } from "../presenters/AddToDB"

export const HomeRoot = observer(function ArtistRoot({ model }) {
	return (<div>
		<div className="flex">
			<div className="w-10 h-screen flex-auto">
				<MainView/> {/*The view is very simple */}
			</div>
			<div className="w-200 flex-auto bg-red-100">
				<MainView/> {/*The view is very simple */}
			</div>
		</div>
		<AddToDB model={model} /> {/*Presenter for more complex shit */}
		</div>
	);
});
