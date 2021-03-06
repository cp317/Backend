/*
function name: get_name_acr_of
input: the acronym of the school 
output: the corresponding school in database

function name: get_name_acr_no_of
input: the acronym of the school
output: the corresponding school in database(searched with no 'of' in input)
*/

// Get a reference to the database service
var database = firebase.database();

main();


function main(){
		var school_name = prompt("enter school: ").toUpperCase();

		
		get_name_acr_of(school_name,function(t){
			for(var i in t){
				document.body.innerHTML += "<p>"+ t[i]+"</p>"
			}
		});
		
		get_name_acr_no_of(school_name,function(t){
			for(var i in t){
				document.body.innerHTML += "<p>"+ t[i]+"</p>"
			}
		});
		
		
}

function get_name_acr_no_of(school_name,callback){
	
	var all_schools = [];
	//check whether the school_name contains 'of'
	var new_name = "";
	var split_name = school_name.split("OF");
	for (var i in split_name){
		new_name += split_name[i];
	}

	//search without 'of'
	if(school_name != new_name){
		get_name_acr_aux(new_name,function(t){
			for(var i in t){
					all_schools.push(t[i]);
			}
			all_schools = remove_duplication(all_schools);
			callback(all_schools);
		});
	}
}

function get_name_acr_of(school_name,callback){
	
	var all_schools = [];
	get_name_acr_aux(school_name,function(t){
		for(var i in t){
			all_schools.push(t[i]);
		}
		all_schools = remove_duplication(all_schools);
		callback(all_schools);
	});

}

function get_name_acr_aux(school_name,callback)
{

	// get all the beacons from the database
	database.ref('/beacon/').once('value').then(function(b)
	{
		var schools = [];
		// iterate through each beacon
		for (var i in b.val())
		{
			//schools may be undefined in database
			if (b.val()[i].school != undefined){
				var acr_names = get_acr(b.val()[i].school);
				for (var j in acr_names){
					if(acr_names[j] == school_name){
						schools.push(b.val()[i].school);
					}
				}
			}
		}
		callback(schools);
	});
}

// the function returns an array of acronyms
function get_acr(school_name){
	//init the array
	var acr_names = [];
	var split_name = school_name.split(" ");
	var acr = "";
	var flag = false;

	//push the acronym to acr_names and check whether the name contains 'of' or not
	for (var i in split_name){
		acr += split_name[i][0]
		if(split_name[i].toUpperCase() == "OF"){
			flag = true;
		}
	}

	acr_names.push(acr.toUpperCase());
	acr = "";

	//push the new acronym without 'of', if the flag is set to true
	if(flag){
		for (var i in split_name){
			if(split_name[i].toUpperCase() != "OF"){
				acr += split_name[i][0]
			}
		}
		acr_names.push(acr.toUpperCase());
	}

	return acr_names;
}

function remove_duplication(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
}
