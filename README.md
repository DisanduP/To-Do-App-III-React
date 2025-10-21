# To Do App (simple React, no bundler)

This is a small to-do app implemented with React (UMD) and plain JS/JSX transpiled in-browser by Babel. It uses localStorage to persist todos and includes SASS source (`TODOAPP.sass`) and a compiled CSS (`TODOAPP.css`).

How to run
- Option A (quick): Open `index.html` in a browser. For best results serve it over a local static server (see Option B).
- Option B (recommended): Serve the folder with a static server (Python, Node) so the browser can load modules and assets correctly.

Examples

Python 3:
```bash
python3 -m http.server 3000
# then open http://localhost:3000
```

Node (http-server):
```bash
npm install -g http-server
http-server -c-1 . -p 3000
# then open http://localhost:3000
```

Files of interest
- `index.html` — loads React/ReactDOM from CDN and `TODOAPP.js`.
- `TODOAPP.js` — main app (JSX transpiled in browser).
- `TODOAPP.sass` — SASS source.
- `TODOAPP.css` — compiled CSS used by the app.

Notes
- This is a simple development/demo setup for convenience. For production or larger work, convert to a proper bundler setup (Create React App, Vite, etc.).
