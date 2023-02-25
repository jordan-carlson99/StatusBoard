class Lau {
  constructor(adminNumber, status, launches) {
    this.adminNumber = adminNumber || "Untitled Launcher";
    this.launches = launches || 0;
    this.status = status || "X";
    this.type = "Lau";
  }

  create() {
    let newColumn = document.createElement("th");
    newColumn.innerText = this.adminNumber;
    newColumn.id = this.adminNumber;
    document.getElementById("lauAdminNumber").appendChild(newColumn);

    for (var i = 0; i < lauArrayOfVars.length; i++) {
      let newData = document.createElement("td");
      newData.id = `${this.adminNumber} ${lauArrayOfVars[i]}`;
      newData.innerText = this[lauArrayOfVars[i]];
      newData.className = `lauDataCell`;
      document.getElementById(`lau${lauArrayOfVars[i]}`).appendChild(newData);
    }
    let newMenuItem = document.createElement("a");
    newMenuItem.className = "button";
    newMenuItem.onclick = function () {
      lauEdit("edit", true, this.innerText);
    };
    newMenuItem.id = `${this.adminNumber} Menu Item`;
    newMenuItem.textContent = this.adminNumber;
    document.getElementById("lauDropDown").appendChild(newMenuItem);
    lauList.push(this);
    equipmentList[1].push(this);
  }

  append() {
    let lauNo = this.adminNumber;
    for (var i = 0; i < lauList.length; i++) {
      if (lauList[i].adminNumber === lauNo) {
        let oldLau = lauList[i];
        for (var i = 0; i < lauArrayOfVars.length; i++) {
          let updated = this[lauArrayOfVars[i]];
          document.getElementById(
            `${lauNo} ${lauArrayOfVars[i]}`
          ).textContent = `${updated}`;
          lauNotes = document.getElementById("lauNotes").value;
          oldLau[lauArrayOfVars[i]] = updated;
          equipmentList[1][i] = updated;
        }
      }
    }
  }

  lauRemove() {
    if (document.getElementById(this.adminNumber)) {
      document.getElementById(this.adminNumber).remove();
      for (var i = 0; i < lauArrayOfVars.length; i++) {
        document
          .getElementById(`${this.adminNumber} ${lauArrayOfVars[i]}`)
          .remove();
      }
      alert(`Launcher ${this.adminNumber} Removed`);
    } else {
      alert(`Launcher ${this.adminNumber} doesnt exist!`);
    }
  }
}
let lauArrayOfVars = ["launches", "status"];
let lauList = [];
let lauNotes = "";

function lauEdit(buttonId, bool, lauNo) {
  // drop down selection -----------------------------------------------------------
  if (buttonId === "edit") {
    let inputTable = document.getElementById("lauInputs");
    let lauAdminNumber = document.createElement("input");
    lauAdminNumber.type = "text";
    lauAdminNumber.id = `lauAdminNumberInput`;
    // if equipment doesn't exist:
    if (bool === false) {
      lauAdminNumber.placeholder = "Admin Number";
      inputTable.appendChild(lauAdminNumber);
      for (var i = 0; i < lauArrayOfVars.length; i++) {
        let inputBox = document.createElement("input");
        inputBox.id = `lau${lauArrayOfVars[i]}Input`;
        inputBox.type = "text";
        inputBox.placeholder = lauArrayOfVars[i];
        inputTable.appendChild(inputBox);
      }
    } else if ((bool = true)) {
      for (var i = 0; i < lauList.length; i++) {
        if (lauList[i].adminNumber === lauNo) {
          lauAdminNumber.value = lauNo;
          inputTable.appendChild(lauAdminNumber);
          var currentData = lauList[i];
          for (var i = 0; i < lauArrayOfVars.length; i++) {
            let inputBox = document.createElement("input");
            inputBox.id = `lau${lauArrayOfVars[i]}Input`;
            inputBox.type = "text";
            inputBox.value = currentData[lauArrayOfVars[i]];
            inputTable.appendChild(inputBox);
          }
          break;
        }
      }
    }

    let submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.onclick = function () {
      lauEdit("create");
    };
    submitButton.textContent = "Submit";
    inputTable.appendChild(submitButton);
    // submit button -----------------------------------------------------
  } else if (buttonId === "create") {
    let adminNumber = document.getElementById("lauAdminNumberInput").value;
    let status = document.getElementById("laustatusInput").value;
    let launches = document.getElementById("laulaunchesInput").value;
    const lau = new Lau(adminNumber, status, launches);
    document.getElementById("lauInputs").innerHTML = "";
    read(lau);
    // Remove button ----------------------------------------------------------
  } else if (buttonId === "remove") {
    let adminNumber = document.getElementById("lauRemoveInput");
    for (var i = 0; i < lauList.length; i++) {
      if (lauList[i].adminNumber === adminNumber.value) {
        let result = confirm(`Remove ${lauList[i].adminNumber}?`);
        if (result) {
          lauList[i].lauRemove();
          lauList.splice(i, 1);
        }
      }
    }
  }
}
