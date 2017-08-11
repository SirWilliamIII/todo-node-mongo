const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017/TodoApp'

MongoClient.connect(url, (err, db) => {
	assert.equal(null, err);
	console.log("Connected successfully to server")

	db.collection('Todos').insertOne({
		text: 'Something I must todo',
		completed: false,
		importance: 2
	}, (err, result) => {
		if(err) {
			return console.log('unable to insert todo', err)
		}
		console.log(JSON.stringify(result.ops, undefined, 2))
	})


	db.close()
})
