// src/views/SidebarView.jsx
import React from 'react';

function SidebarView(props) {
    return (
        <div className="ring-offset-cyan-950 border-solid border-4 border-red-900">
            <h2>Sidebar</h2>
            <ul>
                <li>Home</li>
                <li>Courses</li>
                <li>About</li>
            </ul>
        </div>
    );
}

export default SidebarView;