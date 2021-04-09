const path = require('path')
const express = require('express')
const hbs = require('hbs')
const priceHistory = require('./utils/flight-price-history')
const getCityName = require('./utils/get-city-name')

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
	if(!req.query.origin) {
		return res.send({
			error: 'É preciso inserir um ponto de partida válido, como GRU, OPO, LIS, LON, LGA'
		})
	}

	priceHistory({
		currency: 'BRL',
		origin: req.query.origin,
		limit: 4
	}, (error, {flightInfo} = {}) => {
		if (error) {
			return res.send({
				error: 'Houve um erro'
			})
		}

		flightInfo.forEach((flight) => {
			flight.dpartureInfo = getCityName(flight.origin)
			flight.destinationInfo = getCityName(flight.destination)
		})

		return res.send({
			// departureCity: getCityName(req.query.origin)[0],
			arrivalCity: flightInfo.destination + 'aa',
			flightInfo
		})
	})
})

app.listen(port, () => {
	console.log('Server up and runnning')
})