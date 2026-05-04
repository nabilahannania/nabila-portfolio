<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white">
      <!-- <q-separator
          color="teal-8"
          size="1"
        /> -->
      <q-toolbar class="q-px-xl">
        <a href="/" class="text-white no-decoration l-grow">
          <q-toolbar-title class="text-bold text-teal-8 text-subtitle1">
            Nabila Hannania
          </q-toolbar-title>
        </a>
        

        <div class="justify-between">
          <q-btn
          class="q-py q-mx-md"
            flat
            dense
            no-caps
            label="Home"
            :to="{ name: 'home' }"
            :color="route.name === 'home' ? 'teal-8' : 'teal-3'"
          />

          <q-btn
          class="q-py"
            flat
            dense
            no-caps
            label="Projects"
            color="teal-4"
          />

        </div>
        
      </q-toolbar>
      <q-separator
          color="teal-8"
          size="3"
        />
    </q-header>

    
    <q-page-container>
      
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, reactive } from "vue";
import useBasic from "@/composables/useBasic";

export default {
  name: 'LayoutDefault',


  setup () {
    const { route, router } = useBasic();

    return {
      leftDrawerOpen: ref(false),
      router,
      route
    }
  }
}
</script>


<style lang="scss">
.l-container {
  max-width: 1440px !important;
}

.l-grow {
  flex-grow: 99 !important;
}

.l-text-header {
  font-size: 64px !important;
  line-height: 1;
  @media only screen and (max-width: 900px) {
    font-size: 36px !important;
  }
  @media only screen and (max-width: 500px) {
    font-size: 24px !important;
  }
}

.l-text-title {
  font-size: 32px !important;
  line-height: 1.8;
  @media only screen and (max-width: 900px) {
    font-size: 26px !important;
  }
  @media only screen and (max-width: 500px) {
    font-size: 20px !important;
  }
}

.l-text-subtitle {
  font-size: 20px !important;
  line-height: 1.8;
  @media only screen and (max-width: 500px) {
    font-size: 16px !important;
  }
}

.l-text-detail {
  font-size: 18px !important;
  line-height: 1.8;
  @media only screen and (max-width: 500px) {
    font-size: 13px !important;
  }
}

.l-text-description {
  font-size: 14px !important;
  line-height: 1.8;
  @media only screen and (max-width: 500px) {
    font-size: 11px !important;
  }
}

.border-card {
  border-radius: 10px !important;
  border: 1px solid #d0d0d0 !important;
}
</style>