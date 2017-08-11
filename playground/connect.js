const { MongoClient, ObjectID } = require('mongodb')
const url = 'mongodb://localhost:27017/TodoApp'

MongoClient.connect(url, (err, db) => {
	if(err) {
		return console.log('unable to connect to mongo server')
	}
	console.log('Connected to Mongo server')

	db.close()
})
