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
    axios.get("logs.json").then((response) => {
        let windowData = response.data["data"][0]["window-log"];
        let lightsData = response.data["data"][0]["lights-log"];
        drawWindowLog(windowData);
        drawLightsLog(lightsData);
        drawLightsUsage(lightsData);
    });
}

function drawWindowLog(data) {
    const container = document.getElementById("window-log");
    const chart = new google.charts.Line(container);
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: "string", id: "Status" });
    dataTable.addColumn({ type: "date", id: "Start" });
    dataTable.addColumn({ type: "date", id: "End" });
    data.forEach(element => {
        dataTable.addRow([element.status, new Date(element.start), new Date(element.end)]);
    });
    let options = {
        backgroundColor: "#323438",
        colors: ["black"],
    };
    chart.draw(dataTable, google.charts.Line.convertOptions(options));
}

function drawLightsLog(data) {
    const container = document.getElementById("lights-log");
    const chart = new google.visualization.Timeline(container);
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: "string", id: "Status" });
    dataTable.addColumn({ type: "date", id: "Start" });
    dataTable.addColumn({ type: "date", id: "End" });
    data.forEach(element => {
        dataTable.addRow([element.status, new Date(element.start), new Date(element.end)]);
    });
    let options = {
        backgroundColor: "#323438",
        colors: ["green", "red"],
    };
    chart.draw(dataTable, options);
}

function drawLightsUsage(data) {
    const container = document.getElementById("lights-usage");
    const chart = new google.visualization.PieChart(container);
    let sumOn = 0;
    let sumOff = 0
    data.forEach(element => {
        if(element.status == "On"){
            sumOn += (new Date(element.end) - new Date(element.start)) / (3600000 * 24* 30);
        }
        else{
            sumOff += (new Date(element.end) - new Date(element.start)) / (3600000 * 24 * 30);
        }
    });
    const dataTable = google.visualization.arrayToDataTable([
        ["Status", "Hours"],
        ["On", sumOn],
        ["Off", sumOff]
    ]);
    let options = {
        backgroundColor: "#323438",
        colors: ["green", "red"],
        is3D: true,
        legendTextStyle: {
            color: "white",
            fontSize: 12,
        },
        pieSliceText: "value",
        legend: {
            position: "labeled",
        },
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