// src/views/SidebarView.jsx
import React from 'react';
import {model} from "../model.js";


function SidebarView(props) {
    return (
        <div>
            <h2>Sidebar</h2>
            <ul >
                <li className="mb-4">Home</li>
                <li className="mb-4">Courses</li>
                <li>About</li>
            </ul>
        </div>
    );
}

export default SidebarView;