function callPopulateTable(uri, divTableID, divListID, notWanted, filterClick, filterClickDivs) {
    $.when(callGetAjax(uri)).done(function (received) {
        divTableID = "#" + divTableID;
        MAP = populateTable(received, divTableID, divListID, notWanted, filterClick);
        if (filterClick === null) {
            return;
        } else {
            defineSelection(divTableID, filterClick, MAP, filterClickDivs);
        }
    });
}

function defineSelection(divTableID, filterClick, MAP) {
    var table = $(divTableID)[0];
    var thead = table.getElementsByTagName("thead")[0];
    var tbody = table.getElementsByTagName("tbody")[0];
    tbody.onclick = function (e) {
        e = e || window.event;
        var data = [];
        var target = e.srcElement || e.target;
        while (target && target.nodeName !== "TR") {
            target = target.parentNode;
        }
        if (target) {
            var cells = target.getElementsByTagName("td");
            var key;
            if (filterClick.length > 1) {
                var cellsHead = thead.getElementsByTagName("tr")[0].cells;
                key = matchParameters(filterClick, cells, cellsHead);
            } else {
                key = cells[0].innerHTML;
            }
            var object = MAP[key];
            populateClickedTable(object);
        }
    }
}

function matchParameters(filterClick, cells, cellsHead) {
    var dpid = cells[0].innerHTML;
    var column = filterClick[0];
    var columnValue;
    for (i = 0; i < cellsHead.length; i++) {
        if (cellsHead[i].innerHTML == column.toUpperCase()) {
            columnValue = cells[i].innerHTML;
            var key = dpid + "," + columnValue;
            return key;
        }
    }
}

function populateClickedTable(object) {
    var attributes = new Array();
    var values = "";
    var rows = "";
    var result = "";
    if (Object.prototype.toString.call(object) === '[object Array]') { //Depois mudar o outro embaixo
        for (i in object) {
            rows = rows + "<tr>";
            obj = object[i];
            values = "";
            for (attribute in obj) {
                if (i == 0) {
                    attributes.push(attribute);
                }
                values = values + "<td>" + obj[attribute] + "</td>";
            }
            rows = rows + values + "</tr>";
        }
        result = rows;
    } else {
        for (attribute in object) {
            attributes.push(attribute);
            values = values + "<td>" + object[attribute] + "</td>";
        }
        result = values;
    }
    divTableID = filterClickDivs[0];
    divListID = filterClickDivs[1];
    populateHTML(divTableID, divListID, attributes, result);
}

function populateTable(received, divTableID, divListID, notWanted, filterClick) {
    data = JSON.parse(received);
    $(divTableID).draggable();
    var keysList = Object.keys(data).sort();
    var res = "";
    var attributeArray = new Array();
    var MAP = new Array();
    attributeArray.push("SWITCH");
    for (var i in keysList) {
        var j = 0;
        var id = keysList[i];
        var row = "<tr> <td>" + id;
        var object = data[id];
        var objectFlag = false //Fix;
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                value = object[key];
                if (notWanted.indexOf(key) === -1) {
                    if (typeof value != 'object') {
                        insertAttribute(attributeArray, key.toUpperCase());
                        row += "</td> <td>";
                        row += value;
                    } else { //It only works because the array is the last! If have time change this.
                        objectFlag = true; // Fix.
                        abstractObject = value;
                        res = sublevel(abstractObject, attributeArray, notWanted, row, res, id, filterClick, MAP);
                    }
                }
            }
        }
        if (row !== "" && objectFlag === false) { // If enter here, will not enter on the else above.
            res += row;
            res += "</td> </tr>";
        }
    }
    populateHTML(divTableID, divListID, attributeArray, res);
    return MAP;
}

function verifyClick(switchID, value, column, filterClick, MAP) {
    var key;
    if (filterClick.indexOf(column) !== -1) {
        if (typeof value != 'object') { //Object to be saved.
            key = switchID;
            MAP[key] = value[key];
        } else {
            if (Object.prototype.toString.call(value) === '[object Array]') {
                //Iterate through the Array
                for (i in value) {
                    elem = value[i];
                    key = switchID + "," + elem[column];
                    targetObject = filterClick[filterClick.length - 1];
                    MAP[key] = elem[targetObject];
                }
            } else { // No caso de 1 elemento
                elem = value;
                key = switchID + "," + elem[column];
                targetObject = filterClick[filterClick.length - 1];
                MAP[key] = elem[targetObject];
            }
        }
        return true;
    }
    return false;
}

function sublevel(abstractObject, attributeArray, notWanted, row, res, id, filterClick, MAP) {
    if (Object.prototype.toString.call(abstractObject) === '[object Array]') {
        return processObjectArray(abstractObject, attributeArray, row, res, notWanted, id, filterClick, MAP);
    } else {
        return processObject(abstractObject, attributeArray, row, res, notWanted, id, filterClick, MAP);
    }
}

function processObjectArray(array, attributeArray, partial, res, notWanted, id, filterClick, MAP) {
    for (i in array) {
        flag = false;
        object = array[i];
        row = partial;
        for (var key in object) {
            var value = object[key];
            if (object.hasOwnProperty(key) && notWanted.indexOf(key) === -1) {
                insertAttribute(attributeArray, key.toUpperCase());
                row += "</td> <td>";
                row += value; // Don't go deep
            }
            if (flag === false && filterClick !== null) {
                flag = verifyClick(id, object, key, filterClick, MAP);
            }
        }
        res += row;
        res += "</td> </tr>";
    }
    return res;
}

function processObject(object, attributeArray, row, res, notWanted, id, filterClick, MAP) {
    flag = false;
    for (var key in object) {
        var value = object[key];
        if (object.hasOwnProperty(key) && notWanted.indexOf(key) === -1) {
            insertAttribute(attributeArray, key.toUpperCase());
            row += "</td> <td>";
            row += value; // Don't go deep
        }
        if (flag === false && filterClick !== null) {
            flag = verifyClick(id, object, key, filterClick, MAP);
        }
    }
    res += row;
    res += "</td> </tr>";
    return res;
}

function insertAttribute(attributeArray, value) {
    if (attributeArray.indexOf(value) === -1) {
        attributeArray.push(value);
    }
}

function populateHTML(divTableID, divListID, attributeArray, res) {
    if (divTableID.indexOf("#") === -1) {
        divTableID = "#" + divTableID;
        $(divTableID).draggable();
    }
    var html = "<table id='" + divListID + "'> <thead> <tr>";
    for (var i in attributeArray) {
        var attr = "<th>" + attributeArray[i] + "</th>";
        html += attr;
    }
    var end = "</tr> </thead> <tbody>" + res + "</tbody> </table>";
    html += end;
    $(divTableID).html(html);
}

