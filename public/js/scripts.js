var currentMiles, targetMiles, remainingMiles, averageDailyMiles;
  var today = new Date();
  var diffDays;
  var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec");

  var curr_date = today.getDate();
  var curr_month = today.getMonth();
  var curr_year = today.getFullYear();

  $("#leaseDate").datepicker();
  var resultString = "";

  var daysLeft = function() {
    var a = $( "#leaseDate" ).datepicker('getDate').getTime();
    var tempDate = new Date(a);
    localStorage.setItem('endDate', tempDate.toDateString());
    var b = today.getTime();
    var c = 24*60*60*1000, // hours per day, minutes per hour, seconds per minute, ms per sec
    diffDays = Math.round((a - b)/c);
    if (diffDays < 0 ) {
      resultString = "<p>Please pick a date in the future.</p>";
    } else {
      resultString = ("<p>You have " + diffDays + " days left on your lease.</p>");
      localStorage.setItem('daysLeft', diffDays);
      daysData.push({"label": "Used", "value":diffDays});
      daysData.push({"label": "Remaining", "value":(threeYears - diffDays)});
    } return diffDays;
  };


  $("#submitButton").on("click", function(){
    daysLeft();
    currentMiles = $("#currentMiles").val();
    targetMiles = $("#targetMiles").val();
    remainingMiles = (targetMiles - currentMiles);
    averageDailyMiles = Math.round(remainingMiles/localStorage.daysLeft);
    $("#answer").html("<p>You need to drive less than  " + averageDailyMiles + " miles per day.</p>");
    $("#result").html(resultString);
    localStorage.setItem('currentMiles', currentMiles);
    localStorage.setItem('targetMiles', targetMiles);
    localStorage.setItem('remainingMiles', remainingMiles);
    localStorage.setItem('averageDailyMiles', averageDailyMiles);
    generateChart(daysData);
  });

  $('#startOver').on('click', function(){
    localStorage.clear();
  });

  $('#generate').on('click', function(){
    generateChart(milesData);
  });




var w = 400;
var h = 400;
var r = 160;
// var ir = 45;
var textOffset = 14;
var color = d3.scale.category20c();
var milesData = [];
var daysData = [];

var threeYears = 1092;

var generateChart = function(data){
  var vis = d3.select('#pie-chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
  var pie = d3.layout.pie().value(function(d){return d.value;});

  // declare an arc generator function
  var arc = d3.svg.arc().outerRadius(r);

  // select paths, use arc generator to draw
  var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
  arcs.append("svg:path")
      .attr("fill", function(d, i){
          return color(i);
      })
      .attr("d", function (d) {
          // log the result of the arc generator to show how cool it is :)
          console.log(arc(d));
          return arc(d);
      });

  // add the text
  arcs.append("svg:text").attr("transform", function(d){
        d.innerRadius = 0;
        d.outerRadius = r;
      return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "end").text( function(d, i) {
      return data[i].label;}
      );
};
