<template>
  <q-page class="flex flex-center column q-pa-xl">

    <!-- HERO -->
    <div class="text-center">

      <h2 class="text-h3 text-weight-bold">
        Hello, I'm Nabila 👋
      </h2>

      <p class="text-subtitle1 q-mt-md">
        Software Developer | Data Science Enthusiast
      </p>

      <div class="q-mt-lg">

        <!-- Resume Button -->
        <q-btn
          color="primary"
          icon="download"
          label="Download Resume"
          href="/resume.pdf"
          target="_blank"
          class="q-mr-sm"
        />

        <!-- Go to Projects -->
        <q-btn
          outline
          color="primary"
          label="View Projects"
          to="/projects"
        />

      </div>

    </div>


    <!-- SKILLS -->
    <div class="q-mt-xl text-center">

      <h4>Skills</h4>

      <div class="q-gutter-sm q-mt-md">

        <q-chip
          v-for="skill in skills"
          :key="skill"
          color="grey-3"
          text-color="black"
        >
          {{ skill }}
        </q-chip>

      </div>

    </div>

  </q-page>
</template>

<script>

export default {
  name: 'HomeView',
  
  setup(){
    const skills = [
        "Vue.js",
        "Quasar",
        "Python",
        "Machine Learning",
        "SQL",
        "REST API",
        "Git",
        "Data Science"
      ]

    return {skills}

  }
}
</script>
