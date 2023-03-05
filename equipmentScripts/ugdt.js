class UGDT {
  constructor(adminNumber, status, password) {
    this.adminNumber = adminNumber || "Untitled ugdt";
    this.status = status || "X";
    this.type = "ugdt";
  }

  create() {
    let newColumn = document.createElement("th");
    newColumn.innerText = this.adminNumber;
    newColumn.id = this.adminNumber;
    document.getElementById("ugdtAdminNumber").appendChild(newColumn);

    for (var i = 0; i < ugdtArrayOfVars.length; i++) {
      let newData = document.createElement("td");
      newData.id = `${this.adminNumber} ${ugdtArrayOfVars[i]}`;
      newData.innerText = this[ugdtArrayOfVars[i]];
      newData.className = `ugdtDataCell`;
      console.log(document.getElementById(`ugdt${ugdtArrayOfVars[i]}`));
      document.getElementById(`ugdt${ugdtArrayOfVars[i]}`).appendChild(newData);
    }
    let newMenuItem = document.createElement("a");
    newMenuItem.className = "button";
    newMenuItem.onclick = function () {
      ugdtEdit("edit", true, this.innerText);
    };
    newMenuItem.id = `${this.adminNumber} Menu Item`;
    newMenuItem.textContent = this.adminNumber;
    document.getElementById("ugdtDropDown").appendChild(newMenuItem);
    ugdtList.push(this);
    equipmentList[5].push(this);
  }

  append() {
    let ugdtNo = this.adminNumber;
    for (var i = 0; i < ugdtList.length; i++) {
      if (ugdtList[i].adminNumber === ugdtNo) {
        let oldugdt = ugdtList[i];
        for (var i = 0; i < ugdtArrayOfVars.length; i++) {
          let updated = this[ugdtArrayOfVars[i]];
          document.getElementById(
            `${ugdtNo} ${ugdtArrayOfVars[i]}`
          ).textContent = `${updated}`;
          ugdtNotes = document.getElementById("ugdtNotes").value;
          oldugdt[ugdtArrayOfVars[i]] = updated;
          equipmentList[5][i] = updated;
        }
      }
    }
  }

  ugdtRemove() {
    if (document.getElementById(this.adminNumber)) {
      document.getElementById(this.adminNumber).remove();
      for (var i = 0; i < ugdtArrayOfVars.length; i++) {
        document
          .getElementById(`${this.adminNumber} ${ugdtArrayOfVars[i]}`)
          .remove();
      }
      let menuItem = document.getElementById(`${this.adminNumber} Menu Item`);
      menuItem.remove();
      alert(`ugdt ${this.adminNumber} Removed`);
    } else {
      alert(`ugdt ${this.adminNumber} doesnt exist!`);
    }
  }
}
let ugdtArrayOfVars = ["status"];
let ugdtList = [];
let ugdtNotes = "";

function ugdtEdit(buttonId, bool, ugdtNo) {
  // drop down selection -----------------------------------------------------------
  if (buttonId === "edit") {
    let inputTable = document.getElementById("ugdtInputs");
    let ugdtAdminNumber = document.createElement("input");
    ugdtAdminNumber.type = "text";
    ugdtAdminNumber.id = `ugdtAdminNumberInput`;
    // if equipment doesn't exist:
    if (bool === false) {
      ugdtAdminNumber.placeholder = "Admin Number";
      inputTable.appendChild(ugdtAdminNumber);
      for (var i = 0; i < ugdtArrayOfVars.length; i++) {
        let inputBox = document.createElement("input");
        inputBox.id = `ugdt${ugdtArrayOfVars[i]}Input`;
        inputBox.type = "text";
        inputBox.placeholder = ugdtArrayOfVars[i];
        inputTable.appendChild(inputBox);
      }
    } else if ((bool = true)) {
      for (var i = 0; i < ugdtList.length; i++) {
        if (ugdtList[i].adminNumber === ugdtNo) {
          ugdtAdminNumber.value = ugdtNo;
          inputTable.appendChild(ugdtAdminNumber);
          var currentData = ugdtList[i];
          for (var i = 0; i < ugdtArrayOfVars.length; i++) {
            let inputBox = document.createElement("input");
            inputBox.id = `ugdt${ugdtArrayOfVars[i]}Input`;
            inputBox.type = "text";
            inputBox.value = currentData[ugdtArrayOfVars[i]];
            inputTable.appendChild(inputBox);
          }
          break;
        }
      }
    }

    let submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.onclick = function () {
      ugdtEdit("create");
    };
    submitButton.textContent = "Submit";
    inputTable.appendChild(submitButton);
    // submit button -----------------------------------------------------
  } else if (buttonId === "create") {
    let adminNumber = document.getElementById("ugdtAdminNumberInput").value;
    let status = document.getElementById("ugdtstatusInput").value;
    let ugdt = new UGDT(adminNumber, status);
    document.getElementById("ugdtInputs").innerHTML = "";
    read(ugdt);
    // Remove button ----------------------------------------------------------
  } else if (buttonId === "remove") {
    let adminNumber = document.getElementById("ugdtRemoveInput");
    for (var i = 0; i < ugdtList.length; i++) {
      if (ugdtList[i].adminNumber === adminNumber.value) {
        let result = confirm(`Remove ${ugdtList[i].adminNumber}?`);
        if (result) {
          ugdtList[i].ugdtRemove();
          ugdtList.splice(i, 1);
        }
      }
    }
  }
}
