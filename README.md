# [Sienna Wellness](https://www.siennawellness.com)

Website for Sienna Wellness using 11ty

## Requirements

- [Node](https://nodejs.org/en) >= 18.13.0
- Or [`nvm`](https://github.com/nvm-sh/nvm)

## Installation

```bash
git clone git@github.com:kernvalley/siennawellness.com
cd siennawellness.com
# If nvm is used (it makes you use a fixed version of node)
nvm use
npm i
npm run netlify:link
```

## Documentation Links / Tutorials

- [Eleventy](11ty.dev/)
- [Markdown](https://commonmark.org/)
- [YAML](https://www.redhat.com/sysadmin/yaml-beginners)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/)

## Notes for non-developers

Most updates should only require changes within `_data/` and `_posts/`. Such changes
should only require knowledge of Markdown or YAML. Anything beyond this, you should
probably consult with a developer.

## Notes to Developers

- This projects provides an [`.editorconfig`](https://editorconfig.org/#download)
- All JS **MUST** pass rules defined by `.eslintrc.json`
- All stylesheets **MUST** pass rules defined by `.stylelintrc.json`
- All commits **MUST** have a PGP signature
- You **MUST NOT** push directly to `master` (create a Rull Request)

### Browser Requirements for Development Environment

Bundling of CSS and JS are only done in production, so your browser **MUST**
support ES modules, [import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap),
`@import` in CSS, and potentially CSS Nesting. Any modern browser supports all of
these (as-of May 2023, Firefox does not support CSS Nesting).

Most, if not all features apart from what bundlers provide is already handled
via `@shgysk8zer0/polyfills`, so current builds of any major browser should be
sufficient.

## Directory Structure

- `_layouts/` is for page layouts (default, post, page, etc)
- `_includes/` is for reusable components accessible via `{% include "filename.ext" arg: "foo" %}`
- `_data/` is where files that contain or output data are stored
- `_posts/` is the directory where blog posts are stored and, for organization, should have subdirectories for each year
- `_site/` is where the generated site is output and what Netlify serves
- `docs/` is for various documents/downloads/attachments ... Be sure to update `_data/documents.yml`
- [`css/`, `js/`, `img/`, etc] are for their respective file types

## Blog

All posts **SHOULD** be added to `_posts/:YYYY/` and **MUST** be named
`:YYYY-:MM-DD-:tile.:ext`. Markdown and HTML files are both supported.

If posts include a `tags` property in frontmatter, then `tags` **MUST** inculde
`posts` or they **WILL NOT** be displayed in any listing of `collections.posts`.

All posts **MUST** include a `title`.

All posts **SHOULD** include a `description` and an `image` or `thumbnail`.

All `date`s **SHOULD** contain time in the `hh:mm:ss` format (failure to do so
will result in UTC times being used and may result in inaccurate dates).

## Security Notes

### [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)

This restricts where scripts, stylesheets, images, etc. may be loaded from and
is controlled by `_data/csp.yml`. It is used in `_headers.liquid`, which generates
HTTP headers served with each page.

### [TrustedTypes](https://developer.mozilla.org/en-US/docs/Web/API/TrustedTypePolicy)

You can think of this as script permissions - a script/component that creates
a trusted type policy requires permissions to create HTML as strings, set attributes
which are considered "injection sinks", or in some way perform an action which
may be considered dangerous.

For the sake of quick comprehension, there is a naming convention that's often
use where policies are named as `"${name}#${permission}"`, such that a policy
which only needs to write/parse HTML would be named as `"${policy.name}#html"`.

**Note**: `"empty#html"` and `"empty#script"` are used for the polyfills for
`trustedTypes.emptyHML` and `trustedTypes.emptyScript` respectively and are always
required.

```js
trustedTypes.createPolicy(policy.name, {
  createHTML: policy.createHTML,
  createScript: policy.createScript,
  createScriptURL: policy.createScriptURL, // Also used for `<iframe src>`, etc.
});
```

## Third-Party Code (Type B Deliverables)

All of these are open source projects (probably MIT license) that you may find
in the project directory which are to be considered separate from the codebase.
**DO NOT** make any changes in such locations, as they **WILL NOT** carry over
to the production build of the website. They are fetched from their sources on
each deployment and, as such, no local changes can/will be seen in the end-site.

### Submodules

- [`_layouts/11ty-layouts/`](https://github.com/shgysk8zer0/11ty-layouts/)
- [`_includes/11ty-commont/`](https://github.com/shgysk8zer0/11ty-common)
- [`img/octicons/`](https://github.com/shgysk8zer0/octicons-svg)
- [`img/adwaita-icons/`](https://github.com/shgysk8zer0/adwaita-icons)
- [`img/logos/`](https://github.com/shgysk8zer0/logos)

### NPM Packages

- [`@shgysk8zer0/11ty-netlify`](https://github.com/shgysk8zer0/11ty-netlify)
  - Eslint
  - Stylelint
  - Rollup
  - PostCSS
  - svg-sprite-generator
  - svgo
  - Misc. plugins
  - All contents of `node_modules/`
