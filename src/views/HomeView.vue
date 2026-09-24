<template>
  <q-page>
    <section class="l-hero" aria-labelledby="hero-title">
      <div class="l-hero__bg" aria-hidden="true"></div>

      <div class="l-wrap l-hero__inner">
        <div class="l-hero__content">
          <p class="l-eyebrow">
            {{ profile.role }} · {{ profile.focusAreas.join(" · ") }}
          </p>
          <h1 id="hero-title" class="l-hero__name">{{ profile.name }}</h1>
          <p class="l-hero__headline">
            Building Intelligent Solutions with
            <span class="l-gradient-text">Data and AI</span>
          </p>
          <p class="l-hero__summary">{{ profile.summary }}</p>

          <div class="l-hero__actions">
            <q-btn
              unelevated
              no-caps
              icon-right="arrow_forward"
              label="View Projects"
              class="l-btn-primary"
              :to="{ name: 'projects' }"
            />
            <q-btn
              v-if="profile.cvUrl"
              outline
              no-caps
              icon="download"
              label="Download CV"
              class="l-btn-outline"
              :href="profile.cvUrl"
              target="_blank"
              rel="noopener noreferrer"
            />
            <q-btn
              flat
              no-caps
              icon="mail_outline"
              label="Contact Me"
              class="l-btn-ghost"
              :to="{ name: 'contact' }"
            />
          </div>

          <SocialLinks class="l-hero__social" />
        </div>

        <div class="l-hero__visual">
          <div class="l-hero__photo">
            <q-img
              v-if="profile.photo"
              :src="profile.photo"
              :alt="`Portrait of ${profile.name}`"
              :ratio="4 / 5"
              fit="cover"
              loading="eager"
              fetchpriority="high"
              class="l-hero__img"
            >
              <template #error>
                <div class="l-hero__fallback absolute-full" aria-hidden="true">
                  {{ profile.initials }}
                </div>
              </template>
            </q-img>
            <div v-else class="l-hero__fallback" aria-hidden="true">{{ profile.initials }}</div>
          </div>
          <div class="l-card l-hero__badge">
            <q-icon name="location_on" size="18px" class="l-hero__badge-icon" />
            <div>
              <div class="l-hero__badge-title">{{ profile.location }}</div>
              <div class="l-hero__badge-sub">{{ profile.currentPosition }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="l-wrap" aria-label="Highlights">
      <ul class="l-highlights">
        <li
          v-for="(item, index) in profile.highlights"
          :key="item.label"
          class="l-card l-highlight l-stagger"
          :style="{ '--i': index }"
        >
          <span class="l-highlight__value">{{ item.value }}</span>
          <span class="l-highlight__label">{{ item.label }}</span>
        </li>
      </ul>
    </section>

    <section
      v-intersection.once="reveal"
      class="l-section l-wrap l-reveal"
      aria-labelledby="featured-title"
    >
      <div class="l-home__featured-head">
        <SectionHeader
          eyebrow="Selected work"
          title="Featured projects"
          title-id="featured-title"
          subtitle="Research and engineering work in speech, language, and vision."
        />
        <q-btn
          flat
          no-caps
          icon-right="arrow_forward"
          label="See all projects"
          class="l-btn-ghost"
          :to="{ name: 'projects' }"
        />
      </div>

      <div class="l-grid">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
          featured
        />
      </div>
    </section>
  </q-page>
</template>

<script>
import SectionHeader from "@/components/SectionHeader.vue";
import SocialLinks from "@/components/SocialLinks.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import useReveal from "@/composables/useReveal";
import { profile } from "@/data/profile";
import { getFeaturedProjects } from "@/data/projects";

export default {
  name: "HomeView",

  components: { SectionHeader, SocialLinks, ProjectCard },

  setup() {
    const { reveal } = useReveal();
    const featuredProjects = getFeaturedProjects("all", 3);

    return { profile, featuredProjects, reveal };
  },
};
</script>

<style lang="scss" scoped>
.l-hero {
  position: relative;
  overflow: hidden;
  padding: 88px 0 56px;
  @media only screen and (max-width: 599.98px) {
    padding: 48px 0 40px;
  }
}

.l-hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(640px circle at 12% 8%, var(--l-glow), transparent 60%),
    radial-gradient(520px circle at 88% 36%, var(--l-glow-2), transparent 62%);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--l-grid-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--l-grid-line) 1px, transparent 1px);
    background-size: 48px 48px;
    -webkit-mask-image: radial-gradient(ellipse at 40% 30%, #000 20%, transparent 70%);
    mask-image: radial-gradient(ellipse at 40% 30%, #000 20%, transparent 70%);
  }
}

.l-hero__inner {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  align-items: center;
  gap: 56px;
  @media only screen and (max-width: 1023.98px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }
}

.l-hero__name {
  margin: 0;
  font-size: clamp(40px, 7vw, 72px);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.035em;
  color: var(--l-text);
}

.l-hero__headline {
  margin: 16px 0 0;
  font-size: clamp(20px, 2.6vw, 28px);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.015em;
  color: var(--l-text);
}

.l-hero__summary {
  max-width: 560px;
  margin: 18px 0 0;
  font-size: 17px;
  line-height: 1.75;
  color: var(--l-text-muted);
}

.l-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.l-hero__social {
  margin-top: 24px;
}

.l-hero__visual {
  position: relative;
  justify-self: center;
  width: 100%;
  max-width: 360px;
  @media only screen and (max-width: 1023.98px) {
    max-width: 300px;
  }
}

.l-hero__photo {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--l-border);
  box-shadow: 0 30px 60px -30px var(--l-accent);
  background: var(--l-surface-2);
}

.l-hero__img {
  display: block;
}

.l-hero__fallback {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  min-height: 320px;
  background: linear-gradient(135deg, var(--l-accent), var(--l-accent-2));
  color: #ffffff;
  font-family: var(--l-font-mono);
  font-size: 64px;
  font-weight: 700;
}

.l-hero__badge {
  position: absolute;
  left: -24px;
  bottom: 24px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 280px;
  padding: 12px 14px;
  @media only screen and (max-width: 599.98px) {
    position: relative;
    left: 0;
    bottom: 0;
    max-width: none;
    margin-top: -32px;
    margin-left: 12px;
    margin-right: 12px;
  }
}

.l-hero__badge-icon {
  color: var(--l-accent);
  margin-top: 1px;
}

.l-hero__badge-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--l-text);
}

.l-hero__badge-sub {
  font-size: 12px;
  line-height: 1.5;
  color: var(--l-text-muted);
}

.l-highlights {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
  @media only screen and (max-width: 1023.98px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.l-highlight {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
}

.l-highlight__value {
  font-family: var(--l-font-mono);
  font-size: 28px;
  font-weight: 700;
  line-height: 1.1;
  color: var(--l-accent);
  @media only screen and (max-width: 599.98px) {
    font-size: 22px;
  }
}

.l-highlight__label {
  font-size: 13px;
  line-height: 1.5;
  color: var(--l-text-muted);
}

.l-home__featured-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px 24px;
  margin-bottom: 8px;

  :deep(.l-section-header) {
    margin-bottom: 32px;
  }

  .q-btn {
    margin-bottom: 32px;
  }
}
</style>
