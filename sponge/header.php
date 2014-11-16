<?php
	function curPageURL() {
		$pageURL = 'http';
		if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
			$pageURL .= "://";
			if ($_SERVER["SERVER_PORT"] != "80") {
				$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
			} else {
			$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
		}
		return $pageURL;
	}
?>

<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
	</head>
	<body>
		<header>
			<h1>PinkSlime's Sponge Profile</h1>
			<nav>
				<ul>
					<li><a href="<?=(preg_match('/plugins/i', curPageURL())?'../index.php':'index.php')?>">Home</a></li>
					<li><a href="<?=(preg_match('/plugins/i', curPageURL())?'index.php':'plugins/index.php')?>">Plugins</a></li>
				</ul>
			</nav>
		</header>