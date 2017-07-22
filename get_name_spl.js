// function 4: get any beacons with the same course code within the given radius
// assigned to: wang4060@mylaurier.ca

var database = firebase.database();
var myarray=get_nearby_beacons(2,3,40,317);
document.body.innerHTML +=myarray[0];
function get_nearby_beacons(lat, lng, radius, course)
{	var b=new Array();
	var p=0;
	 database.ref('/beacon/').val().then(function(bv)
	{
		for (var i in bv.val()){
		if (bv.val()[i].lat<lat+radius && bv.val()[i].lng<lng+radius && bv.val()[i].course_code==course){	
			document.body.innerHTML += "<li>school: <b>" + bv.val()[i].school + "</b>, course code: <b>" + bv.val()[i].course_code + "</b>, start_time: <b>" + bv.val()[i].start_time + "</b>, lat: <b>"+bv.val()[i].lat +"</b>, lng: <b>"+bv.val()[i].lng +"</b></li>";
			b.push(bv.val()[i].school);
			document.body.innerHTML +=b[p].school;
			p+=1;
			
		}
		}
	});
	return b;
}
