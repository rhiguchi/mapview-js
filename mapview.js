(function($) {

var mapviewClass = 'ui-mapview';
var mapviewItemClass = 'ui-mapview-item';

$.widget("ui.mapview", {
    options: {
        model: [],
        hoverClass: 'hover',
        activeClass: 'active',
    },
    
    _create: function() {
        var self = this;
        this.element.addClass(mapviewClass);
        
        
        
        this.element.find('.' + mapviewItemClass)
            .live('mouseenter', function (event) {
                self._itemMouseEnter($(this));
            })
            .live('mouseleave', function (event) {
                self._itemMouseLeave($(this));
            })
            .live('mousedown', function (event) {
                self._itemMouseDown($(this));
            });
    },
    
    _destroy: function() {
        this.element.removeClass(mapviewClass);
    },
    
    model: function(newModel) {
        if (arguments.length == 0)
            return this.option('model');
        return this.option('model', newModel);
    },
    
    _itemMouseEnter: function (item) {
        item.addClass(this.options.hoverClass);
    },
    
    _itemMouseLeave: function (item) {
        item.removeClass(this.options.hoverClass);
    },
    
    _itemMouseDown: function (item) {
        var self = this;
        item.addClass(this.options.activeClass);
        $(document).one('mouseup', function () {
            self._itemMouseUp(item);
        })
    },
    
    _itemMouseUp: function (item) {
        item.removeClass('active');
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
