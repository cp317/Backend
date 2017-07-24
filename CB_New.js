/**
 * Created by Ricosapple on 2017-07-23.
 */
var database = firebase.database();


main();

// gets user input to create the beacon
function main()
{
    //Input
    var course = prompt("Please enter your course code:");
    var start_time = prompt("Please enter the time you want to start the beacon: ");
    var end_time = prompt("Please enter the time you want to close the beacon: ");

    //Get the current time
    var t = new Date().getTime();

    //Call the checking function
    var check = validation(course,start_time,end_time,t);

    //Decide if the input is valid
    if(check == true) {
        document.body.innerHTML = course.toUpperCase().replace(/\s+/g,"");
        document.body.innerHTML = "beacon created successfully!";
    }
    else{
        document.body.innerHTML = "fail to create beacon!";
    }
}


function validation(course,start_time,end_time,t)
{

    var invalid = 0;

    //Course_code empty check
    if(course ==""){
        invalid +=1;
    }


    var s = Math.round((start_time/1000)%60);
    var m = Math.round(((start_time/(1000*60))%60));
    var h  = Math.round(((start_time/(1000*60*60))%24))-5;

    //Start_time empty check
    if(start_time == ""){
        invalid +=1;
    }
    //Start_time should not smaller than the current time
    else if(start_time < t){
        invalid +=1;
    }
    //Start_time format check
    else if(h>24 || m>59 || s>59){
        invalid +=1;
    }

    var s1 = Math.round((end_time/1000)%60);
    var m1 = Math.round(((end_time/(1000*60))%60));
    var h1 = Math.round(((end_time/(1000*60*60))%24))-5;


    //End time empty check
    if(end_time == ""){
        invalid +=1;
    }
    //End_time should not smaller tha the start_time
    else if(end_time < start_time){
        invalid +=1;
    }
    //End_time format check
    else if(h1>24 || m1>59 || s1>59){
        invalid +=1;
    }

    //final check
    if(invalid != 0){
        return false;
    }
    else{
        return true;
    }

}

