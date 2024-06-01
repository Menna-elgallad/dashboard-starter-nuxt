<template lang="pug">
el-form-item(:label="label" :error='errorMessage' class="!mb-6 w-full")
    el-upload.w-full(v-model:file-list='inputValue' :limit="limit" action='#' :name="name" :on-success="handleUploadSuccess" :class="{'upload-disabled-none' : limit===1 && inputValue.length}"  :before-upload="beforeUpload"   v-loading="loading" :http-request="handleUploadRequest"  )
        .text-gray-400.text-xs
            .el-icon.avatar-uploader-icon
               Icon(:name="icon")
            .el-upload__text.w-full
                | {{$t('browseOrDrag') }}
            
        template(#tip='' )
            .el-upload__tip.flex.items-center.gap-1(v-if="note")
              Icon(name='iconamoon:information-circle')
              | {{note}}
</template>

<script lang="ts" setup>
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import { UploadFilled } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import type { UploadFile } from "element-plus";
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
    default: [],
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
  note: {
    type: String,
    default: "",
  },

  type: {
    type: String,
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
      // "image/webp",
      // "image/svg+xml",
    ],
  },
  limit: {
    type: Number,
    default: null,
  },
});

const icon = computed(() => {
  switch (props.type) {
    case "file":
      return "IconAdd";
    case "image":
      return "IconImage";
    case "video":
      return "IconVideo";
    default:
      return "IconImageList";
  }
});

const runtimeConfig = useRuntimeConfig();

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};
const loading = ref(false);

const handleUploadRequest = async (params: any) => {
  loading.value = true;
  const { success, data } = await uploadFile("LECTURER_CV_FILE", params.file);

  loading.value = false;
  if (!success) return;
  else {
    return runtimeConfig.public.BUCKET_URL + data;
  }
};

const handleRemove = (file: UploadFile) => {
  inputValue.value.splice(inputValue.value.indexOf(file), 1);
};

const handleUploadSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {};
const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (!props.formats.includes(rawFile.type)) {
    ElMessage.error({
      message: `${t("acceptUpload")} ${props.formats
        .map((format) => format.split("/").pop())
        .join(" , ")}`,
    });
    return false;
  } else if (rawFile.size / 1024 / 1024 > props.sizeInMb) {
    ElMessage.error(`${t("uploadMaxSize")} ${props.sizeInMb} MB`);
    return false;
  }
  return true;
};

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
if (props.value.length) {
  inputValue.value = props.value;
}
</script>

<style lang="scss">
.el-upload-list {
  &--picture-card {
    .el-upload-list__item {
      border-radius: $raduis-base;
    }
  }
}
.upload-disabled-none {
  .el-upload.el-upload--text {
    display: none;
  }
}
.el-upload__tip {
  margin: 0 !important;
  opacity: 50%;
}
</style>
