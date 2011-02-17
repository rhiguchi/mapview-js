(function($) {

var mapviewClass = 'ui-mapview';
var mapviewItemClass = 'ui-mapview-item';

$.widget("ui.mapview", {
    options: {
        model: [],
        _items: [],
        mapviewItemBuilder: function (data) {
            var item = $('<span>', {
                'id': data[0],
                'class': mapviewItemClass,
                'mapview-item-id': data[0],
                'style': 'left: ' + (data[1] * 100) + '%;'
                        + ' top:' + (data[2] * 100) + '%;'
            });
            return item;
        }
    },
    
    _create: function() {
        this.element.addClass(mapviewClass);
        this._updateItems();
    },
    
    _destroy: function() {
        this.element.removeClass(mapviewClass);
    },
    
    model: function(newModel) {
        if (arguments.length == 0)
            return this.option('model');
        return this.option('model', newModel);
    },
    
    items: function () {
        return $.map(this.options._items, function(item) {
            return item;
        });
    },
    
    _updateItems: function() {
        var widget = this.element;
        var builder = this.options.mapviewItemBuilder;
        
        $.each(this.options._items, function() {
            this.remove();
        });
        this.options._items = $.map(this.options.model, function(data) {
            return builder(data).appendTo(widget);
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
