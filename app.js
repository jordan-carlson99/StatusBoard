var intervalId = window.setInterval(function(){
    for(var i = 0; i < avList.length; i++) {
        avList[i].read()
        document.getElementById('update').textContent = `Updated ${Date()}`
    }
}, 60000);

class AV {
    constructor (adminNumber, hours, status, twentyFive, fifty, oneTwentyFive, twoFifty, fiveHundred, miniTUp, miniTDown, miniCUp, uhf, notes) {
        this.adminNumber = adminNumber ||  'Untitled AV'
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
        this.type = 'AV'
    }

    read () {
        let adminNo = this.adminNumber 
        if (document.getElementById)
        if (document.getElementById(adminNo)) {
            this.append(avList)
        } else {
            this.create(avList)
        }
    }

    create () {
        let newColumn = document.createElement('th');
        newColumn.innerText = this.adminNumber;
        newColumn.id = this.adminNumber;
        document.getElementById('adminNumber').appendChild(newColumn);

        for (var i = 0; i < arrayOfVars.length; i++) {
            let newData = document.createElement('td');
            newData.id = `${this.adminNumber} ${arrayOfVars[i]}`;
            newData.innerText = this[arrayOfVars[i]];
            newData.className = `avDataCell`
            document.getElementById(arrayOfVars[i]).appendChild(newData);
        }
        let newMenuItem = document.createElement('a')
        newMenuItem.className = 'button'
        newMenuItem.onclick = function () {inputMenu(true, this.innerText)}
        newMenuItem.id = `${this.adminNumber} Menu Item`
        newMenuItem.textContent = this.adminNumber
        document.getElementById('avDropDown').appendChild(newMenuItem)
        avList.push(this)
    }

    append() {
        let tailNo = this.adminNumber
        for(var i = 0; i < avList.length; i++) {
            if (avList[i].adminNumber === tailNo) {
                let oldAv = avList[i]
                for (var i = 0; i < arrayOfVars.length; i++) {
                    let updated = this[arrayOfVars[i]]
                    document.getElementById(`${tailNo} ${arrayOfVars[i]}`).textContent = `${updated}`
                    oldAv[arrayOfVars[i]] = updated
                }
            }
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

    avAddHours () {
        // method for adding total hours so 25,50,125,250,and 500 update
    }
}
let arrayOfVars = ['hours', 'status', 'twentyFive', 'fifty', 'oneTwentyFive',
'twoFifty', 'fiveHundred', 'miniTDown', 'miniTUp', 'miniCUp', 'uhf']
let avList = []

function avCreate () {
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
    document.getElementById('avInputs').innerHTML = ''
    av.read(avList)
}

function avRemove () {
    let adminNumber = document.getElementById('avRemoveInput')
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

function avInputMenu(bool, tailNo) {
    let inputTable = document.getElementById('avInputs')
    let tailNumber = document.createElement('input')
    tailNumber.type = 'text'
    tailNumber.id = `adminNumberInput`
    if (bool === false) {
        tailNumber.placeholder = 'Admin Number'
        inputTable.appendChild(tailNumber)

        for (var i = 0; i < arrayOfVars.length; i++) {
            let inputBox = document.createElement('input')
            inputBox.id = `${arrayOfVars[i]}Input`
            inputBox.type = 'text'
            inputBox.placeholder = arrayOfVars[i]
            inputTable.appendChild(inputBox)
        }
    } else if(bool = true){
        for (var i = 0; i < avList.length; i++) {
            if (avList[i].adminNumber === tailNo) {
                var currentData = avList[i]
                break
            }
        }
        tailNumber.value = tailNo
        inputTable.appendChild(tailNumber)
        for (var i = 0; i < arrayOfVars.length; i++) {
            let inputBox = document.createElement('input')
            inputBox.id = `${arrayOfVars[i]}Input`
            inputBox.type = 'text'
            inputBox.value = currentData[arrayOfVars[i]]
            inputTable.appendChild(inputBox)
        }
    }
    let submitButton = document.createElement('button')
    submitButton.type = 'button'
    submitButton.onclick = function() {avCreate()}
    submitButton.textContent = 'Submit'
    inputTable.appendChild(submitButton)
}

// LAU -------------------------------------------------------------------------------------------------------------------------------

class Lau {
    constructor (adminNumber, status, launches, notes) {
        this.adminNumber = adminNumber ||  'Untitled Launcher'
        this.launches = launches || 0
        this.status = status || 'X'
        this.notes = notes || ''
        this.type = 'Lau'
    }

    lauRead () {
        let adminNo = this.adminNumber 
        if (document.getElementById)
        if (document.getElementById(adminNo)) {
            this.lauAppend()
        } else {
            this.lauCreate()
        }
    }

    lauCreate () {
        let newColumn = document.createElement('th');
        newColumn.innerText = this.adminNumber;
        newColumn.id = this.adminNumber;
        document.getElementById('lauAdminNumber').appendChild(newColumn);

        for (var i = 0; i < lauArrayOfVars.length; i++) {
            let newData = document.createElement('td');
            newData.id = `${this.adminNumber} ${lauArrayOfVars[i]}`;
            newData.innerText = this[lauArrayOfVars[i]];
            newData.className = `lauDataCell`
            document.getElementById(`lau${lauArrayOfVars[i]}`).appendChild(newData);
        }
        let newMenuItem = document.createElement('a')
        newMenuItem.className = 'button'
        newMenuItem.onclick = function () {inputMenu(true, this.innerText)}
        newMenuItem.id = `${this.adminNumber} Menu Item`
        newMenuItem.textContent = this.adminNumber
        document.getElementById('lauDropDown').appendChild(newMenuItem)
        lauList.push(this)
    }

    lauAppend() {
        let lauNo = this.adminNumber
        for(var i = 0; i < lauList.length; i++) {
            if (lauList[i].adminNumber === lauNo) {
                let oldLau = lauList[i]
                for (var i = 0; i < arrayOfVars.length; i++) {
                    let updated = this[lauArrayOfVars[i]]
                    document.getElementById(`${lauNo} ${lauArrayOfVars[i]}`).textContent = `${updated}`
                    oldLau[lauArrayOfVars[i]] = updated
                }
            }
        }
    }

    lauRemove () {
        if (document.getElementById(this.adminNumber)) {
            document.getElementById(this.adminNumber).remove()
            for (var i = 0; i < lauArrayOfVars.length; i++) {
                document.getElementById(`${this.adminNumber} ${lauArrayOfVars[i]}`).remove()
            }
            alert(`Launcher ${this.adminNumber} Removed`)
        } else {
            alert(`Launcher ${this.adminNumber} doesnt exist!`)
        }
    }
}
let lauArrayOfVars = ['launches', 'status']
let lauList = []

function lauCreate () {
    let adminNumber = document.getElementById('lauAdminNumberInput').value 
    let status = document.getElementById('laustatusInput').value
    let launches = document.getElementById('laulaunchesInput').value
    let notes = document.getElementById('lauNotes').value
    const lau = new Lau (adminNumber, status, launches, notes)
    document.getElementById('lauInputs').innerHTML = ''
    lau.lauRead()
}

function lauInputMenu(bool, lauNo) {
    let inputTable = document.getElementById('lauInputs')
    let tailNumber = document.createElement('input')
    tailNumber.type = 'text'
    tailNumber.id = `lauAdminNumberInput`
    if (bool === false) {
        tailNumber.placeholder = 'Admin Number'
        inputTable.appendChild(tailNumber)

        for (var i = 0; i < lauArrayOfVars.length; i++) {
            let inputBox = document.createElement('input')
            inputBox.id = `lau${lauArrayOfVars[i]}Input`
            inputBox.type = 'text'
            inputBox.placeholder = lauArrayOfVars[i]
            inputTable.appendChild(inputBox)
        }
    } else if(bool = true){
        for (var i = 0; i < lauList.length; i++) {
            if (lauList[i].adminNumber === lauNo) {
                var currentData = lauList[i]
                break
            }
        }
        tailNumber.value = lauNo
        inputTable.appendChild(tailNumber)
        for (var i = 0; i < lauArrayOfVars.length; i++) {
            let inputBox = document.createElement('input')
            inputBox.id = `${lauArrayOfVars[i]}Input`
            inputBox.type = 'text'
            inputBox.value = currentData[lauArrayOfVars[i]]
            inputTable.appendChild(inputBox)
        }
    }
    let submitButton = document.createElement('button')
    submitButton.type = 'button'
    submitButton.onclick = function() {lauCreate()}
    submitButton.textContent = 'Submit'
    inputTable.appendChild(submitButton)
}

function lauRemove () {
    let adminNumber = document.getElementById('lauRemoveInput')
    for (var i = 0; i < lauList.length; i++) {
        if (lauList[i].adminNumber === adminNumber.value) {
            let result = confirm(`Remove ${lauList[i].adminNumber}?`)
            if (result) {
                lauList[i].lauRemove()
                lauList.splice(i,1)
            }
        }
    }
}