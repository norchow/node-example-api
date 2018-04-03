'use strict';
var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks'),
  Comment = mongoose.model('Comments');

function append_links_to_task(task){
  task.links = {
    'self': 'http://localhost:3000/tasks/'+task.id,
    'comments': 'http://localhost:3000/tasks/'+task.id+'/comments'
  }
  return task;
}

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task.map(append_links_to_task));
  });
};

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(append_links_to_task(task));
  });
};

exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(append_links_to_task(task));
  });
};

exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(append_links_to_task(task));
  });
};

exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

// COMMENTS
function append_links_to_comment(comment){
  comment.links = {
    'self': 'http://localhost:3000/tasks/'+comment.task+'/comments/'+comment.id,
    'task': 'http://localhost:3000/tasks/'+comment.task
  }
  return comment;
}

exports.list_all_comments = function(req, res) {
  Comment.find({}, function(err, comment) {
    if (err)
      res.send(err);
    res.json(comment.map(append_links_to_comment));
  });
};

exports.create_a_comment = function(req, res) {
  var new_comment = new Comment(req.body);
  new_comment.save(function(err, comment) {
    if (err)
      res.send(err);
    res.json(append_links_to_comment(comment));
  });
};

exports.read_a_comment = function(req, res) {
  Comment.findById(req.params.commentId, function(err, comment) {
    if (err)
      res.send(err);
    res.json(append_links_to_comment(comment));
  });
};

exports.update_a_comment = function(req, res) {
  Comment.findOneAndUpdate({_id: req.params.commentId}, req.body, {new: true}, function(err, comment) {
    if (err)
      res.send(err);
    res.json(append_links_to_comment(comment));
  });
};

exports.delete_a_comment = function(req, res) {
  Comment.remove({
    _id: req.params.commentId
  }, function(err, comment) {
    if (err)
      res.send(err);
    res.json({ message: 'Comment successfully deleted' });
  });
};
