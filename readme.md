<!-- !/usr/bin/env markdown
-*- coding: utf-8 -*- -->

<!-- region header

Copyright Torben Sickert 16.12.2012

License
-------

This library written by Torben Sickert stand under a creative commons naming
3.0 unported license. see http://creativecommons.org/licenses/by/3.0/deed.de

endregion -->

<!--|deDE:Einsatz-->
<!--|frFR:Utilisier-->
Use case
--------

This plugin extends an html input field which serves a number to be given.
Handling validation and easy incrementing or decrementing of given value is
provided.
<!--deDE:
    Diese Plugin erweitert an html input Formularfeld, dass eine Anzahl
    erwartet. Dieses Plugin übernimmt Validierung und einfaches Inkrementieren
    und Dekrementieren des Eingabefeldes.
-->
<!--frFR:
    Ce plugin étend le champ de formulaire de saisie html qu'un certain nombre
    attendu. Ce plugin reprend validation et incrémente simplement et diminuer
    le champ de saisie.
-->

<!--|deDE:Verwendung-->
<!--|frFR:Demande-->
Usage
-----

### Full working example

<!--showExample-->

    #!HTML

    <style type="text/css">
        body form div.incrementer > input.form-control {
            width: 61px;
            float: left;
        }
        body form div.incrementer > a.plus,
        body form div.incrementer > a.minus {
            font-size: 24px;
            font-weight: bold;
            margin: 10px;
        }
    </style>

    <script type="text/javascript" src="distributionBundle/jquery-2.1.1.js"></script>
    <script type="text/javascript" src="distributionBundle/jquery-tools-1.0.js"></script>
    <script type="text/javascript" src="distributionBundle/jquery-incrementer-1.0.js"></script>

    <script type="text/javascript">
        $(function($) {
            $('body form.first-example input').Incrementer({
                /*
                    A function to call if an invalid number was given. For
                    example a number with isn't in given min/max range. The
                    function becomes an event object as first argument with
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
                // The smallest value to be able to type.
                minimum: 0,
                // The greatest value to give to type.
                maximum: 9999,
                /*
                    Stores a set of selectors for retrieving needed dom nodes.
                */
                domNode: {
                    // Stores a selector to grab the plus button.
                    plus: '> a.plus',
                    // Stores a selector to grab the minus button.
                    minus: '> a.minus'
                },
                /*
                    Saves an html template to append after given template. If
                    empty the plugin assumes that you will provide needed
                    markup to find dom nodes specified in the "domNode" section
                    of this options object.
                */
                neededMarkup: '<a href="#" class="plus">+</a>' +
                              '<a href="#" class="minus">-</a>'
            });
        });
    </script>

    <form class="first-example" method="get" action="#">
        <input type="text" name="test" value="4" class="form-control" />
    </form>

### Example with more than one input

<!--showExample-->

    #!HTML

    <script type="text/javascript">
        $(function($) {
            $('body form.second-example input.first').Incrementer({
                step: 2, minimum: 10, maximum: 20, logging: true
            });
            $('body form.second-example input.second').Incrementer({
                step: 3, minimum: 5, maximum: 30, logging: true
            });
        });
    </script>
    <form class="second-example" method="get" action="#">
        <input type="text" name="test" value="10" class="form-control first" />
        <input type="text" name="test" value="12" class="form-control second" />
    </form>

<!-- region modline

vim: set tabstop=4 shiftwidth=4 expandtab:
vim: foldmethod=marker foldmarker=region,endregion:

endregion -->
