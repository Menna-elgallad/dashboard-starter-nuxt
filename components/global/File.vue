<template lang="pug">   

el-card.main-padding.mt-2(class="min-h-[200px] " ).flex.flex-col.justify-center.items-center.flex-1
        .flex.flex-col.justify-center.items-center
            Icon.text-2xl.text-gray-600(name="ion:document-outline")
            p.mt-3.text-sm.font-semibold.text-center.word-break {{ val ? val.split( '/')[1] : 'No file found' }}
            .actions.flex.mt-3(v-if="val") 
                button.toggle-icon( v-if="val.toLowerCase().includes('.pdf') || val.toLowerCase().includes('.doc') || val.toLowerCase().includes('.docx') " @click="getSecurutyFile(val)"  target="_blank")
                    Icon.text-xl.text-gray-500(name="carbon:view" )
                button.toggle-icon(@click="showfile(val)" v-else)
                    Icon.text-xl.text-gray-500(name="carbon:view" )
                button.toggle-icon(@click="downloadfile(val)"): Icon.text-xl.text-gray-500(:name="loadingDownload ? 'line-md:loading-alt-loop' : 'tabler:download'")
        el-dialog(v-model='fileShow' class="file"  class="xl:!w-1/3 lg:!w-1/3 sm:!w-[90%] !w-full " align-center='' )
                LazyImg.m-auto(:src="runtimeConfig.public.BASE_URL+returnedfile" :key="returnedfile" ) 
</template>

<script setup lang="ts">
import { useMain } from "~/stores/common";
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const mainStore = useMain();

const props = defineProps(["val"]);
const fileShow = ref(false);
const returnedfile = ref("");
function showfile(file) {
  fileShow.value = true;
  returnedfile.value = file;
}
const runtimeConfig = useRuntimeConfig();

const loadingDownload = ref(false);
const downloadfile = async (val) => {
  loadingDownload.value = true;
  await downloadFile(val);
  loadingDownload.value = false;
};

async function getSecurutyFile(link: string) {
  getRedirectedUrlWithHeaders(link)
    .then((response) => {
      window.open(response, "_blank");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function getRedirectedUrlWithHeaders(url) {
  console.log(url);
  try {
    const response = await fetch(runtimeConfig.public.BASE_URL + url, {
      redirect: "follow",
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const redirectedUrl = response.url;
    console.log(redirectedUrl, "redirected url ");
    return redirectedUrl;
  } catch (error) {
    console.error("Error getting redirected URL:", error);
    throw error;
  }
}
</script>
