import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl:
      // process.env.REACT_APP_ENV === "prod"
      //   ? "https://main.dcfoxoxqw27pv.amplifyapp.com/"
      //   :
      "http://localhost:3000",
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
