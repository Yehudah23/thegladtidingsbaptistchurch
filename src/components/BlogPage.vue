<template>
  <div class="blog-page">
    
    <section class="blog-hero">
      <div class="hero-content">
        <h1>Church Blog & Publications</h1>
        <p>Stay updated with our latest magazines, articles, and announcements</p>
      </div>
    </section>

    
    <section class="blog-controls">
      <div class="container">
        <div class="controls-wrapper">
        
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

   
    <section class="blog-posts">
      <div class="container">
        <div v-if="loading" class="no-posts">
          <p>⏳ Loading blog posts...</p>
        </div>
        
        <div v-else-if="filteredPosts.length === 0" class="no-posts">
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { API_ENDPOINTS } from '../api/config';

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

    const loading = ref(true);
    const blogPosts = ref([]);

    // Load blog posts from API
    const loadBlogPosts = async () => {
      try {
        loading.value = true;
        const response = await axios.get(API_ENDPOINTS.BLOGS, {
          params: {
            per_page: 100 // Load all blog posts
          }
        });
        
        // Handle paginated response
        if (response.data && response.data.data) {
          blogPosts.value = response.data.data.map(post => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            category: post.category,
            author: post.author,
            date: post.date,
            image: post.image,
            content: post.content
          }));
        } else if (Array.isArray(response.data)) {
          blogPosts.value = response.data.map(post => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            category: post.category,
            author: post.author,
            date: post.date,
            image: post.image,
            content: post.content
          }));
        }
        loading.value = false;
      } catch (error) {
        console.error('Error loading blog posts:', error);
        loading.value = false;
        // Keep empty array if there's an error
      }
    };

    // Load blog posts when component mounts
    onMounted(() => {
      loadBlogPosts();
    });

    
    const filteredPosts = computed(() => {
      let posts = blogPosts.value;

   
      if (selectedCategory.value !== 'all') {
        posts = posts.filter(post => post.category === selectedCategory.value);
      }

    
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        posts = posts.filter(post => 
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
        );
      }

    
      return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    });

   
    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * postsPerPage;
      const end = start + postsPerPage;
      return filteredPosts.value.slice(start, end);
    });

   
    const totalPages = computed(() => {
      return Math.ceil(filteredPosts.value.length / postsPerPage);
    });

   
    const getCategoryName = (categoryId) => {
      const category = categories.value.find(cat => cat.id === categoryId);
      return category ? category.name : categoryId;
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-NG', options);
    };

    const goToPost = (postId) => {
      router.push({ name: 'BlogPost', params: { id: postId } });
    };

    return {
      loading,
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
