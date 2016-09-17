/**
 * Sticky position that works everywhere
 *
 * MIT licensed. By Afshin Mehrabani <afshin.meh@gmail.com>
 *
 * This project is a part of Kissui framework.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kissuiPosition'], function (kissuiPosition) {
      return (root.kissuiSticky = factory(kissuiPosition));
    });
  } else {
    root.kissuiSticky = factory(root.kissuiPosition);
  }
}(this, function (kissuiPosition) {

  /**
  * options
  */
  var _options = {
    attribute: 'data-kui-sticky',
    placeholderId: 'kissui-sticky-placeholder-'
  };

  /**
  * To store all available elements with their options
  */
  var _elements = [];

  /**
  * Find elements
  */
  function _populate () {
    //clear old elements first
    _elements = [];

    var elements = document.querySelectorAll('*[' + _options.attribute + ']');

    for (var i = 0;i < elements.length;i++) {
      var element = elements[i];
      var event = element.getAttribute(_options.attribute);

      _add(element, {});
    }
  };

  /**
  * Adds a new item to _elements array
  */
  function _add (element, opts) {
    _elements.push({
      element: element,
      active: false,
      top: NaN,
      opts: opts
    });

    kissuiPosition.add(element, 'top');
  };

  /**
  * Finds an element by looking into the _elements
  *
  */
  function _find (element) {
    for (var i = 0;i < _elements.length; i++) {
      var elx = _elements[i];

      if (element === elx.element) {
        return {
          element: elx,
          i: i
        };
      }
    }

    return null;
  };

  /**
  * Restore the classes and removing the placeholder of top event
  *
  */
  function _restoreTop (id, elx) {
    if (elx.active) {
      var element = elx.element;
      elx.active = false;

      // placeholder
      var placeholder = document.getElementById(_options.placeholderId + id);
      console.log(_options.placeholderId + id, placeholder)
      placeholder.parentElement.removeChild(placeholder);

      element.className = element.className.replace('kui sticky element', '').trim();
    }
  };

  /**
  * To handle top event
  *
  */
  function _handleTop (element, event) {

    // is this a pladeholder?
    if (element.id.indexOf(_options.placeholderId) > -1) {
      var id = parseInt(element.getAttribute('data-id'), 10);
      _restoreTop(id, _elements[id]);
    } else {
      var elxObj = _find(element);
      var elx = elxObj.element;

      if (!elx.active) {
        var props = element.getBoundingClientRect();
        var computedStyle = element.currentStyle || window.getComputedStyle(element);

        // adding the placeholder instead of the `fixed` position element
        var placeholder = document.createElement('div');
        placeholder.className = 'kui sticky placeholder'
        // width/height
        placeholder.style.width = props.width + 'px';
        placeholder.style.height = props.height + 'px';
        // margins
        placeholder.style.marginTop = computedStyle.marginTop;
        placeholder.style.marginBottom = computedStyle.marginBottom;
        placeholder.style.marginLeft = computedStyle.marginLeft;
        placeholder.style.marginRight = computedStyle.marginRight;
        // id
        placeholder.id = 'kissui-sticky-placeholder-' + elxObj.i;
        placeholder.setAttribute('data-id', elxObj.i);

        element.parentElement.insertBefore(placeholder, element);

          // adding placeholder to kissuiPosition to be able to restore the element later
          kissuiPosition.add(placeholder, 'in');

        element.className += ' kui sticky element';
        element.style.left = props.left + 'px';
        element.style.width = props.width + 'px';
        element.style.height = props.height + 'px';

        // set element's active flag to true so we can deactivate the sticky position later
        elx.active = true;
      }
    }
  };

  /**
  * Start the module
  */
  function _init () {
    _populate.call(this);

    kissuiPosition.on('top', function (element, event) {
      _handleTop(element, event);
    });

    kissuiPosition.on('in', function (element, event) {
      _handleTop(element, event);
    });

    kissuiPosition.on('+top', function (element, event) {
      if (element.id.indexOf(_options.placeholderId) == -1) {
        // we call this only for non-placeholder elements
        _handleTop(element, event);
      }
    });

    kissuiPosition.init();
  };

  _init();

  return {
    _options: _options,
    _elements: _elements,
    init: _init,
    add: _add
  };
}));
