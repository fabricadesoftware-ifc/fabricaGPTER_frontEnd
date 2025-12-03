<template>
  <div class="w-100 mt-2 d-flex" :class="[justify, margin]">
    <h1 class="text-h4 font-weight-bold">{{ title }}</h1>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
    justify: {
      type: String,
      default: 'justify-start',
    },
    margin: {
      type: String,
      default: 'mb-6',
    },
  })
</script>
