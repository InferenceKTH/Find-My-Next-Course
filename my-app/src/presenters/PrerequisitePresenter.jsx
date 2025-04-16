import { observer } from "mobx-react-lite";
import PrerequisiteTreeView from "../views/PrerequisiteTreeView";

import dagre from '@dagrejs/dagre';
import { useCallback } from "react";

import {
    Background,
    ReactFlow,
    addEdge,
    ConnectionLineType,
    useNodesState,
    useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';


export const PrerequisitePresenter = observer((props) => {

    let uniqueCounter = 0;
    let textCounter = 0;
    let codeCounter = 0;
    //let toAdd = [];

    const position = { x: 0, y: 0 };
    const edgeType = 'smoothstep';

    

    let initialNodes = [];
    let initialEdges = [];

    const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 172;
    const nodeHeight = 36;

    //initialNodes.push(createNode("IK1203", "IK1203", "default"));
    //initialNodes.push(createNode("IK1204", "IK1204", "default"));
    //initialEdges.push(createEdge(props.selectedCourse.code, "IK1203"));
    //initialEdges.push(createEdge(props.selectedCourse.code, "IK1204"));
    loadTree(props.selectedCourse.code);

    const getLayoutedElements = (nodes, edges, direction = 'LR') => {
        const isHorizontal = direction === 'LR';
        dagreGraph.setGraph({ rankdir: direction, nodesep: 30});

        nodes.forEach((node) => {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        });

        edges.forEach((edge) => {
            dagreGraph.setEdge(edge.source, edge.target);
        });

        dagre.layout(dagreGraph);

        const newNodes = nodes.map((node) => {
            const nodeWithPosition = dagreGraph.node(node.id);
            return {
                ...node,
                targetPosition: isHorizontal ? 'left' : 'top',
                sourcePosition: isHorizontal ? 'right' : 'bottom',
                position: {
                    x: nodeWithPosition.x - nodeWidth / 2,
                    y: nodeWithPosition.y - nodeHeight / 2,
                },
            };
        });

        return { nodes: newNodes, edges };
    };

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialNodes,
        initialEdges,
        'LR' // force horizontal layout initially
    );


    const Flow = () => {
        //console.log("arived in Flow");


        const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
        const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

        const onConnect = useCallback(
            (params) =>
                setEdges((eds) =>
                    addEdge(
                        { ...params, type: ConnectionLineType.SmoothStep, animated: true },
                        eds
                    )
                ),
            []
        );

        return (
            <div style={{ width: "100%", height: "500px" }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    connectionLineType={ConnectionLineType.SmoothStep}
                    fitView
                    style={{ backgroundColor: '#F7F9FB' }}
                    nodesDraggable={false}
                    nodesConnectable={false}
                    elementsSelectable={true}
                    elementsFocusable={false}
                    edgesFocusable={false}
                >
                    <Background />
                </ReactFlow>

            </div>

        );
    };





    function createNode(id, name, node_type) {
        if (id == "and" || id == "or") {
            return {
                id: id,
                type: node_type,
                data: { label: name },
                position,
            };
        } else {
            return {
                id: id,
                type: node_type,
                data: { label: name },
                position,
            };

        }
    }
    function createEdge(s, t) {
        return { id: s + " " + t, source: s, target: t, type: edgeType, animated: true };
    }


    function prereq_convert(current_object, previous_key, previous_node_id) {
        if (current_object == undefined) {return}
        
        if (!Array.isArray(current_object)) {   // Is object
            let key = Object.keys(current_object)[0];
            //console.log("key: " + key);
            if (key == "or") {
                initialNodes.push(createNode(key + uniqueCounter, "One of these", "default"));
                initialEdges.push(createEdge(previous_node_id, key + uniqueCounter));
                prereq_convert(current_object[key], key, key + uniqueCounter++);      
            } else if (key == "and") {
                prereq_convert(current_object[key], key, previous_node_id);      
            }

        } else {    // Is an array
            for (let i = 0; i < current_object.length; i++) {
                if (typeof current_object[i] == "string") {
                    let input_id = "";
                    let input_text = current_object[i];
                    if (current_object[i].startsWith("#")) {
                        input_text = "More Info...";  //input_text.slice(1, 115);
                        input_id = "text" + ++textCounter;
                    } else {
                        input_id = current_object[i] + " " + ++codeCounter;
                    }
                    initialNodes.push(createNode(input_id, input_text, "output"));
                    initialEdges.push(createEdge(previous_node_id, input_id, "output"));
                } else {
                    prereq_convert(current_object[i], previous_key, previous_node_id);
                }
            }
        }
        
        /* 
        
        if (typeof current_object == "object" && !Array.isArray(current_object)) {
            let key = Object.keys(current_object)[0];
            let object_array = current_object[key];
            console.log(key);
            console.log(object_array);
            let num_of_matches = 0;
            for (let i = 0; i < object_array.length; i++) {
                if (Array.isArray(object_array[i])) {
                    let num_of_inner_matches = 0;
                    for (let j = 0; j < object_array[i].length; j++) {
                        if (object_array[i][j]) {
                            num_of_inner_matches ++;
                        }
                    }
                    if (key == "or" && num_of_inner_matches > 0) {object_array[i] = true; num_of_matches++; continue;}
                    if (key == "and" && num_of_inner_matches == object_array[i].length) {object_array[i] = true; num_of_matches++; continue;}
                    object_array[i] = false;
                } else if (typeof object_array[i] == "object") {
                    let inner_key = Object.keys(object_array[i])[0];
                    if (object_array[i][inner_key]) {num_of_matches++;}
                } else if(object_array[i]) {num_of_matches++}
            }
            if (key == "or" && num_of_matches > 0) {current_object[key] = true}
            else if (key == "and" && num_of_matches == object_array.length) {current_object[key] = true}
            else {current_object[key] = false}

        }
        */        
    }

    function generateTree(prereqs) {
        console.log(JSON.stringify(prereqs, null, 4));
        prereq_convert(prereqs, null, props.selectedCourse.code);
    }


    function loadTree(course) {
        let root = createNode(props.selectedCourse.code, props.selectedCourse.code, "input")
        initialNodes.push(root);

        generateTree(props.selectedCourse.prerequisites);

        console.log(initialNodes);
        console.log(initialEdges);
    }

    /* return <PrerequisiteTreeView initialNodes={initialNodes} initialEdges={initialEdges} /> */
    return <Flow />
});

export default PrerequisitePresenter;

