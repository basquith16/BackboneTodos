var TodoItemView = Backbone.View.extend({
  tagName: "li",
  initialize: function(options) {
    if (!(options && options.model))
      throw new Error("model is not specified.");

    this.model.on("change", this.render, this);
  },

  events: {
    "click #toggle": "onClickToggle",
    "click #delete": "onClickDelete"
  },

  onClickDelete: function() {
    this.model.destroy();
    this.$el.fadeOut("slow");
  },

  onClickToggle: function() {
    this.model.toggle();
    this.model.save();
  },

  render: function() {
    this.$el.attr("id", this.model.id);
    this.$el.toggleClass("completed", this.model.get("completed"));

    var template = $("#todoItemTemplate").html();
    var html = Mustache.render(template, this.model.toJSON());
    this.$el.html(html);

    return this;
  }
});



  var TodoItemsView = Backbone.View.extend({

    initialize: function(options) {
      if (!(options && options.model))
        throw new Error("model is not specified.");
      this.model.on("add", this.onAddTodoItem, this);
      this.model.on("remove", this.onRemoveTodoItem, this)
    },

    // onRemoveTodoItem: function(todoItem) {
    //   this.$("li#" + todoItem.id).fadeOut("slow");
    // },

    onAddTodoItem: function(todoItem) {
      var view = new TodoItemView({ model: todoItem });
      this.$("#todoItems").append(view.render().$el)
    },

    events: {
      "keypress #newTodoItem": "onKeyPress"
    },

    onKeyPress: function(e){
      if (e.keyCode == 13){
        var $textBox = this.$("#newTodoItem");

        if ($textBox.val()){
          var todoItem = new TodoItem({ title: $textBox.val() });
          this.model.create(todoItem);

          $textBox.val("");
        }
      }
    },

    render: function() {
      var template = $("#todoItemsTemplate").html();
      var html = Mustache.render(template);
      this.$el.html(html);

      return this;
    }
  });
