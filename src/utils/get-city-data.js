const fs = require('fs')
const path = require('path')

const srcPath = path.join(__dirname, '..')

const getCityData = function(airportCode) {
	const buffer = fs.readFileSync(`${srcPath}/static/airports.json`)
	const data = JSON.parse(buffer)
	return data.filter((airport) => {
		return airportCode === airport.code
	})[0]
}

module.exports = getCityData
