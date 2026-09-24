<template>
  <q-page>
    <section class="l-section l-wrap" aria-labelledby="projects-title">
      <SectionHeader
        tag="h1"
        title-id="projects-title"
        eyebrow="Projects"
        title="Things I've built and researched"
        subtitle="From speech recognition research to shipped software. Filter by focus area; the link updates so you can share it."
      />

      <q-tabs
        v-model="category"
        no-caps
        dense
        class="l-filter"
        active-class="l-filter__tab--active"
        aria-label="Filter projects by category"
      >
        <q-tab
          v-for="item in categories"
          :id="`projects-tab-${item.id}`"
          :key="item.id"
          :name="item.id"
          :ripple="false"
          class="l-filter__tab"
          aria-controls="projects-panel"
        >
          <span class="l-filter__label">
            {{ $q.screen.lt.sm ? item.shortLabel : item.label }}
          </span>
          <span class="l-filter__count">
            {{ counts[item.id] }}<span class="l-sr-only"> projects</span>
          </span>
        </q-tab>
      </q-tabs>

      <div
        id="projects-panel"
        class="l-projects__panel"
        role="tabpanel"
        :aria-labelledby="`projects-tab-${category}`"
      >
        <transition name="l-swap">
          <div :key="category" class="l-projects__view">
            <section
              v-if="featuredProjects.length"
              class="l-projects__group"
              :aria-labelledby="`featured-title-${category}`"
            >
              <h2 :id="`featured-title-${category}`" class="l-projects__group-title">
                <q-icon name="star_outline" size="20px" class="l-projects__group-icon" />
                Featured
              </h2>
              <div
                class="l-projects__featured"
                :class="{ 'l-projects__featured--single': featuredProjects.length === 1 }"
              >
                <ProjectCard
                  v-for="(project, index) in featuredProjects"
                  :key="project.id"
                  :project="project"
                  featured
                  :horizontal="featuredProjects.length === 1"
                  class="l-stagger"
                  :style="{ '--i': index }"
                />
              </div>
            </section>

            <section class="l-projects__group" :aria-labelledby="`more-title-${category}`">
              <h2 :id="`more-title-${category}`" class="l-projects__group-title">
                <q-icon name="grid_view" size="20px" class="l-projects__group-icon" />
                {{ featuredProjects.length ? "More projects" : "Projects" }}
              </h2>

              <div v-if="otherProjects.length" class="l-grid">
                <ProjectCard
                  v-for="(project, index) in otherProjects"
                  :key="project.id"
                  :project="project"
                  class="l-stagger"
                  :style="{ '--i': index + featuredProjects.length }"
                />
              </div>

              <div v-else class="l-card l-empty">
                <span class="l-empty__icon" aria-hidden="true">
                  <q-icon name="construction" size="24px" />
                </span>
                <div>
                  <p class="l-empty__title">{{ emptyTitle }}</p>
                  <p class="l-empty__text">
                    In the meantime, you can browse my code on
                    <a :href="githubUrl" target="_blank" rel="noopener noreferrer" class="l-link">
                      GitHub<span class="l-sr-only"> (opens in a new tab)</span>
                    </a>.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </transition>
      </div>
    </section>
  </q-page>
</template>

<script>
import { computed } from "vue";
import useBasic from "@/composables/useBasic";
import SectionHeader from "@/components/SectionHeader.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import { socials } from "@/data/profile";
import {
  categories,
  getProjectsByCategory,
  getFeaturedProjects,
} from "@/data/projects";

const CATEGORY_IDS = categories.map((item) => item.id);

export default {
  name: "ProjectView",

  components: { SectionHeader, ProjectCard },

  setup() {
    const { route, router } = useBasic();

    // Active filter lives in the URL (?category=ai) so it can be shared;
    // no query or an unknown value means "all"
    const category = computed({
      get() {
        const value = route.query.category;
        return CATEGORY_IDS.includes(value) ? value : "all";
      },
      set(value) {
        const query = { ...route.query };
        if (value === "all") {
          delete query.category;
        } else {
          query.category = value;
        }
        router.replace({ query });
      },
    });

    const counts = categories.reduce((result, item) => {
      result[item.id] = getProjectsByCategory(item.id).length;
      return result;
    }, {});

    const featuredProjects = computed(() => getFeaturedProjects(category.value));

    const otherProjects = computed(() => {
      const featuredIds = featuredProjects.value.map((project) => project.id);
      return getProjectsByCategory(category.value).filter(
        (project) => !featuredIds.includes(project.id)
      );
    });

    const emptyTitle = computed(() => {
      if (category.value === "software") {
        return "More software engineering projects are on the way.";
      }
      if (category.value === "ai") {
        return "More AI projects are on the way.";
      }
      return "More projects are on the way.";
    });

    const github = socials.find((item) => item.label === "GitHub");
    const githubUrl = github ? github.url : "";

    return {
      categories,
      category,
      counts,
      featuredProjects,
      otherProjects,
      emptyTitle,
      githubUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
.l-filter {
  display: inline-flex;
  max-width: 100%;
  margin-bottom: 40px;
  padding: 4px;
  border-radius: 999px;
  border: 1px solid var(--l-border);
  background: var(--l-surface-2);

  :deep(.q-tab__indicator) {
    display: none;
  }
}

.l-filter__tab {
  min-height: 40px;
  padding: 0 16px;
  border-radius: 999px;
  color: var(--l-text-muted);
  font-weight: 500;
  transition: color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    color: var(--l-text);
  }
  @media only screen and (max-width: 599.98px) {
    padding: 0 12px;
  }
}

.l-filter__tab--active {
  background: var(--l-surface);
  color: var(--l-accent);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08), 0 4px 12px -6px var(--l-glow);

  &:hover {
    color: var(--l-accent);
  }
}

.l-filter__label {
  font-size: 14px;
}

.l-filter__count {
  margin-left: 8px;
  padding: 0 7px;
  border-radius: 999px;
  background: var(--l-accent-soft);
  color: var(--l-accent);
  font-family: var(--l-font-mono);
  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
}

.l-projects__panel {
  position: relative;
}

.l-projects__group {
  & + & {
    margin-top: 48px;
  }
}

.l-projects__group-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 20px;
  font-family: var(--l-font-mono);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.4;
  text-transform: uppercase;
  color: var(--l-text-muted);
}

.l-projects__group-icon {
  color: var(--l-accent);
}

.l-projects__featured {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));

  &--single {
    grid-template-columns: minmax(0, 1fr);
  }
}

.l-empty {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  border-style: dashed;
  box-shadow: none;
}

.l-empty__icon {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--l-accent-soft);
  color: var(--l-accent);
}

.l-empty__title {
  margin: 0 0 4px;
  font-weight: 600;
  font-size: 15.5px;
  color: var(--l-text);
}

.l-empty__text {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--l-text-muted);
}

/* Filter change: new view fades in while the old one fades out on top of it */
.l-swap-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.l-swap-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transition: opacity 0.15s ease;
}

.l-swap-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.l-swap-leave-to {
  opacity: 0;
}
</style>
