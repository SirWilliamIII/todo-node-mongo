const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		tokens: {
			type: String,
			required: true
		}
	}]
})

UserSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()

	return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
	const user = this
	const access = 'auth'
	const secret = 'titties'
	const token = jwt.sign({_id: user._id.toHexString(), access} , secret).toString()

	user.tokens.push({
		access,
		token
	})

	return user.save()
		.then(() => {
			return token
		})
}

const User = mongoose.model('User', UserSchema)

module.exports = { User }
