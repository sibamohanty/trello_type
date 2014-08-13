

var app = app || {};

app.Tasks = Backbone.Model.extend({
    name: "",
    description : "",
    status : 1  //1 yet to start, 2, ongoing, 3 finished.

});

app.TaskCollection = Backbone.Collection.extend({
    model : app.Tasks,
     initialize : function (){
        console.log(" Am  in initialize");
        this.on('add', function (model){
            console.log("There is a addition to task");
            model.save();
        });
        this.on('remove', function (model){
            console.log("There is an removal from the Task colletion");
            console.log(model.get('name'));
           // model.save();
        });
        this.on('change', function(model){
            console.log("There is a change in the model");
            
        });
        this.on('reset', function (model, options){
            console.log("There is a reset event")
            console.log("All the previous data are here");
            console.log(options.previousModels);
        });
        this.fetch();
         
    }

})


// Individual Boards 
app.Board = Backbone.Model.extend({
    name: "",
    
   // taskList : app.
    validate : function (attributes){
        if (attributes.name===undefined || attributes.name===''){
        return "Add a name plz";
        }
    },
    initialize : function (){
        this.tasks = new app.TaskCollection;
        this.tasks.url = '/board/' + this.id + '/tasks';
        //this.messages.on("reset", this.updateCounts);
        this.on("invalid", function (model, error){
            console.log(error);
        });
    }
});


//Board collection
app.BoardCollection = Backbone.Collection.extend({
    model : app.Board,
    localStorage: new Backbone.LocalStorage('all-boards'),
    initialize : function (){
        console.log(" Am  in initialize");
        this.on('add', function (model){
            console.log("There is a addition to board collecion");
            model.save();
        });
        this.on('remove', function (model){
            console.log("There is an removal from the board colletion");
            console.log(model.get('name'));
           // model.save();
        });
        this.on('change', function(model){
            console.log("There is a change in the model");
            
        });
        this.on('reset', function (model, options){
            console.log("There is a reset event")
            console.log("All the previous data are here");
            console.log(options.previousModels);
        });
        this.fetch();
         
    }
});
// new global instance of board collection

app.AllBoards = new app.BoardCollection();

//This is the view to handle the adding of new board

app.TestView = Backbone.View.extend({
        //app: app,
        el : $('#dispay-area'),
        // newboard : _.template("An example template"),
        newboard : _.template($("#new-board-template").html() ),
        task_tmpl : _.template( $("#task-template").html()),
    events :{
        'click #create': 'create' ,
        'click #close': 'close'

    },
    
    
   // model : app.AllBoards,
    render : function (){
        this.$el.html(this.newboard());
        
        this.$el.show();
        console.log("in newboard render");
        console.log(this.$el);
        return this;
    },
    initialize : function (){
        this.render();
        //app.AllBoards.fetch();
        //console.log(app.AllBoards);
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
       // this is where it will take the Board Model and 
       // create the TaskListView.
       //
        this.model.add( this.newattributes() );
        //$("#center-display-area").append(this.task_tmpl());
        // Show the three list view of task 
        app.tasklistview = new app.TaskListViews({model:this.newattributes()});
        //console.log(this.model);
       // this.model.save(this.newattributes() );
        //this.close();
        //console.log(app.AllBoards);
    },
    close: function() {
        this.clear();
        
     },
    clear: function() {
          this.$el.hide();
          //this.$el.html('');
          //this.remove();
          //this.destroy();
          
    }
      
});

app.TaskListViews  = Backbone.View.extend({
    el : "#center-display-area",
    
    //there is no events here as of now
    events :{},
    task_tmpl : _.template( $("#task-template").html()),
    initialize : function (){
        this.render();
       // this.listenTo(this.model, 'change', this.render);
        //this.listenTo(this.model, 'destroy', this.remove);   
    },
    render : function (){
        console.log("The three task lists will be displayed here");
        this.$el.append(this.task_tmpl({name:this.model.name}));
        console.log(this.model.name);
        //this.$el.html(this.t)
        return this;
    }

});

//This is how a single board will look on the left hand sided board list
app.BoardView = Backbone.View.extend({
   
    tagName: 'div',
    className: 'board',
    //newboard : _.template($("#new-board-template").html() ),
    template : _.template( $( '#board-template').html() ),
    events :{
        'dblclick label': 'edit',
        'click #delete' : 'clear',
        'click #name' : 'showTasks'
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);        
    },


    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
         //console.log( this.newboard(this.model.attributes) );
         //console.log(this.model);
         //console.log(this.model.get('name'))
         this.$el.html( this.template( this.model.attributes ) );
        //this.$el.html(this.newboard());
        console.log(this);
        return this;
    },
    showTasks : function (){
        console.log("Will show all the tasks for the given board here");
    },
    edit :function (){
        console.log("Allow to make edit to the board name");
    },
    clear: function (){
        console.log("Will completely destroy this model");
        this.model.destroy();
    }

});

app.BoardListView = Backbone.View.extend({
    //model :app.BoardCollection,
    el : "#left-panel",
    events :{
        
        'click #close': 'close',
       
    },
    initialize : function (){
        this.render ();
        this.listenTo(this.model,'add', this.addBoard);
        this.listenTo(this.model,'remove',this.render);
        this.model.fetch();
        
    },
    render : function(){
        console.log("Will show the Board list here");
        $('#left-panel').html('');
        if(this.model.length){
            
            this.model.each(this.addBoard, this);
        
        }else {
            alert("Create a  board by using the add button on the left hand panel");
        }
        
    },
    close : function (){
        console.log("Will close the left side panel");
        //this.hide();
    },
    addBoard : function (board){
        console.log(board);
        //
        var name = board.get('name');
        var boardview = new app.BoardView({model:board});
        //console.log(boardview.render());
        $('#left-panel').append(boardview.render().el);
    }
});
app.showBoards = Backbone.View.extend({
    el : '#show-boards',
    events : {
        click : function(e){
            console.log("Show Boards is clicked");
            if (!app.boardlistview){
                app.boardlistview = new app.BoardListView({model:app.AllBoards});
            }else {
                var css = app.boardlistview.$el.css('display');
                if (css=== 'block'){
                    app.boardlistview.$el.hide();
                }
                else{
                    app.boardlistview.$el.show()
                }
            }
        }
    }
})

app.addBoardView = Backbone.View.extend({
    el : '#add-board',
    events : {
            click : function(e) {
                // CHECK IF THE newboardview is already present
                  console.log("Clicked on the add board div");
                 
                  if (!app.newboardview){
                      app.newboardview = new app.TestView({model:app.AllBoards});
                  }else{
                     //app.newboardview.render();
                     var css = app.newboardview.$el.css('display');
                     if (css=== 'block'){
                        app.newboardview.$el.hide();
                     }
                     else{
                        app.newboardview.$el.show()
                     }
                      
                }
            
           }
        }


});
   

$(function(){
    //console.log(app);
    new app.addBoardView({el:$('#add-board')}); 
    new app.showBoards();
});


