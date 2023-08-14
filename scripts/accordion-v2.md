# Accordion
- [Description](#description)
    - [Element structure](#element-structure)
    - [Options defaults](#options-defaults)
- [To-Dos](#to-dos)
- [Change log](#change-log)
    - [V2.2](#v22)

## Description
Adds accordion functionality to elements.
### Element structure:
- `[data-accordion="group-wrapper"]` - wraps a group of related accordions; a page can contain multiple accordion groups
    - `[data-accordion="wrapper"]` - this is the actual accordion; in most cases a group contains multiple accordions
        - `[data-accordion="trigger"]` - a click on the trigger opens the accordion content box and adds the class "active" to the accordion
        - `[data-accordion="content"]` - accordion content box
### Options defaults:
Add these attributes to the group if you want to override the defaults
- `[data-accordion-open-all="false"]` - close all other accordions in the same group, when one is opened
- `[data-accordion-init-first="false"]` - if true: first accordion in the group is opened on page load

## To-Dos

## Change log
### V2.2
First upload on GitHub