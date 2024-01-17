# Filter
- [Description](#description)
    - [Element structure](#element-structure)
    - [Options defaults](#options-defaults)
- [To-Dos](#to-dos)
- [Change log](#change-log)
    - [V3.8](#v38)
    - [V3.7](#v37)
    - [V3.6](#v36)
    - [V3.5](#v35)
    - [V3.4](#v34)
    - [V3.3](#v33)
    - [V3.2](#v32)
    - [V3.1](#v31)
    - [V3.0](#v30)

## Description
Adds filter, sort and load-more functionalities to a list of items.
There are various types of triggers possible, function="filter" and function="sort" must be elements with a value attribute (button, input, select, ...). Use embeds for these preferably.
### Element structure:
- `[data-filter="group"]` - a page can contain multiple groups
    - `[data-filter="trigger"][data-filter-function="filter"][data-filter-tag=""][value=""]` - optional; triggers filtering; optional attribute: `[data-filter-init]` marks the default filter setting
    - `[data-filter="trigger"][data-filter-function="sort"][value=""]` - optional; triggers sorting; value: '{"order":"random"}' or '{"tag":"","order":""}' with "order": "+", "-"
    - `[data-filter="trigger"][data-filter-function="reset"]` - optional; resets everything to default
    - `div` - list wrapper
        - `div` - list
            - `[data-filter="item"]` - these are the items to be ordered, shown and hidden according to the current settings
                - `[data-filter="tag"][data-filter-tag=""]` - this is a tag to filter or sort by; an item can contain multiple tags each with a single value; examples: tag="name", text-content="T shirt" and tag="size", text-content="XL"; It's possible to add multiple tags with the same name, but different values; example: tag="location", text-content="Wien" and tag="location", text-content="Graz";
    - `[data-filter="empty-state"]` - this is shown if no item matches the current settings
    - `[data-filter="trigger"][data-filter-function="more"]` - optional; loads more elements
### Options defaults:
Add these attributes to the wrapper if you want to override the defaults
- `[data-filter-sort=""]` - "{'order':'random'}" or "{'order':'initial'}" or "{'tag':'','order':''}" with 'order': '+', '-'; Note: Webflow only allows ' to be used in Custom Attributes
- `[data-filter-limit=""]` - the number of items to show by default
- `[data-filter-more=""]` - the number of items to add on a click on the more-button

## To-Dos
- allow multiselect for filters
<!--
```javascript
function toggleArrayItem(array, item) {
    return array.includes(item) ? array.filter(el => el !== item) : [...array, item];
}
```
-->

## Change log
### V3.8
Bugfix: remove style attribute after animation to prevent crating a new stacking order.
### V3.7
Bugfix: trigger reset for select elements with first option is empty value.
### V3.6
Accessibility: Focus on first new element after triggering filter.
### V3.5
Added default filter option.
### V3.4
Change class `hidden` to `filter-hidden` to prevent issues with weglot-conditional-display
### V3.3
Bugfix: remove empty list.
### V3.2
Allow multiple tags with the same name.
### V3.1
Bugfix: added sort order "initial" to handle case of missing `[data-filter-sort=""]` attribute.
### V3.0
Changed to class oriented programming style.