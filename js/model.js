var TodoItem = Backbone.Model.extend({
  defaults: {
    completed: false
  },

  urlRoot: "http://localhost:3000/0",

  validate: function(attrs) {
    if (!attrs.title)
      return "Title is required.";
  },

  toggle: function() {
    this.set("completed", !this.get("completed"));
  }
});
