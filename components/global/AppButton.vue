<template lang="pug">
button.AppButton(  :class="{'selected' : selected  , 'outline' : outlined , 'w-[120px]' : fixed }" :value="value" type="button" )
  Icon(:name="icon" v-if="icon && !loading"  class="mr-2 text-md" )  
  Icon(:name="'line-md:loading-alt-loop'" v-show="loading"  class="mr-2 text-md" )  
  span.text-xs {{ title }}
  slot
</template>

<script setup>
const props = defineProps({
  title: String,
  loading: String,
  selected: Boolean,
  icon: {
    type: String,
    required: false,
  },
  outlined: Boolean,
  fixed: Boolean,
  value: String,
});
</script>

<style scoped lang="scss">
.AppButton {
  font-size: 14px !important;

  min-height: $height-input;
  padding: 0.4rem 1.5rem;

  word-break: normal !important;

  span {
    word-break: normal !important;
  }
  border-radius: $raduis-input;
  // min-height: $height-input;
  border: none;
  outline: none;
  background-color: $lighter-gray;
  color: black;
  font-weight: 500;
  transition: all 0.4s ease;
  border: 1px solid transparent;
  &.outline {
    border: 1px solid #828888;
    background-color: transparent;
    color: #828888;
  }
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 0 0.2rem #cccccc3a;
  }
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
.selected {
  background-color: $primary;
  color: white;
  transition: all 0.4s ease;
  &.outline {
    border: 1px solid $primary;
    background-color: transparent;
    color: $primary;
  }
  &:hover {
    box-shadow: 0 0 0 0.2rem $shadow;
  }
}
button {
  transition: all 0.5s ease;
}
</style>
