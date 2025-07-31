# Accordion
- [Description](#description)
    - [Element structure](#element-structure)
    - [Options defaults](#options-defaults)
- [To-Dos](#to-dos)
- [Change log](#change-log)
    - [V4.0](#v40)

## Description
Adds accessible accordion functionality to elements. The script automatically manages ARIA attributes and keyboard focus.

### Element structure:
- `[data-accordion="group"]` - wraps a group of related accordions; a page can contain multiple accordion groups
    - `[data-accordion="accordion"]` - this is the actual accordion; the script adds the class `.active` and `.is-open` when it's open
        - `[data-accordion="trigger"]` - a click on the trigger opens the accordion content. **Must be a `<button>` element.** The script automatically adds `aria-expanded` and `aria-controls`.
        - `[data-accordion="content"]` - accordion content box. The script automatically assigns a unique `id`.
    - `[data-accordion="close-all"]` - optional; a click on this element closes all accordions in this group

### Options defaults:
Add these attributes to the `[data-accordion="group"]` element to override the defaults.
- `[data-accordion-open-all="false"]` - if `false` (default), opening an accordion closes all others in the same group.
- `[data-accordion-init-first="false"]` - if `true`, the first accordion in the group is opened on page load.
- `[data-accordion-init-all="false"]` - if `true`, all accordions in the group are opened on page load (overrules `InitFirst`).

## To-Dos

## Change log
### V4.0
- Added full accessibility support:
    - Dynamic `id` and `aria-controls` attributes.
    - Manages `aria-expanded` state on triggers.
    - Manages `tabindex` for focusable elements in closed panels.
- Uses `.active` and `.is-open` classes for the open state to ensure backward compatibility.
- Removed `sync` functionality for simplification.
