
/*
 * GET home page.
 */

exports.index = function(Todo) {
  return function(req, res) {
    Todo.find({}, function(error, todos) {
      res.render('index', {
        title: 'Do YR Work',
        todos : todos
      });
    });
  };
};

exports.addTodo = function(Todo) {
  return function(req, res) {
    var todo = new Todo(req.body);
    todo.save(function(error, todo) {
      if (error || !todo) {
        res.json({ error : error });
      } else {
        res.json({ todo : todo });
      }
    });
  };
};

exports.get = function(Todo) {
  return function(req, res) {
    Todo.find({}, function(error, todos) {
      res.json({ todos : todos });
    });
  }
};

exports.update = function(Todo) {
  return function(req, res) {
    Todo.findOne({ _id : req.params.id }, function(error, todo) {
      if (error || !todo) {
        res.json({ error : error });
      } else {
        todo.done = req.body.done;
        todo.save(function(error, todo) {
          if (error || !todo) {
            res.json({ error : error });
          } else {
            res.json({ todo : todo });
          }
        });
      }
    });
  }
};

exports.delete = function(Todo) {
  return function(req,res) {
    Todo.remove({_id: req.params.id}, function(error, todo) {
      if(error || !todo) {
        res.json({error: error + 'FUCK U'});
      }

      //get and return all the todos after deleting one...
      Todo.find({}, function(error, todos) {
        res.json(todos);
      });           
  });
  }
}