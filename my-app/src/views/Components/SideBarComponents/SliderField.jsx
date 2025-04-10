import React, { useState, useRef } from "react";


export default function UploadField(props) {
    const values = [
        1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5,
        6, 7, 7.5, 8, 8.5, 9, 10, 11, 12, 13.5,
        14, 15, 20, 22.5, 30, 45
    ];

    console.log("component ",props);

    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(values.length - 1);
    const sliderRef = useRef(null);

    const handleDrag = (e, thumbType) => {
        console.log("handle change ",props);
        const slider = sliderRef.current;
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        const clientX = e.type.includes("touch")
            ? e.touches[0].clientX
            : e.clientX;

        const percent = Math.min(
            1,
            Math.max(0, (clientX - rect.left) / rect.width)
        );

        const index = Math.round(percent * (values.length - 1));

        if (thumbType === "min") {
            setMinIndex(Math.min(index, maxIndex - 1));
        } else {
            setMaxIndex(Math.max(index, minIndex + 1));
        }
        let sliderParams = {
            creditMax: values[Math.min(index, maxIndex - 1)],
            creditMin: values[Math.max(index, maxIndex + 1)]
        }
        props.model.updateFilter(sliderParams);

    };

    return (
        <div className="m-4">
            <h3 className="text-white font-semibold text-lg mb-1">Credit Range Filter</h3>
            <p className="text-sm text-white opacity-50 mb-3">Select a range of credits</p>

            <div className="bg-[#aba8e0] text-white p-4 rounded-lg shadow-lg border border-gray-300">
                <div className="mb-2 text-sm font-bold">
                    Credits: {values[minIndex]} – {values[maxIndex]}
                </div>

                {/* SLIDER */}
                <div
                    ref={sliderRef}
                    className="relative h-3 bg-gray-300 rounded-full cursor-pointer"
                    onMouseDown={(e) => handleDrag(e, "bar")}
                    onTouchStart={(e) => handleDrag(e, "bar")}
                >
                    {/* Selected range bar */}
                    <div
                        className="absolute h-full bg-violet-500 rounded-full"
                        style={{
                            left: `${(minIndex / (values.length - 1)) * 100}%`,
                            width: `${((maxIndex - minIndex) / (values.length - 1)) * 100}%`
                        }}
                    />

                    {/* Min thumb */}
                    <div
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            const move = (ev) => handleDrag(ev, "min");
                            const up = () => {
                                window.removeEventListener("mousemove", move);
                                window.removeEventListener("mouseup", up);
                            };
                            window.addEventListener("mousemove", move);
                            window.addEventListener("mouseup", up);
                        }}
                        onTouchStart={(e) => {
                            const move = (ev) => handleDrag(ev, "min");
                            const end = () => {
                                window.removeEventListener("touchmove", move);
                                window.removeEventListener("touchend", end);
                            };
                            window.addEventListener("touchmove", move);
                            window.addEventListener("touchend", end);
                        }}
                        className="absolute top-1/2 -translate-y-1/2 bg-violet-600 h-4 w-4 rounded-full z-20"
                        style={{
                            left: `calc(${(minIndex / (values.length - 1)) * 100}% - 8px)`
                        }}
                    />

                    {/* Max thumb */}
                    <div
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            const move = (ev) => handleDrag(ev, "max");
                            const up = () => {
                                window.removeEventListener("mousemove", move);
                                window.removeEventListener("mouseup", up);
                            };
                            window.addEventListener("mousemove", move);
                            window.addEventListener("mouseup", up);
                        }}
                        onTouchStart={(e) => {
                            const move = (ev) => handleDrag(ev, "max");
                            const end = () => {
                                window.removeEventListener("touchmove", move);
                                window.removeEventListener("touchend", end);
                            };
                            window.addEventListener("touchmove", move);
                            window.addEventListener("touchend", end);
                        }}
                        className="absolute top-1/2 -translate-y-1/2 bg-violet-600 h-4 w-4 rounded-full z-20"
                        style={{
                            left: `calc(${(maxIndex / (values.length - 1)) * 100}% - 8px)`
                        }}
                    />
                </div>
            </div>
        </div>
    );
}