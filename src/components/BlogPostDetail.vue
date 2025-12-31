<template>
  <div class="blog-post-detail">
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Loading post...</p>
    </div>

    <div v-else-if="!post" class="error-container">
      <h2>Post Not Found</h2>
      <p>The post you're looking for doesn't exist.</p>
      <button @click="goBack" class="back-btn">← Back to Blog</button>
    </div>

    <article v-else class="post-detail">
      <!-- Featured Image -->
      <div class="featured-image">
        <img :src="post.image" :alt="post.title" />
        <div class="image-overlay">
          <span class="category-badge">{{ getCategoryName(post.category) }}</span>
        </div>
      </div>

      <!-- Post Content -->
      <div class="post-container">
        <div class="post-header">
          <button @click="goBack" class="back-btn-small">← Back to Blog</button>
          
          <h1 class="post-title">{{ post.title }}</h1>
          
          <div class="post-meta">
            <div class="meta-item">
              <svg class="meta-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{{ formatDate(post.date) }}</span>
            </div>
            <div class="meta-item">
              <svg class="meta-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>{{ post.author }}</span>
            </div>
          </div>
        </div>

        <!-- Post Body -->
        <div class="post-body">
          <div class="content-section" v-html="post.content"></div>
          
          <!-- Share Section -->
          <div class="share-section">
            <h3>Share This Post</h3>
            <div class="share-buttons">
              <button @click="shareOnFacebook" class="share-btn facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
              <button @click="shareOnTwitter" class="share-btn twitter">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </button>
              <button @click="copyLink" class="share-btn link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                {{ linkCopied ? 'Copied!' : 'Copy Link' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="post-navigation">
          <button v-if="previousPost" @click="goToPost(previousPost.id)" class="nav-btn prev">
            <span class="nav-label">← Previous</span>
            <span class="nav-title">{{ previousPost.title }}</span>
          </button>
          <button v-if="nextPost" @click="goToPost(nextPost.id)" class="nav-btn next">
            <span class="nav-label">Next →</span>
            <span class="nav-title">{{ nextPost.title }}</span>
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'BlogPostDetail',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const loading = ref(true);
    const linkCopied = ref(false);

    // Sample blog posts - should match BlogPage.vue data
    const blogPosts = ref([
      {
        id: 1,
        title: 'January 2025 Church Magazine',
        excerpt: 'Our monthly magazine featuring testimonies, upcoming events, and spiritual insights for the new year.',
        category: 'magazine',
        author: 'Editorial Team',
        date: '2025-01-01',
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1200&h=600&fit=crop',
        content: `
          <h2>Welcome to Our January 2025 Edition</h2>
          <p>As we step into the new year, we are filled with hope and anticipation for what God has in store for our church family. This month's magazine is packed with inspiring testimonies, upcoming events, and spiritual insights to help you grow in your faith journey.</p>
          
          <h3>Featured Testimony: A Year of Miracles</h3>
          <p>Sister Mary shares her incredible testimony of healing and restoration throughout 2024. Her story reminds us that God is faithful and His promises never fail.</p>
          
          <blockquote>"I never thought I would see this day, but God proved Himself faithful. Through prayer and the support of this church family, I witnessed miracle after miracle." - Sister Mary</blockquote>
          
          <h3>Upcoming Events</h3>
          <ul>
            <li>January 5: New Year Revival Service</li>
            <li>January 12: Youth Conference Kickoff</li>
            <li>January 19: Community Outreach Day</li>
            <li>January 26: Family Fellowship Night</li>
          </ul>
          
          <h3>Pastor's Message</h3>
          <p>This year, let us commit to growing deeper in our relationship with Christ. As we face new challenges and opportunities, remember that we serve a God who is able to do exceedingly abundantly above all that we ask or think.</p>
          
          <p>We encourage you to participate in our Bible study groups, attend our prayer meetings, and engage in community service. Together, we can make a difference in our community and beyond.</p>
        `
      },
      {
        id: 2,
        title: 'The Power of Prayer in Daily Life',
        excerpt: 'Discover how incorporating prayer into your daily routine can transform your spiritual journey and strengthen your faith.',
        category: 'article',
        author: 'Pastor Johnson',
        date: '2024-12-28',
        image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1200&h=600&fit=crop',
        content: `
          <h2>Understanding Prayer as Communication with God</h2>
          <p>Prayer is not just a religious ritual; it's a vital communication channel between us and our Heavenly Father. When we pray, we engage in conversation with the Creator of the universe, sharing our hearts, listening for His voice, and aligning our will with His purposes.</p>
          
          <h3>Why Daily Prayer Matters</h3>
          <p>Establishing a consistent prayer life brings numerous benefits:</p>
          <ul>
            <li><strong>Spiritual Strength:</strong> Regular prayer builds spiritual muscle, helping us stand firm in our faith.</li>
            <li><strong>Peace and Clarity:</strong> Prayer calms anxious thoughts and provides divine perspective on life's challenges.</li>
            <li><strong>Intimacy with God:</strong> Daily communication deepens our relationship with our Creator.</li>
            <li><strong>Power for Living:</strong> Prayer releases God's power to work in and through our lives.</li>
          </ul>
          
          <h3>Practical Prayer Strategies</h3>
          <p><strong>1. Start Your Day with Prayer</strong><br>
          Before checking your phone or starting work, spend time in God's presence. Even 10-15 minutes can set a positive tone for your entire day.</p>
          
          <p><strong>2. Use the ACTS Model</strong><br>
          Structure your prayers using Adoration, Confession, Thanksgiving, and Supplication to ensure balanced communication with God.</p>
          
          <p><strong>3. Pray Throughout the Day</strong><br>
          Develop the habit of conversational prayer—talking to God about everything as you go through your day.</p>
          
          <blockquote>"Prayer is not asking. Prayer is putting oneself in the hands of God, at His disposition, and listening to His voice in the depth of our hearts." - Mother Teresa</blockquote>
          
          <h3>Overcoming Prayer Challenges</h3>
          <p>Many believers struggle with maintaining consistent prayer. Here are solutions to common obstacles:</p>
          
          <p><strong>Distraction:</strong> Find a quiet place, use a prayer journal, or pray out loud to maintain focus.</p>
          
          <p><strong>Lack of Time:</strong> Start small with 5-minute prayers and gradually increase. Remember, quality matters more than quantity.</p>
          
          <p><strong>Not Knowing What to Say:</strong> Pray Scripture, use prayer guides, or simply share your honest thoughts with God.</p>
          
          <h3>The Transformative Power</h3>
          <p>When we commit to regular prayer, we don't just change circumstances—we are changed ourselves. Prayer transforms our perspective, strengthens our character, and empowers us to live victoriously.</p>
          
          <p>As you cultivate a vibrant prayer life, you'll discover that prayer is not a burden but a privilege, not a duty but a delight. It's the key to unlocking God's best for your life.</p>
        `
      },
      {
        id: 3,
        title: 'New Year Revival Service',
        excerpt: 'Join us for a special revival service as we welcome 2025 with worship, prayer, and powerful preaching.',
        category: 'announcement',
        author: 'Admin',
        date: '2024-12-30',
        image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&h=600&fit=crop',
        content: `
          <h2>New Year Revival Service - January 5, 2025</h2>
          <p>We are thrilled to invite you to our New Year Revival Service as we kick off 2025 with faith, hope, and expectation!</p>
          
          <h3>Event Details</h3>
          <p><strong>Date:</strong> Saturday, January 5, 2025<br>
          <strong>Time:</strong> 6:00 PM - 9:00 PM<br>
          <strong>Location:</strong> The Glad Tidings Baptist Church Main Sanctuary</p>
          
          <h3>What to Expect</h3>
          <ul>
            <li>Powerful worship and praise led by our choir and music ministry</li>
            <li>Anointed preaching from guest speaker, Pastor David Thompson</li>
            <li>Corporate prayer and intercession for the new year</li>
            <li>Prophetic declarations and blessings</li>
            <li>Fellowship and light refreshments after service</li>
          </ul>
          
          <h3>Special Guest Speaker</h3>
          <p>We are honored to welcome Pastor David Thompson, senior pastor of Harvest Fellowship Church and renowned revival speaker. Pastor Thompson has ministered across the nation, bringing powerful messages of hope, healing, and restoration.</p>
          
          <blockquote>"This is a year of breakthrough and new beginnings. Come expecting God to do something extraordinary in your life!" - Pastor Thompson</blockquote>
          
          <h3>Childcare Provided</h3>
          <p>We will have dedicated childcare for children ages 0-10 years old, so parents can fully engage in the service.</p>
          
          <h3>Invite Your Friends and Family</h3>
          <p>This is a perfect opportunity to invite friends, family, neighbors, and coworkers to experience the love and power of God. Let's fill the sanctuary as we celebrate what God will do in 2025!</p>
          
          <h3>Prayer Points for 2025</h3>
          <p>As we prepare for this service, please join us in praying for:</p>
          <ul>
            <li>Spiritual awakening in our church and community</li>
            <li>Breakthrough in areas where you've been believing God</li>
            <li>Divine health and protection over families</li>
            <li>Financial provision and wisdom</li>
            <li>Unity and growth in our church family</li>
          </ul>
          
          <p><strong>Don't miss this powerful night of worship, prayer, and revival!</strong></p>
          
          <p>For more information, contact the church office at (555) 123-4567 or email info@gladtidingsbaptist.org</p>
        `
      },
    ]);

    const categories = ref([
      { id: 'all', name: 'All Posts' },
      { id: 'magazine', name: 'Magazines' },
      { id: 'article', name: 'Articles' },
      { id: 'announcement', name: 'Announcements' },
      { id: 'event', name: 'Events' }
    ]);

    // Get current post
    const post = computed(() => {
      const postId = parseInt(route.params.id);
      return blogPosts.value.find(p => p.id === postId);
    });

    // Get previous and next posts
    const sortedPosts = computed(() => {
      return [...blogPosts.value].sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    const currentIndex = computed(() => {
      return sortedPosts.value.findIndex(p => p.id === post.value?.id);
    });

    const previousPost = computed(() => {
      return currentIndex.value > 0 ? sortedPosts.value[currentIndex.value - 1] : null;
    });

    const nextPost = computed(() => {
      return currentIndex.value < sortedPosts.value.length - 1 ? sortedPosts.value[currentIndex.value + 1] : null;
    });

    // Methods
    const getCategoryName = (categoryId) => {
      const category = categories.value.find(cat => cat.id === categoryId);
      return category ? category.name : categoryId;
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const goBack = () => {
      router.push({ name: 'Blog' });
    };

    const goToPost = (postId) => {
      router.push({ name: 'BlogPost', params: { id: postId } });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const shareOnFacebook = () => {
      const url = window.location.href;
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    const shareOnTwitter = () => {
      const url = window.location.href;
      const text = post.value.title;
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    };

    const copyLink = () => {
      navigator.clipboard.writeText(window.location.href);
      linkCopied.value = true;
      setTimeout(() => {
        linkCopied.value = false;
      }, 2000);
    };

    onMounted(() => {
      setTimeout(() => {
        loading.value = false;
      }, 500);
    });

    return {
      loading,
      post,
      previousPost,
      nextPost,
      linkCopied,
      getCategoryName,
      formatDate,
      goBack,
      goToPost,
      shareOnFacebook,
      shareOnTwitter,
      copyLink
    };
  }
};
</script>

<style scoped>
.blog-post-detail {
  min-height: 100vh;
  background: #f8fafc;
}

/* Loading State */
.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-container h2 {
  margin-top: 1rem;
  color: #1e293b;
}

.error-container p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

/* Featured Image */
.featured-image {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}

.category-badge {
  display: inline-block;
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Post Content */
.post-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.post-header {
  margin-bottom: 3rem;
}

.back-btn-small {
  padding: 0.5rem 1rem;
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.back-btn-small:hover {
  background: #3b82f6;
  color: white;
}

.post-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.post-meta {
  display: flex;
  gap: 2rem;
  color: #64748b;
  font-size: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-icon {
  width: 20px;
  height: 20px;
}

/* Post Body */
.post-body {
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
}

.content-section {
  color: #334155;
  line-height: 1.8;
  font-size: 1.125rem;
}

.content-section :deep(h2) {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 2.5rem 0 1.5rem;
}

.content-section :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 2rem 0 1rem;
}

.content-section :deep(p) {
  margin-bottom: 1.5rem;
}

.content-section :deep(ul),
.content-section :deep(ol) {
  margin: 1.5rem 0;
  padding-left: 2rem;
}

.content-section :deep(li) {
  margin-bottom: 0.75rem;
}

.content-section :deep(blockquote) {
  border-left: 4px solid #3b82f6;
  padding: 1.5rem 2rem;
  margin: 2rem 0;
  background: #f1f5f9;
  font-style: italic;
  color: #475569;
  border-radius: 0.5rem;
}

.content-section :deep(strong) {
  color: #1e293b;
  font-weight: 600;
}

/* Share Section */
.share-section {
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 2px solid #e2e8f0;
}

.share-section h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.share-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.share-btn svg {
  width: 20px;
  height: 20px;
}

.share-btn.facebook {
  background: #1877f2;
}

.share-btn.facebook:hover {
  background: #145dbf;
}

.share-btn.twitter {
  background: #1da1f2;
}

.share-btn.twitter:hover {
  background: #0d8bd9;
}

.share-btn.link {
  background: #64748b;
}

.share-btn.link:hover {
  background: #475569;
}

/* Post Navigation */
.post-navigation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.nav-btn:hover {
  border-color: #3b82f6;
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.nav-btn.next {
  text-align: right;
}

.nav-label {
  font-size: 0.875rem;
  color: #3b82f6;
  font-weight: 600;
  text-transform: uppercase;
}

.nav-title {
  font-size: 1.125rem;
  color: #1e293b;
  font-weight: 600;
  line-height: 1.4;
}

.back-btn {
  padding: 0.75rem 2rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #2563eb;
}

/* Responsive Design */
@media (max-width: 768px) {
  .featured-image {
    height: 300px;
  }

  .post-container {
    padding: 2rem 1rem;
  }

  .post-title {
    font-size: 2rem;
  }

  .post-meta {
    flex-direction: column;
    gap: 0.75rem;
  }

  .post-body {
    padding: 2rem 1.5rem;
  }

  .content-section {
    font-size: 1rem;
  }

  .content-section :deep(h2) {
    font-size: 1.5rem;
  }

  .content-section :deep(h3) {
    font-size: 1.25rem;
  }

  .share-buttons {
    flex-direction: column;
  }

  .share-btn {
    justify-content: center;
  }

  .post-navigation {
    grid-template-columns: 1fr;
  }

  .nav-btn.next {
    text-align: left;
  }
}
</style>
