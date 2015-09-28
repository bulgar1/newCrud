var mongoose = require('mongoose'); //this line imports 'mongoose'.

var botleSchema = new mongoose.Schema({ //this function says that when data is sent to mongodb to format the data according to the Schem

	brand: String,
	created: Date,
	img: String,
	desc: {
		type: String,
		maxlength: 250
	},
	dateDeleted: {
		type: Date,
		default: null
	},
	DateCreated: Date,
	botles: [{
		body: String,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		dateCreated: Date
	}],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},

	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "botleComment"
	}]


});

mongoose.model("botle", botleSchema)
