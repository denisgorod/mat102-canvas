# Vendored: json-canvas-viewer@4.3.2

`chimp.js` is the fully-bundled browser build of
[`json-canvas-viewer`](https://www.npmjs.com/package/json-canvas-viewer) v4.3.2
(MIT, author "Hesprs"), obtained via `npm pack json-canvas-viewer@4.3.2` and
copied from the tarball's `dist/chimp.js`. All runtime deps (marked, dompurify,
@needle-di/core, pointeract, @ahmedsemih/color-fns) are inlined; there are no
bare imports, so this single file loads directly in the browser.

Vendored (rather than loaded from unpkg) to pin the version and remove the
supply-chain / availability risk of an unpinned CDN import. To update: re-run
`npm pack json-canvas-viewer@<version>`, replace `chimp.js`, and update the
import paths in `viewer.js` and `reader.js` plus this directory name.
