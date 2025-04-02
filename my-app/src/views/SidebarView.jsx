// src/views/SidebarView.jsx
import React from 'react';
import UploadField from "./Components/SideBarComponents/UploadField.jsx";
import ToggleField from "./Components/SidebarComponents/ToggleField.jsx";
import ButtonGroupField from "./Components/SideBarComponents/ButtonGroupField.jsx";

function SidebarView(props) {
    return (
        <div className='object-center text-white p-3 pt-15  flex-col h-screen overflow-auto pb-10' >
            <UploadField/>
            <div className='flex-auto justify-center h-100 max-h-100
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar]:opacity-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300'>
                <div class="z-10 w-100% rounded-lg justify-center" >
                    <h6 class="m-2 text-lg font-medium text-white text-center">
                        Filters
                    </h6>
                    <ToggleField/>
                    <ButtonGroupField/>
                </div>

            </div>
        </div>
    );
}

export default SidebarView;