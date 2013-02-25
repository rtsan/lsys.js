    var Operator = function(name, callback) {
        this.name = name;
        this.callback = callback;
    };
    Operator.prototype.exec = function(context) {
        this.callback.call(context);
    };
