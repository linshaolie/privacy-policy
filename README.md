# Privacy Policy

Static privacy policy pages for apps.

## Pages

- Home: `index.html`
- We Privacy Policy: `We/index.html`
- We Support: `We/support/index.html`
- We Marketing: `We/marketing/index.html`
- TimeCue Privacy Policy: `TimeCue/privacy-policy.html`
- TimeCue Support: `TimeCue/support.html`
- TimeCue Marketing: `TimeCue/marketing.html`
- Declutter Privacy Policy: `Declutter/privacy-policy.html`
- Declutter Support: `Declutter/support.html`
- Declutter Marketing: `Declutter/marketing.html`

## Home Page Config

The root home page reads `site-config.json` and renders a simple app list dynamically.

Each app row links to `app.html?slug=...`, which shows the detailed description, links, and screenshots for that app.

`site.js` also supports a dynamic Apple source. The current config uses developer ID `1271194461` and pulls apps from Apple's lookup API, so newly published App Store apps can appear automatically.

To add a new app:

1. Add one item to the `apps` array in `site-config.json`
2. Fill in `name`, `summary`, `description`, `links`, `pages`, and optional `iconSrc` / `images`
3. If you have screenshots, put them in the repo and reference them with relative paths in `images`

For local `file://` preview, `site-config.js` is loaded before `site.js`. Keep it in sync with `site-config.json`.

After GitHub Pages is enabled for this repository, the We pages should be available at:

```text
https://linshaolie.github.io/privacy-policy/
https://linshaolie.github.io/privacy-policy/We/
https://linshaolie.github.io/privacy-policy/We/support/
https://linshaolie.github.io/privacy-policy/We/marketing/
```

TimeCue pages should be available at:

```text
https://linshaolie.github.io/privacy-policy/TimeCue/privacy-policy.html
https://linshaolie.github.io/privacy-policy/TimeCue/support.html
https://linshaolie.github.io/privacy-policy/TimeCue/marketing.html
```

Declutter pages should be available at:

```text
https://linshaolie.github.io/privacy-policy/Declutter/privacy-policy.html
https://linshaolie.github.io/privacy-policy/Declutter/support.html
https://linshaolie.github.io/privacy-policy/Declutter/marketing.html
```

iOS download:

```text
https://apps.apple.com/us/app/%E6%88%91%E4%BB%AC-we-connection/id6770479789
https://apps.apple.com/us/app/%E5%88%B0%E7%82%B9%E4%BA%86-timecue/id6770298013
```

GitHub Pages setup:

```text
Settings -> Pages -> Build and deployment
Source: Deploy from a branch
Branch: master
Folder: / (root)
```
