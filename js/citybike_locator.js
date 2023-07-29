// CityBike Locator app
// API: https://api.citybik.es/v2/#filter

window.onload = (e) => {
    fetch(`https://api.citybik.es/v2/networks`).then((data) => {
        return data.json()
    }, (err) => {
        console.log(err, ` ERROR`)
    }).then((cityBikeData) => {
        console.log(cityBikeData.networks[0])
    })





}