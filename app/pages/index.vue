<template>
  <PageTitle>Home</PageTitle>

  <br />
  <UIcon name="i-lucide-lightbulb" class="size-5 text-yellow-300" />

  <UButton
    @click="counter++"
    icon="i-lucide-rocket"
    size="md"
    color="primary"
    variant="solid"
    >Button</UButton
  >

  {{ counter }}

  <br />

  <br />
  {{ sites }}
  <hr />
  <br />
  <UButton
    @click="refresh()"
    icon="i-lucide-rocket"
    size="md"
    color="primary"
    variant="solid"
    >refresh</UButton
  >
  <div v-if="pending">Chargement...</div>
  <div v-if="error">there is an error : {{ error.data.message }}</div>
  <ul v-else class="list-disc list-inside">
    <li v-for="site in sites" :key="site.id">
      {{ site }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
const counter = useState<number>("count", () => 0);

const { data: sites, pending, error, refresh } = useFetch("/api/sites", {});

useHead({
  title: "Home",
});
</script>
