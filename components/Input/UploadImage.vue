<template lang="pug">
el-form-item(:label="label" :error='errorMessage' :class="class")
    el-upload.avatar-uploader(action='#' class="w-fit" v-loading="loading" :name="name" :http-request="handleUploadRequest" list-type='picture-card'  :show-file-list="false"	  :on-success="handleUploadSuccess" :before-upload="beforeAvatarUpload")
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
        el-icon.avatar-uploader-icon(v-if='!inputValue && !loading')
            plus

    el-dialog.file(class='xl:!w-1/3 lg:!w-1/3 sm:!w-[90%] !w-full ' v-model='dialogView')
        LazyImg( :src='inputValue' :key="dialogView"  alt='Preview Image')
    el-dialog(v-model='dialogCrop' :key="srcValue"  class=" px-5 xl:!w-1/3 lg:!w-1/3 !w-[90%]  " align-center='' )
            Cropper(class="cropper"
                :key="srcValue"
                :src="srcValue"
                :stencil-props="{aspectRatio: 1/1}"
                :resizeImage="{ wheel: false }"
                ref="cropper")
            .flex.w-full.gap-2.justify-between.mt-8
                AppButton(title="Cancel" :selected="false"  @click="dialogCrop= false").w-full
                AppButton(title="Save" :selected="true" @click="cropImage").w-full     
</template>

<script lang="ts" setup>
import { Delete, Download, Plus, ZoomIn, Crop } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile, UploadFile } from "element-plus";
import { ElMessage } from "element-plus";
import { useAuthStore } from "~/stores/auth";
import { useField } from "vee-validate";
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
  class: {
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
});
const authStore = useAuthStore();
const runtimeConfig = useRuntimeConfig();
const srcValue = ref();

const loading = ref(false);

const handleUploadSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  inputValue.value = runtimeConfig.public.BUCKET_URL + response;
  srcValue.value = inputValue.value;
};

const handleRemove = () => {
  inputValue.value = "";
};

const handleUploadRequest = async (params: any) => {
  loading.value = true;
  const response = await uploadFile(params);
  loading.value = false;
  return response;
};

const dialogImageUrl = ref("");
const dialogView = ref(false);
const handlePictureCardPreview = () => {
  dialogView.value = true;
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  console.log("rawFile", rawFile);
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
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
        inputValue.value = runtimeConfig.public.BUCKET_URL + response;
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

if (props.value) {
  inputValue.value = props.value;
}
watch(inputValue, () => {
  if (!srcValue.value) {
    srcValue.value = inputValue.value;
  }
});
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: $raduis-input;
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
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
