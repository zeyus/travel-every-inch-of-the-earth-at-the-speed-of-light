(function() {
	var samplerate = 1; //samples per second 
	var width = 10000; // path 'width' in m (minimum 1 for now most people aren't that wide but let's say you have to fit into a little travel device.)
	var velocity = 299792458; //speed of light in m/s
	var apikey = '';
	var mapx = 50;
	var mapy = 50;
	var mapzoom = 10;
	var $target = $('.jumbotron > .container');


	var mperdeglong = function(latitude){
		return (111412.84 * Math.cos(latitude * (Math.PI / 180)) + -93.5 * Math.cos(3 * latitude * (Math.PI / 180)));
	};
	var m2deglong = function(metres, latitude){
	    return metres / mperdeglong(latitude);
	};
	var mperdeglat = function(latitude){
		return (111132.92 + -559.82 * Math.cos(2 * latitude * (Math.PI / 180)) + 1.175 * Math.cos(4 * latitude * (Math.PI / 180)));
	};
	var m2deglat = function(metres, latitude){
	    return metres / mperdeglat(latitude);
	};


	var walk_pe = function(width, samplerate, velocity){
		var sampledistance = 0;
		var samplecount = 0;

		var totravel = velocity / samplerate;
		$target.html('');
		for(var currentlat = -90.0 + m2deglat(width, -90.0), currentlong = 0; currentlat < 90.0; ){
			var travelled = 0;
			
			while(travelled < totravel){
				sampledistance = m2deglong(totravel, currentlat);
				samplecount++;
				$target.append('<img border="0" width="'+mapx+'" height="'+mapy+'" src="//maps.googleapis.com/maps/api/staticmap?center='+currentlat+','+currentlong+'&amp;zoom='+mapzoom+'&amp;size='+mapx+'x'+mapy+'&maptype=satellite&key='+apikey+'">');
				currentlong += sampledistance;
				if(currentlong > 360){
					travelled = travelled + mperdeglong(currentlat) * 360;
					currentlat += m2deglat(width, currentlat);
					if(currentlat >= 90){
						break;
					}
					currentlong	= 0;
				}
				
			}

		}
		return samplecount;
		
	};

	samples = walk_pe(width, samplerate, velocity);
	delta = samples / samplerate;
	// calculate (and subtract) whole days
	var days = Math.floor(delta / 86400);
	delta -= days * 86400;

	// calculate (and subtract) whole hours
	var hours = Math.floor(delta / 3600) % 24;
	delta -= hours * 3600;

	// calculate (and subtract) whole minutes
	var minutes = Math.floor(delta / 60) % 60;
	delta -= minutes * 60;

	// what's left is seconds
	var seconds = delta % 60; 
	console.log(days+' days, '+hours+' hours, '+minutes+' minutes, '+seconds+' seconds. for a ' + width + 'm wide beam of light to travel the entire surface of the earth');

}());
