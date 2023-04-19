class equipment {
  constructor(type, adminNumber, hours, status) {
    this.type = type.toUpperCase();
    this.adminNumber = Number.parseInt(adminNumber) || "empty admin number";
    this.hours = Number.parseFloat(hours) || "undefined hours";
    this.status = status.toUpperCase() || "undefined status";
  }
}

// document.body.addEventListener("load", onLoad);

document.getElementById("maketable").addEventListener("click", async () => {
  let searchVal = document.getElementById("search-equipment").value;
  let response = await fetch(`${databaseServerURL}/${searchVal}`);
  let data = await response.json();
  document.getElementById("data").innerHTML = "";
  data.forEach((elem) => {
    console.log(ifData(elem));
  });
});

// takes in equipment and finds if its been added to the page, then passes it to the relevant function who will add to equipment list.
function ifData(equipment) {
  if (!document.getElementById(equipment.type)) {
    createData(equipment);
    return "the equipment type does not exist in the page";
  }
  if (!document.getElementById(`${equipment.admin_number}-data`)) {
    addData(equipment);
    return "the adminNumber does not exist in the page";
  }

  // find the equipment in the list and update it's keys
  appendData(equipment);
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
  <tr id="${equipment.admin_number}-data">
  ${data}
    </tr>
  </table>
  `;
  document.getElementById("data").appendChild(newContainer);
  return newContainer;
}

// Add in a new row on a table for a new Admin Number
function addData(equipment) {
  let data = programmaticCategories(equipment)[1];
  let newRow = document.createElement("tr");
  newRow.id = `${equipment.admin_number}-data`;
  newRow.innerHTML = data;
  document
    .getElementById(`${equipment.type}-equipmentTable`)
    .appendChild(newRow);
  return newRow;
}

// Adjust the table data to match the current equipmentList data, also updates equipmentList
function appendData(equipment) {
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

// Ensure the tables reflect the current data in equipmentList
function syncTables(allEquipment) {
  //
  allEquipment.forEach((pieceOfEquipment) => {
    ifData(pieceOfEquipment);
  });
  return "synced all data";
}

function programmaticCategories(equipment) {
  // intent: build inner html string based on the key value pairs that are relevant
  // to the equipment
  let columnRow = "";
  let dataRow = "";
  Object.keys(equipment).forEach((key) => {
    console.log(equipment[key]);
    if (equipment[key] != null) {
      console.log("adding...");
      columnRow += `<th>${key}</th>`;
      dataRow += `<td>${equipment[key]}</td>`;
    } else {
      console.log("is null");
    }
  });
  return [columnRow, dataRow];
}
