/// require

 // region header

/*!
    jQuery plugin for "jquery-1.9.1".

    Copyright see require on https://github.com/thaibault/require

    Conventions see require on https://github.com/thaibault/require

    @author t.sickert@gmail.com (Torben Sickert)
    @version 1.0 stable
    @requires require-1.0+
              jquery-1.9.1+
              jquery-tools-1.0+
              jquery-ui-1.10.1+
    @fileOverview
    This plugin extends an html input field which serves a number to be given.
    Handling validation and easy incrementing or decrementing of
    given value is provided.
*/

/// standalone ;(function(jQuery) {
;window.require(
    [['jQuery.Tools', 'jquery-tools-1.0'],

     ['jQuery.ui', 'jquery-ui-1.10.1']],
    function(jQuery) {
///

// endregion

// region plugins

    /**
        @memberOf jQuery
        @class
        @extends jQuery.Tools

        @param {DomNode} domNode The dom object from where where the plugin
                                 starts to do it's magic.
    */
    var Incrementer = function(domNode) {

    // region protected properties

        /**
            Saves default options for manipulating the Gui's behaviour.

            @property {Object}
        */
        this._options = {
            'logging': false,
            'domNodeSelectorPrefix': 'body form div.{1}',
            'generateNeededHtml': true,
            'step': 1,
            'min': 0,
            'max': 9999,
            'onInvalidNumber': null,
            'domNodes': {
                'numberInput': 'input[name="number"]',
                'plus': 'a.plus',
                'minus': 'a.minus'
            }
        };
        this._domNodes = {};
        this._neededHtml = '<a href="#" class="plus">' +
                               '<div class="ui-icon plus">plus</div>' +
                           '</a>' +
                           '<a href="#" class="minus">' +
                               '<div class="ui-icon minus">minus</div>' +
                           '</a>';

    // endregion

    // region public methods

        this.initialize = function(options) {
            this._options.domNodeSelectorPrefix = this.stringFormat(
                this._options.domNodeSelectorPrefix,
                this.camelCaseStringToDelimited(this.__name__));
            if (options)
                jQuery.extend(true, this._options, options);
            // Generate needed html
            if (this._options.generateNeededHtml)
                domNode.wrap(
                    jQuery('<div>').addClass(
                        this.camelCaseStringToDelimited(this.__name__))
                ).after(this._neededHtml);
            // Grap elements
            this._domNodes = this.grapDomNodes(this._options.domNodes);
            // Attach events
            this.bind(
                this._domNodes.plus.add(this._domNodes.minus), 'click',
                this.getMethod(this._onClick));
            if (!this._options.onInvalidNumber)
                this._options.onInvalidNumber = this.getMethod(
                    this._onInvalidNumber);
            // Prevent number field from typing symbols other than numbers.
            this.bind(this._domNodes.numberInput, {
                'keydown': this.getMethod(this._preventOtherThanNumberInput),
                'change': this.getMethod(this._onChangeInput)
            });
            return this;
        };

    // endregion

    // region protected methods

        // region event methods

        this._preventOtherThanNumberInput = function(event) {
            // Allow only backspace, delete, left, right or number.
            if (jQuery.inArray(
                    event.keyCode,
                    [jQuery.ui.keyCode.BACKSPACE,
                     jQuery.ui.keyCode.DELETE,
                     jQuery.ui.keyCode.LEFT,
                     jQuery.ui.keyCode.RIGHT]) == -1 &&
                (event.keyCode < 48 || event.keyCode > 57) &&
                (event.keyCode < 96 || event.keyCode > 105)) {
                this._onTypeInvalidLetter(event);
                event.preventDefault();
            }
            return this;
        };

        this._onClick = function(event) {
            var currentValue = window.parseInt(
                this._domNodes.numberInput.val());
            var plus = (event.target === this._domNodes.plus[0] ||
                        this._domNodes.plus.children().filter(
                            event.target).length);
            if (!plus &&
                currentValue - this._options.step >= this._options.min ||
                plus && currentValue < this._options.max) {
                var newValue = currentValue - this._options.step;
                if (plus)
                    newValue = currentValue + this._options.step;
                this._domNodes.numberInput.val(newValue);
            } else
                this._options.onInvalidNumber(event);
            return this;
        };

        this._onChangeInput = function(event) {
            var target = jQuery(event.target);
            var value = window.parseInt(target.val(target.val()
                .replace(/[^0-9]+/g, '')).val());
            if (value > this._options.max)
                target.val(this._options.max);
            else if (value < this._options.min)
                target.val(this._options.min);
            return this;
        };

        this._onTypeInvalidLetter = function(event) {
            this.log(
                'Please type a number (you typed "{1}").',
                String.fromCharCode(event.keyCode));
            return this;
        };

        this._onInvalidNumber = function(event) {
            this.log(
                'Please type a number between "{1}" and "{2}".',
                this._options.min, this._options.max);
            return this;
        };
    };

        // endregion

    // endregion

    /** @ignore */
    jQuery.fn.Incrementer = function() {
        var self = jQuery.Tools()._extend(new Incrementer(this));
        self.__name__ = 'Incrementer';
        self._controller.apply(self, arguments);
        return this;
    };

// endregion

/// standalone })(window.jQuery);
});
