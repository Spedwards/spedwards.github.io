(function($) {
	$(document).ready(function() {
		// Variables
		var al= alertify,
			a = al.alert,
			l = al.log,
			s = al.success,
			e = al.error,
			debugging = false;
		al.set({
			labels: {
				ok : "COOL!"
			}
		});
		
		
		// Casino Event Points Calculator
		$('#cSubmit').on('click', function() {
			var amt = $('#cCount').val()*1000,
				highstakes = $('#cRoom:checked').length>0,
				points = (!highstakes ? amt/5 : parseInt(amt/50)*50+(amt%50)/5);
			a( 'You can earn ' + numeral(points).format('0,0') + ' points' + (points%1==0 ? '' : ' with ' + (+((points)+'').split('.')[1]*500) + ' chips left') );
		});
		
		
		// Debugging Function
		function db(str) {
			if (debugging) {
				console.log(str);
				l(str);
			}
		}
	});
})(jQuery);