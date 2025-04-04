import React from 'react';

export default function ToggleField({field1, field2 }) {
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
            <div className="flex flex-col sm:flex-row md:flex-row rounded-lg shadow-2xs w-full items-center
             font-medium text-white bg-[#aba8e0] ">
                <label className="flex-auto py-3 px-4 inline-flex gap-x-2 -mt-px -ms-px 
                first:rounded-t-md last:rounded-b-md sm:first:rounded-s-md sm:mt-0 sm:first:ms-0 s
                m:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-md text-sm font-medium
                focus:z-10 border border-gray-200  shadow-2xs cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none 
                    peer-focus:ring-4 peer-focus:ring-blue-300 
                    rounded-full peer  peer-checked:after:translate-x-full
                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['']
                    after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border
                     after:rounded-full after:h-5 after:w-5 after:transition-all
                      peer-checked:bg-violet-500 "></div>
                    <span>{field1}</span>
                </label>
                <label className="flex-auto py-3 px-4 inline-flex gap-x-2 -mt-px -ms-px 
                first:rounded-t-md last:rounded-b-md sm:first:rounded-s-md sm:mt-0 sm:first:ms-0 s
                m:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-md text-sm font-medium
                focus:z-10 border border-gray-200  shadow-2xs cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                    peer-focus:ring-blue-300  rounded-full peer
                      peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                      peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                      after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                       after:h-5 after:w-5 after:transition-all  peer-checked:bg-violet-500
                        "></div>
                    <span>{field2 }</span>
                </label>
            </div>
        </div>
    );
}