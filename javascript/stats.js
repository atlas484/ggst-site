
const stats = {};
const myChars = [];
const opChars = [];

async function getStats() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/stats.php");
    xhr.onload = function () {
        const response = JSON.parse(this.response);
        // console.log(response);
        if (response.successful) {
            delete response.successful;
            const myCharsSet = new Set();
            const opCharsSet = new Set();
            Object.values(response).forEach(row => {
                // console.log(row);
                if (!(row["character_1"] in stats)){
                    stats[row["character_1"]] = {};
                    myCharsSet.add(row["character_1"]);
                }
                opCharsSet.add(row["character_2"]);
                stats[row["character_1"]][row["character_2"]] = {
                    played: parseInt(row.played),
                    won: parseInt(row.won),
                    last_1100: row.last_1100
                };
            });
            // console.log(stats);
            fetch("./characters/codes.json", {cache: "no-cache"})
                .then(response => response.json())
                .then(jsondata => {
                    for (const charCode in jsondata) {
                        if (myCharsSet.has(charCode)) myChars.push(charCode);
                        if (opCharsSet.has(charCode)) opChars.push(charCode);
                    }
                });
        } else {
            console.log("failed to fetch stats")
        }
    };
    xhr.send();
}


window.addEventListener("load", function() {
    getStats();
});