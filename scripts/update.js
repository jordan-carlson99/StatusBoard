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
    fieldStr += `<input type="text" name="${key}"placeholder="${key} Current: ${equipment[key]}"></input><br>`;
  });
  document.getElementById("entryForm").innerHTML = fieldStr;
  return fieldStr;
}
