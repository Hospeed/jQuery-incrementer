#!/usr/bin/env coffee
# -*- coding: utf-8 -*-

# region header

###
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
###

main = ($) ->

# endregion

# region plugins/classes

    class Incrementer extends $.Tools.class
        ###
            This plugin holds all needed methods to extend input fields to
            select numbers very smart.
        ###

    # region properties

        ###
            **__name__ {String}**
            Holds the class name to provide inspection features.
        ###
        __name__: 'Incrementer'

    # endregion

    # region public methods

        # region special

        initialize: (options={}) ->
            ###
                Initializes the plugin. Later needed dom nodes are grabbed.

                **options {Object}**   - An options object.

                **returns {$domNode}** - Returns $'s extended current dom node.
            ###
            ###
                **_options {Object}**
                Saves default options for manipulating the Gui's behaviour.
            ###
            this._options =
                ###
                    A dom node selector prefix to grab all dom nodes specified
                    in the dom node section of this options. This enforces you
                    to not globally select any dom nodes which aren't in the
                    expected scope of this plugin. "{1}" will be automatically
                    replaced with this plugin name suffix ("incrementer").
                    You don't have to use "{1}" but it can help you to write
                    code which is more reconcilable with the dry concept.
                ###
                domNodeSelectorPrefix: 'body form div.{1}'
                ###
                    A function to call if an invalid number was given. For
                    example a number with isn't in given minimum/maximum range.
                    The function becomes an event object as first argument with
                    last given key code saved. The resulting invalid value will
                    be provided as second argument.
                ###
                onInvalidNumber: $.noop()
                ###
                    A function to call if an invalid letter like "a" was given.
                    This function becomes an event object as first argument
                    with last given key code saved.
                ###
                onTypeInvalidLetter: $.noop()
                ###
                    Controls the logging behavior. Set to "true" for debugging
                    scenarios.
                ###
                logging: false
                ###
                    A delta value to add or subtract from current value if plus
                    or minus events are given.
                ###
                step: 1
                # The smallest value to be able to type.
                minimum: 0
                # The greatest value to give to type.
                maximum: 9999
                ###
                    Stores a set of needed dom nodes. Note that this selectors
                    will be prefixed with provided value in
                    "domNodeSelectorPrefix."
                ###
                domNode:
                    # Stores a selector to grab the plus button.
                    plus: '> a.plus'
                    # Stores a selector to grab the minus button.
                    minus: '> a.minus'
                ###
                    Saves an html template to append after given template. If
                    empty the plugin assumes that you will provide needed
                    markup to find dom nodes specified in the "domNode" section
                    of this options object.
                ###
                neededMarkup: """
                    <a href="#" class="plus">+</a>
                    <a href="#" class="minus">-</a>
                """
            super options
            # Generate needed html.
            if this._options.neededMarkup
                this.$domNode.wrap(
                    $('<div>').addClass(
                        this.stringCamelCaseToDelimited this.__name__)
                ).after this._options.neededMarkup
            # Grab elements
            this.$domNodes = this.grabDomNode this._options.domNode
            # Attach events
            this.on(
                this.$domNodes.plus.add(this.$domNodes.minus), 'click',
                this.getMethod this._onClick)
            # Prevent number field from typing symbols other than numbers.
            this.on(
                this.$domNode,
                keydown: this.getMethod this._preventOtherThanNumberInput
                keyup: this.getMethod this._onChangeInput
                change: this.getMethod this._onChangeInput)
            this.$domNode

        # endregion

    # endregion

    # region protected methods

        # region event

        _preventOtherThanNumberInput: (thisFunction, event) ->
            ###
                This method triggers if a "keydown" event occurs. This callback
                grantees that only numeric input comes into given dom node.

                **thisFunction {Function}** - this function itself

                **event {Object}**          - the event object

                **returns {$.Incrementer}** - Returns the current instance.
            ###
            # Allow only backspace, delete, left, right, minus or number.
            if $.inArray(
                event.keyCode,
                [this.keyCode.BACKSPACE, this.keyCode.DELETE
                 this.keyCode.LEFT, this.keyCode.RIGHT
                 this.keyCode.NUMPAD_SUBTRACT]
            ) is -1 and (event.keyCode < 48 or event.keyCode > 57) and
                        (event.keyCode < 96 or event.keyCode > 105)
                this.fireEvent 'typeInvalidLetter', false, this, event
                event.preventDefault()
            this
        _onClick: (thisFunction, event) ->
            ###
                This method triggers if a "click" event on increment or
                decrement buttons occurs.

                **thisFunction {Function}** - this function itself

                **event {Object}**          - the event object

                **returns {$.Incrementer}** - Returns the current instance.
            ###
            event.preventDefault()
            console.log this.$domNode
            currentValue = window.parseInt this.$domNode.val()
            currentValue = this._options.minimum if not currentValue
            plusTriggered = (
                event.target is this.$domNodes.plus[0] or
                this.$domNodes.plus.children().filter(
                    event.target
                ).length)
            if plusTriggered
                newValue = currentValue + this._options.step
                if newValue <= this._options.maximum
                    this.$domNode.val newValue
                else
                    this.fireEvent(
                        'invalidNumber', false, this, event, newValue)
            else
                newValue = currentValue - this._options.step
                if newValue >= this._options.minimum
                    this.$domNode.val newValue
                else
                    this.fireEvent(
                        'invalidNumber', false, this, event, newValue)
            this
        _onChangeInput: (thisFunction, event) ->
            ###
                This method triggers if a "change" event on given dom node
                occurs.

                **thisFunction {Function}** - this function itself

                **event {Object}**          - the event object

                **returns {$.Incrementer}** - Returns the current instance.
            ###
            target = $ event.target
            value = window.parseInt(target.val(target.val()
                .replace(/[^0-9]+/g, '')).val())
            if value > this._options.maximum
                this._onInvalidNumber event, value
                target.val this._options.maximum
            else if value < this._options.minimum
                this._onInvalidNumber event, value
                target.val this._options.minimum
            this
        _onTypeInvalidLetter: (event) ->
            ###
                This method triggers if an invalid number was given via
                keyboard input.

                **event {Object}**          - the event object

                **returns {$.Incrementer}** - Returns the current instance.
            ###
            typedCharInfo = ''
            character = String.fromCharCode event.keyCode
            if event.keyCode and character.match(/^\w| $/)
                typedCharInfo = " (you typed \"#{character}\")"
            this.info "Please type a number#{typedCharInfo}."
        _onInvalidNumber: (event, value='') ->
            ###
                This method is triggered if a "change" event on given dom node
                occurs.

                **event {Object}**          - the event object

                **value {String}**          - the invalid chars

                **returns {$.Incrementer}** - Returns the current instance.
            ###
            typedCharInfo = ''
            character = String.fromCharCode event.keyCode
            if value
                typedCharInfo = " (you typed \"#{value}\")."
            else if event.keyCode and character.match(/^\w| $/)
                typedCharInfo = " (you typed \"#{character}\")"
            this.info(
                "Please type a number between \"#{this._options.minimum}\" " +
                "and \"#{this._options.maximum}\"#{typedCharInfo}.")

        # endregion

    # endregion

    # region handle $ extending

    $.fn.Incrementer = -> $.Tools().controller Incrementer, arguments, this

    # endregion

# endregion

# region dependencies

if this.require?
    this.require.scopeIndicator = 'jQuery.fn.Incrementer'
    this.require 'jquery-tools-1.0.coffee', main
else
    main this.jQuery

# endregion

# region vim modline

# vim: set tabstop=4 shiftwidth=4 expandtab:
# vim: foldmethod=marker foldmarker=region,endregion:

# endregion
