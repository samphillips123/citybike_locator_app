// CityBike Locator app
// API: https://api.citybik.es/v2/#filter

window.onload = (e) => {

    // TESTING
    let cityBikeLocation = {
        network: {
            name: 'Denver B-Cycle',
            stations: [
                {
                    name: 'Colfax and Monaco',
                    free_bikes: 3,
                    empty_slots: 20
                },
                {
                    name: 'Washington Park',
                    free_bikes: 1,
                    empty_slots: 14
                },
                {
                    name: 'Five Points',
                    free_bikes: 0,
                    empty_slots: 26
                },
                {
                    name: 'Coors Field',
                    free_bikes: 15,
                    empty_slots: 2
                }
            ]
        }
    }


    // add event listener for input field on html form
    document.querySelector('form').addEventListener('submit', (e) => {
        // prevent page from reloading when even listener is activated
        e.preventDefault()
        // initialize variable for userInput. Variable is changed to lowercase to help with search.
        const userInput = document.querySelector('input[type="text"]').value.toLowerCase()
        // console.log(userInput)

        // declare variable for API network endpoint (href)
        let networkEndPoint = ''
    
        // // set up fetch to CityBike API
        // fetch(`https://api.citybik.es/v2/networks`).then((data) => {
        //     return data.json()
        // }, (err) => {
        //     console.log(err, ` ERROR`)
        // }).then((cityBikeNetwork) => {
        //     // // log the length of the API
        //     // console.log(cityBikeData.networks.length)

        //     // loop through API to find match for city location
        //     for (let i = 0; i < cityBikeNetwork.networks.length; i++) {
        //         // if statement to check if city location matches userInput. API data changed to all lowercase
        //             // Used .includes() method to account for citys in the USA. This is because there is non an individual key for state and that data is included in the city key.
        //         if (cityBikeNetwork.networks[i].location.city.toLowerCase().includes(userInput)) {
        //             // console.log('Yes! ' + i)

        //             // initialize network based off search
        //             const network = cityBikeNetwork.networks[i]

        //             // redefine networkEndPoint as the href for the itteration of 'i'
        //             networkEndPoint = network.href
        //             // return API data for network name in html
        //             document.querySelector('#network-name').innerHTML = network.name
        //             // return API data for network city in html
        //             document.querySelector('#network-city').innerHTML = network.location.city
        //             // return API data for network country in html
        //             document.querySelector('#network-country').innerHTML = network.location.country

        //             break

        //             // **** COME BACK TO THIS LATER TO HANDLE INSTANCES WHERE THERE MAY BE MULTIPLE RESULTS ****

        //         } /* else {
        //             console.log('No!')
        //         } */
        //     }

            // // Do another fetch into second level of data for network locations using networkEndPoint (href)
            // fetch(`https://api.citybik.es/${networkEndPoint}`).then((data) => {
            // return data.json()
            // }, (err) => {
            //     console.log(err, ` ERROR`)
            // }).then((cityBikeLocation) => {
            //     // console.log(cityBikeLocation.network.stations.length)


            // const test = ()




                // initialize networkStations from search
                const networkStations = cityBikeLocation.network.stations

                // test using DOM to make information for each instance of the stations
                // const stationDiv = document.createElement('div')
                // stationDiv.setAttribute('id', networkStations[0].name)

                // let resultsList = document.getElementById('results-list')
                // resultsList.appendChild(stationDiv)

                // ***** NEED TO FIGURE OUT 500 INTERNAL SERVER ERROR *****

                // loop through all network location names
                for (let i = 0; i < networkStations.length; i++) {
                    // console.log(networkStations[i].name)

                    const stationDiv = document.createElement('div')
                    stationDiv.setAttribute('id', networkStations[i].name)
                    let resultsList = document.getElementById('results-list')
                    resultsList.appendChild(stationDiv)
                    
                    const stationH4Name = document.createElement('h4')
                    stationH4Name.innerHTML = networkStations[i].name
                    stationDiv.appendChild(stationH4Name)

                    const dtBikesAvail = document.createElement('dt')
                    dtBikesAvail.innerHTML = 'Bikes Available: ' + networkStations[i].free_bikes                    
                    stationDiv.appendChild(dtBikesAvail)
                    
                    const dtStallsAvail = document.createElement('dt')
                    dtStallsAvail.innerHTML = 'Empty Stalls: ' + networkStations[i].empty_slots                    
                    stationDiv.appendChild(dtStallsAvail)
                    
                }

            
//             })
//         })
//     })
})
}