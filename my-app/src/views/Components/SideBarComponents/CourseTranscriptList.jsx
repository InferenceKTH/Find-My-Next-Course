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
        for (let i = 0; i < items.length; i++){
            if (i != index)
                newItems.push(items[i]);
        }
        localStorage.setItem("completedCourses", JSON.stringify(newItems));
        window.dispatchEvent(new Event("completedCourses changed"));
    };
    function removeAllItems(){
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-[#aba8e0] px-3 py-1 rounded-md shadow-md text-sm"
                    >
                        <span className="mr-2">{item}</span>
                        <button
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700 font-bold text-sm hover:bg-red-300 rounded-lg"
                        >
                            ✖
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}