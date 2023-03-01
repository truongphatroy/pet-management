"use strict";

// Key
const breedKey = "breedKey";

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

// Form Input Variable
const breedInput = document.getElementById("input-breed");
const breedTypeInput = document.getElementById("input-type");
const breedSubmitInput = document.getElementById("submit-btn");

// Breed Table Input Variable
const breedTbodyEl = document.getElementById("tbody");

// FUNCTION
// Check input form for OK or not? function
function breedValidateData(data) {
  if (breedInput.value === "") {
    alert("Please input ID!");
    return false;
  } else if (breedTypeInput.value === "Select Type") {
    alert("Please select Type!");
    return false;
  } else return true;
}

// Delete pet function
const deleteBreed = (breedId) => {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breedId == breedArr[i].id) {
        breedArr.splice(i, 1);
        renderBreedTable(breedArr);
      }
    }
  }
  // Save data to Storage Web
  saveToStorage(breedKey, breedArr);
};

// Rending breed table
function renderBreedTable(breedArr) {
  breedTbodyEl.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    console.log(`breedArr[i].id = ${breedArr[i].id}`);

    const row = document.createElement("tr");
    row.innerHTML = `
          <th scope="row">${breedArr[i].id}</th>
          <td>${breedArr[i].breed}</td>
          <td>${breedArr[i].type}</td>
          <td>  
          <button class="btn btn-danger btn-color" onclick="deleteBreed('${breedArr[i].id}')">Delete</button>
          </td>
          `;

    breedTbodyEl.appendChild(row);
  }
  breedId++;
}

// MAIN PROGRAM
let breedId = 0;

// Taking data from Storage Web
if (!getFromStorage(breedKey)) {
  //Gán dữ liệu để test
  console.log("breedId before", breedId);

  saveToStorage(breedKey, [breed1, breed2, breed3, breed4]);
  // breedId = 4;
  console.log("breedId after", breedId);
}
const breedArr = getFromStorage(breedKey);
breedId = breedArr.length;
renderBreedTable(breedArr);
// console.log(`breedId = ${breedId}`);

breedSubmitInput.addEventListener("click", function () {
  const data = {
    id: breedId,
    breed: breedInput.value,
    type: breedTypeInput.value,
  };
  // console.log("data.id = ", data.id);

  const breedValidate = breedValidateData(data);
  if (breedValidate) {
    breedArr.push(data);
    saveToStorage(breedKey, breedArr);
    renderBreedTable(breedArr);
    // clearInput();
  }
  // console.log(breedArr);
});

// console.log(`${breedArr[i].id`);
