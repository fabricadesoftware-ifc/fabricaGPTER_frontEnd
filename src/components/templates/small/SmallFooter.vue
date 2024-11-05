<script setup></script>
<template>
  <div class="icons">
    <RouterLink to="/">
      <i class="mdi mdi-home-outline" />
      Home
    </RouterLink>
    <RouterLink to="/">
      <i class="mdi mdi-account-circle-outline" />
      Perfil
    </RouterLink>
    <RouterLink to="/">
      <i class="mdi mdi-cart-outline" />
      Carrinho
    </RouterLink>
    <RouterLink to="/">
      <i class="mdi mdi-menu" />
      Menu
    </RouterLink>
  </div>
</template>
<style scoped>
#footerMenu {
  position: fixed;
  bottom: 15%;
  right: 0;

  width: 20%;
  border-top: #eeeeee 1px solid;
  background-color: white;

  display: block;
  padding: 1rem;
}

#footerMenu a {
  display: flex;
  width: 100%;
  justify-content: space-between;
  text-decoration: none;
  color: #282828;
  font-size: 1rem;
  transition: color 0.3s;
}

.icons {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: 1.7rem;
}

.icons a {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #282828;
  font-size: 1rem;
  transition: color 0.3s;
}
</style>
