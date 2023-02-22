// TODO: controllare isNight dal json
document.documentElement.setAttribute("data-theme", "dark");

window.onload = function () {
    document.querySelector("body").style.transitionDuration = "1s";

    const slider = document.getElementById("slider");
    slider.defaultValue = 0;
    slider.addEventListener("input", function () {
        slideRollerBlinds(this.value);
    });

    let isNight = true;
    changeBackground(isNight);
    isNight = !isNight;

    // SOLO PER TEST: ------
    document.getElementById("test").addEventListener("click", function () {
        changeBackground(isNight);
        isNight = !isNight;
    });
    // ----------------------
};


function slideRollerBlinds(value) {
    document.getElementById("close").style.top = -value * 0.85 + "%";
}

function changeBackground(isNight) {
    const night = document.getElementById("night");
    const day = document.getElementById("day");
    if (isNight) {
        day.style.opacity = "0";
        night.style.opacity = "1";
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        night.style.opacity = "0";
        day.style.opacity = "1";
        document.documentElement.setAttribute("data-theme", "light");
    }
}