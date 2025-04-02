import { observer } from "mobx-react-lite";
import { AddToDB } from "../presenters/Tests/AddToDB"
import { AllCoursesPresenter } from "../presenters/Tests/AllCoursesPresenter";

export const HomeRoot = observer(function ArtistRoot({ model }) {
	return (
		<div>
			<h2>Those are Tests for our Website!</h2>
      		{/* <AddToDB model={model}/> */}
			<AllCoursesPresenter model = {model}/>
		</div>
	);
});
