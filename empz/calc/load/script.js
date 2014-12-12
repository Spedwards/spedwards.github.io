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
		
		// Troop Load Calculator
		$('#lSubmit').on('click', function() {
			var types = {
				i : [6, 8, 10, 12],
				v : [8, 10, 12, 14],
				d : [5, 7, 9, 11]
			},
				type = $('#lType').val(),
				tier = $('#lTier').val()-1,
				req = +$('#lReq').val(),
				inf = $('#lInf:checked').length > 0,
				boost = (+$('#lBoost').val())/100+1,
				i = 1,
				n = (i*(inf ? types[type][tier]*.2 : types[type][tier])) * boost,
				sp = ' ';
			
			while (n < req) {
				i++;
				n = (i*(inf ? types[type][tier]*.2 : types[type][tier])) * boost;
			}
			a(numeral(i).format('0,0') + ' Tier ' + (tier+1) + sp + (type=='i' ? 'Infantry' : (type == 'v' ? 'Vehicles' : 'Demolitions')) + ' are required for ' + numeral(req).format('0,0'));
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