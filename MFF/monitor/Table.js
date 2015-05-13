/**
 * Table object.
 * @class	Table
 * @constructor
 * @author	Liam Edwards
 * @version	1.0.0
 * @param	{Array} header Array to be used as the header.
 */
function Table(header) {
	if (Object.prototype.toString.call(header) !== '[object Array]') {
		throw 'headers not array';
		return;
	}
	for (var i = 0; i < header.length; i++) {
		if (typeof(header[i]) !== 'string') {
			throw 'headers['+i+'] not string';
			return;
		}
	}
	this.header = header;
	this.rows = [];
}

/**
 * Adds a row to this Table.
 * @param {Array} row Array of cells to be added.
 */
Table.prototype.addRow = function(row) {
	if (Object.prototype.toString.call(row) !== '[object Array]') {
		throw 'row not array';
		return;
	}
	if (row.length !== this.header.length) {
		throw 'row length does not match header length';
		return;
	}
	this.rows.push(row);
}

/**
 * Create a row
 * @return {String} this table as a String.
 */
Table.prototype.create = function() {
	this.adjust();
	
	var headers = '',
		body = '',
		line = "+";
	
	for (var i = 0; i < this.header.length; i++) {
		for (var j = 0; j < this.header[i].length + 4; j++) {
			line += '-';
		}
		line += '+';
	}
	headers = line + '\n';
	for (var i = 0; i < this.header.length; i++) {
		headers += '|  ' + this.header[i] + '  ';
	}
	headers += '|\n' + line;
	
	for (var i = 0; i < this.rows.length; i++) {
		for (var j = 0; j < this.rows[i].length; j++) {
			body += '|  ' + this.rows[i][j] + '  ';
		}
		body += '|\n';
	}
	
	return headers + '\n' + body + line;
}

Table.prototype.adjust = function() {
	for (var i = 0; i < this.rows.length; i++) {
		for (var j = 0; j < this.rows[i].length; j++) {
			if (this.rows[i][j].length < this.header[j].length) {
				this.rows[i][j] = this.adjustCell(this.rows[i][j], this.header[j].length);
			} else if (this.rows[i][j].length > this.header[j].length) {
				this.header[j] = this.adjustCell(this.header[j], this.rows[i][j].length);
			}
			for (var k = 0; k < i; k++) {
				if (this.rows[k][j].length < this.rows[i][j].length) {
					this.rows[k][j] = this.adjustCell(this.rows[k][j], this.rows[i][j].length);
				} else if (this.rows[k][j].length > this.rows[i][j].length) {
					this.rows[i][j] = this.adjustCell(this.rows[i][j], this.rows[k][j].length);
				}
			}
		}
	}
}

Table.prototype.adjustCell = function(item,length) {
	var l = 1;
	while (item.length < length) {
		if (l % 2 == 0) {
			item = ' ' + item;
		} else {
			item += ' ';
		}
		l++;
	}
	return item;
}

/**
 * Converts this Table to a String.&nbsp;Same as <code>create()</code>.
 * @return {String} this Table as a String.
 */
Table.prototype.toString = function() {
	return this.create();
};

/**
 * Converts table to JSON string.
 * @param	{Table}		table Table object.
 * @return	{String}	JSON string of table.
 */
Table.toJSON = function(table) {
	return '{"header": ' + JSON.stringify(table.header) + ', "cells": ' + JSON.stringify(table.rows) + '}';
}

/**
 * Converts JSON string to table.
 * @param	{String}	json JSON string.
 * @return	{Table}		Table object.
 */
Table.fromJSON = function(json) {
	var obj = JSON.parse(json);
	var table = new Table(obj.header);
	for (var i in obj.cells) {
		table.addRow(obj.cells[i]);
	}
	return table;
}