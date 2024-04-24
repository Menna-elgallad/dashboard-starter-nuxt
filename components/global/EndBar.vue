<template lang="pug">
.end 
    slot
</template>

<style lang="scss" scoped>
.end {
  position: fixed;
  bottom: 0;
  background-color: white;
  width: 100vw;
  padding: 1rem 3rem;
  display: flex;
  justify-content: flex-end;
  right: 0;
  box-shadow: 0px 6px 15px 2px #cccc;
  z-index: 2;
}
</style>
