function dotsMatrix() {
    const margin = { top: 40, right: 0, bottom: 100, left: 50 },
        width = 800 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom,
        gridSize = Math.floor(width / 60),
        legendElementWidth = gridSize * 2,
        buckets = 9,
        colors = [" #e7e4f9 ", "#7c63fa"],
        days = ["Aquatics", "Archery", "Athletics", "Badminton", "Baseball", "Basketball", "Basque Pelota", "Boxing", "Canoe", "Canoe / Kayak", "Cricket", "Croquet", "Cycling", "Equestrian", "Fencing", "Football", "Golf", "Gymnastics", "Handball", "Hockey", "Ice Hockey", "Jeu de paume", "Judo", "Lacrosse", "Modern Pentathlon", "Polo", "Rackets", "Roque", "Rowing", "Rugby", "Sailing", "Shooting", "Skating", "Softball", "Table Tennis", "Taekwondo", "Tennis", "Triathlon", "Tug of War", "Volleyball", "Water Motorsports", "Weightlifting", "Wrestling"];
    times = [1896, 1900, 1904, 1908, 1912, 1920, 1924, 1928, 1932, 1936, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012];

    dataset = ["data/dots_matrix.csv"];


    d3.select("#vis").attr('transform', 'translate(' + 200 + ',' + -10 + ')')

    const svg = d3.select("#vis").append("svg")
        .attr("width", 1.8 * width + margin.left + margin.right)
        .attr("height", height / 1.9 + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + parseInt(500 + parseInt(margin.left)) + "," + margin.top + ")");

    const dayLabels = svg.selectAll(".dayLabel")
        .data(days)
        .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", (d, i) => i * gridSize)
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", (d, i) => ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"));



    const timeLabels = svg.selectAll(".timeLabel")
        .data(times)
        .enter().append("text")
        .text((d) => d)
        .attr("y", (d, i) => i * gridSize + 8)
        .attr("x", 20)
        .style("-moz-transform", "rotate(-90deg)")
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + gridSize / 2 + ", -5)")
        .attr("class", (d, i) => ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"));

    svg.select(".timeLabel mono axis")
        .style("-moz-transform", "rotate(-90deg)");

    const heatmapChart = function (csvFile) {
        d3.csv(csvFile, (error, data) => {
            var myData = [];
            for (var i = 0; i < data.length; i++)
                myData.push({ sport: data[i].sport, year: String(data[i].year), value: 1 });

            var length = myData.length;
            var i = 0;
            while (i < length) {
                for (y = 1896; y <= 2012; y += 4) {
                    if (y != 1916 && y != 1940 && y != 1944) {
                        if (parseInt(myData[i].year) != y) {
                            myData.push({ sport: myData[i].sport, year: String(y), value: 0 })
                        }
                        else {
                            if (i != length - 1 && myData[i].sport != myData[i + 1].sport && y < 2012 && y != 1896) {
                                y += 4;
                                while (y <= 2012) {
                                    if (y != 1916 && y != 1940 && y != 1944)
                                        myData.push({ sport: myData[i].sport, year: String(y), value: 0 })
                                    y += 4;
                                }
                                y -= 4;
                            }
                            i++;
                        }
                    }
                }
            }

            const colorScale = d3.scaleQuantile()
                .domain([0, 1])
                .range(colors);

            const cards = svg.selectAll(".hour")
                .data(myData);
            cards.append("title");

            cards.enter().append("rect")
                .attr("x", function (d) {
                    return (times.indexOf(parseInt(d.year))) * gridSize
                })
                .attr("y", function (d) {
                    return (days.indexOf(d.sport)) * gridSize
                })
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("class", "hour bordered")
                .attr("width", gridSize)
                .attr("height", gridSize)
                .style("fill", colors[0])
                .merge(cards)
                .transition()
                .duration(1000)
                .style("fill", function (d) {
                    return colorScale(d.value);
                })
            cards.select("title").text((d) => d.value);

            cards.exit().remove();

            const legend = svg.selectAll(".legend")
                .data([0].concat(colorScale.quantiles()), (d) => d);

            const legend_g = legend.enter().append("g")
                .attr("class", "legend");

            legend_g.append("rect")
                .attr("x", (d, i) => legendElementWidth * i + 130)
                .attr("y", height / 1.65)
                .attr("width", legendElementWidth)
                .attr("height", gridSize)
                .style("fill", (d, i) => colors[i])
                .style("stroke", "black");

            legend_g.append("text")
                .attr("class", "mono")
                .text(function (d) {
                    if (d == 0)
                        return "No";
                    return "Yes";
                })
                .attr("x", (d, i) => legendElementWidth * i + 132)
                .attr("y", height / 1.65 + gridSize + 8)

            legend.exit().remove();

            var tooltip = d3.select("#vis")
                .append('div')
                .attr('class', 'tooltip5');

            tooltip.append('div')
                .attr('class', 'sport');
            tooltip.append('div')
                .attr('class', 'year2');

            svg.selectAll("rect")
                .on('mouseover', function (d, i) {
                    if (d.value == 1) {
                        var rect = d3.select(this);
                        rect.style("fill", "  #f9f95b  ");
                        tooltip.select('.sport').html("<b>Sport: " + d.sport + "</b>");
                        tooltip.select('.year2').html("<b>Year: " + d.year + "</b>");
                        tooltip.style('display', 'block');
                        tooltip.style('opacity', 2);
                    }
                })
                .on('mousemove', function (d) {
                    tooltip.style('top', (d3.event.layerY + 10) + 'px')
                        .style('left', (d3.event.layerX - 25) + 'px');
                })
                .on('mouseout', function (d) {
                    if (d.value == 1) {
                        var rect = d3.select(this);
                        rect.style("fill", "#7c63fa");
                    }
                    tooltip.style('display', 'none');
                    tooltip.style('opacity', 0);
                })
        });
    };
    heatmapChart(dataset[0]);
}