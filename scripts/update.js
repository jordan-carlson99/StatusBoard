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
  document.getElementById("submit").addEventListener("submit", async (e) => {
    e.preventDefault();
    appender("insert form data");
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
    fieldStr += `<input type="text" name="${key}"placeholder="${key} Current: ${equipment[key]}"></input><br>`;
  });
  let submit = document.createElement("button");
  submit.type = "button";
  submit.id = "submit";
  submit.innerText = "submit";
  document.getElementById("entryForm").innerHTML = fieldStr;
  document.getElementById("entryForm").appendChild(submit);
  return fieldStr;
}

function appender(t) {
  console.log(t);
}
