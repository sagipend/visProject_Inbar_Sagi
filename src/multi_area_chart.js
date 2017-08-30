function top25() {
  var num = 0;
  var num2 = 0;

  var margin = { top: 15, right: 15, bottom: 20, left: 40 };
  width = 2500 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;
  width = width / 15;
  height = height / 15;


  d3.select("#vis").attr("width", "1176px")
    .attr('transform', 'translate(' + -100 + ',' + 20 + ')');
  // set the ranges
  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // define the line
  var valueline = d3.line()
    .x(function (d) { return x(d.key); })
    .y(function (d) { return y(d.value); });

  // get the data
  d3.csv("data/olympics.csv", function (error, data) {
    if (error) throw error;
    var contries = getCountries(data);
    var contries2 = [];
    for (var i = 0; i < contries.length; i++) {
      contries2.push({ "country": contries[i], "SUM": getCountriesOrderdByMedals(data, contries[i]) });
    }

    contries2.sort(function (a, b) {
      return b.SUM - a.SUM;
    });

    var t = 0;
    contries2.forEach(function (element) {
      if (contries2.indexOf(element) < 25) {
        func(data, element.country, t);
        t++
      }
    }, this);
  });

  var getCountries = function (data) {
    var ret = [];
    data.forEach(function (d) {
      if (ret.indexOf(d.country) == -1)
        ret.push(d.country);
    });
    return ret;
  };
  var getCountriesOrderdByMedals = function (data, con) {
    var sum = 0;
    data.forEach(function (d) {
      if (d.country == con)
        sum++;
    });
    return sum;
  }

  var func = function (data, con, t) {
    var nest = d3.nest()
      .key(function (d) {
        return d.year;
      })
      .rollup(function (country) {
        var sum = 0;
        country.forEach(function (d) {
          if (d.country == con) {
            sum += 1;
          }
        });
        return sum;
      })
      .entries(data);
    x.domain(d3.extent(nest, function (d) { return d.key; }));
    y.domain([0, 382]);

    var yscale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 382]);

    var xscale = d3.scaleLinear()
      .range([0, width])
      .domain([0, 2008]);

    var indexies = d3.range(0, nest.length);
    var area = d3.area()
      .x(function (d) {
        return x(nest[d].key);
      })
      .y0(height)
      .y1(function (d) {
        return yscale(nest[d].value)
      })

    var svg = d3.select("#vis").append("svg")
      .attr("width", width + margin.left + margin.right + num)
      .attr("height", height + margin.top + margin.bottom + num2)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    num += 0.5;
    if (num >= width) {
      num2 += 0.5;
    }
    svg.append('path')
      .datum(indexies)
      .attr('class', 'area')
      .attr('fill', '#289E13')
      .attr("stroke", "#12410B")
      .attr('stroke-width', 0.1)
      .attr('d', area);


    svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("text-decoration", "underline")
      .text(con);


    if (t == 0) {
      // add the Y Axis
      svg.append("g")
        .call(d3.axisLeft(y).tickValues(y.domain()));
      // add the X Axis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues(x.domain()));
    }
    else {
      svg.append("g")
        .call(d3.axisLeft(y).ticks(0));
      // add the X Axis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(0));
    }

    svg.append("path")
      .data([nest])
     .attr("fill","none")
     .attr("stroke", "#096638 0.5px")
      .attr("d", valueline);

  }
}