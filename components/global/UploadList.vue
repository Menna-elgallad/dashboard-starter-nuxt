<template>
  <el-upload
    v-model:file-list="fileList"
    action="#"
    list-type="picture-card"
    :auto-upload="false"
  >
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>

          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog
    class="file xl:!w-1/3 lg:!w-1/3 sm:!w-[90%] !w-full"
    v-model="dialogVisible"
  >
    <LazyImg w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import type { UploadFile } from "element-plus";

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

const fileList = ref<UploadUserFile[]>([]);

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};
const handleRemove = (file: UploadFile) => {
  fileList.value.splice(fileList.value.indexOf(file), 1);
};

const handleDownload = (file: UploadFile) => {
  console.log(file);
};
const handleSuccess = (file: UploadFile) => {
  console.log(fileList.value);
};

watch(
  () => fileList.value,
  (newVal: Object) => {
    console.log(newVal);
  }
),
  { deep: true };
</script>
