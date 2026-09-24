<template>
  <q-page>
    <section class="l-section l-wrap" aria-labelledby="about-title">
      <SectionHeader
        tag="h1"
        title-id="about-title"
        eyebrow="About"
        :title="`Hi, I'm ${firstName}.`"
        subtitle="AI Engineer turning research-grade models into production systems."
      />

      <div class="l-about">
        <aside class="l-about__aside">
          <div class="l-card l-about__photo">
            <q-img
              v-if="profile.photo"
              :src="profile.photo"
              :alt="`Portrait of ${profile.name}`"
              :ratio="4 / 5"
              fit="cover"
            >
              <template #error>
                <div class="l-about__fallback absolute-full" aria-hidden="true">
                  {{ profile.initials }}
                </div>
              </template>
            </q-img>
            <div v-else class="l-about__fallback" aria-hidden="true">{{ profile.initials }}</div>
          </div>

          <dl class="l-card l-facts">
            <div v-for="fact in profile.facts" :key="fact.label" class="l-facts__row">
              <dt class="l-facts__label">
                <q-icon :name="fact.icon" size="18px" class="l-facts__icon" />
                {{ fact.label }}
              </dt>
              <dd class="l-facts__value">{{ fact.value }}</dd>
            </div>
          </dl>
        </aside>

        <div class="l-about__content">
          <div class="l-about__prose">
            <p v-for="(paragraph, index) in profile.about" :key="index">{{ paragraph }}</p>
          </div>

          <div
            v-intersection.once="reveal"
            class="l-card l-looking l-reveal"
            role="region"
            aria-labelledby="looking-title"
          >
            <h2 id="looking-title" class="l-looking__title">
              <q-icon name="search" size="22px" class="l-looking__icon" />
              What I'm looking for
            </h2>
            <p class="l-looking__text">{{ profile.lookingFor.summary }}</p>
            <ul class="l-chip-list">
              <li v-for="tag in profile.lookingFor.tags" :key="tag" class="l-chip l-chip--accent">
                {{ tag }}
              </li>
            </ul>
          </div>

          <div class="l-about__actions">
            <q-btn
              unelevated
              no-caps
              icon-right="arrow_forward"
              label="See my experience"
              class="l-btn-primary"
              :to="{ name: 'experience' }"
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
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import SectionHeader from "@/components/SectionHeader.vue";
import useReveal from "@/composables/useReveal";
import { profile } from "@/data/profile";

export default {
  name: "AboutView",

  components: { SectionHeader },

  setup() {
    const { reveal } = useReveal();
    const firstName = profile.name.split(" ")[0];

    return { profile, firstName, reveal };
  },
};
</script>

<style lang="scss" scoped>
.l-about {
  display: grid;
  grid-template-columns: minmax(0, 340px) minmax(0, 1fr);
  align-items: start;
  gap: 48px;
  @media only screen and (max-width: 1023.98px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }
}

.l-about__aside {
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media only screen and (max-width: 1023.98px) {
    display: grid;
    grid-template-columns: minmax(0, 240px) minmax(0, 1fr);
    align-items: start;
  }
  @media only screen and (max-width: 599.98px) {
    grid-template-columns: minmax(0, 1fr);
  }
}

.l-about__photo {
  overflow: hidden;
  padding: 0;
  @media only screen and (max-width: 599.98px) {
    max-width: 260px;
  }
}

.l-about__fallback {
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 4 / 5;
  background: linear-gradient(135deg, var(--l-accent), var(--l-accent-2));
  color: #ffffff;
  font-family: var(--l-font-mono);
  font-size: 56px;
  font-weight: 700;
}

.l-facts {
  margin: 0;
  padding: 8px 20px;
}

.l-facts__row {
  padding: 12px 0;

  & + & {
    border-top: 1px solid var(--l-border);
  }
}

.l-facts__label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--l-font-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--l-text-muted);
}

.l-facts__icon {
  color: var(--l-accent);
}

.l-facts__value {
  margin: 4px 0 0 26px;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--l-text);
}

.l-about__prose {
  max-width: 680px;

  p {
    margin: 0 0 18px;
    font-size: 17px;
    line-height: 1.8;
    color: var(--l-text);
  }

  p:first-child {
    font-size: 19px;
  }
}

.l-looking {
  margin-top: 16px;
  padding: 24px;
  border-color: var(--l-accent-border);
  background:
    radial-gradient(circle at 100% 0%, var(--l-accent-soft), transparent 60%),
    var(--l-surface);
}

.l-looking__title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--l-text);
}

.l-looking__icon {
  color: var(--l-accent);
}

.l-looking__text {
  margin: 0 0 16px;
  font-size: 15.5px;
  line-height: 1.75;
  color: var(--l-text-muted);
}

.l-about__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}
</style>
