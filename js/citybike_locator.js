// CityBike Locator app
// API: https://api.citybik.es/v2/#filter

window.onload = (e) => {
    // add event listener for input field on html form
    document.querySelector('form').addEventListener('submit', (e) => {
        // prevent page from reloading when even listener is activated
        e.preventDefault()
        // initialize variable for userInput
        const userInput = document.querySelector('input[type="text"]').value

        console.log(userInput)
    
        // set up fetch to CityBike API
        fetch(`https://api.citybik.es/v2/networks`).then((data) => {
            return data.json()
        }, (err) => {
            console.log(err, ` ERROR`)
        }).then((cityBikeData) => {
            console.log(cityBikeData.networks[0])
            // return API data for network name in html
            document.querySelector('#network-name').innerHTML = cityBikeData.networks[0].name
            // return API data for network city in html
            document.querySelector('#network-city').innerHTML = cityBikeData.networks[0].location.city
            // return API data for network country in html
            document.querySelector('#network-country').innerHTML = cityBikeData.networks[0].location.country
        })
    })
}