import React from 'react';
import DisqusComments from '../views/Components/DisqusComments.jsx';

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

                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.
                    We study how large international networks are constructed from the individual computers, via local area, city and national networks. We use the Internet as or working example of such a network. The aim of the course is to give insights into both the theory and practice of the area.

                    The focus of the course is on the protocols and algorithms used, and we will follow how they are used and implemented into the TCP/IP-stack - the basis of the Internet.               </h3>
            </div>

            {/* Reviews Section */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '24px' }}>Reviews</h3>
                {/* Placeholder for reviews */}
                <p style={{ fontSize: '16px' }}>Here would be some reviews of the course...</p>
                <DisqusComments
                    url="ahxjk"
                    identifier={props.currentCourse}
                    title={props.currentCourse}
                />
            </div>

            {/* Prerequisite Graph Tree Section */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'Courier New, monospace', fontSize: '24px' }}>Prerequisite Graph Tree</h3>
                {/* Placeholder for graph tree */}
                <p style={{ fontSize: '16px' }}>Graph tree or prerequisite info will go here...</p>
            </div>
        </div>
    );
}
