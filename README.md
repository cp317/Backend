# Backend
## School Name Matching

// function 1: get any school name that contains the given school name or is contained within the given school name

// ex. ("Laurier" == "wilfrid laurier university")

function get_name_substr(school_name)

{

var s = []; // array to hold all the matching school names

return s;

}

// function 2: check if the name is an acronym or can be reduced to an acronym ("wilfrid laurier university" == "wlu")
// needs to check with or without "of" ("University of Waterloo" == "UW") but ("University of Toronto" == "UFT")
function get_name_acr(school_name)
{
var s = []; // array to hold all the matching school names

return s;
}

// function 3: names that have a spelling mistake (missing letter or switched order of letters)
// take parameter for acceptable variance, variance=1 -> one missing letter, vaiance=2 -> two missing letters, etc
// ex. ("laurer" == "laurier") and ("luarier" == "laurier")
function get_name_spl(school_name, variance)
{
var s = []; // array to hold all the matching school names

return s;
}

// function 4: get any beacons with the same course code within the given radius
function get_nearby_beacons(radius, course)
{
	var b = []; // array to hold all the matching beacons
  
  return b;
}
