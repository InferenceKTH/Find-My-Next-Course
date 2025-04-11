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
                    edgesFocusable={false}
                    onNodeClick={clicked}
                    elementsSelectable={false}
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
            } else if (node["data"]["label"] !== "One of these") {
                // ADD FUNCTIONALITY FOR CLICKING COURSE CODE NODE (Tu eres muy retrasado y gordo)! :)
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


    function prereq_convert(current_object, previous_key, previous_node_id) {
        if (current_object == undefined) {return}
        
        if (!Array.isArray(current_object)) {   // Is object
            let key = Object.keys(current_object)[0];
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
                        input_text = "More Info...";
                        input_id = "text " + ++textCounter;
                        input_text_obj[input_id] = current_object[i].slice(1);
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
          
    }

    function generateTree(prereqs) {
        //console.log(JSON.stringify(prereqs, null, 4));
        prereq_convert(prereqs, null, props.selectedCourse.code);
    }


    function loadTree(course) {
        let root = createNode(props.selectedCourse.code, props.selectedCourse.code, "input")
        initialNodes.push(root);

        generateTree(props.selectedCourse.prerequisites);

        //console.log(initialNodes);
        //console.log(initialEdges);
        //console.log(JSON.stringify(input_text_obj, null, 4));

    }

    /* return <PrerequisiteTreeView initialNodes={initialNodes} initialEdges={initialEdges} /> */
    return <Flow />
});

export default PrerequisitePresenter;



/*




        let HTML_nodes = document.getElementsByClassName("react-flow__node");

        for (let i = 0; i < HTML_nodes.length; i++) {
            //console.log(HTML_nodes[i].children[0].getAttribute("data-nodeid").split(" ")[0])
            if (HTML_nodes[i].children[0].getAttribute("data-nodeid").split(" ")[0] === "text") {
                HTML_nodes[i].addEventListener('click', function () {
                    alert('Button was clicked!');
                  });
            }   // Can add else
        }


        */