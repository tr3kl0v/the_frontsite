var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

exports.user = new Schema({
	title: String,
	firstName: String,
	lastName: String,
	organization: String,
	country: String,
	language: String,
	eMail: String,
	username: String,
	password: String,
	subscriptionKey: String
})

exports.filter = new Schema({
	
})


exports.richText = new Schema({
	pageName: String,
	postPosition : String,
	postType : String,
	postOrder : Number,
	postAuthor : String,
	postDate : String,
	postModifiedDate : String,
	postStatus : String,
	postPassword : String,
	postLanguage : String,
	postName : String,
	postTitle : String,
	postExcerpt : String,
	postContent : Array
})

