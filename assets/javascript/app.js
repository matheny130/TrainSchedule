
var config = {
  apiKey: "AIzaSyDD5IflXNnM-nXyzrdOFpZEzcTgNg5Hh48",
  authDomain: "trainschedule-6de71.firebaseapp.com",
  databaseURL: "https://trainschedule-6de71.firebaseio.com",
  projectId: "trainschedule-6de71",
  storageBucket: "",
  messagingSenderId: "372759024250"
  };
firebase.initializeApp(config);

var database = firebase.database();



$("#submit").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var time = $("#firstTrainInput").val().trim();
  var frequency = $("#frequencyInput").val().trim();


  var newTrain = {
    name: trainName,
    dest: destination,
    first: time,
    freq: frequency
  }

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var time = childSnapshot.val().first;
  var name = childSnapshot.val().name;
  var dest = childSnapshot.val().dest;
  var frequency = childSnapshot.val().freq;




  console.log(name);
  console.log(dest);
  console.log(time);
  console.log(frequency);





  var timeConverted = moment(time, "HH:mm").subtract(1, "years");
  console.log(timeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(timeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var remain = diffTime % frequency;
  console.log(remain);

  var minutesTill = frequency - remain;
  console.log("MINUTES TILL TRAIN: " + minutesTill);

  var nextTrain = moment().add(minutesTill, "minutes").format("hh:mm A");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

  console.log(childSnapshot.val().nextTrain);
  console.log(childSnapshot.val().minutesTill);

  $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minutesTill + "</td><td>");
});