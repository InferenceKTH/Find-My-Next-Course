import React from 'react';
import CourseTranscriptList from './CourseTranscriptList';
//import * as scraper from '../../../../src/scripts/transcript-scraper/transcript-scraper.js';
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import { useState } from "react";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;


export default function UploadField(props) {
    const [errorMessage, setErrorMessage] = useState(""); // Stores error message
    const [errorVisibility, setErrorVisibility] = useState("hidden"); // Controls visibility

    async function transcriptScraperFunction(file) {
        console.log(file);
        //const pdfjsLib = window['pdfjsLib'];
        //pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
        if (!file) {
            console.log("element: 'PDF-Scraper-Input' changed, but we havent gotten a file yet.");
            return;
        }
        if (file.type !== "application/pdf") {
            throwTranscriptScraperError("Uploaded file isn't PDF.");
            return;
        }

        setErrorVisibility("hidden");


        const arrayBuffer = await file.arrayBuffer();
        const typedArray = new Uint8Array(arrayBuffer);
        try {
            const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
            let extractedText = '';

            //this is our array we are going to work with
            let textObjects = [];


            //we will parse the whole pdf page-by-page, and going to push all the content into our array
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                //pushing all the text items from the page into our array
                textObjects.push(...textContent.items);
            }


            evaluatePDFtextObjectArray(textObjects);



            //document.getElementById('transcript-scraper.js:output').textContent = localStorage.getItem("completedCourses") || 'No matching text found.';
        }
        catch (e) {
            throwTranscriptScraperError("While parsing the pdf something went wrong." + e);
        }
    }

    function throwTranscriptScraperError(txt) {
        console.log("PDF-Scraper-Error: " + txt);
        setErrorMessage("Error: " + txt);
        setErrorVisibility("visible");
    }

    function writeLocalStorage_completedCourses(codesArr) {
        //Getting the local storage contents
        let local = [];
        if (localStorage.getItem("completedCourses"))
            local = JSON.parse(localStorage.getItem("completedCourses"));
        else {
            localStorage.setItem("completedCourses", '[]');
        }

        local.sort();

        let newcodes = local.concat(codesArr);
        newcodes = [... new Set(newcodes)];


        localStorage.setItem("completedCourses", JSON.stringify(newcodes));
        console.log(newcodes);

        window.dispatchEvent(new Event("completedCourses changed"));
    }

    function evaluatePDFtextObjectArray(textObjects) {
        let scrapedCodes = [];

        //initializing couple flags.
        let flagKTH = false;
        let flagKTH_NeverSet = true;
        let flagTable = false;
        let flagTableDone = false;

        let flagErrorRecords = false;

        //we are going to go through each text object which is inside the pdf file.
        for (let i = 0; i < textObjects.length; i++) {
            //we are going to look for our university, KTH
            //current ladok generated National Official transcripts start at xposition 56.692
            if ((!flagKTH) && (textObjects[i].transform[4] === 56.692))
                if ((textObjects[i].str == "Kungliga Tekniska högskolan") || (textObjects[i].str == "KTH Royal Institute of Technology")) {
                    flagKTH = true;
                    flagKTH_NeverSet = false;
                    continue;
                }

            if ((!flagErrorRecords) && ((textObjects[i].str == "Resultatintyg") || (textObjects[i].str == "Official Transcript of Records"))) {
                flagErrorRecords = true;
            }

            if (flagKTH) {
                //we have found KTH, the very next table containing records should be the one with completed courses
                //TODO: this might not be necessarily true, you might need to have a similar code to KTH checker, to check if its
                //      'completed courses'/'avslutade kurser'


                //the very first text in a table is always Code/Kod; we will start describing it; and we will detect when a new table starts
                //and check if its accidentally the same table which just got cut in half by a newline or an actually different table
                if ((textObjects[i].str === "Code") || (textObjects[i].str === "Kod")) {
                    if (flagTable) flagTableDone = true; //we have already found one table and transcribed it

                    if (!flagTableDone) {
                        flagTable = true;
                    } else {
                        if (textObjects[i - 2].transform[4] !== 497.66899718999997) {
                            //the new table (that is the new found "Kod" / "Code" is not because unexpected page break, therefore we are done transcribing
                            //KTH courses, these are either uncomplete courses, or courses from other universities
                            flagTable = false;
                            //console.log("----------------------------\nfinished table!");
                            flagKTH = false;
                        }
                    }
                }
                //we are looking for text objects which are precisely at x coord 56.692; and also there exists such an element 12 ahead in the array
                //which is at coord 510.233; these are hardcoded values into the ladok pdf generator
                //for good measures we also make sure the text is not longer that 7 chars; the longest course ID found so far at KTH
                if ((textObjects[i].transform[4] === 56.692) && (textObjects[i + 12].transform[4] === 510.233) && (textObjects[i].str.length < 8))
                    if (flagTable) {
                        //console.log(textObjects[i].str, textObjects[i].transform[4]);
                        //extractedText+= textObjects[i].str + "\n";
                        scrapedCodes.push(textObjects[i].str);
                    }

            }

        }

        if (flagErrorRecords && (scrapedCodes.length == 0)) {
            throwTranscriptScraperError("Provided Official Transcript of Records instead of National Official transcript of records.");
            return;
        }

        if (flagKTH_NeverSet) {
            throwTranscriptScraperError("Provided pdf doesn't contain KTH.");
            return;
        }
        //console.log(scrapedCodes);
        //console.log(localStorage.getItem("completedCourses"));
        if (scrapedCodes.length == 0) {
            throwTranscriptScraperError("Couldn't find any tables to transcribe.");
            return;
        }
        writeLocalStorage_completedCourses(scrapedCodes);
        //console.log(localStorage.getItem("completedCourses"));
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        //document.getElementById('PDF-Scraper-Error').style.visibility = "visible";
        transcriptScraperFunction(file);
        document.getElementById('PDF-Scraper-Input').value = '';
    };
    return (
        <div className='pb-5 px-8 '>
            <div className="flex items-center justify-center ">
                <label for="PDF-Scraper-Input" className="flex flex-col items-center justify-center w-full h-50 border-2 
                 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#aba8e0] hover:bg-gray-400">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm "><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs">KTH trnascript of records in PDF format</p>
                    </div>
                    <input id="PDF-Scraper-Input" type="file" className="hidden" onChange={handleFileChange} />
                </label>
            </div>
            <p className='text-sm opacity-50 pt-3'> Describe how the Transcript upload works</p>
            <div className='max-w-70'>
                <pre id="PDF-Scraper-Error" className={`text-red-500 text-xs text-wrap ${errorVisibility}`}>
                    {errorMessage}
                </pre>
            </div>
            <CourseTranscriptList />
        </div>
    );
}

