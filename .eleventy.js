const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Read a date field as a plain UTC date so there's no timezone off-by-one.
function asDate(v) {
  if (v instanceof Date) return v;
  return new Date(v);
}

module.exports = function (eleventyConfig) {
  // Copy assets straight through to the built site.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  // ---- Display filters -------------------------------------------------
  // "06" — two-digit day of month
  eleventyConfig.addFilter("dia", (d) => {
    return String(asDate(d).getUTCDate()).padStart(2, "0");
  });
  // "Junio · 2026"
  eleventyConfig.addFilter("mesAnio", (d) => {
    const dt = asDate(d);
    return `${MESES[dt.getUTCMonth()]} · ${dt.getUTCFullYear()}`;
  });
  // "24.05.2026" — short date label for album tiles
  eleventyConfig.addFilter("fechaCorta", (d) => {
    const dt = asDate(d);
    const dd = String(dt.getUTCDate()).padStart(2, "0");
    const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
    return `${dd}.${mm}.${dt.getUTCFullYear()}`;
  });
  // Extract the YouTube video id from a full URL or a bare id.
  eleventyConfig.addFilter("ytid", (url) => {
    if (!url) return "";
    const s = String(url).trim();
    let m = s.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
    if (m) return m[1];
    if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
    return s;
  });
  // URL-encode for building WhatsApp message links.
  eleventyConfig.addFilter("urlenc", (s) => encodeURIComponent(s || ""));

  // ---- Ordered + limited collections (the rules the user asked for) ----

  // Próximas fechas: upcoming only, soonest first, max 5.
  eleventyConfig.addCollection("fechasProximas", (api) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return api
      .getFilteredByTag("fechas")
      .filter((i) => asDate(i.data.fecha) >= today)
      .sort((a, b) => asDate(a.data.fecha) - asDate(b.data.fecha))
      .slice(0, 5);
  });

  // Sets: newest first, max 3.
  eleventyConfig.addCollection("setsRecientes", (api) => {
    return api
      .getFilteredByTag("sets")
      .sort((a, b) => asDate(b.data.fecha) - asDate(a.data.fecha))
      .slice(0, 3);
  });

  // Álbumes: newest first, max 5.
  eleventyConfig.addCollection("albumesRecientes", (api) => {
    return api
      .getFilteredByTag("albumes")
      .sort((a, b) => asDate(b.data.fecha) - asDate(a.data.fecha))
      .slice(0, 5);
  });

  return {
    dir: { input: "src", output: "_site", data: "_data" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
