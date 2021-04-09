const path = require('path')
const express = require('express')
const hbs = require('hbs')
const priceHistory = require('./utils/flight-price-history')
const getCityData = require('./utils/get-city-data')

const app = express()
const port = process.env.PORT || 3000 // For Heroku

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Vôo Mais Barato'
	})
})

app.get('/flights', (req, res) => {
	const data = {
		currency: 'BRL',
		limit: 4
	}

	if (req.query.currency) data.currency = req.query.currency
	if (req.query.destination) data.destination = req.query.destination
	if (req.query.origin) data.origin = req.query.origin
	if (req.query.limit) data.limit = req.query.limit

	priceHistory(data, (error, {flightInfo} = {}) => {
		if (error) {
			return res.send({
				error: error
			})
		}

		flightInfo.forEach((flight) => {
			flight.departureInfo = getCityData(req.query.origin)
			// flight.destinationInfo = getCityData(req.query.destination.toUpperCase()) !== undefined ? getCityData(req.query.destination.toUpperCase()) : {name: flight.destination}
			// console.log(flight.destination)
		})

		return res.send({
			flightInfo
		})
	})
})

app.listen(port, () => {
	console.log('Server up and runnning')
})