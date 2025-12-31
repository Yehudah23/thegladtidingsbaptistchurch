<template>
  <div id="app">
    <TheHeader />
    <router-view />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style>
/* ===== GLOBAL OVERFLOW PREVENTION ===== */
* {
  box-sizing: border-box !important;
}

html {
  overflow-x: hidden !important;
  max-width: 100vw !important;
  width: 100% !important;
}

body {
  overflow-x: hidden !important;
  max-width: 100vw !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden !important;
  max-width: 100vw !important;
  width: 100% !important;
  background-image: url('@/assets/logo.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

/* Prevent all children from overflowing */
#app > * {
  max-width: 100vw !important;
  overflow-x: hidden !important;
}

/* Ensure all sections stay within bounds */
section,
div,
header,
footer,
main,
article,
aside {
  max-width: 100% !important;
  overflow-wrap: break-word !important;
  word-wrap: break-word !important;
}

/* Prevent images and media from overflowing */
img,
video,
iframe,
embed,
object {
  max-width: 100% !important;
  height: auto !important;
}

/* Prevent text overflow */
p,
h1,
h2,
h3,
h4,
h5,
h6,
span,
a,
li {
  overflow-wrap: break-word !important;
  word-wrap: break-word !important;
  word-break: break-word !important;
  hyphens: auto !important;
}

/* Prevent pre and code blocks from overflowing */
pre,
code {
  white-space: pre-wrap !important;
  word-wrap: break-word !important;
  overflow-x: auto !important;
}

/* Ensure tables are responsive */
table {
  max-width: 100% !important;
  overflow-x: auto !important;
  display: block !important;
}

#app::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/logo.png');
  background-size: cover;
  background-position: center;
  opacity: 0.1;
  z-index: -1;
}

/* ===== RESPONSIVE OVERFLOW FIXES FOR ALL DEVICES ===== */

/* Apple & Android - All Devices */
@media (max-width: 2560px) {
  html,
  body,
  #app {
    overflow-x: hidden !important;
    max-width: 100vw !important;
  }
  
  * {
    max-width: 100% !important;
  }
}

/* Tablets and below */
@media (max-width: 1024px) {
  body {
    overflow-x: hidden !important;
  }
  
  #app > * {
    padding-left: clamp(0.5rem, 2vw, 2rem) !important;
    padding-right: clamp(0.5rem, 2vw, 2rem) !important;
  }
}

/* Mobile devices */
@media (max-width: 768px) {
  html {
    overflow-x: hidden !important;
  }
  
  body {
    overflow-x: hidden !important;
    position: relative !important;
  }
  
  #app {
    overflow-x: hidden !important;
    width: 100% !important;
  }
  
  * {
    max-width: 100% !important;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  html,
  body {
    overflow-x: hidden !important;
    max-width: 100vw !important;
  }
  
  #app,
  #app > * {
    overflow-x: hidden !important;
    max-width: 100vw !important;
  }
}

/* Very small devices and foldables */
@media (max-width: 360px) {
  * {
    overflow-x: hidden !important;
    max-width: 100vw !important;
  }
  
  section,
  div {
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
  }
}
</style>
