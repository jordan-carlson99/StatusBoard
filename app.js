class AV {
    constructor (adminNumber, hours, status, twentyFive, fifty, oneTwentyFive, twoFifty, fiveHundred, miniTUp, miniTDown, miniCUp, uhf) {
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
    }

    read () {
        let adminNo = this.adminNumber 
        if (document.getElementById(adminNo)) {
            // send given object (arrayOfObj[i] to append to check if any data changed
            this.append()
        } else {
            this.create()
            // send to create to make new table columns
        }
    }

    create () {
        // create new row with tailnumber
        let newColumn = document.createElement("th")
        newColumn.innerText = this.adminNumber
        newColumn.id = this.adminNumber
        document.getElementById('adminNumber').appendChild(newColumn)

        // add in each piece of data
        for (var i = 0; i < arrayOfVars.length; i++) {
            let newData = document.createElement('td')
            newData.id = `${this.adminNumber} ${arrayOfVars[i]}`
            newData.innerText = this[arrayOfVars[i]]
            document.getElementById(arrayOfVars[i]) = newData
        }
    }

    append() {
        for (var i = 0; i < arrayOfVars.length; i++) {
            document.getElementById(`${this.adminNumber} ${arrayOfVars[i]}`).textContent = `${this[arrayOfVars[i]]} ${arrayOfVars[i]}`
        }
    }

    // removeAv (adminNumber) {
    //     for (var i = 0; i < arrayOfColumnClasses.length; i++) {
    //         if (document.getElementById(`${adminNumber} ${arrayOfVars[i]}`)) {
    //             document.getElementById(`${adminNumber} ${arrayOfVars[i]}`).remove()
    //         } else {
    //             alert(`AV ${adminNumber} Removed`)
    //         }
    //     }
    // }
    // method for editing
    // method for adding hours
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
    const av = new AV (adminNumber, hours, status, twentyFive, fifty, oneTwentyFive, twoFifty, fiveHundred,miniTUp, miniTDown, miniCUp, uhf)
    av.read()
    avList.push(av)
    console.log(avList)
}

