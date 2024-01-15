# Flip card
- [Description](#description)
    - [Element structure](#element-structure)
    - [Options defaults](#options-defaults)
- [To-Dos](#to-dos)
- [Change log](#change-log)
    - [V2.2](#v22)
    - [V2.1](#v21)
    - [V2.0](#v20)

## Description
A click on a trigger rotates the element, so it shows it's backside. A second click shows the frontside again.
### Element structure:
- `[data-flip-card="wrapper"]` - The wrapping element and trigger, containing the front- and backside. Add a transition for translate in your styles.
### Options defaults:

## To-Dos

## Change log
### V2.2
Added attribute "aria-pressed".
### V2.1
Removed unused variable declarations.
### V2.0
The wrapper now is the trigger instead of the two sides. This was necessary for accessibility.