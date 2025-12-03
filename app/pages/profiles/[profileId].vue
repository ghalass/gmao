<template>
  <div>
    <h2>{{ profileId }}</h2>
  </div>
</template>

<script lang="ts" setup>
const profileId = useRoute().params.profileId;
</script>
