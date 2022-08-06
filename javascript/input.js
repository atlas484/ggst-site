
function setDate() {
    // console.log("setting the date")
    document.getElementById('date').valueAsDate = new Date((new Date()).toLocaleDateString());
}

function fillCharacters() {
    // console.log("filling character lists")
    fetch("./characters/codes.json", {cache: "no-cache"})
        .then(response => response.json())
        .then(jsondata => {
            var select = document.createElement("select");
            for(const key in jsondata) {
                var option = document.createElement("option");
                option.value = key;
                option.text = jsondata[key]["name_long"];
                select.add(option);
            }
            var select1 = document.getElementById("char-dropdown-1");
            select1.innerHTML = select.innerHTML
            var select2 = document.getElementById("char-dropdown-2");
            select2.innerHTML = select.innerHTML
        });
}

function setDefaults() {
    // console.log("setting character defaults")
    fetch("./characters/defaults.json", {cache: "no-cache"})
        .then(response => response.json())
        .then(jsondata => {
            var character1 = document.getElementById("char-dropdown-1");
            character1.value = jsondata["me"]
            var opponent = document.getElementById("opponent");
            opponent.value = jsondata["opponent"]["name"]
            var character2 = document.getElementById("char-dropdown-2");
            character2.value = jsondata["opponent"]["character"]
        })
        .then(() => {
            setCharacterImage(1);
            setCharacterImage(2);
        });
}

function setCharacterImage(num) {
    // console.log(`setting character ${num} image`);
    dropdown = document.getElementById(`char-dropdown-${num}`);
    characterCode = dropdown.value;
    img = document.getElementById(`character-${num}-img`);
    img.src = `characters/faces/${characterCode}.png`;
}


function processForm() {
    // (A) GET FORM DATA
    let form = document.getElementById("form")
    let data = new FormData(form);

    // (B) AJAX SEND FORM
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/input.php");
    xhr.onload = function () {
        // console.log(data);
        console.log(this.response);
        // MANUAL RESET
        document.getElementById("games").value = "";
        getLastSet();
    };
    xhr.send(data);

    // (C) STOP DEFAULT FORM SUBMIT/PAGE RELOAD
    return false;
}

function checkPageValues() {
    console.log(`Date: ${document.getElementById('date').valueAsDate}`);
    console.log(`Opponent: ${document.getElementById("opponent").value}`);
    console.log(`Character 1: ${document.getElementById('char-dropdown-1').value}`);
    console.log(`Character 2: ${document.getElementById('char-dropdown-2').value}`);
}

function getLastSet() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/last_set.php");
    xhr.onload = function () {
        const response = JSON.parse(this.response);
        // console.log(this.response);
        if (response["successful"]){
            let last_set_p = document.getElementById("last-set");
            const date = response["date"];
            const opp = response["opponent"];
            const c1 = response["character_1"];
            const c2 = response["character_2"];
            const ws = parseInt(response["won"]);
            const ls = parseInt(response["played"]) - ws;

            let oppStr = "";
            if (opp[0] == "*") oppStr = opp[1] == "T" ? " in tournament" : "";
            else if (opp[0] == "#") oppStr = " in ranked";
            else oppStr = ` against ${opp}`;
            
            last_set_p.innerHTML = `The last set was on ${date}${oppStr}, ${c1} vs ${c2}, ${ws}-${ls}`;
        }
    };
    xhr.send();
}

window.addEventListener("load", function() {
    setDate();
    fillCharacters();
    setDefaults();
    setCharacterImage(1);
    setCharacterImage(2);
    getLastSet();
    // checkPageValues();
});