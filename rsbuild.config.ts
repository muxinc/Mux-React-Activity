import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "Use React Activity Mux",
    favicon: "./public/favicon.ico",
    meta: [
      {
        name: "description",
        content: "Use the React Activity component with Mux",
      },
      { name: "keywords", content: "React, Activity, Mux" },
    ],
  },
});
