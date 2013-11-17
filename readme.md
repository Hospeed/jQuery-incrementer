<!-- region modline

vim: set tabstop=4 shiftwidth=4 expandtab:
vim: foldmethod=marker foldmarker=region,endregion:

endregion

region header

Copyright Torben Sickert 16.12.2012

License
   This library written by Torben Sickert stand under a creative commons
   naming 3.0 unported license.
   see http://creativecommons.org/licenses/by/3.0/deed.de

endregion -->

Use case<!--deDE:Einsatz--><!--frFR:Utilisier-->
================================================

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

Usage<!--deDE:Verwendung--><!--frFR:Demande-->
----------------------------------------------

<!--showExample-->

    #!HTML

    <script type="text/javascript" src="distributionBundle/jquery-2.0.3.js"></script>
    <script type="text/javascript" src="distributionBundle/jquery-tools-1.0.js"></script>
    <script type="text/javascript" src="distributionBundle/jquery-incrementer-1.0.js"></script>
    <form method="get" action="#">
        <input type="text" name="test" value="4" class="form-control" />
    </form>
    <style type="text/css">
        body form div.incrementer > input.form-control {
            width: 34px;
            float: left;
        }
        body form div.incrementer > a.plus,
        body form div.incrementer > a.minus {
            font-size: 24px;
            font-weight: bold;
            margin: 10px;
        }
    </style>
    <script type="text/javascript">
        $(function($) {
            $('body form input').Incrementer({
                domNodeSelectorPrefix: 'body form div.{1}',
                onInvalidNumber: $.noop(),
                onTypeInvalidLetter: $.noop(),
                logging: false,
                step: 1,
                min: 0,
                max: 9999,
                domNode: {
                    plus: '> a.plus',
                    minus: '> a.minus'
                },
                neededMarkup: '<a href="#" class="plus">+</a>' +
                              '<a href="#" class="minus">-</a>',
                logging: true
            });
        });
    </script>
