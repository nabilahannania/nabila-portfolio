<template>
  <q-page>
    <section class="l-section l-wrap" aria-labelledby="contact-title">
      <SectionHeader
        tag="h1"
        title-id="contact-title"
        eyebrow="Contact"
        title="Let's build something intelligent."
        subtitle="Open to conversations about AI/ML engineering roles, research collaborations, and interesting problems in NLP, speech, and computer vision."
      />

      <div class="l-contact">
        <div class="l-card l-contact__primary">
          <p class="l-eyebrow">Email</p>
          <a :href="`mailto:${profile.email}`" class="l-contact__email">{{ profile.email }}</a>
          <p class="l-contact__hint">The best way to reach me directly.</p>
          <div class="l-contact__actions">
            <q-btn
              unelevated
              no-caps
              icon="mail_outline"
              label="Send an email"
              class="l-btn-primary"
              :href="`mailto:${profile.email}`"
            />
            <q-btn
              outline
              no-caps
              icon="content_copy"
              label="Copy address"
              class="l-btn-outline"
              @click="copyEmail"
            />
          </div>
        </div>

        <ul class="l-contact__list" aria-label="Other ways to connect">
          <li v-for="item in channels" :key="item.label">
            <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="l-card l-card--hover l-contact__item"
            >
              <span class="l-contact__icon" aria-hidden="true">
                <q-icon :name="item.icon" size="22px" />
              </span>
              <span class="l-contact__text">
                <span class="l-contact__label">{{ item.label }}</span>
                <span class="l-contact__handle">{{ item.handle }}</span>
              </span>
              <q-icon name="north_east" size="18px" class="l-contact__arrow" />
              <span class="l-sr-only">(opens in a new tab)</span>
            </a>
          </li>

          <li v-if="profile.cvUrl">
            <a
              :href="profile.cvUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="l-card l-card--hover l-contact__item"
            >
              <span class="l-contact__icon" aria-hidden="true">
                <q-icon name="description" size="22px" />
              </span>
              <span class="l-contact__text">
                <span class="l-contact__label">Curriculum Vitae</span>
                <span class="l-contact__handle">Download CV</span>
              </span>
              <q-icon name="north_east" size="18px" class="l-contact__arrow" />
              <span class="l-sr-only">(opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>

      <p class="l-contact__location">
        <q-icon name="location_on" size="18px" />
        Based in {{ profile.location }}
      </p>
    </section>
  </q-page>
</template>

<script>
import { copyToClipboard } from "quasar";
import useBasic from "@/composables/useBasic";
import SectionHeader from "@/components/SectionHeader.vue";
import { profile, socials } from "@/data/profile";

export default {
  name: "ContactView",

  components: { SectionHeader },

  setup() {
    const { $q } = useBasic();

    // Email has its own card; list the other filled-in web profiles
    const channels = socials.filter((item) => item.url && item.url.startsWith("http"));

    const copyEmail = () => {
      copyToClipboard(profile.email)
        .then(() => {
          $q.notify({
            message: "Email address copied to clipboard",
            icon: "check_circle",
            color: "dark",
            position: "bottom",
            timeout: 2000,
          });
        })
        .catch(() => {
          $q.notify({
            message: "Couldn't copy automatically. Please copy the address manually.",
            icon: "error_outline",
            color: "negative",
            position: "bottom",
          });
        });
    };

    return { profile, channels, copyEmail };
  },
};
</script>

<style lang="scss" scoped>
.l-contact {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  align-items: start;
  gap: 24px;
  @media only screen and (max-width: 1023.98px) {
    grid-template-columns: minmax(0, 1fr);
  }
}

.l-contact__primary {
  padding: 32px;
  background:
    radial-gradient(circle at 0% 0%, var(--l-accent-soft), transparent 55%),
    var(--l-surface);
  @media only screen and (max-width: 599.98px) {
    padding: 22px;
  }
}

.l-contact__email {
  display: inline-block;
  max-width: 100%;
  font-size: clamp(20px, 3.2vw, 30px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--l-text);
  text-decoration: none;
  overflow-wrap: anywhere;

  &:hover {
    color: var(--l-accent);
  }
}

.l-contact__hint {
  margin: 10px 0 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--l-text-muted);
}

.l-contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.l-contact__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.l-contact__item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  color: var(--l-text);
  text-decoration: none;

  &:hover .l-contact__arrow {
    color: var(--l-accent);
    transform: translate(2px, -2px);
  }
}

.l-contact__icon {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--l-accent-soft);
  color: var(--l-accent);
}

.l-contact__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.l-contact__label {
  font-weight: 600;
  font-size: 15px;
}

.l-contact__handle {
  font-size: 13.5px;
  color: var(--l-text-muted);
  overflow-wrap: anywhere;
}

.l-contact__arrow {
  color: var(--l-text-muted);
  transition: color 0.2s ease, transform 0.2s ease;
}

.l-contact__location {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 32px 0 0;
  font-size: 14px;
  color: var(--l-text-muted);
}
</style>
