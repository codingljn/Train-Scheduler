$(document).ready(function(){
// Start Firebase
var config = {
    apiKey: "AIzaSyDmMpJG6LCLl2lRpv5HuIMHy-ivJBGHof0",
    authDomain: "database-f73a9.firebaseapp.com",
    databaseURL: "https://database-f73a9.firebaseio.com",
    projectId: "database-f73a9",
    storageBucket: "database-f73a9.appspot.com",
    messagingSenderId: "355349092683"
  };
  
firebase.initializeApp(config);

// Create a variable to reference the database
  
var database = firebase.database();

// Button to add more trains

$("#add-new-train").on("click", function(event) {
    event.preventDefault(); // Prevents page from refreshing

// Capture user input
var tName = $("#tname").val().trim();
var tDest = $("#destination").val().trim();
var tTime = $("#ttime").val().trim();
var tFreq = $("#freq").val().trim();

// Creates local object (temporary) to store train data
var newTrain = {
    name: tName,
    dest: tDest,
    time: tTime,
    freq: tFreq
};

// Send new train data to Firebase database
database.ref().push(newTrain);

// Clears input boxes
$("#tname").val("")
$("#destination").val("");
$("#ttime").val("")
$("#freq").val("")

});

// Creates Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, html) {
 
// Stores everything into a variable.
  var tName = childSnapshot.val().name;
  var tDest = childSnapshot.val().dest;
  var tTime = childSnapshot.val().time;
  var tFreq = childSnapshot.val().freq;

// Moment.js and math

  var momentTrain = moment(tTime, "HH:mm").subtract("1, years"); // subtract 1yr to make sure train doesn't arrive before current time as covered in class

// Current time
  var currentTime = moment();
//   console.log("Current time: " + currentTime);

// Difference between times  
  var diffTime = moment().diff(moment(momentTrain), "minutes");
//   console.log("Diff in time: " + diffTime);

// Time apart (remainder)
  var tRemainder = diffTime % tFreq;
//   console.log("Remainder: " + tRemainder);

// Minutes until next Train
  var tMinstillTrain = tFreq - tRemainder;
//   console.log("Mins till train: " + tMinstillTrain);

// Next train
  var nextTrain = moment().add(tMinstillTrain, "minutes").format("hh:mm a");
//   console.log("Arrival time: " + nextTrain);

// Dynamically add Train data and calculated values to the train schedule
$("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" + tFreq + "</td><td>" + nextTrain + "</td><td>" + tMinstillTrain + "</td><tr>");

});

});
