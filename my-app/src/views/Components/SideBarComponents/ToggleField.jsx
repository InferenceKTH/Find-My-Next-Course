import React from 'react';

export default function ToggleField(props) {
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
            <div className='bg-[#aba8e0] px-5 py-3 border-b  border-gray-200 left-0 border-r rounded-lg flex items-center'>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-violet-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-500 dark:peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm text-white border-l px-3">Apple</span>
                </label>
            </div>
        </div>
    );
}