class PGCS {
  constructor(adminNumber, status, password) {
    this.adminNumber = adminNumber || "Untitled pGCS";
    this.password = password || "Day/Month/Year";
    this.status = status || "X";
    this.type = "pgcs";
  }

  create() {
    let newColumn = document.createElement("th");
    newColumn.innerText = this.adminNumber;
    newColumn.id = this.adminNumber;
    document.getElementById("pgcsAdminNumber").appendChild(newColumn);

    for (var i = 0; i < pgcsArrayOfVars.length; i++) {
      let newData = document.createElement("td");
      newData.id = `${this.adminNumber} ${pgcsArrayOfVars[i]}`;
      newData.innerText = this[pgcsArrayOfVars[i]];
      newData.className = `pgcsDataCell`;
      console.log(document.getElementById(`pgcs${pgcsArrayOfVars[i]}`));
      document.getElementById(`pgcs${pgcsArrayOfVars[i]}`).appendChild(newData);
    }
    let newMenuItem = document.createElement("a");
    newMenuItem.className = "button";
    newMenuItem.onclick = function () {
      pgcsEdit("edit", true, this.innerText);
    };
    newMenuItem.id = `${this.adminNumber} Menu Item`;
    newMenuItem.textContent = this.adminNumber;
    document.getElementById("pgcsDropDown").appendChild(newMenuItem);
    pgcsList.push(this);
    equipmentList[2].push(this);
  }

  append() {
    let pgcsNo = this.adminNumber;
    for (var i = 0; i < pgcsList.length; i++) {
      if (pgcsList[i].adminNumber === pgcsNo) {
        let oldpgcs = pgcsList[i];
        for (var i = 0; i < pgcsArrayOfVars.length; i++) {
          let updated = this[pgcsArrayOfVars[i]];
          document.getElementById(
            `${pgcsNo} ${pgcsArrayOfVars[i]}`
          ).textContent = `${updated}`;
          pgcsNotes = document.getElementById("pgcsNotes").value;
          oldpgcs[pgcsArrayOfVars[i]] = updated;
          equipmentList[2][i] = updated;
        }
      }
    }
  }

  pgcsRemove() {
    if (document.getElementById(this.adminNumber)) {
      document.getElementById(this.adminNumber).remove();
      for (var i = 0; i < pgcsArrayOfVars.length; i++) {
        document
          .getElementById(`${this.adminNumber} ${pgcsArrayOfVars[i]}`)
          .remove();
      }
      let menuItem = document.getElementById(`${this.adminNumber} Menu Item`);
      menuItem.remove();
      alert(`pgcs ${this.adminNumber} Removed`);
    } else {
      alert(`pgcs ${this.adminNumber} doesnt exist!`);
    }
  }
}
let pgcsArrayOfVars = ["password", "status"];
let pgcsList = [];
let pgcsNotes = "";

function pgcsEdit(buttonId, bool, pgcsNo) {
  // drop down selection -----------------------------------------------------------
  if (buttonId === "edit") {
    let inputTable = document.getElementById("pgcsInputs");
    let pgcsAdminNumber = document.createElement("input");
    pgcsAdminNumber.type = "text";
    pgcsAdminNumber.id = `pgcsAdminNumberInput`;
    // if equipment doesn't exist:
    if (bool === false) {
      pgcsAdminNumber.placeholder = "Admin Number";
      inputTable.appendChild(pgcsAdminNumber);
      for (var i = 0; i < pgcsArrayOfVars.length; i++) {
        let inputBox = document.createElement("input");
        inputBox.id = `pgcs${pgcsArrayOfVars[i]}Input`;
        inputBox.type = "text";
        inputBox.placeholder = pgcsArrayOfVars[i];
        inputTable.appendChild(inputBox);
      }
    } else if ((bool = true)) {
      for (var i = 0; i < pgcsList.length; i++) {
        if (pgcsList[i].adminNumber === pgcsNo) {
          pgcsAdminNumber.value = pgcsNo;
          inputTable.appendChild(pgcsAdminNumber);
          var currentData = pgcsList[i];
          for (var i = 0; i < pgcsArrayOfVars.length; i++) {
            let inputBox = document.createElement("input");
            inputBox.id = `pgcs${pgcsArrayOfVars[i]}Input`;
            inputBox.type = "text";
            inputBox.value = currentData[pgcsArrayOfVars[i]];
            inputTable.appendChild(inputBox);
          }
          break;
        }
      }
    }

    let submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.onclick = function () {
      pgcsEdit("create");
    };
    submitButton.textContent = "Submit";
    inputTable.appendChild(submitButton);
    // submit button -----------------------------------------------------
  } else if (buttonId === "create") {
    let adminNumber = document.getElementById("pgcsAdminNumberInput").value;
    let status = document.getElementById("pgcsstatusInput").value;
    let password = document.getElementById("pgcspasswordInput").value;
    let pgcs = new PGCS(adminNumber, status, password);
    document.getElementById("pgcsInputs").innerHTML = "";
    read(pgcs);
    // Remove button ----------------------------------------------------------
  } else if (buttonId === "remove") {
    let adminNumber = document.getElementById("pgcsRemoveInput");
    for (var i = 0; i < pgcsList.length; i++) {
      if (pgcsList[i].adminNumber === adminNumber.value) {
        let result = confirm(`Remove ${pgcsList[i].adminNumber}?`);
        if (result) {
          pgcsList[i].pgcsRemove();
          pgcsList.splice(i, 1);
        }
      }
    }
  }
}
