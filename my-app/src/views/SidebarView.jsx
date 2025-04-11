import React from 'react';
import UploadField from "./Components/SideBarComponents/UploadField.jsx";
import ToggleField from "./Components/SideBarComponents/ToggleField.jsx";
import ButtonGroupField from "./Components/SideBarComponents/ButtonGroupField.jsx";
import SliderField from "./Components/SideBarComponents/SliderField.jsx";
import DropDownField from "./Components/SideBarComponents/DropDownField.jsx";
import { UploadTranscriptPresenter } from '../presenters/UploadTranscriptPresenter.jsx';
import CollapsibleCheckboxes from './Components/SideBarComponents/CollapsibleCheckboxes.jsx';


function SidebarView(props) {
    return (
        <div className='object-center text-white p-3 pt-8  flex-col h-screen
         overflow-y-scroll'
            style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#888 #f1f1f1",
            }}
        >
            <UploadTranscriptPresenter
                HandleFilterEnable={props.HandleFilterEnable}
            />
            <div className='flex-auto justify-center h-100 max-h-100 '>
                <div className="z-10 w-100% rounded-lg justify-center pb-10" >
                    <h6 className="m-2 text-lg font-medium text-white text-center">
                        Filters 
                    </h6>
                    <DropDownField
                        options={["Preparatory", "Basic", "Advanced", "Research"]}
                        HandleFilterChange={props.HandleFilterChange}
                        filterName = "level"
                        HandleFilterEnable={props.HandleFilterEnable}
                    />
                    <ToggleField
                        fields={["English", "Swedish"]}
                        HandleFilterChange={props.HandleFilterChange}
                        filterName = "language"
                        HandleFilterEnable={props.HandleFilterEnable}
                    />

                    {/*expanding list for department */}

                    <DropDownField
                        options={["Kista", "Valhalavagen", "Sodetalje", "T-centralen"]}
                        HandleFilterChange={props.HandleFilterChange}
                        filterName="location"
                        HandleFilterEnable={props.HandleFilterEnable}
                    />

                    <ButtonGroupField
                        items={["item 1", "item 2", "item 3"]}
                        filterName="ALMA ES KORTE" 
                        HandleFilterEnable={props.HandleFilterEnable}
                    />
                    <SliderField
                        HandleFilterChange={props.HandleFilterChange}
                        filterName="credits"
                        HandleFilterEnable={props.HandleFilterEnable}
                    />
                    <CollapsibleCheckboxes
                        HandleFilterChange={props.HandleFilterChange}
                        filterName="department"
                        HandleFilterEnable={props.HandleFilterEnable}
                    />
                </div>

            </div>
        </div>
    );
}

export default SidebarView;