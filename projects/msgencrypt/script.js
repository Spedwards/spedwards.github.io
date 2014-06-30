function encryptText() {
	msg = document.querySelector('#encrypt-wrapper textarea').value;
	key = document.querySelector('#encrypt-wrapper input[type=text]').value;
	encryption = encrypt(msg, key);
	document.querySelector('#encrypt-wrapper textarea').value = encryption;
}

function decryptText() {
	encryption = document.querySelector('#decrypt-wrapper textarea').value;
	key = document.querySelector('#decrypt-wrapper input[type=text]').value;
	msg = decrypt(encryption, key);
	document.querySelector('#decrypt-wrapper textarea').value = msg;
}

function random(z) {
	r = Math.floor(Math.random() * 1e5);
	if (z == 'e') {
		document.querySelector('#encrypt-wrapper input[type=text]').value = r;
	} else if (z == 'd') {
		document.querySelector('#decrypt-wrapper input[type=text]').value = r;
	}
}