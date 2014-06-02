/* 
 * Countdown v1.0 
 * http://spedwards.github.io 
 * 
 * Copyright (c) 2014, Liam Edwards 
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */ 
 
(function ($) {
	
	$.fn.countdown = function( options ) {
	
		$(this).html('<span id="countdown"><span id="hours">0</span>:<span id="minutes">0</span>:<span id="seconds">0</span><span id="milliseconds">0</span></span>');
	
		var opts = $.extend( {}, $.fn.countdown.defaults, options ),
			elem = $(this),
			hours = elem.children('#countdown').children('#hours'),
			minutes = elem.children('#countdown').children('#minutes'),
			seconds = elem.children('#countdown').children('#seconds'),
			milliseconds = elem.children('#countdown').children('#milliseconds');
		
		$.fn.countdown.check('num', opts.hours, 0);
		$.fn.countdown.check('num', opts.minutes, 0);
		$.fn.countdown.check('num', opts.seconds, 0);
		$.fn.countdown.check('num', opts.milliseconds, 0);
		$.fn.countdown.check('bool', opts.reverse, false);
		
		opts.hours = opts.hours + $.fn.countdown.splitHoursMinutes(opts.minutes)[0];
		opts.minutes = $.fn.countdown.splitHoursMinutes(opts.minutes)[1] + $.fn.countdown.splitMinutesSeconds(opts.seconds)[0];
		opts.seconds = $.fn.countdown.splitMinutesSeconds(opts.seconds)[1] + $.fn.countdown.splitSecondsMilliseconds(opts.milliseconds)[0];
		opts.milliseconds = $.fn.countdown.splitSecondsMilliseconds(opts.milliseconds)[1];
			
		var iH = opts.hours,
			iMin = opts.minutes,
			iS = opts.seconds,
			iMil = opts.milliseconds;
		
		var count = setInterval( function() {
			if (iMil <= 0) {
				if (iS == 0) {
					if (iMin == 0) {
						if (iH == 0) {
							// DONE
							milliseconds.text(0);
							clearInterval(count);
						} else {
							iH--;
							iMin = 59;
							iS = 59;
							iMil = 999;
						}
					} else {
						iMin--;
						iS = 59;
						iMil == 999;
					}
				} else {
					iS--;
					iMil = 999;
				}
			} else {
				iMil-=4; // Make up for ms lost doing calculations
			}
			hours.text(iH);
			minutes.text(iMin);
			seconds.text(iS);
			if (iMil >= 10 && iMil < 100) {
				milliseconds.text('0'+iMil);
			} else if (iMil >= 0 && iMil < 10) {
				milliseconds.text('00'+iMil);
			} else if (iMil == -1) {
				milliseconds.text('000');
			} else {
				milliseconds.text(iMil);
			}
		}, 1 );
		
		return this;
	};
	
	$.fn.countdown.defaults = {
		hours : 0,
		minutes : 0,
		seconds : 0,
		milliseconds : 0,
		reverse : false
	};
	
	$.fn.countdown.splitSecondsMilliseconds = function (inp) {
		return [Math.floor(inp/1000), inp%1000]; // [seconds, milliseconds];
	}
	
	$.fn.countdown.splitMinutesSeconds = function (inp) {
		return [+(inp/60+'').split('.')[0], inp%60]; // [minutes, seconds];
	}
	
	$.fn.countdown.splitHoursMinutes = function (inp) {
		return $.fn.countdown.splitMinutesSeconds(inp); // [hours, minutes];
	}
	
	$.fn.countdown.check = function(type, opt, def) {
		if (type == 'num') {
			if (!isNaN(+opt)) {
				return opt;
			} else {
				return def;
			}
		} else if (type == 'bool') {
			if (typeof opt === 'boolean') {
				return opt;
			} else {
				return def;
			}
		} else {
			return def;
		}
	}
	
} (jQuery));