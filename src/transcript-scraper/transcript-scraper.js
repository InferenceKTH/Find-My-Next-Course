//Requirements for this to work:    You need to include 
//                                                  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
//                                  in the header of your html,
//                                  you also need an Element which file type, and is inputting a file (the pdf to parse), in the html.
//                                  you also need an Element which is pre, which is an Error output field.



/*

var localJson = {

    codes : []

};

*/


function throwTranscriptScraperError(txt){
    console.log("PDF-Scraper-Error: " + txt);
    document.getElementById('PDF-Scraper-Error').textContent = "Error: " + txt;
    document.getElementById('PDF-Scraper-Error').style.visibility = "visible";
}


function writeLocalStorage_completedCourses(codesArr){
    //Getting the local storage contents
    let local = [];
    if(localStorage.getItem("completedCourses"))
        local = JSON.parse(localStorage.getItem("completedCourses"));
    else{
        localStorage.setItem("completedCourses", '[]');
    }

    let newcodes = local.concat(codesArr);
    newcodes = [... new Set(newcodes)];
    

    localStorage.setItem("completedCourses", JSON.stringify(newcodes));
}

function evaluatePDFtextObjectArray(textObjects){
    let scrapedCodes = [];

    //initializing couple flags.
    let flagKTH = false;
    let flagKTH_NeverSet = true;
    let flagTable = false;
    let flagTableDone = false;

    let flagErrorRecords = false;

    //we are going to go through each text object which is inside the pdf file.
    for(let i = 0; i < textObjects.length; i++){
        //we are going to look for our university, KTH
        //current ladok generated National Official transcripts start at xposition 56.692
        if((!flagKTH) && (textObjects[i].transform[4] === 56.692))
            if((textObjects[i].str == "Kungliga Tekniska högskolan")|| (textObjects[i].str == "KTH Royal Institute of Technology")){
                flagKTH = true;
                flagKTH_NeverSet = false;
                continue;
            }

        if((!flagErrorRecords) && ((textObjects[i].str == "Resultatintyg")|| (textObjects[i].str == "Official Transcript of Records"))){
            flagErrorRecords = true;
        }

        if(flagKTH){
            //we have found KTH, the very next table containing records should be the one with completed courses
            //TODO: this might not be necessarily true, you might need to have a similar code to KTH checker, to check if its
            //      'completed courses'/'avslutade kurser'


            //the very first text in a table is always Code/Kod; we will start describing it; and we will detect when a new table starts
            //and check if its accidentally the same table which just got cut in half by a newline or an actually different table
            if((textObjects[i].str === "Code")||(textObjects[i].str === "Kod")){
                if(flagTable) flagTableDone = true; //we have already found one table and transcribed it

                if(!flagTableDone) {
                    flagTable = true;
                }else{
                    if(textObjects[i-2].transform[4] !== 497.66899718999997) {
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
            if((textObjects[i].transform[4] === 56.692) && (textObjects[i+12].transform[4] === 510.233) && (textObjects[i].str.length < 8))
                if(flagTable){
                    //console.log(textObjects[i].str, textObjects[i].transform[4]);
                    //extractedText+= textObjects[i].str + "\n";
                    scrapedCodes.push(textObjects[i].str);
                }
                    
            }
                
        }
    
    if(flagErrorRecords && (scrapedCodes.length ==0)){
        throwTranscriptScraperError("Provided Official Transcript of Records instead of National Official transcript of records.");
        return;
    }

    if(flagKTH_NeverSet){ 
        throwTranscriptScraperError("Provided pdf doesn't contain KTH.");
        return;
    }
    //console.log(scrapedCodes);
    //console.log(localStorage.getItem("completedCourses"));
    if(scrapedCodes.length == 0){
        throwTranscriptScraperError("Couldn't find any tables to transcribe.");
        return;
    }
    writeLocalStorage_completedCourses(scrapedCodes);
    //console.log(localStorage.getItem("completedCourses"));
}

document.addEventListener("DOMContentLoaded", async function () {
    //localStorage.removeItem("completedCourses");

    const pdfjsLib = window['pdfjsLib'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    document.getElementById('PDF-Scraper-Input').addEventListener('change', async function(event) {
        const file = event.target.files[0];
        if (!file) {
            console.log("element: 'PDF-Scraper-Input' changed, but we havent gotten a file yet.");
            return;
        }
        if(file.type !== "application/pdf"){
            throwTranscriptScraperError("Uploaded file isn't PDF.");
            return;
        }

        document.getElementById('PDF-Scraper-Error').style.visibility = "hidden";

        const reader = new FileReader();
        reader.onload = async function() {
            const typedArray = new Uint8Array(reader.result);
            const pdf = await pdfjsLib.getDocument(typedArray).promise;
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
            
            

            document.getElementById('transcript-scraper.js:output').textContent = localStorage.getItem("completedCourses") || 'No matching text found.';
        };
        reader.readAsArrayBuffer(file);
    });
});