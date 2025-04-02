import { observer } from "mobx-react-lite";
import { TestWithButtonView } from "../../views/TestWithButtonView";
import { saveJSONCoursesToFirebase } from "../../../firebase";
import data from "../../assets/example.json";

export const JsonToDatabase = observer(
    function JsonToDatabase(props){
        function parse(){
            saveJSONCoursesToFirebase(props.model, data);
        }

        return <TestWithButtonView onSubmit={parse}/>;
    }
);

