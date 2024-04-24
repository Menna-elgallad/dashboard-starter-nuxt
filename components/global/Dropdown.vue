<template lang="pug">
.dorpdownele().relative
    .myicon( @click.stop="[toggleDropdown()]")
         slot(name="toggle")
    transition(name='slide' :class="{ 'w-full top-[80px]': select}" class="top-[60px] right-[10px]").absolute
        .dropdown-menu2(v-if="showDropdown")
                slot 
</template>

<script setup>
const props = defineProps({
  showDropdown: Boolean,
  select: Boolean,
});
if (process.client) {
  window.addEventListener("click", () => {
    if (props.showDropdown) {
      emit("toggleDropdown", false);
    }
  });
}

const emit = defineEmits(["toggleDropdown"]);
const toggleDropdown = () => {
  emit("toggleDropdown", !props.showDropdown);
};
</script>

<style lang="scss" scoped>
.dropdown-menu2 {
  background-color: white;
  border-radius: 9px;
  padding: 16px 24px;
  z-index: 99;
  box-shadow: 0 0 8px 2px #cfcfcf4a;
}
</style>
