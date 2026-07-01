# UI fix notes

Patched before commit:

- Corrected rollup_commitment display from `73,527,046,929,178` to the proven public input value `4,799,043,355,065,008` (`0x110cb45a70bab0`).
- Switched Vite `base` to `./` and patched built HTML asset paths to relative paths, so the static UI works from GitHub Pages subdirectories, Netlify, Vercel, or local static servers.
