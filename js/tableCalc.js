/*Mohamed Makouk
Mohamed_Makouk@student.uml.edu
October 2021
Javascript file for scripts used in multpication table generator*/

//takes inputs from form, saves them, then calculates the table and fills it in
function fillTable() {
    //get values from table
    var minColumn = document.myForm.minColumn.value
    var maxColumn = document.myForm.maxColumn.value
    var minRow = document.myForm.minRow.value
    var maxRow = document.myForm.maxRow.value


    //avoid stupidly large calculations
    if (minColumn < -300 || maxColumn > 300 || minRow < -300 || maxRow > 300 || minColumn > 300 || maxColumn < -300 || minRow > 300 || maxRow < -300) {
        var error = document.getElementById("errorMsg")
        error.textContent = "Error: Please ensure numbers are between -1000 and 1000 "
        error.style.color = "red"
        return;
    }

    var table = document.getElementById('multTable')
    var rows = Math.abs(maxRow - minRow)
    var columns = Math.abs(maxColumn - minColumn)
    var output = "" //string we will manipulate to eventually display in html
    var matrix = {}; //what we will use to calculate each value before filling the table
    var tableX = minRow
    var tableY = minColumn

    //calculations
    for (var x = 0; x <= columns; x++) {
        var tempArr = [];

        for (var y = 0; y <= rows; y++) {
            var currentValue = tableX * tableY;
            tempArr[y] = currentValue; //calculate what will go into current cell and save it
            tableX++;
        }

        matrix["row" + x] = tempArr; //insert into matrix
        tableX = minRow;
        tableY++;
    }


    output += "<table>"
    output += "<tr><td></td>" //adjust for first cell to be blank
    for (var i = minRow; i <= maxRow; i++) {
        output += "<td>" + i + "</td>"; //fill cells
    }

    output += "</tr>";

    var tableY = minColumn;

    for (var x = 0; x <= columns; x++) {
        output += "<tr><td>" + tableY + "</td>"
        for (var y = 0; y <= rows; y++) {
            output += "<td>" + matrix["row" + x][y] + "</td>" //insert to output
        }
        tableY++;
        output += "</tr>"

    }
    output += "</table>" //append to string




    table.innerHTML = output //display our hard work
    document.getElementById("table-wrap").style.visibility = "visible" //un-hide the table (fixes empty display bug)
}

