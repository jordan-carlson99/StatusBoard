class UGCS {
  constructor(adminNumber, status, password) {
    this.adminNumber = adminNumber || "Untitled UGCS";
    this.password = password || "Day/Month/Year";
    this.status = status || "X";
    this.type = "ugcs";
  }

  create() {
    let newColumn = document.createElement("th");
    newColumn.innerText = this.adminNumber;
    newColumn.id = this.adminNumber;
    document.getElementById("ugcsAdminNumber").appendChild(newColumn);

    for (var i = 0; i < ugcsArrayOfVars.length; i++) {
      let newData = document.createElement("td");
      newData.id = `${this.adminNumber} ${ugcsArrayOfVars[i]}`;
      newData.innerText = this[ugcsArrayOfVars[i]];
      newData.className = `ugcsDataCell`;
      console.log(document.getElementById(`ugcs${ugcsArrayOfVars[i]}`));
      document.getElementById(`ugcs${ugcsArrayOfVars[i]}`).appendChild(newData);
    }
    let newMenuItem = document.createElement("a");
    newMenuItem.className = "button";
    newMenuItem.onclick = function () {
      ugcsEdit("edit", true, this.innerText);
    };
    newMenuItem.id = `${this.adminNumber} Menu Item`;
    newMenuItem.textContent = this.adminNumber;
    document.getElementById("ugcsDropDown").appendChild(newMenuItem);
    ugcsList.push(this);
    equipmentList[1].push(this);
  }

  append() {
    let ugcsNo = this.adminNumber;
    for (var i = 0; i < ugcsList.length; i++) {
      if (ugcsList[i].adminNumber === ugcsNo) {
        let oldugcs = ugcsList[i];
        for (var i = 0; i < ugcsArrayOfVars.length; i++) {
          let updated = this[ugcsArrayOfVars[i]];
          document.getElementById(
            `${ugcsNo} ${ugcsArrayOfVars[i]}`
          ).textContent = `${updated}`;
          ugcsNotes = document.getElementById("ugcsNotes").value;
          oldugcs[ugcsArrayOfVars[i]] = updated;
          equipmentList[1][i] = updated;
        }
      }
    }
  }

  ugcsRemove() {
    if (document.getElementById(this.adminNumber)) {
      document.getElementById(this.adminNumber).remove();
      for (var i = 0; i < ugcsArrayOfVars.length; i++) {
        document
          .getElementById(`${this.adminNumber} ${ugcsArrayOfVars[i]}`)
          .remove();
      }
      let menuItem = document.getElementById(`${this.adminNumber} Menu Item`);
      menuItem.remove();
      alert(`ugcs ${this.adminNumber} Removed`);
    } else {
      alert(`ugcs ${this.adminNumber} doesnt exist!`);
    }
  }
}
let ugcsArrayOfVars = ["password", "status"];
let ugcsList = [];
let ugcsNotes = "";

function ugcsEdit(buttonId, bool, ugcsNo) {
  // drop down selection -----------------------------------------------------------
  if (buttonId === "edit") {
    let inputTable = document.getElementById("ugcsInputs");
    let ugcsAdminNumber = document.createElement("input");
    ugcsAdminNumber.type = "text";
    ugcsAdminNumber.id = `ugcsAdminNumberInput`;
    // if equipment doesn't exist:
    if (bool === false) {
      ugcsAdminNumber.placeholder = "Admin Number";
      inputTable.appendChild(ugcsAdminNumber);
      for (var i = 0; i < ugcsArrayOfVars.length; i++) {
        let inputBox = document.createElement("input");
        inputBox.id = `ugcs${ugcsArrayOfVars[i]}Input`;
        inputBox.type = "text";
        inputBox.placeholder = ugcsArrayOfVars[i];
        inputTable.appendChild(inputBox);
      }
    } else if ((bool = true)) {
      for (var i = 0; i < ugcsList.length; i++) {
        if (ugcsList[i].adminNumber === ugcsNo) {
          ugcsAdminNumber.value = ugcsNo;
          inputTable.appendChild(ugcsAdminNumber);
          var currentData = ugcsList[i];
          for (var i = 0; i < ugcsArrayOfVars.length; i++) {
            let inputBox = document.createElement("input");
            inputBox.id = `ugcs${ugcsArrayOfVars[i]}Input`;
            inputBox.type = "text";
            inputBox.value = currentData[ugcsArrayOfVars[i]];
            inputTable.appendChild(inputBox);
          }
          break;
        }
      }
    }

    let submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.onclick = function () {
      ugcsEdit("create");
    };
    submitButton.textContent = "Submit";
    inputTable.appendChild(submitButton);
    // submit button -----------------------------------------------------
  } else if (buttonId === "create") {
    let adminNumber = document.getElementById("ugcsAdminNumberInput").value;
    let status = document.getElementById("ugcsstatusInput").value;
    let password = document.getElementById("ugcspasswordInput").value;
    let ugcs = new UGCS(adminNumber, status, password);
    document.getElementById("ugcsInputs").innerHTML = "";
    read(ugcs);
    // Remove button ----------------------------------------------------------
  } else if (buttonId === "remove") {
    let adminNumber = document.getElementById("ugcsRemoveInput");
    for (var i = 0; i < ugcsList.length; i++) {
      if (ugcsList[i].adminNumber === adminNumber.value) {
        let result = confirm(`Remove ${ugcsList[i].adminNumber}?`);
        if (result) {
          ugcsList[i].ugcsRemove();
          ugcsList.splice(i, 1);
        }
      }
    }
  }
}
