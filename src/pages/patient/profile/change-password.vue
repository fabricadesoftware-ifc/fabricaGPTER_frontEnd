<script setup>
  import ProfileSubpage from '@/components/profile/ProfileSubpage.vue'
  import ChangePasswordForm from '@/components/profile/ChangePasswordForm.vue'
</script>

<template>
  <ProfileSubpage subtitle="Use pelo menos 8 caracteres e não reutilize a senha atual." title="Alterar senha">
    <ChangePasswordForm />
  </ProfileSubpage>
</template>
