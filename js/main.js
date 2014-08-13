
var app = app || {}

$(function (app){
    //Model for the board
    app.Board = Backbone.Model.extend({
        name:''
        
    
    });
    
    
    app.BoardCollection =  Backbone.Collection.extend({
        model : app.Board,
        
        //save to local storage,
       //localStorage : new Backbone.LocalStorage('all-boards')
       localStorage: new Backbone.LocalStorage('all-boards')

    });
    
   // Global collection of Boards;
    app.AllBoards = new app.BoardCollection();
   
    app.TestView = Backbone.View.extend({
        //app: app,
        el : $('#dispay-area'),
        // newboard : _.template("An example template"),
        newboard : _.template($("#new-board-template").html() ),
    events :{
        'click #create': 'create' 

    },
    
    
   // model : app.AllBoards,
    render : function (){
        this.$el.html(this.newboard());
        console.log("in newboard render");
        console.log(this.$el);
        return this;
    },
    initialize : function (){
        this.render();
        app.AllBoards.fetch();
        console.log(app.AllBoards);
        //this.listenTo(this.model, 'change', this.render);
        //this.listenTo(this.model, 'destroy', this.remove);        // NEW
        //this.listenTo(this.model, 'visible', this.toggleVisible); // NEW
     
     //  this.listenTo(app.AllBoards, 'add',this.create);
       // this.listenTo(app.AllBoards, 'change', this.render());
    },
    newattributes : function(){
        var tmp = $('#board-name').val();
        console.log(tmp);
        //console.log(this.$input.val().trim());
        return{
         name : tmp.trim()
         };
     
     }, 
    create : function (){
        console.log("In create");
       // console.log(this.newattributes());
        this.model.add( this.newattributes() );
        console.log(this.model);
       // this.model.save(this.newattributes() );
        //this.close();
        console.log(app.AllBoards);
    },
    close: function() {
     // var value = this.$input.val().trim();
      var value = $('#board-name').val();
      
      if ( value ) {
          this.model.save({ name: value });
      }else {
          this.clear(); // NEW
      }
      },
       clear: function() {
          this.model.destroy();
    }
      
    });
    // Define a new view
    app.AddNewBoardView = Backbone.View.extend({
           events : {
            click : function(e) {
              // CHECK IF THE newboardview is already present
              if (!newboardview){
                  // console.log(view.el === e.target);
                  var newboardview = new app.TestView({model: app.AllBoards});
                  //console.log(newboardview);
                  

              }
           }
        }
    
    });

    var view = new app.AddNewBoardView({el:$('#add-board')});
    //console.log(view.el);
    //button1.trigger('click');
    
});