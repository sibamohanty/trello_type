// View for list of all boards created so far

var app = app || {}

app.AllBoardsView  = Backbone.View.extend({
    el: '#allboards',

    initialize: function( initialBoards ) {
        this.collection = new app.AllBoardsView( initialBoards );
        this.render();
    },

    // render library by rendering each book in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderBoard( item );
        }, this );
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderBoard: function( item ) {
        var boardView = new app.BoardView({
            model: item
        });
        this.$el.append( boardView.render().el );
    }
});
