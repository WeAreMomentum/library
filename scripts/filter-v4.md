# Filter
- [Description](#description)
    - [Element structure](#element-structure)
    - [Options defaults](#options-defaults)
- [To-Dos](#to-dos)
- [Change log](#change-log)
    - [V4.0](#v40)

## Description
Adds filter, sort and load-more functionalities to a list of items.
There are various types of triggers possible, function="filter" and function="sort" must be elements with a value attribute (button, input, select, ...). Use embeds for these preferably.
If the collection contains more than 100 items, just duplicate the collection list, show the next 100 items and hide it.

### Element structure:
- `[data-filter="group"]` - a page can contain multiple groups
    - `[data-filter="trigger"][data-filter-function="filter"][data-filter-tag=""][value=""]` - optional; triggers filtering; **script now automatically manages the `aria-pressed` attribute for the active state.** Optional attribute: `[data-filter-init]` marks the default filter setting
    - `[data-filter="trigger"][data-filter-function="sort"][value=""]` - optional; triggers sorting; value: '{"order":"random"}' or '{"tag":"","order":""}' with "order": "+", "-"
    - `[data-filter="trigger"][data-filter-function="reset"]` - optional; resets everything to default
    - `div` - list wrapper. **For status messages, this wrapper needs the `aria-live="polite"` attribute.**
        - `div[id="filter-status"][class="visually-hidden"]` - **Required for status messages.** An empty, hidden div that the script will fill with updates (e.g., "5 items found.").
        - `div` - list
            - `[data-filter="item"]` - these are the items to be ordered, shown and hidden according to the current settings
                - `[data-filter="tag"][data-filter-tag=""]` - this is a tag to filter or sort by; an item can contain multiple tags each with a single value; examples: tag="name", text-content="T shirt" and tag="size", text-content="XL"; It's possible to add multiple tags with the same name, but different values; example: tag="location", text-content="Wien" and tag="location", text-content="Graz";
    - `[data-filter="empty-state"]` - this is shown if no item matches the current settings
    - `[data-filter="trigger"][data-filter-function="more"]` - optional; loads more elements

### Options defaults:
Add these attributes to the group if you want to override the defaults
- `[data-filter-sort=""]` - "{'order':'random'}" or "{'order':'initial'}" or "{'tag':'','order':''}" with 'order': '+', '-'; Note: Webflow only allows ' to be used in Custom Attributes
- `[data-filter-limit=""]` - the number of items to show by default
- `[data-filter-more=""]` - the number of items to add on a click on the more-button
- `[data-filter-focus="true"]` - bool - focus on first new element after triggering filter

## To-Dos
- allow multiselect for filters
## Change log
### V4.0
- **Accessibility:** Added full accessibility for filter controls and status updates.
    - Manages `aria-pressed` on filter triggers to programmatically indicate the active state.
    - Adds `aria-live` status messages to inform screen reader users about dynamic list updates.
