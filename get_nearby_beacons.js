// function 4: get any beacons with the same course code within the given radius
// assigned to: wang4060@mylaurier.ca

var database = firebase.database();
main();
function main()
{
	get_nearby_beacons(2,3,40,317,function(b){
		for (var x in b){
			document.body.innerHTML +=b[x].school;
	}
});
}
function get_nearby_beacons(lat, lng, radius, course,callback)
{	var b=[];
	var p=0;
	database.ref('/beacon/').once('value').then(function(bv)
	{
		for (var i in bv.val()){
			//go through the beacon area and find out all the beacons that 
			// inside the given radius 
		if (bv.val()[i].lat<lat+radius && bv.val()[i].lng<lng+radius && bv.val()[i].course_code==course){	
			b.push(bv.val()[i]);
			//test use
			document.body.innerHTML += "<li>school: <b>" + bv.val()[i].school + "</b>, course code: <b>" + bv.val()[i].course_code + "</b>, start_time: <b>" + bv.val()[i].start_time + "</b>, lat: <b>"+bv.val()[i].lat +"</b>, lng: <b>"+bv.val()[i].lng +"</b></li>";
			document.body.innerHTML +=b[p].school;
			p+=1;
		}
		}
		callback(b);
	});
}
