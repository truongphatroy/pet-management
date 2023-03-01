"use strict";

// Key variable for Storage Web
const editKey = "keyOfStore";
const breedEditKey = "breedKey";

let editArr = getFromStorage("keyOfStore");
let editObject = {};
const breedEditArr = getFromStorage(breedEditKey);

// Form Input Variable
const containerForm = document.getElementById("container-form");
const editTbodyEl = document.getElementById("tbody");

const idEditInput = document.getElementById("input-id");
const nameEditInput = document.getElementById("input-name");
const ageEditInput = document.getElementById("input-age");
const typeEditInput = document.getElementById("input-type");
const weightEditInput = document.getElementById("input-weight");
const lengthEditInput = document.getElementById("input-length");
const colorEditInput = document.getElementById("input-color-1");
const breedEditInput = document.getElementById("input-breed");
const vaccinatedEditInput = document.getElementById("input-vaccinated");
const dewormedEditInput = document.getElementById("input-dewormed");
const sterilizedEditInput = document.getElementById("input-sterilized");

const submitEditBtn = document.getElementById("submit-btn");

// Sample data
const breed1 = {
  id: "1",
  breed: "Mixed Breed",
  type: "Dog",
};
const breed2 = {
  id: "2",
  breed: "Tabby",
  type: "Cat",
};
const breed3 = {
  id: "3",
  breed: "Chó Nhật",
  type: "Dog",
};
const breed4 = {
  id: "4",
  breed: "Mèo Mun",
  type: "Cat",
};

// FUNCTION
// Render table function - Auto run when click on Edit button
function editRenderTable(editArr) {
  editTbodyEl.innerHTML = "";
  for (let i = 0; i < editArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <th scope="row">${editArr[i].id}</th>
        <td>${editArr[i].name}</td>
        <td>${editArr[i].age}</td>
        <td>${editArr[i].type}</td>
        <td>${editArr[i].weight}</td>
        <td>${editArr[i].length}</td>
        <td>${editArr[i].breed}</td>
        <td>
          <i class="bi bi-square-fill" style="color: ${editArr[i].color}"></i>
        </td>
        <td><i class="bi ${
          editArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
        }"></i></td>
        <td><i class="bi ${
          editArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
        }"></i></td>
        <td><i class="bi ${
          editArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
        }"></i></td>
  
        <td>${new Date(editArr[i].date).getDate()}/${
      new Date(editArr[i].date).getMonth() + 1
    }/${new Date(editArr[i].date).getFullYear()}</td>
      <td>
      <button class="btn btn-warning" onclick="editPet('${
        editArr[i].id
      }')">Edit</button>
      </td>
        `;

    editTbodyEl.appendChild(row);
  }
}
// Edit pet function
function editPet(editPetId) {
  if (confirm("Are you sure?")) {
    editArr = getFromStorage("keyOfStore");
    for (let i = 0; i < editArr.length; i++) {
      if (editPetId === editArr[i].id) {
        editObject = editArr[i];
        rendEditForm(editObject);
      }
    }
  }
}

// Rending Edit pet function
function rendEditForm(editObject) {
  nameEditInput.value = editObject.name;
  ageEditInput.value = editObject.age;
  typeEditInput.value = editObject.type;
  weightEditInput.value = editObject.weight;
  lengthEditInput.value = editObject.length;
  colorEditInput.value = editObject.color;
  vaccinatedEditInput.checked = editObject.vaccinated;
  dewormedEditInput.checked = editObject.dewormed;
  sterilizedEditInput.checked = editObject.sterilized;

  changEvent();
  breedEditInput.value = editObject.breed;

  containerForm.classList.remove("hide");
}

// Check Edit form for OK or not? function
function validateEdit(data) {
  if (ageEditInput.value < 1 || ageEditInput.value > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  } else if (typeEditInput.value === "Select Type") {
    alert("Please select Type!");
    return false;
  } else if (weightEditInput.value < 1 || weightEditInput.value > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  } else if (lengthEditInput.value < 1 || lengthEditInput.value > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  } else if (breedEditInput.value === "Select Breed") {
    alert("Please select Breed!");
    return false;
    // if all the condition is OK then return true.
  } else return true;
}

// Return a array acording to value of Type input
function changEvent() {
  const NewbreedEditArr = breedEditArr.filter((e) => {
    return e.type == typeEditInput.value;
  });
  renderBreed(NewbreedEditArr);
}

// Show new breed array into edit window
function renderBreed(NewbreedEditArr) {
  breedEditInput.innerHTML = "<option>Select Breed</option>";
  for (let i = 0; i < NewbreedEditArr.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `
    ${NewbreedEditArr[i].breed}
    `;
    breedEditInput.appendChild(option);
  }
}

/////////////////////// MAIN EDIT PROGRAM///////////////////////////
typeEditInput.setAttribute("onchange", "changEvent()");

if (!getFromStorage(breedEditKey)) {
  saveToStorage(breedEditKey, [breed1, breed2, breed3, breed4]);
}

editRenderTable(editArr);

// Submit event
submitEditBtn.addEventListener("click", function () {
  // Task:take data from Input
  const data = {
    id: editObject.id,
    name: nameEditInput.value,
    age: parseInt(ageEditInput.value),
    type: typeEditInput.value,

    weight: parseInt(weightEditInput.value),
    length: parseInt(lengthEditInput.value),
    color: colorEditInput.value,
    breed: breedEditInput.value,
    vaccinated: vaccinatedEditInput.checked,
    dewormed: dewormedEditInput.checked,
    sterilized: sterilizedEditInput.checked,
    date: new Date(),
  };

  const validate = validateEdit(data); /* Task:Validate data */
  if (validate) {
    for (let i = 0; i < editArr.length; i++) {
      if (editArr[i].id === data.id) editArr[i] = data;
    }
    containerForm.classList.add("hide");
    editRenderTable(editArr); /* Task: Show pet in table */
    saveToStorage(editKey, editArr); /* Save data */
  }
});
