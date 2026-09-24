<template>
  <q-layout view="lHh Lpr lff">
    <a href="#main-content" class="l-skip-link" @click.prevent="focusMain">
      Skip to content
    </a>

    <q-header class="l-header">
      <q-toolbar class="l-wrap l-header__bar">
        <q-btn
          flat
          round
          dense
          icon="menu"
          class="lt-md q-mr-sm l-header__icon-btn"
          aria-label="Open navigation menu"
          aria-controls="mobile-nav"
          :aria-expanded="leftDrawerOpen ? 'true' : 'false'"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <router-link :to="{ name: 'home' }" class="l-brand l-grow" aria-label="Nabila Hannania, home">
          <span class="l-brand__mark" aria-hidden="true">{{ profile.initials }}</span>
          <span class="l-brand__name">{{ profile.name }}</span>
        </router-link>

        <nav class="gt-sm" aria-label="Main">
          <ul class="l-nav">
            <li v-for="item in navItems" :key="item.name">
              <q-btn
                flat
                no-caps
                :ripple="false"
                class="l-nav__link"
                :class="{ 'l-nav__link--active': route.name === item.name }"
                :label="item.label"
                :to="{ name: item.name }"
                :aria-current="route.name === item.name ? 'page' : undefined"
              />
            </li>
          </ul>
        </nav>

        <q-btn
          v-if="profile.cvUrl"
          unelevated
          no-caps
          icon="download"
          label="Download CV"
          class="l-btn-primary l-btn-sm gt-xs q-ml-md"
          :href="profile.cvUrl"
          target="_blank"
          rel="noopener noreferrer"
        />

        <q-btn
          flat
          round
          dense
          class="q-ml-sm l-header__icon-btn"
          :icon="isDark ? 'light_mode' : 'dark_mode'"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleDark"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" :width="288">
      <nav id="mobile-nav" class="l-drawer" aria-label="Mobile">
        <div class="l-drawer__head">
          <span class="l-brand">
            <span class="l-brand__mark" aria-hidden="true">{{ profile.initials }}</span>
            <span class="l-brand__name">{{ profile.name }}</span>
          </span>
          <q-btn
            flat
            round
            dense
            icon="close"
            class="l-header__icon-btn"
            aria-label="Close navigation menu"
            @click="leftDrawerOpen = false"
          />
        </div>

        <q-list padding class="l-drawer__list">
          <q-item
            v-for="item in navItems"
            :key="item.name"
            clickable
            class="l-drawer__item"
            :class="{ 'l-drawer__item--active': route.name === item.name }"
            :to="{ name: item.name }"
            :aria-current="route.name === item.name ? 'page' : undefined"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </q-list>

        <div class="l-drawer__foot">
          <q-btn
            v-if="profile.cvUrl"
            unelevated
            no-caps
            icon="download"
            label="Download CV"
            class="l-btn-primary full-width q-mb-md"
            :href="profile.cvUrl"
            target="_blank"
            rel="noopener noreferrer"
          />
          <SocialLinks />
        </div>
      </nav>
    </q-drawer>

    <q-page-container id="main-content" tabindex="-1" class="l-main">
      <router-view></router-view>
    </q-page-container>

    <q-footer class="l-footer">
      <div class="l-wrap l-footer__inner">
        <div>
          <div class="l-footer__name">{{ profile.name }}</div>
          <div class="l-footer__meta">
            © {{ year }} · {{ profile.role }} · {{ profile.location }}
          </div>
        </div>
        <SocialLinks dense />
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref, computed, watch } from "vue";
import useBasic from "@/composables/useBasic";
import SocialLinks from "@/components/SocialLinks.vue";
import { profile } from "@/data/profile";

const THEME_KEY = "l-theme";

const readTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (e) {
    return null;
  }
};

const saveTheme = (value) => {
  try {
    localStorage.setItem(THEME_KEY, value);
  } catch (e) {
    // Storage unavailable (private mode): the theme simply isn't remembered
  }
};

export default {
  name: 'LayoutDefault',

  components: { SocialLinks },

  setup () {
    const { route, router, $q } = useBasic();

    const leftDrawerOpen = ref(false);

    const navItems = [
      { name: "home", label: "Home", icon: "home" },
      { name: "about", label: "About", icon: "person_outline" },
      { name: "skills", label: "Skills", icon: "psychology" },
      { name: "experience", label: "Experience", icon: "work_outline" },
      { name: "projects", label: "Projects", icon: "folder_open" },
      { name: "contact", label: "Contact", icon: "mail_outline" },
    ];

    // Without a saved choice Quasar follows the OS setting (config.dark = "auto")
    const savedTheme = readTheme();
    if (savedTheme === "dark" || savedTheme === "light") {
      $q.dark.set(savedTheme === "dark");
    }

    const isDark = computed(() => $q.dark.isActive);

    const toggleDark = () => {
      $q.dark.set(!$q.dark.isActive);
      saveTheme($q.dark.isActive ? "dark" : "light");
    };

    const focusMain = () => {
      const main = document.getElementById("main-content");
      if (main) {
        main.focus();
      }
    };

    // Close the mobile menu after navigating
    watch(
      () => route.name,
      () => {
        leftDrawerOpen.value = false;
      }
    );

    return {
      leftDrawerOpen,
      router,
      route,
      profile,
      navItems,
      isDark,
      toggleDark,
      focusMain,
      year: new Date().getFullYear(),
    }
  }
}
</script>


<style lang="scss">
/* ---------- Design tokens ---------- */
:root {
  --l-bg: #f8fafc;
  --l-surface: #ffffff;
  --l-surface-2: #f1f5f9;
  --l-text: #0f172a;
  --l-text-muted: #475569;
  --l-border: #e2e8f0;
  --l-border-strong: #cbd5e1;
  --l-accent: #4f46e5;
  --l-accent-hover: #4338ca;
  --l-accent-2: #7c3aed;
  --l-accent-soft: rgba(79, 70, 229, 0.08);
  --l-accent-border: rgba(79, 70, 229, 0.35);
  --l-on-accent: #ffffff;
  --l-glow: rgba(79, 70, 229, 0.16);
  --l-glow-2: rgba(124, 58, 237, 0.1);
  --l-grid-line: rgba(15, 23, 42, 0.05);
  --l-header-bg: rgba(248, 250, 252, 0.82);
  --l-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -12px rgba(15, 23, 42, 0.12);
  --l-shadow-hover: 0 18px 40px -18px rgba(79, 70, 229, 0.35);
  --l-radius: 16px;
  --l-font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
}

body.body--dark {
  --l-bg: #0b1120;
  --l-surface: #111a2e;
  --l-surface-2: #172238;
  --l-text: #e2e8f0;
  --l-text-muted: #94a3b8;
  --l-border: #1f2b44;
  --l-border-strong: #334155;
  --l-accent: #818cf8;
  --l-accent-hover: #a5b4fc;
  --l-accent-2: #a78bfa;
  --l-accent-soft: rgba(129, 140, 248, 0.12);
  --l-accent-border: rgba(129, 140, 248, 0.45);
  --l-on-accent: #0b1120;
  --l-glow: rgba(129, 140, 248, 0.2);
  --l-glow-2: rgba(167, 139, 250, 0.12);
  --l-grid-line: rgba(226, 232, 240, 0.05);
  --l-header-bg: rgba(11, 17, 32, 0.8);
  --l-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 8px 24px -12px rgba(0, 0, 0, 0.5);
  --l-shadow-hover: 0 18px 40px -18px rgba(129, 140, 248, 0.35);
  --q-primary: #818cf8;
  --q-dark: #111a2e;
  --q-dark-page: #0b1120;
  color-scheme: dark;
}

body,
body.body--dark {
  background: var(--l-bg);
  color: var(--l-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// Keeps the overscroll area dark too
:root:has(body.body--dark) {
  background: #0b1120;
}

/* ---------- Accessibility ---------- */
:focus-visible,
.q-btn:focus-visible,
.q-tab:focus-visible,
.q-item:focus-visible {
  outline: 2px solid var(--l-accent);
  outline-offset: 2px;
}

.l-main:focus {
  outline: none;
}

.l-skip-link {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 3000;
  padding: 10px 16px;
  border-radius: 10px;
  background: var(--l-accent);
  color: var(--l-on-accent);
  font-weight: 500;
  text-decoration: none;
  transform: translateY(-200%);
  transition: transform 0.2s ease;

  &:focus {
    transform: translateY(0);
  }
}

.l-sr-only {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ---------- Layout ---------- */
.l-wrap {
  width: 100%;
  max-width: 1160px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
  @media only screen and (max-width: 599.98px) {
    padding-left: 16px;
    padding-right: 16px;
  }
}

.l-section {
  padding-top: 72px;
  padding-bottom: 72px;
  @media only screen and (max-width: 599.98px) {
    padding-top: 48px;
    padding-bottom: 48px;
  }
}

.l-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
}

/* ---------- Header & navigation ---------- */
.q-header.l-header {
  background: var(--l-header-bg);
  color: var(--l-text);
  border-bottom: 1px solid var(--l-border);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
}

.q-toolbar.l-header__bar {
  min-height: 64px;
}

.l-header__icon-btn {
  color: var(--l-text-muted);

  &:hover {
    color: var(--l-accent);
  }
}

.l-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--l-text);
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.01em;
}

.l-brand__mark {
  display: inline-grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--l-accent), var(--l-accent-2));
  color: #ffffff;
  font-family: var(--l-font-mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0;
}

.l-nav {
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.q-btn.l-nav__link {
  position: relative;
  padding: 6px 12px;
  border-radius: 8px;
  color: var(--l-text-muted);
  font-weight: 500;
  font-size: 14px;
  transition: color 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 2px;
    height: 2px;
    border-radius: 2px;
    background: var(--l-accent);
    transform: scaleX(0);
    transition: transform 0.25s ease;
  }

  &:hover {
    color: var(--l-text);
  }
}

.q-btn.l-nav__link--active {
  color: var(--l-accent);

  &::after {
    transform: scaleX(1);
  }
}

.l-drawer {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: var(--l-surface);
  color: var(--l-text);
}

.l-drawer__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 12px 14px 20px;
  border-bottom: 1px solid var(--l-border);
}

.q-item.l-drawer__item {
  margin: 2px 10px;
  border-radius: 10px;
  color: var(--l-text-muted);
  font-weight: 500;
}

.q-item.l-drawer__item--active {
  background: var(--l-accent-soft);
  color: var(--l-accent);
}

.l-drawer__foot {
  margin-top: auto;
  padding: 20px;
  border-top: 1px solid var(--l-border);
}

/* ---------- Footer ---------- */
.q-footer.l-footer {
  background: var(--l-surface);
  color: var(--l-text);
  border-top: 1px solid var(--l-border);
}

.l-footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 24px;
  padding-bottom: 24px;
}

.l-footer__name {
  font-weight: 700;
}

.l-footer__meta {
  color: var(--l-text-muted);
  font-size: 13px;
}

/* ---------- Building blocks ---------- */
.l-eyebrow {
  margin: 0 0 12px;
  color: var(--l-accent);
  font-family: var(--l-font-mono);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.l-card {
  background: var(--l-surface);
  border: 1px solid var(--l-border);
  border-radius: var(--l-radius);
  box-shadow: var(--l-shadow);
}

.l-card--hover {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--l-accent-border);
    box-shadow: var(--l-shadow-hover);
  }
}

.l-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.l-chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 11px;
  border-radius: 999px;
  border: 1px solid var(--l-border);
  background: var(--l-surface-2);
  color: var(--l-text);
  font-size: 13px;
  line-height: 1.5;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: var(--l-accent-border);
  }
}

.l-chip--accent {
  border-color: var(--l-accent-border);
  background: var(--l-accent-soft);
  color: var(--l-accent);
}

.l-link {
  color: var(--l-accent);
  text-decoration: none;
  text-underline-offset: 3px;

  &:hover {
    text-decoration: underline;
  }
}

.l-mono {
  font-family: var(--l-font-mono);
}

.l-gradient-text {
  background: linear-gradient(90deg, var(--l-accent), var(--l-accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ---------- Buttons (used with q-btn) ---------- */
.q-btn.l-btn-primary,
.q-btn.l-btn-outline,
.q-btn.l-btn-ghost {
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 15px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}

.q-btn.l-btn-sm {
  padding: 6px 14px;
  font-size: 14px;
}

.q-btn.l-btn-primary {
  background: var(--l-accent);
  color: var(--l-on-accent);
  box-shadow: 0 8px 24px -10px var(--l-accent);

  &:hover {
    background: var(--l-accent-hover);
    transform: translateY(-1px);
  }
}

.q-btn.l-btn-outline {
  color: var(--l-text);

  &::before {
    border-color: var(--l-border-strong);
  }

  &:hover {
    color: var(--l-accent);
    transform: translateY(-1px);

    &::before {
      border-color: var(--l-accent);
    }
  }
}

.q-btn.l-btn-ghost {
  color: var(--l-text-muted);

  &:hover {
    color: var(--l-accent);
  }
}

/* ---------- Motion ---------- */
.l-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.l-reveal--visible {
  opacity: 1;
  transform: none;
}

.l-stagger {
  animation: l-rise 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
  animation-delay: calc(var(--i, 0) * 70ms);
}

@keyframes l-rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .l-reveal {
    opacity: 1;
    transform: none;
  }
}

/* ---------- Existing utilities ---------- */
.l-container {
  max-width: 1440px !important;
}

.l-grow {
  flex-grow: 99 !important;
}

.l-text-header {
  font-size: 64px !important;
  line-height: 1;
  @media only screen and (max-width: 900px) {
    font-size: 36px !important;
  }
  @media only screen and (max-width: 500px) {
    font-size: 24px !important;
  }
}

.l-text-title {
  font-size: 32px !important;
  line-height: 1.8;
  @media only screen and (max-width: 900px) {
    font-size: 26px !important;
  }
  @media only screen and (max-width: 500px) {
    font-size: 20px !important;
  }
}

.l-text-subtitle {
  font-size: 20px !important;
  line-height: 1.8;
  @media only screen and (max-width: 500px) {
    font-size: 16px !important;
  }
}

.l-text-detail {
  font-size: 18px !important;
  line-height: 1.8;
  @media only screen and (max-width: 500px) {
    font-size: 13px !important;
  }
}

.l-text-description {
  font-size: 14px !important;
  line-height: 1.8;
  @media only screen and (max-width: 500px) {
    font-size: 11px !important;
  }
}

.border-card {
  border-radius: 10px !important;
  border: 1px solid #d0d0d0 !important;
}
</style>
