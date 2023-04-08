export { equipmentList };
let equipmentList = [];
const databaseServerURL = "http://127.0.0.10:3500";

class equipment {
  constructor(type, adminNumber, hours, status) {
    this.type = type.toUpperCase();
    this.adminNumber = Number.parseInt(adminNumber) || "empty admin number";
    this.hours = Number.parseFloat(hours) || "undefined hours";
    this.status = status.toUpperCase() || "undefined status";
  }
}
// create objects using contructor from equipment and event listeners
// let av;
// let av2 = new equipment("av", 2023, 54.5, "x");
// let lau = new equipment("lau", 2023, 15, "/");
// let x = 1;
// let y = 1;

document.getElementById("maketable").addEventListener("click", async () => {
  // x++;
  // y++;
  // av = new equipment(`test ${y}`, x, 10, "x");
  // av.test = "44";
  // console.log(ifData(av2));
  // console.log(ifData(av));
  // console.log(ifData(lau));
  let response = await fetch(`${databaseServerURL}/AV`);
  let data = await response.json();
  // console.log(data);
  // console.log(ifData(...data));
  data.forEach((elem) => {
    // console.log(elem);
    console.log(ifData(elem));
  });
});

// takes in equipment and finds if its been added to the page, then passes it to the relevant function who will add to equipment list.
function ifData(equipment) {
  if (!document.getElementById(equipment.type)) {
    createData(equipment);
    equipmentList.push(equipment);
    localStorage.setItem("equipmentList", equipmentList);
    return "the equipment type does not exist in the page";
  }
  if (!document.getElementById(`${equipment.admin_number}-data`)) {
    addData(equipment);
    equipmentList.push(equipment);
    localStorage.setItem("equipmentList", equipmentList);
    return "the adminNumber does not exist in the page";
  }

  // find the equipment in the list and update it's keys
  let indexOfEquipment;
  equipmentList.forEach((e, i) => {
    if (e.adminNumber == equipment.admin_number) {
      indexOfEquipment = i;
    }
  });
  equipmentList[indexOfEquipment] = equipment;
  appendData(equipment);
  localStorage.setItem("equipmentList", equipmentList);
  return "the equipment exists on the page";
}

// Create a new table for a new piece of equipment
function createData(equipment) {
  let categories = programmaticCategories(equipment)[0];
  let data = programmaticCategories(equipment)[1];
  let newContainer = document.createElement("div");
  newContainer.id = equipment.type;
  newContainer.innerHTML = `
  <h1 class="title">${equipment.type}</h1>
  <table id="${equipment.type}-equipmentTable">
    <tr id="${equipment.type}-categories">
    ${categories}
  </tr>
  ${data}
    </tr>
  </table>
  `;
  document.getElementById("data").appendChild(newContainer);
  // if there's more than the default keys, add them to the table
  appendNewCategory(equipment);
}

// Add in a new row on a table for a new Admin Number
function addData(equipment) {
  let newRow = document.createElement("tr");
  newRow.id = `${equipment.admin_number}-data`;
  newRow.innerHTML = `
  <td>${equipment.admin_number}</td>
  <td>${equipment.hours}</td>
  <td>${equipment.equipment_status}</td>
  </tr>`;
  document
    .getElementById(`${equipment.type}-equipmentTable`)
    .appendChild(newRow);
  appendNewCategory(equipment);
}

// Adjust the table data to match the current equipmentList data, also updates equipmentList
function appendData(equipment) {
  // check if category is added
  appendNewCategory(equipment);
  // get the current data for equipment
  let currentRow = document
    .getElementById(`${equipment.admin_number}-data`)
    .querySelectorAll("td");
  // get the current catagories for equipment type
  let categories = document
    .getElementById(`${equipment.type}-categories`)
    .querySelectorAll("th");

  // put the categories into a list
  let list = [];
  categories.forEach((category, i) => {
    if (category.innerText == "Admin Number") {
      list.push("adminNumber");
    } else {
      list.push(category.innerText.toLowerCase());
    }
  });

  list.forEach((key, i) => {
    if (currentRow[i]) {
      currentRow[i].innerText = equipment[key];
    } else {
      // add in the td with new data
      let appendedDataCell = document.createElement("td");
      appendedDataCell.innerText = equipment[key];
      document
        .getElementById(`${equipment.admin_number}-data`)
        .appendChild(appendedDataCell);
    }
  });
}

// If a new category is added, create a new header
function appendNewCategory(equipment) {
  // if only default values exist, return
  if (Object.keys(equipment).length <= 4) {
    return;
  }

  // take in the categories node list and convert it to an array for comparing
  let categories = document
    .getElementById(`${equipment.type}-categories`)
    .querySelectorAll("th");
  let categoryList = [];
  for (let i = 0; i < categories.length; i++) {
    categoryList.push(categories[i].innerText);
  }

  // go through the object keys, if header already exists, then only add the data block
  for (let i = 4; i < Object.keys(equipment).length; i++) {
    // console.log(categoryList);
    // check if the header was already created
    if (categoryList.indexOf(Object.keys(equipment)[i]) < 0) {
      //create the header and append it
      let newCategory = document.createElement("th");
      newCategory.innerText = Object.keys(equipment)[i];
      document
        .getElementById(`${equipment.type}-categories`)
        .appendChild(newCategory);
    } else {
      // header exists, does the data exist?
    }

    // add that key to everything on the equipment list then send it to the append data function
  }
  for (let j = 0; j < Object.keys(equipment).length; j++) {
    let currentKey = Object.keys(equipment)[j];
    for (let i = 0; i < equipmentList.length; i++) {
      if (
        equipmentList[i][currentKey] == undefined &&
        equipmentList[i].type == equipment.type
      ) {
        equipmentList[i][currentKey] = "no input";
      }
    }
  }
}

// Ensure the tables reflect the current data in equipmentList
function syncTables(allEquipment) {
  //
  allEquipment.forEach((pieceOfEquipment) => {
    ifData(pieceOfEquipment);
  });
  return "synced all data";
}

/*
callback should take in equipment and pass it to ifData, if that returns false then it creates a new table with the first entry
after that, if ifData returns false the callback should send it to add data which will append a row with the data to the table that was already generated.
*/

/*
card: 
  <h1 class="title">${equipment.type}</h1>
  <table id="${equipment.type}-equipmentTable">
    <tr id="${equipment.type}-categories">
    <th>Admin Number</th>
    <th>Hours</th>
    <th>Status</th>
    </tr>
    <tr id="${equipment.admin_number}-data">
    <td>${equipment.admin_number}</td>
    <td>${equipment.hours}</td>
    <td>${equipment.equipment_status}</td>
    </tr>
  </table>
*/

function programmaticCategories(equipment) {
  // intent: build inner html string based on the key value pairs that are relevant
  // to the equipment
  let columnRow = "";
  let dataRow = "";
  Object.keys(equipment).forEach((key) => {
    if (equipment[key] != undefined) {
      columnRow += `<th>${key}</th>`;
      dataRow += `<td>${equipment[key]}</td>`;
    }
  });
  return [columnRow, dataRow];
}
