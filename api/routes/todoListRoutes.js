'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');
  app.route('/')
    .get((req, res) => {
      res.json({
        'self': 'http://localhost:3000/',
        'tasks': 'http://localhost:3000/tasks'
      });
    });

  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);

  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .patch(todoList.update_a_task)
    .delete(todoList.delete_a_task);

  app.route('/tasks/:taskId/comments')
    .get(todoList.list_all_comments)
    .post(todoList.create_a_comment);

  app.route('/tasks/:taskId/comments/:commentId')
    .get(todoList.read_a_comment)
    .put(todoList.update_a_comment)
    .patch(todoList.update_a_comment)
    .delete(todoList.delete_a_comment);

};
