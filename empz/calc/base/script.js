var power = {
	troops : {
		t1 : 2,
		t2 : 8,
		t3 : 24,
		t4 : 48
	},
	infected : {
		t1 : 4,
		t2 : 16,
		t3 : 32,
		t4 : 64
	},
	defense : {
		t0 : 1,
		t1 : 2,
		t2 : 4,
		t3 : 8,
		t4 : 16
	}
}, total,base,faux,amt = {
	troops : {
		t1 : 0,
		t2 : 0,
		t3 : 0,
		t4 : 0
	},
	infected : {
		t1 : 0,
		t2 : 0,
		t3 : 0,
		t4 : 0
	},
	defense : {
		t0 : 0,
		t1 : 0,
		t2 : 0,
		t3 : 0,
		t4 : 0
	}
};

function format(n) {
	var parts = n.toString().split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return parts.join('.');
};

function start() {
	var t = 't', j = 'i', d = 'd';
	
	console.log(document.getElementById('total').value);
	console.log(document.getElementById('total').value.replace(/,/g, ''));
	console.log(+document.getElementById('total').value.replace(/,/g, ''));
	total = +document.getElementById('total').value.replace(/,/g, '');
	amt.defense['t0'] = +document.getElementById('t0d').value.replace(/,/g, '');
	for (var i = 1; i < 5; i++) {
		amt.troops[t+i] = +document.getElementById(t+i+t).value.replace(/,/g, '');
		amt.infected[t+i] = +document.getElementById(t+i+j).value.replace(/,/g, '');
		amt.defense[t+i] = +document.getElementById(t+i+d).value.replace(/,/g, '');
	}
	run();
}

function run() {
	base = 0;
	faux = 0;

	for (var k in amt.troops) {
		faux += amt.troops[k]*power.troops[k];
	}

	for (var k in amt.infected) {
		faux += amt.infected[k]*power.infected[k];
	}

	for (var k in amt.defense) {
		faux += amt.defense[k]*power.defense[k];
	}

	base = total - faux;

	// alertify.alert('Total Power: ' + numeral(total).format('0,0') + '<br />Faux Power: ' + numeral(faux).format('0,0') + '<br />BASE: ' + numeral(base).format('0,0'));
	alertify.alert('<table>' +
		'<tr><td>Total Power:</td><td>' + numeral(total).format('0,0') + '</td></tr>' +
		'<tr><td>Added Power:</td><td>' + numeral(faux).format('0,0') + '</td></tr>' +
		'<tr><td>Base Power:</td><td>' + numeral(base).format('0,0') + '</td></tr>' +
	'</table>');
}