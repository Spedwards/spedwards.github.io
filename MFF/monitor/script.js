/*
 * PROTOTYPE HACKS
 */
NodeList.prototype.forEach = HTMLCollection.prototype.forEach = Array.prototype.forEach;

/*
 * CONSTANTS
 */
var SELECT = document.getElementById('names'),
    FIELD = document.getElementById('action-field'),
    ADD = FIELD.nextElementSibling,
    REMOVE = document.getElementById('remove'),
    SENT = REMOVE.nextElementSibling,
    PRINT = document.getElementById('print'),
    RESET = PRINT.nextElementSibling,
    PRE = document.getElementById('out'),
    FRIENDS = [];

/*
 * DO STUFF
 */

ADD.onclick = function() {
    addName(FIELD.value);
    FIELD.value = '';
}

REMOVE.onclick = function() {
    var n = [].slice.call(SELECT.selectedOptions);
    for (var i in n) {
        n[i] = n[i].innerHTML;
        removeName(n[i]);
    }
}

SENT.onclick = function() {
    SELECT.selectedOptions.forEach(function(v) {
        sentPoints(v.innerHTML);
    });
}

PRINT.onclick = print;
RESET.onclick = reset;

FIELD.onkeydown = function(e) {
    if (e.which === 13) {
        ADD.click();
    }
}

/*
 * FUNCTIONS
 */
function sortNames() {
    var opts = [].slice.call(SELECT.children);
    opts.sort(function(a,b) {
        var v1 = a.innerHTML.toLowerCase();
        var v2 = b.innerHTML.toLowerCase();
        if (v1 > v2) return 1;
        if (v1 < v2) return -1;
        return 0;
    });
    while (SELECT.firstChild) {
        SELECT.removeChild(SELECT.firstChild);
    }
    opts.forEach(function(v) {
        SELECT.appendChild(v);
    });
}

function setSize() {
    SELECT.setAttribute('size', SELECT.childElementCount > 28 ? 28 : (SELECT.childElementCount === 0 ? 1 : SELECT.childElementCount));
    if (SELECT.childElementCount > 28) {
        SELECT.style.marginRight = '-3px';
    } else {
        SELECT.style.marginRight = '-20px';
    }
}

function addName(name) {
    var el = document.createElement("option");
    el.dataset.sent = false;
    el.innerHTML = name;
    SELECT.appendChild(el);
    sortNames();
    setSize();
    FRIENDS.push(name);
}

function removeName(name) {
    var opts = [].slice.call(SELECT.children);
    opts.forEach(function(v) {
        if (v.innerHTML.toLowerCase() === name.toLowerCase()) {
            SELECT.removeChild(v);
            return;
        }
    });
    FRIENDS.forEach(function(v,i) {
        if (v === name) FRIENDS.splice(i,1);
    });
    setSize();
}

function sentPoints(name) {
    var opts = [].slice.call(SELECT.children);
    SELECT.children.forEach(function(v) {
        if (v.innerHTML.toLowerCase() === name.toLowerCase()) {
            v.dataset.sent = true;
            return;
        }
    });
}

function print() {
    var t = new Table(['Name', 'Sent Points']);
    SELECT.children.forEach(function(v) {
        t.addRow([v.innerHTML, v.dataset.sent]);
    });
    PRE.innerHTML = t.toString();
}

function reset() {
    print();
    SELECT.children.forEach(function(v) {
        v.dataset.sent = false;
    });
}

function importNames() {
    var f = JSON.parse(localStorage.getItem('friends'));
    if (f !== null) {
        f.forEach(function(v) {
            addName(v);
        });
    }
}

function exportNames() {
    localStorage.setItem('friends', JSON.stringify(FRIENDS));
}

window.onload = importNames;
window.onbeforeunload = exportNames;
