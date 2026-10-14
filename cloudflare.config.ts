import { defineConfig } from "cf/config";

export default defineConfig({
  accountId: "3c45807380bd7c62a5a73667e1ab4372",
  worker: {
    name: "jyc8369-dev-static",
    compatibilityDate: "2026-10-14",
    workersDev: true,
    domains: ["jyc8369.dev"],
    assets: {
      htmlHandling: "auto-trailing-slash",
      notFoundHandling: "404-page",
    },
    observability: {
      enabled: true,
      traces: { enabled: true, headSamplingRate: 0.01 },
    },
  },
});
