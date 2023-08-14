# Merge svg
- [Description](#description)
    - [Element structure](#element-structure)
    - [Options defaults](#options-defaults)
- [To Do's](#to-dos)
- [Change log](#change-log)
    - [V0.1](#v01)

## Description
Merges multiple svg pieces into one big svg to circumvent the character limitation in Webflow embeds.
### Element structure:
- `[data-merge-svg="wrapper"]` - holds all pieces of the svg
    - `svg`
        - `[data-merge-svg="container"]` - this is where all the pieces of the final svg will be merged into. There must be only one container per wrapper.
    - `svg`
        - `[data-merge-svg="item"]` - multiple pieces of the svg
### Options defaults:

## To Do's

## Change log
### V0.1
First upload on GitHub