<script setup></script>
<template>
  <div class="links">
    <RouterLink to="/">Help</RouterLink>
    <RouterLink to="/">Contact Us</RouterLink>
    <RouterLink to="/">Privacy & Terms</RouterLink>
  </div>
  <div class="icons">
    <i class="mdi mdi-facebook" />
    <i class="mdi mdi-twitter" />
    <i class="mdi mdi-instagram" />
  </div>
</template>
<style scoped>
.links {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 4rem;
  font-size: 1.2rem;
  color: #000;
}

.links a {
  text-decoration: none;
}

.icons {
  padding-right: 3rem;
  display: flex;
  gap: 4rem;
  font-size: 2.2rem;
}
</style>
