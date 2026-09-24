<template>
  <div class="l-section-header" :class="{ 'l-section-header--center': center }">
    <p v-if="eyebrow" class="l-eyebrow">{{ eyebrow }}</p>
    <component :is="tag" :id="titleId || undefined" class="l-section-header__title">
      {{ title }}
    </component>
    <p v-if="subtitle" class="l-section-header__subtitle">{{ subtitle }}</p>
    <slot />
  </div>
</template>

<script>
export default {
  name: "SectionHeader",

  props: {
    eyebrow: { type: String, default: "" },
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    // Heading level: "h1" for page titles, "h2" for sections
    tag: { type: String, default: "h2" },
    titleId: { type: String, default: "" },
    center: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.l-section-header {
  max-width: 720px;
  margin-bottom: 40px;

  &--center {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
}

.l-section-header__title {
  margin: 0;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--l-text);
}

.l-section-header__subtitle {
  margin: 14px 0 0;
  font-size: 17px;
  line-height: 1.7;
  color: var(--l-text-muted);
}
</style>
