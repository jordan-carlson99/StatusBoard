const databaseServerURL = "http://127.0.0.10:3500";

async function selectOptions() {
  optionStr = "";
  let response = await fetch(`${databaseServerURL}/all`);
  let data = await response.json();
  console.log(data);
  data.forEach((element) => {
    let opt = document.createElement("option");
    opt.innerText = `${element.type} ${element.admin_number}`;
    opt.addEventListener("click", async () => {
      let showMe = await getEquipment(element.equipment_id);
      console.log(showMe);
      console.log(createEntryForm(showMe));
    });
    document.getElementById("equipmentSelect").appendChild(opt);
  });
}

async function getEquipment(equipmentID) {
  let response = await fetch(`${databaseServerURL}/id/${equipmentID}`);
  let data = await response.json();
  return data;
}

function createEntryForm(equipment) {
  fieldStr = "";
  Object.keys(equipment).forEach((key) => {
    fieldStr += `<label for="input-field-${equipment[key]}"> ${key} Current: ${equipment[key]}</label>
    <input type="text" name="${key}" value="${equipment[key]}" placeholder="NULL (this will remove from statusboard completely)"id="input-field-${equipment[key]}"></input><br>`;
  });
  let addColumn = document.createElement("button");
  addColumn.type = "button";
  addColumn.id = "add-column";
  addColumn.innerText = "add new tracked item";
  addColumn.addEventListener("click", (e) => {
    columnAdder(e.target);
  });
  let submit = document.createElement("button");
  submit.type = "button";
  submit.id = "submit";
  submit.innerText = "submit";
  submit.addEventListener("click", (e) => {
    appender(e.target.parentNode);
  });
  document.getElementById("entryForm").innerHTML = fieldStr;
  document.getElementById("entryForm").appendChild(submit);
  document.getElementById("entryForm").appendChild(addColumn);
  return fieldStr;
}

async function appender(form) {
  let formData = new FormData(form);
  if (formData.get("admin_number") == "") {
    alert("admin number cannot be blank!");
    return;
  }
  let data = {};
  for (let [key, value] of formData.entries()) {
    if (value == "") {
      value = null;
    }
    data[key] = value;
  }
  data = JSON.stringify(data);
  fetch(`${databaseServerURL}/appendEquipment`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  // extend the body with admin number so query works all the time
  // console.log(form);
}

async function columnAdder(eventTarget) {
  let form = document.createElement("form");
  form.innerHTML = `<label for ="input-field-new-title">new entry title</label>
  <input type="text" name="title" placeholder="new title name"id="input-field-new-title"></input>
  <label for ="input-field-new-value">new entry value</label>
  <input type="text" name="value" placeholder="new value"id="input-field-new-value"></input>`;
  let submit = document.createElement("button");
  submit.type = "button";
  submit.innerText = "submit";
  submit.id = "new-field-submit";
  submit.addEventListener("click", (e) => {
    addField(e.target.parentNode);
  });
  form.appendChild(submit);
  document.getElementsByClassName("flex")[0].appendChild(form);
}

function addField(form) {
  let formData = new FormData(form);
  let data = {};
  for (let [key, value] of formData.entries()) {
    if (value == "") {
      value = null;
    }
    data[key] = value;
  }
  data = JSON.stringify(data);
  fetch(`${databaseServerURL}/createColumn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
}
