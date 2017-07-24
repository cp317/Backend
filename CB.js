/**
 * Created by Ricosapple on 2017-07-23.
 */
var database = firebase.database();


main();

// gets user input to create the beacon
function main()
{
    var host = prompt("Please enter your name:");
    var school = prompt("Please enter your school:");
    var course = prompt("Please enter your course code:");
    var start_time = prompt("Please enter the time you want to start the beacon: ");
    var end_time = prompt("Please enter the time you want to close the beacon: ");
    var members = [];
    var tags = "0000";

    // randomly generate position and start / end time for convenience
    var lat = 43.4724 + (Math.random()-0.5);
    var lng = -80.526 + (Math.random()-0.5);

    var check = validation(course,start_time,end_time);



    if(check == false) {
        document.body.innerHTML = "failed to create beacon";
    }
    else{
        course = course.toUpperCase().replace(/\s+/g,"");
        createBeacon(school, course, start_time, end_time, host, tags, members, lat, lng);
        document.body.innerHTML = "beacon created successfully!";
    }
}


function validation(course,start_time,end_time)
{
    var invalid = 0;

    //Course_code check
    if(course ==""){
        invalid +=1;
    }


    //seperate the start time from the standard form
    var arr = start_time.split(":");
    var c = start_time.indexOf(":");

    //Start_time check
    if(start_time == ""){
        invalid +=1;
    }
    else if(c == -1){
        invalid +=1;
    }
    else if(arr[0]>24 || arr[1]>59){
        invalid +=1;
    }

    //seperate the end time from the standard form
    var arr1 = end_time.split(":");
    var c1 = end_time.indexOf(":");

    //End time check
    if(end_time == ""){
        invalid +=1;
    }
    else if(c1 == -1){
        invalid +=1;
    }
    else if(arr1[0]>24 || arr1[1]>59){
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

function createBeacon(school, course, start_time, end_time, host, tags, members, lat, lng) {
    database.ref('/beacon/').push({
        school: school,
        course: course,
        startTime: startTime,
        endTime: endTime,
        host: host,
        tags: tags,
        members: members,
        lat: lat,
        lng: lng
    });
}