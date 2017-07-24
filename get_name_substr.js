var database=firebase.database();                                         //access database
main();

//sample run
function main(){                                                           //its main function to test the get_name_substr function
	var school_name= prompt('enter school: ');                                      
	get_name_substr(school_name,function(t){
		document.body.innerHTML += "Searched school name<b></li>" ;
		for (var tx in t){
			document.body.innerHTML+= '<li>'+ t[tx].school+"</b></li>";
		}
	
	});
}

// function 1: get any school name that contains the given school name or is contained within the given school name
// ex. ("Laurier" == "wilfrid laurier university")
// assigned to: huix9380@mylaurier.ca

function get_name_substr(school_name,callback)
{ 
	var s=database.ref('/beacon/').once('value').then(function(b){
		var uppcase=school_name.toUpperCase();                                          // make the parameter uppercase and its called uppcase
		var len=uppcase.length;
		var camp;
		var t =[];
		var temp;
		var flag = false;
		//alert('agg');
		if (uppcase !='university' && uppcase != 'of'){                                 // make sure when the user input university and of, it return nothing.
			for(var i in b.val()){
				if (b.val()[i].school != undefined){                                   
					camp=b.val()[i].school.toUpperCase();                                // making the string to uppercase
					if (camp==uppcase){                                                            
						flag= true;
					}
					temp=camp.split(' ');                                                // splitting the string 
					for (var tx in temp){
						if (temp[tx].toUpperCase()==uppcase){                            // comparing the string
							flag = true;
						}	
					}
					if (flag == true){                                                     // if string contains the given school name, then this string will be pushed into array.
						t.push(b.val()[i]);
						flag = false;
					}
				}
			}
		}
		callback(t);
	});	
			
					
}
