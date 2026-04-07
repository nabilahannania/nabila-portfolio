import { useRouter, useRoute } from "vue-router";
import { ref, reactive, inject, watch, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import moment from "moment";

export default function useBasic() {
  const router = useRouter();
  const route = useRoute();
  // const $http = inject("$http");
  // const thousand = inject("thousand");
  // const rupiah = inject("rupiah");
  const $q = useQuasar();

  let isLoadingData = ref(false);

  let loadThis = async (fun) => {
    isLoadingData.value = true;
    await fun();
    isLoadingData.value = false;
  };

  let waitThis = async (fun) => {
    $q.loading.show();
    await fun();
    $q.loading.hide();
  };

  let isCan = (roles) => {
    if (roles.includes(route.meta.user.department)) {
      return false;
    }
    return true;
  };

  return {
    router,
    route,
    $q,
    moment,
    isLoadingData,
    ref,
    reactive,
    watch,
    onMounted,
    computed,
    loadThis,
    waitThis,
    isCan,
  };
}