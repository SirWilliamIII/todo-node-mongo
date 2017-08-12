const express      = require('express'),
      bodyParser   = require('body-parser'),
      { ObjectId } = require('mongodb'),
      _            = require('lodash')

const { mongoose } = require('./db/mongoose'),
      { Todo }     = require('./models/todo'),
      { User }     = require('./models/user')

const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})
	todo.save()
		.then(doc => {
			res.send(doc)
		}, e => {
			res.status(400).send(e)
		})
})

app.get('/todos', (req, res) => {
	Todo.find().then(todos => {
		res.send({ todos })
	}, e => {
		res.status(400).send(e)
	})
})

app.get('/todos/:id', (req, res) => {
	const id = req.params.id

	Todo.findById(id).then(todo => {
		if(!todo) {
			return res.status(404).send()
		}
		res.send({ todo })
	}).catch(e => {
		res.status(404).send(e)
	})
})

app.post('/users', (req, res) => {
	const body = _.pick(req.body, ['email', 'password'])
	const user = new User(body)

	user.save()
		.then(() => {
			return user.generateAuthToken()
		})
		.then(token => {
			res.header('x-auth', token).send(user)
		})
		.catch(e => {
			res.status(400).send(e)
		})
})

app.listen(port, () => {
	console.log(`Started on port ${port}`)
})
