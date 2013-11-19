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

module 'Incrementer'

# endregion

# region tests

    # region public methods

        # region special

test 'initialize', -> ok $('body').Incrementer()


        # endregion

    # endregion

    # region protected methods

        # region event

test '_preventOtherThanNumberInput', ->
    ok $('body').Incrementer()._preventOtherThanNumberInput null, {
        keyCode: 49, preventDefault: ->
    }
    ok $('body').Incrementer()._preventOtherThanNumberInput null, {
        keyCode: 47, preventDefault: ->
    }
test '_onClick', ->
    ok $('body').Incrementer()._onClick null, {
        preventDefault: ->
        target: $('body')[0]
    }
test '_onChangeInput', ->
    ok $('body').Incrementer()._onChangeInput null, {
        preventDefault: ->
        target: $('body')[0]
    }
test '_onTypeInvalidLetter', ->
    ok $('body').Incrementer()._onTypeInvalidLetter {
        preventDefault: ->
        keyCode: 49
    }
test '_onInvalidNumber', ->
    ok $('body').Incrementer()._onInvalidNumber {
        preventDefault: ->
        keyCode: 49
    }

        # endregion

    # endregion


# endregion
