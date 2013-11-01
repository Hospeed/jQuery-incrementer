#!/usr/bin/env require

# region vim modline

# vim: set tabstop=4 shiftwidth=4 expandtab:
# vim: foldmethod=marker foldmarker=region,endregion:

# endregion

# region header

# Copyright Torben Sickert 16.12.2012

# License
#    This library written by Torben Sickert stand under a creative commons
#    naming 3.0 unported license.
#    see http://creativecommons.org/licenses/by/3.0/deed.de

###!
    Copyright see require on https://github.com/thaibault/require

    Conventions see require on https://github.com/thaibault/require

    @author t.sickert@gmail.com (Torben Sickert)
    @version 1.0 stable
    @fileOverview
    This plugin extends an html input field which serves a number to be given.
    Handling validation and easy incrementing or decrementing of
    given value is provided.
###

## standalone
## do ($=this.jQuery) ->
this.require([
    ['jQuery', 'jquery-2.0.3']
    ['jQuery.ui', 'jquery-ui-1.10.3']

    ['jQuery.Tools', 'jquery-tools-1.0.coffee']]
($) ->
##

# endregion

# region plugins/classes

    ###*
        @memberOf $
        @class
        @extends $.Tools

        @param {DomNode} domNode The dom object from where where the plugin
                                 starts to do it's magic.
    ###
    class Incrementer extends $.Tools.class

    # region properties

        ###*
            Saves default options for manipulating the Gui's behaviour.

            @property {Object}
        ###
        _options:
            domNodeSelectorPrefix: 'body form div.{1}'
            onInvalidNumber: $.noop()
            onTypeInvalidLetter: $.noop()
            logging: false
            step: 1
            min: 0
            max: 9999
            domNode:
                plus: 'a.plus'
                minus: 'a.minus'
            neededMarkup: """
                <a href="#" class="plus">plus</a>
                <a href="#" class="minus">minus</a>
            """
        ###*
            Saves the class name for introspection.

            @property {String}
        ###
        __name__: 'Incrementer'

    # endregion

    # region public methods

        # region special

        ###*
            @description Initializes the plugin. Later needed dom nodes are
                         grabbed.

            @param {Object} options An options object.

            @returns {$.Incrementer} Returns the current instance.
        ###
        initialize: (options={}) ->
            super options
            # Generate needed html.
            if this._options.neededMarkup
                this.$domNode.wrap(
                    $('<div>').addClass(
                        this.camelCaseStringToDelimited this.__name__)
                ).after this.neededMarkup
            # Grab elements
            this.$domNode = this.grabDomNode this._options.domNode
            # Attach events
            this.on(
                this.$domNode.plus.add(this.$domNode.minus), 'click',
                this.getMethod this._onClick)
            # Prevent number field from typing symbols other than numbers.
            this.on(
                this.$domNode,
                keydown: this.getMethod this._preventOtherThanNumberInput
                keyup: this.getMethod this._onChangeInput
                change: this.getMethod this._onChangeInput)
            this

        # endregion

    # endregion

    # region protected methods

        # region event

        ###*
            @description This method triggeres if a "keydown" event occurs.
                         This callback grantees that only numeric input comes
                         into given dom node.

            @param {Function} thisFunction this function itself
            @param {Object} event the event object

            @returns {$.Incrementer} Returns the current instance.
        ###
        _preventOtherThanNumberInput: (thisFunction, event) ->
            # Allow only backspace, delete, left, right, minus or number.
            if($.inArray(
                event.keyCode,
                [$.ui.keyCode.BACKSPACE,
                 $.ui.keyCode.DELETE,
                 $.ui.keyCode.LEFT,
                 $.ui.keyCode.RIGHT,
                 $.ui.keyCode.NUMPAD_SUBTRACT]) is -1 and
               (event.keyCode < 48 or event.keyCode > 57) and
               (event.keyCode < 96 or event.keyCode > 105)
            )
                this.fireEvent 'typeInvalidLetter', false, this, event
                event.preventDefault()
            this
        ###*
            @description This method triggeres if a "click" event on increment
                         or decrement buttons occurs.

            @param {Function} thisFunction this function itself
            @param {Object} event the event object

            @returns {$.Incrementer} Returns the current instance.
        ###
        _onClick: (thisFunction, event) ->
            currentValue = window.parseInt this.$domNode.val()
            currentValue = 0 if not currentValue
            plus = (
                event.target is this.$domNode.plus[0] or
                this.$domNode.plus.children().filter(
                    event.target
                ).length)
            if (not plus and
                currentValue - this._options.step >= this._options.min or
                plus and currentValue < this._options.max
            )
                newValue = currentValue - this._options.step
                newValue = currentValue + this._options.step if plus
                this.$domNode.val newValue
            else
                this.fireEvent 'invalidNumber', false, this, event
            this
        ###*
            @description This method triggeres if a "change" event on given dom
                         node occurs.

            @param {Function} thisFunction this function itself
            @param {Object} event the event object

            @returns {$.Incrementer} Returns the current instance.
        ###
        _onChangeInput: (thisFunction, event) ->
            target = $ event.target
            value = window.parseInt(target.val(target.val()
                .replace(/[^0-9]+/g, '')).val())
            if value > this._options.max
                this._onInvalidNumber event, value
                target.val this._options.max
            else if value < this._options.min
                this._onInvalidNumber event, value
                target.val this._options.min
            this
        ###*
            @description This method triggers if an invalid number was given
                         via keyboard input.

            @param {Object} event the event object

            @returns {$.Incrementer} Returns the current instance.
        ###
        _onTypeInvalidLetter: (event) ->
            typedCharInfo = ''
            character = String.fromCharCode event.keyCode
            if event.keyCode and character.match(/^\w| $/)
                typedCharInfo = " (you typed \"#{character}\")"
            this.info "Please type a number#{typedCharInfo}."
        ###*
            @description This method is triggered if a "change" event on given
                         dom node occurs.

            @param {Object} event the event object
            @param {String} value the invalid chars

            @returns {$.Incrementer} Returns the current instance.
        ###
        _onInvalidNumber: (event, value='') ->
            typedCharInfo = ''
            character = String.fromCharCode event.keyCode
            if value
                typedCharInfo = " (you typed \"#{value}\")."
            else if event.keyCode and character.match(/^\w| $/)
                typedCharInfo = " (you typed \"#{character}\")"
            this.info(
                "Please type a number between \"#{this._options.min}\" and " +
                "\"#{this._options.max}\"#{typedCharInfo}.")

        # endregion

    # endregion

    ###* @ignore ###
    $.fn.Incrementer = -> $.Tools().controller Incrementer, arguments, this

# endregion

## standalone
)
