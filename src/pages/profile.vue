<template>
    <v-container :style="{
        minHeight: mdAndUp ? '20vh' : '20vh',
        maxWidth: mdAndUp ? '30vw' : '100%',
    }" class="ma-0 pa-0 d-flex align-center align-center justify-center blue-gradient rounded-b-xl">
        <MenuProfile class="text-white" />
    </v-container>
            <Settings />
</template>
<script setup>
import MenuProfile from '@/components/MenuProfile.vue'
import Settings from '@/components/Settings.vue'
</script>
<style>
.blue-gradient {
    background-image: linear-gradient(180deg, #2877d7 0%, #0d519e 100%);
}

.darken-blue-gradient {
    background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>