const path = require('path')
const express = require('express')
const hbs = require('hbs')

const flightRouter = require('./routers/flights-price-history')

const app = express()
const port = process.env.PORT || 3000 // For Heroku

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(flightRouter)

app.get('', (req, res) => {
	res.render('index', {
		title: 'Vôo Mais Barato'
	})
})

app.listen(port, () => {
	console.log('Server up and runnning')
})