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
        //console.log("hiho " + id);
        //   console.log(JSON.stringify(d));
        //   console.log(JSON.stringify(all));


        if ('undefined' !== typeof options) {
            // console.log(JSON.stringify(options));
            for (var i in options) {
                if ('undefined' !== typeof options[i]) {
                    cfg[i] = options[i];
                }
            }
        }

        cfg.maxValue = all;
        // cfg.maxValue = 100/158;


        //console.log("hi "+ JSON.stringify(d));
        var allAxis;
        allAxis = (all.map(function (i, j) { return i.sport }));

        // if (d[0].length > d[1].length)
        //     allAxis = (d[1].map(function (i, j) { return i.sport }));
        // else
        //     allAxis = (d[0].map(function (i, j) { return i.sport }));

        var total = allAxis.length;
        var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
        // var Format = d3.format('%');
        d3.select(id).select("svg").remove();




        var g = d3.select(id)
            .append("div")
            .attr('class', function () {
           //     console.log(id);
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


        //Circular segments
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

        //Text indicating at what % each level is
        for (var j = 0; j < cfg.levels; j++) {
            var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
            g.selectAll(".levels")
                .data([1]) //dummy data
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
            //      console.log(x + " " + JSON.stringify(y));
            dataValues = [];
            g.selectAll(".nodes")
                .data(y, function (j, i) {
                    //                  console.log(i + " " + JSON.stringify(j));
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
                    //       console.log(JSON.stringify(d));
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

                // .style("fill", function (j, i) { 
                //     return cfg.color(series) })
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
                    //                   console.log(x);
                    if (x == 0) {
                        return "  #11adc9  ";
                    }

                    return "  #ebc846  ";
                })
                .on('mouseover', function (d) {
                    console.log(d.sport)
                    tooltip
                        .style("left", d3.event.pageX - 40 + "px")
                        .style("top", d3.event.pageY - 80 + "px")
                        .style("display", "inline-block")
                        .html((d.sport) + "<br><span>" + (d.value) + "</span>");
                })
                .on("mouseout", function (d) { tooltip.style("display", "none"); });

            series++;
        });



        //     //Create the title for the legend
        //     var text = svg.append("text")
        //         .attr("class", "title")
        //         .attr('transform', 'translate(90,0)')
        //         .attr("x", 70)
        //         .attr("y", 10)
        //         .attr("font-size", "12px")
        //         .attr("fill", "#404040")
        //         .text("What % of owners use a specific service in a week");

        //     //Initiate Legend	
        //     var legend = svg.append("g")
        //         .attr("class", "legend")
        //         .attr("height", 100)
        //         .attr("width", 200)
        //         .attr('transform', 'translate(90,20)')
        //         ;
        //     //Create colour squares
        //     legend.selectAll('rect')
        //         .data(LegendOptions)
        //         .enter()
        //         .append("rect")
        //         .attr("x", 65)
        //         .attr("y", function (d, i) { return i * 20; })
        //         .attr("width", 10)
        //         .attr("height", 10)
        //         .style("fill", function (d, i) { return "red" })
        //         ;
        //     //Create text next to squares
        //     legend.selectAll('text')
        //         .data([LegendOptions])
        //         .enter()
        //         .append("text")
        //         .attr("x", 52)
        //         .attr("y", function (d, i) { return i * 20 + 9; })
        //         .attr("font-size", "11px")
        //         .attr("fill", "#737373")
        //         .text(function (d) { return d; })
        //         ;
         }
    };
    