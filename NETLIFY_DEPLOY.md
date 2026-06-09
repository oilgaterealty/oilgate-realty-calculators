# Netlify Deployment Guide

## Site Name
`oilgate-realty-calculators`

## Build Settings

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `20` (set in netlify.toml) |

## Deploy Steps

### Option A: Netlify CLI (Automated)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# From the project folder:
cd "C:\Users\vtae4\OneDrive\Oilgate AI\Websites\oilgate-realty-calculators"

# Deploy to production
netlify deploy --prod --dir=dist

# Or initialize a new site and deploy:
netlify init
netlify deploy --prod
```

### Option B: Netlify UI (Manual)

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub → select `oilgaterealty/oilgate-realty-calculators`
4. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy site**

### Option C: Drag & Drop

1. Run `npm run build` locally
2. Go to https://app.netlify.com/drop
3. Drag the `dist/` folder to the upload area

---

## netlify.toml (already in repo)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

The redirect rule ensures the SPA works correctly on all routes.

---

## Live URL

After deployment, update this file with the final URL:

**Production URL:** `https://oilgate-realty-calculators.netlify.app`
(or your custom domain if configured)

---

## Custom Domain (optional)

1. In Netlify: Site settings → Domain management → Add custom domain
2. Point your DNS CNAME to `[site-name].netlify.app`
3. Netlify will auto-provision SSL (Let's Encrypt)
