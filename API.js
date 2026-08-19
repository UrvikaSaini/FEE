(function () {
    const heading = document.createElement("h1");
    heading.textContent = "Weather App";
    document.body.prepend(heading);
    heading.style.textAlign = "center";

    const Content = document.getElementById("content");

    const Card = document.createElement("div");
    Content.append(Card);
    Card.style.margin = "auto";
    Card.style.marginTop = "7rem";
    Card.style.paddingLeft = "2rem";
    Card.style.paddingRight = "1rem";
    Card.style.textAlign = "center";
    Card.style.backgroundColor = "White";
    Card.style.border = "2px solid white";
    Card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
    Card.style.borderRadius = "2rem";
    Card.style.height = "400px";
    Card.style.width = "350px";

    const Search = document.createElement("div");
    const SearchInput = document.createElement("Input");
    SearchInput.placeholder = "Search...";
    Card.append(Search, SearchInput);

    const cityName = document.createElement("p");
    const countryName = document.createElement("p");
    const Temp = document.createElement("p");
    const Cond = document.createElement("p");
    const Humid = document.createElement("p");
    const Wind = document.createElement("p");

    const Location = document.createElement("div");
    const weatherInfo = document.createElement("div");
    const bottom = document.createElement("div");

    cityName.textContent = "Delhi, India";
    Temp.textContent = "25"+"\u00B0C";
    Humid.textContent = "Humidity : 20%";
    Wind.textContent = "Wind : 5.6 Km/h";

    Location.style.display = "flex";
    bottom.append(Humid, Wind);
    weatherInfo.append(Temp, cityName, bottom);
    bottom.style.display = "flex";
    bottom.style.justifyContent = "space-between";
    Card.append(weatherInfo);
    Temp.style.fontSize = "5rem";
    Temp.style.color = "blue";
    cityName.style.color = "orange";
    Humid.style.color = "green";
    Wind.style.color = "green";

    async function displayDetails() {
        const loc = SearchInput.value;
        const url = `http://api.weatherapi.com/v1/current.json?key=2ced2f83791748729b6103802260208&q=${loc}&aqi=yes`;
        try {
            const data = await fetch(url);
            const org_data = await data.json();
            cityName.textContent = org_data.location.name;
            countryName.textContent = org_data.location.country;
            Temp.textContent = org_data.current.temp_c+"\u00B0C";
            Humid.textContent = "Humidity : " + org_data.current.humidity+"%";
            Wind.textContent = "Wind : " + org_data.current.wind_kph+" Km/h";
        } catch (error) {
            console.error(error);
            const Error = document.createElement("p");
            Error.textContent = "Loading...";
            Card.append(Error);
        }
        SearchInput.value = "";
    }
    SearchInput.addEventListener("focus", function () {
        SearchInput.style.outline = "none";
    })
    SearchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            displayDetails();
        }
    })

    //Styling
    document.body.style.backgroundImage = "url(clouds.jpg)";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    heading.style.color = "#003566";
    heading.style.fontSize="2.5rem";
    SearchInput.style.border = "2px solid green"
    SearchInput.style.borderRadius = "2rem";
    SearchInput.style.width = "17rem";
    SearchInput.style.height = "1.4rem";
    Search.style.marginTop = "2rem";
    cityName.style.fontSize="1.3rem";

})();