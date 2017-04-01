/**
 * Created by charl on 01/04/2017.
 */
var i = 0;

function getModuleName() {
    var module =  $('#selector-button').text();
    return module.substring(0,module.length-1);
}

function getLink(name){
    var year = name.substring(0,4);
    var question = name.substring(22,23);
    var paper = name.substring(11,12);
    var link = "http://www.cl.cam.ac.uk/teaching/exams/pastpapers/y" + year + "p" + paper + "q" + question + ".pdf";
    return link;
}

function checkSol(name) {
    var thisName = name.substring(0,23);
    console.log("short name is "+ thisName);
    $.getJSON("hassol.json", function(json) {
        for (j = 0; j <= json.length; j++) {
            if (json[j]["name of paper"].substring(0,23) == thisName) {
                if (json[j]["solutions?"] == "yes"){
                    console.log("found solution for " + json[j]["name of paper"]);
                    $('.solutions').attr('class', 'btn solutions');
                    $('.solutions').click(function() {
                        openSolPdf(name);
                    });
                    return;
                } else {
                    console.log("no solution found");
                    $('.solutions').attr('class', 'btn solutions hidden');
                    return;
                }
            }
        }
    });
}

function getSolLink(name){
    var year = name.substring(0,4);
    var question = name.substring(22,23);
    var paper = name.substring(11,12);
    var link = "http://www.cl.cam.ac.uk/teaching/exams/solutions/" + year +"/" + year + "-p0" + paper + "-q0" + question + "-solutions.pdf";
    return link;
}

function addLink(name){
    // console.log("adding " + name);
    var ul = document.getElementById("quest_list");
    var li = document.createElement("li");
    var aElement = document.createElement("a");
    aElement.onclick = function() {openPdf(name);};
    aElement.appendChild(document.createTextNode(name.substring(0,23)));
    li.appendChild(aElement);
    ul.appendChild(li);
}

function openModule(name) {
    $('#selector-button').text(name+ " ");
    var caret = $('<span class = "caret"></span>');
    $('#selector-button').append(caret);
    $('#quest_list').empty();
    $.getJSON("source.json", function(json) {
        for(var j = 0; j <= jsonLength(json, name); j++) {
            var obj = json[j];
            addLink(json[j][name]);
        }
        //open first one
        var linkName = json[0][name];
        i=0;
        openPdf(linkName);
    });
}

function openSolPdf(name) {
    var link = getSolLink(name);
    $('#pdf').attr('data', link).attr('width', '100%');
    updateI(getModuleName(),name);
}

function openPdf(name) { //name is in form 2019 paper 5 question 4 - solutionetc.
    var link = getLink(name);
    $('#pdf').attr('data', link).attr('width', '100%');
    updateI(getModuleName(),name);
    checkSol(name);
}

function updateI(module, name) {
    $.getJSON("source.json", function(json) {
        console.log(jsonLength(json, module));
        for (j = 0; j <= jsonLength(json,module); j++) {
            var jName = json[j][module];
            console.log("jname is " + jName + " and name is " + name);
            if (jName == name) {
                i = j;
                console.log("i is now " + i);
                return;
            }
        }
    });
}

function jsonLength(json, module) {
    var length = json.filter(function(elem) {
        return elem[module] != "" && typeof(elem[module]) != "undefined";
    }).length;
    // console.log("json length is " + length + " for name " + name);
    return length - 1;
}

function goEarlier() {
    var name = getModuleName();
    // console.log("name is " + name);
    $.getJSON("source.json", function(json) {
        var length = jsonLength(json, name);
        console.log("check i isn't bigger than " + length);
        // console.log("length is: " + length);
        if (i < length) { i++;}
        var linkName = json[i][name];
        openPdf(linkName);
    });
}

function goLater() {
    var name = getModuleName();
    if (i > 0) {i--;}
    $.getJSON("source.json", function(json) {
        var linkName = json[i][name];
        openPdf(linkName);
    });
}
