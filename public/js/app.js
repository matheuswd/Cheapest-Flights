console.log('Client side javascript file is loaded!')

const flightForm = document.querySelector('form')
const search = document.querySelector('input')

const flightsDiv = document.querySelector('#flights')

flightForm.addEventListener('submit', (e) => {
	e.preventDefault()

	flightsDiv.textContent = ''

	const location = search.value
	let html = ''

	fetch(`/flights?origin=${location}`)
	.then((response) => {
		response.json().then(({flightInfo} = {}) => {
			flightInfo.forEach((flight) => {
				html += `<div class="card">
					<div class="card__wrapper">
						<span>Origem: ${flight.departureInfo.name_translations.pt}</span><p class="card__departure-airport">${flight.origin}</p>
						<span>Destino: ${flight.destinationInfo.name_translations.pt}</span><p class="card__arrival-airport">${flight.destination}</p><span></span>
					</div>
					<div class="info__wrapper">
						<div class="first-part">
							<span>Data de ida:</span><p class="card__departure-date">${flight.depart_date}</p>
							<span>Data de volta:</span><p class="card__return-date">${flight.return_date}</p>
						</div>
						<div class="second-part">
							<span>Onde comprar:</span><p class="card__gate">${flight.gate}</p>
							<span>Escalas:</span><p class="card__number-of-changes">${flight.number_of_changes}</p>
						</div>
						<div class="third-part">
							<button class="card__price">R$ ${flight.value}</button>
						</div>
					</div>
				</div>`
			})
			flightsDiv.innerHTML = html
		}).catch((e) => {
			flightsDiv.innerHTML = `<h4>Aeroporto de origem não encontrado</h4>`
		})
	})
})

// heroku create unique-name
// add  "start": "node src/app.js" to the scripts section in package.json
// git push heroku main

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