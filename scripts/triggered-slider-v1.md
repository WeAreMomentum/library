# Triggered Slider
- [Description](#description)
    - [Element structure](#element-structure)
    - [Options defaults](#options-defaults)
- [To-Dos](#to-dos)
- [Change log](#change-log)
    - [V1.2](#v12)

## Description

### Element structure:
- `[data-triggered-slider="wrapper"]` - contains the slider and all related triggers
    - slider 1 - this slider is controlled by slider 2 or a group of buttons
        - `[data-triggered-slider="nav"]` - required; 
        - `[data-triggered-slider="previous"]`
        - `[data-triggered-slider="next"]`
    - slider 2 or a group of buttons
        - `[data-triggered-slider="trigger-nav"]`
        - `[data-triggered-slider="trigger-previous"]`
        - `[data-triggered-slider="trigger-next"]`
        - `[data-triggered-slider="trigger-first"]`
        - `[data-triggered-slider="trigger-last"]`
### Options defaults:
Add these attributes to the wrapper if you want to override the defaults
- `[data-triggered-slider-delay=""]` - a number which sets a delay in seconds
## To-Dos
- ...

## Change log
### V1.2
First upload on GitHub