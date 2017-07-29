// Get a reference to the database service
var database = firebase.database();

main();

// gets user input to create the beacon
function main()
{
	host = "adsf00dfd0f2df";
	course = "cp123";
	
	// randomly generate position and start / end time for convenience
	lat = 43.4724 + (Math.random()-0.5);
	lng = -80.526 + (Math.random()-0.5);
	startTime = 3 + Math.floor(Math.random() * 8) + ":00AM";
	endTime = 1 + Math.floor(Math.random() * 8) + ":00PM";
	
	// passes the user data to create a beacon
	Beacon(host, lat, lng, startTime, endTime, course);
	
	// updates page to show beacon was created
	document.body.innerHTML = "beacon created successfully!";
}

// creates the beacon
// inserting using .push() means key is automatically generated
function Beacon(host, lat, lng, startTime, endTime, course) {
  // get unique baconId
  var myBeacon = database.ref().push();
  var id = myBeacon.key;
  // save Beacon into database
  database.ref('/beacon/').push({
		beaconId : id,
		host: host,
		lat: lat,
		lng: lng,
		startTime: startTime,
		endTime: endTime,
		course: course
		
  });
}
