
var app = app || {};

app.AppView = Backbone.View.extend({
    el : '#trello',
    
    initialize : function() {
        this.listenTo(app.Boards , 'new', this.createNew);
        this.listenTo(app.Boards , 'show', this.showBoards);
    },
    //Create a new board
    createNew : function(board){
        var view = new app.BoardView({ model: board });
        DebugMsg("will create a new board")
        },
    showBoards : function (){
        DebugMsg("Will show all the boards, with one line description")
    }


});
