<!-- Sermons.vue -->
<template>
  <section id="sermons" :style="sectionStyle">
    <div :style="containerStyle">
      <!-- Section Header -->
      <div :style="headerStyle" class="sermon-header-animate">
        <span :style="badgeStyle" class="badge-animate">MESSAGES</span>
        <h2 :style="titleStyle" class="title-animate">
          Inspiring Messages
        </h2>
        <p :style="subtitleStyle" class="subtitle-animate">
          Experience powerful teaching from our pastors and speakers
        </p>

        <!-- Search -->
        <div :style="searchContainerStyle" class="search-animate">
          <span :style="searchIconStyle">🔍</span>
          <input
            type="text"
            placeholder="Search messages..."
            v-model="searchQuery"
            :style="searchInputStyle"
          />
        </div>
      </div>

      <!-- Tabs -->
      <div :style="tabsStyle" class="tabs-animate">
        <button 
          @click="activeTab = 'all'" 
          :style="getTabStyle('all')"
          class="tab-button"
        >
          All Messages
        </button>
        <button 
          @click="activeTab = 'recent'" 
          :style="getTabStyle('recent')"
          class="tab-button"
        >
          Recent
        </button>
        <button 
          @click="activeTab = 'popular'" 
          :style="getTabStyle('popular')"
          class="tab-button"
        >
          Popular
        </button>
        <button 
          @click="activeTab = 'series'" 
          :style="getTabStyle('series')"
          class="tab-button"
        >
          By Series
        </button>
      </div>

      <!-- Messages Grid -->
      <div v-if="activeTab !== 'series' && filteredSermons.length > 0" :style="gridStyle" class="sermons-grid-animate">
        <div v-for="(sermon, index) in filteredSermons" :key="sermon.id" :style="cardStyle" class="sermon-card-premium" :class="`sermon-card-${index}`">
          <!-- Image with Overlay -->
          <div :style="imageContainerStyle" class="image-container-premium">
            <img :src="sermon.thumbnail" :alt="sermon.title" :style="imageStyle" class="sermon-image" />
            <div :style="overlayStyle" class="overlay-premium">
              <button :style="playButtonStyle" @click="handlePlay(sermon.title)" class="play-button-premium">
                ▶
              </button>
            </div>
          </div>

          <!-- Content -->
          <div :style="contentStyle" class="sermon-content">
            <div :style="metaStyle">
              <span :style="categoryBadgeStyle">{{ sermon.series }}</span>
              <span :style="durationStyle">⏱ {{ sermon.duration }}</span>
            </div>
            <h3 :style="cardTitleStyle">{{ sermon.title }}</h3>
            <p :style="speakerStyle">by {{ sermon.speaker }}</p>
            <p :style="dateStyle">{{ sermon.date }}</p>
            
            <button :style="downloadButtonStyle" @click="handleDownload(sermon)" class="download-button-premium">
              📥 Download Audio
            </button>
          </div>
        </div>
      </div>

      <!-- Series Grouped View -->
      <div v-if="activeTab === 'series'" class="series-view-animate">
        <div v-if="Object.keys(sermonsBySeries).length === 0" :style="emptyStateStyle" class="empty-state-animate">
          <div :style="emptyIconStyle">🎤</div>
          <p :style="emptyTextStyle">No sermon series available</p>
        </div>
        <div v-else :style="seriesContainerStyle">
          <div 
            v-for="(seriesSermons, seriesName) in sermonsBySeries" 
            :key="seriesName" 
            :style="seriesGroupStyle"
            class="series-group"
          >
            <div 
              :style="seriesHeaderStyle" 
              @click="toggleSeries(seriesName)"
              class="series-header"
            >
              <div :style="seriesHeaderContentStyle">
                <img src="@/assets/folder_icon-removebg-preview.png" alt="Folder" :style="seriesIconStyle" />
                <div>
                  <h3 :style="seriesTitleStyle">{{ seriesName }}</h3>
                  <p :style="seriesCountStyle">{{ seriesSermons.length }} message{{ seriesSermons.length !== 1 ? 's' : '' }}</p>
                </div>
              </div>
              <span :style="chevronStyle">{{ expandedSeries[seriesName] ? '▼' : '▶' }}</span>
            </div>
            
            <div v-if="expandedSeries[seriesName]" :style="seriesMessagesStyle" class="series-messages">
              <div v-for="sermon in seriesSermons" :key="sermon.id" :style="seriesCardStyle" class="series-message-card">
                <div :style="seriesCardImageStyle">
                  <img :src="sermon.thumbnail" :alt="sermon.title" :style="seriesCardImgStyle" />
                  <div :style="seriesCardOverlayStyle" class="series-card-overlay">
                    <button :style="seriesPlayButtonStyle" @click="handlePlay(sermon.title)" class="series-play-button">
                      ▶
                    </button>
                  </div>
                </div>
                <div :style="seriesCardContentStyle">
                  <h4 :style="seriesCardTitleStyle">{{ sermon.title }}</h4>
                  <p :style="seriesCardSpeakerStyle">by {{ sermon.speaker }}</p>
                  <div :style="seriesCardMetaStyle">
                    <span>📅 {{ sermon.date }}</span>
                    <span>⏱ {{ sermon.duration }}</span>
                  </div>
                  <button :style="seriesDownloadButtonStyle" @click="handleDownload(sermon)" class="series-download-button">
                    📥 Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="activeTab !== 'series' && filteredSermons.length === 0" :style="emptyStateStyle" class="empty-state-animate">
        <div :style="emptyIconStyle">🎤</div>
        <p :style="emptyTextStyle">No messages found matching your search</p>
        <button @click="clearSearch" :style="clearButtonStyle" class="clear-button-premium">
          Clear Search
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
// import axios from 'axios';

const searchQuery = ref("");
const activeTab = ref("all");
const expandedSeries = ref({});

const sermons = ref([
  {
    id: 1,
    title: "Walking in Faith",
    speaker: "Pastor John Smith",
    date: "October 27, 2025",
    series: "Faith Foundations",
    duration: "45 min",
    description: "Exploring what it means to walk by faith and not by sight",
    thumbnail: "https://images.unsplash.com/photo-1610414961792-b7fffebddd14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "recent",
    audioUrl: "/sermons/walking-in-faith.mp3"
  },
  {
    id: 2,
    title: "The Power of Prayer",
    speaker: "Pastor Jane Doe",
    date: "October 20, 2025",
    series: "Spiritual Disciplines",
    duration: "50 min",
    description: "Understanding the importance of prayer in our daily lives",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "popular",
    audioUrl: "/sermons/power-of-prayer.mp3"
  },
  {
    id: 3,
    title: "Living a Life of Gratitude",
    speaker: "Pastor John Smith",
    date: "October 13, 2025",
    series: "Faith Foundations",
    duration: "42 min",
    description: "How gratitude transforms our perspective",
    thumbnail: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "recent",
    audioUrl: "/sermons/life-of-gratitude.mp3"
  },
  {
    id: 4,
    title: "The Great Commission",
    speaker: "Pastor Jane Doe",
    date: "October 6, 2025",
    series: "Evangelism",
    duration: "48 min",
    description: "Our call to share the Gospel",
    thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "popular",
    audioUrl: "/sermons/great-commission.mp3"
  },
  {
    id: 5,
    title: "Breaking Free from Fear",
    speaker: "Pastor Michael Johnson",
    date: "September 29, 2025",
    series: "Victory in Christ",
    duration: "55 min",
    description: "Finding courage and strength in Jesus",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "recent",
    audioUrl: "/sermons/breaking-free-from-fear.mp3"
  },
  {
    id: 6,
    title: "God's Unfailing Love",
    speaker: "Pastor Sarah Williams",
    date: "September 22, 2025",
    series: "Love Unconditional",
    duration: "47 min",
    description: "Understanding God's love for us",
    thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e8e5f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "popular",
    audioUrl: "/sermons/gods-unfailing-love.mp3"
  },
]);

const filteredSermons = computed(() => {
  let filtered = sermons.value;

  if (activeTab.value !== "all" && activeTab.value !== "series") {
    filtered = filtered.filter(s => s.category === activeTab.value);
  }

  if (searchQuery.value) {
    filtered = filtered.filter(s =>
      s.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      s.speaker.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});

const sermonsBySeries = computed(() => {
  const grouped = {};
  sermons.value.forEach(sermon => {
    if (!grouped[sermon.series]) {
      grouped[sermon.series] = [];
    }
    grouped[sermon.series].push(sermon);
  });
  // Sort each series by date (newest first)
  Object.keys(grouped).forEach(series => {
    grouped[series].sort((a, b) => new Date(b.date) - new Date(a.date));
  });
  return grouped;
});

const toggleSeries = (seriesName) => {
  expandedSeries.value[seriesName] = !expandedSeries.value[seriesName];
};

const sectionStyle = {
  paddingTop: '6rem',
  paddingBottom: '6rem',
  backgroundColor: '#ffffff'
};

const containerStyle = {
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '2rem',
  paddingRight: '2rem'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '4rem'
};

const badgeStyle = {
  display: 'inline-block',
  fontSize: '0.75rem',
  fontWeight: '800',
  letterSpacing: '0.1em',
  color: '#2563eb',
  backgroundColor: 'rgba(37, 99, 235, 0.1)',
  padding: '0.5rem 1rem',
  borderRadius: '9999px',
  marginBottom: '1rem'
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
  marginRight: 'auto',
  marginBottom: '2rem'
};

const searchContainerStyle = {
  maxWidth: '400px',
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'relative'
};

const searchIconStyle = {
  position: 'absolute',
  left: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '1.2rem',
  color: '#94a3b8'
};

const searchInputStyle = {
  width: '100%',
  paddingLeft: '2.75rem',
  paddingRight: '1rem',
  paddingTop: '0.75rem',
  paddingBottom: '0.75rem',
  border: '2px solid #e2e8f0',
  borderRadius: '0.75rem',
  fontSize: '1rem',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxSizing: 'border-box'
};

const tabsStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  marginBottom: '3rem',
  flexWrap: 'wrap'
};

const getTabStyle = (tabName) => ({
  padding: '0.75rem 2rem',
  backgroundColor: activeTab.value === tabName ? '#2563eb' : '#f1f5f9',
  color: activeTab.value === tabName ? '#ffffff' : '#64748b',
  border: 'none',
  fontSize: '0.95rem',
  fontWeight: '600',
  cursor: 'pointer',
  borderRadius: '0.75rem',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
});

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '2rem',
  marginBottom: '3rem'
};

const cardStyle = {
  borderRadius: '1.25rem',
  overflow: 'hidden',
  boxShadow: '0 4px 20px -2px rgba(0,0,0,0.08)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid #e2e8f0',
  display: 'flex',
  flexDirection: 'column'
};

const imageContainerStyle = {
  position: 'relative',
  overflow: 'hidden',
  height: '180px'
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const overlayStyle = {
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const playButtonStyle = {
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

const contentStyle = {
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  flex: '1'
};

const metaStyle = {
  display: 'flex',
  gap: '0.75rem',
  marginBottom: '0.75rem',
  flexWrap: 'wrap'
};

const categoryBadgeStyle = {
  display: 'inline-block',
  fontSize: '0.75rem',
  fontWeight: '700',
  backgroundColor: 'rgba(37, 99, 235, 0.1)',
  color: '#2563eb',
  padding: '0.35rem 0.75rem',
  borderRadius: '0.5rem'
};

const durationStyle = {
  display: 'inline-block',
  fontSize: '0.75rem',
  color: '#94a3b8'
};

const cardTitleStyle = {
  fontSize: '1.1rem',
  fontWeight: '700',
  color: '#0f172a',
  marginBottom: '0.5rem',
  lineHeight: '1.4'
};

const speakerStyle = {
  fontSize: '0.95rem',
  color: '#2563eb',
  fontWeight: '600',
  margin: '0 0 0.25rem 0'
};

const dateStyle = {
  fontSize: '0.85rem',
  color: '#94a3b8',
  margin: '0 0 1rem 0'
};

const downloadButtonStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  backgroundColor: '#f1f5f9',
  color: '#2563eb',
  border: '2px solid #e2e8f0',
  borderRadius: '0.5rem',
  fontWeight: '700',
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const emptyStateStyle = {
  textAlign: 'center',
  padding: '4rem 2rem'
};

const emptyIconStyle = {
  fontSize: '4rem',
  marginBottom: '1rem'
};

const emptyTextStyle = {
  fontSize: '1.1rem',
  color: '#64748b',
  marginBottom: '1.5rem'
};

const clearButtonStyle = {
  padding: '0.75rem 2rem',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  border: 'none',
  borderRadius: '0.75rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

// Series View Styles
const seriesContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const seriesGroupStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '1rem',
  overflow: 'hidden',
  boxShadow: '0 4px 20px -2px rgba(0,0,0,0.08)',
  border: '1px solid #e2e8f0',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const seriesHeaderStyle = {
  padding: '1.5rem',
  backgroundColor: '#f8fafc',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  borderBottom: '1px solid #e2e8f0'
};

const seriesHeaderContentStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const seriesIconStyle = {
  width: '3rem',
  height: '3rem',
  objectFit: 'contain'
};

const seriesTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: '700',
  color: '#0f172a',
  margin: '0 0 0.25rem 0'
};

const seriesCountStyle = {
  fontSize: '0.875rem',
  color: '#64748b',
  margin: 0
};

const chevronStyle = {
  fontSize: '1.25rem',
  color: '#64748b',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const seriesMessagesStyle = {
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  backgroundColor: '#ffffff'
};

const seriesCardStyle = {
  display: 'flex',
  gap: '1rem',
  padding: '1rem',
  backgroundColor: '#f8fafc',
  borderRadius: '0.75rem',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid #e2e8f0'
};

const seriesCardImageStyle = {
  position: 'relative',
  width: '150px',
  height: '100px',
  flexShrink: 0,
  borderRadius: '0.5rem',
  overflow: 'hidden'
};

const seriesCardImgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const seriesCardOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const seriesPlayButtonStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  border: 'none',
  fontSize: '1rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const seriesCardContentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const seriesCardTitleStyle = {
  fontSize: '1.125rem',
  fontWeight: '600',
  color: '#0f172a',
  margin: 0
};

const seriesCardSpeakerStyle = {
  fontSize: '0.875rem',
  color: '#64748b',
  margin: 0
};

const seriesCardMetaStyle = {
  display: 'flex',
  gap: '1rem',
  fontSize: '0.875rem',
  color: '#94a3b8'
};

const seriesDownloadButtonStyle = {
  marginTop: 'auto',
  padding: '0.5rem 1rem',
  backgroundColor: '#ffffff',
  color: '#2563eb',
  border: '2px solid #e2e8f0',
  borderRadius: '0.5rem',
  fontWeight: '600',
  fontSize: '0.875rem',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  alignSelf: 'flex-start'
};

const handlePlay = (title) => {
  console.log('Playing:', title);
};

const handleDownload = async (sermon) => {
  if (!sermon.audioUrl) {
    alert('Audio file not available for this sermon.');
    return;
  }

  try {
    // Create a download link
    const link = document.createElement('a');
    link.href = sermon.audioUrl;
    
    // Generate filename from sermon title
    const filename = `${sermon.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${sermon.speaker.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp3`;
    link.download = filename;
    
    // For external URLs, we need to fetch and create a blob
    if (sermon.audioUrl.startsWith('http')) {
      const response = await fetch(sermon.audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(url);
    } else {
      // For local files, just trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    console.log('Downloading:', sermon.title);
  } catch (error) {
    console.error('Download error:', error);
    alert('Failed to download the audio file. Please try again or contact support.');
  }
};

const clearSearch = () => {
  searchQuery.value = '';
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

.sermon-header-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.badge-animate {
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
}

.title-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

.subtitle-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
}

.search-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
}

.tabs-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
}

.tab-button:hover {
  background-color: rgba(37, 99, 235, 0.1) !important;
  transform: translateY(-2px);
}

.sermons-grid-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
}

.sermon-card-premium {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.sermon-card-0 { animation-delay: 0.7s; }
.sermon-card-1 { animation-delay: 0.8s; }
.sermon-card-2 { animation-delay: 0.9s; }
.sermon-card-3 { animation-delay: 1s; }
.sermon-card-4 { animation-delay: 1.1s; }
.sermon-card-5 { animation-delay: 1.2s; }

.sermon-card-premium:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 60px -10px rgba(37, 99, 235, 0.2);
  border-color: rgba(37, 99, 235, 0.3);
}

.image-container-premium {
  position: relative;
}

.sermon-image:hover {
  transform: scale(1.08);
}

.image-container-premium:hover .overlay-premium {
  opacity: 1;
}

.overlay-premium:hover .play-button-premium {
  transform: scale(1.1);
}

.play-button-premium:hover {
  background-color: #1d4ed8;
  box-shadow: 0 12px 32px -5px rgba(37, 99, 235, 0.5);
}

.download-button-premium:hover {
  background-color: #2563eb;
  color: '#ffffff';
  border-color: #2563eb;
  transform: translateY(-2px);
}

.empty-state-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.clear-button-premium:hover {
  background-color: #1d4ed8;
  transform: translateY(-3px);
  box-shadow: 0 12px 24px -5px rgba(37, 99, 235, 0.4);
}

.series-view-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
}

.series-group {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.series-header:hover {
  background-color: #f1f5f9 !important;
}

.series-messages {
  animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.series-message-card:hover {
  background-color: #ffffff;
  transform: translateX(8px);
  box-shadow: 0 8px 20px -4px rgba(37, 99, 235, 0.15);
}

.series-message-card:hover .series-card-overlay {
  opacity: 1;
}

.series-play-button:hover {
  background-color: #1d4ed8;
  transform: scale(1.1);
}

.series-download-button:hover {
  background-color: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  div[style*="titleStyle"] {
    font-size: 1.875rem;
  }

  div[style*="gridStyle"] {
    grid-template-columns: 1fr;
  }

  div[style*="seriesCardStyle"] {
    flex-direction: column;
  }

  div[style*="seriesCardImageStyle"] {
    width: 100%;
    height: 200px;
  }
}
</style>
