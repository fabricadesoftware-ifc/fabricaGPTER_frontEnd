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
  width: 100%;
  justify-content: center;
  display: flex;
  gap: 4rem;
  font-size: 1.2rem;
}

.links a {
  color: #000;
  text-decoration: none;
  transition: color 0.3s;
}

.icons {
  padding-right: 3rem;
  display: flex;
  gap: 4rem;
  align-items: center;
  font-size: 2.2rem;
}
</style>
