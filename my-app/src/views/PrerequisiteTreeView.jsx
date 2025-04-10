import React from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

function PrerequisiteTreeView(props){
    return (
        <div style={{ width: "100%", height: "500px" }}>
            <ReactFlow nodes={props.initialNodes} edges={props.initialEdges} fitView>
                <MiniMap />
                <Controls />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    );
};

export default PrerequisiteTreeView;
