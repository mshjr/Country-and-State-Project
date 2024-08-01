function loadCountries() {
  const request = new XMLHttpRequest();
  request.open("GET", "https://xc-countries-api.fly.dev/api/countries/");

  // Add conditional for return code
  request.onload = () => {
    let dropdownsList = document.querySelectorAll(".country-dropdown");
    const countryData = JSON.parse(request.responseText);
    sortByAlpha(countryData);

    dropdownsList.forEach((dropdown) => {
      for (let i = 0; i < countryData.length; i++) {
        const option = document.createElement("option");
        const countryId = document.createAttribute("data-countryid");
        countryId.value = countryData[i]["id"];
        option.setAttributeNode(countryId);
        option.value = countryData[i]["code"];
        option.textContent = countryData[i]["name"];
        dropdown.appendChild(option);
      }
    });
  };

  request.send();
}

function loadStates() {
  const request = new XMLHttpRequest();
  let countryCode = document.getElementById("country").value;
  request.open(
    "GET",
    `https://xc-countries-api.fly.dev/api/countries/${countryCode}/states/`
  );

  request.onload = () => {
    const dropdown = document.querySelector("#state");
    const statesData = JSON.parse(request.responseText);
    sortByAlpha(statesData);

    if (dropdown.options.length > 1) {
      dropdown.innerHTML = `<option value="" selected disabled>Select a state</option>`;
    }
    for (let i = 0; i < statesData.length; i++) {
      const option = document.createElement("option");
      option.value = statesData[i]["code"];
      option.textContent = statesData[i]["name"];
      dropdown.appendChild(option);
    }
  };

  request.send();
}

function sendNewCountry() {
  const request = new XMLHttpRequest();
  request.open("POST", "https://xc-countries-api.fly.dev/api/countries/");
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  let newCountryCode = document.querySelector("#newCountryCode").value;
  let newCountryName = document.querySelector("#newCountryName").value;

  request.onload = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status >= 200 && request.status < 300) {
        console.log("Success");
        console.log(request.responseText);
        alert("New Country Added!");
      } else {
        console.log("Error handling request");
        console.log(request.responseText);
        console.log(request.status);
      }
    }
  };

  request.send(
    JSON.stringify({
      code: newCountryCode,
      name: newCountryName,
    })
  );
}

function sendNewState() {
  //Add parameters for state code, state name, and country id
  const request = new XMLHttpRequest();
  request.open("POST", "https://xc-countries-api.fly.dev/api/states/");
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  let newStateCode = document.querySelector("#newStateCode").value;
  let newStateName = document.querySelector("#newStateName").value;
  let dropdown = document.querySelector("#newStateCountry");
  let newStateCountryId =
    dropdown.options[dropdown.selectedIndex].getAttribute("data-countryid");

  request.onload = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status >= 200 && request.status < 300) {
        console.log("Success");
        console.log(request.responseText);
        alert("New State Added!");
      } else {
        console.log("Error handling request");
        console.log(request.responseText);
        console.log(request.status);
      }
    }
  };

  request.send(
    JSON.stringify({
      code: newStateCode,
      name: newStateName,
      countryId: newStateCountryId,
    })
  );
}

/*
  Utility Functions
*/
function sortByAlpha(ArrayOfObjects) {
  ArrayOfObjects.sort((a, b) => {
    (a = a.name.toLowerCase()), (b = b.name.toLowerCase());

    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
}

function validateInput(formElement) {
  if (formElement.getAttribute("type") == "text") {
    return formElement.value.trim(); //returns true if field has text, false if empty
  } else if (formElement.tagName == "SELECT" && formElement.value != "") {
    return true;
  }
}

/*
  Event Listeners
*/
document
  .getElementById("submit-country")
  .addEventListener("click", function (event) {
    event.preventDefault();

    let form = document.querySelector("#add-new-country");
    let newCountryName = document.querySelector("#newCountryName");
    let newCountryCode = document.querySelector("#newCountryCode");

    if (validateInput(newCountryName) && validateInput(newCountryCode)) {
      sendNewCountry();
      form.reset();
    } else {
      alert("All fields are required to submit.");
    }
  });

document
  .getElementById("submit-state")
  .addEventListener("click", function (event) {
    event.preventDefault();

    let form = document.querySelector("#add-new-state");
    let newStateName = document.querySelector("#newStateName");
    let newStateCode = document.querySelector("#newStateCode");
    let newStateCountry = document.querySelector("#newStateCountry");

    if (
      validateInput(newStateName) &&
      validateInput(newStateCode) &&
      validateInput(newStateCountry)
    ) {
      sendNewState();
      form.reset();
    } else {
      alert("All fields are required to submit.");
    }
  });
