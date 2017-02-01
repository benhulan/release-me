
/* Replace with database code after determining data structure */
  $('#submitButton').on('click', function(){
    message = "<p>Something went wrong with your form entry. Can you try again?</p>"
    if(currentMiles != undefined){
      localStorage.setItem('currentMiles', currentMiles);
      localStorage.setItem('message', '');
    } else {
      localStorage.setItem('message', message);
      $("#answer").html(message);    }
    if (targetMiles != undefined){
      localStorage.setItem('targetMiles', targetMiles);
      localStorage.setItem('message','');
    } else {
      localStorage.setItem('message', message);
      $("#answer").html(message);
    }
    if (averageDailyMiles != undefined){
      localStorage.setItem('averageDailyMiles', averageDailyMiles);
      localStorage.setItem('message', '');
    } else {
      localStorage.setItem('message', message);
      $("#answer").html(message);    }
  });

  $(document).ready(function() {
      $('#nav_index').addClass("active");
      if (localStorage.daysLeft) {
        $("#result").html("<p>You have " + localStorage.daysLeft + " days left on your lease.</p>");
      }
      if(localStorage.message == "<p>Something went wrong with your form entry. Can you try again?</p>") {
         $("#answer").html(message); 
      } else if (localStorage.averageDailyMiles) {        
        $("#answer").html("<p>Your current mileage is " + localStorage.currentMiles + " and your lease ends at " + localStorage.targetMiles + " miles so you need to drive less than  " + localStorage.averageDailyMiles + " miles per day.</p>");
      }
  });



var service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
  {
    origins: [origin1, origin2],
    destinations: [destinationA, destinationB],
    travelMode: google.maps.TravelMode.DRIVING,
    transitOptions: TransitOptions,
    unitSystem: UnitSystem,
    durationInTraffic: Boolean,
    avoidHighways: Boolean,
    avoidTolls: Boolean,
  }, callback);

function callback(response, status) {
  // See Parsing the Results for
  // the basics of a callback function.
}