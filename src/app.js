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
	if(!req.query.origin) {
		return res.send({
			error: 'You must provide a valid origin point'
		})
	}

	return priceHistory({
		currency: 'USD',
		origin: req.query.origin,
		limit: 10
	}, (error, response) => {
		res.send({
			response
		})
	})
})

app.listen(3000, () => {
	console.log('Server up and runnning')
})