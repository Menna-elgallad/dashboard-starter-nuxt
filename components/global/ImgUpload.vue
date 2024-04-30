<template lang="pug">

div( class="wrapper")
  div(class="file-upload")
    input( type="file" @change="addfile" accept="image/*")
    Icon( name="uil:image-upload" class=" text-lg ")
  
</template>

<script setup>
const emit = defineEmits(["file"]);
const file = ref();
const addfile = (event) => {
  file.value = event.target.files[0];
  emit("file", file.value);
};
</script>

<style scoped lang="scss">
html {
  height: 100%;
}

.wrapper {
  .file-upload {
    cursor: pointer;
    height: 50px;
    width: 50px;
    border-radius: 100px;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid $primary;
    overflow: hidden;

    background-size: 100% 200%;
    transition: all 1s;
    color: #ffffff;
    font-size: 100px;
    color: $primary;
    input[type="file"] {
      height: 200px;
      width: 200px;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }

    &:hover {
      background-position: 0 100%;
      background-image: linear-gradient(to top, $primary 50%, #ffffff 50%);
      color: white;
    }
  }
}
</style>
