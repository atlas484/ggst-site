
import vue from "@vitejs/plugin-vue";
import { join, parse, resolve } from "path";

export default {
  plugins: [vue()],
  alias: {
    "~": __dirname,
  },
  build: {
    rollupOptions: {
      input: entryPoints(
        "index.html",
        "input.html",
        "stats.html",
        "rating.html",
        "calculator.html",
      ),
    },
  },
};

function entryPoints(...paths) {
  const entries = paths.map(parse).map(entry => {
    const { dir, base, name, ext } = entry;
    const key = join(dir, name);
    const path = resolve(__dirname, dir, base);
    return [key, path];
  });
  
  const config = Object.fromEntries(entries);
  console.log(config)
  return config;
}