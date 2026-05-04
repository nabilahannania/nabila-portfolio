<template>
  <q-page class="column q-gutter-x-lg">
    <q-card flat class="column q-gutter-y-sm q-pa-xl">
      <div class="row q-gutter-md bold text-teal-8 q-mt-lg">
        <div>AI Engineer</div>
        <div>Data Scientist</div>
      </div>
      <div class="text-h4" style="width: 60%">
        Building Intelligent Solutions with Data and AI
      </div>
      <div class="text-grey" style="width: 60%">
        Helps organizations leverage data and AI to drive innovation, optimize
        processes, and make informed decisions. Passionate about transforming
        complex data into actionable insights and creating intelligent
        applications that solve real-world problems.
      </div>
      <div class="row q-gutter-md q-mt-sm q-mb-xl">
        <q-btn
          unelevated
          color="black"
          text-color="white"
          label="Start Conversation"
          href="mailto:nabilahannania95@gmail.com"
        />

        <q-btn outline color="black" label="View Projects" to="/projects" />
      </div>
    </q-card>

    <!-- <q-separator
      class="q-my-md"
      color="teal-8"
      size="3"
    /> -->

    <q-card flat class="row justify-between q-pa-xl bg-teal-6">
      <div class="flex-center column">
        <q-img
          src="../assets/profile.jpg"
          alt="Profile Picture"
          class="rounded-borders q-mb-sm"
          style="width: 200px; object-fit: cover"
        />
        <div class="text-white text-bold text-subtitle1">Nabila Hannania</div>
        <div>Jakarta, Indonesia</div>
      </div>
      <div class="col column justify-start q-ml-xl text-white q-gutter-y-sm">
        <div class="text-h4 text-bold">About Me</div>
        <div class="text-subtitle1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
        <div class="text-subtitle1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
      </div>
    </q-card>

    <!-- <div class="text-center">

      <h2 class="text-h3 text-weight-bold">
        Hello, I'm Nabila 👋
      </h2>

      <p class="text-subtitle1 q-mt-md">
        Software Developer | Data Science Enthusiast
      </p>

      <div class="q-mt-lg">

        <q-btn
          color="primary"
          icon="download"
          label="Download Resume"
          href="/resume.pdf"
          target="_blank"
          class="q-mr-sm"
        />

        <q-btn
          outline
          color="primary"
          label="View Projects"
          to="/projects"
        />

      </div>

    </div>

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

    </div> -->
  </q-page>
</template>

<script>
export default {
  name: "HomeView",

  setup() {
    const skills = [
      "Vue.js",
      "Quasar",
      "Python",
      "Machine Learning",
      "SQL",
      "REST API",
      "Git",
      "Data Science",
    ];

    return { skills };
  },
};
</script>
