import React from 'react';
import { useState } from "react";


export default function UploadField(props) {
    const values = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 7, 7.5, 8, 8.5, 9, 10, 11, 12, 13.5, 14, 15, 20, 22.5, 30, 45]; // 8 set values
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(values.length - 1);

    const handleMinChange = (e) => {
        const val = Math.min(Number(e.target.value), maxIndex - 1);
        setMinIndex(val);
      };
    
      const handleMaxChange = (e) => {
        const val = Math.max(Number(e.target.value), minIndex + 1);
        setMaxIndex(val);
      };

      return (
        <div className="m-4">
          <div className="mb-2 text-white">
            <h3>Range Filter</h3>
            <p className="text-sm opacity-50">Select a range of credits</p>
          </div>
    
          <div className="bg-[#aba8e0] text-white p-4 rounded-lg shadow-lg border border-gray-300 relative">
            <div className="mb-2 text-sm font-bold">
              Credits: {values[minIndex]} – {values[maxIndex]}
            </div>
    
            <div className="relative h-6">
              {/* First slider (min) */}
              <input
                type="range"
                min="0"
                max={values.length - 1}
                value={minIndex}
                onChange={handleMinChange}
                className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:bg-violet-600 [&::-webkit-slider-thumb]:rounded-full"
              />
    
              {/* Second slider (max) */}
              <input
                type="range"
                min="0"
                max={values.length - 1}
                value={maxIndex}
                onChange={handleMaxChange}
                className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto z-20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:bg-violet-300 [&::-webkit-slider-thumb]:rounded-full"
              />
            </div>
          </div>
        </div>
      );
}