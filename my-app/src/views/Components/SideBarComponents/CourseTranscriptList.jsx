import { useState } from "react";

export default function CourseTranscriptList() {
    const [items, setItems] = useState([
        "Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7"
    ]);

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };
    const removeAllItems = () => {
        setItems(items.filter((_, i) => i !==-1));
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
            <div className="flex flex-wrap gap-2">
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