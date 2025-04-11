import React, { useState } from "react";
import FilterEnableCheckbox from "./FilterEnableCheckbox";

const CollapsibleCheckboxes = (props) => {
  const [expanded, setExpanded] = useState({});
  const [filterEnabled, setFilterEnabled] = useState(true);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const rows = [
    {
      id: 1,
      label: "Category 1",
      subItems: ["Sub-item 1.1", "Sub-item 1.2", "Sub-item 1.3"],
    },
    {
      id: 2,
      label: "Category 2",
      subItems: ["Sub-item 2.1", "Sub-item 2.2"],
    },
    {
      id: 3,
      label: "Category 3",
      subItems: ["Sub-item 3.1", "Sub-item 3.2", "Sub-item 3.3", "Sub-item 3.4", "Sub-item 3.4"],
    },
  ];

  return (
    <div className="m-2">
      <div className="mb-2 text-white flex items-center justify-between">
        <div className="flex flex-col">
          <h3>{String(props.filterName).charAt(0).toUpperCase() + String(props.filterName).slice(1)}</h3>
          <p className="text-sm opacity-50">- filter description</p>
        </div>
        <FilterEnableCheckbox
          onToggle={() => {
            setFilterEnabled(!filterEnabled);
            props.HandleFilterEnable([props.filterName, !filterEnabled]);
          }}
        />
      </div>
      <div
        className={`${filterEnabled ? "opacity-100 pointer-events-auto" : "opacity-50 pointer-events-none"
          } transition-all`}
      >
        <div className="rounded-lg shadow-2xs w-full text-white bg-[#aba8e0] border border-gray-200 p-4">
          {rows.map((row) => (
            <div key={row.id} className="relative pl-4 border-l-2 border-white ml-2">
              <div className="flex items-center gap-2 mb-1 relative">
                <input
                  type="checkbox"
                  id={`checkbox-${row.id}`}
                  checked={expanded[row.id] || false}
                  onChange={() => toggleExpand(row.id)}
                  className="accent-violet-500 z-10"
                />
                <label htmlFor={`checkbox-${row.id}`} className="cursor-pointer font-semibold">
                  {row.label}
                </label>
              </div>
              {expanded[row.id] && (
                <svg
                  width="40"
                  height={row.subItems.length * 50}
                  viewBox={`0 0 40 ${row.subItems.length * 50}`}
                  preserveAspectRatio="none"
                  className="absolute left-3 top-6 transition-all duration-300 ease-in-out"
                >
                  {row.subItems.map((_, i) => {
                    const y = i * 30;
                    return (
                      <path
                        key={i}
                        d={`M10 0 L10 ${y + 20} H40`}
                        stroke="white"
                        strokeWidth="1.5"
                        fill="none"
                        className="transition-all duration-500 ease-in-out stroke-animate"
                      />
                    );
                  })}
                </svg>
              )}
              {expanded[row.id] && (
                <div className="mt-2 space-y-2 relative">
                  {row.subItems.map((subItem, index) => (
                    <div
                      key={index}
                      className="relative pl-6 flex items-center"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        id={`sub-checkbox-${row.id}-${index}`}
                        className="accent-violet-500"
                      />
                      <label
                        htmlFor={`sub-checkbox-${row.id}-${index}`}
                        className="cursor-pointer ml-2"
                      >
                        {subItem}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleCheckboxes;
