# CMS Slider
- [Description](#description)
    - [Element structure](#element-structure)
    - [Options defaults](#options-defaults)
- [To-Dos](#to-dos)
- [Change log](#change-log)
    - [V2.3](#v23)
    - [V2.2](#v22)

## Description
Combines the functionalities of Webflow Collection List and Webflow Slider.
### Element structure:
- `[data-slider="wrapper"]` - The wrapper holds 1 Collection List and 1 Slider; a page can contain multiple wrapper
    - `.w-dyn-list` - A Webflow Collection List that contains the items to be shown in the slider; the first child of the Collection Item will be moved to the slide
    - `.w-slider` - A Webflow Slider that contains just one empty slide
### Options defaults:

## To-Dos
- rewrite to class oriented code

## Change log
### V2.3
Hide arrows and nav when there are no hidden slides
### V2.2
First upload on GitHub