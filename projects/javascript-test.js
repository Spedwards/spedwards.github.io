var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
	charset_length = charset.length;

function recurse(width, pos, base) {
	for (var i = 0; i < charset_length; i++) {
		if (pos < width - 1) {
			recurse(width, pos+1, base + charset[i]);
		}
		run(base + charset[i]);
	}
}

function run(code) {
	window.open("http://marvel.com/redeem?code=" + code);
}

recurse(12, 0, '');
