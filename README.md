# kissui.sticky
> Simple and lightweight sticky position that works everywhere.

Keeps elements positioned as "fixed" or "relative" depending on how it appears in the viewport. As a result the element is "stuck" when necessary while scrolling.

# Install

You can use *NPM* or *Bower* or *download the package manually*.

# Getting Started

Using this libarary is as easy as adding `data-kui-sticky` attribute to your elements:

```html
<p data-kui-sticky>Hello world!</p>
```

That's it.

# Advanced

You can use the API to add an element:

```js
kissuiSticky.add(element, {
  'className': 'custom_class',
});
```

If you need more help, explore `/example` in the repo.

**Example:**  

You can simply add the `data-kui-sticky` attribute to any elements and that's it:

```html
<p data-kui-sticky></p>
```

Or if you want to add a custom CSS class after activating the sticky position, use this:

```html
<p data-kui-sticky="custom_class"></p>
```

<img src='http://wanna-joke.com/wp-content/uploads/2013/04/cool-cat.gif' width="200" />

# Author
Afshin Mehrabani

# License
MIT
