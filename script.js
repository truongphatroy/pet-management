"use strict";

let healthyCheck = false;

// Form Input Variable
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const NavSidebar = document.getElementById("sidebar");
const NavLink = document.querySelector(".components");

// Submit, delete and healthy button Variable
const submitBtn = document.getElementById("submit-btn");
const deleteBtn = document.querySelector(".btn btn-danger");
const healthyBtn = document.getElementById("healthy-btn");

// Table Input Variable
const tbodyEl = document.getElementById("tbody");

// Check input form for OK or not? function
function validateData(data) {
  let i = 0;
  while (i < petArr.length) {
    if (data.id === petArr[i].id) {
      alert("ID must unique!");
      return false;
    }
    i++;
  }
  if (idInput.value === "") {
    alert("Please input ID!");
    return false;
  } else if (ageInput.value < 1 || ageInput.value > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  } else if (typeInput.value === "Select Type") {
    alert("Please select Type!");
    return false;
  } else if (weightInput.value < 1 || weightInput.value > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  } else if (lengthInput.value < 1 || lengthInput.value > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  } else if (breedInput.value === "Select Breed") {
    alert("Please select Breed!");
    return false;
    // if all the condition is OK then return true.
  } else return true;
}

// changEvent function
const breedKey = "breedKey";
const breedArr = getFromStorage(breedKey);
// const NewBreedArr = [1, 2];

typeInput.setAttribute("onchange", "changEvent()");
function changEvent() {
  const NewBreedArr = breedArr.filter((e) => {
    return e.type == typeInput.value;
  });
  renderBreed(NewBreedArr);
}
function renderBreed(NewBreedArr) {
  breedInput.innerHTML = "<option>Select Breed</option>";
  for (let i = 0; i < NewBreedArr.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `
    ${NewBreedArr[i].breed}
    `;
    breedInput.appendChild(option);
  }
  // console.log("new", NewBreedArr);
  // console.log("old", breedArr);
}

// Render table function
function renderTable(petArr) {
  tbodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${petArr[i].id}</th>
      <td>${petArr[i].name}</td>
      <td>${petArr[i].age}</td>
      <td>${petArr[i].type}</td>
      <td>${petArr[i].weight}</td>
      <td>${petArr[i].length}</td>
      <td>${petArr[i].breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
      </td>
      <td><i class="bi ${
        petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>

      <td>${new Date(petArr[i].date).getDate()}/${
      new Date(petArr[i].date).getMonth() + 1
    }/${new Date(petArr[i].date).getFullYear()}</td>
    <td>
    <button class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button>
    </td>
      `;

    tbodyEl.appendChild(row);
  }
}

// Clear input form
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// Delete pet function
const deletePet = (petId) => {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        renderTable(petArr);
      }
    }
  }
  // Save data to Storage Web
  saveToStorage(key, petArr);
};
// Task 1 - Submit input data

// First all read data from Storage Web
renderTable(petArr);

submitBtn.addEventListener("click", function () {
  // Task 2 -take data from Input
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,

    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };
  console.log(data);

  const validate = validateData(data); /* Task 3 - Validate data */
  // console.log("validate =", validate);
  if (validate) {
    petArr.push(data); /* Task 4 - Add pet into list */
    renderTable(petArr); /* Task 5 - Show pet in table */
    saveToStorage(key, petArr);
    clearInput(); /* Task 6 - clear data in Input form */
  }
  // console.log(petArr);
});

// Task 8 - Show healthy list
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === false) {
    // use for loop
    /*     for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    } */

    // use filter function
    const healthyPetArr = petArr.filter(function (petElement) {
      return (
        petElement.vaccinated && petElement.dewormed && petElement.sterilized
      );
    });
    renderTable(healthyPetArr);
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = true;
  } else {
    renderTable(petArr);
    healthyBtn.textContent = "Show healthy Pet";
    healthyCheck = false;
  }
});

// ASM2 Task
// Task 1 - Add animation for sidebar

NavSidebar.addEventListener("click", function (e) {
  NavSidebar.classList.toggle("active");
});

NavLink.addEventListener("click", function (e) {
  e.stopPropagation();
});
