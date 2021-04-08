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
				error: 'Houve um error'
			})
		}

		return res.send({
			flightInfo
		})
	})
})

app.listen(port, () => {
	console.log(port)
	console.log('Server up and runnning')
})