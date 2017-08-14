// const { MongoClient, ObjectID } = require('mongodb')
// const url = 'mongodb://localhost:27017/TodoApp'
// 
// MongoClient.connect(url, (err, db) => {
// 	if(err) {
// 		return console.log('unable to connect to mongo server')
// 	}
// 	console.log('Connected to Mongo server')
// 
// 	// db.collection('Todos').find({
// 	// 	_id: new ObjectID('598e07c73c777cf1506fc1df')
// 	// }).toArray()
// 	// 	.then(docs => {
// 	// 		console.log('Todos')
// 	// 		console.log(JSON.stringify(docs, undefined, 2))
// 	// 	}, err => {
// 	// 		console.log('unable to fetch todos', err)
// 	// 	})
// 
// 	// db.collection('Todos').find().count()
// 	// 	.then(count => {
// 	// 		console.log(`Todos count: ${count}`)
// 	// 	}, err => {
// 	// 		console.log('Unable to fetch todos', err)
// 	// 	})
// 
// 
// 	db.collection('Users').find({
// 		name: 'Alice'
// 	}).toArray()
// 		.then(docs => {
// 			console.log(JSON.stringify(docs, undefined, 2))
// 		})
// 
// 	//db.close()
// })
