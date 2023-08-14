# Popup
- [Description](#description)
    - [Element structure](#element-structure)
    - [Options defaults](#options-defaults)
- [To-Dos](#to-dos)
- [Change log](#change-log)
    - [V1.2](#v12)
    - [V1.1](#v11)

## Description
Adds popup functionality to elements.
### Element structure:
- `[data-popup="show"][data-popup-id=""]` - a click on this button shows the popup (wrapper -> display: flex); there can be multiple show-buttons for the same popup
    - `[data-popup-id=""]` - if for some reason the `[data-popup-id]` attribute cannot be set on the button, add this element as a child
- `[data-popup="wrapper"][data-popup-id=""]` - this is the actual popup; a page can contain multiple popups
    - `[data-popup-id=""]` - if for some reason the `[data-popup-id]` attribute cannot be set on the wrapper, add this element as a child
    - `[data-popup="hide"]` - a click on this element hides the popup; a popup can contain multiple hide-elements (background overlay, hide button, ...)
    - `[data-popup="prev"]` - optional; a click on this button shows the previous popup which is a sibling of the current popup
    - `[data-popup="next"]` - optional; a click on this button shows the next popup which is a sibling of the current popup
### Options defaults:
Add these attributes to the wrapper if you want to override the defaults
- `[data-popup-show-init="false"]` - if true: show popup on page load; if number: show popup once per session x milliseconds after page load

## To-Dos
- rewrite to class oriented code

## Change log
### V1.2
When popup opens add class `popup-open` to `html` instead of `no-scroll` to prevent issues when a popup opens out of a menu.
### V1.1
First upload on GitHub