import { useState } from "react";

export default function CourseTranscriptList() {
    let local = [];
    if (localStorage.getItem("completedCourses"))
        local = JSON.parse(localStorage.getItem("completedCourses"));


    window.addEventListener("completedCourses changed", event => {
        if (localStorage.getItem("completedCourses"))
            local = JSON.parse(localStorage.getItem("completedCourses"));
        setItems(local);
    });


    const [items, setItems] = useState(local);

    function removeItem(index) {
        var newItems = [];
        for (let i = 0; i < items.length; i++) {
            if (i != index)
                newItems.push(items[i]);
        }
        localStorage.setItem("completedCourses", JSON.stringify(newItems));
        window.dispatchEvent(new Event("completedCourses changed"));
    };
    function removeAllItems() {
        let newitems = [];
        localStorage.setItem("completedCourses", JSON.stringify(newitems));
        window.dispatchEvent(new Event("completedCourses changed"));

    };



    return (
        <div className="max-w-80">
            <div className="flex justify-between">

                <h3 className="text-lg flex-auto">Taken courses:</h3>
                <button
                    onClick={() => removeAllItems()}
                    className="text-red-500 hover:text-red-700 font-bold text-sm hover:bg-red-300 rounded-lg flex-auto h-5"
                >
                    RemoveAll
                </button>
            </div>

            {/* Container for multiple items per row */}
            <div className="grid grid-cols-3 w-full max-[1200px]:grid-cols-2 gap-1 sm:gap-2">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-[#aba8e0] px-3 py-1 rounded-md shadow-md text-sm min-w-18"
                    >
                        <span className="flex-auto mr-2">{item}</span>
                        <button
                            onClick={() => removeItem(index)}
                            className="text-violet-600 hover:text-red-700 font-bold text-sm hover:bg-red-300 rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}