<template>
  <section :style="sectionStyle">
   
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
    image: require("@/assets/Reverend Olusegun Babalola.jpg"),
    yearsOfService: "15+",
    specialization: "Teaching & Leadership",
    bio: [
      "Rev. Olusegun    Babalola has been serving as the Senior Pastor of The Glad Tidings Baptist Church since 1997. With a deep passion for God's Word and a heart for pastoral care, he has led our congregation through seasons of tremendous growth and spiritual transformation.",
      "He holds a Doctor of Divinity degree from the Nigerian Baptist Theological Seminary and has ministered in various capacities across Nigeria and internationally. His teaching ministry focuses on practical Christianity, family values, and developing strong biblical foundations.",
      "Under his leadership, our church has expanded its outreach programs, established several new ministries, and strengthened our commitment to community service. Pastor Olusegun is married to Mrs. Babalola, and they are blessed with Four children."
    ]
  },

  {
    name: "Rev. Jacob Onaolapo Areo",
    title: "Missions/Outreach Pastor",
    image: require("@/assets/Reverend Jacob Areo.png"),
    yearsOfService: "9+",
    specialization: "Missions & Evangelism",
    bio: [
      "Rev. Jacob Onaolapo Areo's journey with Christ began on September 27, 1998, when he surrendered his life to Jesus Christ. This transformative encounter marked the beginning of a deep relationship with the Lord that would eventually lead him to full-time Gospel ministry.",
      "After years of faithful service and growing conviction, Rev. Areo answered God's call into the Gospel Ministry in 2003. His decision to dedicate his life to ministry was born out of a profound passion for seeing souls come to Christ and experience the transforming power of the Gospel.",
      "Rev. Areo's ministry philosophy is firmly rooted in proclaiming the Gospel of Jesus Christ to unbelievers, calling them to genuine repentance and faith. He believes that effective ministry must be guided by the Holy Spirit, grounded in Scripture, and expressed through love and service to others. His unwavering conviction is that Jesus Christ is the only name given among men by which we must be saved.",
      "As the Missions and Outreach Pastor at The Glad Tidings Baptist Church, Rev. Areo oversees all evangelistic efforts, including local and international missions. His heart burns with passion for evangelism that clearly and boldly presents Jesus as the only way to salvation. Through his leadership, our church continues to reach out to the lost, making disciples and expanding God's kingdom one soul at a time.",
      "Rev. Areo's dedication to the Great Commission inspires our congregation to be active witnesses for Christ, both in our local community and to the ends of the earth. His life and ministry exemplify what it means to be a fisher of men, always ready to share the hope that is found in Jesus Christ alone."
    ]
  },
  {
    name: "Rev. Olayinka Oke",
    title: "Spiritual Formation Pastor",
    image: require("@/assets/Reverend Olayinka Oke.jpg"),
    yearsOfService: "3+",
    specialization: "Spiritual Growth & Discipleship",
    bio: [
      "Samson Olayinka Oke was born on March 03, 1982. He went to elementary, secondary and bagged a degree in Agricultural Economics and Extension from LAUTECH Ogbomoso.",
      "Though born and raised in the Baptist, Samson after he listened to a teaching on the Baptism of the Holy Spirit with salvation as a prerequisite surrendered his life to Jesus Christ, confessed Him as His Lord and Saviour on July 19, 1999 and was baptized in June 2002 at the Glad Tidings Baptist Church.",
      "Proper discipleship followed his conversion experience which helped in being rooted and built up in Christ as a young convert. Olayinka Oke served in different capacity in Royal Ambassador, an active member of Youth, and a Sunday School Teacher. He equally served in the Baptist Student Fellowship (BSF) Ogbomoso Baptist Conference and BSF LAUTECH.",
      "Samson Olayinka Oke in 2004 received God's call into full time pastoral ministry and upon answering the call in 2014; he attended the Nigerian Baptist Theological Seminary (NBTS), Ogbomoso and graduated on June 03, 2017. He got ordained into full time Pastoral ministry by the denomination in 2021.",
      "A Pastor-Teacher by calling with the responsibility of living as God intended and presenting the word of God undilutedly and affirmatively served as a Student Pastor in Ayegun Baptist Church and the Glad Tidings Baptist Church both in Ogbomoso. He received a call after graduation to Pastor New Heritage Baptist Church, Akpabuyo, Calabar, Cross River State where he served from 2018-2022.",
      "He joined the ministerial staff of the Glad Tidings Baptist Church in charge of Spiritual Formation and Family Life on October 1, 2022. Samson Olayinka Oke is married to Abosede Olayimika Oke and they are blessed with four children to the glory of God."
    ]
  },
  {
    name: " Rev. Tobi Onifade",
    title: "Worship and live development ministries Pastor",
    image: require("@/assets/Reverend Tobi Onifade.jpg"),
    yearsOfService: "3+",
    specialization: "Worship & Life Development",
    bio: [
      "Onifade Oluwatobi was born to the family of Mr and Mrs Jacob Comfort Onifade on March 21, 1991. He had his education from primary to tertiary institution level where he obtained a Bachelors degree in Accounting, and observed the one year national youth service in Nnewi South Local Government of Anambra state.",
      "He gave his life to Christ on December 29, 2001 and was baptized on October 24, 2004. He has since then submitted himself to, and undergone some discipleship training from 'Christ Indwelling You' to 'Master Life'.",
      "In engaging his talents and spiritual gifts, he has served in the following ministry opportunities: Music ministry, Teaching ministry as a Sunday school teacher, and Teenage ministry. He has also served in the Baptist Student Fellowship and the Royal Ambassadors in different capacities.",
      "Having sensed the call of God upon his life with deep conviction, he proceeded to Nigerian Baptist Theological Seminary, Ogbomoso in 2017 to be trained as a Baptist minister. He is married to Sis. Opeyemi Onifade."
    ]
  },
  {
    name: "Pastor Damilola Ayoola-Abolade",
    title: "Youth Pastor/Media Director",
    image: require("@/assets/Pastor Damilola.png"),
    yearsOfService: "1+",
    specialization: "Youth & Young Adults",
    bio: [
      "Damilola Ayoola-Abolade gave his life to Christ July 15th 2010 and responded to the call into full time Gospel ministry in August 2021. He has a BSc in Actuarial Science from the University of Lagos, as well a data science certificate as a qualified data analyst. He is passionate about spreading the gospel and raising a generation of young people who love God, obey His Word, and are equipped to serve in their communities and campuses."
    ]
  },
  
]);


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

/* Comprehensive Responsive Styles - Apple Devices */

/* iPad Pro - 12.9" and 11" screens (1366px+) */
@media (min-width: 1366px) {
  .pastors-grid {
    gap: 2.5rem !important;
  }
  
  .pastor-card {
    grid-template-columns: 1fr 1fr !important;
    gap: 2rem !important;
  }
  
  .hero-title {
    font-size: 3.5rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.3rem !important;
  }
  
  .pastor-image-container {
    min-height: 450px !important;
  }
}

/* iPad Standard/Air - 10.9" screens (1024px - 1365px) */
@media (min-width: 1024px) and (max-width: 1365px) {
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

/* iPad Mini - 8.3" screens (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
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
    gap: 1.25rem !important;
  }
  
  .pastor-image-container {
    min-height: 380px !important;
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

/* iPhone Pro Max - 6.9" screens (520px - 767px) */
@media (min-width: 520px) and (max-width: 767px) {
  .hero-container {
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
  }
  
  .pastors-container {
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
  }
  
  .pastor-card {
    grid-template-columns: 1fr !important;
    grid-template-rows: auto auto !important;
    gap: 0 !important;
  }
  
  .pastor-image-container {
    min-height: 300px !important;
    max-height: 350px !important;
    width: 100% !important;
  }
  
  .pastor-content {
    padding: 1.5rem !important;
    gap: 1rem !important;
  }
  
  .hero-title {
    font-size: 2.2rem !important;
    line-height: 1.2 !important;
  }
  
  .hero-subtitle {
    font-size: 1rem !important;
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
  }
  
  .pastor-name {
    font-size: 1.45rem !important;
    line-height: 1.3 !important;
  }
  
  .pastor-title {
    font-size: 1rem !important;
    margin-bottom: 0.5rem !important;
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
}

/* iPhone Plus - 6.7" screens (480px - 519px) */
@media (min-width: 480px) and (max-width: 519px) {
  .hero-container {
    padding-left: 1.2rem !important;
    padding-right: 1.2rem !important;
  }
  
  .pastors-container {
    padding-left: 1.2rem !important;
    padding-right: 1.2rem !important;
  }
  
  .pastor-card {
    grid-template-columns: 1fr !important;
    grid-template-rows: auto auto !important;
    gap: 0 !important;
  }
  
  .pastor-image-container {
    min-height: 290px !important;
    max-height: 330px !important;
    width: 100% !important;
  }
  
  .pastor-content {
    padding: 1.4rem !important;
    gap: 1rem !important;
  }
  
  .hero-title {
    font-size: 2.1rem !important;
    line-height: 1.2 !important;
  }
  
  .hero-subtitle {
    font-size: 0.98rem !important;
    padding-left: 0.6rem !important;
    padding-right: 0.6rem !important;
  }
  
  .pastor-name {
    font-size: 1.4rem !important;
  }
  
  .pastor-title {
    font-size: 0.95rem !important;
  }
  
  .pastor-paragraph {
    font-size: 0.88rem !important;
    text-align: left !important;
  }
  
  .pastor-stats {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.9rem !important;
    padding-top: 0.9rem !important;
  }
}

/* iPhone Standard - 6.1" screens (430px - 479px) */
@media (min-width: 430px) and (max-width: 479px) {
  .hero-container {
    padding-left: 1.1rem !important;
    padding-right: 1.1rem !important;
  }
  
  .pastors-container {
    padding-left: 1.1rem !important;
    padding-right: 1.1rem !important;
  }
  
  .back-button {
    font-size: 0.85rem !important;
    padding: 0.6rem 1.2rem !important;
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
    padding: 1.3rem 1.2rem !important;
    gap: 1rem !important;
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
  
  .pastor-name {
    font-size: 1.35rem !important;
    line-height: 1.3 !important;
  }
  
  .pastor-title {
    font-size: 0.95rem !important;
    margin-bottom: 0.5rem !important;
  }
  
  .pastor-bio {
    gap: 0.75rem !important;
  }
  
  .pastor-paragraph {
    font-size: 0.88rem !important;
    line-height: 1.6 !important;
    text-align: left !important;
  }
  
  .pastor-stats {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.85rem !important;
    padding-top: 0.85rem !important;
    margin-top: 0.7rem !important;
  }
  
  .stat-number {
    font-size: 1.35rem !important;
  }
  
  .stat-label {
    font-size: 0.75rem !important;
  }
}

/* iPhone Small - 5.4" screens (390px - 429px) */
@media (max-width: 429px) {
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
    font-size: 1.75rem !important;
    line-height: 1.2 !important;
  }
  
  .hero-subtitle {
    font-size: 0.85rem !important;
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
  
  .pastor-card {
    grid-template-columns: 1fr !important;
    grid-template-rows: auto auto !important;
    gap: 0 !important;
  }
  
  .pastor-image-container {
    min-height: 240px !important;
    max-height: 280px !important;
    width: 100% !important;
  }
  
  .pastor-content {
    padding: 1.25rem 1rem !important;
    gap: 0.85rem !important;
  }
  
  .pastor-name {
    font-size: 1.3rem !important;
    line-height: 1.2 !important;
  }
  
  .pastor-title {
    font-size: 0.9rem !important;
    margin-bottom: 0.4rem !important;
  }
  
  .pastor-bio {
    gap: 0.65rem !important;
  }
  
  .pastor-paragraph {
    font-size: 0.85rem !important;
    line-height: 1.5 !important;
    text-align: left !important;
  }
  
  .pastor-stats {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.8rem !important;
    padding-top: 0.8rem !important;
    margin-top: 0.6rem !important;
  }
  
  .stat-number {
    font-size: 1.2rem !important;
  }
  
  .stat-label {
    font-size: 0.7rem !important;
  }
}

/* ===== ANDROID DEVICE BREAKPOINTS ===== */

/* Android Tablets - High Resolution (1800px - Pixel C, Galaxy Tab S) */
@media (min-width: 1800px) and (max-width: 2560px) {
  .pastors-grid {
    gap: 2.8rem !important;
  }
  
  .pastor-card {
    grid-template-columns: 1fr 1fr !important;
    gap: 2.2rem !important;
  }
  
  .hero-title {
    font-size: 3.8rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.4rem !important;
  }
  
  .pastor-image-container {
    min-height: 480px !important;
  }
  
  .pastor-name {
    font-size: 1.8rem !important;
  }
  
  .pastor-paragraph {
    font-size: 1rem !important;
  }
}

/* Android Tablets - Standard (1280px-1800px - Nexus 9, Galaxy Tab) */
@media (min-width: 1280px) and (max-width: 1799px) {
  .pastors-grid {
    gap: 2.3rem !important;
  }
  
  .pastor-card {
    grid-template-columns: 1fr 1fr !important;
    gap: 1.7rem !important;
  }
  
  .hero-title {
    font-size: 3.2rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.25rem !important;
  }
  
  .pastor-image-container {
    min-height: 100% !important;
  }
  
  .pastor-name {
    font-size: 1.6rem !important;
  }
  
  .pastor-paragraph {
    font-size: 0.95rem !important;
  }
}

/* Android Tablets - Small (800px-1279px) */
@media (min-width: 800px) and (max-width: 1279px) {
  .hero-container {
    padding-left: 1.6rem !important;
    padding-right: 1.6rem !important;
  }
  
  .pastors-container {
    padding-left: 1.6rem !important;
    padding-right: 1.6rem !important;
  }
  
  .pastor-card {
    grid-template-columns: 1fr 1fr !important;
    gap: 1.35rem !important;
  }
  
  .pastor-image-container {
    min-height: 390px !important;
  }
  
  .pastor-content {
    padding: 1.6rem !important;
  }
  
  .hero-title {
    font-size: 2.6rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.15rem !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  
  .pastor-name {
    font-size: 1.55rem !important;
  }
  
  .pastor-title {
    font-size: 1.02rem !important;
  }
  
  .pastor-paragraph {
    font-size: 0.92rem !important;
    text-align: left !important;
  }
  
  .pastor-stats {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.8rem !important;
  }
}

/* Android High-End Flagships - QHD/QHD+ (720px wide - 2560px-3120px tall) */
@media (min-width: 720px) and (max-width: 799px) {
  .hero-container {
    padding-left: 1.3rem !important;
    padding-right: 1.3rem !important;
  }
  
  .pastors-container {
    padding-left: 1.3rem !important;
    padding-right: 1.3rem !important;
  }
  
  .pastor-card {
    grid-template-columns: 1fr !important;
    grid-template-rows: auto auto !important;
    gap: 0 !important;
  }
  
  .pastor-image-container {
    min-height: 310px !important;
    max-height: 360px !important;
    width: 100% !important;
  }
  
  .pastor-content {
    padding: 1.55rem !important;
    gap: 1.05rem !important;
  }
  
  .hero-title {
    font-size: 2.25rem !important;
    line-height: 1.2 !important;
  }
  
  .hero-subtitle {
    font-size: 1.02rem !important;
    padding-left: 0.8rem !important;
    padding-right: 0.8rem !important;
  }
  
  .pastor-name {
    font-size: 1.48rem !important;
    line-height: 1.3 !important;
  }
  
  .pastor-title {
    font-size: 1.02rem !important;
    margin-bottom: 0.55rem !important;
  }
  
  .pastor-paragraph {
    font-size: 0.92rem !important;
    line-height: 1.6 !important;
    text-align: left !important;
  }
  
  .pastor-stats {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 1.05rem !important;
    padding-top: 1.05rem !important;
    margin-top: 0.8rem !important;
  }
  
  .stat-number {
    font-size: 1.5rem !important;
  }
  
  .stat-label {
    font-size: 0.8rem !important;
  }
}

/* Android Mid-Range/Flagships - FHD/FHD+ (540px wide - 1920px-2400px tall) */
@media (min-width: 540px) and (max-width: 719px) {
  .hero-container {
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
  }
  
  .pastors-container {
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
  }
  
  .pastor-card {
    grid-template-columns: 1fr !important;
    grid-template-rows: auto auto !important;
    gap: 0 !important;
  }
  
  .pastor-image-container {
    min-height: 295px !important;
    max-height: 335px !important;
    width: 100% !important;
  }
  
  .pastor-content {
    padding: 1.45rem !important;
    gap: 1rem !important;
  }
  
  .hero-title {
    font-size: 2.15rem !important;
    line-height: 1.2 !important;
  }
  
  .hero-subtitle {
    font-size: 0.98rem !important;
    padding-left: 0.65rem !important;
    padding-right: 0.65rem !important;
  }
  
  .pastor-name {
    font-size: 1.42rem !important;
  }
  
  .pastor-title {
    font-size: 0.98rem !important;
  }
  
  .pastor-paragraph {
    font-size: 0.9rem !important;
    text-align: left !important;
  }
  
  .pastor-stats {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.95rem !important;
    padding-top: 0.95rem !important;
  }
  
  .stat-number {
    font-size: 1.42rem !important;
  }
  
  .stat-label {
    font-size: 0.78rem !important;
  }
}

/* Android Small Phones/Budget - HD/HD+ (360px wide - 1280px-1600px tall) */
@media (max-width: 539px) and (min-width: 360px) {
  .hero-container {
    padding-left: 1.05rem !important;
    padding-right: 1.05rem !important;
  }
  
  .pastors-container {
    padding-left: 1.05rem !important;
    padding-right: 1.05rem !important;
  }
  
  .back-button {
    font-size: 0.87rem !important;
    padding: 0.62rem 1.25rem !important;
  }
  
  .pastor-card {
    grid-template-columns: 1fr !important;
    grid-template-rows: auto auto !important;
    gap: 0 !important;
  }
  
  .pastor-image-container {
    min-height: 275px !important;
    max-height: 315px !important;
    width: 100% !important;
  }
  
  .pastor-content {
    padding: 1.32rem 1.18rem !important;
    gap: 0.95rem !important;
  }
  
  .hero-title {
    font-size: 1.98rem !important;
    line-height: 1.2 !important;
  }
  
  .hero-subtitle {
    font-size: 0.93rem !important;
    padding-left: 0.55rem !important;
    padding-right: 0.55rem !important;
  }
  
  .pastor-name {
    font-size: 1.38rem !important;
    line-height: 1.3 !important;
  }
  
  .pastor-title {
    font-size: 0.93rem !important;
    margin-bottom: 0.48rem !important;
  }
  
  .pastor-bio {
    gap: 0.78rem !important;
  }
  
  .pastor-paragraph {
    font-size: 0.87rem !important;
    line-height: 1.6 !important;
    text-align: left !important;
  }
  
  .pastor-stats {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.88rem !important;
    padding-top: 0.88rem !important;
    margin-top: 0.72rem !important;
  }
  
  .stat-number {
    font-size: 1.38rem !important;
  }
  
  .stat-label {
    font-size: 0.76rem !important;
  }
}

/* Android Foldables - Unfolded State (wide landscape ~2208px-1768px) */
@media (min-width: 1768px) and (max-width: 2208px) and (orientation: landscape) {
  .pastors-grid {
    gap: 2.5rem !important;
  }
  
  .pastor-card {
    grid-template-columns: 1fr 1fr !important;
    gap: 2rem !important;
  }
  
  .hero-title {
    font-size: 3.5rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.35rem !important;
  }
  
  .pastor-image-container {
    min-height: 450px !important;
  }
}

/* Android Foldables - Folded/Cover Screen (narrow ~277px-359px) */
@media (min-width: 277px) and (max-width: 359px) {
  .hero-container {
    padding-left: 0.9rem !important;
    padding-right: 0.9rem !important;
  }
  
  .pastors-container {
    padding-left: 0.9rem !important;
    padding-right: 0.9rem !important;
  }
  
  .back-button {
    font-size: 0.8rem !important;
    padding: 0.55rem 1.05rem !important;
  }
  
  .hero-title {
    font-size: 1.65rem !important;
    line-height: 1.2 !important;
  }
  
  .hero-subtitle {
    font-size: 0.82rem !important;
    padding-left: 0.45rem !important;
    padding-right: 0.45rem !important;
  }
  
  .pastor-card {
    grid-template-columns: 1fr !important;
    grid-template-rows: auto auto !important;
    gap: 0 !important;
  }
  
  .pastor-image-container {
    min-height: 220px !important;
    max-height: 260px !important;
    width: 100% !important;
  }
  
  .pastor-content {
    padding: 1.15rem 0.95rem !important;
    gap: 0.8rem !important;
  }
  
  .pastor-name {
    font-size: 1.25rem !important;
    line-height: 1.2 !important;
  }
  
  .pastor-title {
    font-size: 0.85rem !important;
    margin-bottom: 0.38rem !important;
  }
  
  .pastor-bio {
    gap: 0.6rem !important;
  }
  
  .pastor-paragraph {
    font-size: 0.8rem !important;
    line-height: 1.5 !important;
    text-align: left !important;
  }
  
  .pastor-stats {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.75rem !important;
    padding-top: 0.75rem !important;
    margin-top: 0.55rem !important;
  }
  
  .stat-number {
    font-size: 1.15rem !important;
  }
  
  .stat-label {
    font-size: 0.68rem !important;
  }
}
</style>
