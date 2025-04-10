import { useState } from "react";
import FilterEnableCheckbox from "./FilterEnableCheckbox";

export default function ButtonGroupField(props) {


  const [filterEnabled, setFilterEnabled] = useState(true);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="m-2">
      <div className="mb-2 text-white flex items-center justify-between">
        <div className="flex items-center">
          <h3>{props.filterName}</h3>
          <div>
            <p className="text-sm opacity-50"> -  filter description</p>
          </div>
        </div>
        <FilterEnableCheckbox
          onToggle={() => { setFilterEnabled(!filterEnabled); props.HandleFilterEnable([props.filterName, !filterEnabled]);}}
        />
      </div>
      <div className={`opacity-${filterEnabled ? "100" : "50"} pointer-events-${filterEnabled ? "auto" : "none"}`}>

        <div className="flex flex-col sm:inline-flex sm:flex-row rounded-lg shadow-2xs 
      w-full items-center font-medium text-white bg-[#aba8e0] border border-gray-200">
          {props.items.map((item, index) => (
            <button
              key={index}
              type="button"
              className={`flex-auto py-3 px-4 inline-flex items-center gap-x-2 text-sm 
            font-medium focus:z-10 border border-gray-200 shadow-2xs hover:bg-[#8785ac]
            focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none ${activeIndex === index ? "bg-violet-500" : "bg-transparent"
                }`}
              onClick={() => handleClick(index)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}