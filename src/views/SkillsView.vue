<template>
  <q-page>
    <section class="l-section l-wrap" aria-labelledby="skills-title">
      <SectionHeader
        tag="h1"
        title-id="skills-title"
        eyebrow="Skills"
        title="Tools & expertise"
        subtitle="Grouped by domain: what I use to take models from research to production."
      />

      <div class="l-skills">
        <article
          v-for="(group, index) in skillCategories"
          :key="group.id"
          class="l-card l-card--hover l-skill l-stagger"
          :style="{ '--i': index }"
          :aria-labelledby="`skill-${group.id}`"
        >
          <div class="l-skill__head">
            <span class="l-skill__icon" aria-hidden="true">
              <q-icon :name="group.icon" size="22px" />
            </span>
            <h2 :id="`skill-${group.id}`" class="l-skill__title">{{ group.title }}</h2>
          </div>
          <p class="l-skill__desc">{{ group.description }}</p>
          <ul class="l-chip-list">
            <li v-for="skill in group.skills" :key="skill" class="l-chip">{{ skill }}</li>
          </ul>
        </article>
      </div>
    </section>
  </q-page>
</template>

<script>
import SectionHeader from "@/components/SectionHeader.vue";
import { skillCategories } from "@/data/skills";

export default {
  name: "SkillsView",

  components: { SectionHeader },

  setup() {
    return { skillCategories };
  },
};
</script>

<style lang="scss" scoped>
.l-skills {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
}

.l-skill {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
}

.l-skill__head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.l-skill__icon {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--l-accent-soft);
  color: var(--l-accent);
}

.l-skill__title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: var(--l-text);
}

.l-skill__desc {
  margin: 0 0 4px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--l-text-muted);
}
</style>
