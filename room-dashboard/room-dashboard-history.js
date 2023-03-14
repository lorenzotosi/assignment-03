const start = new Date().setHours(8, 0, 0)
const end = new Date().setHours(19, 0, 0)
let now = new Date()
let isNight = start < now && now < end ? false : true
document.documentElement.setAttribute("data-theme", isNight ? "dark" : "light")
let legendColor = isNight ? "white" : "black"

window.onload = function () {
    google.charts.load("current", {
        packages: ["timeline", "line", "corechart"],
    })
    google.charts.setOnLoadCallback(function () {
        drawChart(false)
    })
    document.querySelector("body").style.transitionDuration = "1s"
    changeBackground(isNight)
    setTimeout(function () {
        document.querySelector(".preload").style.opacity = "0"
        document.querySelector(".preload").style.zIndex = "-1"
    }, 500)
}

window.onresize = function () {
    google.charts.load("current", {
        packages: ["timeline", "line", "corechart"],
    })
    google.charts.setOnLoadCallback(function () {
        drawChart(true)
    })
}

function drawChart(isReload) {
    axios.get("logs.json").then((response) => {
        let windowData = response.data["data"]["window-log"]
        let lightsData = response.data["data"]["lights-log"]
        drawLightsUsage(lightsData)
        if (!isReload) {
            drawWindowLog(windowData)
            drawLightsLog(lightsData)
        }
        document.querySelectorAll("svg").forEach((element) => {
            let divWidth =
                element.parentElement.parentElement.parentElement.parentElement
                    .parentElement.offsetWidth * 0.002
            if (divWidth < 0.96) {
                element.setAttribute("style", `transform: scale(${divWidth})`)
            }
        })
    })
}

function drawWindowLog(data) {
    const container = document.getElementById("window-log")
    data.forEach((element) => {
        let div = document.createElement("div")
        div.setAttribute("class", "d-flex justify-content-between")
        let time = document.createElement("p")
        time.setAttribute("class", "mb-0")
        time.innerHTML = element.start
        let status = document.createElement("p")
        status.setAttribute("class", "mb-0")
        status.innerHTML = element.status + "%"
        div.appendChild(time)
        div.appendChild(status)
        container.appendChild(div)
    })
}

function drawLightsLog(data) {
    const container = document.getElementById("lights-log")
    data.forEach((element) => {
        let div = document.createElement("div")
        div.setAttribute("class", "d-flex justify-content-between")
        let time = document.createElement("p")
        time.setAttribute("class", "mb-0")
        time.innerHTML = element.start
        let status = document.createElement("p")
        status.setAttribute("class", "mb-0")
        status.innerHTML = element.status
        div.appendChild(time)
        div.appendChild(status)
        container.appendChild(div)
    })
}

function drawLightsUsage(data) {
    const container = document.getElementById("lights-usage")
    const chart = new google.visualization.PieChart(container)
    let sumOn = "00:00:00"
    let sumOff = "00:00:00"
    data.forEach((element) => {
        if (element.status == "On")
            sumOn = sumTimes(
                sumOn,
                getTimeDifference(
                    convertTime(element.end),
                    convertTime(element.start)
                )
            )
        else
            sumOff = sumTimes(
                sumOff,
                getTimeDifference(
                    convertTime(element.end),
                    convertTime(element.start)
                )
            )
    })
    const dataTable = google.visualization.arrayToDataTable([
        ["Status", "Hours"],
        ["On: " + sumOn, stringToSeconds(sumOn)],
        ["Off: " + sumOff, stringToSeconds(sumOff)],
    ])
    const options = {
        backgroundColor: "transparent",
        colors: ["green", "red"],
        is3D: true,
        legend: {
            position: "right",
            textStyle: {
                color: legendColor,
                fontSize: 14,
            },
        },
        chartArea: {
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
        },
        pieSliceText: "percentage",
        pieSliceTextStyle: {
            fontSize: 14,
        },
        tooltip: {
            trigger: "none",
        },
    }
    chart.draw(dataTable, options)
}

function convertTime(timeString) {
    const [hours, minutes, seconds] = timeString
        .split(":")
        .map((component) => parseInt(component))
    const dateTime = new Date()
    dateTime.setHours(hours, minutes, seconds)
    return dateTime
}

function stringToSeconds(timeString) {
    const [hours, minutes, seconds] = timeString
        .split(":")
        .map((component) => parseInt(component))
    return hours * 3600 + minutes * 60 + seconds
}

function sumTimes(firstTime, secondTime) {
    const endSeconds = stringToSeconds(firstTime)
    const startSeconds = stringToSeconds(secondTime)
    const totalSeconds = endSeconds + startSeconds
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

function getTimeDifference(endDate, startDate) {
    const millisDifference = Math.abs(endDate - startDate)
    const secondsDifference = Math.round(millisDifference / 1000)
    const hours = Math.floor(secondsDifference / 3660)
    const minutes = Math.floor((secondsDifference % 3600) / 60)
    const seconds = secondsDifference % 60
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

function changeBackground(isNight) {
    const nav = document.querySelector("nav")
    if (isNight) {
        document.documentElement.setAttribute("data-theme", "dark")
        nav.classList.remove("bg-light")
        nav.classList.add("navbar-dark")
        nav.classList.add("bg-dark")
        legendColor = "white"
    } else {
        document.documentElement.setAttribute("data-theme", "light")
        nav.classList.remove("bg-dark")
        nav.classList.remove("navbar-dark")
        nav.classList.add("bg-light")
        legendColor = "black"
    }
}
