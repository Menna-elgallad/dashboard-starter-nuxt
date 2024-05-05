<template lang="pug">
.border.rounded-xl.text-xs.px-2(:class="labelType")  {{ value }}    
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const labelType = computed(() => {
  return `label-${props.type}-${getStatusColor(props.value)}`;
});
</script>

<style lang="scss">
.label {
  &-outline {
    &-primary {
      border: 1px solid $primary;
      color: $primary;
    }
    &-red {
      border: 1px solid $danger;
      color: $danger;
    }
    &-green {
      border: 1px solid $sucess;
      color: $sucess;
    }
    &-brown {
      border: 1px solid $brown;
      color: $brown;
    }
  }
  &-solid {
    // &-primary {
    //   border: 1px solid $primary;
    //   color: $primary;
    // }
    // &-red {
    //   border: 1px solid $danger;
    //   color: $danger;
    // }
    // &-green {
    //   border: 1px solid $sucess;
    //   color: $sucess;
    // }
    &-brown {
      border: 1px solid $brown;
      color: $brown;
      background-color: $brown-light;
    }
  }
}
</style>
