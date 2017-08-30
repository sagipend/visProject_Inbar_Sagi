function getCountry() {
    d3.csv("data/medals_distribution_countries.csv", function (error, data) {
        var select = document.getElementById("country1");
        for (var i = 0; i < data.length; i++) {
            var a = document.createElement("a");
            a.setAttribute("href", "#");
            a.setAttribute("id", i)
            a.addEventListener("click", function () {
                visualize(this.id)
            });
            a.setAttribute("value", data[i].country);
            var span = document.createElement("span");
            span.appendChild(document.createTextNode(data[i].country));
            a.appendChild(span);
            select.appendChild(a)
        }
    });
}

function visualize(id) {
    d3.selectAll("svg").remove();
    d3.select(".selectionChord").style("display", "none");
    d3.selectAll("#vis").attr("height", "0");
    d3.selectAll("svg").remove();
    d3.select("#vis3").remove();
    d3.select("#vis4").remove();
    d3.select("#vis5").remove();
    d3.select("#vis6").remove();
    d3.select("#vis7").remove();

    var c = document.getElementById(id).getAttribute("value");
    d3.select("#title").select("text").text("Medals-distribution of " + c);
    document.getElementById("title").style.marginTop = "0";
    document.getElementById("title").style.marginLeft = "33.5%";
    document.getElementById("vis").style.marginLeft = "0";
    document.getElementById("vis").style.marginTop = "0";


    var margin = { top: 20, right: 400, bottom: 30, left: 20 },
        width = 4000,
        height = 1000;
    width = width;
    height = height;


    d3.select(".container")
        .attr('width', 3 * width)
        .attr('height', height)

    d3.select("#vis")
        .attr('width', width)
        .attr('height', height)
        .attr("transform", "translate(" + -200 + "," + 0 + ")")
        .attr('align', "left");


    var svg = d3.select("#vis")
        .append('svg')
        .attr('width', width - margin.left - margin.right - 2500)
        .attr('height', height - margin.left - margin.right)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")



    var g = svg.append("g")
        .attr("transform", "translate(" + parseInt(margin.left + 10) + "," + margin.top + ")")
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
        for (i = 1, t = 0; i < columns.length - 1; ++i)
            t += d[columns[i]] = +d[columns[i]];
        d.total = t;
        return d;
    }

    ////////////////
    ////////////////
    ////////////////
    /*Donuts Chart*/
    ////////////////
    ////////////////
    ////////////////

    // margin
    var margin2 = { top: 20, right: 20, bottom: 20, left: 20 },
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
                console.log(element.country + " " + c);
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

        // append path 
        g2.append("path")
            .attr("d", arc2)
            .style("fill", function (d) { return color(d.data.sport); })
            .transition()
            .ease(d3.easeLinear)
            .duration(2000)
            .attrTween("d", tweenDonut);


        // append text
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
                    console.log("Here!");
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
