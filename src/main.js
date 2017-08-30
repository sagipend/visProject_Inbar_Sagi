main();
getCountry();
chord();

d3.select("#data")
    .on("click", function (d, i) {
        d3.selectAll("svg").remove();
        d3.selectAll("#vis").attr("width", "940px");
        d3.select("#vis2").remove();
        d3.select("#vis3").remove();
        d3.select("#vis4").remove();
        d3.select("#vis5").remove();
        d3.select("#vis6").remove();
        d3.select("#vis7").remove();
        document.getElementById("vis").style.marginLeft = "0";
        document.getElementById("vis").style.marginLeft = "0";
        // d3.select("selectionChord").remove();
        d3.select(".selectionChord").style("display", "none");
        d3.selectAll(".opt1").remove();

        main();
    })


d3.select("#data1")
    .on("click", function (d, i) {
        d3.select("#title").select("text").text("Bubbles")
        document.getElementById("title").style.marginTop = "2%";
        document.getElementById("title").style.marginLeft = "20%";
        d3.selectAll("svg").remove();
        d3.selectAll("#vis").attr("width", "940px");
        d3.select("#vis2").remove();
        d3.select("#vis3").remove();
        d3.select("#vis4").remove();
        d3.select("#vis5").remove();
        d3.select("#vis6").remove();
        d3.select("#vis7").remove();
        document.getElementById("vis").style.marginLeft = "0";
        document.getElementById("vis").style.marginLeft = "227px";
        document.getElementById("vis").style.marginTop = "58px";
        d3.select("#main").remove();
        d3.select(".selectionChord").style("display", "none");

        bubbles();
    })

d3.select("#data2")
    .on("click", function (d, i) {
        d3.select("#title").select("text").text("Trends Of Medals - Men vs. Women")
        document.getElementById("title").style.marginTop = "2%";
        document.getElementById("title").style.marginLeft = "36%";
        d3.selectAll("#vis").attr("width", "940px");
        d3.selectAll("svg").remove();
        d3.select("#vis2").remove();
        d3.select("#vis3").remove();
        d3.select("#vis4").remove();
        d3.select("#vis5").remove();
        d3.select("#vis6").remove();
        d3.select("#vis7").remove();
        document.getElementById("vis").style.marginLeft = "0";
        document.getElementById("vis").style.marginLeft = "187px";
        document.getElementById("vis").style.marginTop = "0";
        d3.select("#main").remove();
        d3.select(".selectionChord").style("display", "none");

        manWoman();
    })

d3.select("#data3")
    .on("click", function (d, i) {
        d3.select("#title").select("text").text("Let The Data Speak-Top Medalist Countries Over Time")
        document.getElementById("title").style.marginTop = "1%";
        document.getElementById("title").style.marginLeft = "28%";
        d3.selectAll("#vis").attr("width", "940px");
        d3.selectAll("svg").remove();
        d3.select("#vis2").remove();
        d3.select("#vis3").remove();
        d3.select("#vis4").remove();
        d3.select("#vis5").remove();
        d3.select("#vis6").remove();
        d3.select("#vis7").remove();
        document.getElementById("vis").style.marginLeft = "100px";
        document.getElementById("vis").style.marginTop = "30px";
        document.getElementById("vis").style.marginTop = "63px";
        d3.select("#main").remove();
        d3.select(".selectionChord").style("display", "none");

        top25();
    })

d3.select("#data4")
    .on("click", function (d, i) {
        d3.select("#title").select("text").text("Olympic Sports")
        document.getElementById("title").style.marginTop = "2%";
        document.getElementById("title").style.marginLeft = "17%";
        d3.selectAll("#vis").attr("height", "0");
        d3.selectAll("svg").remove();
        d3.select("#vis3").remove();
        d3.select("#vis4").remove();
        d3.select("#vis5").remove();
        d3.select("#vis6").remove();
        d3.select("#vis7").remove();
        document.getElementById("vis").style.marginLeft = "0";
        document.getElementById("vis").style.marginTop = "-5px";
        d3.select("#main").remove();
        d3.select(".selectionChord").style("display", "none");

        dotsMatrix();
    });


d3.select("#data5")
    .on("click", function (d, i) {
        d3.select("#title").select("text").text("")
        d3.selectAll("#vis").attr("width", "940px");
        d3.selectAll("svg").remove();
        d3.select("#main").remove();
        d3.select(".selectionChord").style("display", "none");

        radar();
    })


d3.select("#data6")
    .on("click", function (d, i) {
        d3.select("#title").select("text").text("Medals Rivalry - Shared Poduim Countries")
        document.getElementById("title").style.marginTop = "2%";
        document.getElementById("title").style.marginLeft = "3.5%";
        d3.selectAll("#vis").attr("height", "0");
        d3.selectAll("svg").remove();
        d3.select("#vis3").remove();
        d3.select("#vis4").remove();
        d3.select("#vis5").remove();
        d3.select("#vis6").remove();
        d3.select("#vis7").remove();
        document.getElementById("vis").style.marginLeft = "0";
        document.getElementById("vis").style.marginTop = "0";
        d3.select("#main").remove();
        d3.select(".selectionChord").style("display", "flex");

        visualize2();
    });

function main() {
    d3.select("#main").remove();
    d3.select(".selectionChord").style("display", "none");
    d3.select("#title").select("text").text("")

    d3.select("body")
        .append("div")
        .attr("id", "main").append("h2")
        .append("text")
        .text("INFORMATION VISUALIZATION PROJECT")

    d3.select("#main")
        .append("img")
        .attr("src", "imgs/Olympic-Rings.jpg")
        .attr("class", "olympicImg");
}