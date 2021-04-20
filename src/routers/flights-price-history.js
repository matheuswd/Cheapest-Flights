const express = require('express')
const mongoose = require('mongoose')
const router = new express.Router()

const priceHistory = require('../utils/flight-price-history')
const getCityData = require('../utils/get-city-data')

router.get('/flights', (req, res) => {
	const data = {
		currency: 'BRL',
		limit: 4
	}

	if (req.query.currency) data.currency = req.query.currency
	if (req.query.destination) data.destination = req.query.destination.toUpperCase()
	if (req.query.origin) data.origin = req.query.origin.toUpperCase()
	if (req.query.limit) data.limit = req.query.limit

	priceHistory(data, (error, {flightInfo} = {}) => {
		if (error) {
			return res.send({
				error: error
			})
		}

		flightInfo.forEach((flight) => {
			flight.departureInfo = getCityData(data.origin)
			if (req.query.destination) {
				flight.destinationInfo = getCityData(req.query.destination)
			} else if (!req.query.destination && getCityData(flight.destination) === undefined) {
				flight.destinationInfo = { name_translations: { pt: flight.destination } }
			} else {
				flight.destinationInfo = getCityData(flight.destination)
			}
		})

		

		return res.send({
			flightInfo
		})
	})
})

module.exports = router
