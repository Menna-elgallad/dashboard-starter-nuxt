<template lang="pug">
.flex.items-center.justify-center.h-screen
    .text-center.bg-white.rounded-2xl.p-5
      div.m-auto(class="w-[400px]")

      p.mt-4.text-xl.max-w-xl.text-gray-800 Oops! This page is still under construction.
      div.mt-4: NuxtLink(to="/" ).btn.bg-primary.text-white.px-4.py-2.text-xxs  Go back Home

</template>

<script setup>
defineProps(["error"]);

const handleerror = () => {
  clearError({ redirect: "/" });
};
</script>

<style scoped></style>
