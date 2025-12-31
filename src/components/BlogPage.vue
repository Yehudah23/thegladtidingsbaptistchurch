<template>
  <div class="blog-page">
    <!-- Hero Section -->
    <section class="blog-hero">
      <div class="hero-content">
        <h1>Church Blog & Publications</h1>
        <p>Stay updated with our latest magazines, articles, and announcements</p>
      </div>
    </section>

    <!-- Filter and Search Section -->
    <section class="blog-controls">
      <div class="container">
        <div class="controls-wrapper">
          <!-- Category Filter -->
          <div class="category-filter">
            <button 
              v-for="category in categories" 
              :key="category.id"
              :class="['category-btn', { active: selectedCategory === category.id }]"
              @click="selectedCategory = category.id"
            >
              {{ category.name }}
            </button>
          </div>

          <!-- Search Bar -->
          <div class="search-bar">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search posts..."
              class="search-input"
            />
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="blog-posts">
      <div class="container">
        <div v-if="filteredPosts.length === 0" class="no-posts">
          <p>No posts found. Check back soon!</p>
        </div>
        
        <div v-else class="posts-grid">
          <article 
            v-for="post in paginatedPosts" 
            :key="post.id"
            class="post-card"
            @click="goToPost(post.id)"
          >
            <div class="post-image">
              <img :src="post.image" :alt="post.title" />
              <span class="post-category-badge">{{ getCategoryName(post.category) }}</span>
            </div>
            <div class="post-content">
              <div class="post-meta">
                <span class="post-date">{{ formatDate(post.date) }}</span>
                <span class="post-author">{{ post.author }}</span>
              </div>
              <h2 class="post-title">{{ post.title }}</h2>
              <p class="post-excerpt">{{ post.excerpt }}</p>
              <button class="read-more-btn">Read More →</button>
            </div>
          </article>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button 
            class="page-btn"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Previous
          </button>
          <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
          <button 
            class="page-btn"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'BlogPage',
  setup() {
    const router = useRouter();
    const searchQuery = ref('');
    const selectedCategory = ref('all');
    const currentPage = ref(1);
    const postsPerPage = 9;

    const categories = ref([
      { id: 'all', name: 'All Posts' },
      { id: 'magazine', name: 'Magazines' },
      { id: 'article', name: 'Articles' },
      { id: 'announcement', name: 'Announcements' },
      { id: 'event', name: 'Events' }
    ]);

    // Sample blog posts - Replace with your actual data or API calls
    const blogPosts = ref([
      {
        id: 1,
        title: 'January 2025 Church Magazine',
        excerpt: 'Our monthly magazine featuring testimonies, upcoming events, and spiritual insights for the new year.',
        category: 'magazine',
        author: 'Editorial Team',
        date: '2025-01-01',
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=600&fit=crop',
      },
      {
        id: 2,
        title: 'The Power of Prayer in Daily Life',
        excerpt: 'Discover how incorporating prayer into your daily routine can transform your spiritual journey and strengthen your faith.',
        category: 'article',
        author: 'Pastor Johnson',
        date: '2024-12-28',
        image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=600&fit=crop',
      },
      {
        id: 3,
        title: 'New Year Revival Service',
        excerpt: 'Join us for a special revival service as we welcome 2025 with worship, prayer, and powerful preaching.',
        category: 'announcement',
        author: 'Admin',
        date: '2024-12-30',
        image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=600&fit=crop',
      },
      {
        id: 4,
        title: 'Youth Conference 2025',
        excerpt: 'Annual youth conference featuring dynamic speakers, worship sessions, and fellowship opportunities for young believers.',
        category: 'event',
        author: 'Youth Ministry',
        date: '2024-12-25',
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
      },
      {
        id: 5,
        title: 'Understanding Biblical Grace',
        excerpt: 'An in-depth look at the concept of grace in scripture and how it applies to our modern Christian walk.',
        category: 'article',
        author: 'Pastor Williams',
        date: '2024-12-20',
        image: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=600&fit=crop',
      },
      {
        id: 6,
        title: 'December 2024 Magazine',
        excerpt: 'Year-end edition featuring testimonies, highlights from 2024, and vision for 2025.',
        category: 'magazine',
        author: 'Editorial Team',
        date: '2024-12-01',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
      },
      {
        id: 7,
        title: 'Community Outreach Program',
        excerpt: 'Join our community service initiative to bring hope and practical help to families in need.',
        category: 'announcement',
        author: 'Outreach Team',
        date: '2024-12-15',
        image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop',
      },
      {
        id: 8,
        title: 'Walking in Faith: A Study Series',
        excerpt: 'Join us for a transformative Bible study series exploring practical faith in everyday circumstances.',
        category: 'article',
        author: 'Teaching Ministry',
        date: '2024-12-10',
        image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=600&fit=crop',
      },
      {
        id: 9,
        title: 'Christmas Service Celebration',
        excerpt: 'Special Christmas service with choir performances, nativity presentation, and communion.',
        category: 'event',
        author: 'Admin',
        date: '2024-12-24',
        image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&h=600&fit=crop',
      },
    ]);

    // Computed: Filter posts by category and search query
    const filteredPosts = computed(() => {
      let posts = blogPosts.value;

      // Filter by category
      if (selectedCategory.value !== 'all') {
        posts = posts.filter(post => post.category === selectedCategory.value);
      }

      // Filter by search query
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        posts = posts.filter(post => 
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
        );
      }

      // Sort by date (newest first)
      return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    // Computed: Paginated posts
    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * postsPerPage;
      const end = start + postsPerPage;
      return filteredPosts.value.slice(start, end);
    });

    // Computed: Total pages
    const totalPages = computed(() => {
      return Math.ceil(filteredPosts.value.length / postsPerPage);
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

    const goToPost = (postId) => {
      router.push({ name: 'BlogPost', params: { id: postId } });
    };

    return {
      searchQuery,
      selectedCategory,
      currentPage,
      categories,
      filteredPosts,
      paginatedPosts,
      totalPages,
      getCategoryName,
      formatDate,
      goToPost
    };
  }
};
</script>

<style scoped>
/* Hero Section */
.blog-hero {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  padding: 6rem 2rem 4rem;
  text-align: center;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-content p {
  font-size: 1.25rem;
  opacity: 0.95;
}

/* Controls Section */
.blog-controls {
  background: #f8fafc;
  padding: 2rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.controls-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.category-filter {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.category-btn {
  padding: 0.625rem 1.5rem;
  border: 2px solid #cbd5e1;
  background: white;
  color: #475569;
  border-radius: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.category-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  transform: translateY(-2px);
}

.category-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.search-bar {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1.25rem 0.875rem 3rem;
  border: 2px solid #cbd5e1;
  border-radius: 2rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #94a3b8;
}

/* Blog Posts Section */
.blog-posts {
  padding: 4rem 0;
  background: white;
}

.no-posts {
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
  font-size: 1.125rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.post-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.post-image {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-card:hover .post-image img {
  transform: scale(1.1);
}

.post-category-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(59, 130, 246, 0.95);
  color: white;
  padding: 0.375rem 1rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.post-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #64748b;
}

.post-date,
.post-author {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.post-excerpt {
  color: #475569;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  flex: 1;
}

.read-more-btn {
  align-self: flex-start;
  padding: 0.625rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.read-more-btn:hover {
  background: #2563eb;
  transform: translateX(4px);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 3rem;
}

.page-btn {
  padding: 0.75rem 2rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-2px);
}

.page-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  opacity: 0.5;
}

.page-info {
  font-weight: 600;
  color: #475569;
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-hero {
    padding: 4rem 1.5rem 3rem;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-content p {
    font-size: 1rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .category-filter {
    justify-content: flex-start;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 0.5rem;
  }

  .pagination {
    gap: 1rem;
  }

  .page-btn {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  }

  .page-info {
    font-size: 0.875rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1025px) {
  .posts-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
