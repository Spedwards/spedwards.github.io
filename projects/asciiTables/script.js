function formTable() {
	var cols = +document.getElementById('cols').value,
		rows = +document.getElementById('rows').value,
		table = '<table border><tbody>';
	
	for ( var i = 0; i < rows; i++ ) {
		table += '<tr>';
		for ( var j = 0; j < cols; j++ ) {
			table += '<td contenteditable></td>';
		}
		table += '</tr>';
	}
	
	table += '</tbody></table>';
	
	document.getElementById('table').innerHTML = table;
	document.getElementById('createButton').style.display = 'inline-block';
}

function createTable() {
	var headers = [],
		rowsArray = [],
		cols = +document.getElementById('cols').value,
		rows = +document.getElementById('rows').value,
		elements = [];
	
	[].forEach.call(
		document.querySelectorAll('td'),
		function(v) {
			/Firefox/.test(navigator.userAgent) ? elements.push(v.textContent) : elements.push(v.innerText);
		}
	);
	
	for ( var i = 0; i < cols; i++ ) {
		headers.push(elements[0]);
		elements.splice(0, 1);
	}
	for ( var i = 0; i < rows-1; i++ ) {
		rowsArray.push([]);
		for ( var j = 0; j < cols; j++ ) {
			rowsArray[i].push(elements[j]);
		}
		elements.splice(0, cols);
	}
	
	document.getElementById('output').innerHTML = createAsciiTable(headers, rowsArray);
}

function createAsciiTable ( headers , rows ) {
	//	 createAsciiTable ( array headers , array rows )
	
	// Validate input
	if ( !Object.prototype.toString.call(headers) === '[object Array]' ) return 'headers not array';
	for ( var i = 0; i < headers.length; i++ ) {
		if ( !typeof(headers[i]) == 'string' || !typeof(headers[i]) == 'number' ) return 'headers['+i+'] not string or number';
		headers[i] += '';
	}
	if ( !Object.prototype.toString.call(rows) === '[object Array]' ) return 'rows not array';
	if ( rows.length < 1 ) return 'rows is empty';
	for ( var i = 0; i < rows.length; i++ ) {
		if ( !Object.prototype.toString.call(rows[i]) == '[object Array]' ) return 'rows['+i+'] not array';
		if ( rows[i].length !== headers.length ) return 'rows['+i+'].length does not match headers length';
		for ( var j = 0; j < rows[i].length; j++ ) {
			if ( !typeof(rows[i][j]) == 'string' || !typeof(rows[i][j]) == 'number' ) return 'rows['+i+']['+j+'] not string or number';
			rows[i][j] += '';
		}
	}
	
	
	// Adjust Array Elements Length
	for ( var i = 0; i < rows.length; i++ ) {
		for ( var j = 0; j < rows[i].length; j++ ) {
			var k = 1;
			if ( rows[i][j].length > headers[j].length ) {
				headers[j] = adjust( headers[j] , rows[i][j].length );
			} else if ( rows[i][j].length < headers[j].length ) {
				rows[i][j] = adjust( rows[i][j] , headers[j].length );
			}
			for ( var l = 0; l < rows.length; l++ ) {
				if ( rows[l][j].length > rows[i][j].length ) {
					rows[i][j] = adjust( rows[i][j] , rows[l][j].length );
				} else if ( rows[l][j].length < rows[i][j].length ) {
					rows[l][j] = adjust( rows[l][j] , rows[i][j].length );
				}
			}
		}
	}
	
	function adjust ( item , length ) {
		var k = 1;
		while ( item.length < length ) {
			if ( k % 2 == 0 ) {
				item = ' ' + item;
			} else {
				item += ' ';
			}
			k++;
		}
		return item;
	}
	
	// Headers
	var table = '', temp = '', header = '', body = '', line = '+';
	for ( var i = 0; i < headers.length; i++ ) {
		for ( var j = 0; j < headers[i].length + 4; j++ ) {
			line += '-';
		}
		line += '+';
	}
	for ( var i = 0; i < headers.length; i++ ) {
		temp += '|  ' + headers[i] + '  ';
	}
	temp += '|';
	table = line + '\n' + temp + '\n' + line;
	
	header = table;
	table = '';
	temp = '';
	
	// Body
	for ( var i = 0; i < rows.length; i++ ) {
		for ( var j = 0; j < rows[i].length; j++ ) {
			body += '|  ' + rows[i][j].substr(0, headers[j].length) + '  ';
		}
		body += '|\n';
	}
	
	// Completion
	table = header + '\n' + body + line;
	
	return table;
	
}
