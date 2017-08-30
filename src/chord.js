var chosen_sport;
var chosen_year;

function run() {
  d3.selectAll("svg").remove();
  chosen_sport = document.getElementById("Ultra").value;
  visualize2()
}


function run2() {
  d3.selectAll("svg").remove();
  chosen_year = document.getElementById("UltraYears").value;
  visualize2();
}


function chord() {
  var id = 0;
  var sports = ["Aquatics", "Archery", "Athletics", "Badminton", "Basketball", "Boxing",
     "Cycling", "Equestrian", "Fencing", "Football", "Gymnastics",
    "Handball", 'Hockey', "Judo", "Modern Pentathlon", "Rowing", "Sailing", "Shooting",
    "Table Tennis", "Taekwondo", "Tennis", "Triathlon", "Volleyball", "Weightlifting", "Wrestling"]
  var select = document.getElementById("Ultra");
  for (var i = 0; i < sports.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", sports[i]);
    option.appendChild(document.createTextNode(sports[i]));
    chosen_sport = document.getElementById("Ultra").value;
    select.appendChild(option);
  }
  chosen_year = document.getElementById("UltraYears").value;
  chosen_sport = document.getElementById("Ultra").value;

  var years = ["2008", "2012"];
  var select2 = document.getElementById("UltraYears");

  for (var i = 0; i < years.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("id", "opt1");
    option.setAttribute("value", years[i]);
    option.appendChild(document.createTextNode(years[i]));
    chosen_year = document.getElementById("UltraYears").value;
    select2.appendChild(option);
  }
}

function func(s) {
  var menu1 = document.getElementById("menu1");
  menu1.textContent = s;
}

function type(data) {
  return [data.c1, data.c2, data.c];
}


function sort(a, b) {
  if (a.c1 < b.c1)
    return -1;
  if (a.c1 > b.c1)
    return 1;
  return 0;
}


function visualize2() {
  d3.csv("data/chord.csv", function (error, data) {
    var myData = [];
    data.forEach(function (element) {
      if (element.sport == chosen_sport && element.year == chosen_year)
        myData.push([element.c1, element.c2, element.c]);
    }, this);

    var color = d3.scaleOrdinal(d3.schemeCategory20);
    var ch = viz.ch().data(myData)
      .padding(.01)
      .sort(sort)
      .innerRadius(230)
      .outerRadius(250)
      .duration(1000)
      .chordOpacity(0.3)
      .labelPadding(.03)
      .fill(function (d) { return color(d); });

    var width = 1200, height = 590;

    var svg = d3.select("#vis").append("svg").attr("height", height).attr("width", width);

    svg.append("g").attr("transform", "translate(673,319)").call(ch);

  });
}

