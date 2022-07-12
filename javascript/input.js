
function setDate() {
    // console.log("setting the date")
    document.getElementById('date').valueAsDate = new Date((new Date()).toLocaleDateString());
}

function fillCharacters() {
    // console.log("filling character lists")
    fetch("./characters/codes.json")
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
    fetch("./characters/defaults.json")
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
    xhr.open("POST", "processing/input.php");
    xhr.onload = function () {
        console.log(data);
        console.log(this.response);
        // MANUAL RESET
        document.getElementById("matches").value = "";
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

window.addEventListener("load", function() {
    setDate();
    fillCharacters();
    setDefaults();
    setCharacterImage(1);
    setCharacterImage(2);
    // checkPageValues();
});