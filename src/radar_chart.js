function radar() {
    var width = 300,
        height = 300;

    var config = {
        w: width,
        h: height,
        maxValue: 100,
        levels: 5,
        ExtraWidthX: 300
    }

    var vis3 = d3.select("body")
        .append("div")
        .attr("id", "vis3");

    var vis4 = d3.select("body")
        .append("div")
        .attr("id", "vis4");

    var vis5 = d3.select("body")
        .append("div")
        .attr("id", "vis5");

    var vis6 = d3.select("body")
        .append("div")
        .attr("id", "vis6");

    var vis7 = d3.select("body")
        .append("div")
        .attr("id", "vis7");


    d3.csv("data/men_radar_chart.csv", function (error, data1) {
        d3.csv("data/women_radar_chart.csv", function (error, data2) {
            d3.csv("data/all_radar_chart.csv", function (error, all) {
                if (error) throw error;

                var usaM = [], gerM = [], ausM = [], chnM = [], kenM = [];
                var usaW = [], gerW = [], ausW = [], chnW = [], kenW = [];
                var usaA = [], gerA = [], ausA = [], chnA = [], kenA = [];

                data1.forEach(function (element) {
                    switch (element.country) {
                        case "USA":
                            usaM.push({ sport: element.sport, value: element.value })
                            break;
                        case "GER":
                            gerM.push({ sport: element.sport, value: element.value })
                            break;
                        case "AUS":
                            ausM.push({ sport: element.sport, value: element.value })
                            break;
                        case "CHN":
                            chnM.push({ sport: element.sport, value: element.value })
                            break;
                        case "KEN":
                            kenM.push({ sport: element.sport, value: element.value })
                            break;
                    }
                }, this);



                data2.forEach(function (element) {
                    switch (element.country) {
                        case "USA":
                            usaW.push({ sport: element.sport, value: element.value })
                            break;
                        case "GER":
                            gerW.push({ sport: element.sport, value: element.value })
                            break;
                        case "AUS":
                            ausW.push({ sport: element.sport, value: element.value })
                            break;
                        case "CHN":
                            chnW.push({ sport: element.sport, value: element.value })
                            break;
                        case "KEN":
                            kenW.push({ sport: element.sport, value: element.value })
                            break;
                    }
                }, this);


                all.forEach(function (element) {
                    switch (element.country) {
                        case "USA":
                            usaA.push({ sport: element.sport, value: element.value })
                            break;
                        case "GER":
                            gerA.push({ sport: element.sport, value: element.value })
                            break;
                        case "AUS":
                            ausA.push({ sport: element.sport, value: element.value })
                            break;
                        case "CHN":
                            chnA.push({ sport: element.sport, value: element.value })
                            break;
                        case "KEN":
                            kenA.push({ sport: element.sport, value: element.value })
                            break;
                    }
                }, this);



                var countriesM = [usaM, gerM, ausM, chnM, kenM];
                var countriesW = [usaW, gerW, ausW, chnW, kenW];
                var countries = ["USA", "GER", "AUS", "CHN", "KEN"];
                var countriesA = [usaA, gerA, ausA, chnA, kenA];

                //  countriesM.forEach(function (element) {
                for (var m = 0; m < countriesM.length; m++) {
                    var element = countriesM[m];
                    var all = countriesA[m];
                    var length1 = element.length;
                    for (var i = 0; i < all.length; i++) {
                        for (var j = 0; j < length1; j++) {

                            if (element[j].sport == all[i].sport) {
                                j = length1;
                            }
                            else if (j == length1 - 1) {
                                element.push({ sport: all[i].sport, value: 0 });
                            }
                        }
                    }

                    element.sort(function compare(a, b) {
                        if (a.sport < b.sport)
                            return -1;
                        if (a.sport > b.sport)
                            return 1;
                        return 0;
                    });
                }
                var LegendOptions = ["USA", "GER", "AUS", "CHN", "KEN"];
                var legend = d3.select("body").append("svg")
                    .attr("transform", function (d, i) { return "translate(0," + 400 + ")"; })
                    .append("g")
                    .attr("transform", function (d, i) { return "translate(0," + 30 + ")"; })
                    .selectAll(".legend")
                    .data(LegendOptions)
                    .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", function (d, i) { return "translate(0," + (i - 1) * 10 + ")"; })
                    .style("font", "10px sans-serif");

                legend.append("rect")
                    .attr("x", 155)
                    .attr("width", 15)
                    .attr("height", 15)
                    .attr("fill", function (d) {
                        if (d == "USA") {
                            return "blue";
                        }
                        if (d == "GER") {
                            return "black";
                        }
                        if (d == "AUS") {
                            return "red";
                        }
                        if (d == "CHN") {
                            return "yellow";
                        }
                        return "green";
                    });

                legend.append("text")
                    .attr("x", 25)
                    .attr("y", 8)
                    .attr("dy", ".35em")
                    .attr("text-anchor", "start")
                    .text(function (d) {
                        if (d == "USA") {
                            return "United States, America";
                        }
                        if (d == "GER") {
                            return "Germany, Europe";
                        }
                        if (d == "AUS") {
                            return "Australia, Oceania";
                        }
                        if (d == "CHN") {
                            return "China, Asia";
                        }
                        return "Kenya, Africa";
                    });


                var LegendOptions = ["Men", "Women"];
                var legend = d3.select("svg")
                    .attr("transform", function (d, i) { return "translate(0," + 400 + ")"; })
                    .append("g")
                    .attr("transform", function (d, i) { return "translate(0," + 100 + ")"; })
                    .selectAll(".legend")
                    .data(LegendOptions)
                    .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", function (d, i) { return "translate(0," + (i - 1) * 10 + ")"; })
                    .style("font", "10px sans-serif");

                legend.append("rect")
                    .attr("x", 155)
                    .attr("width", 15)
                    .attr("height", 15)
                    .attr("fill", function (d) {
                        if (d == "Men") {
                            return "#18bedc";
                        }
                        return "  #ffa922  ";
                    });

                legend.append("text")
                    .attr("x", 25)
                    .attr("y", 8)
                    .attr("dy", ".35em")
                    .attr("text-anchor", "start")
                    .text(function (d) {
                        return d;
                    });

                for (var m = 0; m < countriesW.length; m++) {
                    var element = countriesW[m];
                    var all = countriesA[m];
                    var length1 = element.length;
                    for (var i = 0; i < all.length; i++) {
                        for (var j = 0; j < length1; j++) {
                            if (element[j].sport == all[i].sport) {
                                j = length1;
                            }
                            else if (j == length1 - 1) {
                                element.push({ sport: all[i].sport, value: 0 });
                            }
                        }
                    }
                    element.sort(function compare(a, b) {
                        if (a.sport < b.sport)
                            return -1;
                        if (a.sport > b.sport)
                            return 1;
                        return 0;
                    });
                }

                for (var i = 0; i < 5; i++) {
                    var data = [
                        countriesM[i],
                        countriesW[i],
                    ];
                    RadarChart.draw("#vis" + parseInt(i + 3), data, config, countriesA[i]);
                }
            });
        });
    });

    var RadarChart = {
        draw: function (id, d, options, all) {
            var cfg = {
                radius: 5,
                w: 600,
                h: 600,
                factor: 1,
                factorLegend: .65,
                levels: 3,
                maxValue: 0,
                radians: 2 * Math.PI,
                opacityArea: 0.5,
                ToRight: 5,
                TranslateX: 35,
                TranslateY: 28,
                ExtraWidthX: 100,
                ExtraWidthY: 100,
                color: d3.scaleOrdinal().range(["#6F257F", "#CA0D59"]),
            };

            if ('undefined' !== typeof options) {
                for (var i in options) {
                    if ('undefined' !== typeof options[i]) {
                        cfg[i] = options[i];
                    }
                }
            }

            cfg.maxValue = all;
            var allAxis;
            allAxis = (all.map(function (i, j) { return i.sport }));

            var total = allAxis.length;
            var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
            d3.select(id).select("svg").remove();


            var g = d3.select(id)
                .append("div")
                .attr('class', function () {
                    if (id == "#vis3") {
                        return "frame fColor".concat("1");
                    }
                    if (id == "#vis4") {
                        return "frame fColor".concat("2");
                    }
                    if (id == "#vis5") {
                        return "frame fColor".concat("3");
                    }
                    if (id == "#vis6") {
                        return "frame fColor".concat("4");
                    }
                    if (id == "#vis7") {
                        return "frame fColor".concat("5");
                    }
                })

                .append("svg")
                .attr("width", cfg.w + cfg.ExtraWidthX)
                .attr("height", cfg.h + cfg.ExtraWidthY)
                .append("g")
                .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

            var tooltip;

            for (var j = 0; j < cfg.levels; j++) {
                var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
                g.selectAll(".levels")
                    .data(allAxis)
                    .enter()
                    .append("svg:line")

                    .attr("x1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
                    .attr("y1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
                    .attr("x2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total)); })
                    .attr("y2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total)); })
                    .attr("class", "line")

                    .style("stroke", "grey")
                    .style("stroke-opacity", "0.75")
                    .style("stroke-width", "0.3px")
                    .attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
            }

            for (var j = 0; j < cfg.levels; j++) {
                var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
                g.selectAll(".levels")
                    .data([1])
                    .enter()
                    .append("svg:text")
                    .attr("x", function (d) { return levelFactor * (1 - cfg.factor * Math.sin(0)); })
                    .attr("y", function (d) { return levelFactor * (1 - cfg.factor * Math.cos(0)); })
                    .attr("class", "legend")
                    .style("font-family", "sans-serif")
                    .style("font-size", "7px")
                    .attr("transform", "translate(" + (cfg.w / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.h / 2 - levelFactor) + ")")

                    .attr("fill", "#787373")
                    .text((j + 1) * 100 / cfg.levels + "%");
            }

            series = 0;
            var axis = g.selectAll(".axis")
                .data(allAxis)
                .enter()
                .append("g")
                .attr("class", "axis");

            axis.append("line")
                .attr("x1", cfg.w / 2)
                .attr("y1", cfg.h / 2)
                .attr("x2", function (d, i) { return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
                .attr("y2", function (d, i) { return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-width", "1px");

            axis.append("text")
                .attr("class", "legend")
                .text(function (d) { return d })
                .style("font-family", "sans-serif")
                .style("font-size", "8px")
                .attr("text-anchor", "middle")
                .attr("dy", "1.5em")
                .attr("transform", function (d, i) { return "translate(0, -10)" })
                .attr("x", function (d, i) { return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total); })
                .attr("y", function (d, i) { return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total); });


            d.forEach(function (y, x) {
                dataValues = [];
                g.selectAll(".nodes")
                    .data(y, function (j, i) {
                        var m = 0;
                        cfg.maxValue.forEach(function (element) {
                            if (element.sport == j.sport)
                            { m = element.value; }
                        }, this);
                        dataValues.push([
                            cfg.w / 2 * (1 - (parseFloat(Math.max(parseInt(j.value), 0)) / m) * cfg.factor * Math.sin(i * cfg.radians / total)),
                            cfg.h / 2 * (1 - (parseFloat(Math.max(parseInt(j.value), 0)) / m) * cfg.factor * Math.cos(i * cfg.radians / total))
                        ]);
                    });
                dataValues.push(dataValues[0]);
                g.selectAll(".area")
                    .data([dataValues])
                    .enter()
                    .append("polygon")
                    .attr("class", "radar-chart-serie" + series)
                    .style("stroke-width", "2px")
                    .style("stroke", function () {
                        if (x == 0) {
                            return " #1bdcff ";
                        }
                        return " #ffb61b ";
                    })

                    .attr("points", function (d) {
                        var str = "";
                        for (var pti = 0; pti < d.length; pti++) {
                            str = str + d[pti][0] + "," + d[pti][1] + " ";
                        }
                        return str;
                    })
                    .attr("fill", function () {
                        if (x == 0) {
                            return "  #18bedc  ";
                        }

                        return "  #ffa922  ";
                    })
                    .style("fill-opacity", cfg.opacityArea)
                    .on('mouseover', function (d) {
                        z = "polygon." + d3.select(this).attr("class");
                        g.selectAll("polygon")
                            .transition(200)
                            .style("fill-opacity", 0.1);
                        g.selectAll(z)
                            .transition(200)
                            .style("fill-opacity", .7);
                    })
                    .on('mouseout', function () {
                        g.selectAll("polygon")
                            .transition(200)
                            .style("fill-opacity", cfg.opacityArea);
                    });
                series++;
            });
            series = 0;

            var tooltip = d3.select("body").append("div").attr("class", "toolTip");
            d.forEach(function (y, x) {
                g.selectAll(".nodes")
                    .data(y).enter()
                    .append("svg:circle")
                    .attr("class", "radar-chart-serie" + series)
                    .attr('r', cfg.radius)
                    .attr("alt", function (j) { return Math.max(j.value, 0) })
                    .attr("cx", function (j, i) {
                        var m = 0;
                        cfg.maxValue.forEach(function (element) {
                            if (element.sport == j.sport)
                            { m = element.value; }

                        }, this);
                        dataValues.push([
                            cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / m) * cfg.factor * Math.sin(i * cfg.radians / total)),
                            cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / m) * cfg.factor * Math.cos(i * cfg.radians / total))
                        ]);
                        return cfg.w / 2 * (1 - (Math.max(j.value, 0) / m) * cfg.factor * Math.sin(i * cfg.radians / total));
                    })
                    .attr("cy", function (j, i) {
                        var m = 0;
                        cfg.maxValue.forEach(function (element) {
                            if (element.sport == j.sport)
                            { m = element.value; }

                        }, this);
                        return cfg.h / 2 * (1 - (Math.max(j.value, 0) / m) * cfg.factor * Math.cos(i * cfg.radians / total));
                    })
                    .attr("data-id", function (j) { return j.area })
                    .style("fill", "#fff")
                    .style("stroke-width", "2px")
                    .style("stroke", function () {
                        if (x == 0) {
                            return "  #11adc9  ";
                        }
                        return "  #ebc846  ";
                    })
                    .on('mouseover', function (d) {
                        tooltip
                            .style("left", d3.event.pageX - 40 + "px")
                            .style("top", d3.event.pageY - 80 + "px")
                            .style("display", "inline-block")
                            .html((d.sport) + "<br><span>" + (d.value) + "</span>");
                    })
                    .on("mouseout", function (d) { tooltip.style("display", "none"); });
                series++;
            });
            var RadarChart = {
                draw: function (id, d, options, all) {
                    var cfg = {
                        radius: 5,
                        w: 600,
                        h: 600,
                        factor: 1,
                        factorLegend: .65,
                        levels: 3,
                        maxValue: 0,
                        radians: 2 * Math.PI,
                        opacityArea: 0.5,
                        ToRight: 5,
                        TranslateX: 35,
                        TranslateY: 28,
                        ExtraWidthX: 100,
                        ExtraWidthY: 100,
                        color: d3.scaleOrdinal().range(["#6F257F", "#CA0D59"]),
                    };

                    if ('undefined' !== typeof options) {
                        for (var i in options) {
                            if ('undefined' !== typeof options[i]) {
                                cfg[i] = options[i];
                            }
                        }
                    }

                    cfg.maxValue = all;
                    var allAxis;
                    allAxis = (all.map(function (i, j) { return i.sport }));

                    var total = allAxis.length;
                    var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
                    d3.select(id).select("svg").remove();


                    var g = d3.select(id)
                        .append("div")
                        .attr('class', function () {
                            if (id == "#vis3") {
                                return "frame fColor".concat("1");
                            }
                            if (id == "#vis4") {
                                return "frame fColor".concat("2");
                            }
                            if (id == "#vis5") {
                                return "frame fColor".concat("3");
                            }
                            if (id == "#vis6") {
                                return "frame fColor".concat("4");
                            }
                            if (id == "#vis7") {
                                return "frame fColor".concat("5");
                            }
                        })

                        .append("svg")
                        .attr("width", cfg.w + cfg.ExtraWidthX)
                        .attr("height", cfg.h + cfg.ExtraWidthY)
                        .append("g")
                        .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

                    var tooltip;

                    for (var j = 0; j < cfg.levels; j++) {
                        var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
                        g.selectAll(".levels")
                            .data(allAxis)
                            .enter()
                            .append("svg:line")

                            .attr("x1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
                            .attr("y1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
                            .attr("x2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total)); })
                            .attr("y2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total)); })
                            .attr("class", "line")

                            .style("stroke", "grey")
                            .style("stroke-opacity", "0.75")
                            .style("stroke-width", "0.3px")
                            .attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
                    }

                    for (var j = 0; j < cfg.levels; j++) {
                        var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
                        g.selectAll(".levels")
                            .data([1])
                            .enter()
                            .append("svg:text")
                            .attr("x", function (d) { return levelFactor * (1 - cfg.factor * Math.sin(0)); })
                            .attr("y", function (d) { return levelFactor * (1 - cfg.factor * Math.cos(0)); })
                            .attr("class", "legend")
                            .style("font-family", "sans-serif")
                            .style("font-size", "7px")
                            .attr("transform", "translate(" + (cfg.w / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.h / 2 - levelFactor) + ")")

                            .attr("fill", "#787373")
                            .text((j + 1) * 100 / cfg.levels + "%");
                    }

                    series = 0;
                    var axis = g.selectAll(".axis")
                        .data(allAxis)
                        .enter()
                        .append("g")
                        .attr("class", "axis");

                    axis.append("line")
                        .attr("x1", cfg.w / 2)
                        .attr("y1", cfg.h / 2)
                        .attr("x2", function (d, i) { return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
                        .attr("y2", function (d, i) { return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
                        .attr("class", "line")
                        .style("stroke", "grey")
                        .style("stroke-width", "1px");

                    axis.append("text")
                        .attr("class", "legend")
                        .text(function (d) { return d })
                        .style("font-family", "sans-serif")
                        .style("font-size", "8px")
                        .attr("text-anchor", "middle")
                        .attr("dy", "1.5em")
                        .attr("transform", function (d, i) { return "translate(0, -10)" })
                        .attr("x", function (d, i) { return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total); })
                        .attr("y", function (d, i) { return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total); });


                    d.forEach(function (y, x) {
                        dataValues = [];
                        g.selectAll(".nodes")
                            .data(y, function (j, i) {
                                var m = 0;
                                cfg.maxValue.forEach(function (element) {
                                    if (element.sport == j.sport)
                                    { m = element.value; }
                                }, this);
                                dataValues.push([
                                    cfg.w / 2 * (1 - (parseFloat(Math.max(parseInt(j.value), 0)) / m) * cfg.factor * Math.sin(i * cfg.radians / total)),
                                    cfg.h / 2 * (1 - (parseFloat(Math.max(parseInt(j.value), 0)) / m) * cfg.factor * Math.cos(i * cfg.radians / total))
                                ]);
                            });
                        dataValues.push(dataValues[0]);
                        g.selectAll(".area")
                            .data([dataValues])
                            .enter()
                            .append("polygon")
                            .attr("class", "radar-chart-serie" + series)
                            .style("stroke-width", "2px")
                            .style("stroke", function () {
                                if (x == 0) {
                                    return " #1bdcff ";
                                }
                                return " #ffb61b ";
                            })

                            .attr("points", function (d) {
                                var str = "";
                                for (var pti = 0; pti < d.length; pti++) {
                                    str = str + d[pti][0] + "," + d[pti][1] + " ";
                                }
                                return str;
                            })
                            .attr("fill", function () {
                                if (x == 0) {
                                    return "  #18bedc  ";
                                }

                                return "  #ffa922  ";
                            })
                            .style("fill-opacity", cfg.opacityArea)
                            .on('mouseover', function (d) {
                                z = "polygon." + d3.select(this).attr("class");
                                g.selectAll("polygon")
                                    .transition(200)
                                    .style("fill-opacity", 0.1);
                                g.selectAll(z)
                                    .transition(200)
                                    .style("fill-opacity", .7);
                            })
                            .on('mouseout', function () {
                                g.selectAll("polygon")
                                    .transition(200)
                                    .style("fill-opacity", cfg.opacityArea);
                            });
                        series++;
                    });
                    series = 0;

                    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
                    d.forEach(function (y, x) {
                        g.selectAll(".nodes")
                            .data(y).enter()
                            .append("svg:circle")
                            .attr("class", "radar-chart-serie" + series)
                            .attr('r', cfg.radius)
                            .attr("alt", function (j) { return Math.max(j.value, 0) })
                            .attr("cx", function (j, i) {
                                var m = 0;
                                cfg.maxValue.forEach(function (element) {
                                    if (element.sport == j.sport)
                                    { m = element.value; }

                                }, this);
                                dataValues.push([
                                    cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / m) * cfg.factor * Math.sin(i * cfg.radians / total)),
                                    cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / m) * cfg.factor * Math.cos(i * cfg.radians / total))
                                ]);
                                return cfg.w / 2 * (1 - (Math.max(j.value, 0) / m) * cfg.factor * Math.sin(i * cfg.radians / total));
                            })
                            .attr("cy", function (j, i) {
                                var m = 0;
                                cfg.maxValue.forEach(function (element) {
                                    if (element.sport == j.sport)
                                    { m = element.value; }

                                }, this);
                                return cfg.h / 2 * (1 - (Math.max(j.value, 0) / m) * cfg.factor * Math.cos(i * cfg.radians / total));
                            })
                            .attr("data-id", function (j) { return j.area })
                            .style("fill", "#fff")
                            .style("stroke-width", "2px")
                            .style("stroke", function () {
                                if (x == 0) {
                                    return "  #11adc9  ";
                                }
                                return "  #ebc846  ";
                            })
                            .on('mouseover', function (d) {
                                tooltip
                                    .style("left", d3.event.pageX - 40 + "px")
                                    .style("top", d3.event.pageY - 80 + "px")
                                    .style("display", "inline-block")
                                    .html((d.sport) + "<br><span>" + (d.value) + "</span>");
                            })
                            .on("mouseout", function (d) { tooltip.style("display", "none"); });
                        series++;
                    });

                }
            };
        }
    };
}


