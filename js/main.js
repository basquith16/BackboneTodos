$(document).ready(function() {
  var todoItem = new TodoItem();
  var todoItems = new TodoItems();
  todoItems.fetch();

  var todoItemsView = new TodoItemsView({
    model: todoItems
  });
  $('body').append(todoItemsView.render().$el);

  var todoItemView = new TodoItemView({
    model: todoItem
  });
  $('body').append(todoItemView.render().$el);
});
