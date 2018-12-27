let api;
let base = "http://api.openweathermap.org/data/2.5/weather?q=";
let weather = document.querySelector("#weather");
document.getElementById('citylist').addEventListener('submit', postData);

function postData(event) {
    event.preventDefault();
    let city = document.getElementById("hu").value;
    api = base + city + "&units=metric&lang=fr&appid=1e810c29dc384ef9ab829462881a5fa7";
    fetch(api).then(function (response) {
        $(city).val('');
        response.json().then(function (text) {
            let describe = text.name;
            let currentTemp = text.weather[0].description;
            let country = text.sys.country;
            let icon = text.weather[0].icon;
            let minTemp = text.main.temp_min;
            let maxTemp = text.main.temp_max;
            let lon = text.coord.lon;
            let lat = text.coord.lat;

            let macarte = null;

            function initMap() {
                // Reload map //
                let container = L.DomUtil.get('map');
                if (container != null) {
                    container._leaflet_id = null;
                }
                macarte = L.map('map').setView([lat, lon], 11);
                L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                    minZoom: 1,
                    maxZoom: 20
                }).addTo(macarte);
                let marker = L.marker([lat, lon]).addTo(macarte);
            }

            sendHTML =
                "<tr>" +
                "<th>" + describe + " (" + country + ")</th>" +
                "<td><img src='http://openweathermap.org/img/w/" + icon + ".png'></td>" +
                "<td>" + currentTemp + "</td>" +
                "<td>" + minTemp + "&deg;C</td>" +
                "<td>" + maxTemp + "&deg;C</td>" +
                "</tr>";

            weather.insertAdjacentHTML('afterbegin', sendHTML);
            map.insertBefore('afterbegin', initMap());

        });
    });
};
