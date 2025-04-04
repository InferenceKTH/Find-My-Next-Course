import React from 'react';
import UploadField from "./Components/SideBarComponents/UploadField.jsx";
import ToggleField from "./Components/SideBarComponents/ToggleField.jsx";
import ButtonGroupField from "./Components/SideBarComponents/ButtonGroupField.jsx";
import SliderField from "./Components/SideBarComponents/SliderField.jsx";
import DropDownField from "./Components/SideBarComponents/DropDownField.jsx";

function SidebarView(props) {
    return (
        <div className='object-center text-white p-3 pt-15  flex-col h-screen
         overflow-y-scroll'
            style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#888 #f1f1f1",
            }}
        >
            <UploadField/>
            <div className='flex-auto justify-center h-100 max-h-100 '>
                <div class="z-10 w-100% rounded-lg justify-center" >
                    <h6 class="m-2 text-lg font-medium text-white text-center">
                        Filters 
                    </h6>
                    <ToggleField
                        field1={"English"}
                        field2={"Swedish"}
                    />
                    <ButtonGroupField
                        items={["item 1", "item 2", "item 3"]}
                    />
                    <SliderField />
                    <DropDownField
                        options={["option 1", "option 2", "option 3", "option 4", "option 5"]}
                    />
                </div>

            </div>
        </div>
    );
}

export default SidebarView;