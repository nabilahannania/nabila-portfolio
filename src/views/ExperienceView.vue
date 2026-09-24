<template>
  <q-page>
    <section class="l-section l-wrap">
      <SectionHeader
        tag="h1"
        eyebrow="Experience"
        title="Where I've built and researched"
        subtitle="Industry and research roles across OCR, biometrics, speech, and large language models."
      />

      <section class="l-exp__group" aria-labelledby="work-title">
        <h2 id="work-title" class="l-exp__group-title">
          <q-icon name="work_outline" size="22px" class="l-exp__group-icon" />
          Work &amp; research
        </h2>

        <ol class="l-timeline">
          <li
            v-for="job in experiences"
            :key="job.id"
            v-intersection.once="reveal"
            class="l-timeline__item l-reveal"
          >
            <span class="l-timeline__dot" aria-hidden="true"></span>
            <article class="l-card l-timeline__card" :aria-labelledby="`job-${job.id}`">
              <header class="l-timeline__head">
                <div>
                  <h3 :id="`job-${job.id}`" class="l-timeline__role">{{ job.role }}</h3>
                  <a
                    :href="job.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="l-link l-timeline__company"
                  >
                    {{ job.company }}
                    <q-icon name="open_in_new" size="14px" />
                    <span class="l-sr-only">(opens in a new tab)</span>
                  </a>
                </div>
                <div class="l-timeline__meta">
                  <span class="l-mono l-timeline__period">{{ job.period }}</span>
                  <span>{{ job.location }}</span>
                </div>
              </header>

              <ul class="l-timeline__points">
                <li v-for="point in job.achievements" :key="point">{{ point }}</li>
              </ul>

              <ul class="l-chip-list" aria-label="Tools used">
                <li v-for="tag in job.tags" :key="tag" class="l-chip">{{ tag }}</li>
              </ul>
            </article>
          </li>
        </ol>
      </section>

      <div class="l-exp__split">
        <section class="l-exp__group" aria-labelledby="education-title">
          <h2 id="education-title" class="l-exp__group-title">
            <q-icon name="school" size="22px" class="l-exp__group-icon" />
            Education
          </h2>

          <div class="l-exp__stack">
            <article
              v-for="item in profile.education"
              :key="item.id"
              v-intersection.once="reveal"
              class="l-card l-edu l-reveal"
              :aria-labelledby="`edu-${item.id}`"
            >
              <div class="l-edu__top">
                <span class="l-mono l-timeline__period">{{ item.period }}</span>
                <span class="l-chip l-chip--accent">{{ item.grade }}</span>
              </div>
              <h3 :id="`edu-${item.id}`" class="l-edu__degree">{{ item.degree }}</h3>
              <a :href="item.url" target="_blank" rel="noopener noreferrer" class="l-link">
                {{ item.school }}
                <span class="l-sr-only">(opens in a new tab)</span>
              </a>
              <p class="l-edu__note">{{ item.note }}</p>
            </article>
          </div>
        </section>

        <section class="l-exp__group" aria-labelledby="publication-title">
          <h2 id="publication-title" class="l-exp__group-title">
            <q-icon name="article" size="22px" class="l-exp__group-icon" />
            Publication
          </h2>

          <div class="l-exp__stack">
            <article
              v-for="paper in profile.publications"
              :key="paper.id"
              v-intersection.once="reveal"
              class="l-card l-edu l-reveal"
              :aria-labelledby="`paper-${paper.id}`"
            >
              <div class="l-edu__top">
                <span class="l-mono l-timeline__period">{{ paper.year }}</span>
                <span class="l-chip">IEEE</span>
              </div>
              <h3 :id="`paper-${paper.id}`" class="l-edu__degree">{{ paper.title }}</h3>
              <p class="l-edu__note">{{ paper.venue }}</p>
              <div>
                <q-btn
                  outline
                  no-caps
                  icon="article"
                  label="Read paper"
                  class="l-btn-outline l-btn-sm"
                  :href="paper.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Read paper (opens in a new tab)"
                />
              </div>
            </article>
          </div>
        </section>
      </div>
    </section>
  </q-page>
</template>

<script>
import SectionHeader from "@/components/SectionHeader.vue";
import useReveal from "@/composables/useReveal";
import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";

export default {
  name: "ExperienceView",

  components: { SectionHeader },

  setup() {
    const { reveal } = useReveal();

    return { experiences, profile, reveal };
  },
};
</script>

<style lang="scss" scoped>
.l-exp__group {
  margin-bottom: 56px;
}

.l-exp__group-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 24px;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--l-text);
}

.l-exp__group-icon {
  color: var(--l-accent);
}

.l-timeline {
  position: relative;
  margin: 0;
  padding: 0 0 0 32px;
  list-style: none;

  &::before {
    content: "";
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 7px;
    width: 2px;
    border-radius: 2px;
    background: linear-gradient(var(--l-accent), var(--l-border));
  }
  @media only screen and (max-width: 599.98px) {
    padding-left: 24px;

    &::before {
      left: 5px;
    }
  }
}

.l-timeline__item {
  position: relative;

  & + & {
    margin-top: 20px;
  }
}

.l-timeline__dot {
  position: absolute;
  top: 26px;
  left: -32px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 3px solid var(--l-bg);
  background: var(--l-accent);
  box-shadow: 0 0 0 4px var(--l-accent-soft);
  @media only screen and (max-width: 599.98px) {
    left: -24px;
    width: 12px;
    height: 12px;
  }
}

.l-timeline__card {
  padding: 24px;
  @media only screen and (max-width: 599.98px) {
    padding: 18px;
  }
}

.l-timeline__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
  margin-bottom: 14px;
}

.l-timeline__role {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.35;
  color: var(--l-text);
}

.l-timeline__company {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  font-size: 15px;
}

.l-timeline__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  font-size: 13px;
  color: var(--l-text-muted);
  @media only screen and (max-width: 599.98px) {
    align-items: flex-start;
  }
}

.l-timeline__period {
  font-size: 13px;
  font-weight: 600;
  color: var(--l-accent);
}

.l-timeline__points {
  margin: 0 0 18px;
  padding-left: 20px;

  li {
    margin-bottom: 8px;
    font-size: 15px;
    line-height: 1.7;
    color: var(--l-text);

    &::marker {
      color: var(--l-accent);
    }
  }
}

.l-exp__split {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 32px;
  @media only screen and (max-width: 1023.98px) {
    grid-template-columns: minmax(0, 1fr);
  }
}

.l-exp__stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.l-edu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 22px;
}

.l-edu__top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.l-edu__degree {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--l-text);
}

.l-edu__note {
  margin: 0;
  font-size: 14px;
  line-height: 1.65;
  color: var(--l-text-muted);
}
</style>
