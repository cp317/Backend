// Get a reference to the database service
var database = firebase.database();

main();

// gets user input to create the beacon
function main()
{
	beaconId = "-Kq6Lz54HtIsHa6D4mBc";

	// passes the user data to close a beacon
	closeBeacon(beaconId);
	
	// updates page to show beacon was removed
	document.body.innerHTML = "beacon closed successfully!";
}

// close the beacon
function closeBeacon(beaconId) {
	// find the beacon table
	var ref = firebase.database().ref('/beacon/');
	// remove the beacon that has the matching beacon Id
	ref.orderByChild('beaconId').equalTo(beaconId).on('child_added', (snapshot) => {
     snapshot.ref.remove()
});
	

}
