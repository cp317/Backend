/**
 * Created by Ricosapple on 2017-07-23.
 */

var database = firebase.database();

displayBeacon();

// display all beacons on the screen
function displayBeacon()
{
    // get all the beacons from the database
    database.ref('/beacon/').once('value').then(function(b)
    {
        // iterate through each beacon
        for (var i in b.val())
        {
            // display each of the beacons attributes on the screen
            // b.val()[i] refers to one beacon
            document.body.innerHTML += "<li>host: <b>" + b.val()[i].host +
                "</b>, school: <b>" + b.val()[i].school +
                "</b>, course: <b>" + b.val()[i].course +
                "</b>, startTime: <b>" + b.val()[i].startTime +
                "</b>, endTime: <b>" + b.val()[i].endTime +
                "</b>, coordinates: <b>(" + b.val()[i].lat + "," +  b.val()[i].lng + ")"
            "</b></li>";
        }
    });
}