class AV {
    constructor (adminNumber, hours, status, twentyFive, fifty, oneTwentyFive, twoFifty, fiveHundred, miniTUp, miniTDown, miniCUp, uhf, notes) {
        this.adminNumber = adminNumber || null
        this.hours = hours || 0
        this.status = status || 'X'
        this.twentyFive = twentyFive || 25
        this.fifty = fifty || 50
        this.oneTwentyFive = oneTwentyFive || 125
        this.twoFifty = twoFifty || 250
        this.fiveHundred = fiveHundred || 500
        this.miniTDown = miniTDown || '00.000'
        this.miniTUp = miniTUp || '00.000'
        this. miniCUp = miniCUp || '00.000'
        this.uhf = uhf || '000.0000'
        this.notes = notes || ''
    }

    read () {
        let adminNo = this.adminNumber 
        if (document.getElementById(adminNo)) {
            this.append()
        } else {
            this.create()
        }
    }

    create () {
        // create new row with tailnumber
        let newColumn = document.createElement('th');
        newColumn.innerText = this.adminNumber;
        newColumn.id = this.adminNumber;
        document.getElementById('adminNumber').appendChild(newColumn);
        for (var i = 0; i < arrayOfVars.length; i++) {
            let newData = document.createElement('td');
            newData.id = `${this.adminNumber} ${arrayOfVars[i]}`;
            newData.innerText = this[arrayOfVars[i]];
            document.getElementById(arrayOfVars[i]).appendChild(newData);
        }
    }

    append() {
        for (var i = 0; i < arrayOfVars.length; i++) {
            document.getElementById(`${this.adminNumber} ${arrayOfVars[i]}`).textContent = `${this[arrayOfVars[i]]}`
            // remove old objects from av list
        }
    }

    avRemove () {
        if (document.getElementById(this.adminNumber)) {
            document.getElementById(this.adminNumber).remove()
            for (var i = 0; i < arrayOfVars.length; i++) {
                document.getElementById(`${this.adminNumber} ${arrayOfVars[i]}`).remove()
            }
            alert(`AV ${this.adminNumber} Removed`)
        } else {
            alert(`AV ${this.adminNumber} doesnt exist!`)
        }
    }

    avEdit () {
        //method to edit values using html dropdown bar
    }

    avAddHours () {
        // method for adding total hours so 25,50,125,250,and 500 update
    }
}

let arrayOfVars = ['hours', 'status', 'twentyFive', 'fifty', 'oneTwentyFive',
'twoFifty', 'fiveHundred', 'miniTDown', 'miniTUp', 'miniCUp', 'uhf']

let avList = []

function avSubmit () {
    let adminNumber = document.getElementById('adminNumberInput').value
    let status = document.getElementById('statusInput').value
    let hours = document.getElementById('hoursInput').value
    let twentyFive = document.getElementById('twentyFiveInput').value
    let fifty = document.getElementById('fiftyInput').value
    let oneTwentyFive = document.getElementById('oneTwentyFiveInput').value
    let twoFifty = document.getElementById('twoFiftyInput').value
    let fiveHundred = document.getElementById('fiveHundredInput').value
    let miniTDown = document.getElementById('miniTDownInput').value
    let miniTUp = document.getElementById('miniTUpInput').value
    let miniCUp = document.getElementById('miniCUpInput').value
    let uhf = document.getElementById('uhfInput').value
    let notes = document.getElementById('avNotes').value
    const av = new AV (adminNumber, hours, status, twentyFive, fifty, oneTwentyFive, twoFifty, fiveHundred,miniTUp, miniTDown, miniCUp, uhf, notes)
    av.read()
    avList.push(av)
    console.log(avList)
}

function removeAv () {
    let adminNumber = document.getElementById('adminNumberInput')
    for (var i = 0; i < avList.length; i++) {
        if (avList[i].adminNumber === adminNumber.value) {
            let result = confirm(`Remove ${avList[i].adminNumber}?`)
            if (result) {
                avList[i].avRemove()
                avList.splice(i,1)
            }
        }
    }
}

var intervalId = window.setInterval(function(){
    for(var i = 0; i < avList.length; i++) {
        avList[i].read()
        document.getElementById('update').textContent = `Updated ${Date()}`
    }
  }, 60000);