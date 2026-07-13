# pixa-search

Search engine for free images and videos powered by the [Pixabay API](https://pixabay.com/api/docs/).

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file (copy from `.env.example`) and add your Pixabay API key:

   ```bash
   PIXABAY_API_KEY=your_api_key_here
   ```

   Get a free key at <https://pixabay.com/api/docs/>. The key is read on the
   server (via the `/api/pixabay` route), so it is never exposed to the browser.

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Open <http://localhost:3000>.

## Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start the development server         |
| `npm run build`  | Production build                     |
| `npm run start`  | Serve the production build           |
| `npm run lint`   | Run ESLint                           |
| `npm run format` | Format the codebase with Prettier    |
