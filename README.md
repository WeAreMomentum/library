# Library
Public library of scripts and stylesheets for our (Webflow) websites.

To use these files in a (Webflow) project, reference them via `https://wearemomentum.github.io/library/`.

Example: `<script src="https://wearemomentum.github.io/library/scripts/cms-slider-v2.js"></script>`

Important note: do NOT use `async` for scripts to be executed before Webflow initialization.

- [Scripts](#scripts)
  - [Naming](#naming)
  - [Versioning](#versioning)
- [Stylesheets](#stylesheets)

## Scripts
A collection of various scripts to implement functionality to our Webflow projects.

Create a md-file for documentation for every script-file.
### Naming
CMS Slider V2.3 -> `cms-slider-v2`

CMS Slider V3.0 -> `cms-slider-v3`
### Versioning
<!-- https://mermaid.js.org/intro/ -->
```mermaid
flowchart LR
  v23["CMS Slider V2.3"]
  cond{{"new version
  is downwards
  compatible?"}}
  v24["CMS Slider V2.4
  same file"]
  v30["CMS Slider V3.0
  new file
  (keep old file)"]

  v23 --> cond
  cond -->|Yes| v24
  cond -->|No| v30
```

## Stylesheets
A collection of various stylesheets to add to our Webflow projects.