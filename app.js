class AvEditor {
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

        // an array of all column classes and constructor vars to iterate through, eventually normalize all the names to one (ie 25 hours is twentyFive)
        let arrayOfColumnClasses = 
        ['hours','status','25 hours','50 hours','125 hours','250 hours',
        '500 hours','Mini-T up','Mini-T down','Mini-C up','UHF']
        let arrayOfVars = 
        ['hours', 'status', 'twentyFive', 'fifty', 'oneTwentyFive',
        'twoFifty', 'fiveHundred', 'miniTDown', 'miniTUp', 'miniCUp', 'uhf']

        if (!document.getElementById(this.adminNumber)){
            //only create if admin number doesnt exist
            let newItem = document.createElement("th")
            newItem.innerText = this.adminNumber
            newItem.id = this.adminNumber
            document.getElementsByClassName('adminNumber')[0].appendChild(newItem)
            for (var i = 0; i < arrayOfColumnClasses.length; i++) {
                this.createNewRow(arrayOfColumnClasses[i], this.adminNumber, this[arrayOfVars[i]])
            }
        } else if (document.getElementById(this.adminNumber)){
            for (var i = 0; i < arrayOfColumnClasses.length; i++) {
                this.appendExistingRow(arrayOfColumnClasses[i], this.adminNumber, this[arrayOfVars[i]])
            }
        }
    }

    createNewRow (columnClass, adminNumber, newValue) {
        let newObj = document.createElement('td')
        newObj.id = `${adminNumber} ${columnClass}`
        newObj.innerText = newValue
        document.getElementsByClassName(columnClass)[0].appendChild(newObj)
    }
    appendExistingRow (columnClass, adminNumber, newValue) {
        document.getElementById(`${adminNumber} ${columnClass}`).textContent = newValue
    }
    removeAv (adminNumber) {
        for (var i = 0; i < arrayOfColumnClasses.length; i++) {
            if (document.getElementById(`${adminNumber} ${arrayOfColumnClasses[i]}`)) {
                document.getElementById(`${adminNumber} ${arrayOfColumnClasses[i]}`).remove()
            } else {
                alert(`AV ${adminNumber} Removed`)
            }
        }
    }
    // method for editing
    // method for adding hours
}

let avList = []

function avSubmit () {
    let adminNumber = document.getElementById('adminNumber').value
    let status = document.getElementById('status').value
    let hours = document.getElementById('hours').value
    let twentyFiveHours = document.getElementById('25 hours').value
    let fiftyHours = document.getElementById('50 hours').value
    let oneTwentyFiveHours = document.getElementById('125 hours').value
    let twoFiftyHours = document.getElementById('250 hours').value
    let fiveHundredHours = document.getElementById('500 hours').value
    let miniTDown = document.getElementById('Mini-T down').value
    let miniTUp = document.getElementById('Mini-T up').value
    let miniCUp = document.getElementById('Mini-C up').value
    let uhf = document.getElementById('UHF').value
    const AV = new AvEditor (adminNumber, hours, status, twentyFiveHours, fiftyHours, oneTwentyFiveHours, twoFiftyHours, fiveHundredHours,miniTUp, miniTDown, miniCUp, uhf)
    avList.push(AV)
    console.log(avList)
}
