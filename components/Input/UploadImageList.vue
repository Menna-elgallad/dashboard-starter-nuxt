<template lang="pug">
el-form-item(:label="label" :error='errorMessage' :class="class")
  el-upload.w-fit.list-upload(v-model:file-list='inputValue' action='#' :name="name" :on-success="handleUploadSuccess"   v-loading="loading" :http-request="handleUploadRequest" list-type='picture-card' )
    el-icon
      plus
    template(#file='{ file }')
      div.w-full
        LazyImg.el-upload-list__item-thumbnail.m-auto(:src='file?.response' alt='')
        span.el-upload-list__item-actions
          span.el-upload-list__item-preview(@click='handlePictureCardPreview(file)')
            el-icon
              zoom-in
          span.el-upload-list__item-delete(v-if='!disabled' @click='handleRemove(file)')
            el-icon
              delete
  el-dialog.file(class='xl:!w-1/3 lg:!w-1/3 sm:!w-[90%] !w-full' v-model='dialogVisible')
      LazyImg( :src='dialogImageUrl' alt='Preview Image') 

</template>

<script lang="ts" setup>
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import type { UploadFile } from "element-plus";
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
  const response = await uploadFile(params);
  loading.value = false;
  return runtimeConfig.public.BUCKET_URL + response;
};

const handleRemove = (file: UploadFile) => {
  inputValue.value.splice(inputValue.value.indexOf(file), 1);
};

const handleUploadSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  console.log(inputValue.value);
};

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(props.name, undefined, {
  initialValue: props.value ? props.value : [],
});

if (props.value) {
  inputValue.value = props.value;
}
</script>
