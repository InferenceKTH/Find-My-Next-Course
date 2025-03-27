import { observer } from "mobx-react-lite";
import DummyView from "../views/DummyView"
import { AddToDB } from "../presenters/AddToDB"

export const HomeRoot = observer(function ArtistRoot({ model }) {
	return (
		<div>
			<h1>This is a dummy website for our Homepage / Mainpage!</h1>
			<DummyView/> {/*The view is very simple */}
      <AddToDB model={model}/> {/*Presenter for more complex shit */}
		</div>
	);
});
