Have you ever wanted to see every part of the entire earth? Too lazy to scroll in google maps? Maybe you just wanted to waste some time...

This little script will send your javascript around the world from bottom to top at the speed of light and take a sample at every sample point and create a google static map image link for it.

it does require jquery, and a page with at least one container element, but that's because I was lazy, it would take 2 seconds to be rid of it.

when it's done, it logs to the console how long your beam of light (or you travelling at the speed of light) would take to cover the earth's surface as a flat projection - basically you'd go right through mountains and stuff.

There is no way this would end well for you.

Parameters: 

```javascript
	var samplerate = 1; //samples per second
	var width = 10000; // path 'width' in m - the smaller it is the more times you'll have to go around the world, obviously
	var velocity = 299792458; //speed of light in m/s - this probably wont change much
	var apikey = ''; //add your maps API key here, otherwise you'll get 403 forbidden with too many requests
	var mapx = 50; //map image display width in px
	var mapy = 50; //map image display height in px
	var mapzoom = 10; //map zoomlevel (google zoom level)
	var $target = $('.jumbotron > .container'); //the container to add the images to.
```
