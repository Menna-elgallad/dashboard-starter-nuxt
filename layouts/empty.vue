<template lang="pug">
.container
    slot
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
const { locale, tm, rt, localeProperties } = useI18n();
const auth = useAuthStore();
auth.setLocale(locale.value);
useHead({
  htmlAttrs: {
    dir: localeProperties.value.dir,
  },
});
</script>

<style lang="scss"></style>
