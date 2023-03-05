var intervalId = window.setInterval(function () {
  for (var i = 0; i < equipmentList.length; i++) {
    for (var j = 0; j < equipmentList[i].length; j++) {
      let pieceOfEquipment = equipmentList[i][j];
      if (typeof pieceOfEquipment === "string") {
        break;
      }
      read(pieceOfEquipment);
      writeFileSync("./equipmentList.txt", equipList);
    }
  }
  document.getElementById("update").textContent = `Updated ${Date()}`;
}, 6000);

let equipmentList = [["avs"], ["laus"], ["pgcs"], ["pgdt"], ["ugcs"], ["ugdt"]];

function read(equipment) {
  let adminNo = equipment.adminNumber;
  if (document.getElementById(adminNo)) {
    equipment.append();
  } else {
    equipment.create();
  }
}
