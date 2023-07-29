// CityBike Locator app
// API: https://api.citybik.es/v2/#filter

window.onload = (e) => {
    // add event listener for input field on html form
    document.querySelector('form').addEventListener('submit', (e) => {
        // prevent page from reloading when even listener is activated
        e.preventDefault()
        // initialize variable for userInput. Variable is changed to lowercase to help with search.
        const userInput = document.querySelector('input[type="text"]').value.toLowerCase()
        console.log(userInput)

        // define variable for API network endpoint (href)
        let networkEndPoint = ''
    
        // set up fetch to CityBike API
        fetch(`https://api.citybik.es/v2/networks`).then((data) => {
            return data.json()
        }, (err) => {
            console.log(err, ` ERROR`)
        }).then((cityBikeData) => {
            console.log(cityBikeData.networks.length)
            // loop through API to find match for city location
            for (let i = 0; i < cityBikeData.networks.length; i++) {
                // if statement to check if city location matches userInput. API data changed to all lowercase
                if (cityBikeData.networks[i].location.city.toLowerCase() === userInput) {
                    console.log('Yes! ' + i)
                    // redefine networkEndPoint as the href for the itteration of 'i'
                    networkEndPoint = cityBikeData.networks[i].href
                    console.log(networkEndPoint)

                } else {
                    console.log('No!')
                }
            }


            // // return API data for network name in html
            // document.querySelector('#network-name').innerHTML = cityBikeData.networks[0].name
            // // return API data for network city in html
            // document.querySelector('#network-city').innerHTML = cityBikeData.networks[0].location.city
            // // return API data for network country in html
            // document.querySelector('#network-country').innerHTML = cityBikeData.networks[0].location.country
        })
    })
}