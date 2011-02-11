(function($) {

$.widget("ui.mapview", {
    options: {
    },
    
    _create: function() {
        var self = this;
        this.element.addClass("ui-mapview");
    },
    
    destroy: function() {
        this.element.removeClass("ui-mapview");
    }
});

})(jQuery);
