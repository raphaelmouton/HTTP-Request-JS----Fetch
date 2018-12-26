let api;
let base = "http://api.openweathermap.org/data/2.5/weather?q=";
let weather = document.querySelector("#weather");
document.getElementById('citylist').addEventListener('submit', postData);

function postData(event) {
    event.preventDefault();
    let city = document.getElementById("hu").value;
    api = base + city + "&units=metric&lang=fr&appid=1e810c29dc384ef9ab829462881a5fa7";
    fetch(api).then(function (response) {
        response.json().then(function (text) {
            descript = text.name;
            currenttemp = text.weather[0].description;
            icon = text.weather[0].icon;
            mintemp = text.main.temp_min;
            maxtemp = text.main.temp_max;

            sendHTML =
                "<tr>" +
                "<th>" + descript + "</th>" +
                "<td><img src='http://openweathermap.org/img/w/" + icon + ".png'></td>" +
                "<td>" + currenttemp + "</td>"   +
                "<td>" + mintemp + "&deg;C</td>" +
                "<td>" + maxtemp + "&deg;C</td>" +
                "</tr>";

            weather.insertAdjacentHTML('afterbegin', sendHTML);

        });
    });
};
