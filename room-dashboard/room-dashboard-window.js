const start = new Date().setHours(8, 0, 0);
const end = new Date().setHours(19, 0, 0);
let now = new Date();
let isNight = start < now && now < end ? false : true;
document.documentElement.setAttribute("data-theme", isNight ? "dark" : "light");

window.onload = function () {
    document.querySelector("body").style.transitionDuration = "1s";
    updateClock();
    const slider = document.getElementById("slider");
    let isLightsOn = setupSystem(slider);
    handleSlider(slider);
    changeBackground(isNight);
    document.querySelectorAll(".light-switch").forEach(element => {
        element.addEventListener("click", function () {
            isLightsOn = !isLightsOn;
            checkLights(isLightsOn);
        });
    });
};

function setupSystem(slider) {
    return () =>
        axios.get("logs.json").then((response) => {
            let windowData = response.data["data"]["window-log"];
            let lightsData = response.data["data"]["lights-log"];
            slider.defaultValue = windowData[windowData.length - 1].status;
            slideRollerBlinds(slider.defaultValue);
            return lightsData[lightsData.length - 1].status == "On" ? true : false;
        });
}

function handleSlider(slider) {
    slider.addEventListener("mousedown", function () {
        document.getElementById("close").style.transition = "none";
        slider.addEventListener("mousemove", function () {
            slideRollerBlinds(this.value);
        });
    });
    slider.addEventListener("mouseup", function () {
        document.getElementById("close").style.transition = "top 0.5s";
        slider.removeEventListener("mousemove", function () {
            slideRollerBlinds(this.value);
        });
        updateWindow(this.value);
    });
    slider.addEventListener("click", function () {
        slideRollerBlinds(this.value);
    });
}

function slideRollerBlinds(value) {
    document.getElementById("close").style.top = -value * 0.85 + "%";
    if (value == 0) {
        document.getElementById("window-status").innerHTML = "closed";
    } else if (value == 100) {
        document.getElementById("window-status").innerHTML = "completely open";
    } else {
        document.getElementById("window-status").innerHTML = "open at " + value + "%";
    }
}

function updateWindow(value) {
    const request = {
        "content": {
            "status": parseInt(value),
            "start": new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        },
        "type": "window",
    };
    axios.post("room-dashboard-history.php", request).then();
}

function checkLights(isLightsOn) {
    document.getElementById("lights-status").innerHTML = isLightsOn ? "on" : "off";
    document.getElementById("lights-status").style.color = isLightsOn ? "green" : "red";
    document.getElementById(isLightsOn ? "light-on" : "light-off").style.opacity = "1";
    document.getElementById(isLightsOn ? "light-off" : "light-on").style.opacity = "0";
    const request = {
        "content": {
            "status": isLightsOn ? "On" : "Off",
            "start": new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        },
        "type": "lights",
    };
    axios.post("room-dashboard-history.php", request).then();
}

function changeBackground(isNight) {
    const night = document.getElementById("night");
    const day = document.getElementById("day");
    const nav = document.querySelector("nav");
    if (isNight) {
        document.documentElement.setAttribute("data-theme", "dark");
        day.style.opacity = "0";
        night.style.opacity = "1";
        nav.classList.remove("bg-light");
        nav.classList.add("navbar-dark");
        nav.classList.add("bg-dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        night.style.opacity = "0";
        day.style.opacity = "1";
        nav.classList.remove("bg-dark");
        nav.classList.remove("navbar-dark");
        nav.classList.add("bg-light");
    }
}

function updateClock() {
    const clock = document.getElementById("clock");
    let currentTime = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    clock.innerHTML = currentTime;
}
setInterval(updateClock, 1000);