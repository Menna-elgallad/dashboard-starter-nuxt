<template lang="pug">
el-form-item( :label="label" :error='errorMessage' class="!mb-6")

    el-upload.avatar-uploader( action='#' class="w-fit" v-loading="loading" :name="name" :drag='true' :http-request="handleUploadRequest" list-type='picture-card'  :show-file-list="false"	  :on-success="handleUploadSuccess" :before-upload="beforeAvatarUpload")
        ul.el-upload-list.el-upload-list--picture-card(v-if='inputValue')
            li.el-upload-list__item.is-ready(class="!m-0 rtl:!ml-0")
                LazyImg.w-full.el-upload-list__item-thumbnail(:src='inputValue')
                span.el-upload-list__item-actions
                    span.el-upload-list__item-preview(@click.stop='handlePictureCardPreview()')
                        el-icon
                             zoom-in
                    span.el-upload-list__item-preview(@click.stop='handlePictureCardCrop()')
                        el-icon
                            Crop
                    span.el-upload-list__item-delete(v-if='!disabled' @click.stop='handleRemove()')
                        el-icon
                             delete
        div.text-gray-400(v-if='!inputValue && !loading')
          el-icon.avatar-uploader-icon
              Icon(:name="icon")
          p.text-xs {{ t('browseOrDrag') }}
        template(#tip='')
            .el-upload__tip.flex.items-center.gap-1(v-if="note")
              Icon(name='iconamoon:information-circle')
              | {{note}}
    
    el-dialog(class='!bg-transparent  !shadow-none xl:!w-1/3 lg:!w-1/3 sm:!w-[90%] !w-full ' v-model='dialogView')
        LazyImg( :src='inputValue' :key="dialogView"  alt='Preview Image')
    el-dialog(v-model='dialogCrop' :key="srcValue"  class=" px-5 xl:!w-1/3 lg:!w-1/3 !w-[90%]  " align-center='' )
            Cropper(class="cropper"
                :key="srcValue"
                :src="runtimeConfig.public.BASE_URL + srcValue"
                :stencil-props="{aspectRatio: 1/1}"
                :resizeImage="{ wheel: false }"
                ref="cropper")
            .flex.w-full.justify-between.mt-8
                el-button.w-full( size="large"   @click="dialogCrop= false") {{ t('cancel') }}
                el-button.w-full( size="large" type="primary"  @click="cropImage")   {{ t('save') }}
</template>

<script lang="ts" setup>
import { Delete, Download, Plus, ZoomIn, Crop } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile, UploadFile } from "element-plus";
import { ElMessage } from "element-plus";
import { useAuthStore } from "~/stores/auth";

import { useField } from "vee-validate";
const { t } = useI18n();
const props = defineProps({
  name: {
    type: String,
    default: "",
    required: false,
  },
  value: {
    type: String,
    default: "",
    required: false,
  },

  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  sizeInMb: {
    type: Number,
    default: 2, //2mb
  },
  formats: {
    type: Array,
    default: [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/webp",
      // "image/svg+xml",
    ],
    required: false,
  },
  type: {
    type: String,
  },
  note: {
    type: String,
  },
});
const authStore = useAuthStore();
const runtimeConfig = useRuntimeConfig();
const srcValue = ref();

const loading = ref(false);

const icon = computed(() => {
  switch (props.type) {
    case "pdf":
      return "Download";
    case "image":
      return "IconImage";
    case "video":
      return "IconVideo";
    default:
      return "IconPlus";
  }
});

const handleUploadSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  if (!response) return;
  inputValue.value = response;
  srcValue.value = inputValue.value;
};

const handleRemove = () => {
  inputValue.value = "";
};

const handleUploadRequest = async (params: any) => {
  loading.value = true;
  const { success, data } = await uploadFile("PROFILE_PICTURE", params.file);
  loading.value = false;
  if (success) {
    return data;
  } else {
    return null;
  }
};

const dialogImageUrl = ref("");
const dialogView = ref(false);
const handlePictureCardPreview = () => {
  dialogView.value = true;
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (!props.formats.includes(rawFile.type)) {
    ElMessage.error({
      message: `${t("acceptUpload")} ${props.formats
        .map((format) => format.split("/").pop())
        .join(" , ")}`,
    });
    return false;
  } else if (rawFile.size / 1024 / 1024 > props.sizeInMb) {
    ElMessage.error(t("uploadMaxSize") + props.sizeInMb + "MB");
    return false;
  }
  return true;
};

const cropper = ref();
const dialogCrop = ref(false);
function handlePictureCardCrop() {
  dialogCrop.value = true;
}

function cropImage() {
  const { canvas } = cropper.value.getResult();
  if (canvas) {
    canvas.toBlob((blob) => {
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      handleUploadRequest({ file: file }).then((response) => {
        inputValue.value = response;
      });
    }, "image/jpeg");

    dialogCrop.value = false;
  }
}

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(props.name, undefined, {
  initialValue: props.value,
});
watch(
  () => props.value,
  () => {
    if (props.value) {
      inputValue.value = props.value;
    }
  }
);
watch(inputValue, () => {
  if (!srcValue.value) {
    srcValue.value = inputValue.value;
  }
});
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: $raduis-base;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
.el-upload-list__item-thumbnail {
  border-radius: $raduis-base;
}
</style>
