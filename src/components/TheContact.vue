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

@media (max-width: 1024px) {
  div[style*="mainGridStyle"] {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  div[style*="titleStyle"] {
    font-size: 1.875rem;
  }
}
</style>
