import React from 'react';


function ListView(props) {


    return (
        <div className="bg-white text-black p-2 flex flex-col gap-5 h-full overflow-auto">
            {
            props?.courses ? 
            props.courses.map((course) => (
                <div
                    key={course.code}
                    className="p-5 hover:bg-[#000061] flex items-center cursor-pointer border border-b-black border-solid w-full rounded-lg">
                    <div>
                        <p className={"font-bold text-[#000061]"}>{course.code}</p>
                        <p className="font-bold">{course.name}</p>
                        <p className="text-gray-600">{course.description}</p>
                    </div>
                </div>
            )) : "loading"}
        </div>
    );
}

export default ListView;