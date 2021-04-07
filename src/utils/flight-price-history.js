// Flight Price History API
const request = require('postman-request')

/**
 * @param parameters {Object} The parameters for the query
 * @param parameters.origin {String} The point of departure. The IATA city code or the country code. The length - from 2 to 3 symbols
 * @param parameters.destination {String} The point of destination. The IATA city code or the country code. The length - from 2 to 3 symbols
 * @param parameters.beginning_of_period {string} The beginning of the period, within which the dates of departure fall (in the YYYY-MM-DD format, for example, 2016-05-01). Must be specified if period_type is equal to month
 * @param parameters.period_type - year or month
 * @param parameters.token {string} The individual affiliate token
 * @param parameters.limit {number} The number of flight returned.
 * @param parameters.currency {string} The currency's acronym. 
 * @param parameters.one_way {boolean} True for one way, false for back-to-back. The default value is false
 * @param parameters.page {number} A page number. The default value is 1
 * @param parameters.show_to_affiliates {boolean} False for all the prices, true for just the prices, found using the partner marker (recommended). The default value is true
 * @param parameters.sorting {string} The assorting of prices: Price — by the price (the default value). For the directions, only city - city assorting by the price is possible route — by the popularity of a route distance_unit_price — by the price for 1 km
 * @param parameters.trip_duration {number} The length of stay in weeks or days (for period_type=day)
 */
const priceHistory = (parameters, callback) => {
	let options = { } // no default options right now

	// Instead of creating an if statement for each option
	Object.keys(parameters).forEach(key => {
		options[key] = `&${key}=${parameters[key]}`
	})

	const token = '74ea92d8ddaa6539ed06c1cfc870ccf9'
	let url = `http://api.travelpayouts.com/v2/prices/latest?&token=${token}`
	
	Object.keys(options).forEach(key => {
		url += options[key]
	})
	
	console.log(url)
	request({url: url, json: true}, (error, {body}) => {
		if(error) {
			callback(error, undefined)
		} else if(body.data === null) {
			callback(body, undefined)
		} else {
			callback(undefined, {
				flightInfo: body.data
			})
		}
	})
}

module.exports = priceHistory
