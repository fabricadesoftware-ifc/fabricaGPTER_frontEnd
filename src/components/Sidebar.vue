<script setup>
  defineProps({
    settings: {
      type: Array,
      required: true,
    },
  });
</script>

<template>
  <v-navigation-drawer location="left" permanent>
    <template #prepend>
      <div class="pa-6 text-center blue-gradient">
        <v-avatar size="96">
          <v-img alt="Daniel" cover src="@/assets/foto-profissional.png" />
        </v-avatar>
        <div class="text-h5 font-weight-bold mt-3 text-white">Daniel</div>
      </div>
    </template>

    <v-divider />

    <v-list>
      <v-list-item
        v-for="setting in settings.slice(0, 5)"
        :key="setting.name"
        class="bg-grey-lighten-3 py-4"
        :to="setting.link"
      >
        <template #prepend>
          <component :is="setting.icon" class="mr-3 opacity-70" />
        </template>
        <v-list-item-title>{{ setting.name }}</v-list-item-title>
        <template #append>
          <ChevronRight class="opacity-70" />
        </template>
      </v-list-item>
      <v-list-item
        v-for="setting in settings.slice(5)"
        :key="setting.name"
        class="bg-grey-lighten-3 py-4"
        :to="setting.link"
      >
        <template #prepend>
          <component :is="setting.icon" class="mr-3 opacity-70" />
        </template>
        <v-list-item-title>{{ setting.name }}</v-list-item-title>
        <template #append>
          <ChevronRight class="opacity-70" />
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.blue-gradient {
  background-image: linear-gradient(180deg, #2877d7 0%, #0d519e 100%);
}

.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
