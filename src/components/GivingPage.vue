<template>
  <section id="giving" :style="sectionStyle">
    <div :style="containerStyle">
      <!-- Header -->
      <div :style="headerStyle" class="header-animate">
        <span :style="badgeStyle" class="badge-animate">GIVING</span>
        <h2 :style="titleStyle" class="title-animate">
          Support Our Ministry
        </h2>
        <p :style="subtitleStyle" class="subtitle-animate">
          Your generous giving helps us spread the Gospel and serve our community
        </p>
      </div>

      <!-- Bible Verse -->
      <div :style="verseBoxStyle" class="verse-animate">
        <p :style="verseTextStyle">
          "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
        </p>
        <p :style="verseReferenceStyle">- 2 Corinthians 9:7</p>
      </div>

      <!-- Bank Accounts Grid -->
      <div :style="banksGridStyle">
        <!-- First Bank -->
        <div :style="bankCardStyle" class="bank-card bank-card-1">
          <div :style="bankHeaderStyle">
            <div :style="bankIconStyle">
              <img src="@/assets/Screenshot from 2025-12-22 09-39-19.png" alt="First Bank Logo" :style="bankLogoStyle" />
            </div>
            <h3 :style="bankNameStyle">First Bank</h3>
          </div>
          <div :style="accountsContainerStyle">
            <div :style="accountItemStyle">
              <div :style="accountTypeStyle">Tithes</div>
              <div :style="accountDetailsStyle">
                <div :style="accountNumberStyle">2002506603</div>
                <div :style="accountNameStyle">TGTBC, Ogb.</div>
              </div>
            </div>
            <div :style="accountItemStyle">
              <div :style="accountTypeStyle">Mission</div>
              <div :style="accountDetailsStyle">
                <div :style="accountNumberStyle">3109249406</div>
                <div :style="accountNameStyle">TGTBC, Ogb.</div>
              </div>
            </div>
            <div :style="accountItemStyle">
              <div :style="accountTypeStyle">Capital Project</div>
              <div :style="accountDetailsStyle">
                <div :style="accountNumberStyle">3136266083</div>
                <div :style="accountNameStyle">TGTBC, Ogb.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Randalpha MFB -->
        <div :style="bankCardStyle" class="bank-card bank-card-2">
          <div :style="bankHeaderStyle">
            <div :style="bankIconStyle">🏦</div>
            <h3 :style="bankNameStyle">Randalpha MFB</h3>
          </div>
          <div :style="accountsContainerStyle">
            <div :style="accountItemStyle">
              <div :style="accountTypeStyle">Tithes and Offerings</div>
              <div :style="accountDetailsStyle">
                <div :style="accountNumberStyle">1100095861</div>
                <div :style="accountNameStyle">TGTBC, Ogb.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Access Bank -->
        <div :style="bankCardStyle" class="bank-card bank-card-3">
          <div :style="bankHeaderStyle">
            <div :style="bankIconStyle">
              <img src="@/assets/accessbank.png" alt="Access Bank Logo" :style="bankLogoStyle" />
            </div>
            <h3 :style="bankNameStyle">Access Bank</h3>
          </div>
          <div :style="accountsContainerStyle">
            <div :style="accountItemStyle">
              <div :style="accountTypeStyle">Thanksgiving/Special Gifts/Vow/1st Fruits</div>
              <div :style="accountDetailsStyle">
                <div :style="accountNumberStyle">1598868443</div>
                <div :style="accountNameStyle">TGTBC Ogb.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Zenith Bank -->
        <div :style="bankCardStyle" class="bank-card bank-card-4">
          <div :style="bankHeaderStyle">
            <div :style="bankIconStyle">
              <img src="@/assets/zenithbank.png" alt="Zenith Bank Logo" :style="bankLogoStyle" />
            </div>
            <h3 :style="bankNameStyle">Zenith Bank</h3>
          </div>
          <div :style="accountsContainerStyle">
            <div :style="accountItemStyle">
              <div :style="accountTypeStyle">Care Ministry</div>
              <div :style="accountDetailsStyle">
                <div :style="accountNumberStyle">1310743485</div>
                <div :style="accountNameStyle">The Glad Tidings B.C ogb.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Impact Section -->
      <div :style="impactSectionStyle" class="impact-section-animate">
        <h3 :style="impactTitleStyle">Your Giving Makes a Difference</h3>
        <div :style="impactGridStyle">
          <div :style="impactCardStyle" class="impact-card">
            <div :style="impactIconStyle">🌍</div>
            <h4 :style="impactCardTitleStyle">Mission & Evangelism</h4>
            <p :style="impactCardTextStyle">Supporting missionaries and spreading the Gospel locally and internationally</p>
          </div>
          <div :style="impactCardStyle" class="impact-card">
            <div :style="impactIconStyle">⛪</div>
            <h4 :style="impactCardTitleStyle">Church Development</h4>
            <p :style="impactCardTextStyle">Building and maintaining facilities to serve our growing congregation</p>
          </div>
          <div :style="impactCardStyle" class="impact-card">
            <div :style="impactIconStyle">💙</div>
            <h4 :style="impactCardTitleStyle">Care Ministry</h4>
            <p :style="impactCardTextStyle">Supporting members in need and serving our local community</p>
          </div>
          <div :style="impactCardStyle" class="impact-card">
            <div :style="impactIconStyle">📚</div>
            <h4 :style="impactCardTitleStyle">Discipleship</h4>
            <p :style="impactCardTextStyle">Providing resources and training for spiritual growth and development</p>
          </div>
        </div>
      </div>

      <!-- Contact Info -->
      <div :style="contactBoxStyle" class="contact-animate">
        <p :style="contactTextStyle">
          For more information about giving or if you need assistance, please contact our finance team at 
          <a href="mailto:info@thegladtidingsbaptist.org" :style="contactLinkStyle">info@thegladtidingsbaptist.org</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const sectionStyle = {
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
  textAlign: 'center',
  marginBottom: '3rem'
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

const verseBoxStyle = {
  backgroundColor: '#dbeafe',
  padding: '2rem',
  borderRadius: '1rem',
  marginBottom: '3rem',
  textAlign: 'center',
  border: '2px solid #3b82f6'
};

const verseTextStyle = {
  fontSize: '1.2rem',
  fontStyle: 'italic',
  color: '#1e40af',
  marginBottom: '1rem',
  lineHeight: '1.8'
};

const verseReferenceStyle = {
  fontSize: '1rem',
  fontWeight: '600',
  color: '#2563eb'
};

const banksGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem',
  marginBottom: '4rem'
};

const bankCardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '1.5rem',
  padding: '2rem',
  boxShadow: '0 4px 20px -2px rgba(0,0,0,0.08)',
  border: '1px solid #e2e8f0',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const bankHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '1.5rem',
  paddingBottom: '1rem',
  borderBottom: '2px solid #e2e8f0'
};

const bankIconStyle = {
  fontSize: '2rem',
  width: '3rem',
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#dbeafe',
  borderRadius: '0.75rem'
};

const bankLogoStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  padding: '0.25rem'
};

const bankNameStyle = {
  fontSize: '1.5rem',
  fontWeight: '700',
  color: '#0f172a',
  margin: 0
};

const accountsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const accountItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const accountTypeStyle = {
  fontSize: '0.875rem',
  fontWeight: '600',
  color: '#2563eb',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const accountDetailsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem'
};

const accountNumberStyle = {
  fontSize: '1.25rem',
  fontWeight: '700',
  color: '#0f172a',
  fontFamily: 'monospace'
};

const accountNameStyle = {
  fontSize: '0.95rem',
  color: '#64748b'
};

const impactSectionStyle = {
  marginBottom: '3rem'
};

const impactTitleStyle = {
  fontSize: '2rem',
  fontWeight: '800',
  color: '#0f172a',
  textAlign: 'center',
  marginBottom: '2rem'
};

const impactGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem'
};

const impactCardStyle = {
  backgroundColor: '#ffffff',
  padding: '2rem',
  borderRadius: '1rem',
  textAlign: 'center',
  border: '1px solid #e2e8f0',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const impactIconStyle = {
  fontSize: '3rem',
  marginBottom: '1rem'
};

const impactCardTitleStyle = {
  fontSize: '1.25rem',
  fontWeight: '700',
  color: '#0f172a',
  marginBottom: '0.75rem'
};

const impactCardTextStyle = {
  fontSize: '0.95rem',
  color: '#64748b',
  lineHeight: '1.6'
};

const contactBoxStyle = {
  backgroundColor: '#f1f5f9',
  padding: '2rem',
  borderRadius: '1rem',
  textAlign: 'center'
};

const contactTextStyle = {
  fontSize: '1.05rem',
  color: '#475569',
  margin: 0
};

const contactLinkStyle = {
  color: '#2563eb',
  fontWeight: '600',
  textDecoration: 'none',
  transition: 'color 0.3s ease'
};
</script>

<style scoped>
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

.header-animate {
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

.verse-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
}

.bank-card {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.bank-card-1 { animation-delay: 0.5s; }
.bank-card-2 { animation-delay: 0.6s; }
.bank-card-3 { animation-delay: 0.7s; }
.bank-card-4 { animation-delay: 0.8s; }

.bank-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px -5px rgba(37, 99, 235, 0.2);
}

.impact-section-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.9s both;
}

.impact-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px -5px rgba(0, 0, 0, 0.15);
  border-color: #2563eb;
}

.contact-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1s both;
}

.contact-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

@media (max-width: 768px) {
  div[style*="titleStyle"] {
    font-size: 1.875rem;
  }

  div[style*="banksGridStyle"] {
    grid-template-columns: 1fr;
  }

  div[style*="impactGridStyle"] {
    grid-template-columns: 1fr;
  }
}
</style>
