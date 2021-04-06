const path = require('path')
const express = require('express')
const hbs = require('hbs')
const priceHistory = require('./utils/flight-price-history')

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
		title: 'Your Cheapest Flights'
	})
})

app.get('/flights', (req, res) => {
	if(!req.query.origin) {
		return res.send({
			error: 'You must provide a valid origin point'
		})
	}

	priceHistory({currency: 'BRL', origin: req.query.origin, limit: 3}, (error, {flightInfo}) => {
		return res.send({
			flightInfo
		})
	})
})

app.listen(port, () => {
	console.log('Server up and runnning')
})