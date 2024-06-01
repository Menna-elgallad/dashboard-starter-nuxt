<template lang="pug">
.flex.items-center.justify-center.h-screen
    .text-center.bg-white.rounded-2xl
      div.m-auto(class="w-[400px]")

      p.text-xl.max-w-xl.text-gray-800.mb-10 Oops! This page is still under construction.
      el-button(size='large' type="primary" @click="handleerror")  Go back Home

</template>

<script setup>
defineProps(["error"]);

const handleerror = () => {
  clearError({ redirect: "/" });
};
</script>

<style scoped></style>
