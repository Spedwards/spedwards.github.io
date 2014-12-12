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
		
	
		// Troop Speed Calculator
		$('#tSubmit').on('click', function() {
			var amt	 = +$('#tCount').val(),
				tier = $('#tType').val(),
				h	 = +$('#tH').val() > 0 ? +$('#tH').val() : 0,
				m	 = +$('#tM').val() > 0 ? +$('#tM').val() : 0,
				se	 = +$('#tS').val() > 0 ? +$('#tS').val() : 0,
				time = ((h*60+m)*60+se)/amt;
				db('{speed:{amt:'+amt+',tier:'+tier+',time:{hours:'+h+',minutes:'+m+',seconds:'+se+',total:'+time+'}}}');
			a('Individual time for Tier ' + tier + ' troops: ' + time.toFixed(2) + ' seconds');
			
			if (tier == 1) {
				l('Individual time for Tier 2 troops: ' + t2(time, 1) + ' seconds');
				l('Individual time for Tier 3 troops: ' + t3(time, 1) + ' seconds');
				l('Individual time for Tier 4 troops: ' + t4(time, 1) + ' seconds');
			} else if (tier == 2) {
				l('Individual time for Tier 1 troops: ' + t1(time, 2) + ' seconds');
				l('Individual time for Tier 3 troops: ' + t3(time, 2) + ' seconds');
				l('Individual time for Tier 4 troops: ' + t4(time, 2) + ' seconds');
			} else if (tier == 3) {
				l('Individual time for Tier 1 troops: ' + t1(time, 3) + ' seconds');
				l('Individual time for Tier 2 troops: ' + t2(time, 3) + ' seconds');
				l('Individual time for Tier 4 troops: ' + t4(time, 3) + ' seconds');
			} else if (tier == 4) {
				l('Individual time for Tier 1 troops: ' + t1(time, 4) + ' seconds');
				l('Individual time for Tier 2 troops: ' + t2(time, 4) + ' seconds');
				l('Individual time for Tier 3 troops: ' + t3(time, 4) + ' seconds');
			}
			
			function t1(t, f) {
				return f==2?(t/2).toFixed(2):(f==3?(t/4).toFixed(2):(t/8).toFixed(2));
			}
			function t2(t, f) {
				return f==1?(t*2).toFixed(2):(f==3?(t/2).toFixed(2):(t/4).toFixed(2));
			}
			function t3(t, f) {
				return f==1?(t*4).toFixed(2):(f==2?(t*2).toFixed(2):(t/2).toFixed(2));
			}
			function t4(t, f) {
				return f==1?(t*8).toFixed(2):(f==2?(t*4).toFixed(2):(t*2).toFixed(2));
			}
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