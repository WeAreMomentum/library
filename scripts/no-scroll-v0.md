# No Scroll
- [Description](#description)
    - [Element structure](#element-structure)
    - [Options defaults](#options-defaults)
- [To-Dos](#to-dos)
- [Change log](#change-log)
    - [V0.3](#v03)
    - [V0.2](#v02)

## Description
Prevents page scrolling (for example when the menu is shown)
### Element structure:
- `[data-no-scroll=""]` - values: "toggle", "on", "off" - a click on this element triggers the class 'no-scroll' on the document element
### Options defaults:
Add these attributes to the trigger if you want to override the defaults
- `[data-no-scroll-breakpoint-down=""]` - runs only on screen widths lower than the set value in px
- `[data-no-scroll-breakpoint-up=""]` - runs only on screen widths higher than the set value in px

## To-Dos

## Change 
### V0.3
Replaced deprecated MediaQueryList method and changed to class oriented code.
### V0.2
First upload on GitHub