const day_list = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const day_list_finnish = [
  "Sunnuntai",
  "Maanantai",
  "Tiistai",
  "Keskiviikko",
  "Torstai",
  "Perjantai",
  "Lauantai",
];
let day = "Wednesday";

let public_data = "";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const date = new Date();
    const day_of_week = date.getDay();

    // Saturday and Sunday to Friday
    if (day_of_week == 6 || day_of_week == 0) {
      day_of_week = 5;
    }

    day = day_list[day_of_week];

    document.getElementById("day_label").innerHTML =
      day_list_finnish[day_list.indexOf(day)];

    //on start set public data from memory, the load new data from website to it
    public_data = JSON.parse(localStorage.getItem("menu_data"));
    get_menu_data();
  },
  false
);

// type "lounaat" or "kasvislounaat"
function create_food_element(name, diet, macro_element, type, ingredients) {
  const element_id = Math.floor(Math.random() * 90000000);

  const container = document.createElement("div");
  container.setAttribute("class", "accordion-item");
  const parent = document.getElementById(type);
  parent.appendChild(container);

  const accordion_header = `<h2 class="accordion-header">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${element_id}" aria-expanded="false" aria-controls="flush-collapseOne">
    ${name}${diet == "" ? "" : ` (${diet})`}
    </button>
  </h2>`;

  const macro_element_wrapper =
    macro_element == ""
      ? ""
      : `<div class="card fs-6">
    <div class="card-header text-start container bg-body-secondary">
      <div class="row">
        <div class="col text-start">
          <b>Ravintosisältö</b> 
        </div>
        <div class="col text-end">
          per 100g
        </div>
      </div>
    </div>

    <div class="card-body container">
      <div class="row">
        <div class="col text-start">
          <p class="card-text ruoka-kortti">
            Energia
          </p>
          <p class="card-text ruoka-kortti">
            Rasva
          </p>
          <p class="card-text ruoka-kortti" style="text-indent: 2ch; ">
            Tyydyttynyt
          </p>
          <p class="card-text ruoka-kortti">
            Hiilihydraatit
          </p>
          <p class="card-text ruoka-kortti" style="text-indent: 2ch;">
            Sokeri
          </p>
          <p class="card-text ruoka-kortti">
            Proteiini
          </p>
          <p class="card-text ruoka-kortti">
            Suola
          </p>
          <p class="card-text ruoka-kortti">
            Kuitu
          </p>
        </div>
        ${macro_element}
      </div>
    </div>
  </div>`;

  const accordion_body = `<div id="${element_id}" class="accordion-collapse collapse" data-bs-parent="#${type}">
    <div class="accordion-body" style="padding-left: 0px; padding-right: 0px;">
      ${macro_element_wrapper}
      <div class="card fs-6" style="margin-top: 5px;">
        <div class="card-header text-start container bg-body-secondary">
          <div class="col"><strong>Ainesosat</strong></div>
        </div>

        <div class="card-body container">
          <div class="col">
           ${ingredients}
          </div>
        </div>
      </div>
    
      
    </div>
  </div>`;

  container.innerHTML = accordion_header + accordion_body;
}

function render_day() {
  document.getElementById("week_count").innerHTML = `Viikko ${retrieve_week()}`;

  //empty the menu
  document.getElementById("lounaat").innerHTML = "";
  document.getElementById("kasvislounaat").innerHTML = "";

  parsed_data = JSON.parse(public_data);
  var menu = parsed_data["Menu"];

  day_menu = menu[day];

  lounas_options = 0;
  //element 1 is the lounas
  //console.log(Object.keys(day_menu[1]))
  console.log(Object.keys(day_menu[0]));
  try {
    lounas_options = day_menu[1][Object.keys(day_menu[1])[0]];
  } catch {}
  kasvis_options = day_menu[0][Object.keys(day_menu[0])[0]];

  //rendering the lounas options
  if (lounas_options != 0) {
    document.getElementById("lounas_lbl").innerHTML = Object.keys(
      day_menu[1]
    )[0];

    for (var i = 0; i < lounas_options.length; i++) {
      lounas_name = lounas_options[i][0];
      lounas_diet = "";
      console.log(lounas_options[i]);
      if (lounas_options[i][1] != null) {
        lounas_diet = lounas_options[i][1]["diets"];
        create_food_element(
          lounas_name,
          lounas_diet,
          render_macros(lounas_options[i][1]["macros"]),
          "lounaat",
          lounas_options[i][1]["ingredients"]
        );
      } else {
        create_food_element(lounas_name, lounas_diet, "", "lounaat", "ei saatavilla");
      }
    }
  }

  //rendering the kasvis lounas options
  document.getElementById("kasvislounas_lbl").innerHTML = Object.keys(
    day_menu[0]
  )[0];

  for (var i = 0; i < kasvis_options.length; i++) {
    kasvislounas_name = kasvis_options[i][0];

    kasvislounas_diet = "";
    console.log(kasvis_options[i]);
    if (kasvis_options[i][1] != null) {
      kasvislounas_diet = kasvis_options[i][1]["diets"];
      create_food_element(
        kasvislounas_name,
        kasvislounas_diet,
        render_macros(kasvis_options[i][1]["macros"]),
        "kasvislounaat",
        kasvis_options[i][1]["ingredients"]
      );
    } else {
      create_food_element(
        kasvislounas_name,
        kasvislounas_diet,
        "",
        "kasvislounaat",
        "ei saatavilla",
      );
    }
  }
}

/**
 * Renders macronutrients
 *
 * @param {Object[]} macro_list - Map of macronutrients
 * @returns {string}
 */
function render_macros(macro_list) {
  console.log(macro_list);
  if (macro_list == null) {
    return "";
  }

  const output = `<div class="col text-end" style="font-weight: 200;">
    <p class="card-text ruoka-kortti">
    ${render_macro("EnergyKj", macro_list)}, ${render_macro(
    "EnergyKcal",
    macro_list
  )}
    </p>
    <p class="card-text ruoka-kortti">
    ${render_macro("Fat", macro_list)}
    </p>
    <p class="card-text ruoka-kortti">
    ${render_macro("FatSaturated", macro_list)}
    </p>
    <p class="card-text ruoka-kortti">
    ${render_macro("Carbohydrates", macro_list)}
    </p>
    <p class="card-text ruoka-kortti">
    ${render_macro("Sugar", macro_list)}
    </p>
    <p class="card-text ruoka-kortti">
    ${render_macro("Protein", macro_list)}
    </p>
    <p class="card-text ruoka-kortti">
    ${render_macro("Salt", macro_list)}
    </p>
    <p class="card-text ruoka-kortti">
    ${render_macro("Fiber", macro_list)}
    </p>
  </div>`;

  return output;
}

function render_macro(name, macro_list) {
  try {
    return `${macro_list[name]["amount"]} ${macro_list[name]["unit"]}`;
  } catch {
    return "ei tiedossa";
  }
}

function get_menu_data() {
  fetch("https://ksyk-menu-scraper.onrender.com/")
    .then(function (response) {
      // The API call was successful!
      return response.text();
    })
    .then(function (output) {
      console.log(output);
      public_data = output;
      localStorage.setItem("menu_data", output);
    })
    .catch(function (err) {
      // There was an error
      console.warn("Something went wrong!", err);
    });
}

function retrieve_week() {
  parsed_data = JSON.parse(public_data);
  var week = parsed_data["Week"];
  console.log(week);
  return week;
}

function test() {
  alert("bruh");
}

function open_next_day() {
  if (day_list.indexOf(day) < 5) {
    day = day_list[day_list.indexOf(day) + 1];
    document.getElementById("day_label").innerHTML =
      day_list_finnish[day_list.indexOf(day)];
    render_day();
  } else {
    day = day_list[1];
    document.getElementById("day_label").innerHTML =
      day_list_finnish[day_list.indexOf(day)];
    render_day();
  }
}

function open_previous_day() {
  if (day_list.indexOf(day) > 1) {
    day = day_list[day_list.indexOf(day) - 1];
    document.getElementById("day_label").innerHTML =
      day_list_finnish[day_list.indexOf(day)];
    render_day();
  } else {
    day = day_list[5];
    document.getElementById("day_label").innerHTML =
      day_list_finnish[day_list.indexOf(day)];
    render_day();
  }
}
