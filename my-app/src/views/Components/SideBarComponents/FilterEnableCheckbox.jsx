import React from 'react';

const FilterEnableCheckbox = (props) => {
    return (
        <div className='mr-3'>
            <input
                type="checkbox"
                onChange={props.onToggle}
                defaultChecked={true}
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-purple-500 dark:focus:ring-purple-600"
            />
        </div>
    );
};

export default FilterEnableCheckbox;