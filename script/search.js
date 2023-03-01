"use strict";

// Key variable for Storage Web
const searchKey = "keyOfStore";
const breedSearchKey = "breedKey";

//1 - Load data from Storage Web
let searchArr = getFromStorage("keyOfStore");
let breedSearchArr = getFromStorage(breedSearchKey);
const SearchTbodyEl = document.getElementById("tbody");

const typeSearchInput = document.getElementById("input-type");
const idSearchInput = document.getElementById("input-id");
const nameSearchInput = document.getElementById("input-name");
const breedSearchInput = document.getElementById("input-breed");
const vaccinatedSearchInput = document.getElementById("input-vaccinated");
const dewormedSearchInput = document.getElementById("input-dewormed");
const sterilizedSearchInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");

/////////////////////////////FUNCTION////////////////////////////////
// Return a array acording to value of Type input
function changEvent() {
  const newbreedSearchArr = breedSearchArr.filter((e) => {
    return e.type == typeSearchInput.value;
  });
  renderBreed(newbreedSearchArr);
  //   console.log("typeSearchInput.value", typeSearchInput.value);
}

// Show new breed array into Search window
function renderBreed(newSearchArr) {
  document.getElementById("input-breed").innerHTML =
    "<option>Select Breed</option>";
  for (let i = 0; i < newSearchArr.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `
      ${newSearchArr[i].breed}
      `;
    breedSearchInput.appendChild(option);
  }
}

// Render table function - Auto run when click on Edit button
function searchRenderTable(editArr) {
  SearchTbodyEl.innerHTML = "";
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
          `;

    SearchTbodyEl.appendChild(row);
  }
}

// Find conditon Function
function searchPet() {
  // Check input conditon and filtering for finding
  if (idSearchInput.value) {
    searchArr = searchArr.filter((e) => e.id.includes(idSearchInput.value));
  }
  if (nameSearchInput.value) {
    searchArr = searchArr.filter((e) => e.name.includes(nameSearchInput.value));
  }
  if (typeSearchInput.value !== "Select Type") {
    searchArr = searchArr.filter((e) => e.type === typeSearchInput.value);
  }

  if (breedSearchInput.value !== "Select Breed") {
    searchArr = searchArr.filter((e) => e.breed === breedSearchInput.value);
  }
  if (vaccinatedSearchInput.checked === true)
    searchArr = searchArr.filter(
      (e) => e.vaccinated === vaccinatedSearchInput.checked
    );
  if (dewormedSearchInput.checked === true)
    searchArr = searchArr.filter(
      (e) => e.dewormed === dewormedSearchInput.checked
    );
  if (sterilizedSearchInput.checked === true)
    searchArr = searchArr.filter(
      (e) => e.sterilized === sterilizedSearchInput.checked
    );
}

/////////////////////////////MAIN PROGRAM///////////////////////////
// Show table
searchRenderTable(searchArr);
// Update change event of type breed
changEvent();
// Set onchage for Input Type
document.getElementById("input-type").setAttribute("onchange", "changEvent()");

// Event Find button //
findBtn.addEventListener("click", function () {
  // Load Pet array from Stogare Web
  searchArr = getFromStorage("keyOfStore");
  // Search pet acording to condition
  searchPet();
  // Show result
  searchRenderTable(searchArr);
});
