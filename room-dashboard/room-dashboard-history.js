const start = new Date().setHours(8, 0, 0);
const end = new Date().setHours(19, 0, 0);
let now = new Date();
let isNight = start < now && now < end ? false : true;
document.documentElement.setAttribute("data-theme", !isNight ? "dark" : "light");
let backgroundColor = !isNight ? "#323438" : "#f5f5f5";

window.onload = function () {
    google.charts.load("current", { "packages": ["timeline", "line", "corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    document.querySelector("body").style.transitionDuration = "1s";

    changeBackground(!isNight);
};

window.onresize = function () {
    google.charts.load("current", { "packages": ["timeline", "line", "corechart"] });
    google.charts.setOnLoadCallback(drawChart);
};

function test() {
    axios.get("room-dashboard-history.php").then((response) => {
        console.log(response.data);
    });
}


function drawChart() {
    axios.get("logs.json").then((response) => {
        let windowData = response.data["data"]["window-log"];
        let lightsData = response.data["data"]["lights-log"];
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
        backgroundColor: backgroundColor,
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
        backgroundColor: backgroundColor,
        colors: ["green", "red"],
    };
    chart.draw(dataTable, options);
}

function drawLightsUsage(data) {
    const container = document.getElementById("lights-usage");
    const chart = new google.visualization.PieChart(container);
    let sumOn = 0;
    let sumOff = 0;
    data.forEach(element => {
        if (element.status == "On") {
            sumOn += (new Date(element.end) - new Date(element.start)) / (3600000 * 24 * 30);
        }
        else {
            sumOff += (new Date(element.end) - new Date(element.start)) / (3600000 * 24 * 30);
        }
    });
    const dataTable = google.visualization.arrayToDataTable([
        ["Status", "Hours"],
        ["On", sumOn],
        ["Off", sumOff]
    ]);
    let options = {
        backgroundColor: backgroundColor,
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
        backgroundColor = "#323438";
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        nav.classList.remove("bg-dark");
        nav.classList.remove("navbar-dark");
        nav.classList.add("bg-light");
        backgroundColor = "#f5f5f5";
    }
}