<script setup lang="ts">
import NavBar from '../../components/NavBar.vue'

import { reactive } from 'vue';
const formData = reactive({
  date: parseDateToISO((new Date()).toLocaleDateString()),
  opponent: "Raghav",
  character1: "SO",
  character2: "KY",
  games: ""
})
const lastSet = reactive({
  date: "",
  opponent: "",
  oppString: "",
  character1: "",
  character2: "",
  wins: 0,
  losses: 0,
  lastSetString: ""
})
const characters = reactive({} as {[key: string]: string})
const opponents = reactive({
  "Raghav": "Raghav",
  "Kyle": "Kyle",
  "Yonas": "Yonas",
  "#CE": "Celestial",
  "*Random": "Random",
  "*Tournament": "Tournament"
})

function parseDateToISO(dateString: string) {
  const split = dateString.split('/')
  const year = split[2]
  const month = split[0].length > 1 ? split[0] : '0' + split[0]
  const day = split[1].length > 1 ? split[1] : '0' + split[1]
  return year + "-" + day + "-" + month
}
function charImgPath(charCode: string) {
  return "./src/assets/characters/faces/" + charCode + ".png"
}
function numToKeyString(n: number) {
  return '#0' + n.toString()
}
function getLastSet(){
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "./src/php/last_set.php");
  xhr.onload = function () {
      const response = JSON.parse(this.response);
      // console.log(this.response);
      if (response["successful"]){
          lastSet.date = response["date"];
          lastSet.opponent = response["opponent"];
          lastSet.character1 = response["character_1"];
          lastSet.character2 = response["character_2"];
          lastSet.wins = parseInt(response["won"]);
          lastSet.losses = parseInt(response["played"]) - lastSet.wins;

          if (lastSet.opponent == "Ranked") lastSet.oppString = " in ranked";
          else if (lastSet.opponent == "Tournament") lastSet.oppString = " in tournament";
          else if (lastSet.opponent == "Random") lastSet.oppString = " against a random opponent";
          else lastSet.oppString = ` against ${lastSet.opponent}`;
          lastSet.lastSetString = `The last set was on ${lastSet.date}${lastSet.oppString}, ` + 
                                  `${lastSet.character1} vs ${lastSet.character2}, ` + 
                                  `${lastSet.wins}-${lastSet.losses}`;
      }
      else lastSet.lastSetString = "Failed to retrieve data on the last set played";
  };
  xhr.send();
}
function processForm(){
  
  // (A) GET FORM DATA
  const data = new FormData();
  data.append("date", formData.date)
  data.append("character-1", formData.character1)
  data.append("opponent", formData.opponent)
  data.append("character-2", formData.character2)
  data.append("games", formData.games)
  // console.log(data)

  // (B) AJAX SEND FORM
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "./src/php/input.php");
  xhr.onload = function () {
      // console.log(data);
      console.log(this.response);
      // MANUAL RESET
      formData.games = "";
      getLastSet();
  };
  xhr.send(data);

  // (C) STOP DEFAULT FORM SUBMIT/PAGE RELOAD
  return false;
}
// get list of all characters to select from
fetch("./src/assets/characters/codes.json", {cache: "no-cache"})
  .then(response => response.json())
  .then(jsondata => {
      for (const key in jsondata) {
        characters[key] = jsondata[key]["name_long"]
      }
  })
  .catch(error => {
    // if the fetch fails, these are the most likely characters to be needed
    characters["SO"] = "Sol Badguy";
    characters["KY"] = "Ky Kiske";
    characters["GI"] = "Giovanna";
    characters["MI"] = "Millia Rage";
    characters["NA"] = "Nagoriyuki";
    characters["BR"] = "Bridget";
    characters["FA"] = "Faust";
    characters["CH"] = "Chipp Zanuff";
    characters["RA"] = "Ramlethal Valentine";
    characters["IN"] = "I-No";
  });
// set defaults
fetch("./src/assets/characters/defaults.json", {cache: "no-cache"})
  .then(response => response.json())
  .then(jsondata => {
      formData.character1 = jsondata["me"]
      formData.opponent = jsondata["opponent"]["name"]
      formData.character2 = jsondata["opponent"]["character"]
  });
getLastSet();
</script>

<template>
  <NavBar pageName="Input" />

  <main>
    <h1>Input Sets</h1>
    <p id="last-set">{{ lastSet.lastSetString }}</p>

    <form  id="form" autocomplete="off" @submit.prevent="onSubmit">
      <div id="inputs">
        <div class="character" id="character-1">
          <div class="labeled">
            <label for="date">Date: </label>
            <input type="date" v-model="formData.date" class="formElement">
          </div>
          <img :src='charImgPath(formData.character1)' alt="Character 1 img" width="360" height="360" />
          <select v-model="formData.character1" id="char-dropdown-1" class="formElement">
            <option v-for="(value, key) in characters" :value="key">{{ value }}</option>
          </select>
        </div>

        <p id="vs">VS</p>

        <div class="character" id="character-2">
          <div class="labeled">
            <label for="opponent">Opponent: </label>
            <select v-model="formData.opponent" class="formElement">
              <option v-for="(value, key) in opponents" :value="key">{{ value }}</option>
              <option value="#10">Floor 10</option>
              <option v-for="i in 9" :value="numToKeyString(10 - i)">{{ 'Floor '+(10 - i).toString() }}</option>
            </select>
          </div>
          <img :src='charImgPath(formData.character2)' alt="Character 2 img" width="360" height="360" />
          <select v-model="formData.character2" class="formElement">
            <option v-for="(value, key) in characters" :value="key">{{ value }}</option>
          </select>
        </div>
      </div>
      <textarea v-model="formData.games" class="formElement games" rows="5" maxlength="255" required="true"
        placeholder="Input games here (up to 255)&#10;1 = 2-0&#10;2 = 2-1&#10;3 = 1-2&#10;4 = 0-2"></textarea>
      <input type="submit" value="Submit" id="submit-button" @click="processForm()">
    </form>


  </main>
</template>

<style>
main {
  --VS-font-size: 6rem;
  --VS-margin: 1rem;
  --form-width: calc(100vw - var(--nav-width-occupation) - 2*var(--main-padding));
  --character-width: var(--form-width);
  --max-character-width: 360px;
}

#form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  /* margin: auto; */
}

#inputs {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  /* margin:auto; */
}

.character {
  display: flex;
  flex-direction: column;
  justify-items: center;
  /* width: var(--character-width); */
}

.character img {
  width: var(--character-width);
  height: var(--character-width);
  max-width: var(--max-character-width);
  max-height: var(--max-character-width);
}

.character select {
  text-align: center;
}

#vs {
  font-size: var(--VS-font-size);
  margin: var(--VS-margin);
}

.formElement {
  background-color: var(--bg-gray-2);
  color: var(--text-white);
  /* margin: auto; */
}

.labeled {
  margin: auto;
}

.games {
  margin-top: 1rem;
  box-sizing: border-box;
  width: 100%;
}

#submit-button {
  width: 8rem;
  margin: auto;
  background-color: var(--ggstRed1);
  color: var(--text-white);
}

/* Large screens */
@media only screen and (min-width: 700px) {
  main {
    --character-width: calc((var(--form-width) - var(--VS-font-size) - 2*var(--VS-margin) - 2rem) / 2);
  }

  #inputs {
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    /* margin:auto; */
  }
}
</style>
