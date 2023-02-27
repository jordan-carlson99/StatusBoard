class AV {
  constructor(
    adminNumber,
    hours,
    status,
    twentyFive,
    fifty,
    oneTwentyFive,
    twoFifty,
    fiveHundred,
    miniTUp,
    miniTDown,
    miniCUp,
    uhf
  ) {
    this.adminNumber = adminNumber || "Untitled AV";
    this.hours = hours || 0;
    this.status = status || "X";
    this.twentyFive = twentyFive || 25;
    this.fifty = fifty || 50;
    this.oneTwentyFive = oneTwentyFive || 125;
    this.twoFifty = twoFifty || 250;
    this.fiveHundred = fiveHundred || 500;
    this.miniTDown = miniTDown || "00.000";
    this.miniTUp = miniTUp || "00.000";
    this.miniCUp = miniCUp || "00.000";
    this.uhf = uhf || "000.0000";
    this.type = "AV";
  }

  create() {
    let newColumn = document.createElement("th");
    newColumn.innerText = this.adminNumber;
    newColumn.id = this.adminNumber;
    document.getElementById("adminNumber").appendChild(newColumn);

    for (var i = 0; i < arrayOfVars.length; i++) {
      let newData = document.createElement("td");
      newData.id = `${this.adminNumber} ${arrayOfVars[i]}`;
      newData.innerText = this[arrayOfVars[i]];
      newData.className = `avDataCell`;
      document.getElementById(arrayOfVars[i]).appendChild(newData);
    }
    let newMenuItem = document.createElement("a");
    newMenuItem.className = "button";
    newMenuItem.onclick = function () {
      avInputMenu(true, this.innerText);
    };
    newMenuItem.id = `${this.adminNumber} Menu Item`;
    newMenuItem.textContent = this.adminNumber;
    document.getElementById("avDropDown").appendChild(newMenuItem);
    avList.push(this);
    equipmentList[0].push(this);
  }

  append() {
    let tailNo = this.adminNumber;
    for (var i = 0; i < avList.length; i++) {
      if (avList[i].adminNumber === tailNo) {
        let oldAv = avList[i];
        for (var i = 0; i < arrayOfVars.length; i++) {
          let updatedVar = this[arrayOfVars[i]];
          document.getElementById(
            `${tailNo} ${arrayOfVars[i]}`
          ).textContent = `${updatedVar}`;
          console.log("getting notes...");
          avNotes = document.getElementById("avNotes").value;
          oldAv[arrayOfVars[i]] = updatedVar;
        }
        for (var j = 0; j < equipmentList[0].length; j++) {
          if (tailNo === equipmentList[0][j]) {
            equipmentList[0].splice(j, 1, oldAv);
          }
        }
      }
    }
  }

  avRemove() {
    if (document.getElementById(this.adminNumber)) {
      document.getElementById(this.adminNumber).remove();
      for (var i = 0; i < arrayOfVars.length; i++) {
        document
          .getElementById(`${this.adminNumber} ${arrayOfVars[i]}`)
          .remove();
      }
      //remove from dropdown
      let menuItem = document.getElementById(`${this.adminNumber} Menu Item`);
      menuItem.remove();
      // remove from equipment list
      for (var i = 0; i < equipmentList[0].length; i++) {
        if (equipmentList[0][i].adminNumber === this.adminNumber) {
          // found the index for given av in list
          equipmentList[0].splice(i, 1);
        }
      }
      alert(`AV ${this.adminNumber} Removed`);
    } else {
      alert(`AV ${this.adminNumber} doesnt exist!`);
    }
  }

  avAddHours() {
    // method for adding total hours so 25,50,125,250,and 500 update
  }
}
let arrayOfVars = [
  "hours",
  "status",
  "twentyFive",
  "fifty",
  "oneTwentyFive",
  "twoFifty",
  "fiveHundred",
  "miniTDown",
  "miniTUp",
  "miniCUp",
  "uhf",
];
let avList = [];
let avNotes = "";

function avCreate() {
  let adminNumber = document.getElementById("adminNumberInput").value;
  let status = document.getElementById("statusInput").value;
  let hours = document.getElementById("hoursInput").value;
  let twentyFive = document.getElementById("twentyFiveInput").value;
  let fifty = document.getElementById("fiftyInput").value;
  let oneTwentyFive = document.getElementById("oneTwentyFiveInput").value;
  let twoFifty = document.getElementById("twoFiftyInput").value;
  let fiveHundred = document.getElementById("fiveHundredInput").value;
  let miniTDown = document.getElementById("miniTDownInput").value;
  let miniTUp = document.getElementById("miniTUpInput").value;
  let miniCUp = document.getElementById("miniCUpInput").value;
  let uhf = document.getElementById("uhfInput").value;
  const av = new AV(
    adminNumber,
    hours,
    status,
    twentyFive,
    fifty,
    oneTwentyFive,
    twoFifty,
    fiveHundred,
    miniTUp,
    miniTDown,
    miniCUp,
    uhf
  );
  document.getElementById("avInputs").innerHTML = "";
  read(av);
}

function avRemove() {
  let adminNumber = document.getElementById("avRemoveInput");
  for (var i = 0; i < avList.length; i++) {
    if (avList[i].adminNumber === adminNumber.value) {
      let result = confirm(`Remove ${avList[i].adminNumber}?`);
      if (result) {
        avList[i].avRemove();
        avList.splice(i, 1);
      }
    }
  }
}

function avInputMenu(bool, tailNo) {
  let inputTable = document.getElementById("avInputs");
  let tailNumber = document.createElement("input");
  tailNumber.type = "text";
  tailNumber.id = `adminNumberInput`;
  if (bool === false) {
    tailNumber.placeholder = "Admin Number";
    inputTable.appendChild(tailNumber);

    for (var i = 0; i < arrayOfVars.length; i++) {
      let inputBox = document.createElement("input");
      inputBox.id = `${arrayOfVars[i]}Input`;
      inputBox.type = "text";
      inputBox.placeholder = arrayOfVars[i];
      inputTable.appendChild(inputBox);
    }
  } else if ((bool = true)) {
    for (var i = 0; i < avList.length; i++) {
      if (avList[i].adminNumber === tailNo) {
        var currentData = avList[i];
        break;
      }
    }
    tailNumber.value = tailNo;
    inputTable.appendChild(tailNumber);
    for (var i = 0; i < arrayOfVars.length; i++) {
      let inputBox = document.createElement("input");
      inputBox.id = `${arrayOfVars[i]}Input`;
      inputBox.type = "text";
      inputBox.value = currentData[arrayOfVars[i]];
      inputTable.appendChild(inputBox);
    }
  }
  let submitButton = document.createElement("button");
  submitButton.type = "button";
  submitButton.onclick = function () {
    avCreate();
  };
  submitButton.textContent = "Submit";
  inputTable.appendChild(submitButton);
}
