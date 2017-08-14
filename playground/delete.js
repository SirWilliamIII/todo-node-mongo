// const { MongoClient, ObjectID } = require('mongodb')
// const url = 'mongodb://localhost:27017/TodoApp'
// 
// MongoClient.connect(url, (err, db) => {
// 	if(err) {
// 		return console.log('unable to connect to mongo server')
// 	}
// 	console.log('Connected to Mongo server')
// 
// 	//  delete Many
// 	// db.collection('Todos').deleteMany({text: 'Walk kela'})
// 	// 	.then(outcome => {
// 	// 		console.log(outcome.result['ok'])
// 	// 	})
// // 
// 
// 	//  delete One
// 	db.collection('Todos').deleteOne({text: 'Walk kela'})
// 		.then(results => {
// 			console.log(results.result)
// 		})
// 	//  find One and Delete
// 
// 
// 
// 	//db.close()
// })
