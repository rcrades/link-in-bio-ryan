const siteUrl =
  process.env.CONVEX_SITE_URL ?? process.env.VITE_CONVEX_SITE_URL;

export default {
  providers: [
    {
      domain: siteUrl,
      applicationID: "convex",
    },
  ],
};
