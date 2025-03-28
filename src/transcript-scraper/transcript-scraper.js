import { getDocument } from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.mjs";

document.addEventListener("DOMContentLoaded", async function () {
    const url = "example.pdf"; // Change this to your PDF file path
    const pdf = await getDocument(url).promise;
    console.log("PDF loaded!", pdf);
});

const pdfjsLib = window['pdfjsLib'];
document.getElementById('fileInput').addEventListener('change', async function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function() {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let extractedText = '';

        let textObjects = [];
        

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();

            textObjects.push(...textContent.items);
            
            /*textContent.items.forEach(textItem => {
                const xCoordinate = textItem.transform[4];
                if (xCoordinate === 56.692) {
                    extractedText += textItem.str + '\n';
                }
            });*/
        }

        let flagKTH = false;
        let flagTable = false;
        let flagTableDone = false;

        for(let i = 0; i < textObjects.length; i++){
            if((!flagKTH)&&textObjects[i].transform[4] === 56.692)
                if((textObjects[i].str == "Kungliga Tekniska högskolan")|| (textObjects[i].str == "KTH Royal Institute of Technology")){
                    flagKTH = true;
                    //console.log("found KTH!\nbeginning transcribing\n----------------------------");
                        //skipping "parts of completed curses, and starts with the Kod/Code table"
                    continue;
                }
            if(flagKTH){
                //console.log(textObjects[i].str, "| x: ", textObjects[i].transform[4])
                //if((textObjects[i-1].transform[4] === 56.692)&&(textObjects[i-1].transform[4] !== 510.233))
                if((textObjects[i].str === "Code")||(textObjects[i].str === "Kod")){
                    if(flagTable) flagTableDone = true; //we have already found one table and transcribed it

                    //console.log("----------------------------new table found");

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
                if((textObjects[i].transform[4] === 56.692) && (textObjects[i+12].transform[4] === 510.233) && (textObjects[i].str.length < 8))
                    if(flagTable){
                        console.log(textObjects[i].str, textObjects[i].transform[4]);
                        extractedText+= textObjects[i].str + "\n";
                    }
                        
            }
                    
        }

        

        document.getElementById('output').textContent = extractedText || 'No matching text found.';
    };
    reader.readAsArrayBuffer(file);
});
