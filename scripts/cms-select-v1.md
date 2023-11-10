# CMS Select
- [Description](#description)
    - [Element structure](#element-structure)
    - [Options defaults](#options-defaults)
- [To-Dos](#to-dos)
- [Change log](#change-log)
    - [V1.2](#v12)
    - [V1.1](#v11)
    - [V1.0](#v10)

## Description
adds CMS generated `<option>`s to `<select>`
### Element structure:
- `[data-cms-select="wrapper"]` - a page can contain multiple groups
    - `div` - a collection list
        - `div[data-cms-select="value"]` - a text element. Its text content will be the value of the `<option>`
        - `div[data-cms-select="value"][data-cms-select-value=""]` - variant for multilingual pages
    - `select` - a select field to append the `<option>`s to
### Options defaults:

## To-Dos

## Change log
### V1.2
Option to prevent translation of the value, while translating the shown text.
### V1.1
Remove Collection List after copying values.
### V1.0
First upload on GitHub