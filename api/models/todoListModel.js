'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);

var CommentSchema = new Schema({
  task: {
    type: String,
    ref: 'Tasks'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    required: 'Enter the text of the comment'
  }
});

module.exports = mongoose.model('Comments', CommentSchema);
