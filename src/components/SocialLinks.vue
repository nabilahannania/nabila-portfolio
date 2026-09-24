<template>
  <ul class="l-social" aria-label="Social links">
    <li v-for="item in items" :key="item.label">
      <q-btn
        flat
        round
        :dense="dense"
        class="l-social__btn"
        :icon="item.icon"
        :href="item.url"
        :target="isExternal(item.url) ? '_blank' : undefined"
        :rel="isExternal(item.url) ? 'noopener noreferrer' : undefined"
        :aria-label="isExternal(item.url) ? `${item.label} (opens in a new tab)` : item.label"
      >
        <q-tooltip :delay="400">{{ item.label }}</q-tooltip>
      </q-btn>
    </li>
  </ul>
</template>

<script>
import { socials } from "@/data/profile";

export default {
  name: "SocialLinks",

  props: {
    dense: { type: Boolean, default: false },
  },

  setup() {
    const items = socials.filter((item) => item.url);
    const isExternal = (url) => url.startsWith("http");

    return { items, isExternal };
  },
};
</script>

<style lang="scss" scoped>
.l-social {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.l-social__btn {
  color: var(--l-text-muted);
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: var(--l-accent);
    transform: translateY(-2px);
  }
}
</style>
