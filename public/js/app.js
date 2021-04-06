console.log('Client side javascript file is loaded!')

const flightForm = document.querySelector('form')
const search = document.querySelector('input')

const flightsDiv = document.querySelector('#flights')
const fragment = document.createDocumentFragment();

flightForm.addEventListener('submit', (e) => {
	e.preventDefault()

	flightsDiv.textContent = ''

	const location = search.value

	fetch(`/flights?origin=${location}`)
	.then((response) => {
		response.json().then(({flightInfo}) => {
			flightInfo.forEach((flight) => {
				const p = document.createElement('p')
				p.textContent = `Existe um voo de ida e volta de ${flight.origin} para ${flight.destination} ao preço de R$ ${flight.value}, saindo no dia ${flight.depart_date} e voltando em ${flight.return_date}`
				fragment.appendChild(p)
			})
			flightsDiv.appendChild(fragment)
		})
	})
})

// heroku create unique-name
// add  "start": "node src/app.js" to the scripts section in package.json


// return res.send({
// 	value: flightInfo[0].value,
// 	trip_class: flightInfo[0].trip_class,
// 	show_to_affiliates: flightInfo[0].show_to_affiliates,
// 	origin: flightInfo[0].origin,
// 	destination: flightInfo[0].destination,
// 	gate: flightInfo[0].gate,
// 	depart_date: flightInfo[0].depart_date,
// 	return_date: flightInfo[0].return_date,
// 	number_of_changes: flightInfo[0].number_of_changes,
// 	found_at: flightInfo[0].found_at,
// 	duration: flightInfo[0].duration,
// 	distance: flightInfo[0].distance,
// 	actual: flightInfo[0].actual 
// })