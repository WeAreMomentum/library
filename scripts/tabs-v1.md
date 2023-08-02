# Tabs
- [Description](#description)
    - [Element structure](#element-structure)
    - [Options defaults](#options-defaults)
- [To-Dos](#to-dos)
- [Change log](#change-log)
    - [V1.0](#v10)

## Description
Adds tabs functionality to elements.
### Element structure:
- `[data-tabs="group"]` - wraps a group of related tabs; a page can contain multiple groups
    - `[data-tabs="trigger"][data-tabs-slug=""]` - a click on the trigger shows the tab content
        - `[data-tabs="slug"]` - if for some reason the `[data-tabs-slug]` attribute cannot be set on the trigger, add this element as a child
    - `[data-tabs="content"][data-tabs-slug=""]` - this is the actual tab
        - `[data-tabs="slug"]` - if for some reason the `[data-tabs-slug]` attribute cannot be set on the content, add this element as a child
### Options defaults:

## To-Dos
- ...

## Change log
### V1.0
Changed to class oriented programming style.