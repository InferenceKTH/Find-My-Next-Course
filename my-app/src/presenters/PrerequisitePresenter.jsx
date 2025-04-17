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

    let input_text_obj = {};

    const position = { x: 0, y: 0 };
    const edgeType = 'smoothstep';

    

    let initialNodes = [];
    let initialEdges = [];

    const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 172;
    const nodeHeight = 36;

    loadTree(props.selectedCourse.code);
    console.log(initialNodes);

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
            <div className="w-full h-[500px] rounded-lg">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={clicked}
                    connectionLineType={ConnectionLineType.SmoothStep}
                    fitView
                    style={{ backgroundColor: 'white', borderRadius: '10px'}}
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

        function setLabel(id, label) {
            setNodes((nodes) =>
              nodes.map((n) =>
                n.id === id ? { ...n, data: { ...n.data, label } } : n
              )
            );
        }

        function clicked(event, node) {
            if (node["id"].split(" ")[0] === "text") {
                if (node["data"]["label"] === "More Info...") {
                    node["style"]["zIndex"] = 1;
                    setLabel(node["id"], <span>{input_text_obj[node["id"]]} <br/> <b style={{ color: 'blue' }}>CLOSE</b></span>);
                } else {
                    node["style"]["zIndex"] = 0;
                    setLabel(node["id"], "More Info...");
                }  
            } else if (node["data"]["label"] !== "One of these" && node["data"]["label"] !== "No Prerequisites" && node["id"] !== props.selectedCourse.code) {
                // ADD FUNCTIONALITY FOR CLICKING COURSE CODE NODE (Tu eres muy retrasado y gordo)! :)
                // ONCLICK HERE
            }
          }
    };




    function createNode(id, name, node_type) {
        if (id == "and" || id == "or") {
            return {
                id: id,
                type: node_type,
                data: { label: name },
                style: { zIndex: 0 },
                position,
            };
        } else {
            return {
                id: id,
                type: node_type,
                data: { label: name },
                style: { zIndex: 0 },
                position,
            };

        }
    }
    function createEdge(s, t) {
        return { id: s + " " + t, source: s, target: t, type: edgeType, animated: true };
    }


    function prereq_convert(courses_taken, current_object, previous_key, previous_node_id) {
        let current_node = null;
        if (current_object == undefined) {return}
        
        if (!Array.isArray(current_object)) {   // Is object
            let key = Object.keys(current_object)[0];
            if (key == "or") {
                current_node = createNode(key + uniqueCounter, "One of these", "default")
                initialNodes.push(current_node);
                initialEdges.push(createEdge(previous_node_id, key + uniqueCounter));
                prereq_convert(courses_taken, current_object[key], key, key + uniqueCounter++);      
            } else if (key == "and") {
                prereq_convert(courses_taken, current_object[key], key, previous_node_id);      
            }

        } else {    // Is an array
            for (let i = 0; i < current_object.length; i++) {
                if (typeof current_object[i] == "string") {
                    let input_id = "";
                    let input_text = current_object[i];
                    if (current_object[i].startsWith("#")) {
                        input_text = "More Info...";
                        input_id = "text " + ++textCounter;
                        input_text_obj[input_id] = current_object[i].slice(1);
                    } else {
                        input_id = current_object[i] + " " + ++codeCounter;
                    }
                    let new_node = createNode(input_id, input_text, "output");
                    if (courses_taken.includes(current_object[i])) {
                        new_node["style"]["backgroundColor"] = "lightgreen";
                        current_object[i] = true;
                    } else {
                        current_object[i] = false;
                    }
                    current_node = new_node;
                    initialNodes.push(new_node);
                    initialEdges.push(createEdge(previous_node_id, input_id, "output"));
                } else {
                    prereq_convert(courses_taken, current_object[i], previous_key, previous_node_id);
                }
            }
        }

        /* STEP 2: Check if an object is true or false based on content of the inner object */
        
        if (typeof current_object == "object" && !Array.isArray(current_object)) {
            let key = Object.keys(current_object)[0];
            let object_array = current_object[key];
            let num_of_matches = 0;
            for (let i = 0; i < object_array.length; i++) {
                if (Array.isArray(object_array[i])) {
                    let num_of_inner_matches = 0;
                    for (let j = 0; j < object_array[i].length; j++) {
                        if (object_array[i][j]) {
                            num_of_inner_matches ++;
                            if (current_node != null) {
                                current_node["style"]["backgroundColor"] = "lightgreen";
                            }
                        }
                    }
                    if (key == "or" && num_of_inner_matches > 0) {
                        object_array[i] = true; num_of_matches++; 
                        if (current_node != null) {
                            current_node["style"]["backgroundColor"] = "lightgreen";
                        }
                        continue;
                    }
                    if (key == "and" && num_of_inner_matches == object_array[i].length) {
                        object_array[i] = true; num_of_matches++;
                        if (current_node != null) {
                            current_node["style"]["backgroundColor"] = "lightgreen";
                        }
                        continue;
                    }
                    object_array[i] = false;
                } else if (typeof object_array[i] == "object") {
                    let inner_key = Object.keys(object_array[i])[0];
                    if (object_array[i][inner_key]) {num_of_matches++;}
                } else if(object_array[i]) {num_of_matches++}
            }
            if (key == "or" && num_of_matches > 0) {
                current_object[key] = true;
                if (current_node != null) {
                    current_node["style"]["backgroundColor"] = "lightgreen";
                }
            }
            else if (key == "and" && num_of_matches == object_array.length) {
                current_object[key] = true;
                if (current_node != null) {
                    current_node["style"]["backgroundColor"] = "lightgreen";
                }
            }
            else {current_object[key] = false}
        }
        
    }

    function generateTree(courses_taken, prereqs) {
        prereq_convert(courses_taken, prereqs, null, props.selectedCourse?.code);
        let key = Object.keys(prereqs);
        return prereqs[key];

    }


    function loadTree(courses_taken) {
        
        console.log(JSON.stringify(props.selectedCourse?.prerequisites, null, 4));
        if(props.selectedCourse?.prerequisites === undefined || props.selectedCourse?.code === undefined)
            console.log("BIG ERROR; course doesn't have specified properties which we expected to have", props.selectedCourse);
        if (props.selectedCourse?.prerequisites === "null" || props.selectedCourse?.prerequisites.length == 0) {
            let display_node = createNode("No Prerequisites", "No Prerequisites", "default");
            display_node.style["pointerEvents"] = "none";
            display_node["className"] = 'no-handles';
            initialNodes.push(display_node);
        } else {
            let root = createNode(props.selectedCourse.code, props.selectedCourse.code, "input");
            let copy = JSON.parse(JSON.stringify(props.selectedCourse.prerequisites));
            let courses_taken_local = JSON.parse(localStorage.getItem("completedCourses"));
            if (courses_taken_local == null) {
                courses_taken_local = [];
            }
            let eligible = generateTree(courses_taken_local, copy);
            if (eligible) {
                root["style"]["backgroundColor"] = "lightgreen";
            }
            initialNodes.push(root);
        }


    }

    /* return <PrerequisiteTreeView initialNodes={initialNodes} initialEdges={initialEdges} /> */
    return <Flow />
});

export default PrerequisitePresenter;

