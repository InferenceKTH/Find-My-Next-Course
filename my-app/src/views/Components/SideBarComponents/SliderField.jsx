import React from 'react';
import { useState } from "react";

export default function UploadField(props) {
    const values = [1,
        1.5,
        2,
        2.5,
        3,
        3.5,
        4,
        4.5,
        5,
        5.5,
        6,
        7,
        7.5,
        8,
        8.5,
        9,
        10,
        11,
        12,
        13.5,
        14,
        15,
        20,
        22.5,
        30, 45]; // 8 set values
    const [selectedIndex, setSelectedIndex] = useState(0); // Start at first value

    const handleSliderChange = (event) => {
        const rawIndex = Number(event.target.value);
        setSelectedIndex(rawIndex);
      };

    return (
        <div className='m-2'>
            <div className='mb-2 text-white justify-center'>

                <div className='float-left mr-1'>
                    <h3>One filter</h3>
                </div>
                <div>
                    <p className='text-sm opacity-50'> - filter description</p>
                </div>
            </div>
            <div class="flex flex-col sm:inline-flex sm:flex-row rounded-lg shadow-2xs w-full 
            items-center font-medium text-white bg-[#aba8e0] border border-gray-200 p-3">
                <div className="flex-1 justify-between pl-2">
                    <span
                        className={"text-sm font-bold text-white text-gray-600"}
                    >
                        Credits: {values[selectedIndex]}
                    </span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={25}
                    step="1"
                    value={selectedIndex}
                    onChange={handleSliderChange}
                    className="flex-2 w-0% appearance-none bg-gray-300 rounded-lg h-2 focus:outline-none focus:ring-2
                     focus:ring-violet-500 accent-violet-500"
                />
                
            </div>
        </div>
    );
}