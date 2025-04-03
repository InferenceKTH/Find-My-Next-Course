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
<<<<<<< HEAD
            <div className='bg-[#aba8e0] px-5 py-3 border-b  border-gray-200 left-0 border-r rounded-lg flex items-center'>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-violet-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-500 dark:peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm text-white border-l px-3">Apple</span>
                </label>
            </div>
            <div class="flex flex-col sm:inline-flex sm:flex-row rounded-lg shadow-2xs w-full items-center font-medium text-white bg-[#aba8e0] border border-gray-200">
                <button type="button" class="flex-auto py-3 px-4 inline-flex items-center gap-x-2 -mt-px -ms-px first:rounded-t-md last:rounded-b-md sm:first:rounded-s-md sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-md text-sm font-medium focus:z-10 border border-gray-200  shadow-2xs hover:bg-[#8785ac] focus:outline-hidden focus:bg-violet-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                    Item 1
                </button>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-violet-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-500 dark:peer-checked:bg-blue-600"></div>
                </label>
                <span class="flex-auto ms-3 text-sm text-white border-l px-3">Apple</span>
            </div>
=======
            <div class="flex flex-col sm:flex-row md:flex-row rounded-lg shadow-2xs w-full items-center font-medium text-white bg-[#aba8e0] border border-gray-200">
                <label class="flex-auto py-3 px-4 inline-flex gap-x-2 -mt-px -ms-px 
                first:rounded-t-md last:rounded-b-md sm:first:rounded-s-md sm:mt-0 sm:first:ms-0 s
                m:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-md text-sm font-medium
                focus:z-10 border border-gray-200  shadow-2xs cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none 
                    peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-violet-500
                    rounded-full peer  peer-checked:after:translate-x-full
                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['']
                    after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border
                     after:rounded-full after:h-5 after:w-5 after:transition-all
                      peer-checked:bg-violet-500 "></div>
                    <span>English</span>
                </label>
                <label class="flex-auto py-3 px-4 inline-flex gap-x-2 -mt-px -ms-px 
                first:rounded-t-md last:rounded-b-md sm:first:rounded-s-md sm:mt-0 sm:first:ms-0 s
                m:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-md text-sm font-medium
                focus:z-10 border border-gray-200  shadow-2xs cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-violet-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-500 dark:peer-checked:bg-blue-600"></div>
                    <span>Swedish</span>
                </label>
            </div>
>>>>>>> 27a5b77bd1478c3b8493b19385b77340472d7591
        </div>
    );
}