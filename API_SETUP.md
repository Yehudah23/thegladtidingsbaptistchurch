# Social Media API Setup Instructions

This guide will help you set up the YouTube and Facebook APIs to fetch live comments for your church website.

## YouTube API Setup

### Step 1: Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key
5. Add the API key to `TheLivestream.vue`:
   ```javascript
   const YOUTUBE_API_KEY = 'YOUR_API_KEY_HERE';
   ```

### Step 2: Get YouTube Channel ID

Your channel ID is already configured: `UCsLZf3OqcArWB3YkVWAT1-w`

If you need to verify or change it:
1. Go to your YouTube channel
2. Click on your profile picture > "Settings"
3. Click "Advanced settings"
4. Copy your Channel ID

---

## Facebook API Setup

### Step 1: Get Facebook Page ID

1. Go to your Facebook Page
2. Click "About" on the left sidebar
3. Scroll down to find "Page ID" or look in the URL
4. Add it to `TheLivestream.vue`:
   ```javascript
   const FACEBOOK_PAGE_ID = 'YOUR_PAGE_ID_HERE';
   ```

### Step 2: Get Facebook Access Token

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create an app or use an existing one
3. Go to "Tools" > "Graph API Explorer"
4. Select your app
5. Click "Generate Access Token"
6. Grant permissions:
   - `pages_read_engagement`
   - `pages_show_list`
7. Get a long-lived token (recommended):
   - Use the [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)
   - Click "Extend Access Token"
8. Add the token to `TheLivestream.vue`:
   ```javascript
   const FACEBOOK_ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN_HERE';
   ```

---

## Security Best Practices

⚠️ **IMPORTANT**: Never commit API keys to public repositories!

### Recommended Approach: Use Environment Variables

1. Create a `.env` file in your project root:
   ```
   VUE_APP_YOUTUBE_API_KEY=your_youtube_key_here
   VUE_APP_FACEBOOK_PAGE_ID=your_page_id_here
   VUE_APP_FACEBOOK_ACCESS_TOKEN=your_facebook_token_here
   ```

2. Add `.env` to your `.gitignore` file

3. Update `TheLivestream.vue` to use environment variables:
   ```javascript
   const YOUTUBE_API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY || '';
   const FACEBOOK_PAGE_ID = process.env.VUE_APP_FACEBOOK_PAGE_ID || '';
   const FACEBOOK_ACCESS_TOKEN = process.env.VUE_APP_FACEBOOK_ACCESS_TOKEN || '';
   ```

---

## Testing

After setting up your API keys:

1. Restart your development server
2. Visit the Live Stream page
3. Check the browser console for any errors
4. Comments should load within 5 seconds
5. Comments will refresh automatically every 5 minutes

---

## Troubleshooting

### No comments showing?

- Check if you have recent comments on your YouTube videos or Facebook posts
- Verify your API keys are correct
- Check browser console for error messages
- Ensure your Facebook page and YouTube channel are public

### Rate Limits

- YouTube: 10,000 units per day (fetching comments uses ~1-5 units)
- Facebook: Varies by app tier

### CORS Errors

If you get CORS errors, you may need to:
1. Use a backend proxy server
2. Or deploy your app (CORS doesn't affect production)

---

## Need Help?

- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- [Facebook Graph API Documentation](https://developers.facebook.com/docs/graph-api)

---

## Current Configuration

The testimonial section will:
- ✅ Show sample comments if APIs are not configured
- ✅ Fetch YouTube comments from latest video
- ✅ Fetch Facebook comments from latest posts
- ✅ Display up to 6 recent comments
- ✅ Auto-refresh every 5 minutes
- ✅ Show platform badges (YouTube/Facebook)
- ✅ Gracefully handle errors
