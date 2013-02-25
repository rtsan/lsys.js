/*
 * lsys.js v0.1.0
 * https://github.com/rtsan/lsys.js
 *
 * Copyright (c) 2013 rtsan
 * Licensed under the MIT license.
 */

(function(global) {

    var Operator = function(name, callback) {
        this.name = name;
        this.callback = callback;
    };
    Operator.prototype.exec = function(context) {
        this.callback.call(context);
    };

    var Rule = function(name, repRule) {
        this.name = name;
        this.repRule = repRule;
    };

    var LSystem = function(operators, rules) {
        this.context = this;
        this.operators = {};
        this.rules = {};

        var prop, op, rule;

        for (prop in operators) {
            op = operators[prop];
            if (typeof op === 'function') {
                this.operators[prop] = new Operator(prop, op);
            } else {
                throw new Error('operator is must be callback function');
            }
        }

        for (prop in rules) {
            if (!(prop in this.operators) && !this.operators.otherwise) {
                throw new Error('operator ' + prop + ' is not defined');
            }
            rule = rules[prop];
            if (rule instanceof Array) {
                this.rules[prop] = new Rule(prop, rule);
            } else {
                throw new Error('rule is must be operator name array');
            }
        }
    };
    LSystem.prototype = {
        generate: function(initial, iteration) {
            var opNames = initial;
            for (var i = 0; i < iteration; i++) {
                opNames = this._replace(opNames);
            }
            return opNames;
        },
        exec: function(initial, iteration) {
            this._execOperators(this.generate(initial, iteration));
        },
        _execOperators: function(opNames) {
            var ctx = this.context;
            var i, l, op;
            for (i = 0, l = opNames.length; i < l; i++) {
                op = this.operators[opNames[i]];
                if (op) {
                    op.exec(ctx);
                } else if (this.operators.otherwise) {
                    this.operators.otherwise.exec(ctx);
                } else {
                    throw new Error('operator ' + opNames[i] + ' is not defined');
                }
            }
        },
        _replace: function(opNames) {
            var ret = [];
            var i, l, opName, rule;
            for (i = 0, l = opNames.length; i < l; i++) {
                opName = opNames[i];
                rule = this.rules[opName];
                if (rule) {
                    Array.prototype.push.apply(ret, rule.repRule);
                } else {
                    ret.push(opName);
                }
            }
            return ret;
        }
    };

    global.lsys = {
        Operator: Operator,
        Rule: Rule,
        LSystem: LSystem
    };

}(this));

