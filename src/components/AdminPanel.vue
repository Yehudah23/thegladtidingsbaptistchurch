<template>
  <section id="admin" :style="adminSectionStyle">
    <div :style="containerStyle">
      <!-- Header with Logout -->
      <div :style="headerStyle" class="admin-header-animate">
        <div>
          <h1 :style="titleStyle" class="title-animate">⚙️ Admin Dashboard</h1>
          <p :style="subtitleStyle" class="subtitle-animate">Manage your church sermons and messages</p>
        </div>
        <button @click="handleLogout" :style="logoutButtonStyle" class="logout-button">
          🚪 Logout
        </button>
      </div>

      <!-- Tab Navigation -->
      <div :style="tabNavStyle" class="tab-nav-animate">
        <button
          @click="activeTab = 'upload'"
          :style="getTabStyle('upload')"
          class="tab-button tab-upload"
        >
          📤 Upload Message
        </button>
        <button
          @click="activeTab = 'gallery'"
          :style="getTabStyle('gallery')"
          class="tab-button tab-gallery"
        >
          🎤 All Messages
        </button>
        <button
          @click="activeTab = 'blog'"
          :style="getTabStyle('blog')"
          class="tab-button tab-blog"
        >
          📝 Blog Posts
        </button>
        <button
          @click="activeTab = 'settings'"
          :style="getTabStyle('settings')"
          class="tab-button tab-settings"
        >
          ⚙️ Settings
        </button>
      </div>

      <!-- Upload Message Tab -->
      <div v-if="activeTab === 'upload'" :style="tabContentStyle" class="tab-content-animate">
        <div :style="uploadContainerStyle">
          <h3 :style="formTitleStyle">Upload New Sermon Message</h3>
          
          <!-- Sermon Form -->
          <form @submit.prevent="uploadSermon" :style="sermonFormStyle" class="sermon-form">
            <div :style="formRowStyle">
              <div :style="formGroupStyle" class="form-group form-group-1">
                <label :style="labelStyle">Message Title *</label>
                <input 
                  v-model="sermonForm.title" 
                  type="text" 
                  required 
                  :style="inputStyle"
                  placeholder="Enter sermon title"
                  class="form-input"
                />
              </div>

              <div :style="formGroupStyle" class="form-group form-group-2">
                <label :style="labelStyle">Speaker *</label>
                <input 
                  v-model="sermonForm.speaker" 
                  type="text" 
                  required 
                  :style="inputStyle"
                  placeholder="Pastor name"
                  class="form-input"
                />
              </div>
            </div>

            <div :style="formRowStyle">
              <div :style="formGroupStyle" class="form-group form-group-3">
                <label :style="labelStyle">Date *</label>
                <input 
                  v-model="sermonForm.date" 
                  type="date" 
                  required 
                  :style="inputStyle"
                  class="form-input"
                />
              </div>

              <div :style="formGroupStyle" class="form-group form-group-4">
                <label :style="labelStyle">Duration *</label>
                <input 
                  v-model="sermonForm.duration" 
                  type="text" 
                  required 
                  :style="inputStyle"
                  placeholder="e.g., 45 min"
                  class="form-input"
                />
              </div>
            </div>

            <div :style="formRowStyle">
              <div :style="formGroupStyle" class="form-group form-group-5">
                <label :style="labelStyle">Series *</label>
                <div :style="{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }">
                  <div :style="{ display: 'flex', alignItems: 'center', gap: '0.5rem' }">
                    <input 
                      type="checkbox" 
                      v-model="isNewSeries" 
                      id="newSeriesToggle"
                      :style="{ cursor: 'pointer' }"
                    />
                    <label for="newSeriesToggle" :style="{ fontSize: '0.875rem', color: '#64748b', cursor: 'pointer' }">
                      Create new series
                    </label>
                  </div>
                  <select 
                    v-if="!isNewSeries && existingSeries.length > 0"
                    v-model="sermonForm.series" 
                    required 
                    :style="inputStyle"
                    class="form-input"
                  >
                    <option value="">Select existing series</option>
                    <option v-for="series in existingSeries" :key="series" :value="series">
                      {{ series }}
                    </option>
                  </select>
                  <input 
                    v-if="isNewSeries || existingSeries.length === 0"
                    v-model="sermonForm.series" 
                    type="text" 
                    required 
                    :style="inputStyle"
                    placeholder="Enter new series name"
                    class="form-input"
                  />
                </div>
              </div>

              <div :style="formGroupStyle" class="form-group form-group-6">
                <label :style="labelStyle">Category *</label>
                <select v-model="sermonForm.category" required :style="inputStyle" class="form-input">
                  <option value="">Select category</option>
                  <option value="recent">Recent</option>
                  <option value="popular">Popular</option>
                </select>
              </div>
            </div>

            <div :style="formGroupStyle" class="form-group form-group-7">
              <label :style="labelStyle">Description *</label>
              <textarea 
                v-model="sermonForm.description" 
                required 
                :style="textareaStyle"
                placeholder="Brief description of the message"
                rows="4"
                class="form-textarea"
              ></textarea>
            </div>

            <div :style="formGroupStyle" class="form-group form-group-8">
              <label :style="labelStyle">Thumbnail Image URL (optional)</label>
              <input 
                v-model="sermonForm.thumbnail" 
                type="url" 
                :style="inputStyle"
                placeholder="https://example.com/image.jpg"
                class="form-input"
              />
            </div>

            <div :style="formGroupStyle" class="form-group form-group-9">
              <label :style="labelStyle">Audio File *</label>
              <div :style="fileUploadContainerStyle">
                <input 
                  ref="audioInput"
                  type="file" 
                  accept="audio/*" 
                  @change="handleAudioFile"
                  :style="{ display: 'none' }"
                />
                <button 
                  type="button"
                  @click="$refs.audioInput.click()" 
                  :style="browseButtonStyle"
                  class="browse-button"
                >
                  {{ sermonForm.audioFile ? '✓ Change Audio' : '🎵 Select Audio File' }}
                </button>
                <span v-if="sermonForm.audioFile" :style="fileNameDisplayStyle">
                  {{ sermonForm.audioFile.name }}
                </span>
              </div>
            </div>

            <!-- Upload Progress -->
            <div v-if="uploadProgress > 0" :style="progressContainerStyle" class="progress-animate">
              <div :style="progressLabelStyle">
                <span>Uploading: {{ uploadProgress }}%</span>
              </div>
              <div :style="progressBarContainerStyle">
                <div :style="{ ...progressBarStyle, width: uploadProgress + '%' }"></div>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :style="uploadButtonStyle"
              :disabled="isUploading"
              class="upload-button"
            >
              {{ isUploading ? 'Uploading...' : '📤 Upload Message' }}
            </button>

            <!-- Status Messages -->
            <div v-if="uploadStatus.message" :style="statusMessageStyle(uploadStatus.type)" class="status-animate">
              {{ uploadStatus.message }}
            </div>
          </form>
        </div>
      </div>

      <!-- Messages Gallery Tab -->
      <div v-if="activeTab === 'gallery'" :style="tabContentStyle" class="tab-content-animate">
        <div :style="galleryHeaderStyle">
          <h3 :style="galleryTitleStyle">All Sermon Messages</h3>
          <p :style="galleryCountStyle">{{ uploadedSermons.length }} messages</p>
        </div>

        <div v-if="uploadedSermons.length === 0" :style="emptyStateStyle" class="empty-state-animate">
          <span :style="emptyIconStyle">🎤</span>
          <p :style="emptyTextStyle">No messages uploaded yet</p>
        </div>

        <div v-else :style="sermonsGridStyle" class="sermons-grid-animate">
          <div
            v-for="(sermon, index) in uploadedSermons"
            :key="index"
            :style="sermonCardStyle"
            class="sermon-card-admin"
            :class="`sermon-card-${index}`"
          >
            <!-- Thumbnail -->
            <div :style="sermonImageContainerStyle" class="image-container-admin">
              <img :src="sermon.thumbnail" :alt="sermon.title" :style="sermonImageStyle" class="sermon-image" />
              <div :style="sermonOverlayStyle" class="overlay-admin">
                <button :style="playIconStyle" title="Play" class="play-button-admin">▶</button>
              </div>
            </div>

            <!-- Info -->
            <div :style="sermonCardContentStyle" class="sermon-card-content">
              <div :style="sermonMetaStyle">
                <span :style="seriesBadgeStyle">{{ sermon.series }}</span>
                <span :style="durationBadgeStyle">⏱ {{ sermon.duration }}</span>
              </div>
              <h4 :style="sermonCardTitleStyle">{{ sermon.title }}</h4>
              <p :style="sermonSpeakerStyle">by {{ sermon.speaker }}</p>
              <p :style="sermonDateStyle">{{ sermon.date }}</p>
              <p :style="sermonDescStyle">{{ sermon.description }}</p>

              <div :style="sermonActionsStyle" class="sermon-actions">
                <button
                  @click="editSermon(index)"
                  :style="editButtonStyle"
                  title="Edit"
                  class="edit-button"
                >
                  ✏️ Edit
                </button>
                <button
                  @click="deleteSermon(index)"
                  :style="deleteButtonStyle"
                  title="Delete"
                  class="delete-button"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Blog Posts Tab -->
      <div v-if="activeTab === 'blog'" :style="tabContentStyle" class="tab-content-animate">
        <div :style="uploadContainerStyle">
          <h3 :style="formTitleStyle">{{ editingBlogPost ? 'Edit Blog Post' : 'Create New Blog Post' }}</h3>
          
          <!-- Blog Post Form -->
          <form @submit.prevent="saveBlogPost" :style="sermonFormStyle" class="blog-form">
            <div :style="formRowStyle">
              <div :style="formGroupStyle" class="form-group">
                <label :style="labelStyle">Post Title *</label>
                <input 
                  v-model="blogForm.title" 
                  type="text" 
                  required 
                  :style="inputStyle"
                  placeholder="Enter blog post title"
                  class="form-input"
                />
              </div>
            </div>

            <div :style="formRowStyle">
              <div :style="formGroupStyle" class="form-group">
                <label :style="labelStyle">Category *</label>
                <select 
                  v-model="blogForm.category" 
                  required 
                  :style="inputStyle"
                  class="form-input"
                >
                  <option value="">Select category</option>
                  <option value="magazine">Magazines</option>
                  <option value="article">Articles</option>
                  <option value="announcement">Announcements</option>
                  <option value="event">Events</option>
                </select>
              </div>

              <div :style="formGroupStyle" class="form-group">
                <label :style="labelStyle">Author *</label>
                <input 
                  v-model="blogForm.author" 
                  type="text" 
                  required 
                  :style="inputStyle"
                  placeholder="Author name"
                  class="form-input"
                />
              </div>
            </div>

            <div :style="formRowStyle">
              <div :style="formGroupStyle" class="form-group">
                <label :style="labelStyle">Date *</label>
                <input 
                  v-model="blogForm.date" 
                  type="date" 
                  required 
                  :style="inputStyle"
                  class="form-input"
                />
              </div>

              <div :style="formGroupStyle" class="form-group">
                <label :style="labelStyle">Featured Image URL *</label>
                <input 
                  v-model="blogForm.image" 
                  type="url" 
                  required 
                  :style="inputStyle"
                  placeholder="https://example.com/image.jpg"
                  class="form-input"
                />
              </div>
            </div>

            <div :style="formGroupStyle" class="form-group">
              <label :style="labelStyle">Excerpt (Short Description) *</label>
              <textarea 
                v-model="blogForm.excerpt" 
                required 
                :style="{...inputStyle, minHeight: '80px', resize: 'vertical'}"
                placeholder="Brief description of the post (will show in the blog list)"
                class="form-input"
                rows="3"
              ></textarea>
            </div>

            <div :style="formGroupStyle" class="form-group">
              <label :style="labelStyle">Full Content (HTML supported) *</label>
              <textarea 
                v-model="blogForm.content" 
                required 
                :style="{...inputStyle, minHeight: '200px', resize: 'vertical', fontFamily: 'monospace'}"
                placeholder="Full blog post content. You can use HTML tags like <h2>, <h3>, <p>, <ul>, <li>, <blockquote>, etc."
                class="form-input"
                rows="10"
              ></textarea>
              <p :style="{fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem'}">
                💡 Tip: Use HTML for formatting (e.g., &lt;h2&gt;Heading&lt;/h2&gt;, &lt;p&gt;Paragraph&lt;/p&gt;, &lt;ul&gt;&lt;li&gt;List&lt;/li&gt;&lt;/ul&gt;)
              </p>
            </div>

            <!-- Image Preview -->
            <div v-if="blogForm.image" :style="{marginBottom: '1.5rem'}">
              <label :style="labelStyle">Image Preview</label>
              <img :src="blogForm.image" alt="Preview" :style="{maxWidth: '100%', maxHeight: '300px', borderRadius: '0.5rem', objectFit: 'cover'}" />
            </div>

            <!-- Action Buttons -->
            <div :style="{display: 'flex', gap: '1rem', flexWrap: 'wrap'}">
              <button type="submit" :style="uploadButtonStyle" class="save-blog-button">
                {{ editingBlogPost ? '💾 Update Post' : '📝 Publish Post' }}
              </button>
              <button 
                v-if="editingBlogPost" 
                type="button" 
                @click="cancelEditBlog" 
                :style="cancelButtonStyle" 
                class="cancel-blog-button"
              >
                ❌ Cancel
              </button>
            </div>
          </form>

          <!-- Success/Error Message -->
          <div v-if="blogStatus.message" :style="statusMessageStyle(blogStatus.type)" class="status-animate">
            {{ blogStatus.message }}
          </div>
        </div>

        <!-- Blog Posts List -->
        <div :style="{marginTop: '3rem'}">
          <h3 :style="{...formTitleStyle, marginBottom: '1.5rem'}">All Blog Posts ({{ blogPosts.length }})</h3>
          
          <div v-if="blogPosts.length === 0" :style="{textAlign: 'center', padding: '3rem', color: '#64748b'}">
            <p>No blog posts yet. Create your first post above!</p>
          </div>

          <div :style="sermonsGridStyle" class="blog-grid">
            <div
              v-for="(post, index) in blogPosts"
              :key="index"
              :style="sermonCardStyle"
              class="blog-card"
            >
              <div :style="sermonImageContainerStyle" class="image-container-admin">
                <img :src="post.image" :alt="post.title" :style="sermonImageStyle" class="blog-image" />
                <div :style="sermonOverlayStyle" class="overlay-admin">
                  <span :style="{padding: '0.5rem 1rem', background: '#3b82f6', borderRadius: '0.5rem', fontSize: '0.875rem'}">
                    {{ getCategoryName(post.category) }}
                  </span>
                </div>
              </div>

              <div :style="sermonCardContentStyle" class="blog-card-content">
                <div :style="sermonMetaStyle">
                  <span :style="seriesBadgeStyle">{{ post.category }}</span>
                  <span :style="durationBadgeStyle">{{ formatDate(post.date) }}</span>
                </div>
                <h4 :style="sermonCardTitleStyle">{{ post.title }}</h4>
                <p :style="sermonSpeakerStyle">by {{ post.author }}</p>
                <p :style="sermonDescStyle">{{ post.excerpt.substring(0, 100) }}...</p>

                <div :style="sermonActionsStyle" class="blog-actions">
                  <button
                    @click="editBlogPost(index)"
                    :style="editButtonStyle"
                    title="Edit"
                    class="edit-button"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    @click="deleteBlogPost(index)"
                    :style="deleteButtonStyle"
                    title="Delete"
                    class="delete-button"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div v-if="activeTab === 'settings'" :style="tabContentStyle" class="tab-content-animate">
        <div :style="settingsContainerStyle" class="settings-form-animate">
          <h3 :style="settingsTitleStyle">Admin Settings</h3>

          
          <div :style="settingItemStyle" class="setting-item setting-item-1">
            <label :style="settingLabelStyle">Maximum File Size (MB)</label>
            <input
              v-model.number="settings.maxFileSize"
              type="number"
              :style="inputStyle"
              min="1"
              max="500"
              class="form-input"
            />
            <p :style="settingHelpStyle">Current: {{ settings.maxFileSize }}MB</p>
          </div>

          <!-- Upload Directory Setting -->
          <div :style="settingItemStyle" class="setting-item setting-item-2">
            <label :style="settingLabelStyle">Upload Directory</label>
            <input
              v-model="settings.uploadDirectory"
              type="text"
              :style="inputStyle"
              placeholder="/uploads/sermons"
              class="form-input"
            />
          </div>

        
          <div :style="settingItemStyle" class="setting-item setting-item-3">
            <label :style="settingLabelStyle">API Endpoint</label>
            <input
              v-model="settings.apiEndpoint"
              type="text"
              :style="inputStyle"
              placeholder="/api/sermons"
              class="form-input"
            />
          </div>

          
          <button @click="saveSettings" :style="saveSettingsButtonStyle" class="save-settings-button">
            💾 Save Settings
          </button>

          <div v-if="settingsStatus.message" :style="statusMessageStyle(settingsStatus.type)" class="status-animate">
            {{ settingsStatus.message }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { API_ENDPOINTS } from '@/api/config';

const router = useRouter();
const activeTab = ref('upload');
const uploadedSermons = ref([]);
const isUploading = ref(false);
const uploadProgress = ref(0);
const uploadStatus = ref({ message: '', type: '' });
const settingsStatus = ref({ message: '', type: '' });
const audioInput = ref(null);

const sermonForm = ref({
  title: '',
  speaker: '',
  date: '',
  duration: '',
  series: '',
  category: '',
  description: '',
  thumbnail: '',
  audioFile: null
});

const isNewSeries = ref(false);

const existingSeries = computed(() => {
  const seriesSet = new Set();
  uploadedSermons.value.forEach(sermon => {
    if (sermon.series) {
      seriesSet.add(sermon.series);
    }
  });
  return Array.from(seriesSet).sort();
});

const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    router.push({ name: 'Home' });
  }
};

const settings = ref({
  maxFileSize: 50,
  uploadDirectory: '/uploads/sermons',
  apiEndpoint: API_ENDPOINTS.SERMON_UPLOAD
});

const handleAudioFile = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > settings.value.maxFileSize * 1024 * 1024) {
      uploadStatus.value = {
        message: `File too large. Maximum size is ${settings.value.maxFileSize}MB`,
        type: 'error'
      };
      return;
    }
    sermonForm.value.audioFile = file;
    uploadStatus.value = { message: '', type: '' };
  }
};

const uploadSermon = async () => {
  if (!sermonForm.value.audioFile) {
    uploadStatus.value = { message: 'Please select an audio file', type: 'error' };
    return;
  }

  isUploading.value = true;
  uploadProgress.value = 0;
  uploadStatus.value = { message: '', type: '' };

  try {
    const formData = new FormData();
    formData.append('title', sermonForm.value.title);
    formData.append('speaker', sermonForm.value.speaker);
    formData.append('date', sermonForm.value.date);
    formData.append('duration', sermonForm.value.duration);
    formData.append('series', sermonForm.value.series);
    formData.append('category', sermonForm.value.category);
    formData.append('description', sermonForm.value.description);
    formData.append('thumbnail', sermonForm.value.thumbnail || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400');
    formData.append('audioFile', sermonForm.value.audioFile);

    const progressInterval = setInterval(() => {
      if (uploadProgress.value < 90) {
        uploadProgress.value += 10;
      }
    }, 200);

    const response = await axios.post(settings.value.apiEndpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      }
    });

    clearInterval(progressInterval);
    uploadProgress.value = 100;

    const newSermon = {
      id: uploadedSermons.value.length + 1,
      ...sermonForm.value,
      thumbnail: sermonForm.value.thumbnail || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      audioUrl: response.data.audioUrl || `/sermons/${sermonForm.value.audioFile.name}`
    };
    
    uploadedSermons.value.unshift(newSermon);

    uploadStatus.value = {
      message: '✓ Message uploaded successfully!',
      type: 'success'
    };

    sermonForm.value = {
      title: '',
      speaker: '',
      date: '',
      duration: '',
      series: '',
      category: '',
      description: '',
      thumbnail: '',
      audioFile: null
    };

    setTimeout(() => {
      uploadProgress.value = 0;
      uploadStatus.value = { message: '', type: '' };
    }, 3000);

  } catch (error) {
    console.error('Upload error:', error);
    uploadStatus.value = {
      message: error.response?.data?.message || 'Upload failed. Please try again.',
      type: 'error'
    };
  } finally {
    isUploading.value = false;
  }
};

const editSermon = (index) => {
  const sermon = uploadedSermons.value[index];
  sermonForm.value = { ...sermon };
  activeTab.value = 'upload';
  uploadStatus.value = {
    message: 'Editing sermon. Modify and resubmit.',
    type: 'info'
  };
};

const deleteSermon = (index) => {
  if (confirm('Are you sure you want to delete this message?')) {
    uploadedSermons.value.splice(index, 1);
    uploadStatus.value = {
      message: '✓ Message deleted successfully',
      type: 'success'
    };
    setTimeout(() => {
      uploadStatus.value = { message: '', type: '' };
    }, 2000);
  }
};

const saveSettings = () => {
  settingsStatus.value = {
    message: '✓ Settings saved successfully!',
    type: 'success'
  };
  setTimeout(() => {
    settingsStatus.value = { message: '', type: '' };
  }, 2000);
};

// Blog Management
const blogPosts = ref([]);
const blogStatus = ref({ message: '', type: '' });
const editingBlogPost = ref(false);
const editingBlogIndex = ref(null);

const blogForm = ref({
  title: '',
  category: '',
  author: '',
  date: '',
  image: '',
  excerpt: '',
  content: ''
});

const getCategoryName = (categoryId) => {
  const categories = {
    'magazine': 'Magazines',
    'article': 'Articles',
    'announcement': 'Announcements',
    'event': 'Events'
  };
  return categories[categoryId] || categoryId;
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const saveBlogPost = () => {
  try {
    if (editingBlogPost.value) {
      // Update existing post
      blogPosts.value[editingBlogIndex.value] = {
        ...blogForm.value,
        id: blogPosts.value[editingBlogIndex.value].id
      };
      
      blogStatus.value = {
        message: '✓ Blog post updated successfully!',
        type: 'success'
      };
    } else {
      // Create new post
      const newPost = {
        id: blogPosts.value.length + 1,
        ...blogForm.value
      };
      
      blogPosts.value.unshift(newPost);
      
      blogStatus.value = {
        message: '✓ Blog post published successfully!',
        type: 'success'
      };
    }

    // Reset form
    blogForm.value = {
      title: '',
      category: '',
      author: '',
      date: '',
      image: '',
      excerpt: '',
      content: ''
    };
    editingBlogPost.value = false;
    editingBlogIndex.value = null;

    // Clear status after 3 seconds
    setTimeout(() => {
      blogStatus.value = { message: '', type: '' };
    }, 3000);

  } catch (error) {
    console.error('Save blog post error:', error);
    blogStatus.value = {
      message: 'Failed to save blog post. Please try again.',
      type: 'error'
    };
  }
};

const editBlogPost = (index) => {
  const post = blogPosts.value[index];
  blogForm.value = { ...post };
  editingBlogPost.value = true;
  editingBlogIndex.value = index;
  
  // Scroll to top of form
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  blogStatus.value = {
    message: 'Editing blog post. Modify and save.',
    type: 'info'
  };
};

const cancelEditBlog = () => {
  blogForm.value = {
    title: '',
    category: '',
    author: '',
    date: '',
    image: '',
    excerpt: '',
    content: ''
  };
  editingBlogPost.value = false;
  editingBlogIndex.value = null;
  blogStatus.value = { message: '', type: '' };
};

const deleteBlogPost = (index) => {
  if (confirm('Are you sure you want to delete this blog post?')) {
    blogPosts.value.splice(index, 1);
    
    blogStatus.value = {
      message: '✓ Blog post deleted successfully',
      type: 'success'
    };
    
    setTimeout(() => {
      blogStatus.value = { message: '', type: '' };
    }, 2000);
  }
};

// Load blog posts function (localStorage removed)
const loadBlogPosts = () => {
  // Blog posts should be loaded from backend API
  // Implement API call here when backend is ready
  console.log('Blog posts should be loaded from backend API');
};

// Load on component mount
loadBlogPosts();

const adminSectionStyle = {
  paddingTop: '6rem',
  paddingBottom: '6rem',
  backgroundColor: '#f8fafc',
  minHeight: '100vh'
};

const containerStyle = {
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '2rem',
  paddingRight: '2rem'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '3rem',
  flexWrap: 'wrap',
  gap: '1rem'
};

const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '0.5rem'
};

const subtitleStyle = {
  fontSize: '1.125rem',
  color: '#64748b',
  marginBottom: '1rem'
};

const logoutButtonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#ef4444',
  color: '#ffffff',
  border: 'none',
  borderRadius: '0.75rem',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
};

const tabNavStyle = {
  display: 'flex',
  gap: '1rem',
  marginBottom: '2rem',
  borderBottom: '2px solid #e2e8f0',
  flexWrap: 'wrap'
};

const getTabStyle = (tabName) => ({
  padding: '1rem 1.5rem',
  backgroundColor: activeTab.value === tabName ? '#2563eb' : 'transparent',
  color: activeTab.value === tabName ? '#ffffff' : '#64748b',
  border: 'none',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: '0.5rem 0.5rem 0 0',
  borderBottom: activeTab.value === tabName ? '3px solid #2563eb' : 'none'
});

const tabContentStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '1.5rem',
  padding: '2.5rem',
  boxShadow: '0 4px 20px -2px rgba(0,0,0,0.08)'
};

const uploadContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
};

const formTitleStyle = {
  fontSize: '1.75rem',
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '1rem'
};

const sermonFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const formRowStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem'
};

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const labelStyle = {
  fontSize: '0.95rem',
  fontWeight: '600',
  color: '#0f172a',
  display: 'block'
};

const inputStyle = {
  padding: '0.75rem 1rem',
  border: '2px solid #e2e8f0',
  borderRadius: '0.75rem',
  fontSize: '1rem',
  color: '#0f172a',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxSizing: 'border-box',
  fontFamily: 'inherit'
};

const textareaStyle = {
  padding: '0.75rem 1rem',
  border: '2px solid #e2e8f0',
  borderRadius: '0.75rem',
  fontSize: '1rem',
  color: '#0f172a',
  fontFamily: 'inherit',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxSizing: 'border-box',
  resize: 'vertical'
};

const fileUploadContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const browseButtonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  border: 'none',
  borderRadius: '0.75rem',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 15px -2px rgba(37, 99, 235, 0.3)',
  whiteSpace: 'nowrap'
};

const fileNameDisplayStyle = {
  fontSize: '0.9rem',
  color: '#64748b',
  fontWeight: '500'
};

const progressContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const progressLabelStyle = {
  fontSize: '0.95rem',
  color: '#475569',
  fontWeight: '600'
};

const progressBarContainerStyle = {
  width: '100%',
  height: '10px',
  backgroundColor: '#e2e8f0',
  borderRadius: '1rem',
  overflow: 'hidden'
};

const progressBarStyle = {
  height: '100%',
  backgroundColor: '#2563eb',
  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: '1rem'
};

const uploadButtonStyle = {
  padding: '1rem 2rem',
  backgroundColor: '#10b981',
  color: '#ffffff',
  border: 'none',
  borderRadius: '0.75rem',
  fontSize: '1.1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 15px -2px rgba(16, 185, 129, 0.3)',
  alignSelf: 'flex-start'
};

const cancelButtonStyle = {
  padding: '1rem 2rem',
  backgroundColor: '#64748b',
  color: '#ffffff',
  border: 'none',
  borderRadius: '0.75rem',
  fontSize: '1.1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 15px -2px rgba(100, 116, 139, 0.3)',
  alignSelf: 'flex-start'
};

const statusMessageStyle = (type) => ({
  padding: '1rem',
  borderRadius: '0.75rem',
  fontSize: '0.95rem',
  backgroundColor: type === 'success' ? '#dcfce7' : type === 'error' ? '#fee2e2' : '#fef3c7',
  color: type === 'success' ? '#15803d' : type === 'error' ? '#991b1b' : '#92400e',
  border: `1px solid ${type === 'success' ? '#bbf7d0' : type === 'error' ? '#fca5a5' : '#fcd34d'}`
});

const galleryHeaderStyle = {
  marginBottom: '2.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const galleryTitleStyle = {
  fontSize: '1.75rem',
  fontWeight: '800',
  color: '#0f172a',
  margin: '0'
};

const galleryCountStyle = {
  fontSize: '1rem',
  color: '#94a3b8'
};

const emptyStateStyle = {
  textAlign: 'center',
  padding: '4rem 2rem',
  color: '#94a3b8'
};

const emptyIconStyle = {
  fontSize: '4rem',
  display: 'block',
  marginBottom: '1rem'
};

const emptyTextStyle = {
  fontSize: '1.1rem',
  margin: '0'
};

const sermonsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '2rem'
};

const sermonCardStyle = {
  borderRadius: '1.25rem',
  overflow: 'hidden',
  boxShadow: '0 4px 20px -2px rgba(0,0,0,0.08)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid #e2e8f0',
  display: 'flex',
  flexDirection: 'column'
};

const sermonImageContainerStyle = {
  position: 'relative',
  overflow: 'hidden',
  height: '200px'
};

const sermonImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const sermonOverlayStyle = {
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const playIconStyle = {
  width: '3.5rem',
  height: '3.5rem',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  border: 'none',
  borderRadius: '50%',
  fontSize: '1.5rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 24px -5px rgba(37, 99, 235, 0.4)'
};

const sermonCardContentStyle = {
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  flex: '1'
};

const sermonMetaStyle = {
  display: 'flex',
  gap: '0.75rem',
  marginBottom: '0.75rem',
  flexWrap: 'wrap'
};

const seriesBadgeStyle = {
  display: 'inline-block',
  fontSize: '0.75rem',
  fontWeight: '700',
  backgroundColor: 'rgba(37, 99, 235, 0.1)',
  color: '#2563eb',
  padding: '0.35rem 0.75rem',
  borderRadius: '0.5rem'
};

const durationBadgeStyle = {
  display: 'inline-block',
  fontSize: '0.75rem',
  color: '#94a3b8'
};

const sermonCardTitleStyle = {
  fontSize: '1.1rem',
  fontWeight: '700',
  color: '#0f172a',
  marginBottom: '0.5rem',
  lineHeight: '1.4',
  margin: '0 0 0.5rem 0'
};

const sermonSpeakerStyle = {
  fontSize: '0.95rem',
  color: '#2563eb',
  fontWeight: '600',
  margin: '0 0 0.25rem 0'
};

const sermonDateStyle = {
  fontSize: '0.85rem',
  color: '#94a3b8',
  margin: '0 0 1rem 0'
};

const sermonDescStyle = {
  fontSize: '0.9rem',
  color: '#64748b',
  lineHeight: '1.6',
  margin: '0 0 1rem 0',
  flex: '1'
};

const sermonActionsStyle = {
  display: 'flex',
  gap: '0.75rem',
  marginTop: 'auto'
};

const editButtonStyle = {
  flex: 1,
  padding: '0.65rem 1rem',
  backgroundColor: '#f1f5f9',
  color: '#2563eb',
  border: '2px solid #e2e8f0',
  borderRadius: '0.5rem',
  fontWeight: '600',
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const deleteButtonStyle = {
  flex: 1,
  padding: '0.65rem 1rem',
  backgroundColor: '#fee2e2',
  color: '#dc2626',
  border: '2px solid #fecaca',
  borderRadius: '0.5rem',
  fontWeight: '600',
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const settingsContainerStyle = {
  maxWidth: '600px'
};

const settingsTitleStyle = {
  fontSize: '1.75rem',
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '2rem'
};

const settingItemStyle = {
  marginBottom: '2rem',
  paddingBottom: '2rem',
  borderBottom: '1px solid #e2e8f0'
};

const settingLabelStyle = {
  display: 'block',
  fontSize: '1rem',
  fontWeight: '600',
  color: '#0f172a',
  marginBottom: '0.5rem'
};

const settingHelpStyle = {
  fontSize: '0.85rem',
  color: '#94a3b8',
  marginTop: '0.5rem',
  margin: '0.5rem 0 0 0'
};

const saveSettingsButtonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  border: 'none',
  borderRadius: '0.75rem',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 15px -2px rgba(37, 99, 235, 0.3)'
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.admin-header-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.title-animate {
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
}

.subtitle-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

.tab-nav-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
}

.tab-button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-button:hover {
  background-color: rgba(37, 99, 235, 0.1) !important;
  transform: translateY(-2px);
}

.tab-content-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
}

.sermon-form {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
}

.form-group {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-group-1 { animation-delay: 0.6s; }
.form-group-2 { animation-delay: 0.65s; }
.form-group-3 { animation-delay: 0.7s; }
.form-group-4 { animation-delay: 0.75s; }
.form-group-5 { animation-delay: 0.8s; }
.form-group-6 { animation-delay: 0.85s; }
.form-group-7 { animation-delay: 0.9s; }
.form-group-8 { animation-delay: 0.95s; }
.form-group-9 { animation-delay: 1s; }

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #2563eb !important;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.upload-button:hover {
  background-color: #059669;
  transform: translateY(-3px);
  box-shadow: 0 12px 24px -5px rgba(16, 185, 129, 0.4);
}

.upload-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.browse-button:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
}

.progress-animate {
  animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.status-animate {
  animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.empty-state-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
}

.sermons-grid-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
}

.sermon-card-admin {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.sermon-card-0 { animation-delay: 0.6s; }
.sermon-card-1 { animation-delay: 0.7s; }
.sermon-card-2 { animation-delay: 0.8s; }
.sermon-card-3 { animation-delay: 0.9s; }
.sermon-card-4 { animation-delay: 1s; }
.sermon-card-5 { animation-delay: 1.1s; }

.sermon-card-admin:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 60px -10px rgba(37, 99, 235, 0.2);
  border-color: rgba(37, 99, 235, 0.3);
}

.sermon-card-admin:hover .sermon-image {
  transform: scale(1.08);
}

.sermon-card-admin:hover .overlay-admin {
  opacity: 1;
}

.play-button-admin:hover {
  background-color: #1d4ed8;
  transform: scale(1.1);
  box-shadow: 0 12px 32px -5px rgba(37, 99, 235, 0.5);
}

.edit-button:hover {
  background-color: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
  transform: translateY(-2px);
}

.delete-button:hover {
  background-color: #dc2626;
  color: #ffffff;
  border-color: #dc2626;
  transform: translateY(-2px);
}

.sermon-actions {
  animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.7s both;
}

.settings-form-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
}

.setting-item {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.setting-item-1 { animation-delay: 0.5s; }
.setting-item-2 { animation-delay: 0.6s; }
.setting-item-3 { animation-delay: 0.7s; }

.save-settings-button:hover {
  background-color: #1d4ed8;
  transform: translateY(-3px);
  box-shadow: 0 12px 32px -5px rgba(37, 99, 235, 0.4);
}

.logout-button:hover {
  background-color: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.5);
}

.logout-button:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  div[style*="tabNavStyle"] {
    flex-direction: column;
  }

  div[style*="titleStyle"] {
    font-size: 1.875rem;
  }

  div[style*="formRowStyle"] {
    grid-template-columns: 1fr;
  }

  div[style*="sermonsGridStyle"] {
    grid-template-columns: 1fr;
  }

  div[style*="sermonActionsStyle"] {
    flex-direction: column;
  }
  
  div[style*="headerStyle"] {
    flex-direction: column;
    text-align: center;
  }
}
</style>
