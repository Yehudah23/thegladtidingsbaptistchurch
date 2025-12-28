<!-- Contact.vue -->
<template>
  <section id="contact" :style="sectionStyle">
    <!-- Background gradient -->
    <div :style="backgroundStyle"></div>

    <div :style="containerStyle">
      <!-- Section Header -->
      <div :style="headerStyle" class="contact-header-animate">
        <span :style="badgeStyle" class="badge-animate">CONTACT US</span>
        <h2 :style="titleStyle" class="title-animate">
          Get In Touch
        </h2>
        <p :style="subtitleStyle" class="subtitle-animate">
          We'd love to hear from you. Reach out and let's connect!
        </p>
      </div>

      <div :style="mainGridStyle" class="contact-grid-animate">
        <!-- Contact Information -->
        <div :style="infoSectionStyle" class="info-section-animate">
          <h3 :style="{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '2rem' }">
            Contact Information
          </h3>
          
          <div :style="{ display: 'flex', flexDirection: 'column', gap: '2rem' }">
            <div v-for="(info, index) in contactInfo" :key="index" class="info-card" :class="`info-card-${index}`">
              <div :style="iconBoxStyle(info.color)" class="info-icon-box">
                {{ info.icon }}
              </div>
              <div class="info-text-content">
                <h4 :style="{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: '0 0 0.5rem 0' }">
                  {{ info.title }}
                </h4>
                <p :style="{ color: '#64748b', margin: '0' }">
                  {{ info.content }}
                </p>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div :style="socialSectionStyle" class="social-section-animate">
            <h4 :style="{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }">
              Connect With Us
            </h4>
            <div :style="socialLinksStyle">
              <a
                v-for="(social, index) in socialMedia"
                :key="index"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                :style="socialLinkStyle(social.color)"
                class="social-link"
              >
                <img v-if="social.image" :src="social.image" :alt="social.name" :style="{ width: '1.5rem', height: '1.5rem', objectFit: 'contain' }" />
                <span v-else style="font-size: 1.5rem">{{ social.icon }}</span>
              </a>
            </div>
          </div>

          <!-- Office Hours -->
          <div :style="officeHoursStyle" class="office-hours-animate">
            <h4 :style="{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }">
              ⏰ Office Hours
            </h4>
            <div :style="{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#64748b' }">
              <div :style="{ display: 'flex', justifyContent: 'space-between' }">
                <span>Monday - Friday</span>
                <span :style="{ fontWeight: '600' }">8:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div :style="formSectionStyle" class="form-section-animate">
          <div :style="formCardStyle" class="form-card-premium">
            <h3 :style="{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }">
              Send Us a Message
            </h3>
            <p :style="{ color: '#64748b', marginBottom: '2rem' }">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form @submit.prevent="handleSubmit" :style="{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }">
              <div class="form-group">
                <label for="name" :style="labelStyle">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  v-model="formData.name"
                  required
                  :style="inputStyle"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="email" :style="labelStyle">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  v-model="formData.email"
                  required
                  :style="inputStyle"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="subject" :style="labelStyle">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="How can we help?"
                  v-model="formData.subject"
                  :style="inputStyle"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label for="message" :style="labelStyle">
                  Message/Prayer Request *
                </label>
                <textarea
                  id="message"
                  placeholder="Your message here..."
                  rows="6"
                  v-model="formData.message"
                  required
                  :style="textareaStyle"
                  class="form-textarea"
                ></textarea>
              </div>
              <button type="submit" :style="submitButtonStyle" class="submit-button-premium" :disabled="isSubmitting">
                {{ isSubmitting ? '⏳ Sending...' : '💌 Send Message' }}
              </button>
            </form>

            <!-- Success Message -->
            <div v-if="successMessage" :style="successMessageStyle" class="success-animate">
              ✓ {{ successMessage }}
            </div>
            
            <!-- Error Message -->
            <div v-if="errorMessage" :style="errorMessageStyle" class="error-animate">
              ✗ {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const formData = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const successMessage = ref("");
const errorMessage = ref("");
const isSubmitting = ref(false);

const contactInfo = ref([
  {
    title: "📍 Address",
    content: "Papa Araromi,Randa Area,P.O Box952,Ogbomoso, Oyo State, Nigeria",
    icon: "📍",
    color: "#2563eb"
  },
  {
    title: "📱 Phone",
    content: "(+234) 08033797256, (+234) 08158891331",
    icon: "📱",
    color: "#3b82f6"
  },
  {
    title: "📧 Email",
    content: "info@thegladtidingsbaptist.org",
    icon: "📧",
    color: "#60a5fa"
  },
]);

const socialMedia = ref([
  {
    name: "Facebook",
    icon: "f",
    url: "https://web.facebook.com/TGTBCOgbomoso",
    color: "#1e40af"
  },
  {
    name: "Instagram",
    icon: "📷",
    image:require('@/assets/Screenshot_from_2025-12-07_12-00-48-removebg-preview (1).png'),
    url: "https://instagram.com",
    color: "#3b82f6"
  },
  {
    name: "YouTube",
    icon: "▶",
    url: "http://youtube.com/@tgtbcogbomoso",
    color: "#ef4444"
  },
  {
    name: "Whatsapp",
    icon: "💬",
    image: require('@/assets/Screenshot_from_2025-12-07_12-00-06-removebg-preview.png'),
    url: "https://whatsapp.com/channel/0029VbBEE7F1Hsq0COokRC39",
    color: "#000000"
  },
]);

const sectionStyle = {
  paddingTop: '6rem',
  paddingBottom: '6rem',
  position: 'relative',
  backgroundColor: '#f8fafc'
};

const backgroundStyle = {
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
  pointerEvents: 'none'
};

const containerStyle = {
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  position: 'relative'
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
  marginRight: 'auto'
};

const mainGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '3rem'
};

const infoSectionStyle = {
  display: 'flex',
  flexDirection: 'column'
};

// const infoCardStyle = {
//   display: 'flex',
//   gap: '1rem',
//   alignItems: 'flex-start',
//   padding: '1.5rem',
//   backgroundColor: '#ffffff',
//   borderRadius: '1rem',
//   border: '1px solid #e2e8f0',
//   transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
// };

const iconBoxStyle = (color) => ({
  width: '3.5rem',
  height: '3.5rem',
  borderRadius: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  backgroundColor: `${color}20`,
  flexShrink: 0,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
});

const socialSectionStyle = {
  marginTop: '2rem',
  paddingTop: '2rem',
  borderTop: '2px solid #e2e8f0'
};

const socialLinksStyle = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap'
};

const socialLinkStyle = (color) => ({
  width: '3rem',
  height: '3rem',
  borderRadius: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: `${color}15`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  textDecoration: 'none',
  color: color
});

const officeHoursStyle = {
  marginTop: '2rem',
  padding: '1.5rem',
  backgroundColor: '#ffffff',
  borderRadius: '1rem',
  boxShadow: '0 4px 20px -2px rgba(0,0,0,0.08)',
  border: '1px solid #e2e8f0'
};

const formSectionStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const formCardStyle = {
  padding: '2rem',
  backgroundColor: '#ffffff',
  borderRadius: '1.5rem',
  boxShadow: '0 4px 20px -2px rgba(0,0,0,0.08)',
  border: '1px solid #e2e8f0'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.95rem',
  fontWeight: '600',
  color: '#0f172a',
  marginBottom: '0.5rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '2px solid #e2e8f0',
  borderRadius: '0.75rem',
  fontSize: '0.95rem',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxSizing: 'border-box'
};

const textareaStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '2px solid #e2e8f0',
  borderRadius: '0.75rem',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxSizing: 'border-box',
  resize: 'vertical'
};

const submitButtonStyle = {
  width: '100%',
  padding: '1rem',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  border: 'none',
  borderRadius: '0.75rem',
  fontSize: '1rem',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 15px -2px rgba(37, 99, 235, 0.3)'
};

const successMessageStyle = {
  marginTop: '1.5rem',
  padding: '1rem',
  backgroundColor: '#dcfce7',
  color: '#166534',
  borderRadius: '0.75rem',
  border: '1px solid #bbf7d0',
  textAlign: 'center',
  fontWeight: '600'
};

const errorMessageStyle = {
  marginTop: '1.5rem',
  padding: '1rem',
  backgroundColor: '#fee2e2',
  color: '#991b1b',
  borderRadius: '0.75rem',
  border: '1px solid #fecaca',
  textAlign: 'center',
  fontWeight: '600'
};

const handleSubmit = async () => {
  if (isSubmitting.value) return;
  
  try {
    isSubmitting.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    // Post to Laravel backend
    const response = await axios.post('http://127.0.0.1:8001/api/contact', formData.value);
    
    console.log('Contact form response:', response.data); // Debug log
    
    if (response.data.success || response.status === 200) {
      successMessage.value = response.data.message || "Message sent successfully! We'll get back to you soon.";
      formData.value = { name: "", email: "", subject: "", message: "" };
      setTimeout(() => {
        successMessage.value = "";
      }, 5000);
    }
  } catch (error) {
    console.error('Error sending message:', error);
    console.log('Error details:', error.response?.data); // Debug log
    errorMessage.value = error.response?.data?.message || "Failed to send message. Please try again later.";
    setTimeout(() => {
      errorMessage.value = "";
    }, 5000);
  } finally {
    isSubmitting.value = false;
  }
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

.contact-header-animate {
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

.contact-grid-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
}

.info-section-animate {
  animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
}

.info-card {
  animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.info-card-0 { animation-delay: 0.6s; }
.info-card-1 { animation-delay: 0.7s; }
.info-card-2 { animation-delay: 0.8s; }

.info-card:hover {
  transform: translateX(8px);
  border-color: rgba(37, 99, 235, 0.3);
  box-shadow: 0 12px 24px -5px rgba(37, 99, 235, 0.15);
}

.info-card:hover .info-icon-box {
  transform: scale(1.1) rotate(-5deg);
  background-color: rgba(37, 99, 235, 0.15);
}

.social-section-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.9s both;
}

.office-hours-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1s both;
}

.social-link:hover {
  transform: translateY(-4px) scale(1.1);
  background-color: rgba(37, 99, 235, 0.3) !important;
}

.form-section-animate {
  animation: slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
}

.form-card-premium {
  border: 1px solid #e2e8f0;
}

.form-group {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-group:nth-child(1) { animation-delay: 0.6s; }
.form-group:nth-child(2) { animation-delay: 0.7s; }
.form-group:nth-child(3) { animation-delay: 0.8s; }
.form-group:nth-child(4) { animation-delay: 0.9s; }

.form-input:focus,
.form-textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  outline: none;
}

.submit-button-premium:hover {
  background-color: #1d4ed8;
  transform: translateY(-4px);
  box-shadow: 0 12px 32px -5px rgba(37, 99, 235, 0.4);
}

.submit-button-premium:active {
  transform: translateY(-2px);
}

.success-animate {
  animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Base overflow prevention */
#contact {
  overflow-x: hidden !important;
  width: 100% !important;
  max-width: 100vw !important;
}

#contact * {
  box-sizing: border-box !important;
  max-width: 100% !important;
}

.info-card {
  display: flex !important;
  gap: 1rem !important;
  align-items: flex-start !important;
  padding: 1.5rem !important;
  background-color: #ffffff !important;
  border-radius: 1rem !important;
  border: 1px solid #e2e8f0 !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  overflow: hidden !important;
  word-wrap: break-word !important;
  word-break: break-word !important;
}

.info-text-content {
  flex: 1 !important;
  min-width: 0 !important;
  overflow: hidden !important;
}

.info-text-content p {
  word-wrap: break-word !important;
  word-break: break-word !important;
  overflow-wrap: break-word !important;
}

/* ===== APPLE DEVICE BREAKPOINTS ===== */

/* iPad Pro 12.9" & 11" (1366px+) */
@media (min-width: 1366px) {
  #contact {
    padding-top: 6rem !important;
    padding-bottom: 6rem !important;
  }
}

/* iPad Air & Standard (1024px - 1365px) */
@media (min-width: 1024px) and (max-width: 1365px) {
  #contact {
    padding-top: 5rem !important;
    padding-bottom: 5rem !important;
  }
  
  div[style*="containerStyle"] {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
  }
  
  div[style*="mainGridStyle"] {
    gap: 2.5rem !important;
  }
}

/* iPad Mini (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  #contact {
    padding-top: 4rem !important;
    padding-bottom: 4rem !important;
  }
  
  div[style*="containerStyle"] {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
  }
  
  div[style*="mainGridStyle"] {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
  
  div[style*="titleStyle"] {
    font-size: 2rem !important;
  }
  
  div[style*="subtitleStyle"] {
    font-size: 1.05rem !important;
  }
}

/* iPhone Pro Max 6.9" (520px - 767px) */
@media (min-width: 520px) and (max-width: 767px) {
  #contact {
    padding-top: 3.5rem !important;
    padding-bottom: 3.5rem !important;
  }
  
  div[style*="containerStyle"] {
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
  }
  
  div[style*="headerStyle"] {
    margin-bottom: 2.5rem !important;
  }
  
  div[style*="mainGridStyle"] {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
  
  div[style*="titleStyle"] {
    font-size: 1.85rem !important;
  }
  
  div[style*="subtitleStyle"] {
    font-size: 1rem !important;
  }
  
  .info-card {
    flex-direction: column !important;
    padding: 1.25rem !important;
  }
  
  div[style*="formCardStyle"] {
    padding: 1.5rem !important;
  }
}

/* iPhone Plus 6.7" (480px - 519px) */
@media (min-width: 480px) and (max-width: 519px) {
  #contact {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  
  div[style*="containerStyle"] {
    padding-left: 1.15rem !important;
    padding-right: 1.15rem !important;
  }
  
  div[style*="headerStyle"] {
    margin-bottom: 2.25rem !important;
  }
  
  div[style*="mainGridStyle"] {
    grid-template-columns: 1fr !important;
    gap: 1.8rem !important;
  }
  
  div[style*="titleStyle"] {
    font-size: 1.75rem !important;
  }
  
  div[style*="subtitleStyle"] {
    font-size: 0.95rem !important;
  }
  
  .info-card {
    flex-direction: column !important;
    padding: 1.15rem !important;
  }
  
  div[style*="formCardStyle"] {
    padding: 1.35rem !important;
  }
}

/* iPhone Standard 6.1" (430px - 479px) */
@media (min-width: 430px) and (max-width: 479px) {
  #contact {
    padding-top: 2.8rem !important;
    padding-bottom: 2.8rem !important;
  }
  
  div[style*="containerStyle"] {
    padding-left: 1.05rem !important;
    padding-right: 1.05rem !important;
  }
  
  div[style*="headerStyle"] {
    margin-bottom: 2rem !important;
  }
  
  div[style*="mainGridStyle"] {
    grid-template-columns: 1fr !important;
    gap: 1.65rem !important;
  }
  
  div[style*="titleStyle"] {
    font-size: 1.65rem !important;
  }
  
  div[style*="subtitleStyle"] {
    font-size: 0.92rem !important;
  }
  
  div[style*="badgeStyle"] {
    font-size: 0.7rem !important;
    padding: 0.45rem 0.9rem !important;
  }
  
  .info-card {
    flex-direction: column !important;
    padding: 1.05rem !important;
  }
  
  div[style*="formCardStyle"] {
    padding: 1.25rem !important;
  }
  
  div[style*="inputStyle"],
  div[style*="textareaStyle"] {
    padding: 0.65rem 0.9rem !important;
    font-size: 0.9rem !important;
  }
}

/* iPhone Small 5.4" (390px - 429px) */
@media (min-width: 390px) and (max-width: 429px) {
  #contact {
    padding-top: 2.5rem !important;
    padding-bottom: 2.5rem !important;
  }
  
  div[style*="containerStyle"] {
    padding-left: 0.95rem !important;
    padding-right: 0.95rem !important;
  }
  
  div[style*="headerStyle"] {
    margin-bottom: 1.8rem !important;
  }
  
  div[style*="mainGridStyle"] {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
  }
  
  div[style*="titleStyle"] {
    font-size: 1.55rem !important;
  }
  
  div[style*="subtitleStyle"] {
    font-size: 0.88rem !important;
  }
  
  div[style*="badgeStyle"] {
    font-size: 0.68rem !important;
    padding: 0.4rem 0.85rem !important;
  }
  
  .info-card {
    flex-direction: column !important;
    padding: 0.95rem !important;
  }
  
  div[style*="formCardStyle"] {
    padding: 1.15rem !important;
  }
  
  div[style*="inputStyle"],
  div[style*="textareaStyle"] {
    padding: 0.6rem 0.85rem !important;
    font-size: 0.88rem !important;
  }
  
  div[style*="submitButtonStyle"] {
    padding: 0.9rem !important;
    font-size: 0.93rem !important;
  }
}

/* ===== ANDROID DEVICE BREAKPOINTS ===== */

/* Android Tablets - High Resolution (1800px - Pixel C, Galaxy Tab S) */
@media (min-width: 1800px) and (max-width: 2560px) {
  #contact {
    padding-top: 6.5rem !important;
    padding-bottom: 6.5rem !important;
  }
  
  div[style*="mainGridStyle"] {
    gap: 3.2rem !important;
  }
}

/* Android Tablets - Standard (1280px-1800px - Nexus 9, Galaxy Tab) */
@media (min-width: 1280px) and (max-width: 1799px) {
  #contact {
    padding-top: 5.5rem !important;
    padding-bottom: 5.5rem !important;
  }
  
  div[style*="containerStyle"] {
    padding-left: 1.8rem !important;
    padding-right: 1.8rem !important;
  }
  
  div[style*="mainGridStyle"] {
    gap: 2.8rem !important;
  }
}

/* Android Tablets - Small (800px-1279px) */
@media (min-width: 800px) and (max-width: 1279px) {
  #contact {
    padding-top: 4.5rem !important;
    padding-bottom: 4.5rem !important;
  }
  
  div[style*="containerStyle"] {
    padding-left: 1.6rem !important;
    padding-right: 1.6rem !important;
  }
  
  div[style*="mainGridStyle"] {
    grid-template-columns: 1fr !important;
    gap: 2.2rem !important;
  }
  
  div[style*="titleStyle"] {
    font-size: 2.15rem !important;
  }
  
  div[style*="subtitleStyle"] {
    font-size: 1.08rem !important;
  }
}

/* Android High-End Flagships - QHD/QHD+ (720px wide) */
@media (min-width: 720px) and (max-width: 799px) {
  #contact {
    padding-top: 3.8rem !important;
    padding-bottom: 3.8rem !important;
  }
  
  div[style*="containerStyle"] {
    padding-left: 1.35rem !important;
    padding-right: 1.35rem !important;
  }
  
  div[style*="headerStyle"] {
    margin-bottom: 2.6rem !important;
  }
  
  div[style*="mainGridStyle"] {
    grid-template-columns: 1fr !important;
    gap: 2.05rem !important;
  }
  
  div[style*="titleStyle"] {
    font-size: 1.92rem !important;
  }
  
  div[style*="subtitleStyle"] {
    font-size: 1.02rem !important;
  }
  
  .info-card {
    flex-direction: column !important;
    padding: 1.28rem !important;
  }
  
  div[style*="formCardStyle"] {
    padding: 1.58rem !important;
  }
}

/* Android Mid-Range/Flagships - FHD/FHD+ (540px wide) */
@media (min-width: 540px) and (max-width: 719px) {
  #contact {
    padding-top: 3.4rem !important;
    padding-bottom: 3.4rem !important;
  }
  
  div[style*="containerStyle"] {
    padding-left: 1.22rem !important;
    padding-right: 1.22rem !important;
  }
  
  div[style*="headerStyle"] {
    margin-bottom: 2.35rem !important;
  }
  
  div[style*="mainGridStyle"] {
    grid-template-columns: 1fr !important;
    gap: 1.88rem !important;
  }
  
  div[style*="titleStyle"] {
    font-size: 1.82rem !important;
  }
  
  div[style*="subtitleStyle"] {
    font-size: 0.98rem !important;
  }
  
  .info-card {
    flex-direction: column !important;
    padding: 1.18rem !important;
  }
  
  div[style*="formCardStyle"] {
    padding: 1.42rem !important;
  }
  
  div[style*="inputStyle"],
  div[style*="textareaStyle"] {
    padding: 0.68rem 0.92rem !important;
    font-size: 0.92rem !important;
  }
}

/* Android Small Phones/Budget - HD/HD+ (360px - 539px wide) */
@media (max-width: 539px) and (min-width: 360px) {
  #contact {
    padding-top: 2.8rem !important;
    padding-bottom: 2.8rem !important;
  }
  
  div[style*="containerStyle"] {
    padding-left: 1.08rem !important;
    padding-right: 1.08rem !important;
  }
  
  div[style*="headerStyle"] {
    margin-bottom: 2.05rem !important;
  }
  
  div[style*="mainGridStyle"] {
    grid-template-columns: 1fr !important;
    gap: 1.68rem !important;
    display: block !important;
  }
  
  div[style*="infoSectionStyle"],
  div[style*="formSectionStyle"] {
    display: block !important;
    width: 100% !important;
    margin-bottom: 1.68rem !important;
  }
  
  div[style*="titleStyle"] {
    font-size: 1.68rem !important;
  }
  
  div[style*="subtitleStyle"] {
    font-size: 0.9rem !important;
  }
  
  div[style*="badgeStyle"] {
    font-size: 0.69rem !important;
    padding: 0.42rem 0.87rem !important;
  }
  
  .info-card {
    flex-direction: column !important;
    padding: 1.02rem !important;
    margin-bottom: 1.15rem !important;
  }
  
  div[style*="iconBoxStyle"] {
    width: 3rem !important;
    height: 3rem !important;
    font-size: 1.35rem !important;
  }
  
  div[style*="socialSectionStyle"] {
    margin-top: 1.68rem !important;
    padding-top: 1.68rem !important;
  }
  
  div[style*="socialLinksStyle"] {
    gap: 0.88rem !important;
    justify-content: center !important;
  }
  
  div[style*="officeHoursStyle"] {
    margin-top: 1.68rem !important;
    padding: 1.28rem !important;
  }
  
  div[style*="formCardStyle"] {
    padding: 1.28rem !important;
  }
  
  div[style*="inputStyle"],
  div[style*="textareaStyle"] {
    padding: 0.62rem 0.88rem !important;
    font-size: 0.9rem !important;
  }
  
  div[style*="submitButtonStyle"] {
    padding: 0.88rem !important;
    font-size: 0.95rem !important;
  }
}

/* Android Foldables - Unfolded State (wide landscape ~2208px-1768px) */
@media (min-width: 1768px) and (max-width: 2208px) and (orientation: landscape) {
  #contact {
    padding-top: 5.8rem !important;
    padding-bottom: 5.8rem !important;
  }
  
  div[style*="mainGridStyle"] {
    gap: 3rem !important;
  }
}

/* Android Foldables - Folded/Cover Screen (narrow ~277px-359px) */
@media (min-width: 277px) and (max-width: 359px) {
  #contact {
    padding-top: 2.2rem !important;
    padding-bottom: 2.2rem !important;
  }
  
  div[style*="containerStyle"] {
    padding-left: 0.85rem !important;
    padding-right: 0.85rem !important;
  }
  
  div[style*="headerStyle"] {
    margin-bottom: 1.6rem !important;
  }
  
  div[style*="mainGridStyle"] {
    grid-template-columns: 1fr !important;
    gap: 1.4rem !important;
    display: block !important;
  }
  
  div[style*="infoSectionStyle"],
  div[style*="formSectionStyle"] {
    display: block !important;
    width: 100% !important;
    margin-bottom: 1.4rem !important;
  }
  
  div[style*="titleStyle"] {
    font-size: 1.42rem !important;
    line-height: 1.3 !important;
  }
  
  div[style*="subtitleStyle"] {
    font-size: 0.82rem !important;
  }
  
  div[style*="badgeStyle"] {
    font-size: 0.62rem !important;
    padding: 0.35rem 0.75rem !important;
  }
  
  .info-card {
    flex-direction: column !important;
    padding: 0.88rem !important;
    margin-bottom: 0.95rem !important;
  }
  
  .info-card h4 {
    font-size: 0.95rem !important;
  }
  
  .info-card p {
    font-size: 0.8rem !important;
    line-height: 1.4 !important;
  }
  
  div[style*="iconBoxStyle"] {
    width: 2.6rem !important;
    height: 2.6rem !important;
    font-size: 1.2rem !important;
  }
  
  div[style*="socialSectionStyle"] {
    margin-top: 1.4rem !important;
    padding-top: 1.4rem !important;
  }
  
  div[style*="socialSectionStyle"] h4 {
    font-size: 1.05rem !important;
  }
  
  div[style*="socialLinksStyle"] {
    gap: 0.7rem !important;
    justify-content: center !important;
  }
  
  div[style*="socialLinkStyle"] {
    width: 2.5rem !important;
    height: 2.5rem !important;
  }
  
  div[style*="socialLinkStyle"] img {
    width: 1.25rem !important;
    height: 1.25rem !important;
  }
  
  div[style*="officeHoursStyle"] {
    margin-top: 1.4rem !important;
    padding: 1.05rem !important;
  }
  
  div[style*="officeHoursStyle"] h4 {
    font-size: 0.95rem !important;
  }
  
  div[style*="formCardStyle"] {
    padding: 1.05rem !important;
  }
  
  div[style*="formCardStyle"] h3 {
    font-size: 1.42rem !important;
  }
  
  div[style*="formCardStyle"] p {
    font-size: 0.82rem !important;
  }
  
  div[style*="labelStyle"] {
    font-size: 0.85rem !important;
  }
  
  div[style*="inputStyle"],
  div[style*="textareaStyle"] {
    padding: 0.55rem 0.75rem !important;
    font-size: 0.82rem !important;
  }
  
  div[style*="submitButtonStyle"] {
    padding: 0.78rem !important;
    font-size: 0.88rem !important;
  }
}
</style>
