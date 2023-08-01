// CityBike Locator app
// API: https://api.citybik.es/v2/#filter

window.onload = (e) => {
    // add event listener for input field on html form
    document.querySelector('form').addEventListener('submit', (e) => {
        // prevent page from reloading when even listener is activated
        e.preventDefault()
        // initialize variable for userInput. Variable is changed to lowercase to help with search.
        const userInput = document.querySelector('input[type="text"]').value.toLowerCase()
        // console.log(userInput)

        // declare variable for API network endpoint (href)
        let networkEndPoint = ''

        // define function to clear list of results
        const removeAllStations = (parent) => {
            while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
            }
        }

        // define resultsDiv to be used with removeAllStations later
        let resultsDiv = document.querySelector('.results')

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
                    // initialize network based off search
                    const network = cityBikeNetwork.networks[i]

                    // redefine networkEndPoint as the href for the itteration of 'i'
                    networkEndPoint = network.href
                    // return API data for network name in html
                    // document.querySelector('#network-name').innerHTML = network.name
                    // // return API data for network city in html
                    // document.querySelector('#network-city').innerHTML = network.location.city
                    // // return API data for network country in html
                    // document.querySelector('#network-country').innerHTML = network.location.country

                    break

                    // **** COME BACK TO THIS LATER TO HANDLE INSTANCES WHERE THERE MAY BE MULTIPLE RESULTS ****

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
                // initialize networkStations from search
                let networkStations = cityBikeLocation.network.stations

                // initialize max result number of 100 or less shown
                // **** FUTURE UPDATE -- CHANGE TO EVENT LISTENER SO USER CAN DECIDE MAX # OF RESULTS ****
                let resultsMax = 100

                // define function checking if a network has more/less than 100 stations and adjusting accordingly for the for loop
                const stationsMax = (network) => {
                    if (network.length < 100) {
                        resultsMax = network.length
                    }
                }

                // calling stationsMax function with the current network searched for.
                stationsMax(networkStations)

                
                // call removeAllStations funciton with the argument of results list to clear search when a new search is entered.
                removeAllStations(resultsDiv)
                
                // Create "network-result" div once a search has happened.
                let resultsListDiv = document.createElement('div')
                resultsListDiv.setAttribute('id','results-list')
                resultsDiv.appendChild(resultsListDiv)

                // loop through all network location names
                for (let i = 0; i < resultsMax; i++) {
                    // Create a div to house the stations information with an id of the station name
                    let stationDiv = document.createElement('div')
                    stationDiv.setAttribute('class', 'station')
                    resultsListDiv.appendChild(stationDiv)
                    
                    // Create a header with the name of the station
                    let stationH4Name = document.createElement('h4')
                    stationH4Name.innerHTML = networkStations[i].name
                    stationDiv.appendChild(stationH4Name)

                    // Create and define the number of bikes available at the specific station
                    let dtBikesAvail = document.createElement('dt')
                    dtBikesAvail.innerHTML = 'Bikes Available: ' + networkStations[i].free_bikes                    
                    stationDiv.appendChild(dtBikesAvail)
                    
                    // Create and define the number of empty stalls at the specific station
                    let dtStallsAvail = document.createElement('dt')
                    dtStallsAvail.innerHTML = 'Empty Stalls: ' + networkStations[i].empty_slots                    
                    stationDiv.appendChild(dtStallsAvail)
                }
                console.log('complete with ' + cityBikeLocation.network.stations.length + ' stations shown')
                // console.log(networkStations[99].name)
            
                // add event listener for a click on a specific station div. This will pull data for that station and highlight it in it's own section.
                const testFunction = () => {console.log('you clicked')}
                
                document.addEventListener("click", testFunction)

                
            })
        })
    })
}