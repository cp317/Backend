var database = firebase.database();
main();

// sample run for function get_name_spl()
// assigned to:fanx0690@myalaurier.ca
function main()
{
	school_name = prompt("Please enter your school");
	variance= prompt("Enter variance: ");
	
	get_name_spl(school_name, variance,function(t){
		document.body.innerHTML += "Serched School Name<b></li>";
		for (var tx in t){
			document.body.innerHTML += "<li>" + t[tx].school +"</b></li>";
		}
	
	});
}


// function 3: names that have a spelling mistake (missing letter or switched order of letters)
// take parameter for acceptable variance, variance=1 -> one missing letter, vaiance=2 -> two missing letters, etc
// ex. ("laurer" == "laurier") and ("luarier" == "laurier")
// assigned to:fanx0690@myalaurier.ca

//I use callback to replace return, because firebase.once() is asynchronous call
//which means, if i use return, the main function will get nothing in the array

function get_name_spl(school_name, variance, callback)
{
var t = []; // array to hold all the beacons with matching school names
var s = database.ref('/beacon/').once('value').then(function(b) 
	{
		var ls = school_name.length;  //length of school name 
		var school = school_name.toUpperCase(); 
		var testb; //variance: school name of each serched beacon
		var lb; //length of testb
		var j;  //differnce between lb and ls
		var flag = false; // flag to show the name is matched or not
		var comp;
		//start serching
		for (var i in b.val())
		{	
			if (b.val()[i].school!= undefined){   
				testb = b.val()[i].school;
				lb = testb.length;
				j = lb - ls;
				if (j <= variance && j>= -variance){
					testb = testb.toUpperCase();
					//if school name and testb have same length
					if (j==0){
						comp = 0
						for (var m =0;m<j;m++){
							if (testb[m]!=scool[m]){
								comp++;
							}
						}
						if (comp <= variance){
							flag = true;
						}
					}
					//otherwise
					else{
						var shorter; //shorter string between school name and testb
						var longer;	//longer string between school name and testb
						var short_l; //length of shorter string
						if (j>0){
							short_l = ls
							shorter = school;
							longer = testb.toUpperCase();
						}else{
							short_l = lb;
							shorter = testb.toUpperCase();
							longer = school;
						}
					
						comp = 0;
						var ln = 0;
						var sn = 0;
						while (sn < short_l){
							if (shorter[sn] != longer[ln]){
								ln--;
								comp++;
							}
							ln++;
							sn++;
						}
						if (comp <= variance){
							flag = true;
						}
					}
				}
				//push matched beacon to array
				if (flag == true ){
					t.push(b.val()[i]);
					flag = false;
				}
			}
		}
		//callback array
		callback(t);
	});
}
