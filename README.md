# skrolodex

A tool to help you create fun presentations that scroll.

## Usage

Include [skrollr](https://github.com/Prinzhorn/skrollr) and skrolodex somewhere
in your document. Make sure skrollr comes first.

Include the main skrolodex css. Optionally include a theme as well.

```html
<script src="vendor/skrollr.min.js"></script>
<script src="vendor/skrolodex.js"></script>
<link rel="stylesheet" href="css/skrolodex.css">
<link rel="stylesheet" href="css/skrolodex-theme-default.css">
```

Skrolodex intializes automatically when the DOM has loaded.

## Markup

Author each slide in a `<section>` tag.

Optionally include a data attribute for each slide that tells skrolodex what
type of effect should take place on slide entry and exit.

```html
<section data-in="fade" data-out="scroll">
```

The effect defaults to `"scroll"` if you do not specify.

### Lists

By default, list items fade into view in quick succession. You may specify
`data-list-item-in="..."` on a `<section>` for a different effect. If you
specify `"none"`, there will be no animation.

## Customization

If you don't like the default values of the skrolodex configuration, you may
provide your own configuration. Simply create a global object somewhere on the
page called `skrolodex` that contains a hash called `options`. For example,

```javascript
skrolodex = {
  options: {
    slideLength: 150,
    transitionLength: 10,
    effect: 'fade', // 'fade', 'scroll', or 'zoom'
    listOffset: 2,
    staticListItems: true // true or false
  }
};
```

These are all the options available. You wouldn't need to set both `listOffset`
and `staticListItems: true` in this case, but you get the gist.

## License

(MIT License)

Copyright (c) 2015 Aaron Haurwitz

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.