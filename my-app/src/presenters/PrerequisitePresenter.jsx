import { observer } from "mobx-react-lite";
import PrerequisiteTreeView from "../views/PrerequisiteTreeView";

export const PrerequisitePresenter = observer((props) => {
    
//contains the nodes and lines
const initialNodes = [];
const initialEdges = [];
//keeps track of how deep in each column we are.
let depth = [];


//Funktion that takes a node and its children and adds them to the tree.
function addChildNodes(origin, preR, leftOfset,) {
    if (depth.length == leftOfset) {
        depth.push(0);
    }


    let ofsett = 0;
    for (let k = 0; k < preR.length; k++) {
        let temp = preR[k];
        let cur = "";

        //Adds the "or" node when needed
        if (temp.length > 1) {
            cur = "or " + origin + " " + k;
            initialNodes.push({ id: "or " + origin + " " + k, data: { label: "One of" }, position: { x: leftOfset * 400 + 300, y: ofsett + depth[leftOfset] }, style: { width: 60 }, sourcePosition: "left", targetPosition: "right" });
            initialEdges.push({ id: origin + "-" + "or " + origin + " " + k, source: "or " + origin + " " + k, target: origin, markerEnd: { type: "line", color: "black" }, type: "default", style: { stroke: "black" } });
        } else {
            cur = origin;
        }


        //Adds a node
        for (let i = 0; i < temp.length; i++) {
            initialNodes.push({ id: temp[i], data: { label: temp[i] }, position: { x: leftOfset * 400 + 400, y: ofsett + depth[leftOfset] }, sourcePosition: "left", targetPosition: "right" });
            initialEdges.push({ id: cur + "-" + temp[i], source: temp[i], target: cur, markerEnd: { type: "line", color: "black" }, type: "default", style: { stroke: "black" } });
            ofsett += 50;
        }
        ofsett += 60;
    }
    depth[leftOfset] += ofsett;
}


function loadTree(course) {
    initialNodes.push({ id: course, data: { label: course }, position: { x: 0, y: 0 }, sourcePosition: "left", targetPosition: "right" });
    let column = 0;

    let start = "SF2526";
    let preR2 = [["DD1320"], ["SF1544", "SF1545"]];
    addChildNodes(start, preR2, column);
    column++;

    start = "DD1320";
    preR2 = [["SF1546"], ["SF1000", "SF1001", "SF1002"], ["SF1003", "SF1004"]];
    addChildNodes(start, preR2, column);

    start = "SF1544";
    preR2 = [["SF1005"], ["SF1006", "SF1007"]];
    addChildNodes(start, preR2, column);
    column++;
}
    loadTree(props.selectedCourse.code);   

    return <PrerequisiteTreeView initialNodes={initialNodes} initialEdges={initialEdges}/>
});

export default PrerequisitePresenter;


