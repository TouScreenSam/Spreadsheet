var tableData = [];
var colCount = 100;
var rowCount = 100;

//Generate table elements
function generate_table() {
    try {
        resetButtons();
        // get the reference for the body
        var body = document.getElementById('divSpreadSheet');
        // creates a <table> element and a <tbody> element
        var tbl = document.createElement("table");
        tbl.id = 'divTable';
        tbl.className = 'table table-bordered table-responsive';
        var tblBody = document.createElement("tbody");
        tblBody.id = 'divTableBody';

        //Creating all table headers   
        tblBody.appendChild(createHeader());

        //check/create if tableData[] is empty
        if (tableData.length === 0) {
            createArray();
        }

        //Create all rows from tableData[]
        tbl.appendChild(createRows(tblBody));
        body.innerHTML = '';
        body.appendChild(tbl);

    } catch (err) { console.log('generate_table()' + err) }
}

//Build an array to store our spreadsheet data
function createArray() {
    try {
        for (var i = 0; i < rowCount; i++) {
            var cellArray = [];
            for (var j = 0; j < colCount; j++) {
                var cellObject = {
                    row: i + 1,
                    col: j + 1,
                    val: ""
                };
                cellArray.push(cellObject);
            }
            tableData.push(cellArray);
        }
    } catch (err) { console.log('createArray()' + err) }
}

//Create table header
function createHeader() {
    try {
        var tr = document.createElement('tr');
        var th = document.createElement("th");
        th.textContent = '#';
        tr.appendChild(th);
        for (var i = 0; i < colCount; i++) {
            th = document.createElement("th");
            th.textContent = columnHeaderName(i);
            tr.appendChild(th);
        }
        return tr;
    } catch (err) { console.log('createHeader()' + err) }
}

//Create table rows and table data
function createRows(tblBody) {
    try {
        //Creating all cells
        for (x = 0; x < tableData.length; x++) {
            // creates a table row
            var row = document.createElement("tr");
            var thead = document.createElement("th");
            thead.textContent = x + 1;
            row.appendChild(thead);
            var cellArray = [];

            for (z = 0; z < tableData[x].length; z++) {
                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                var cell = document.createElement("td");
                cell.setAttribute('contenteditable', 'true');
                cell.className = 'divCell';

                //Add cell event listener
                if (cell.addEventListener) {
                    cell.addEventListener("input", changeCellValue, false);
                }
                else if (cell.attachEvent) {
                    cell.attachEvent("input", changeCellValue);
                }

                //Populate cell with saved array data
                var cellText = (document.createTextNode(tableData[x][z].val));

                if (x >= 0) { k = x + 1 } else { k = x; }
                //cell.setAttribute('data-cell', columnHeaderName(z) + k);
                cell.id = columnHeaderName(z) + k;
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        return tblBody;

    } catch (err) { console.log('createRows()' + err) }
}

//Update tableData[] when cell value changed
function changeCellValue() {
    try {
        var col = this.cellIndex - 1;
        var row = this.parentNode.rowIndex - 1;
        var newVal = decodeURI(this.innerHTML);
        tableData[row][col].val = newVal;

        if (newVal.includes('=')) { cellFunction(row, col, newVal); }
        if (newVal.toLowerCase().includes('sum')) { cellFormula(row, col, newVal); }

    } catch (err) { console.log('changeCellValue()' + err) }
}

//Detect cell function/function type 
//and split values
function cellFunction(row, col, newValue) {
    try {
        var func = newValue.replace('=', '');
        var oper = func.includes('+');
        var cells = [];
        if (func.includes('+')) {//Addition
            cells = func.split('+');
        } else if (func.includes('-')) {//Subtraction
            cells = func.split('-');
        }
        if (cells.length > 0) {
            console.log('readCellValues');
            readCellValues(cells);
        }
    } catch (err) { console.log('cellFunction()' + err) }
}

//Detect cell formula/formula type 
//and split values
function cellFormula(row, col, newValue) {
    try {

    } catch (err) { console.log('cellFormula()' + err) }
}

//Retrieve/return values from cells
//in function
function readCellValues(cells) {
    try {
        var cellValues = [];
        for (var i = 0, len = cells.length; i < len; i++) {
            var cell = document.getElementById(cells[i]);
            console.log(cell);
            cellValues.push(cell.innerText());
        }
        console.log(cellValues);
        return cellValues;
    } catch (err) { console.log('readCellValue()' + err) }
}

//Alphabetical header names
function columnHeaderName(n) {
    try {
        var ordA = 'a'.charCodeAt(0);
        var ordZ = 'z'.charCodeAt(0);
        var len = ordZ - ordA + 1;

        var s = "";
        while (n >= 0) {
            s = String.fromCharCode(n % len + ordA) + s;
            n = Math.floor(n / len) - 1;
        }
        return s;

    } catch (err) { console.log('columnHeaderName()' + err) }
}

//Cell formating and button toggle
function formatCell(e) {
    try {
        var cell = document.getElementsByClassName('divCell');
        var toggle = '';
        if (e.classList.contains('active')) {
            e.classList.remove('active');
            toggle = 'remove';
        } else {
            e.classList.add('active');
            toggle = 'add';
        }
        for (i = 0; i < cell.length; i++) {
            cell[i].classList.toggle(e.id);
        }
    } catch (err) { console.log('formatCell()' + err) }
}

//Reset Cell formating on table refresh
function resetButtons() {
    document.getElementById('btnItalics').classList.remove('active');
    document.getElementById('btnBold').classList.remove('active');
    document.getElementById('btnUnderLine').classList.remove('active');
}