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

        // declare variable for API network endpoint (href)
        let networkEndPoint = ''
    
        // set up fetch to CityBike API
        fetch(`https://api.citybik.es/v2/networks`).then((data) => {
            return data.json()
        }, (err) => {
            console.log(err, ` ERROR`)
        }).then((cityBikeNetwork) => {
            // // log the length of the API
            // console.log(cityBikeData.networks.length)

            // loop through API to find match for city location
            for (let i = 0; i < cityBikeNetwork.networks.length; i++) {
                // if statement to check if city location matches userInput. API data changed to all lowercase
                    // Used .includes() method to account for citys in the USA. This is because there is non an individual key for state and that data is included in the city key.
                if (cityBikeNetwork.networks[i].location.city.toLowerCase().includes(userInput)) {
                    console.log('Yes! ' + i)
                    // return and redefine networkEndPoint as the href for the itteration of 'i'
                        // return will stop loop at first network found.
                    networkEndPoint = cityBikeNetwork.networks[i].href

                    // return networkEndPoint

                    // **** COME BACK TO THIS LATER TO HANDLE INSTANCES WHERE THERE MAY BE MULTIPLE RESULTS ****

                    console.log(networkEndPoint)

                } /* else {
                    console.log('No!')
                } */
            }

            // Do another fetch into second level of data for network locations using networkEndPoint (href)
            fetch(`https://api.citybik.es/${networkEndPoint}`).then((data) => {
            return data.json()
            }, (err) => {
                console.log(err, ` ERROR`)
            }).then((cityBikeLocation) => {
                console.log(cityBikeLocation.network.stations[0].name)


            // // return API data for network name in html
            // document.querySelector('#network-name').innerHTML = cityBikeData.networks[0].name
            // // return API data for network city in html
            // document.querySelector('#network-city').innerHTML = cityBikeData.networks[0].location.city
            // // return API data for network country in html
            // document.querySelector('#network-country').innerHTML = cityBikeData.networks[0].location.country
            })
        })
    })
}