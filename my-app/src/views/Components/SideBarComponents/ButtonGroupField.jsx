import React from 'react';

export default function ButtonGroupField(props) {
    return (
        <div className='m-2'>
            <div className='mb-2 text-white justify-center'>
                <div className='float-left mr-1'>
                    <h3>Other filter</h3>
                </div>
                <div>
                    <p className='text-sm opacity-50'> - filter description</p>
                </div>
            </div>
            <div class="flex flex-col sm:inline-flex sm:flex-row rounded-lg shadow-2xs w-full items-center font-medium text-white bg-[#aba8e0] border border-gray-200">
                <button type="button" class="flex-auto py-3 px-4 inline-flex items-center gap-x-2 -mt-px -ms-px first:rounded-t-md last:rounded-b-md sm:first:rounded-s-md sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-md text-sm font-medium focus:z-10 border border-gray-200  shadow-2xs hover:bg-[#8785ac] focus:outline-hidden focus:bg-violet-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                    Item 1
                </button>
                <button type="button" class="flex-auto py-3 px-4 inline-flex items-center gap-x-2 -mt-px -ms-px first:rounded-t-md last:rounded-b-md sm:first:rounded-s-md sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-md text-sm font-medium focus:z-10 border border-gray-200  shadow-2xs hover:bg-[#8785ac] focus:outline-hidden focus:bg-violet-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                    Item 2
                </button>
                <button type="button" class="flex-auto py-3 px-4 inline-flex items-center gap-x-2 -mt-px -ms-px first:rounded-t-md last:rounded-b-md sm:first:rounded-s-md sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-md text-sm font-medium focus:z-10 border border-gray-200  shadow-2xs hover:bg-[#8785ac] focus:outline-hidden focus:bg-violet-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                    Item 3
                </button>
            </div>
        </div>
    );
}