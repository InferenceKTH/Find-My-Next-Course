import React from 'react';
import PrerequisiteTree from "./PrerequisiteTree.jsx";

export default function CourseView(props) {
    return (
        <div style={{ margin: '20px' }}>
            {/* Course Title Section */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '36px', fontWeight: 'bold' }}>ID1203 - Best course in the Universe</h2>
            </div>

            {/* Description Section */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', color: 'white' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    The course is an introduction to networking, protocols and communication.
                    The focus of the course is on the protocols and algorithms used </h3>
            </div>

            {/* Reviews Section */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '24px' }}>Reviews</h3>
                {/* Placeholder for reviews */}
                <p style={{ fontSize: '16px' }}>Here would be some reviews of the course...</p>
            </div>

            {/* Prerequisite Graph Tree Section */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'Courier New, monospace', fontSize: '24px' }}>Prerequisite Graph Tree</h3>
                {/* Placeholder for graph tree */}
                <PrerequisiteTree />
            </div>
        </div>
    );
}
