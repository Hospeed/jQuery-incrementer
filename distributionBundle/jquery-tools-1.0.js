// Generated by CoffeeScript 1.7.1

/*
[Project page](https://thaibault.github.com/jQuery-tools)

This module provides common reusable logic for every non trivial jQuery plugin.

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

t.sickert@gmail.com (Torben Sickert)

Version
-------

1.0 stable
 */

(function() {
  var __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  (function($) {
    var Tools;
    Tools = (function() {

      /*
          This plugin provides such interface logic like generic controller
          logic for integrating plugins into $, mutual exclusion for
          depending gui elements, logging additional string, array or
          function handling. A set of helper functions to parse option
          objects dom trees or handle events is also provided.
       */

      /*
          **self {Tools}**
          Saves a reference to this class useful for introspection.
       */
      Tools.prototype.self = Tools;


      /*
          **keyCode {Object}**
          Saves a mapping from key codes to their corresponding name.
       */

      Tools.prototype.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
      };


      /*
          **_consoleMethods {String[]}**
          This variable contains a collection of methods usually binded to
          the console object.
       */

      Tools.prototype._consoleMethods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];


      /*
          **_javaScriptDependentContentHandled {Boolean}**
          Indicates weather javaScript dependent content where hide or shown.
       */

      Tools.prototype._javaScriptDependentContentHandled = false;


      /*
          **__tools__ {Boolean}**
          Indicates if an instance was derived from this class.
       */

      Tools.prototype.__tools__ = true;


      /*
          **__name__ {String}**
          Holds the class name to provide inspection features.
       */

      Tools.prototype.__name__ = 'Tools';

      function Tools($domNode, _options, _defaultOptions, _locks) {
        var method, _i, _len, _ref;
        this.$domNode = $domNode != null ? $domNode : null;
        this._options = _options != null ? _options : {};
        this._defaultOptions = _defaultOptions != null ? _defaultOptions : {
          logging: false,
          domNodeSelectorPrefix: 'body',
          domNodes: {
            hideJavaScriptEnabled: '.hidden-on-javascript-enabled',
            showJavaScriptEnabled: '.visible-on-javascript-enabled'
          }
        };
        this._locks = _locks != null ? _locks : {};

        /*
            This method should be overwritten normally. It is triggered if
            current object is created via the "new" keyword.
        
            **returns {$.Tools}** Returns the current instance.
         */
        _ref = this._consoleMethods;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          method = _ref[_i];
          if (window.console == null) {
            window.console = {};
          }
          if (window.console[method] == null) {
            console[method] = $.noop();
          }
        }
        if (!this.self.prototype._javaScriptDependentContentHandled) {
          this.self.prototype._javaScriptDependentContentHandled = true;
          $(this._defaultOptions.domNodeSelectorPrefix + ' ' + this._defaultOptions.domNodes.hideJavaScriptEnabled).filter(function() {
            return !$(this).data('javaScriptDependentContentHide');
          }).data('javaScriptDependentContentHide', true).hide();
          $(this._defaultOptions.domNodeSelectorPrefix + ' ' + this._defaultOptions.domNodes.showJavaScriptEnabled).filter(function() {
            return !$(this).data('javaScriptDependentContentShow');
          }).data('javaScriptDependentContentShow', true).show();
        }
        return this;
      }

      Tools.prototype.destructor = function() {

        /*
            This method could be overwritten normally. It acts like a
            destructor.
        
            **returns {$.Tools}** - Returns the current instance.
         */
        this.off('*');
        return this;
      };

      Tools.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }

        /*
            This method should be overwritten normally. It is triggered if
            current object was created via the "new" keyword and is called
            now.
        
            **options {Object}**  - options An options object.
        
            **returns {$.Tools}** - Returns the current instance.
         */
        this._options = $.extend(true, {}, this._defaultOptions, this._options, options);
        this._options.domNodeSelectorPrefix = this.stringFormat(this._options.domNodeSelectorPrefix, this.camelCaseStringToDelimited(this.__name__));
        return this;
      };

      Tools.prototype.controller = function(object, parameter, $domNode) {
        if ($domNode == null) {
          $domNode = null;
        }

        /*
            Defines a generic controller for $ plugins.
        
            **object {Object|String}** - The object or class to control. If
                                         "object" is a class an instance
                                         will be generated.
        
            **parameter {Arguments}**  - The initially given arguments
                                         object.
        
            **returns {Mixed}**        - Returns whatever the initializer
                                         method returns.
         */
        parameter = this.argumentsObjectToArray(parameter);
        if (object.__name__ == null) {
          object = new object($domNode);
          if (object.__tools__ == null) {
            object = $.extend(true, new Tools, object);
          }
        }
        if ($domNode != null) {
          if ($domNode.data(object.__name__)) {
            object = $domNode.data(object.__name__);
          } else {
            $domNode.data(object.__name__, object);
          }
        }
        if (object[parameter[0]] != null) {
          return object[parameter[0]].apply(object, parameter.slice(1));
        } else if (!parameter.length || $.type(parameter[0]) === 'object') {

          /*
              If an options object or no method name is given the
              initializer will be called.
           */
          return object.initialize.apply(object, parameter);
        }
        return $.error(("Method \"" + parameter[0] + "\" does not exist on $-extension ") + ("" + object.__name__ + "\"."));
      };

      Tools.prototype.acquireLock = function(description, callbackFunction, autoRelease) {
        var wrappedCallbackFunction;
        if (autoRelease == null) {
          autoRelease = false;
        }

        /*
            Calling this method introduces a starting point for a critical
            area with potential race conditions. The area will be binded to
            given description string. So don't use same names for different
            areas.
        
            **description {String}**        - A short string describing the
                                              critical areas properties.
        
            **callbackFunction {Function}** - A procedure which should only
                                              be executed if the
                                              interpreter isn't in the
                                              given critical area. The lock
                                              description string will be
                                              given to the callback
                                              function.
        
            **autoRelease {Boolean}**       - Release the lock after
                                              execution of given callback.
        
            **returns {$.Tools}**           - Returns the current instance.
         */

        /*
            NOTE: The "window.setTimeout()" wrapper guarantees that the
            following function will be executed without any context
            switches in all browsers. If you want to understand more about
            that, "What are event loops?" might be a good question.
         */
        wrappedCallbackFunction = (function(_this) {
          return function(description) {
            callbackFunction(description);
            if (autoRelease) {
              return _this.releaseLock(description);
            }
          };
        })(this);
        if (this._locks[description] != null) {
          this._locks[description].push(wrappedCallbackFunction);
        } else {
          this._locks[description] = [];
          wrappedCallbackFunction(description);
        }
        return this;
      };

      Tools.prototype.releaseLock = function(description) {

        /*
            Calling this method  causes the given critical area to be
            finished and all functions given to "this.acquireLock()" will
            be executed in right order.
        
            **description {String}** - A short string describing the
                                       critical areas properties.
        
            **returns {$.Tools}**    - Returns the current instance.
         */

        /*
            NOTE: The "window.setTimeout()" wrapper guarantees that the
            following function will be executed without any context
            switches in all browsers.
            If you want to understand more about that,
            "What are event loops?" might be a good question.
         */
        if (this._locks[description] != null) {
          if (this._locks[description].length) {
            this._locks[description].shift()(description);
            if ((this._locks[description] != null) && !this._locks[description].length) {
              delete this._locks[description];
            }
          } else {
            delete this._locks[description];
          }
        }
        return this;
      };

      Tools.prototype.mouseOutEventHandlerFix = function(eventHandler) {

        /*
            This method fixes an ugly javaScript bug. If you add a mouseout
            event listener to a dom node the given handler will be called
            each time any dom node inside the observed dom node triggers a
            mouseout event. This methods guarantees that the given event
            handler is only called if the observed dom node was leaved.
        
            **eventHandler {Function}** - The mouse out event handler.
        
            **returns {Function}**      - Returns the given function
                                          wrapped by the workaround logic.
         */
        var self;
        self = this;
        return function(event) {
          var relatedTarget;
          relatedTarget = event.toElement;
          if (event.relatedTarget) {
            relatedTarget = event.relatedTarget;
          }
          while (relatedTarget && relatedTarget.tagName !== 'BODY') {
            if (relatedTarget === this) {
              return;
            }
            relatedTarget = relatedTarget.parentNode;
          }
          return eventHandler.apply(self, arguments);
        };
      };

      Tools.prototype.log = function() {
        var additionalArguments, avoidAnnotation, force, level, message, object, _ref;
        object = arguments[0], force = arguments[1], avoidAnnotation = arguments[2], level = arguments[3], additionalArguments = 5 <= arguments.length ? __slice.call(arguments, 4) : [];
        if (force == null) {
          force = false;
        }
        if (avoidAnnotation == null) {
          avoidAnnotation = false;
        }
        if (level == null) {
          level = 'info';
        }

        /*
            Shows the given object's representation in the browsers
            console if possible or in a standalone alert-window as
            fallback.
        
            **object {Mixed}**            - Any object to print.
        
            **force {Boolean}**           - If set to "true" given input
                                            will be shown independently
                                            from current logging
                                            configuration or interpreter's
                                            console implementation.
        
            **avoidAnnotation {Boolean}** - If set to "true" given input
                                            has no module or log level
                                            specific annotations.
        
            **level {String}**            - Description of log messages
                                            importance.
        
            Additional arguments are used for string formating.
        
            **returns {$.Tools}**         - Returns the current instance.
         */
        if (this._options.logging || force) {
          if (avoidAnnotation) {
            message = object;
          } else if ($.type(object) === 'string') {
            additionalArguments.unshift(object);
            message = ("" + this.__name__ + " (" + level + "): ") + this.stringFormat.apply(this, additionalArguments);
          } else if ($.isNumeric(object)) {
            message = "" + this.__name__ + " (" + level + "): " + (object.toString());
          } else if ($.type(object) === 'boolean') {
            message = "" + this.__name__ + " (" + level + "): " + (object.toString());
          } else {
            this.log(",--------------------------------------------,");
            this.log(object, force, true);
            this.log("'--------------------------------------------'");
          }
          if (message) {
            if ((((_ref = window.console) != null ? _ref[level] : void 0) != null) === $.noop() && force) {
              window.alert(message);
            }
            window.console[level](message);
          }
        }
        return this;
      };

      Tools.prototype.info = function() {
        var additionalArguments, object;
        object = arguments[0], additionalArguments = 2 <= arguments.length ? __slice.call(arguments, 1) : [];

        /*
            Wrapper method for the native console method usually provided
            by interpreter.
        
            **object {Mixed}**    - Any object to print.
        
            Additional arguments are used for string formating.
        
            **returns {$.Tools}** - Returns the current instance.
         */
        return this.log.apply(this, [object, false, false, 'info'].concat(additionalArguments));
      };

      Tools.prototype.debug = function() {
        var additionalArguments, object;
        object = arguments[0], additionalArguments = 2 <= arguments.length ? __slice.call(arguments, 1) : [];

        /*
            Wrapper method for the native console method usually provided
            by interpreter.
        
            **param {Mixed}**     - Any object to print.
        
            Additional arguments are used for string formating.
        
            **returns {$.Tools}** - Returns the current instance.
         */
        return this.log.apply(this, [object, false, false, 'debug'].concat(additionalArguments));
      };

      Tools.prototype.error = function() {
        var additionalArguments, object;
        object = arguments[0], additionalArguments = 2 <= arguments.length ? __slice.call(arguments, 1) : [];

        /*
            Wrapper method for the native console method usually provided
            by interpreter.
        
            **object {Mixed}**    - Any object to print.
        
            Additional arguments are used for string formating.
        
            **returns {$.Tools}** - Returns the current instance.
         */
        return this.log.apply(this, [object, false, false, 'error'].concat(additionalArguments));
      };

      Tools.prototype.warn = function() {
        var additionalArguments, object;
        object = arguments[0], additionalArguments = 2 <= arguments.length ? __slice.call(arguments, 1) : [];

        /*
            Wrapper method for the native console method usually provided
            by interpreter.
        
            **object {Mixed}**    - Any object to print.
        
            Additional arguments are used for string formating.
        
            **returns {$.Tools}** - Returns the current instance.
         */
        return this.log.apply(this, [object, false, false, 'warn'].concat(additionalArguments));
      };

      Tools.prototype.show = function(object) {

        /*
            Dumps a given object in a human readable format.
        
            **object {Object}**  - Any object to show.
        
            **returns {String}** - Returns the serialized object.
         */
        var output;
        output = '';
        if ($.type(object) === 'string') {
          output = object;
        } else {
          $.each(object, function(key, value) {
            if (value === void 0) {
              value = 'undefined';
            } else if (value === null) {
              value = 'null';
            }
            return output += "" + (key.toString()) + ": " + (value.toString()) + "\n";
          });
        }
        if (!output) {
          output = output.toString();
        }
        return "" + ($.trim(output)) + "\n(Type: \"" + ($.type(object)) + "\")";
      };

      Tools.prototype.sliceDomNodeSelectorPrefix = function(domNodeSelector) {

        /*
            Removes a selector prefix from a given selector. This methods
            searches in the options object for a given
            "domNodeSelectorPrefix".
        
            **domNodeSelector {String}** - The dom node selector to slice.
        
            **return {String}**          - Returns the sliced selector.
         */
        var _ref;
        if ((((_ref = this._options) != null ? _ref.domNodeSelectorPrefix : void 0) != null) && domNodeSelector.substring(0, this._options.domNodeSelectorPrefix.length) === this._options.domNodeSelectorPrefix) {
          return $.trim(domNodeSelector.substring(this._options.domNodeSelectorPrefix.length));
        }
        return domNodeSelector;
      };

      Tools.prototype.getDomNodeName = function(domNode) {

        /*
            Determines the dom node name of a given dom node string.
        
            **domNode {String}** - A given to dom node selector to
                                   determine its name.
        
            **returns {String}** - Returns the dom node name.
        
            **examples**
        
            >>> $.Tools.getDomNodeName('&lt;div&gt;');
            'div'
        
            >>> $.Tools.getDomNodeName('&lt;div&gt;&lt;/div&gt;');
            'div'
        
            >>> $.Tools.getDomNodeName('&lt;br/&gt;');
            'br'
         */
        return domNode.match(new RegExp('^<?([a-zA-Z]+).*>?.*'))[1];
      };

      Tools.prototype.grabDomNode = function(domNodeSelectors) {

        /*
            Converts an object of dom selectors to an array of $ wrapped
            dom nodes. Note if selector description as one of "class" or
            "id" as suffix element will be ignored.
        
            **domNodeSelectors {Object}** - An object with dom node
                                            selectors.
        
            **returns {Object}**          - Returns all $ wrapped dom nodes
                                            corresponding to given
                                            selectors.
         */
        var domNodes;
        domNodes = {};
        if (domNodeSelectors != null) {
          $.each(domNodeSelectors, (function(_this) {
            return function(key, value) {
              var match;
              match = value.match(', *');
              if (match) {
                $.each(value.split(match[0]), function(key, valuePart) {
                  if (key) {
                    return value += ", " + _this._grabDomNodeHelper(key, valuePart, domNodeSelectors);
                  } else {
                    return value = valuePart;
                  }
                });
              }
              return domNodes[key] = $(_this._grabDomNodeHelper(key, value, domNodeSelectors));
            };
          })(this));
        }
        if (this._options.domNodeSelectorPrefix) {
          domNodes.parent = $(this._options.domNodeSelectorPrefix);
        }
        domNodes.window = $(window);
        domNodes.document = $(document);
        return domNodes;
      };

      Tools.prototype.getMethod = function() {
        var additionalArguments, method, parameter, scope;
        method = arguments[0], scope = arguments[1], additionalArguments = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        if (scope == null) {
          scope = this;
        }

        /*
            Methods given by this method has the plugin scope referenced
            with "this". Otherwise "this" usually points to the object the
            given method was attached to. If "method" doesn't match string
            arguments are passed through "$.proxy()" with "context" setted
            as "scope" or "this" if nothing is provided.
        
            **method {String|Function|Object}** - A method name of given
                                                  scope.
        
            **scope {Object|String}**           - A given scope.
        
            **returns {Mixed}**                 - Returns the given methods
                                                  return value.
         */

        /*
            This following outcomment line would be responsible for a
            bug in yuicompressor.
            Because of declaration of arguments the parser things that
            arguments is a local variable and could be renamed.
            It doesn't care about that the magic arguments object is
            necessary to generate the arguments array in this context.
        
            var arguments = this.argumentsObjectToArray(arguments);
        
            use something like this instead:
        
            var parameter = this.argumentsObjectToArray(arguments);
         */
        parameter = this.argumentsObjectToArray(arguments);
        if ($.type(method) === 'string' && $.type(scope) === 'object') {
          return function() {
            var thisFunction;
            if (!scope[method]) {
              $.error(("Method \"" + method + "\" doesn't exists in ") + ("\"" + scope + "\"."));
            }
            thisFunction = arguments.callee;
            parameter = $.Tools().argumentsObjectToArray(arguments);
            parameter.push(thisFunction);
            return scope[method].apply(scope, parameter.concat(additionalArguments));
          };
        }
        parameter.unshift(scope);
        parameter.unshift(method);
        return $.proxy.apply($, parameter);
      };

      Tools.prototype.debounce = function() {
        var additionalArguments, eventFunction, lock, thresholdInMilliseconds;
        eventFunction = arguments[0], thresholdInMilliseconds = arguments[1], additionalArguments = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        if (thresholdInMilliseconds == null) {
          thresholdInMilliseconds = 600;
        }

        /*
            Prevents event functions from triggering to often by defining a
            minimal span between each function call. Additional arguments
            given to this function will be forwarded to given event
            function call.
        
            **eventFunction** {Function}         - The function to call
                                                   debounced
        
            **thresholdInMilliseconds** {Number} - The minimum time span
                                                   between each function
                                                   call
        
            **returns {Function}**               - Returns the wrapped
                                                   method
         */
        lock = false;
        return function() {
          var timeoutID;
          if (!lock) {
            lock = true;
            timeoutID = setTimeout((function() {
              return lock = false;
            }), thresholdInMilliseconds);
            return eventFunction.apply(this, additionalArguments);
          }
        };
      };

      Tools.prototype.fireEvent = function() {
        var additionalArguments, callOnlyOptionsMethod, eventHandlerName, eventName, scope;
        eventName = arguments[0], callOnlyOptionsMethod = arguments[1], scope = arguments[2], additionalArguments = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
        if (callOnlyOptionsMethod == null) {
          callOnlyOptionsMethod = false;
        }
        if (scope == null) {
          scope = this;
        }

        /*
            Searches for internal event handler methods and runs them by
            default. In addition this method searches for a given event
            method by the options object. Additional arguments are
            forwareded to respective event functions.
        
            **eventName {String}                - An event name.
        
            **callOnlyOptionsMethod {Boolean}** - Prevents from trying to
                                                  call an internal event
                                                  handler.
        
            **scope {Object}**                  - The scope from where the
                                                  given event handler
                                                  should be called.
        
            **returns {Boolean}**               - Returns "true" if an
                                                  event handler was called
                                                  and "false" otherwise.
         */
        if (!scope) {
          scope = this;
        }
        eventHandlerName = 'on' + eventName.substr(0, 1).toUpperCase() + eventName.substr(1);
        if (!callOnlyOptionsMethod) {
          if (scope[eventHandlerName]) {
            scope[eventHandlerName].apply(scope, additionalArguments);
          } else if (scope["_" + eventHandlerName]) {
            scope["_" + eventHandlerName].apply(scope, additionalArguments);
          }
        }
        if (scope._options && scope._options[eventHandlerName]) {
          scope._options[eventHandlerName].apply(scope, additionalArguments);
          return true;
        }
        return false;
      };

      Tools.prototype.on = function() {

        /*
            A wrapper method for "$.on()". It sets current plugin name as
            event scope if no scope is given. Given arguments are modified
            and passed through "$.on()".
        
            **returns {$}** - Returns $'s grabbed dom node.
         */
        return this._bindHelper(arguments, false);
      };

      Tools.prototype.off = function() {

        /*
            A wrapper method fo "$.off()". It sets current plugin name as
            event scope if no scope is given. Given arguments are modified
            and passed through "$.off()".
        
            **returns {$}** - Returns $'s grabbed dom node.
         */
        return this._bindHelper(arguments, true, 'off');
      };

      Tools.prototype.argumentsObjectToArray = function(argumentsObject) {

        /*
            Converts the interpreter given magic arguments object to a
            standard array object.
        
            **argumentsObject {Object}** - An argument object.
        
            **returns {Object[]}**       - Returns the array containing all
                                           elements in given arguments
                                           object.
         */
        return Array.prototype.slice.call(argumentsObject);
      };

      Tools.prototype.round = function(number, digits) {
        if (digits == null) {
          digits = 0;
        }

        /*
            Rounds a given number accurate to given number of digits.
        
            **number {Float}**   - The number to round.
        
            **digits {Integer}** - The number of digits after comma.
        
            **returns {Float}**  - Returns the rounded number.
         */
        return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
      };

      Tools.prototype.stringFormat = function() {
        var additionalArguments, string;
        string = arguments[0], additionalArguments = 2 <= arguments.length ? __slice.call(arguments, 1) : [];

        /*
            Performs a string formation. Replaces every placeholder "{i}"
            with the i'th argument.
        
            **string {String}**  - The string to format.
        
            Additional arguments are interpreted as replacements for string
            formating.
        
            **returns {String}** - The formatted string.
         */
        additionalArguments.unshift(string);
        $.each(additionalArguments, function(key, value) {
          return string = string.replace(new RegExp("\\{" + key + "\\}", 'gm'), value);
        });
        return string;
      };

      Tools.prototype.camelCaseStringToDelimited = function(string, delimiter) {
        if (delimiter == null) {
          delimiter = '-';
        }

        /*
            Converts a camel case string to a string with given delimiter
            between each camel case separation.
        
            **string {String}**    - The string to format.
        
            **delimiter {String}** - The string to put between each camel
                                     case separation.
        
            **returns {String}**   - The formatted string.
         */
        return string.replace(new window.RegExp('(.)([A-Z])', 'g'), function() {
          return arguments[1] + delimiter + arguments[2];
        }).toLowerCase();
      };

      Tools.prototype.delimitedToCamelCase = function(string, delimiter) {
        if (delimiter == null) {
          delimiter = '-';
        }

        /*
            Converts a delimited string to a string with any none
            alphanumeric value to its camel cased version.
        
            **string {String}**    - The string to format.
        
            **returns {String}**   - The formatted string.
         */
        console.log(string);
        return string.replace(new window.RegExp('(\-[a-z])', 'g'), function() {
          return arguments[1].toUpperCase().replace('-', '');
        });
      };

      Tools.prototype.capitalize = function(string) {

        /*
            Converts a string to its capitalize representation.
        
            **string {String}**    - The string to format.
        
            **returns {String}**   - The formatted string.
         */
        return string.substr(0, 1).toUpperCase() + string.substr(1);
      };

      Tools.prototype.addSeparatorToPath = function(path, pathSeparator) {
        if (pathSeparator == null) {
          pathSeparator = '/';
        }

        /*
            Appends a path selector to the given path if there isn't one
            yet.
        
            **path {String}**          - The path for appending a selector.
        
            **pathSeparator {String}** - The selector for appending to
                                         path.
        
            **returns {String}**       - The appended path.
         */
        path = $.trim(path);
        if (path.substr(-1) !== pathSeparator && path.length) {
          return path + pathSeparator;
        }
        return path;
      };

      Tools.prototype.getUrlVariables = function(key) {

        /*
            Read a page's GET URL variables and return them as an
            associative array.
        
            **key {String}**    - A get array key. If given only the
                                  corresponding value is returned and full
                                  array otherwise.
        
            **returns {Mixed}** - Returns the current get array or
                                  requested value. If requested key doesn't
                                  exist "undefined" is returned.
         */
        var variables;
        variables = [];
        $.each(window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'), function(key, value) {
          variables.push(value.split('=')[0]);
          return variables[value.split('=')[0]] = value.split('=')[1];
        });
        if ($.type(key) === 'string') {
          if (__indexOf.call(variables, key) >= 0) {
            return variables[key];
          } else {
            return void 0;
          }
        }
        return variables;
      };

      Tools.prototype._bindHelper = function(parameter, removeEvent, eventFunctionName) {
        var $domNode;
        if (removeEvent == null) {
          removeEvent = false;
        }
        if (eventFunctionName == null) {
          eventFunctionName = 'on';
        }

        /*
            Helper method for attach event handler methods and their event
            handler remove pendants.
        
            **parameter** {Object}**       - Arguments object given to
                                             methods like "bind()" or
                                             "unbind()".
        
            **removeEvent {Boolean}**      - Indicates if "unbind()" or
                                             "bind()" was given.
        
            **eventFunctionName {String}** - Name of function to wrap.
        
            **returns {$}**                - Returns $'s wrapped dom node.
         */
        $domNode = $(parameter[0]);
        if ($.type(parameter[1]) === 'object' && !removeEvent) {
          $.each(parameter[1], (function(_this) {
            return function(eventType, handler) {
              return _this[eventFunctionName]($domNode, eventType, handler);
            };
          })(this));
          return $domNode;
        }
        parameter = this.argumentsObjectToArray(parameter).slice(1);
        if (parameter.length === 0) {
          parameter.push('');
        }
        if (parameter[0].indexOf('.') === -1) {
          parameter[0] += "." + this.__name__;
        }
        if (removeEvent) {
          return $domNode[eventFunctionName].apply($domNode, parameter);
        }
        return $domNode[eventFunctionName].apply($domNode, parameter);
      };

      Tools.prototype._grabDomNodeHelper = function(key, selector, domNodeSelectors) {

        /*
            Converts a dom selector to a prefixed dom selector string.
        
            **key {Integer}**             - Current element in options
                                            array to
                                            grab.
        
            **selector {String}**         - A dom node selector.
        
            **domNodeSelectors {Object}** - An object with dom node
                                            selectors.
        
            **returns {Object}**          - Returns given selector
                                            prefixed.
         */
        var domNodeSelectorPrefix;
        domNodeSelectorPrefix = '';
        if (this._options.domNodeSelectorPrefix) {
          domNodeSelectorPrefix = this._options.domNodeSelectorPrefix + ' ';
        }
        if (selector.substr(0, domNodeSelectorPrefix.length) !== domNodeSelectorPrefix && $.trim(selector).substr(0, 1) !== '<') {
          domNodeSelectors[key] = domNodeSelectorPrefix + selector;
          return $.trim(domNodeSelectors[key]);
        }
        return $.trim(selector);
      };

      return Tools;

    })();
    $.fn.Tools = function() {
      return (new Tools).controller(Tools, arguments, this);
    };
    $.Tools = function() {
      return (new Tools).controller(Tools, arguments);
    };
    return $.Tools["class"] = Tools;
  })(this.jQuery);

}).call(this);
