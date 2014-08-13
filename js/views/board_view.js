// How a board looks like

var app = app || {};

app.BoardsView = Backbone.View.extend({
    tagName: 'div',
    className: 'board',
    template: _.template( $( '#board_template' ).html() ),

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.attributes ) );

        return this;
    }
});