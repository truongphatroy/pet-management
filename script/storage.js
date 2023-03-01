"use strict";
// ASM2 - Task 2 - Storgae Web
const key = "keyOfStore";
// Data for test
const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "#000",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  bmi: "?",
  date: new Date(),
};

const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "#000",
  breed: "Mixed Breed",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  bmi: "?",
  date: new Date(),
};

// Save to Storage Web
function saveToStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

// Reading data from Storage Web
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// If storage dont have any, save sample data
if (!getFromStorage(key)) {
  //   console.log(!getFromStorage(key));
  saveToStorage(key, [data1, data2]);
}
// console.log(!getFromStorage(key));

const petArr = getFromStorage(key);
