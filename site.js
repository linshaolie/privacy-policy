(function () {
  var jsonpCounter = 0;

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;")
      .replaceAll("'", "&#39;");
  }

  function cloneJson(data) {
    return JSON.parse(JSON.stringify(data ?? {}));
  }

  function normalizeAppStoreUrl(url) {
    if (!url) {
      return "";
    }

    return url.replace(/\?uo=4$/, "");
  }

  function slugifyTrackName(trackName, trackId) {
    const base = String(trackName || "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return base || `app-${trackId}`;
  }

  function summarizeDescription(description) {
    const raw = String(description || "").trim();
    if (!raw) {
      return "查看 App Store 了解更多。";
    }

    const firstLine = raw.split("\n").find((line) => line.trim()) || raw;
    return firstLine.length > 72 ? `${firstLine.slice(0, 72).trim()}...` : firstLine;
  }

  function trimDescription(description) {
    const compact = String(description || "").replace(/\n{2,}/g, "\n\n").trim();
    if (compact.length <= 260) {
      return compact;
    }
    return `${compact.slice(0, 260).trim()}...`;
  }

  function buildDynamicHighlights(item) {
    const highlights = [];

    if (item.primaryGenreName) {
      highlights.push(`分类：${item.primaryGenreName}`);
    }

    if (item.formattedPrice) {
      highlights.push(`价格：${item.formattedPrice}`);
    }

    if (item.minimumOsVersion) {
      highlights.push(`最低系统要求：iOS ${item.minimumOsVersion}`);
    }

    if (item.sellerName) {
      highlights.push(`开发者：${item.sellerName}`);
    }

    highlights.push("数据自动来自 Apple App Store。");
    return highlights;
  }

  function buildDynamicImages(item) {
    const urls = Array.isArray(item.screenshotUrls) ? item.screenshotUrls : [];
    return urls.slice(0, 5).map((src, index) => ({
      src,
      alt: `${item.trackName} App Store 截图 ${index + 1}`,
      caption: `App Store 截图 ${index + 1}`
    }));
  }

  function buildDynamicApp(item) {
    return {
      appStoreId: item.trackId,
      slug: slugifyTrackName(item.trackName, item.trackId),
      name: item.trackName || `App ${item.trackId}`,
      englishName: "",
      platform: item.kind === "software" || item.wrapperType === "software" ? "iOS App" : "App",
      status: "已上架",
      iconSrc: item.artworkUrl512 || item.artworkUrl100 || "",
      iconText: (item.trackName || "A").slice(0, 1),
      accent: "#8b6b43",
      accentSoft: "#efe7db",
      tagline: item.artistName || item.sellerName || "",
      summary: summarizeDescription(item.description),
      description: trimDescription(item.description),
      highlights: buildDynamicHighlights(item),
      links: [
        {
          label: "App Store",
          url: normalizeAppStoreUrl(item.trackViewUrl),
          primary: true
        }
      ],
      pages: [],
      images: buildDynamicImages(item),
      currentVersionReleaseDate: item.currentVersionReleaseDate || "",
      releaseDate: item.releaseDate || ""
    };
  }

  function mergeLinks(dynamicLinks, localLinks) {
    const merged = [];
    const seen = new Set();

    [...(localLinks || []), ...(dynamicLinks || [])].forEach((link) => {
      if (!link || !link.url) {
        return;
      }

      const key = `${link.label || ""}::${link.url}`;
      if (seen.has(key)) {
        return;
      }

      seen.add(key);
      merged.push(link);
    });

    return merged;
  }

  function mergeApp(remoteApp, localApp) {
    if (!localApp) {
      return remoteApp;
    }

    return {
      ...remoteApp,
      ...localApp,
      slug: localApp.slug || remoteApp.slug,
      name: localApp.name || remoteApp.name,
      englishName: localApp.englishName || remoteApp.englishName,
      summary: localApp.summary || remoteApp.summary,
      description: localApp.description || remoteApp.description,
      tagline: localApp.tagline || remoteApp.tagline,
      iconSrc: localApp.iconSrc || remoteApp.iconSrc,
      accent: localApp.accent || remoteApp.accent,
      accentSoft: localApp.accentSoft || remoteApp.accentSoft,
      highlights: Array.isArray(localApp.highlights) && localApp.highlights.length ? localApp.highlights : remoteApp.highlights,
      links: mergeLinks(remoteApp.links, localApp.links),
      pages: Array.isArray(localApp.pages) ? localApp.pages : remoteApp.pages,
      images: Array.isArray(localApp.images) && localApp.images.length ? localApp.images : remoteApp.images
    };
  }

  function sortApps(apps) {
    return [...apps].sort((a, b) => {
      const timeA = Date.parse(a.currentVersionReleaseDate || a.releaseDate || 0) || 0;
      const timeB = Date.parse(b.currentVersionReleaseDate || b.releaseDate || 0) || 0;

      if (timeA !== timeB) {
        return timeB - timeA;
      }

      return String(a.name || "").localeCompare(String(b.name || ""), "zh-Hans-CN");
    });
  }

  function fetchJsonp(url) {
    return new Promise((resolve, reject) => {
      const callbackName = `__appSiteJsonp${jsonpCounter += 1}`;
      const script = document.createElement("script");
      const cleanup = () => {
        delete window[callbackName];
        script.remove();
      };

      window[callbackName] = (payload) => {
        cleanup();
        resolve(payload);
      };

      script.onerror = () => {
        cleanup();
        reject(new Error("动态读取 App Store 数据失败。"));
      };

      script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${callbackName}`;
      document.head.appendChild(script);
    });
  }

  async function fetchAppleDeveloperApps(source) {
    const developerId = source?.developerId;
    if (!developerId) {
      return [];
    }

    const country = source.country || "cn";
    const entity = source.entity || "software";
    const payload = await fetchJsonp(`https://itunes.apple.com/lookup?id=${encodeURIComponent(developerId)}&entity=${encodeURIComponent(entity)}&country=${encodeURIComponent(country)}&limit=200`);
    const results = Array.isArray(payload?.results) ? payload.results : [];

    return results
      .filter((item) => item.wrapperType === "software" && String(item.artistId) === String(developerId))
      .map(buildDynamicApp);
  }

  async function hydrateConfig(rawConfig) {
    const config = cloneJson(rawConfig);
    const localApps = Array.isArray(config.apps) ? config.apps : [];
    const dynamicSource = config.dynamicAppSource;

    if (!dynamicSource || dynamicSource.provider !== "apple-lookup") {
      return config;
    }

    try {
      const remoteApps = sortApps(await fetchAppleDeveloperApps(dynamicSource));
      const localByStoreId = new Map(localApps.filter((app) => app.appStoreId).map((app) => [String(app.appStoreId), app]));
      const localBySlug = new Map(localApps.filter((app) => app.slug).map((app) => [app.slug, app]));
      const mergedApps = remoteApps.map((remoteApp) => {
        const localApp = localByStoreId.get(String(remoteApp.appStoreId)) || localBySlug.get(remoteApp.slug) || null;
        return mergeApp(remoteApp, localApp);
      });

      const localOnlyApps = localApps.filter((localApp) => {
        if (localApp.appStoreId) {
          return !remoteApps.some((remoteApp) => String(remoteApp.appStoreId) === String(localApp.appStoreId));
        }

        return !remoteApps.some((remoteApp) => remoteApp.slug === localApp.slug);
      });

      config.apps = [...mergedApps, ...localOnlyApps];
      return config;
    } catch (error) {
      console.warn(error);
      config.apps = localApps;
      return config;
    }
  }

  async function loadConfig(path) {
    if (window.__SITE_CONFIG__) {
      return hydrateConfig(window.__SITE_CONFIG__);
    }

    try {
      const response = await fetch(path, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`读取配置失败: HTTP ${response.status}`);
      }
      return hydrateConfig(await response.json());
    } catch (error) {
      if (window.location.protocol === "file:") {
        throw new Error("当前是 file:// 直接打开，浏览器会拦截 JSON 读取。请通过本地静态服务或 GitHub Pages 访问。");
      }
      throw error;
    }
  }

  function getDetailUrl(app) {
    return `./app.html?slug=${encodeURIComponent(app.slug)}`;
  }

  function renderIcon(app) {
    if (app.iconSrc) {
      return `<img src="${escapeHtml(app.iconSrc)}" alt="${escapeHtml(app.name)} icon">`;
    }
    return `<span class="icon-fallback" style="background:${escapeHtml(app.accent || "#9e6c34")};">${escapeHtml(app.iconText || app.name?.slice(0, 1) || "A")}</span>`;
  }

  function renderAppListItem(app) {
    return `
      <a class="app-row" href="${escapeHtml(getDetailUrl(app))}">
        <span class="app-icon" style="--accent-soft:${escapeHtml(app.accentSoft || "#efe7db")};">
          ${renderIcon(app)}
        </span>
        <span class="app-copy">
          <strong class="app-name">${escapeHtml(app.name)}${app.englishName ? ` / ${escapeHtml(app.englishName)}` : ""}</strong>
          <span class="app-summary">${escapeHtml(app.summary || "")}</span>
        </span>
        <span class="app-meta">
          ${app.status ? `<span>${escapeHtml(app.status)}</span>` : ""}
          <span class="chevron">&rsaquo;</span>
        </span>
      </a>
    `;
  }

  function findAppFromLocation(apps, locationObject) {
    const params = new URLSearchParams(locationObject.search || "");
    const slug = params.get("slug");
    return apps.find((app) => app.slug === slug) || null;
  }

  window.appSite = {
    escapeHtml,
    loadConfig,
    getDetailUrl,
    renderIcon,
    renderAppListItem,
    findAppFromLocation
  };
})();
