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
    //let toAdd = [];

    const position = { x: 0, y: 0 };
    const edgeType = 'smoothstep';

    const initialNodes = [
        /* {
            id: '1',
            type: 'input',
            data: { label: 'input' },
            position,
        },
        {
            id: '2',
            data: { label: 'node 2' },
            position,
        },
        {
            id: '2a',
            data: { label: 'node 2a' },
            position,
        },
        {
            id: '2b',
            data: { label: 'node 2b' },
            position,
        },
        {
            id: '2c',
            data: { label: 'node 2c' },
            position,
        },
        {
            id: '2d',
            data: { label: 'node 2d' },
            position,
        },
        {
            id: '3',
            data: { label: 'node 3' },
            position,
        },
        {
            id: '4',
            data: { label: 'node 4' },
            position,
        },
        {
            id: '5',
            data: { label: 'node 5' },
            position,
        },
        {
            id: '6',
            type: 'output',
            data: { label: 'output' },
            position,
        },
        { id: '7', type: 'output', data: { label: 'output' }, position }, */
    ];

    const initialEdges = [
        /* { id: 'e12', source: '1', target: '2', type: edgeType, animated: true },
        { id: 'e13', source: '1', target: '3', type: edgeType, animated: true },
        { id: 'e22a', source: '2', target: '2a', type: edgeType, animated: true },
        { id: 'e22b', source: '2', target: '2b', type: edgeType, animated: true },
        { id: 'e22c', source: '2', target: '2c', type: edgeType, animated: true },
        { id: 'e2c2d', source: '2c', target: '2d', type: edgeType, animated: true },
        { id: 'e45', source: '4', target: '5', type: edgeType, animated: true },
        { id: 'e56', source: '5', target: '6', type: edgeType, animated: true },
        { id: 'e57', source: '5', target: '7', type: edgeType, animated: true }, */
    ];

    const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 172;
    const nodeHeight = 36;





    const getLayoutedElements = (nodes, edges, direction = 'LR') => {
        const isHorizontal = direction === 'LR';
        dagreGraph.setGraph({ rankdir: direction });

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

        loadTree();
        console.log("arived")


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
                >
                    <Background />
                </ReactFlow>

            </div>

        );
    };








    function containsArr(arr) {
        let bool = false
        arr.forEach(element => {
            if (Array.isArray(element)) {
                bool = true;
            }
        });
        return bool;
    }
    function createNode(id, name) {
        if (id == "and" || id == "or") {
            return {
                id: id + uniqueCounter++,
                type: 'input',
                data: { label: name },
                position,
            };
        } else {
            return {
                id: id,
                type: 'input',
                data: { label: name },
                position,
            };

        }
    }
    function createEdge(s, t) {
        return { id: s + " " + t, source: s, target: s, type: edgeType, animated: true };
    }

    function loadCource(parent, obj) {
        console.log(obj);
        if (typeof obj === 'object') {
            for (let i = 0; i < obj.arr.length; i++) {
                if (obj.arr[i].type == "and") {

                    console.log("Create and node")

                    let newN = createNode("and", "All of");
                    initialNodes.push(newN);
                    initialEdges.push(createEdge(parent.id, newN.id));
                    for (let i = 0; i < obj.arr[i].length; i++) {
                        let nCource = loadCource(obj.arr[i]);
                        initialNodes.push(nCource);
                        initialEdges.push(createEdge(newN.id, nCource.id));
                    }
                    return newN;

                } else if (obj.arr[i].type == "or") {

                    console.log("Create or node")


                    let newN = createNode("or", "One of");
                    initialNodes.push(newN);
                    initialEdges.push(createEdge(parent.id, newN.id));
                    for (let i = 0; i < obj.arr[i].length; i++) {
                        let nCource = loadCource(obj.arr[i]);
                        initialNodes.push(nCource);
                        initialEdges.push(createEdge(newN.id, nCource.id));
                    }
                    return newN;

                }
            }
        } else {
            console.log("Create text node")
            console.log(obj);




            let newN = createNode(obj, obj);
            initialNodes.push(newN);
            return newN;
        }
    }


    function loadTree(course) {
        let start = createNode(props.selectedCourse.code, props.selectedCourse.code)
        initialNodes.push(start);
        let preR = loadPrer(props.selectedCourse);
        loadCource(start, preR);
    }

    //loads the prerequistes
    function load(cur) {
        if (cur.and != null) {
            let temp = { type: "and", arr: [] };

            for (let i = 0; i < cur.and.length; i++) {
                temp.arr.push(load(cur.and[i]));
            }
            return temp;
        } else if (cur.or != null) {
            let temp = { type: "or", arr: [] };

            for (let i = 0; i < cur.or.length; i++) {
                temp.arr.push(load(cur.or[i]));
            }
            return temp;
        }
        return cur;
    }

    function dataFixer(obj) {
        let fixed;
        if (typeof obj === 'object') {
            if (Array.isArray(obj.arr)) {
                if (Array.isArray(obj.arr[0]) && obj.arr.length == 1) {
                    obj.arr = obj.arr[0];
                }
                for (let i = 0; i < obj.arr.length; i++) {
                    fixed = dataFixer(obj.arr[i]);
                }
            }
        } else {
            return obj;
        }
        return fixed;
    }

    //does the loading and cleaning of prerequisites
    function loadPrer(course) {
        let prereq = course.prerequisites;
        let arrP = load(prereq)
        dataFixer(arrP);
        return arrP;
    }

    loadTree(props.selectedCourse.code);

    /* return <PrerequisiteTreeView initialNodes={initialNodes} initialEdges={initialEdges} /> */
    return <Flow />
});

export default PrerequisitePresenter;


