export function throwTranscriptScraperError(txt, setErrorMessage, setErrorVisibility) {
    console.log("PDF-Scraper-Error: " + txt);
    setErrorMessage("Error: " + txt);
    setErrorVisibility("visible");
}

export function writeLocalStorage_completedCourses(codesArr) {
    let local = [];
    if (localStorage.getItem("completedCourses"))
        local = JSON.parse(localStorage.getItem("completedCourses"));
    else {
        localStorage.setItem("completedCourses", '[]');
    }

    let newcodes = [...new Set(local.concat(codesArr))];

    localStorage.setItem("completedCourses", JSON.stringify(newcodes));
}

export function evaluatePDFtextObjectArray(textObjects, throwError, writeToStorage) {
    let scrapedCodes = [];
    let flagKTH = false;
    let flagKTH_NeverSet = true;
    let flagTable = false;
    let flagTableDone = false;
    let flagErrorRecords = false;

    for (let i = 0; i < textObjects.length; i++) {
        if ((!flagKTH) && (textObjects[i].transform[4] === 56.692))
            if ((textObjects[i].str === "Kungliga Tekniska högskolan") || (textObjects[i].str === "KTH Royal Institute of Technology")) {
                flagKTH = true;
                flagKTH_NeverSet = false;
                continue;
            }

        if ((!flagErrorRecords) && ((textObjects[i].str === "Resultatintyg") || (textObjects[i].str === "Official Transcript of Records"))) {
            flagErrorRecords = true;
        }

        if (flagKTH) {
            if ((textObjects[i].str === "Code") || (textObjects[i].str === "Kod")) {
                if (flagTable) flagTableDone = true;
                if (!flagTableDone) {
                    flagTable = true;
                } else {
                    if (textObjects[i - 2].transform[4] !== 497.66899718999997) {
                        flagTable = false;
                        flagKTH = false;
                    }
                }
            }
            if ((textObjects[i].transform[4] === 56.692) && (textObjects[i + 12]?.transform[4] === 510.233) && (textObjects[i].str.length < 8))
                if (flagTable) {
                    scrapedCodes.push(textObjects[i].str);
                }
        }
    }

    if (flagErrorRecords && scrapedCodes.length === 0) {
        throwError("Provided Official Transcript of Records instead of National Official transcript.");
        return;
    }

    if (flagKTH_NeverSet) {
        throwError("Provided pdf doesn't contain KTH.");
        return;
    }

    if (scrapedCodes.length === 0) {
        throwError("Couldn't find any tables to transcribe.");
        return;
    }

    writeLocalStorage_completedCourses(scrapedCodes);
}