(function($) {

var mapviewItemClass = 'ui-mapview-item';

$.widget("ui.mapview", {
    options: {
        model: [],
    },
    
    _create: function() {
        var self = this;
        this.element.addClass("ui-mapview");
    },
    
    _destroy: function() {
        this.element.removeClass("ui-mapview");
    },
    
    model: function(newModel) {
        if (arguments.length == 0)
            return this.option('model');
        return this.option('model', newModel);
    },
    
    _updateItems: function() {
        var self = this;
        $.each(this.options.model, function() {
            var data = this;
            var dataId = data[0];
            var dataElm = self.element.find('#' + dataId);
            
            if (dataElm.length == 0) {
                dataElm = self._createItem(dataId)
                    .appendTo(self.element);
            }
            dataElm
                .addClass(mapviewItemClass)
                .css({
                    left: (data[1] * 100) + '%',
                    top: (data[2] * 100) + '%'
                });
        });
    },
    
    _createItem: function(id) {
        return $('<span>', {
            'id': id
        });
    },
    
    _setOption: function(key, value) {
        $.Widget.prototype._setOption.apply( this, arguments );
        
        if (key == "model") {
            this._updateItems();
        }
    },
    
});

})(jQuery);
