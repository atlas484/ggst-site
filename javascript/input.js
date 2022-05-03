
function setDate(){
    console.log("setting the date")
    document.getElementById('date').valueAsDate = new Date();
}

function fillCharacters(){
    console.log("filling character lists")
}

function setCharacterImage(num) {
    // console.log(`settting character ${num} image`);
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
    xhr.open("POST", "0-dummy.html");
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

window.addEventListener("load", function() {
    setDate();
    fillCharacters();
    setCharacterImage(1);
    setCharacterImage(2);
});