#!/usr/bin/env require
# -*- coding: utf-8 -*-
#
# region vim modline

# vim: set tabstop=4 shiftwidth=4 expandtab:
# vim: foldmethod=marker foldmarker=region,endregion:

# endregion

# region header

# Copyright Torben Sickert 16.12.2012

# License
# -------

# This library written by Torben Sickert stand under a creative commons naming
# 3.0 unported license. see http://creativecommons.org/licenses/by/3.0/deed.de

module 'Incrementer'

# endregion

# region tests

    # region mock-up

incrementer = $('body').Incrementer().data 'Incrementer'

    # endregion

    # region public methods

        # region special

test 'initialize', ->
    ok incrementer
    ok $('body').Incrementer()


        # endregion

    # endregion

    # region protected methods

        # region event

test '_preventOtherThanNumberInput', ->
    strictEqual incrementer._preventOtherThanNumberInput(
        null, keyCode: 49, preventDefault: ->
    ), incrementer
    strictEqual incrementer._preventOtherThanNumberInput(
        null, keyCode: 47, preventDefault: ->
    ), incrementer
test '_onClick', ->
    strictEqual incrementer._onClick(
        null, preventDefault: (->), target: $('body')[0]
    ), incrementer
test '_onChangeInput', ->
    strictEqual incrementer._onChangeInput(
        null, preventDefault: (->), target: $('body')[0]
    ), incrementer
test '_onTypeInvalidLetter', ->
    strictEqual incrementer._onTypeInvalidLetter(
        preventDefault: (->), keyCode: 49
    ), incrementer
test '_onInvalidNumber', ->
    strictEqual incrementer._onInvalidNumber(
        preventDefault: (->), keyCode: 49
    ), incrementer

        # endregion

    # endregion

# endregion
