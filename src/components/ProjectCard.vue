<template>
  <article
    class="l-card l-card--hover l-project"
    :class="{ 'l-project--featured': featured, 'l-project--horizontal': horizontal }"
    :aria-labelledby="titleId"
  >
    <div v-if="featured" class="l-project__media">
      <q-img
        v-if="project.thumbnail"
        :src="project.thumbnail"
        :alt="`Preview of ${project.title}`"
        :ratio="16 / 9"
        fit="cover"
        class="l-project__img"
      >
        <template #error>
          <div class="l-project__fallback absolute-full" aria-hidden="true">
            <q-icon :name="categoryIcon" size="40px" />
          </div>
        </template>
      </q-img>
      <div v-else class="l-project__fallback" aria-hidden="true">
        <q-icon :name="categoryIcon" size="40px" />
        <span class="l-project__fallback-stack">{{ fallbackCaption }}</span>
      </div>
    </div>

    <div class="l-project__body">
      <div class="l-project__meta">
        <span
          v-for="item in project.category"
          :key="item"
          class="l-project__badge"
          :class="`l-project__badge--${item}`"
        >
          {{ categoryLabels[item] }}
        </span>
        <span v-if="project.year" class="l-project__year">{{ project.year }}</span>
      </div>

      <h3 :id="titleId" class="l-project__title">{{ project.title }}</h3>
      <p class="l-project__summary">{{ project.summary }}</p>

      <ul v-if="hasHighlights" class="l-project__highlights">
        <li v-for="item in project.highlights" :key="item">
          <q-icon name="trending_up" size="16px" class="l-project__highlight-icon" />
          <span>{{ item }}</span>
        </li>
      </ul>

      <ul class="l-chip-list l-project__stack" aria-label="Tech stack">
        <li v-for="tech in project.techStack" :key="tech" class="l-chip">{{ tech }}</li>
      </ul>

      <div v-if="hasLinks" class="l-project__links">
        <q-btn
          v-for="link in project.links"
          :key="link.url"
          outline
          no-caps
          :icon="linkIcon(link.label)"
          :label="link.label"
          class="l-btn-outline l-btn-sm"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${link.label}: ${project.title} (opens in a new tab)`"
        />
      </div>
    </div>
  </article>
</template>

<script>
import { computed } from "vue";
import { mdiGithub } from "@quasar/extras/mdi-v7";
import { categoryLabels } from "@/data/projects";

// Icon per link label (case-insensitive); unknown labels get a generic icon
const LINK_ICONS = {
  github: mdiGithub,
  paper: "article",
  article: "article",
  thesis: "school",
  report: "description",
  slides: "slideshow",
  demo: "play_circle",
  video: "smart_display",
  live: "public",
  website: "public",
};

export default {
  name: "ProjectCard",

  props: {
    project: { type: Object, required: true },
    // Bigger card with a thumbnail
    featured: { type: Boolean, default: false },
    // Thumbnail beside the content (used when a tab has a single featured project)
    horizontal: { type: Boolean, default: false },
  },

  setup(props) {
    const titleId = computed(() => `project-title-${props.project.id}`);
    const hasHighlights = computed(
      () => Array.isArray(props.project.highlights) && props.project.highlights.length > 0
    );
    const hasLinks = computed(
      () => Array.isArray(props.project.links) && props.project.links.length > 0
    );
    const categoryIcon = computed(() =>
      props.project.category.includes("ai") ? "psychology" : "code"
    );
    const fallbackCaption = computed(() => props.project.techStack.slice(0, 3).join(" · "));

    const linkIcon = (label) => LINK_ICONS[label.toLowerCase()] || "open_in_new";

    return {
      titleId,
      hasHighlights,
      hasLinks,
      categoryIcon,
      fallbackCaption,
      categoryLabels,
      linkIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
.l-project {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

.l-project__media {
  position: relative;
  display: flex;
  aspect-ratio: 16 / 9;
  border-bottom: 1px solid var(--l-border);
  background: var(--l-surface-2);
  overflow: hidden;
}

// Both fill the media box (stretched by its flex layout)
.l-project__img,
.l-project__fallback {
  flex: 1;
}

.l-project__fallback {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  color: var(--l-accent);
  background:
    radial-gradient(circle at 20% 20%, var(--l-glow), transparent 55%),
    radial-gradient(circle at 80% 90%, var(--l-glow-2), transparent 55%),
    var(--l-surface-2);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--l-grid-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--l-grid-line) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  > * {
    position: relative;
  }
}

.l-project__fallback-stack {
  font-family: var(--l-font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--l-text-muted);
  text-align: center;
}

.l-project__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 14px;
  padding: 22px;
}

.l-project__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.l-project__badge {
  padding: 2px 10px;
  border-radius: 999px;
  font-family: var(--l-font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1px solid var(--l-accent-border);
  background: var(--l-accent-soft);
  color: var(--l-accent);

  &--software {
    border-color: var(--l-border-strong);
    background: var(--l-surface-2);
    color: var(--l-text-muted);
  }
}

.l-project__year {
  margin-left: auto;
  font-family: var(--l-font-mono);
  font-size: 12px;
  color: var(--l-text-muted);
}

.l-project__title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: var(--l-text);
}

.l-project__summary {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--l-text-muted);
}

.l-project__highlights {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--l-text);
  }
}

.l-project__highlight-icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--l-accent);
}

.l-project__stack .l-chip {
  font-size: 12px;
  padding: 2px 9px;
}

.l-project__links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
  padding-top: 6px;
}

.l-project--featured {
  .l-project__title {
    font-size: 20px;
  }
}

.l-project--horizontal {
  @media only screen and (min-width: 900px) {
    flex-direction: row;

    .l-project__media {
      flex: 0 0 42%;
      aspect-ratio: auto;
      min-height: 280px;
      border-bottom: 0;
      border-right: 1px solid var(--l-border);
    }
  }
}
</style>
