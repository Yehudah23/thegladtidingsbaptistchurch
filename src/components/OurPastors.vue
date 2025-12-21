<template>
  <section :style="sectionStyle">
    <!-- Hero Section -->
    <div :style="heroSectionStyle">
      <div :style="containerStyle" class="hero-container">
        <button @click="goBack" :style="backButtonStyle" class="back-button">
          ← Back to Home
        </button>
        <h1 :style="heroTitleStyle" class="fade-in-title hero-title">Our Pastors</h1>
        <p :style="heroSubtitleStyle" class="fade-in-subtitle hero-subtitle">
          Meet the spiritual leaders guiding our church family
        </p>
      </div>
    </div>

    <!-- Pastors Grid -->
    <div :style="containerStyle" class="pastors-container">
      <div :style="pastorsGridStyle" class="pastors-grid">
        <div v-for="(pastor, index) in pastors" :key="index" :style="pastorCardStyle" class="pastor-card" :class="`pastor-card-${index}`">
          <div :style="imageContainerStyle" class="pastor-image-container">
            <img :src="pastor.image" :alt="pastor.name" :style="imageStyle" class="pastor-image" />
            <div :style="overlayStyle"></div>
          </div>
          <div :style="contentStyle" class="pastor-content">
            <h2 :style="nameStyle" class="pastor-name">{{ pastor.name }}</h2>
            <p :style="titleStyle" class="pastor-title">{{ pastor.title }}</p>
            <div :style="bioStyle" class="pastor-bio">
              <p v-for="(paragraph, pIndex) in pastor.bio" :key="pIndex" :style="paragraphStyle" class="pastor-paragraph">
                {{ paragraph }}
              </p>
            </div>
            <div :style="statsContainerStyle" class="pastor-stats">
              <div :style="statStyle" class="stat-item">
                <span :style="statNumberStyle" class="stat-number">{{ pastor.yearsOfService }}</span>
                <span :style="statLabelStyle" class="stat-label">Years of Service</span>
              </div>
              <div :style="statStyle" class="stat-item">
                <span :style="statNumberStyle" class="stat-number">{{ pastor.specialization }}</span>
                <span :style="statLabelStyle" class="stat-label">Specialization</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.push({ name: 'Home' });
};

const pastors = ref([
  {
    name: "Rev. Segun Babalola",
    title: "Senior Pastor",
    image: require("@/assets/reverend Olusegun.png"),
    yearsOfService: "15+",
    specialization: "Teaching & Leadership",
    bio: [
      "Rev. Olusegun    Babalola has been serving as the Senior Pastor of The Glad Tidings Baptist Church since 1997. With a deep passion for God's Word and a heart for pastoral care, he has led our congregation through seasons of tremendous growth and spiritual transformation.",
      "He holds a Doctor of Divinity degree from the Nigerian Baptist Theological Seminary and has ministered in various capacities across Nigeria and internationally. His teaching ministry focuses on practical Christianity, family values, and developing strong biblical foundations.",
      "Under his leadership, our church has expanded its outreach programs, established several new ministries, and strengthened our commitment to community service. Pastor Olusegun is married to Mrs. Babalola, and they are blessed with Four children."
    ]
  },

  {
    name: "Rev. Jacob Areo",
    title: "Missions/Outreach Pastor",
    image: require("@/assets/reverend Jacob Areo.png"),
    yearsOfService: "10+",
    specialization: "Children & Education",
    bio: [
      "Rev. Jacob Areo has dedicated his ministry to reaching the lost through missions and outreaches. With a background in early childhood education and Christian ministry, he brings both professional expertise and spiritual insight to his role.",
      "He holds a degree in Education from the University of Ibadan and a diploma in Children's Ministry from the Baptist Convention. His creative approach of teaching biblical principles has made Sunday School an exciting and transformative experience for our children.",
      "Rev. Areo oversees all Missions programs including Local Outreaches, International Outreaches, and Missions. He has also developed age-appropriate curricula that help children understand and apply biblical truths in their daily lives. His heart's desire is to see every child in our church develop a personal relationship with Jesus Christ."
    ]
  },
  {
    name: "Rev. Olayinka Oke",
    title: "Spiritual Formation Pastor",
    image: require("@/assets/revrend oke.png"),
    yearsOfService: "10+",
    specialization: "Spiritual Growth & Discipleship",
    bio: [
      "Pastor Olayinka Oke has dedicated his ministry to shaping the spiritual formation of the members of the church through sound discipleship methods. With a background in early childhood education and Christian ministry, he brings both professional expertise and spiritual insight to his role.",
      "He holds a degree in Education from the University of Ibadan and a diploma in Children's Ministry from the Baptist Convention. His creative approach to teaching biblical principles has made Sunday School an exciting and transformative experience for our children.",
      "Pastor Oke oversees all spiritual formation programs including Sunday School, Vacation Bible School, and discipleship in and outside the church. He has also developed age-appropriate curricula that help  members understand and apply biblical truths in their daily lives. His heart's desire is to see discipleship a core practicein our church and to develop a personal relationship with Jesus Christ."
    ]
  },
  {
    name: " Rev. Tobi Onifade",
    title: "Worship and live development ministries Pastor",
    image: require("@/assets/reverend Tobi.png"),
    yearsOfService: "15+",
    specialization: "Worship & Life Development",
    bio: [
      "Rev. Tobi Onifadelese is a seasoned pastor known for her compassionate heart and effective ministry strategies. She serves alongside her husband as Associate Pastor and leads our thriving Women's Ministry. Her compassionate approach to ministry has touched countless lives, particularly in areas of marriage counseling, family restoration, and women's empowerment.",
      "He is a graduate of the Baptist Men's Missionary Union Leadership Training and holds a Master's degree in Christian Education. Her ministry emphasizes practical discipleship, mentorship, and building strong Christian families.",
      "Rev. Tobi coordinates various men's programs including Bible studies, prayer meetings, and community outreach initiatives. His heart for missions has also led to the establishment of several social welfare programs that serve vulnerable men and children in our community."
    ]
  },
  {
    name: "Pastor Damilola Ayoola-Abolade",
    title: "Youth Pastor/Media Director",
    image: require("@/assets/pastor damilola.png"),
    yearsOfService: "8+",
    specialization: "Youth & Young Adults",
    bio: [
      "Pastor Damilola Ayo-Ola-Abolade joined our pastoral team in 2025 as Youth Pastor, bringing vibrant energy and innovative approaches to youth ministry. His dynamic teaching style and genuine connection with young people have made him a beloved figure among our youth congregation.",
      "He graduated with honors from the Nigerian Baptist Theological Seminary and has additional training in youth psychology and contemporary ministry methods. His vision is to raise a generation of young people who are passionate about Christ and equipped to impact their world.",
      "Under Pastor Seun's leadership, our youth ministry has grown significantly, with active programs including weekly youth services, mentorship groups, talent development initiatives, and annual youth conferences. He is also actively involved in campus ministry at local universities."
    ]
  },
  
]);

// Styles
const sectionStyle = {
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  paddingBottom: '4rem'
};

const heroSectionStyle = {
  background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
  padding: '6rem 2rem 4rem 2rem',
  color: '#ffffff',
  position: 'relative',
  overflow: 'hidden'
};

const containerStyle = {
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  position: 'relative'
};

const backButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem 1.5rem',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: '#ffffff',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '0.75rem',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  marginBottom: '2rem',
  backdropFilter: 'blur(10px)'
};

const heroTitleStyle = {
  fontSize: '3.5rem',
  fontWeight: '800',
  marginBottom: '1rem',
  textAlign: 'center'
};

const heroSubtitleStyle = {
  fontSize: '1.3rem',
  textAlign: 'center',
  opacity: 0.95,
  maxWidth: '700px',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const pastorsGridStyle = {
  display: 'grid',
  gap: '3rem',
  marginTop: '3rem'
};

const pastorCardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '1.5rem',
  overflow: 'hidden',
  boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
  display: 'grid',
  gridTemplateColumns: '350px 1fr',
  gap: '2rem',
  transition: 'all 0.3s ease'
};

const imageContainerStyle = {
  position: 'relative',
  height: '100%',
  minHeight: '400px',
  overflow: 'hidden'
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  objectPosition: 'center',
  transition: 'transform 0.3s ease'
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)'
};

const contentStyle = {
  padding: '2.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const nameStyle = {
  fontSize: '2rem',
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '0.25rem'
};

const titleStyle = {
  fontSize: '1.2rem',
  fontWeight: '600',
  color: '#2563eb',
  marginBottom: '1rem'
};

const bioStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const paragraphStyle = {
  color: '#475569',
  fontSize: '1.05rem',
  lineHeight: '1.8',
  textAlign: 'justify'
};

const statsContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1.5rem',
  marginTop: '1rem',
  paddingTop: '1.5rem',
  borderTop: '1px solid #e2e8f0'
};

const statStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center'
};

const statNumberStyle = {
  fontSize: '1.8rem',
  fontWeight: '800',
  color: '#2563eb',
  marginBottom: '0.5rem'
};

const statLabelStyle = {
  fontSize: '0.9rem',
  color: '#64748b',
  fontWeight: '600'
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in-title, .fade-in-subtitle {
  animation: fadeIn 0.8s ease-out;
}

.fade-in-subtitle {
  animation-delay: 0.2s;
  animation-fill-mode: backwards;
}

.back-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateX(-5px);
}

.pastor-card {
  animation: fadeIn 0.6s ease-out;
}

.pastor-card-0 { animation-delay: 0.1s; animation-fill-mode: backwards; }
.pastor-card-1 { animation-delay: 0.2s; animation-fill-mode: backwards; }
.pastor-card-2 { animation-delay: 0.3s; animation-fill-mode: backwards; }
.pastor-card-3 { animation-delay: 0.4s; animation-fill-mode: backwards; }

.pastor-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px -10px rgba(37, 99, 235, 0.2);
}

.pastor-card:hover img {
  transform: scale(1.05);
}

/* Comprehensive Responsive Styles */

/* Large tablets and small desktops */
@media (max-width: 1024px) {
  .pastors-grid {
    gap: 2rem !important;
  }
  
  .pastor-card {
    grid-template-columns: 1fr 1fr !important;
    gap: 1.5rem !important;
  }
  
  .hero-title {
    font-size: 3rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.2rem !important;
  }
  
  .pastor-image-container {
    min-height: 100% !important;
  }
}

/* Tablets */
@media (max-width: 768px) {
  .hero-container {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
  }
  
  .pastors-container {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
  }
  
  .pastor-card {
    grid-template-columns: 1fr 1fr !important;
    gap: 1rem !important;
  }
  
  .pastor-image-container {
    min-height: 350px !important;
  }
  
  .pastor-content {
    padding: 1.5rem !important;
  }
  
  .hero-title {
    font-size: 2.5rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.1rem !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  
  .pastor-name {
    font-size: 1.5rem !important;
  }
  
  .pastor-title {
    font-size: 1rem !important;
  }
  
  .pastor-paragraph {
    font-size: 0.9rem !important;
    text-align: left !important;
  }
  
  .pastor-stats {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.75rem !important;
  }
}

/* Mobile phones - Stack vertically */
@media (max-width: 600px) {
  .hero-container {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  
  .pastors-container {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  
  .back-button {
    font-size: 0.85rem !important;
    padding: 0.6rem 1.2rem !important;
  }
  
  .hero-title {
    font-size: 2rem !important;
    line-height: 1.2 !important;
  }
  
  .hero-subtitle {
    font-size: 0.95rem !important;
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
  
  .pastor-card {
    grid-template-columns: 1fr !important;
    grid-template-rows: auto auto !important;
    gap: 0 !important;
  }
  
  .pastor-image-container {
    min-height: 280px !important;
    max-height: 320px !important;
    width: 100% !important;
  }
  
  .pastor-content {
    padding: 1.5rem 1.25rem !important;
    gap: 1rem !important;
  }
  
  .pastor-name {
    font-size: 1.5rem !important;
    line-height: 1.3 !important;
  }
  
  .pastor-title {
    font-size: 1rem !important;
    margin-bottom: 0.5rem !important;
  }
  
  .pastor-bio {
    gap: 0.75rem !important;
  }
  
  .pastor-paragraph {
    font-size: 0.9rem !important;
    line-height: 1.6 !important;
    text-align: left !important;
  }
  
  .pastor-stats {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 1rem !important;
    padding-top: 1rem !important;
    margin-top: 0.75rem !important;
  }
  
  .stat-number {
    font-size: 1.4rem !important;
  }
  
  .stat-label {
    font-size: 0.75rem !important;
  }
}

/* Extra small phones */
@media (max-width: 360px) {
  .hero-title {
    font-size: 1.75rem !important;
  }
  
  .hero-subtitle {
    font-size: 0.85rem !important;
  }
  
  .pastor-image-container {
    min-height: 240px !important;
    max-height: 280px !important;
  }
  
  .pastor-name {
    font-size: 1.3rem !important;
  }
  
  .pastor-paragraph {
    font-size: 0.85rem !important;
  }
  
  .pastor-content {
    padding: 1.25rem 1rem !important;
  }
  
  .stat-number {
    font-size: 1.2rem !important;
  }
  
  .stat-label {
    font-size: 0.7rem !important;
  }
}
</style>
