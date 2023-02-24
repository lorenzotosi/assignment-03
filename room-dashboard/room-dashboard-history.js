// TODO: controllare isNight dal json
document.documentElement.setAttribute("data-theme", "dark");

window.onload = function () {
    google.charts.load("current", { "packages": ["timeline", "line", "corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    document.querySelector("body").style.transitionDuration = "1s";

    let isNight = true;
    changeBackground(isNight);
    isNight = !isNight;
};

window.onresize = function () {
    google.charts.load("current", { "packages": ["timeline", "line", "corechart"] });
    google.charts.setOnLoadCallback(drawChart);
};

function drawChart() {
    drawWindowLog();
    drawLightsLog();
    drawLightsUsage();
}

function drawWindowLog() {
    const container = document.getElementById("window-log");
    const chart = new google.charts.Line(container);
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: "string", id: "Status" });
    dataTable.addColumn({ type: "date", id: "Start" });
    dataTable.addColumn({ type: "date", id: "End" });
    dataTable.addRows([
        ["Open", new Date(1789, 3, 30), new Date(1797, 2, 4)],
        ["Closed", new Date(1797, 2, 4), new Date(1801, 2, 4)],
        ["Open", new Date(1801, 2, 4), new Date(1805, 2, 4)]
    ]);
    let options = {
        backgroundColor: "#323438",
        colors: ["black"]
    };
    chart.draw(dataTable, google.charts.Line.convertOptions(options));
}

function drawLightsLog() {
    const container = document.getElementById("lights-log");
    const chart = new google.visualization.Timeline(container);
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: "string", id: "Status" });
    dataTable.addColumn({ type: "date", id: "Start" });
    dataTable.addColumn({ type: "date", id: "End" });
    dataTable.addRows([
        ["On", new Date(1789, 3, 30), new Date(1797, 2, 4)],
        ["Off", new Date(1797, 2, 4), new Date(1801, 2, 4)],
        ["On", new Date(1801, 2, 4), new Date(1805, 2, 4)]
    ]);
    let options = {
        backgroundColor: "#323438",
        colors: ["green", "red"],
    };
    chart.draw(dataTable, options);
}

function drawLightsUsage() {
    const container = document.getElementById("lights-usage");
    const chart = new google.visualization.PieChart(container);
    const dataTable = google.visualization.arrayToDataTable([
        ["Status", "Hours"],
        ["On", 11],
        ["Off", 2]
    ]);
    let options = {
        backgroundColor: "#323438",
        is3D: true,
    };
    chart.draw(dataTable, options);
}

function changeBackground(isNight) {
    const nav = document.querySelector("nav");
    if (isNight) {
        document.documentElement.setAttribute("data-theme", "dark");
        nav.classList.remove("bg-light");
        nav.classList.add("navbar-dark");
        nav.classList.add("bg-dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        nav.classList.remove("bg-dark");
        nav.classList.remove("navbar-dark");
        nav.classList.add("bg-light");
    }
}