# Accordion
- [Description](#description)
    - [Element structure](#element-structure)
    - [Options defaults](#options-defaults)
- [To-Dos](#to-dos)
- [Change log](#change-log)
    - [V3.2](#v32)
    - [V3.1](#v31)
    - [V3.0](#v30)

## Description
Adds accordion functionality to elements.
### Element structure:
- `[data-accordion="group"]` - wraps a group of related accordions; a page can contain multiple accordion groups
    - `[data-accordion="accordion"]` - this is the actual accordion; in most cases a group contains multiple accordions
        - `[data-accordion="trigger"]` - a click on the trigger opens the accordion content box and adds the class "active" to the accordion
        - `[data-accordion="content"]` - accordion content box
    - `[data-accordion="close-all"]` - optional; a click on this element closes all accordions in this group
### Options defaults:
Add these attributes to the group if you want to override the defaults
- `[data-accordion-open-all="false"]` - close all other accordions in the same group, when one is opened
- `[data-accordion-init-first="false"]` - if true: first accordion in the group is opened on page load
- `[data-accordion-init-all="false"]` - if true: all accordions in the group are opened on page load (overrules OpenAll and InitFirst)

## To-Dos

## Change log
### V3.2
Added InitAll functionality.
### V3.1
Added CloseAll functionality.
### V3.0
First upload on GitHub