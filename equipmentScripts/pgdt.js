class PGDT {
  constructor(adminNumber, status, password) {
    this.adminNumber = adminNumber || "Untitled pgdt";
    this.status = status || "X";
    this.type = "pgdt";
  }

  create() {
    let newColumn = document.createElement("th");
    newColumn.innerText = this.adminNumber;
    newColumn.id = this.adminNumber;
    document.getElementById("pgdtAdminNumber").appendChild(newColumn);

    for (var i = 0; i < pgdtArrayOfVars.length; i++) {
      let newData = document.createElement("td");
      newData.id = `${this.adminNumber} ${pgdtArrayOfVars[i]}`;
      newData.innerText = this[pgdtArrayOfVars[i]];
      newData.className = `pgdtDataCell`;
      console.log(document.getElementById(`pgdt${pgdtArrayOfVars[i]}`));
      document.getElementById(`pgdt${pgdtArrayOfVars[i]}`).appendChild(newData);
    }
    let newMenuItem = document.createElement("a");
    newMenuItem.className = "button";
    newMenuItem.onclick = function () {
      pgdtEdit("edit", true, this.innerText);
    };
    newMenuItem.id = `${this.adminNumber} Menu Item`;
    newMenuItem.textContent = this.adminNumber;
    document.getElementById("pgdtDropDown").appendChild(newMenuItem);
    pgdtList.push(this);
    equipmentList[3].push(this);
  }

  append() {
    let pgdtNo = this.adminNumber;
    for (var i = 0; i < pgdtList.length; i++) {
      if (pgdtList[i].adminNumber === pgdtNo) {
        let oldpgdt = pgdtList[i];
        for (var i = 0; i < pgdtArrayOfVars.length; i++) {
          let updated = this[pgdtArrayOfVars[i]];
          document.getElementById(
            `${pgdtNo} ${pgdtArrayOfVars[i]}`
          ).textContent = `${updated}`;
          pgdtNotes = document.getElementById("pgdtNotes").value;
          oldpgdt[pgdtArrayOfVars[i]] = updated;
          equipmentList[3][i] = updated;
        }
      }
    }
  }

  pgdtRemove() {
    if (document.getElementById(this.adminNumber)) {
      document.getElementById(this.adminNumber).remove();
      for (var i = 0; i < pgdtArrayOfVars.length; i++) {
        document
          .getElementById(`${this.adminNumber} ${pgdtArrayOfVars[i]}`)
          .remove();
      }
      let menuItem = document.getElementById(`${this.adminNumber} Menu Item`);
      menuItem.remove();
      alert(`pgdt ${this.adminNumber} Removed`);
    } else {
      alert(`pgdt ${this.adminNumber} doesnt exist!`);
    }
  }
}
let pgdtArrayOfVars = ["status"];
let pgdtList = [];
let pgdtNotes = "";

function pgdtEdit(buttonId, bool, pgdtNo) {
  // drop down selection -----------------------------------------------------------
  if (buttonId === "edit") {
    let inputTable = document.getElementById("pgdtInputs");
    let pgdtAdminNumber = document.createElement("input");
    pgdtAdminNumber.type = "text";
    pgdtAdminNumber.id = `pgdtAdminNumberInput`;
    // if equipment doesn't exist:
    if (bool === false) {
      pgdtAdminNumber.placeholder = "Admin Number";
      inputTable.appendChild(pgdtAdminNumber);
      for (var i = 0; i < pgdtArrayOfVars.length; i++) {
        let inputBox = document.createElement("input");
        inputBox.id = `pgdt${pgdtArrayOfVars[i]}Input`;
        inputBox.type = "text";
        inputBox.placeholder = pgdtArrayOfVars[i];
        inputTable.appendChild(inputBox);
      }
    } else if ((bool = true)) {
      for (var i = 0; i < pgdtList.length; i++) {
        if (pgdtList[i].adminNumber === pgdtNo) {
          pgdtAdminNumber.value = pgdtNo;
          inputTable.appendChild(pgdtAdminNumber);
          var currentData = pgdtList[i];
          for (var i = 0; i < pgdtArrayOfVars.length; i++) {
            let inputBox = document.createElement("input");
            inputBox.id = `pgdt${pgdtArrayOfVars[i]}Input`;
            inputBox.type = "text";
            inputBox.value = currentData[pgdtArrayOfVars[i]];
            inputTable.appendChild(inputBox);
          }
          break;
        }
      }
    }

    let submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.onclick = function () {
      pgdtEdit("create");
    };
    submitButton.textContent = "Submit";
    inputTable.appendChild(submitButton);
    // submit button -----------------------------------------------------
  } else if (buttonId === "create") {
    let adminNumber = document.getElementById("pgdtAdminNumberInput").value;
    let status = document.getElementById("pgdtstatusInput").value;
    let pgdt = new PGDT(adminNumber, status);
    document.getElementById("pgdtInputs").innerHTML = "";
    read(pgdt);
    // Remove button ----------------------------------------------------------
  } else if (buttonId === "remove") {
    let adminNumber = document.getElementById("pgdtRemoveInput");
    for (var i = 0; i < pgdtList.length; i++) {
      if (pgdtList[i].adminNumber === adminNumber.value) {
        let result = confirm(`Remove ${pgdtList[i].adminNumber}?`);
        if (result) {
          pgdtList[i].pgdtRemove();
          pgdtList.splice(i, 1);
        }
      }
    }
  }
}
