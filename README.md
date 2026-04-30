<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/2bfdea79-516c-4488-beb8-c24d75cfcc06

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create `.env.local` and set `BREVO_API_KEY` (and optionally `BREVO_LIST_ID`)
3. Run the app:
   `npm run dev`

## Deploy to Vercel

1. Import the repo into Vercel
2. Set environment variables in Vercel Project Settings:
   - `BREVO_API_KEY`
   - `BREVO_LIST_ID` (optional)
3. Deploy
