const express = require('express'),
      bodyParser = require('body-parser')

const { mongoose } = require('db/mongoose'),
      { Todo } = require('models/todo'),
      { User } = require('models/user')

const app = express()
app.listen(3000, () => {
	console.log('Started on 3000')
})
