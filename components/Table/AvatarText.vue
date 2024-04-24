<template lang="pug">
div.flex.items-center.gap-3
        Avatar(:src="image" )
        div
            h3.text-sm.font-medium.text-black {{ title }}
            p.text-xs {{ text }}  
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
});
</script>
