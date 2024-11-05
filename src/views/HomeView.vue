<script setup>
import PatientList from '@/components/PatientList.vue';

import { onMounted } from 'vue';
import { Passage } from '@passageidentity/passage-js';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const getUserInfo = async () => {
  try {
    const authToken = localStorage.getItem('psg_auth_token');
    const passage = new Passage("p16xowieXpeF8v7ibn6dKkhH")
    // const passageUser = new PassageUser(authToken);
    const user = await passage.currentUser.info()
    if (user) {
      await authStore.setToken(authToken);
    } else {
      authStore.unsetToken();
    }
  } catch (error) {
    authStore.unsetToken();
    console.log(error)
  }
};

onMounted(() => {
  getUserInfo();
});
</script>

<template>
  <patient-list />
</template>
