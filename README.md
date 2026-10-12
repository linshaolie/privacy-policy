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
- WonderPlay Privacy Policy: `WonderPlay/privacy-policy.html`
- WonderPlay Support: `WonderPlay/support.html`
- OneThought Privacy Policy: `OneThought/privacy-policy.html`
- OneThought Support: `OneThought/support.html`
- OneThought Marketing: `OneThought/marketing.html`
- LovePiano Privacy Policy: `LovePiano/privacy-policy.html`
- LovePiano Support: `LovePiano/support.html`
- LovePiano Marketing: `LovePiano/marketing.html`
- Yue Crosstalk Privacy Policy: `YueYunPengPlayer/privacy-policy.html`
- Yue Crosstalk Support: `YueYunPengPlayer/support.html`
- Yue Crosstalk Marketing: `YueYunPengPlayer/marketing.html`
- Qingqu Crosstalk Privacy Policy: `MFWS/privacy-policy.html`
- Qingqu Crosstalk Support: `MFWS/support.html`
- Qingqu Crosstalk Marketing: `MFWS/marketing.html`
- Just Run Privacy Policy: `JustRun/privacy-policy.html`
- Just Run Support: `JustRun/support.html`
- Just Run Marketing: `JustRun/marketing.html`
- MiracleTask Privacy Policy: `MiracleTask/privacy-policy.html`
- MiracleTask Support: `MiracleTask/support.html`
- MiracleTask Marketing: `MiracleTask/marketing.html`

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

WonderPlay pages should be available at:

```text
https://linshaolie.github.io/privacy-policy/WonderPlay/privacy-policy.html
https://linshaolie.github.io/privacy-policy/WonderPlay/support.html
```

OneThought pages should be available at:

```text
https://linshaolie.github.io/privacy-policy/OneThought/privacy-policy.html
https://linshaolie.github.io/privacy-policy/OneThought/support.html
https://linshaolie.github.io/privacy-policy/OneThought/marketing.html
```

LovePiano pages should be available at:

```text
https://linshaolie.github.io/privacy-policy/LovePiano/privacy-policy.html
https://linshaolie.github.io/privacy-policy/LovePiano/support.html
https://linshaolie.github.io/privacy-policy/LovePiano/marketing.html
```

MiracleTask pages should be available at:

```text
https://linshaolie.github.io/privacy-policy/MiracleTask/privacy-policy.html
https://linshaolie.github.io/privacy-policy/MiracleTask/support.html
https://linshaolie.github.io/privacy-policy/MiracleTask/marketing.html
```

Just Run pages should be available at:

```text
https://linshaolie.github.io/privacy-policy/JustRun/privacy-policy.html
https://linshaolie.github.io/privacy-policy/JustRun/support.html
https://linshaolie.github.io/privacy-policy/JustRun/marketing.html
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

## MeloKit / 音乐利器（待发布）

- `MeloKit/privacy-policy.html`：中英双语隐私政策
- `MeloKit/support.html`：中英双语支持与联系方式
- `MeloKit/marketing.html`：产品介绍

目标路径：`https://linshaolie.github.io/privacy-policy/MeloKit/`。2026-09-24 已完成本地页面，尚未执行发布。

## MiracleTask（待发布）

- `MiracleTask/privacy-policy.html`：中英双语隐私政策
- `MiracleTask/support.html`：中英双语支持与常见问题
- `MiracleTask/marketing.html`：中英双语产品介绍
- `MiracleTask/assets/`：营销页用的网页尺寸图标与宣传图

页面完成于 2026-10-12，尚未发布。目标地址：

- `https://linshaolie.github.io/privacy-policy/MiracleTask/privacy-policy.html`
- `https://linshaolie.github.io/privacy-policy/MiracleTask/support.html`
- `https://linshaolie.github.io/privacy-policy/MiracleTask/marketing.html`

发布后，可将隐私政策、支持和营销地址分别填入 App Store Connect。MiracleTask 付费页的隐私政策链接已指向上面的隐私政策地址。

## Just Run（待发布）

- `JustRun/privacy-policy.html`：中英双语隐私政策
- `JustRun/support.html`：中英双语支持与常见问题
- `JustRun/marketing.html`：中英双语产品介绍
- `JustRun/assets/`：应用图标与营销图片

页面已于 2026-10-13 本地完成，尚未发布。目标地址：

- `https://linshaolie.github.io/privacy-policy/JustRun/privacy-policy.html`
- `https://linshaolie.github.io/privacy-policy/JustRun/support.html`
- `https://linshaolie.github.io/privacy-policy/JustRun/marketing.html`


## 岳云鹏相声 / Yue Crosstalk（待发布）

- `YueYunPengPlayer/privacy-policy.html`：中英双语隐私政策
- `YueYunPengPlayer/support.html`：中英双语支持与常见问题
- `YueYunPengPlayer/marketing.html`：中英双语产品介绍
- `YueYunPengPlayer/assets/`：App 图标与产品插画

目标地址：

- https://linshaolie.github.io/privacy-policy/YueYunPengPlayer/privacy-policy.html
- https://linshaolie.github.io/privacy-policy/YueYunPengPlayer/support.html
- https://linshaolie.github.io/privacy-policy/YueYunPengPlayer/marketing.html

## 青曲相声 / Qingqu Crosstalk（待发布）

- `MFWS/privacy-policy.html`：中英双语隐私政策
- `MFWS/support.html`：中英双语支持与常见问题
- `MFWS/marketing.html`：中英双语产品介绍
- `MFWS/assets/`：App 图标与产品插画

目标地址：

- https://linshaolie.github.io/privacy-policy/MFWS/privacy-policy.html
- https://linshaolie.github.io/privacy-policy/MFWS/support.html
- https://linshaolie.github.io/privacy-policy/MFWS/marketing.html

发布前请在 App Store Connect 复核两个相声 target 的产品名称与下载链接。
