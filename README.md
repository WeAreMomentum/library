# Library
Public library of scripts, stylesheets and assets for our (Webflow) websites
- [Assets](#assets)
- [Scripts](#scripts)
  - [Naming](#naming)
  - [Versioning](#versioning)
- [Stylesheets](#stylesheets)

## Assets
Webflow is very restrictive in regards to assets. Files that cannot be uploaded to Webflow can be hosted here.

Create a folder for the project (website) and add your files.

## Scripts
A collection of various scripts to implement functionality to our Webflow projects.

Create a md-file for documentation for every script-file.
### Naming
`cms-slider.v2`
### Versioning
<!-- http://flowchart.js.org/ -->
```flow
v21=>start: CMS Slider V2.1
v22=>end: CMS Slider V2.2
v30=>end: CMS Slider V3.0
cond=>condition: new version is downwards compatible?

v21->cond
cond(yes)->v22
cond(no)->v30
```

CMS Slider V2.1 -> new version is downwards compatible? -> V2.2 (same file)

else -> V3.0 (new file: `cms-slider.v3`, keep old file)

## Stylesheets
A collection of various stylesheets to add to our Webflow projects.