const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27099/cheap-flights', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
})

// sudo /Users/matheuswd/mongodb/bin/mongod --dbpath=/Users/matheuswd/mongodb-data/ --port 27099
