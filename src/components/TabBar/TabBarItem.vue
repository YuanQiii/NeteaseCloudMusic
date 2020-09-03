<template>
  <div>
    <slot />
    <span class="active"></span>
  </div>
</template>

<script>
export default {
  name: "TabarItem",
}
</script>

<style scoped>

div {
  height: 70px;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.1s;
  position: relative;
}
div:hover {
  background-color: #333;
}
</style>