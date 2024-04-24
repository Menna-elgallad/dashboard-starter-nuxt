<template lang="pug">

div( class="wrapper h-full")
    div(class="file-upload" :class=" {'cursor-default' : disabled}")
          LazyImg(:src="img" v-if="img" :class=" {'opacity-50' : disabled}" class="object-contain h-full w-full" @click="openEdit=true"  )
          .toggle-icon(@click="$emit('removefile')"): Icon(v-if="file" name="ic:baseline-cancel" class="closeicon")
          input( type="file" @change="addfile" accept=".jpg, .jpeg, .png, .pdf, .doc, .docx, .webp" :disabled="disabled"  :class=" {'!cursor-default' : disabled}" v-if="pdf" ) 
          input( type="file" @change="addfile" accept=".jpg, .jpeg, .png .webp" :disabled="disabled"  :class=" {'!cursor-default' : disabled}" v-else-if="!img" )
            
          .flex.justify-center.items-center.flex-col.text-gray-700(v-if="!img")
                Icon(name="ph:paperclip" class=" text-3xl" v-if="pdf")
                Icon(name="tabler:photo" class=" text-3xl" v-else)
                .loadingLogin(class=" w-full mt-3 text-center" v-if="loading === true && fileData?.name && !file ")  
                     Icon(name="eos-icons:bubble-loading" class=" text-4xl"  )
                p(class="text-xs mt-2 text-center" v-else-if="file") {{ file }}
                p(class="text-xs mt-2 text-center p-2  bg-neutral-200 rounded-xl font-semibold" v-else) {{ text }}
    el-dialog(v-model='openEdit'  width="fit" class="px-5 xl:!w-1/3 lg:!w-1/3 !w-[90%]  " align-center='' )
            Cropper(class="cropper"
                :key="editImage"
                :src="editImage"
                
                :resizeImage="{ wheel: false }"
                ref="cropper")
            .flex.w-full.gap-2.justify-between.mt-8
                AppButton(title="Cancel" :selected="false" :outlined="true" @click="openEdit= false").w-full
                AppButton(title="Save" :selected="true" @click="uploadImage").w-full   
</template>

<script setup>
const emit = defineEmits(["file", "removefile", "error"]);
const runtimeConfig = useRuntimeConfig();
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const props = defineProps({
  text: String,
  img: String,
  disabled: Boolean,
  file: String,
  pdf: { type: Boolean, default: false },
});
const fileData = ref();
if (props.file) {
  fileData.value = {};
  fileData.value.name = props.file;
}
const editImage = ref();
const openEdit = ref(false);
watch(
  () => props.file,
  () => {
    fileData.value = {};
    fileData.value.name = props.file;
    loading.value = false;
  }
);
watch(
  () => props.img,
  () => {
    if (!editImage.value) {
      console.log(props.img, "img");
      getImageRedirectedLink(props.img);
    }
  }
);
const loading = ref(false);
const addfile = (event) => {
  fileData.value = event.target.files[0];
  if (
    [
      "application/pdf",
      "application/msword",
      "image/jpeg",
      "image/png",
      "image/webp",
    ].includes(fileData.value.type)
  ) {
    loading.value = true;
    emit("file", fileData.value);
  } else {
    emit("error", "Not valid file type");
  }
};
const cropper = ref();

async function uploadImage() {
  const { canvas } = cropper.value.getResult();

  if (canvas) {
    canvas.toBlob((blob) => {
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      emit("file", file);
    }, "image/jpeg");

    openEdit.value = false;
  }
}
function getImageRedirectedLink(link) {
  getRedirectedUrlWithHeaders(link)
    .then((response) => {
      editImage.value = response;
      console.log(editImage.value, "editimage");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function getRedirectedUrlWithHeaders(link) {
  console.log(runtimeConfig.public.BUCKET_URL, "bucket");
  const url = link.includes(runtimeConfig.public.BUCKET_URL)
    ? link?.split("?")[0]?.split(runtimeConfig.public.BUCKET_URL)[1]
    : link;
  console.log(url, "url");
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const redirectedUrl = response.url;

    return redirectedUrl;
  } catch (error) {
    console.error("Error getting redirected URL:", error);
    throw error;
  }
}
</script>

<style scoped lang="scss">
html {
  height: 100%;
}

.wrapper {
  .file-upload {
    cursor: pointer;

    width: 100%;
    height: 100%;
    min-height: 150px;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    border: 1px dashed $light-gray;
    overflow: hidden;
    background-color: transparent;
    background-size: 100% 200%;
    transition: all 1s;
    // color: #ffffff;

    color: $primary;
    input[type="file"] {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }
    .toggle-icon {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 20px;
      z-index: 1;
    }
  }
}
</style>
