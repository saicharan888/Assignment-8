/*eslint-env browser*/

var employee_list = [["Sally Smith", "Quality Assurance", "3423"], 
                    ["Mark Martin", "VP Sales", "3346"], 
                    ["John Johnson", "Marketing", "3232"],
                    ["Sai Charan", "Software professional", "1234"], 
                    ["Lionel Messi", "Manager", "1010"]];


var $ = function (id) {
    "use strict";
    return document.getElementById(id);
};

function displayTable() {
    "use strict";
    employee_list.forEach(employee => {
        addEmployee(employee);
    });
}

function getFormValues() {
    "use strict";
    var name, title, extension;
    name = $("name").value;
    title = $("title").value;
    extension = $("extension").value;
    return [name, title, extension];
}

function displayTableDetails() {
    "use strict";
    var caption = $("table_details");
    var caption_text = `<b>Showing ${employee_list.length} Employees</b>`;
    caption.innerHTML = caption_text;
}

function validateDetails() {
    "use strict";
    var name, title, extension, required, requiredFields;

    name = $("name").value;
    title = $("title").value;
    extension = $("extension").value;
    requiredFields = true;

    required = "<span>Required field</span>";

    if(name == "" || title == "" || extension == "") {
        requiredFields = false;
    }

    if(name == "") {
        $("invalid_name").innerHTML = required;
    }
    else{
        $("invalid_name").innerHTML = "";
    }

    if(title == "") {
        $("invalid_title").innerHTML = required;
    }
    else{
        $("invalid_title").innerHTML = "";
    }

    if(extension == "") {
        $("invalid_extension").innerHTML = required;
    }
    else{
        $("invalid_extension").innerHTML = "";
    }

    return requiredFields;
}


function addEmployee(rowList) {
    "use strict";
    var tableBody , row, cell, text, button;

    tableBody = document.getElementsByTagName("tbody").item(0);
    row = document.createElement("tr");

    rowList.forEach(element => {
        cell = document.createElement("td");
        text = document.createTextNode(element);
        cell.appendChild(text);
        row.appendChild(cell);
    });

    cell = document.createElement("td");
    button = document.createElement("BUTTON")
    text = document.createTextNode("Delete")
    button.classList.add("button");
    button.appendChild(text);
    cell.appendChild(button);
    row.appendChild(cell);
    button.setAttribute('onclick', 'removeRow(this)');

    tableBody.appendChild(row);
}

function removeRow(clickButton) {
    "use strict";
    var tableBody = document.getElementsByTagName("tbody").item(0);
    var rowIndex = clickButton.parentNode.parentNode.rowIndex - 1;
    tableBody.deleteRow(rowIndex);
    employee_list.splice(rowIndex, 1);
    displayTableDetails();
}

function clearForm() {
    "use strict";
    $("name").value = "";
    $("title").value = "";
    $("extension").value = "";
}

window.addEventListener("load", function() {
    "use strict";

    displayTableDetails();
    displayTable();
    $("name").focus();

    $("add").addEventListener("click", function() {
        if(validateDetails()) {
            var new_employee = getFormValues();
            employee_list.push(new_employee);
            addEmployee(new_employee);
            displayTableDetails();
            clearForm();
        }
    });
});