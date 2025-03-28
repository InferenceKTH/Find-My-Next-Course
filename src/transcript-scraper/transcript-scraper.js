import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.mjs';

//const pdfjsLib = require('pdfjs-dist');

async function extractFirstLine(file) {
    try {
        const reader = new FileReader();
        reader.onload = async function () {
            const typedArray = new Uint8Array(reader.result);
            const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
            const page = await pdf.getPage(1);
            const textContent = await page.getTextContent();
            const firstLine = textContent.items.map(item => item.str).join(' ').split('\n')[0];
            console.log("First line:", firstLine);
        };
        reader.readAsArrayBuffer(file);
    } catch (error) {
        console.error("Error reading PDF:", error);
    }
}


document.getElementById('pdfFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        extractFirstLine(file);
    }
});