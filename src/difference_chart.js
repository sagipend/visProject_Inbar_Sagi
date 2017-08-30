function manWoman() {
  var num = 0;
  var num2 = 0;

  var margin = { top: 140, right: 20, bottom: 20, left: 100 };
  width = 1560 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;
  width = width / 2;
  height = height / 2;

  // set the ranges
  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // define the line
  var valueline = d3.line()
    .x(function (d) { return x(d.key); })
    .y(function (d) { return y(d.value); });

  d3.select("#vis")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

  // get the data
  d3.csv("data/olympics.csv", function (error, data) {
    if (error) throw error;
    func(data);
  });

  var func = function (data) {

    var nestWomen = d3.nest()
      .key(function (d) {
        return d.year;
      })
      .rollup(function (country) {
        var sum = 0;
        country.forEach(function (d) {
          if ( d.gender == "Women") {
            sum += 1;
          }

        });
        return sum;
      })
      .entries(data);

    var nestMen = d3.nest()
      .key(function (d) {
        return d.year;
      })
      .rollup(function (country) {
        var sum = 0;
        country.forEach(function (d) {
          if ( d.gender == "Men") {
            sum += 1;
          }

        });
        return sum;
      })
      .entries(data);

    // scale the range of the data
    x.domain(d3.extent(nestMen, function (d) { return d.key; }));
    y.domain([0, d3.max(nestMen, function (d) { return d.value; })]);

    var yscale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(nestMen, function (d) { return d.value; })]);

    var xscale = d3.scaleLinear()
      .range([0, width / 2])
      .domain([1896, 2012]);


    var myData = [
      {
        nestWomen
      },
      {
        nestMen
      }
    ];

    var indexies = d3.range(0, 27);

    var area = d3.area()
      .x(function (d) {
        return x(myData[0].nestWomen[d].key);
      })
      .y0(function (d) {
        return yscale(myData[0].nestWomen[d].value)
      })
      .y1(function (d) {
        return yscale(myData[1].nestMen[d].value)
      });

    var svg = d3.select("#vis").append("svg")
      .attr("width", 50 + width + margin.left + margin.right)
      .attr("height", 50 + height + margin.top + margin.bottom)
      .attr("class", "bgc")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    svg.append('path')
      .datum(indexies)
      .attr('class', 'area')
      .attr('fill', '#d62222')
      .attr('d', area);

    // add the Y Axis
    svg.append("g")
      .call(d3.axisLeft(y).tickValues(y.domain()))
      .attr("class", "axis")
      .append("text");

    // text label for the y axis
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2)+10)
      .style("font-size", "18px")
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Medals");


    // add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")

      .call(d3.axisBottom(x).tickValues(x.domain()))
      .attr("class", "axis");

    // text label for the x axis
    svg.append("text")
      .attr("transform", "translate(" + (width / 2) + " ," + (height - 80 + margin.top) + ")")
      .style("text-anchor", "middle")
      .style("font-size", "18px")
      .text("Years");


    svg.append("path")
      .data([nestWomen])
      .attr("class", "line")
      .attr("d", valueline);

    svg.append("text")
      .attr("transform", function (d) { return "translate(" + parseInt(x(2012)-45) + "," + parseInt(y(921)+17) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .style("font-size", "15px")
      .text("Women");

    svg.append("path")
      .data([nestMen])
      .attr("class", "lineM")
      .attr("d", valueline);

      svg.append("text")
      .attr("transform", function (d) { return "translate(" + parseInt(x(2012)-45) + "," + parseInt(y(1023)-30) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .style("font-size", "15px")
      .text("Men");

    const focus = svg.append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus.append('circle')
      .attr('r', 4.5);

    focus.append('line')
      .classed('x', true);

    focus.append('line')
      .classed('y', true);

    focus.append('text')
      .attr('x', 9)
      .attr('dy', '.35em');

    const focus2 = svg.append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus2.append('circle')
      .attr('r', 4.5);

    focus2.append('line')
      .classed('x2', true);

    focus2.append('line')
      .classed('y2', true);

    focus2.append('text')
      .attr('x', 9)
      .attr('dy', '.35em');


    const focus3 = svg.append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus3.append('circle')
      .attr('r', 2);

    focus3.append('line')

    focus3.append('line')

    focus3.append('text')
      .attr('x', 9)
      .attr('dy', '.35em');


    svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', function () {
        focus2.style('display', null)
        focus3.style('display', null)
        focus.style('display', null)
      })
      .on('mouseout', function () {
        focus2.style('display', 'none');
        focus3.style('display', 'none');
        focus.style('display', 'none');
      })
      .on('mousemove', mousemove)
      .attr("fill", "rgb(108, 122, 137)");

    d3.selectAll('.focus')
      .style('opacity', 0.7);

    const bisectDate = d3.bisector(d => d.key).left;

    function mousemove() {
      const x0 = x.invert(d3.mouse(this)[0]);
      const i = bisectDate(nestMen, x0, 1);
      const d0 = nestMen[i - 1];
      const d1 = nestMen[i];
      const d = x0 - d0.key > d1.key - x0 ? d1 : d0;


      const d02 = nestWomen[i - 1];
      const d12 = nestWomen[i];
      const d2 = x0 - d02.key > d12.key - x0 ? d12 : d02;

      focus.attr("transform", "translate(" + x(d.key) + "," + y(d.value) + ")");
      focus.select('line.x')
        .attr('x1', 0)
        .attr('x2', -x(d.key))
        .attr('y1', 0)
        .attr('y2', 0);

      focus.select('line.y')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', height - y(d.value));

      focus2.attr("transform", "translate(" + x(d.key) + "," + y(d2.value) + ")");
      focus2.select('line.x2')
        .attr('x1', 0)
        .attr('x2', -x(d.key))
        .attr('y1', 0)
        .attr('y2', 0);

      focus2.select('line.y2')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', height - y(d2.value));


      focus3.attr("transform", "translate(" + x(d.key) + "," + y(0) + ")");

      focus3.select('line.x3')
        .attr('x1', 0)
        .attr('x2', -x(d.key))
        .attr('y1', 0)
        .attr('y2', 0);

      focus3.select('line.y3')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', 0);

      focus.select('text').text((d.value));
      focus2.select('text').text((d2.value));
      focus3.select('text').text((d2.key)).attr("transform", "translate(" + -20 + "," + 15 + ")");;
    }
  }
}