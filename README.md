[SVG to VNode](http://svgtovnode.thibaudb.com/)
===

Convert SVG element to Snabbdom virtual node.

[Use it here.](http://svgtovnode.thibaudb.com/)


## Example

Convert SVG icons

```<?xml version="1.0" encoding="UTF-8"?>
<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch -->
    <title>Path</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <polygon id="Path" fill="#FFFFFF" fill-rule="nonzero" points="19.8 7.2 12.6 7.2 12.6 0 7.2 0 7.2 7.2 0 7.2 0 12.6 7.2 12.6 7.2 19.8 12.6 19.8 12.6 12.6 19.8 12.6"></polygon>
    </g>
</svg>```

To Snabbdom VNode

```h('svg', { attrs: { 'width': '20px', 'height': '20px', 'viewBox': '0 0 20 20' } },  [
  h('g', { attrs: { 'stroke': 'none', 'stroke-width': '1', 'fill': 'none', 'fill-rule': 'evenodd' } },  [
    h('polygon', { attrs: { 'fill': '#FFFFFF', 'fill-rule': 'nonzero', 'points': '19.8 7.2 12.6 7.2 12.6 0 7.2 0 7.2 7.2 0 7.2 0 12.6 7.2 12.6 7.2 19.8 12.6 19.8 12.6 12.6 19.8 12.6' } }, )
  ]),
])```


[![Analytics](https://ga-beacon.appspot.com/UA-59640055-1/svgtovnode/readme)](https://github.com/igrigorik/ga-beacon)
