const express      = require('express'),
      bodyParser   = require('body-parser'),
      _            = require('lodash')

const { mongoose } = require('./db/mongoose'),
      { Todo }     = require('./models/todo'),
      { User }     = require('./models/user')

const { ObjectId } = require('mongodb')

const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post(/(todos?)/, (req, res) => {
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

app.delete('/todos/:id', (req, res) => {
	const id = req.params.id

	Todo.findByIdAndRemove(id)
		.then(todo => {
			if(!todo) {
				return res.status(404).send()
			}
			res.send({ todo })
		})
		.catch(e => {
			res.status(404).send(e)
		})
})

app.patch('/todos/:id', (req, res) => {
	const id = req.params.id
	const body = _.pick(req.body, ['text', 'completed'])

	if(_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime()
	} else {
		body.completed = false
		body.completedAt = null
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
		.then(todo => {
			if(!todo) {
				return res.status(404).send
			}
			res.send({ todo })
		})
		.catch(e => {
			res.status(404).send(e)
		})
})

app.post('/user', (req, res) => {
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
