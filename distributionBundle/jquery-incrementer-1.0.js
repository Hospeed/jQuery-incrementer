// Generated by CoffeeScript 1.8.0

/*
[Project page](https://thaibault.github.com/jQuery-incrementer)

This plugin extends an html input field which serves a number to be given.
Handling validation and easy incrementing or decrementing of given value is
provided.

Copyright Torben Sickert 16.12.2012

License
-------

This library written by Torben Sickert stand under a creative commons naming
3.0 unported license. see http://creativecommons.org/licenses/by/3.0/deed.de

Extending this module
---------------------

For conventions see require on https://github.com/thaibault/require

Author
------

t.sickert["~at~"]gmail.com (Torben Sickert)

Version
-------

1.0 stable
 */

(function() {
  var main,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  main = function($) {
    var Incrementer;
    Incrementer = (function(_super) {
      __extends(Incrementer, _super);

      function Incrementer() {
        return Incrementer.__super__.constructor.apply(this, arguments);
      }


      /*
          This plugin holds all needed methods to extend input fields to
          select numbers very smart.
       */


      /*
          **__name__ {String}**
          Holds the class name to provide inspection features.
       */

      Incrementer.prototype.__name__ = 'Incrementer';

      Incrementer.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }

        /*
            Initializes the plugin. Later needed dom nodes are grabbed.
        
            **options {Object}**   - An options object.
        
            **returns {$domNode}** - Returns $'s extended current dom node.
         */

        /*
            **_options {Object}**
            Saves default options for manipulating the Gui's behaviour.
         */
        this._options = {

          /*
              A function to call if an invalid number was given. For
              example a number with isn't in given minimum/maximum range.
              The function becomes an event object as first argument with
              last given key code saved. The resulting invalid value will
              be provided as second argument.
           */
          onInvalidNumber: $.noop(),

          /*
              A function to call if an invalid letter like "a" was given.
              This function becomes an event object as first argument
              with last given key code saved.
           */
          onTypeInvalidLetter: $.noop(),

          /*
              Controls the logging behavior. Set to "true" for debugging
              scenarios.
           */
          logging: false,

          /*
              A delta value to add or subtract from current value if plus
              or minus events are given.
           */
          step: 1,
          minimum: 0,
          maximum: 9999,

          /*
              Stores a set of needed dom nodes. Note that this selectors
              will be prefixed with provided value in
              "domNodeSelectorPrefix."
           */
          domNode: {
            plus: '> a.plus',
            minus: '> a.minus'
          },

          /*
              Saves an html template to append after given template. If
              empty the plugin assumes that you will provide needed
              markup to find dom nodes specified in the "domNode" section
              of this options object.
           */
          neededMarkup: "<a href=\"#\" class=\"plus\">+</a>\n<a href=\"#\" class=\"minus\">-</a>"
        };
        Incrementer.__super__.initialize.call(this, options);
        if (this._options.neededMarkup) {
          this.$domNode.wrap($('<div>').addClass(this.stringCamelCaseToDelimited(this.__name__))).after(this._options.neededMarkup);
        }
        this.$domNodes = this.grabDomNode(this._options.domNode);
        this.on(this.$domNodes.plus.add(this.$domNodes.minus), 'click', this.getMethod(this._onClick));
        this.on(this.$domNode, {
          keydown: this.getMethod(this._preventOtherThanNumberInput),
          keyup: this.getMethod(this._onChangeInput),
          change: this.getMethod(this._onChangeInput)
        });
        return this.$domNode;
      };

      Incrementer.prototype._preventOtherThanNumberInput = function(thisFunction, event) {

        /*
            This method triggers if a "keydown" event occurs. This callback
            grantees that only numeric input comes into given dom node.
        
            **thisFunction {Function}** - this function itself
        
            **event {Object}**          - the event object
        
            **returns {$.Incrementer}** - Returns the current instance.
         */
        if ($.inArray(event.keyCode, [this.keyCode.BACKSPACE, this.keyCode.DELETE, this.keyCode.LEFT, this.keyCode.RIGHT, this.keyCode.NUMPAD_SUBTRACT]) === -1 && (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
          this.fireEvent('typeInvalidLetter', false, this, event);
          event.preventDefault();
        }
        return this;
      };

      Incrementer.prototype._onClick = function(thisFunction, event) {

        /*
            This method triggers if a "click" event on increment or
            decrement buttons occurs.
        
            **thisFunction {Function}** - this function itself
        
            **event {Object}**          - the event object
        
            **returns {$.Incrementer}** - Returns the current instance.
         */
        var currentValue, newValue, plusTriggered;
        event.preventDefault();
        currentValue = window.parseInt(this.$domNode.val());
        if (!currentValue) {
          currentValue = this._options.minimum;
        }
        plusTriggered = event.target === this.$domNodes.plus[0] || this.$domNodes.plus.children().filter(event.target).length;
        if (plusTriggered) {
          newValue = currentValue + this._options.step;
          if (newValue <= this._options.maximum) {
            this.$domNode.val(newValue);
          } else {
            this.fireEvent('invalidNumber', false, this, event, newValue);
          }
        } else {
          newValue = currentValue - this._options.step;
          if (newValue >= this._options.minimum) {
            this.$domNode.val(newValue);
          } else {
            this.fireEvent('invalidNumber', false, this, event, newValue);
          }
        }
        return this;
      };

      Incrementer.prototype._onChangeInput = function(thisFunction, event) {

        /*
            This method triggers if a "change" event on given dom node
            occurs.
        
            **thisFunction {Function}** - this function itself
        
            **event {Object}**          - the event object
        
            **returns {$.Incrementer}** - Returns the current instance.
         */
        var target, value;
        target = $(event.target);
        value = window.parseInt(target.val(target.val().replace(/[^0-9]+/g, '')).val());
        if (value > this._options.maximum) {
          this._onInvalidNumber(event, value);
          target.val(this._options.maximum);
        } else if (value < this._options.minimum) {
          this._onInvalidNumber(event, value);
          target.val(this._options.minimum);
        }
        return this;
      };

      Incrementer.prototype._onTypeInvalidLetter = function(event) {

        /*
            This method triggers if an invalid number was given via
            keyboard input.
        
            **event {Object}**          - the event object
        
            **returns {$.Incrementer}** - Returns the current instance.
         */
        var character, typedCharInfo;
        typedCharInfo = '';
        character = String.fromCharCode(event.keyCode);
        if (event.keyCode && character.match(/^\w| $/)) {
          typedCharInfo = " (you typed \"" + character + "\")";
        }
        return this.info("Please type a number" + typedCharInfo + ".");
      };

      Incrementer.prototype._onInvalidNumber = function(event, value) {
        var character, typedCharInfo;
        if (value == null) {
          value = '';
        }

        /*
            This method is triggered if a "change" event on given dom node
            occurs.
        
            **event {Object}**          - the event object
        
            **value {String}**          - the invalid chars
        
            **returns {$.Incrementer}** - Returns the current instance.
         */
        typedCharInfo = '';
        character = String.fromCharCode(event.keyCode);
        if (value) {
          typedCharInfo = " (you typed \"" + value + "\").";
        } else if (event.keyCode && character.match(/^\w| $/)) {
          typedCharInfo = " (you typed \"" + character + "\")";
        }
        return this.info(("Please type a number between \"" + this._options.minimum + "\" ") + ("and \"" + this._options.maximum + "\"" + typedCharInfo + "."));
      };

      return Incrementer;

    })($.Tools["class"]);
    return $.fn.Incrementer = function() {
      return $.Tools().controller(Incrementer, arguments, this);
    };
  };

  if (this.require != null) {
    this.require.scopeIndicator = 'jQuery.fn.Incrementer';
    this.require('jquery-tools-1.0.coffee', main);
  } else {
    main(this.jQuery);
  }

}).call(this);
