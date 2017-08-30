
function bubbles() {
  var top5 = [];
  function bubbleChart() {
   
    var width = 1000;
    var height = 650;

    var tooltip = floatingTooltip('tooltip', 240);

    var center = { x: width / 2.5, y: height / 2.5 };

    var forceStrength = 0.03;

    var svg = null;
    var bubbles = null;
    var nodes = [];

    
    function charge(d) {
      return -Math.pow(d.radius, 2.0) * forceStrength;
    }

    var simulation = d3.forceSimulation()
      .velocityDecay(0.2)
      .force('x', d3.forceX().strength(forceStrength).x(center.x))
      .force('y', d3.forceY().strength(forceStrength).y(center.y))
      .force('charge', d3.forceManyBody().strength(charge))
      .on('tick', ticked);

    var fillColor = d3.scaleOrdinal()
      .domain(['low', 'medium', 'high'])
      .range(['#d84b2a', '#beccae', '#7aa25c']);

    function createNodes(rawData) {
           var maxAmount = d3.max(rawData, function (d) {
        console.log(d.sum);
        return +d.sum;
      });
      console.log(maxAmount);
       var radiusScale = d3.scalePow()
        .exponent(0.5)
        .range([2, 85])
        .domain([0, maxAmount * 0.9]); ///////////// SIZE OF EACH BUBBLR !!!!!

       var myNodes = rawData.map(function (d) {
        return {
          // id: d.id,
          radius: radiusScale(+d.sum),
          value: +d.sum,
          country: d.country,
          medals: d.medals,
          x: Math.random() * 900,
          y: Math.random() * 800
        };
      });
      myNodes.sort(function (a, b) { return b.value - a.value; });

      return myNodes;
    }

     var chart = function chart(selector, rawData) {
      console.log(JSON.stringify(rawData));
      nodes = createNodes(rawData);

      svg = d3.select(selector)
        .append('svg')
        .attr('width', width)
        .attr('height', height)

        bubbles = svg.selectAll('.bubble')
        .data(nodes, function (d) { return d.country; })
        .enter()
        .append("g");

      var color = d3.scaleOrdinal(d3.schemeCategory20);
      var bubblesE = bubbles.append('circle')
        .classed('bubble', true)
        .attr('r', function (d) { return d.radius; })
        .attr('fill', function (d) { return color(d.country) })
        .attr('stroke', "White")
        .attr('stroke-width', 0.5)
        .on('mouseover', showDetail)
        .on('mouseout', hideDetail)
        .on('click', function (d) {
          console.log("click3 " + d.country);
          d3.selectAll("svg").remove();
          document.getElementById("title").style.marginTop = "0";
          document.getElementById("title").style.marginLeft = "33.5%";
          d3.selectAll("#vis").attr("height", "0");

          tooltip.hideTooltip();
          medalsOf(d.country);
        });

      bubbles.append("text")
        .attr("dx", function (d) { return -20 })
        .text(function (d) {
          var f = 0;
          top5.forEach(function (element) {
            if (element.country == d.country) {
              f = top5.indexOf(element) + 1;
            }
          }, this);
          if (f != 0) {
            return "#" + f + "\n" + d.country;
          }
          return "";
        })

      bubbles = bubbles.merge(bubblesE);
      bubbles.transition()
        .duration(2000)
        .attr('r', function (d) { return d.radius; });
      simulation.nodes(nodes);
    };
    function ticked() {
      bubbles
        .attr("transform", function (d) {
          var k = "translate(" + d.x + "," + d.y + ")";
          return k;
        })
    }

    function showDetail(d) {
      d3.select(this).attr('stroke', 'black').attr("stroke-width", "2px");
      var content = '<span class="name">Country: </span><span class="value">' +
        d.country +
        '</span><br/>' +
        '<span class="name">Medals: </span><span class="value">' +
        (d.medals) +
        '</span><br/>';

      tooltip.showTooltip(content, d3.event);
    }

    function hideDetail(d) {
      d3.select(this)
        .attr('stroke', "WHITE").attr('stroke-width', "0.5px");
      tooltip.hideTooltip();
    }
    return chart;
  }
  var myBubbleChart = bubbleChart();

  function display(error, data) {
    if (error) {
      console.log(error);
    }
    var temp = [];
    var temp2 = [];
    data.forEach(function (element) {
      temp.push({ country: element.country, sum: 3 * parseInt(element.gold) + 2 * parseInt(element.silver) + 1 * parseInt(element.bronze), medals: parseInt(element.gold) + parseInt(element.silver) + parseInt(element.bronze) });
      temp2.push({ country: element.country, sum: 3 * parseInt(element.gold) + 2 * parseInt(element.silver) + 1 * parseInt(element.bronze),medals: parseInt(element.gold) + parseInt(element.silver) + parseInt(element.bronze) });
    }, this);
    temp.sort(function (a, b) { return a.sum - b.sum });
    top5 = [temp.pop(), temp.pop(), temp.pop(), temp.pop(), temp.pop()];

    myBubbleChart('#vis', temp2);
  }

  function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }

    return x1 + x2;
  }

  // Load the data.
  d3.csv('data/bubbles.csv', display);

  function medalsOf(c) {
    document.getElementById("vis").style.marginLeft = "0";
    d3.select("#title").select("text").text("Medals-distribution of " + c);
    document.getElementById("title").style.marginTop = "0";
    document.getElementById("title").style.marginLeft = "33.5%";

    var margin = { top: 0, right: 400, bottom: 30, left: 20 },
      width = 4000,
      height = 1000;
    width = width;
    height = height;


    d3.select(".container")
      .attr('width', 3 * width)
      .attr('height', height)

    d3.select("#vis")
      .attr('width', width-3000)
      .attr('height', height)
      .attr("transform", "translate(" + -200 + "," + 0 + ")")
      .attr('align', "left");


    var svg = d3.select("#vis")
      .append('svg')
      .attr('width', width - margin.left - margin.right -2500)
      .attr('height', height - margin.left - margin.right)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")



    var g = svg.append("g")
      .attr("transform", "translate(" + parseInt(margin.left + 10) + "," + parseInt(margin.top + 5) + ")")
      .attr('width', width)
      .attr('height', height);

      var x = d3.scaleBand()
      .rangeRound([0, width / 4.3])
      .padding(0.15)

    var x2 = d3.scaleLinear().range([0, width / 2]);

    var y = d3.scaleLinear()
      .rangeRound([height / 2, 0]);


    var z = d3.scaleOrdinal(d3.schemeCategory20);

    var stack = d3.stack();

    d3.csv("data/stacked-bar-chart.csv", type, function (error, data) {
      if (error) throw error;
      var myData = [];
      data.forEach(function (element) {
        if (element.country == c) {
          myData.push(element);
        }
      }, this);

      var flag = false;

      for (var i = 1896; i <= 2012; i += 4) {
        for (var j = 0, flag = false; j < myData.length; j++) {
          if (myData[j].year == i) {
            flag = true;
            j = myData.length;
          }
        }
        if (flag == false) {
          myData.push({ year: i, bronze: 0, gold: 0, silver: 0 });
        }
      }
      myData.columns = ["year", "gold", "silver", "bronze", "country"];
      myData.sort(function (a, b) { return a.year - b.year });

      x.domain(myData.map(function (d) { return d.year; }));

      x2.domain(d3.extent(myData, function (d) { return d.year; }));

      y.domain([0, d3.max(myData, function (d) { return d.total; })]).nice();
      z.domain(myData.columns.slice(1));

      g.selectAll(".serie")
        .data(stack.keys(myData.columns.slice(1))(myData))
        .enter().append("g")
        .attr("class", "serie")
        .attr("fill", function (d) {
          console.log("Bronza! " + d.key);
          if (d.key == "gold") {
            return "#FFD700";
          } else if (d.key == "silver") {
            return "#C0C0C0"
          }
          if (d != "country")
            return "#cd7f32"
          return "";
        })
        .selectAll("rect")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("x", function (d) { return x(d.data.year); })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth());

      // add the Y Axis
      g.append("g")
        .call(d3.axisLeft(y).ticks(5))
        .append("text")
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .attr("transform", "translate(" + -10 + "," + -10 + ")")
        .attr("fill", "#000")
        .text("Medals");

      // add the X Axis
      g.append("g")
        .attr("transform", "translate(0," + height / 2 + ")")
        .call(d3.axisBottom(x).ticks())


      var legend = g.selectAll(".legend")
        .data(myData.columns.slice(1).reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(0," + (i - 1) * 10 + ")"; })
        .style("font", "10px sans-serif");

      legend.append("rect")
        .attr("x", width / 4.5)
        .attr("width", function (d) {
          if (d != "country")
            return 12;
          return 0;
        })
        .attr("height", function (d) {
          if (d != "country")
            return 12;
          return 0;
        })
        .attr("fill", function (d) {
          if (d == "gold") {
            return "#FFD700";
          } else if (d == "silver") {
            return "#C0C0C0"
          }
          if (d != "country")
            return "#cd7f32"
          return "";
        });

      legend.append("text")
        .attr("x", width / 4.8)
        .attr("y", 6.5)
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .text(function (d) {
          if (d == "gold")
            return "Gold";
          if (d == "silver")
            return "Silver";
          if (d == "bronze")
            return "Bronze";
          return "";
        });
    });

    function type(d, i, columns) {
      console.log(JSON.stringify(columns));
      for (i = 1, t = 0; i < columns.length - 1; ++i)
        t += d[columns[i]] = +d[columns[i]];
      d.total = t;
      return d;
    }

    ////////////////
    ////////////////
    //Donut Chart///
    ////////////////
    ////////////////

    var margin2 = { top: 0, right: 20, bottom: 20, left: 20 },
      width2 = 300 - margin2.right - margin2.left,
      height2 = 300 - margin2.top - margin2.bottom,
      radius = width2 / 3.2;

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var arc2 = d3.arc()
      .outerRadius(radius + 80)
      .innerRadius(radius - 55);

    var labelArc = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius)

    var pie = d3.pie()
      .sort(null)
      .value(function (d) { return d.count; });

    var vis2 = d3.select("body")
      .append("div")
      .attr("id", "vis2");

    var svg2 = vis2.append("svg")
      .attr("width", "373px")
      .attr("height", height2 * 2)
      .append("g")
      .attr("transform", "translate(" + width2 / 1.5 + "," + height2 / 1.5 + ")");

    var tooltip = d3.select("body")
      .append('div')
      .attr('class', 'tooltip2')
      .attr('id', 'tooltip2')
    tooltip.append('div')
      .attr('class', 'lable')
    tooltip.append('div')
      .attr('class', 'count');

    var sum = 0;
    var top5 = [];

    d3.csv("data/donuts.csv", function (error, data) {
      if (error) throw error;

      var myData = [];
      data.forEach(function (element) {
        if (element.country == c) {
          sum += parseInt(element.count);
          myData.push({ sport: element.sport, count: element.count });
        }
      }, this);

      data = myData.sort(function (a, b) { return a.count - b.count })

      var temp = []
      data.forEach(function (element) {
        temp.push(element);
      }, this);

      data.sort(function (a, b) { return a.count - b.count });

      temp.sort(function (a, b) { return a.count - b.count });
      if (temp.length >= 5)
        top5 = [temp.pop(), temp.pop(), temp.pop(), temp.pop(), temp.pop()];
      data.forEach(function (d) {
        d.count = +d.count;
        d.sport = d.sport;
      })

      var g2 = svg2.selectAll(".arc2")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc2");

      g2.append("path")
        .attr("d", arc2)
        .style("fill", function (d) { return color(d.data.sport); })
        .transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .attrTween("d", tweenDonut);

      g2.append("text")
        .transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .attr("transform", function (d) { return "translate(" + labelArc.centroid(d) + 20 + ")"; })
        .attr("dy", ".35em")
        .text(function (d) {
          var f = 0;
          top5.forEach(function (element) {
            if (element.sport == d.data.sport) {
              f = top5.indexOf(element) + 1;
            }
          }, this);
          if (f != 0) {
            return "#" + f + "\n" + d.data.sport;
          }
          return "";
        });

        g2.on("mouseover", function (d) {
        var percent = Math.round(1000 * d.data.count / sum) / 10;
        tooltip.select('.lable').html(d.data.sport);
        tooltip.select('.count').html(percent + "%");
        tooltip.style('display', 'block');
      });

      g2.on("mouseout", function (d) {
        tooltip.style('display', 'none');
      });

    });

    // Helper function for animation of pie chart and donut chart
    function tweenPie(b) {
      b.innerRadius = 0;
      var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
      return function (t) { return arc(i(t)); };
    }

    function tweenDonut(b) {
      b.innerRadius = 0;
      var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
      return function (t) { return arc2(i(t)); };
    }
  }
}

