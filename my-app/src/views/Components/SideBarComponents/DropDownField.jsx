import { useState } from "react";

export default function DropDownField({options}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const items = options;

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

    return (
        <div className="m-2">
        <div className="mb-2 text-white justify-center">
          <div className="float-left mr-1">
            <h3>Other filter</h3>
          </div>
          <div>
            <p className="text-sm opacity-50"> - filter description</p>
          </div>
        </div>
    <div className="relative flex justify-center text-left w-full">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="bg-violet-500 text-white px-4 py-2 rounded-md shadow-md focus:outline-none hover:bg-[#aba8e0] w-full"
      >
        Select Options
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-10 mt-2 w-48 bg-[#aba8e0] border border-gray-200 rounded-lg shadow-lg z-10 ">
          <ul className="">
            {items.map((item, index) => (
              <li key={index} className="flex items-center p-2 hover:bg-gray-500">
                <label className="flex-auto py-3 px-4 inline-flex gap-x-2 -mt-px -ms-px 
                first:rounded-t-md last:rounded-b-md sm:first:rounded-s-md sm:mt-0 sm:first:ms-0 s
                m:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-md text-sm font-medium
                focus:z-10 border border-gray-200  shadow-2xs cursor-pointer">
                        
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                  className="mr-2 sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                 peer-focus:ring-blue-300  rounded-full peer
                   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                  peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px]
                   after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                    peer-checked:bg-violet-500 "></div>
                <span>{item}</span>
                </label>
                </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
}


