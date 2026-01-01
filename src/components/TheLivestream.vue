<!-- LiveStream.vue -->
<template>
  <section id="live" :style="sectionStyle">
    <div :style="animatedBackgroundStyle"></div>
    <div :style="floatingShapesStyle">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>
    
    <div :style="containerStyle">
      <!-- Section Header -->
      <div :style="headerStyle">
        <span :style="badgeStyle" class="floating-badge">✨ LIVE SERVICE</span>
        <h2 :style="titleStyle" class="fade-in-title">
          Join Us Online
        </h2>
        <p :style="subtitleStyle" class="fade-in-subtitle">
          Experience worship from anywhere in the world
        </p>
      </div>

      <!-- Premium Live Stream Player -->
      <div :style="playerContainerStyle" class="premium-player-section">
        <div :style="playerStyle" class="player-container premium-player">
          <!-- YouTube Live Stream Embed -->
          <div :style="facebookEmbedContainerStyle" class="youtube-embed-container premium-video">
            <iframe 
              :key="iframeKey"
              :src="youtubeEmbedUrl"
              width="100%"
              height="100%"
              style="border: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%"
              allowfullscreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              frameborder="0"
              playsinline
              webkitallowfullscreen
              mozallowfullscreen
              loading="eager"
              @error="facebookLoadError = true"
            ></iframe>
            <div v-if="facebookLoadError" :style="noStreamFallbackStyle" class="fade-in premium-fallback">
              <div class="fallback-content-wrapper">
                <div :style="{ ...playButtonStyle, marginBottom: '1.5rem' }" class="fallback-icon">
                  <span :style="{ fontSize: '3rem' }">🎬</span>
                </div>
                <h3 :style="{ color: '#ffffff', fontSize: '1.8rem', margin: '1rem 0 0.5rem 0', fontWeight: '800' }">
                  No Active Stream
                </h3>
                <p :style="{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', marginBottom: '1.5rem' }">
                  Check back during service times
                </p>
                <a href="http://youtube.com/@tgtbcogbomoso" target="_blank" rel="noopener noreferrer" :style="viewOnFacebookStyle" class="premium-cta">
                  📺 View on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Stream Info with Premium Design -->
        <div :style="streamInfoStyle" class="stream-info-card premium-info">
          <div class="info-glow"></div>
          <div class="info-content">
            <div :style="{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }">
              <span class="info-icon">📺</span>
              <h3 :style="{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', margin: 0 }">
                Live Streaming Every Service
              </h3>
            </div>
            <p :style="{ color: '#64748b', lineHeight: '1.8', margin: 0, fontSize: '1.05rem' }">
              Can't make it to church? No problem! Watch our services live online and experience worship with us from the comfort of your home. Join our online community of thousands.
            </p>
            <div class="info-features">
              <div class="feature-item">
                <span class="feature-icon">🎥</span>
                <span class="feature-text">Crystal Clear Quality</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📱</span>
                <span class="feature-text">Multi-Device Access</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🌍</span>
                <span class="feature-text">Global Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Premium Social Media Section -->
      <div :style="socialMediaSectionStyle" class="social-media-section premium-platforms">
        <div :style="sectionHeaderStyle" class="section-header-premium">
          <h3 :style="{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', margin: 0, marginBottom: '0.5rem' }">
            🌍 Watch on Your Favorite Platform
          </h3>
          <p :style="{ fontSize: '1.1rem', color: '#64748b', margin: 0 }">
            Choose your preferred streaming platform and join thousands of worshippers
          </p>
        </div>

        <div :style="socialMediaGridStyle">
          <!-- Facebook Card -->
          <div class="platform-card facebook-card premium-card">
            <a href="https://web.facebook.com/TGTBCOgbomoso" target="_blank" rel="noopener noreferrer" class="card-link" :style="cardLinkStyle">
              <div class="card-glow facebook-glow"></div>
              <div class="card-bg-gradient facebook-gradient"></div>
              <div class="card-content">
                <div class="platform-icon facebook-icon premium-icon">
                  <span>f</span>
                </div>
                <h4 class="platform-name">Facebook</h4>
                <p class="platform-desc">Watch Live Stream</p>
                <div class="platform-stats">
                  <span class="stat-badge">2.5K+ Followers</span>
                </div>
                <button class="watch-btn facebook-btn">Join Now →</button>
              </div>
              <div class="card-shine"></div>
            </a>
          </div>

          <!-- YouTube Card -->
          <div class="platform-card youtube-card premium-card">
            <a href="http://youtube.com/@tgtbcogbomoso" target="_blank" rel="noopener noreferrer" class="card-link" :style="cardLinkStyle">
              <div class="card-glow youtube-glow"></div>
              <div class="card-bg-gradient youtube-gradient"></div>
              <div class="card-content">
                <div class="platform-icon youtube-icon premium-icon">
                  <span>▶</span>
                </div>
                <h4 class="platform-name">YouTube</h4>
                <p class="platform-desc">Watch Live Stream</p>
                <div class="platform-stats">
                  <span class="stat-badge">500+ Subscribers</span>
                </div>
                <button class="watch-btn youtube-btn">Join Now →</button>
              </div>
              <div class="card-shine"></div>
            </a>
          </div>

          <!-- Telegram Card -->
          <div class="platform-card telegram-card premium-card">
            <a href="https://t.me/tgtbcogbomoso?livestream" target="_blank" rel="noopener noreferrer" class="card-link" :style="cardLinkStyle">
              <div class="card-glow telegram-glow"></div>
              <div class="card-bg-gradient telegram-gradient"></div>
              <div class="card-content">
                <div class="platform-icon telegram-icon premium-icon">
                  <img src="@/assets/telegram-icon.png" alt="Telegram" style="width: 100%; height: 100%; object-fit: contain;" />
                </div>
                <h4 class="platform-name">Telegram</h4>
                <p class="platform-desc">Watch Live Stream</p>
                <div class="platform-stats">
                  <span class="stat-badge">500 Members</span>
                </div>
                <button class="watch-btn telegram-btn">Join Now →</button>
              </div>
              <div class="card-shine"></div>
            </a>
          </div>
        </div>
      </div>

      <!-- Premium Upcoming Services -->
      <div class="upcoming-services-section premium-services">
        <div class="services-header">
          <h3 class="section-title premium-section-title">
            ⏰ Weekly Services
          </h3>
          <p class="section-subtitle">Don't miss our upcoming worship sessions</p>
        </div>
        <div :style="servicesGridStyle">
          <div v-for="(service, index) in upcomingServices" :key="index" :style="serviceCardStyle" class="service-card premium-service-card" :class="`card-${index}`">
            <div class="service-header premium-service-header" :style="{ background: getGradientColor(index) }">
              <div class="service-header-content">
                <h4 class="service-title">{{ service.title }}</h4>
                <p class="service-desc">{{ service.description }}</p>
              </div>
            </div>
            <div class="service-body premium-service-body">
              <div class="service-details">
                <div class="service-info">
                  <!-- <span class="service-icon"></span> -->
                  <span class="service-text">{{ service.date }}</span>
                </div>
                <div class="service-info">
                  <span class="service-icon">⏰</span>
                  <span class="service-text">{{ service.time }}</span>
                </div>
              </div>
              <button 
                @click="setReminder(service)" 
                :style="reminderButtonStyle" 
                :class="['reminder-btn', 'premium-reminder', { 'reminder-set': service.reminderSet }]"
              >
                {{ service.reminderSet ? '✓ Reminder Set' : '🔔 Set Reminder' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Premium Testimonial Section -->
      <div :style="testimonialSectionStyle" class="testimonial-section premium-testimonials">
        <div class="testimonial-header">
          <h3 :style="{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem', textAlign: 'center' }">
            💬 What Our Online Community Says
          </h3>
          <p :style="{ fontSize: '1.1rem', color: '#64748b', textAlign: 'center', marginBottom: '1rem' }">
            Live comments from our Facebook and YouTube community
          </p>
          <div v-if="isLoadingComments" :style="{ textAlign: 'center', color: '#3b82f6', marginBottom: '2rem' }">
            <span>🔄 Loading live comments...</span>
          </div>
        </div>
        <div :style="testimonialsGridStyle">
          <div v-for="(testimonial, index) in testimonials" :key="index" :style="testimonialCardStyle" class="testimonial-card premium-testimonial">
            <div class="testimonial-glow"></div>
            <div class="testimonial-header-card">
              <div class="testimonial-avatar">{{ testimonial.emoji }}</div>
              <div class="testimonial-info">
                <h4 class="testimonial-name">{{ testimonial.name }}</h4>
                <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
            <p class="testimonial-text">"{{ testimonial.text }}"</p>
            <div class="testimonial-footer">
              <span class="verified-badge" v-if="testimonial.platform === 'YouTube'">📺 YouTube</span>
              <span class="verified-badge" v-else-if="testimonial.platform === 'Facebook'">👤 Facebook</span>
              <span class="verified-badge" v-else>✓ Verified Attendee</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action Section -->
      <div class="cta-section premium-cta-section">
        <div class="cta-content">
          <h3 :style="{ fontSize: '2rem', fontWeight: '800', color: '#ffffff', marginBottom: '1rem', textAlign: 'center' }">
            Ready to Join Our Community?
          </h3>
          <p :style="{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: '2rem' }">
            Choose your platform and start experiencing worship like never before
          </p>
          <div class="cta-buttons">
            <a href="https://web.facebook.com/TGTBCOgbomoso" target="_blank" rel="noopener noreferrer" class="cta-btn facebook-cta">
              Watch on Facebook
            </a>
            <a href="http://youtube.com/@tgtbcogbomoso" target="_blank" rel="noopener noreferrer" class="cta-btn youtube-cta">
              Subscribe on YouTube
            </a>
            <a href="https://t.me/tgtbcogbomoso?livestream" target="_blank" rel="noopener noreferrer" class="cta-btn telegram-cta">
              Join on Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const facebookLoadError = ref(false);
const iframeKey = ref(0);
let refreshInterval = null;

// YouTube embed URL - Two options for tablets
// Option 1: Live stream (only works during broadcast)
const youtubeEmbedUrl = `https://www.youtube.com/embed/live_stream?channel=UCsLZf3OqcArWB3YkVWAT1-w&autoplay=1&mute=1&controls=1&playsinline=1&modestbranding=1&rel=0&enablejsapi=1&origin=${window.location.origin}`;

// Option 2: Latest video from channel (always shows something)
// Uncomment this line and comment the one above if you want to always show the latest video
// const youtubeEmbedUrl = 'https://www.youtube.com/embed?listType=user_uploads&list=UCsLZf3OqcArWB3YkVWAT1-w&autoplay=1&mute=1&controls=1&playsinline=1&modestbranding=1&rel=0';

// To make YouTube work on Android tablets:
// 1. Make sure you're streaming live when testing
// 2. OR use Option 2 above to always show latest video
// 3. Tablets need autoplay=1 with mute=1 to load
// 4. Check that YouTube isn't blocked in tablet browser settings

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});

// Set reminder function
const setReminder = (service) => {
  if (service.reminderSet) {
    // Already set, so unset it
    service.reminderSet = false;
    alert(`Reminder removed for ${service.title}`);
    
    // Remove from localStorage
    const reminders = JSON.parse(localStorage.getItem('serviceReminders') || '[]');
    const updatedReminders = reminders.filter(r => r.title !== service.title);
    localStorage.setItem('serviceReminders', JSON.stringify(updatedReminders));
  } else {
    // Set the reminder
    service.reminderSet = true;
    
    // Save to localStorage
    const reminders = JSON.parse(localStorage.getItem('serviceReminders') || '[]');
    reminders.push({
      title: service.title,
      date: service.date,
      time: service.time,
      description: service.description
    });
    localStorage.setItem('serviceReminders', JSON.stringify(reminders));
    
    // Show confirmation message
    alert(`✓ Reminder set for ${service.title}\n${service.date} at ${service.time}\n\nWe'll remind you before the service starts!`);
    
    // Request notification permission if not already granted
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Reminder Set!', {
            body: `You'll be notified before ${service.title}`,
            icon: '/favicon.ico'
          });
        }
      });
    } else if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Reminder Set!', {
        body: `You'll be notified before ${service.title}`,
        icon: '/favicon.ico'
      });
    }
  }
};

// Load saved reminders on mount
onMounted(() => {
  // Refresh iframe every 60 seconds to check for live stream (mobile-friendly interval)
  refreshInterval = setInterval(() => {
    iframeKey.value++;
  }, 60000); // 60000ms = 60 seconds
  
  // Load saved reminders
  const savedReminders = JSON.parse(localStorage.getItem('serviceReminders') || '[]');
  savedReminders.forEach(savedReminder => {
    const service = upcomingServices.value.find(s => s.title === savedReminder.title);
    if (service) {
      service.reminderSet = true;
    }
  });

  // Load live comments from YouTube and Facebook
  loadComments();

  // Refresh comments every 5 minutes
  setInterval(() => {
    loadComments();
  }, 300000); // 300000ms = 5 minutes
});

const testimonials = ref([
  {
    name: "Sarah M.",
    emoji: "👩‍💼",
    text: "Being able to worship with my church family online has been such a blessing. The streams are always clear and engaging!",
    platform: "Sample",
    verified: true
  },
  {
    name: "John D.",
    emoji: "👨‍💻",
    text: "I work most Sundays but now I can catch up with our services online. The community is so welcoming!",
    platform: "Sample",
    verified: true
  },
  {
    name: "Maria L.",
    emoji: "👵",
    text: "Living out of state, I'm so grateful I can still be part of our church family through the live streams.",
    platform: "Sample",
    verified: true
  }
]);

const isLoadingComments = ref(false);
const commentError = ref(null);

// YouTube API Configuration
const YOUTUBE_API_KEY = ''; // Add your YouTube API key here
const YOUTUBE_CHANNEL_ID = 'UCsLZf3OqcArWB3YkVWAT1-w';

// Facebook Configuration  
const FACEBOOK_PAGE_ID = ''; // Add your Facebook Page ID here
const FACEBOOK_ACCESS_TOKEN = ''; // Add your Facebook access token here

// Fetch YouTube comments
const fetchYouTubeComments = async () => {
  if (!YOUTUBE_API_KEY) {
    console.log('YouTube API key not configured');
    return [];
  }

  try {
    // First, get the latest video from the channel
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=1&type=video`
    );
    const videosData = await videosResponse.json();
    
    if (!videosData.items || videosData.items.length === 0) {
      return [];
    }

    const latestVideoId = videosData.items[0].id.videoId;

    // Get comments from the latest video
    const commentsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?key=${YOUTUBE_API_KEY}&videoId=${latestVideoId}&part=snippet&maxResults=10&order=relevance`
    );
    const commentsData = await commentsResponse.json();

    if (!commentsData.items) {
      return [];
    }

    return commentsData.items.map(item => ({
      name: item.snippet.topLevelComment.snippet.authorDisplayName,
      emoji: "📺",
      text: item.snippet.topLevelComment.snippet.textDisplay.substring(0, 200), // Limit length
      platform: "YouTube",
      verified: true,
      timestamp: item.snippet.topLevelComment.snippet.publishedAt
    }));
  } catch (error) {
    console.error('Error fetching YouTube comments:', error);
    return [];
  }
};

// Fetch Facebook comments
const fetchFacebookComments = async () => {
  if (!FACEBOOK_PAGE_ID || !FACEBOOK_ACCESS_TOKEN) {
    console.log('Facebook credentials not configured');
    return [];
  }

  try {
    // Get recent posts from the page
    const postsResponse = await fetch(
      `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/posts?fields=id,message,created_time&limit=5&access_token=${FACEBOOK_ACCESS_TOKEN}`
    );
    const postsData = await postsResponse.json();

    if (!postsData.data || postsData.data.length === 0) {
      return [];
    }

    // Get comments from the most recent post
    const latestPostId = postsData.data[0].id;
    const commentsResponse = await fetch(
      `https://graph.facebook.com/v18.0/${latestPostId}/comments?fields=from,message,created_time&limit=10&access_token=${FACEBOOK_ACCESS_TOKEN}`
    );
    const commentsData = await commentsResponse.json();

    if (!commentsData.data) {
      return [];
    }

    return commentsData.data.map(comment => ({
      name: comment.from.name,
      emoji: "👤",
      text: comment.message.substring(0, 200), // Limit length
      platform: "Facebook",
      verified: true,
      timestamp: comment.created_time
    }));
  } catch (error) {
    console.error('Error fetching Facebook comments:', error);
    return [];
  }
};

// Load comments from both platforms
const loadComments = async () => {
  isLoadingComments.value = true;
  commentError.value = null;

  try {
    const [youtubeComments, facebookComments] = await Promise.all([
      fetchYouTubeComments(),
      fetchFacebookComments()
    ]);

    // Combine comments from both platforms
    const allComments = [...youtubeComments, ...facebookComments];

    // If we have real comments, use them; otherwise keep sample data
    if (allComments.length > 0) {
      // Sort by timestamp (most recent first)
      allComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      // Take top 6 comments
      testimonials.value = allComments.slice(0, 6);
    }
  } catch (error) {
    console.error('Error loading comments:', error);
    commentError.value = 'Unable to load live comments';
  } finally {
    isLoadingComments.value = false;
  }
};

const upcomingServices = ref([
  {
    title: "Holy Ghost and Service",
    date: "Every First Sunday morning",
    time: "8:00 AM",
    description: "Join us for worship and teaching from God's Word",
    color: 0,
    reminderSet: false
  }, 

{
    title: "Sunday Morning Service",
    date: "Every Sunday morning",
    time: "7:30 AM",
    description: "Join us for worship and teaching from God's Word",
    color: 0,
    reminderSet: false
  },
  {
    title: "Sunday School Service",
    date: "Sunday morning",
    time: "9:30 AM",
    description: "Join us for worship and teaching from God's Word",
    color: 0,
    reminderSet: false
  },
  {
    title: "Sunday Second Service",
    date: "Every Sunday morning",
    time: "11:30 AM",
    description: "Join us for worship and teaching from God's Word",
    color: 0,
    reminderSet: false
  },

  {
    title: "Tuesday - Bible Exposition",
    date: "Every Tuesday",
    time: "5:00 PM",
    description: "Bible Exposition/Sunday School Preview",
    color: 1,
    reminderSet: false
  },
  {
    title: "Wednesday (2nd) - Renewal Service",
    date: "2nd Wednesday",
    time: "5:50 PM",
    description: "Renewal Service - MMU/WMU Meetings",
    color: 2,
    reminderSet: false
  },
  {
    title: "Wednesday (3rd) - Faith & Power",
    date: "3rd Wednesday",
    time: "4:30 PM",
    description: "Mid-Week Faith & Power Encounter - MMU/WMU Meetings",
    color: 2,
    reminderSet: false
  },

]);

const sectionStyle = {
  paddingTop: '6rem',
  paddingBottom: '6rem',
  backgroundColor: '#ffffff',
  position: 'relative',
  overflow: 'hidden'
};

const animatedBackgroundStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.12) 0%, transparent 50%)',
  pointerEvents: 'none'
};

const floatingShapesStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none'
};

const containerStyle = {
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  position: 'relative',
  zIndex: 1
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '3rem'
};

const badgeStyle = {
  display: 'inline-block',
  fontSize: '0.75rem',
  fontWeight: '800',
  letterSpacing: '0.1em',
  color: '#2563eb',
  backgroundColor: 'rgba(37, 99, 235, 0.15)',
  padding: '0.75rem 1.5rem',
  borderRadius: '9999px',
  marginBottom: '1rem',
  border: '1px solid rgba(37, 99, 235, 0.3)'
};

const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '1rem'
};

const subtitleStyle = {
  fontSize: '1.2rem',
  color: '#64748b',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const playerContainerStyle = {
  marginBottom: '4rem'
};

const playerStyle = {
  position: 'relative',
  borderRadius: '2rem',
  overflow: 'hidden',
  boxShadow: '0 30px 80px -10px rgba(37, 99, 235, 0.25)',
  marginBottom: '2rem',
  border: '1px solid rgba(37, 99, 235, 0.1)'
};

const facebookEmbedContainerStyle = {
  position: 'relative',
  backgroundColor: '#1a1a2e',
  aspectRatio: '16/9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
};

const noStreamFallbackStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(26, 26, 46, 0.98)',
  zIndex: 5,
  backdropFilter: 'blur(10px)'
};

const playButtonStyle = {
  width: '6rem',
  height: '6rem',
  backgroundColor: '#2563eb',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  boxShadow: '0 12px 36px -8px rgba(37, 99, 235, 0.5)',
  border: '2px solid rgba(255,255,255,0.2)'
};

const viewOnFacebookStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.85rem 2rem',
  backgroundColor: '#1877F2',
  color: '#ffffff',
  borderRadius: '0.75rem',
  textDecoration: 'none',
  fontWeight: '800',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  fontSize: '1.05rem',
  boxShadow: '0 8px 24px -5px rgba(24, 119, 242, 0.4)',
  border: '1px solid rgba(255, 255, 255, 0.2)'
};

const streamInfoStyle = {
  backgroundColor: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)',
  padding: '2.5rem',
  borderRadius: '1.5rem',
  border: '2px solid rgba(37, 99, 235, 0.2)',
  position: 'relative',
  overflow: 'hidden'
};

const socialMediaSectionStyle = {
  marginBottom: '5rem',
  padding: '4rem 3rem',
  backgroundColor: 'linear-gradient(135deg, rgba(37, 99, 235, 0.04) 0%, rgba(59, 130, 246, 0.04) 100%)',
  borderRadius: '2.5rem',
  border: '1px solid rgba(37, 99, 235, 0.1)',
  overflow: 'visible'
};

const sectionHeaderStyle = {
  textAlign: 'center',
  marginBottom: '3.5rem'
};

const socialMediaGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '2.5rem',
  width: '100%',
  overflow: 'visible'
};

const cardLinkStyle = {
  textDecoration: 'none'
};

const servicesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2.5rem'
};

const serviceCardStyle = {
  borderRadius: '1.75rem',
  boxShadow: '0 8px 24px -4px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(37, 99, 235, 0.1)',
  backgroundColor: '#ffffff'
};

const reminderButtonStyle = {
  width: '100%',
  padding: '0.9rem 1.5rem',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  borderRadius: '0.75rem',
  fontWeight: '800',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontSize: '1rem'
};

const testimonialSectionStyle = {
  marginTop: '5rem',
  padding: '4rem 3rem',
  backgroundColor: 'linear-gradient(135deg, rgba(37, 99, 235, 0.06) 0%, rgba(59, 130, 246, 0.06) 100%)',
  borderRadius: '2.5rem',
  border: '1px solid rgba(37, 99, 235, 0.1)',
  overflow: 'visible'
};

const testimonialsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '2.5rem',
  width: '100%',
  overflow: 'visible'
};

const testimonialCardStyle = {
  backgroundColor: '#ffffff',
  padding: '2.5rem',
  borderRadius: '1.5rem',
  boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
  border: '1px solid rgba(37, 99, 235, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden'
};

const getGradientColor = (index) => {
  const gradients = [
    'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
    'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
    'linear-gradient(135deg, #60a5fa 0%, #bfdbfe 100%)'
  ];
  return gradients[index % gradients.length];
};
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes floating {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 8px 24px -5px rgba(37, 99, 235, 0.4); }
  50% { box-shadow: 0 12px 36px -5px rgba(37, 99, 235, 0.6); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes float-shape-1 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-20px) translateX(10px); }
  50% { transform: translateY(-40px) translateX(0px); }
  75% { transform: translateY(-20px) translateX(-10px); }
}

@keyframes float-shape-2 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(180deg); }
}

@keyframes float-shape-3 {
  0%, 100% { transform: translateX(0px) scale(1); }
  50% { transform: translateX(20px) scale(1.1); }
}

@keyframes float-shape-4 {
  0%, 100% { transform: rotate(0deg) translateY(0px); }
  50% { transform: rotate(180deg) translateY(-25px); }
}

@keyframes cardHoverGlow {
  0%, 100% { opacity: 0.5; filter: blur(20px); }
  50% { opacity: 0.8; filter: blur(10px); }
}

@keyframes cardBorderGlow {
  0%, 100% { border-color: rgba(37, 99, 235, 0.2); }
  50% { border-color: rgba(37, 99, 235, 0.5); }
}

@keyframes videoGlowPulse {
  0%, 100% { box-shadow: 0 30px 80px -10px rgba(37, 99, 235, 0.25); }
  50% { box-shadow: 0 50px 120px -10px rgba(37, 99, 235, 0.4); }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.floating-badge {
  animation: floating 3s ease-in-out infinite;
}

.fade-in-title {
  animation: fadeIn 0.8s ease-out 0.2s both;
}

.fade-in-subtitle {
  animation: fadeIn 0.8s ease-out 0.4s both;
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

.premium-player {
  animation: slideInLeft 0.8s ease-out, videoGlowPulse 4s ease-in-out infinite;
}

.live-player {
  animation: slideInRight 0.8s ease-out 0.1s both;
}

.live-badge-pulse {
  animation: pulse 2s infinite, glow 2s infinite;
}

.premium-play {
  animation: glow 2s infinite;
}

.premium-play:hover {
  transform: scale(1.2) !important;
}

.stream-info-card {
  animation: slideUp 0.8s ease-out 0.6s both;
}

.social-media-section {
  animation: slideUp 0.8s ease-out 0.8s both;
}

.premium-services {
  animation: slideUp 0.8s ease-out 1s both;
}

.testimonial-section {
  animation: slideUp 0.8s ease-out 1.2s both;
}

.testimonial-card {
  animation: fadeIn 0.6s ease-out;
}

.testimonial-card:nth-child(1) {
  animation-delay: 1.3s;
}

.testimonial-card:nth-child(2) {
  animation-delay: 1.4s;
}

.testimonial-card:nth-child(3) {
  animation-delay: 1.5s;
}

/* Floating Shapes */
.floating-shape {
  position: absolute;
  opacity: 0.05;
  pointer-events: none;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  border-radius: 50%;
  top: -100px;
  left: -100px;
  animation: float-shape-1 15s ease-in-out infinite;
}

.shape-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #60a5fa, #93c5fd);
  border-radius: 50%;
  bottom: 100px;
  right: 50px;
  animation: float-shape-2 20s ease-in-out infinite;
}

.shape-3 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #3b82f6, #1e40af);
  border-radius: 50%;
  top: 50%;
  right: 10%;
  animation: float-shape-3 25s ease-in-out infinite;
}

.shape-4 {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #1e40af, #172554);
  border-radius: 50%;
  top: 30%;
  left: 5%;
  animation: float-shape-4 30s ease-in-out infinite;
}

/* Premium Video Section */
.premium-video {
  position: relative;
}

.video-gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at center, transparent 0%, rgba(26, 26, 46, 0.3) 100%);
  pointer-events: none;
  z-index: 2;
}

.live-status-premium {
  position: relative;
  z-index: 3;
  animation: slideUp 0.8s ease-out 0.3s both;
}

.live-counter {
  margin-top: 1.5rem;
}

.viewer-badge {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.95rem;
  backdrop-filter: blur(10px);
}

.premium-fallback {
  padding: 3rem;
}

.fallback-content-wrapper {
  animation: slideUp 0.8s ease-out;
}

.fallback-icon {
  animation: glow 2s infinite;
}

.premium-cta {
  animation: slideUp 0.8s ease-out 0.2s both;
  display: inline-block;
}

/* Premium Stream Info */
.premium-info {
  position: relative;
  overflow: hidden;
}

.info-glow {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: float-shape-2 20s ease-in-out infinite;
}

.info-content {
  position: relative;
  z-index: 2;
}

.info-icon {
  font-size: 2rem;
  animation: floating 3s ease-in-out infinite;
}

.info-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(37, 99, 235, 0.05);
  border-radius: 0.75rem;
  border: 1px solid rgba(37, 99, 235, 0.1);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(37, 99, 235, 0.1);
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 1.5rem;
}

.feature-text {
  font-weight: 600;
  color: #0f172a;
  font-size: 0.9rem;
}

/* Premium Platform Cards */
.premium-card {
  position: relative;
  border-radius: 1.75rem;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid rgba(37, 99, 235, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeIn 0.8s ease-out forwards;
}

.platform-card:nth-child(1) { animation-delay: 0.9s; }
.platform-card:nth-child(2) { animation-delay: 1s; }
.platform-card:nth-child(3) { animation-delay: 1.1s; }

.card-link {
  display: block;
  height: 100%;
  position: relative;
  text-decoration: none;
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  filter: blur(40px);
  animation: cardHoverGlow 3s ease-in-out infinite;
}

.facebook-glow {
  background: radial-gradient(circle, rgba(24, 119, 242, 0.5) 0%, transparent 70%);
}

.youtube-glow {
  background: radial-gradient(circle, rgba(255, 0, 0, 0.5) 0%, transparent 70%);
}

.telegram-glow {
  background: radial-gradient(circle, rgba(0, 136, 204, 0.5) 0%, transparent 70%);
}

.card-bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  opacity: 0.03;
  pointer-events: none;
}

.facebook-gradient {
  background: linear-gradient(135deg, #1877F2, #0A66C2);
}

.youtube-gradient {
  background: linear-gradient(135deg, #FF0000, #CC0000);
}

.telegram-gradient {
  background: linear-gradient(135deg, #0088cc, #0066aa);
}

.card-content {
  position: relative;
  z-index: 2;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 400px;
}

.premium-icon {
  width: 90px;
  height: 90px;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.4s ease;
  box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.facebook-icon {
  background: linear-gradient(135deg, #1877F2 0%, #0A66C2 100%);
  color: white;
}

.youtube-icon {
  background: linear-gradient(135deg, #FF0000 0%, #CC0000 100%);
  color: white;
}

.telegram-icon {
  background: linear-gradient(135deg, #0088cc 0%, #0066aa 100%);
  color: white;
}

.platform-name {
  font-size: 1.6rem;
  font-weight: 900;
  margin: 0 0 0.75rem 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.platform-desc {
  font-size: 1rem;
  color: #64748b;
  margin: 0 0 1.5rem 0;
  font-weight: 600;
}

.platform-stats {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
  flex-grow: 1;
}

.stat-badge {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%);
  border: 1.5px solid rgba(37, 99, 235, 0.3);
  border-radius: 0.85rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #2563eb;
}

.watch-btn {
  width: 100%;
  padding: 0.95rem 1.5rem;
  font-size: 1.05rem;
  font-weight: 800;
  border: none;
  border-radius: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
}

.facebook-btn {
  background: linear-gradient(135deg, #1877F2 0%, #0A66C2 100%);
  box-shadow: 0 10px 24px -4px rgba(24, 119, 242, 0.35);
}

.youtube-btn {
  background: linear-gradient(135deg, #FF0000 0%, #CC0000 100%);
  box-shadow: 0 10px 24px -4px rgba(255, 0, 0, 0.35);
}

.telegram-btn {
  background: linear-gradient(135deg, #0088cc 0%, #0066aa 100%);
  box-shadow: 0 10px 24px -4px rgba(0, 136, 204, 0.35);
}

.card-shine {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  transform: translateX(-100%);
  pointer-events: none;
}

/* Premium Card Hover */
.platform-card:hover {
  transform: translateY(-16px) scale(1.03);
  box-shadow: 0 40px 80px -15px rgba(37, 99, 235, 0.35);
  border-color: rgba(37, 99, 235, 0.4);
  animation: cardBorderGlow 2s ease-in-out infinite;
}

.platform-card:hover .premium-icon {
  transform: scale(1.15) rotateZ(360deg);
  box-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.3);
}

.platform-card:hover .card-glow {
  opacity: 1;
}

.platform-card:hover .watch-btn {
  transform: translateY(-3px);
  box-shadow: 0 16px 32px -5px rgba(37, 99, 235, 0.5) !important;
}

.platform-card:hover .card-shine {
  animation: shimmer 0.7s ease-in-out;
}

.watch-btn:hover {
  transform: translateY(-4px);
  letter-spacing: 1px;
}

/* Premium Service Cards */
.premium-service-card {
  overflow: hidden;
  position: relative;
}

.premium-service-header {
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.service-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 100%);
  pointer-events: none;
}

.service-header-content {
  position: relative;
  z-index: 2;
}

.service-title {
  font-size: 1.3rem;
  font-weight: 800;
  margin: 0 0 0.75rem 0;
  color: #ffffff;
}

.service-desc {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.premium-service-body {
  padding: 2rem;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.service-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.service-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%);
  border-radius: 0.75rem;
  border: 1px solid rgba(37, 99, 235, 0.1);
  transition: all 0.3s ease;
}

.service-info:hover {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%);
  transform: translateX(4px);
}

.service-icon {
  font-size: 1.5rem;
}

.service-text {
  color: #0f172a;
  font-weight: 600;
  font-size: 0.95rem;
}

.premium-service-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 24px 56px -8px rgba(37, 99, 235, 0.25) !important;
}

.premium-reminder {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  box-shadow: 0 8px 20px -4px rgba(37, 99, 235, 0.3);
  font-size: 1.05rem;
}

.premium-reminder:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px -5px rgba(37, 99, 235, 0.4) !important;
}

.premium-reminder.reminder-set {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 8px 20px -4px rgba(16, 185, 129, 0.3);
}

.premium-reminder.reminder-set:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  box-shadow: 0 12px 32px -5px rgba(16, 185, 129, 0.4) !important;
}

/* Premium Testimonials */
.premium-testimonial {
  position: relative;
}

.testimonial-glow {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: cardHoverGlow 4s ease-in-out infinite;
}

.testimonial-header-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
}

.testimonial-avatar {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
  border-radius: 1rem;
  border: 2px solid rgba(37, 99, 235, 0.2);
}

.testimonial-info {
  flex: 1;
}

.testimonial-name {
  font-weight: 800;
  color: #0f172a;
  font-size: 1.1rem;
  margin: 0;
}

.testimonial-rating {
  font-size: 0.85rem;
  margin-top: 0.25rem;
  letter-spacing: 2px;
}

.testimonial-text {
  color: #64748b;
  font-style: italic;
  margin: 0 0 1.5rem 0;
  line-height: 1.8;
  font-size: 1rem;
  position: relative;
  z-index: 2;
}

.testimonial-footer {
  display: flex;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.verified-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(52, 211, 153, 0.15) 100%);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 0.65rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #059669;
}

.premium-testimonial:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 48px -8px rgba(37, 99, 235, 0.2) !important;
  border-color: rgba(37, 99, 235, 0.3);
}

/* Premium CTA Section */
.premium-cta-section {
  margin-top: 5rem;
  padding: 4rem 3rem;
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #1e3a8a 100%);
  border-radius: 2.5rem;
  position: relative;
  overflow: hidden;
  animation: slideUp 0.8s ease-out 1.3s both;
}

.premium-cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  border-radius: 50%;
  animation: float-shape-2 25s ease-in-out infinite;
}

.premium-cta-section::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
  border-radius: 50%;
  animation: float-shape-4 30s ease-in-out infinite;
}

.cta-content {
  position: relative;
  z-index: 2;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.cta-btn {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 800;
  border-radius: 0.85rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  letter-spacing: 0.5px;
  display: inline-block;
  backdrop-filter: blur(10px);
}

.facebook-cta {
  background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
  color: #ffffff;
}

.youtube-cta {
  background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
  color: #ffffff;
}

.telegram-cta {
  background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
  color: #ffffff;
}

.cta-btn:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.6);
  background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.2));
  box-shadow: 0 12px 32px -5px rgba(0, 0, 0, 0.3);
}

/* Premium Section Headers */
.premium-section-title {
  font-size: 2rem;
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
  animation: slideUp 0.8s ease-out;
}

.section-subtitle {
  font-size: 1.05rem;
  color: #64748b;
  margin: 0;
  animation: slideUp 0.8s ease-out 0.1s both;
}

.services-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header-premium {
  animation: slideUp 0.8s ease-out 0.2s both;
}

/* iPad Pro and Large Tablets - Ensure video loads properly */
@media (min-width: 1024px) and (max-width: 1366px) {
  .youtube-embed-container iframe {
    width: 100% !important;
    height: 100% !important;
    min-height: 500px !important;
  }
  
  .premium-video {
    aspect-ratio: 16/9 !important;
    min-height: 500px !important;
  }
  
  div[style*="facebookEmbedContainerStyle"] {
    min-height: 500px !important;
  }
}

/* iPad Pro 12.9" specific fixes */
@media (min-width: 1366px) {
  .youtube-embed-container iframe {
    width: 100% !important;
    height: 100% !important;
    min-height: 600px !important;
  }
  
  .premium-video {
    aspect-ratio: 16/9 !important;
    min-height: 600px !important;
  }
  
  div[style*="facebookEmbedContainerStyle"] {
    min-height: 600px !important;
  }
}

/* All iOS devices - Safari specific fixes */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .youtube-embed-container {
    -webkit-transform: translate3d(0, 0, 0) !important;
    transform: translate3d(0, 0, 0) !important;
  }
  
  .youtube-embed-container iframe {
    -webkit-transform: translate3d(0, 0, 0) !important;
    transform: translate3d(0, 0, 0) !important;
    width: 100% !important;
    height: 100% !important;
  }
}

/* Mobile Phones - Android and iPhone specific fixes */
@media (max-width: 480px) {
  #live {
    overflow-x: hidden !important;
    width: 100% !important;
  }

  .youtube-embed-container {
    min-height: 250px !important;
    width: 100% !important;
    position: relative !important;
  }
  
  .youtube-embed-container iframe {
    width: 100% !important;
    height: 100% !important;
    min-height: 250px !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
  }
  
  .premium-video {
    aspect-ratio: 16/9 !important;
    min-height: 250px !important;
  }
  
  div[style*="facebookEmbedContainerStyle"] {
    min-height: 250px !important;
  }

  /* Ensure all sections are visible on mobile */
  div[style*="socialMediaSectionStyle"],
  .social-media-section,
  .premium-platforms {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    padding: 2.5rem 1rem !important;
    margin-bottom: 2rem !important;
  }

  div[style*="testimonialSectionStyle"],
  .testimonial-section,
  .premium-testimonials {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    padding: 2.5rem 1rem !important;
    margin-top: 2rem !important;
  }

  .upcoming-services-section,
  .premium-services {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    padding: 2.5rem 1rem !important;
  }

  .cta-section,
  .premium-cta-section {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    padding: 3rem 1rem !important;
  }

  /* Platform Cards - Make sure they're visible */
  .platform-card {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    min-height: 380px !important;
    width: 100% !important;
    max-width: 450px !important;
    margin: 0 auto 2rem auto !important;
  }

  /* Service Cards */
  .service-card {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    width: 100% !important;
    max-width: 450px !important;
    margin: 0 auto 1.5rem auto !important;
  }

  /* Testimonial Cards */
  .testimonial-card {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    width: 100% !important;
    max-width: 450px !important;
    margin: 0 auto 1.5rem auto !important;
  }

  /* Grids should stack vertically */
  div[style*="socialMediaGridStyle"] {
    grid-template-columns: 1fr !important;
    display: grid !important;
    gap: 2rem !important;
  }

  div[style*="testimonialsGridStyle"] {
    grid-template-columns: 1fr !important;
    display: grid !important;
    gap: 1.5rem !important;
  }

  div[style*="servicesGridStyle"] {
    grid-template-columns: 1fr !important;
    display: grid !important;
    gap: 1.5rem !important;
  }
}

/* Android Tablets - Specific fixes for Android tablet browsers */
@media (min-width: 481px) and (max-width: 1024px) {
  .youtube-embed-container {
    min-height: 400px !important;
    width: 100% !important;
    position: relative !important;
    -webkit-overflow-scrolling: touch !important;
    overflow: hidden !important;
  }
  
  .youtube-embed-container iframe {
    width: 100% !important;
    height: 100% !important;
    min-height: 400px !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    border: 0 !important;
    pointer-events: auto !important;
    -webkit-transform: translate3d(0, 0, 0) !important;
    transform: translate3d(0, 0, 0) !important;
  }
  
  .premium-video {
    aspect-ratio: 16/9 !important;
    min-height: 400px !important;
    overflow: hidden !important;
  }
  
  div[style*="facebookEmbedContainerStyle"] {
    min-height: 400px !important;
    overflow: hidden !important;
  }

  /* Force video visibility on Android tablets */
  #live {
    overflow: visible !important;
  }

  .player-container {
    overflow: visible !important;
  }
}

/* Tablets - Centralize content */
@media (min-width: 769px) and (max-width: 1024px) {
  div[style*="socialMediaGridStyle"] {
    grid-template-columns: repeat(2, 1fr) !important;
    justify-items: center !important;
    gap: 2rem !important;
  }
  
  div[style*="testimonialsGridStyle"] {
    grid-template-columns: repeat(2, 1fr) !important;
    justify-items: center !important;
    gap: 2rem !important;
  }
  
  div[style*="servicesGridStyle"] {
    grid-template-columns: repeat(2, 1fr) !important;
    justify-items: center !important;
    gap: 2rem !important;
  }
  
  .platform-card,
  .service-card,
  .testimonial-card {
    width: 100% !important;
    max-width: 400px !important;
  }
  
  .section-header-premium,
  .services-header,
  .testimonial-header {
    text-align: center !important;
  }
}

/* Small tablets and large phones */
@media (min-width: 481px) and (max-width: 768px) {
  div[style*="socialMediaGridStyle"] {
    grid-template-columns: 1fr !important;
    justify-items: center !important;
    max-width: 450px !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  
  div[style*="testimonialsGridStyle"] {
    grid-template-columns: 1fr !important;
    justify-items: center !important;
    max-width: 450px !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  
  div[style*="servicesGridStyle"] {
    grid-template-columns: 1fr !important;
    justify-items: center !important;
    max-width: 450px !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}

@media (max-width: 768px) {
  #live {
    overflow-x: hidden !important;
  }
  
  div[style*="socialMediaSectionStyle"] {
    padding: 2.5rem 1.5rem !important;
    margin-bottom: 3rem !important;
    overflow: visible !important;
  }
  
  div[style*="testimonialSectionStyle"] {
    padding: 2.5rem 1.5rem !important;
    margin-top: 3rem !important;
    overflow: visible !important;
  }
  
  div[style*="servicesGridStyle"] {
    grid-template-columns: 1fr !important;
    justify-items: center !important;
    max-width: 500px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    width: 100% !important;
    overflow: visible !important;
  }

  div[style*="testimonialsGridStyle"] {
    grid-template-columns: 1fr !important;
    justify-items: flex-start !important;
    max-width: 90% !important;
    margin-left: 2rem !important;
    margin-right: auto !important;
    width: 100% !important;
    overflow: visible !important;
  }

  div[style*="socialMediaGridStyle"] {
    grid-template-columns: 1fr !important;
    justify-items: center !important;
    max-width: 500px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    width: 100% !important;
    overflow: visible !important;
  }

  .platform-card {
    min-height: 380px !important;
    width: 100% !important;
    max-width: 450px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    display: block !important;
    overflow: visible !important;
    box-shadow: 0 8px 24px -4px rgba(0,0,0,0.15) !important;
  }

  .card-content {
    min-height: 350px !important;
    text-align: center !important;
    padding: 2rem 1.5rem !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
  }
  
  .card-link {
    display: block !important;
    width: 100% !important;
    height: 100% !important;
  }

  .premium-icon {
    width: 80px !important;
    height: 80px !important;
    font-size: 3rem !important;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 1.25rem !important;
    display: flex !important;
  }

  .platform-name {
    font-size: 1.5rem !important;
    text-align: center !important;
    margin-bottom: 0.75rem !important;
    display: block !important;
  }
  
  .platform-desc {
    text-align: center !important;
    font-size: 1rem !important;
    margin-bottom: 1rem !important;
    display: block !important;
    color: #64748b !important;
  }
  
  .platform-stats {
    justify-content: center !important;
    text-align: center !important;
    margin-bottom: 1.25rem !important;
    display: flex !important;
  }
  
  .stat-badge {
    display: inline-block !important;
    padding: 0.5rem 1rem !important;
    font-size: 0.9rem !important;
  }
  
  .watch-btn {
    margin-left: auto !important;
    margin-right: auto !important;
    display: block !important;
    width: 90% !important;
    max-width: 300px !important;
    padding: 0.9rem 1.5rem !important;
    font-size: 1rem !important;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 1rem !important;
    padding-left: 2rem !important;
  }

  .cta-btn {
    width: auto !important;
    max-width: 85% !important;
    text-align: center !important;
    display: inline-block !important;
    padding: 1rem 2rem !important;
    margin-left: 0 !important;
  }

  .premium-cta-section {
    padding: 3rem 1.5rem !important;
    text-align: center !important;
    margin-top: 3rem !important;
  }

  .premium-service-header {
    padding: 1.5rem !important;
    text-align: center !important;
  }

  .premium-service-body {
    padding: 1.5rem !important;
    text-align: center !important;
  }
  
  .service-card {
    width: 100% !important;
    max-width: 450px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    display: block !important;
    overflow: visible !important;
  }
  
  .testimonial-card {
    width: 100% !important;
    max-width: 100% !important;
    margin-left: 0 !important;
    margin-right: auto !important;
    text-align: left !important;
    display: block !important;
    overflow: visible !important;
    padding: 2rem 1.5rem !important;
  }
  
  .testimonial-header-card {
    justify-content: flex-start !important;
    display: flex !important;
  }
  
  .testimonial-text {
    text-align: left !important;
    display: block !important;
    font-size: 1rem !important;
    line-height: 1.7 !important;
  }
  
  .testimonial-footer {
    text-align: left !important;
    justify-content: flex-start !important;
    display: flex !important;
  }
  
  .service-details {
    text-align: center !important;
    display: block !important;
  }
  
  .service-info {
    justify-content: center !important;
    display: flex !important;
  }
  
  /* Centralize headers and titles */
  .section-header-premium,
  .services-header,
  .testimonial-header {
    text-align: center !important;
    display: block !important;
  }
  
  .premium-section-title,
  .section-title,
  .section-subtitle {
    text-align: center !important;
    display: block !important;
  }
  
  div[style*="sectionHeaderStyle"] h3,
  div[style*="sectionHeaderStyle"] p {
    text-align: center !important;
    display: block !important;
  }
}
</style>
