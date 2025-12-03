<template>
  <div class="p-4">
    <form
      action=""
      class="flex flex-col items-center gap-2"
      @submit.prevent="submitForm"
    >
      <div class="flex gap-2 items-center justify-center">
        <label for="username">Nom d'utilisateur: </label>
        <input
          v-model="form.username"
          type="text"
          name="username"
          id="username"
          autocomplete="off"
        />
      </div>

      <div class="flex gap-2 items-center justify-center">
        <label for="password">Mot de passe: </label>
        <input
          v-model="form.password"
          type="password"
          name="password"
          id="password"
          autocomplete="off"
        />
      </div>

      <button type="submit" class="px-6!">Login</button>
      <div v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script lang="ts" setup>
const form = reactive({
  username: "",
  password: "",
});
const error = ref<string | null>(null);
const navbarRefreshKey = useState<number>("navbarRefreshKey", () => 0);
async function submitForm() {
  error.value = null;
  if (!form.username) {
    error.value = "Nom d'utilisateur est requis";
    return;
  }
  if (!form.password) {
    error.value = "Mot de passe est requis";
    return;
  }
  const result = await $fetch.raw("/api/auth/login", {
    method: "POST",
    body: { username: form.username, password: form.password },
    async onResponseError({ response }) {
      if (response.status === 401) {
        error.value = response._data.message;
        return;
      }
    },
  });
  if (!result.ok) {
    error.value = "Erreur lors de login";
    return;
  }
  if (!(result._data && result._data?.token)) {
    error.value = "Erreur dans la reponse";
    return;
  }

  useCookie("jwt_token").value = result._data?.token;
  navbarRefreshKey.value++;
  await navigateTo("/");
}
</script>

<style scoped>
@import "tailwindcss";

input,
button {
  @apply bg-neutral-700 border border-neutral-500 p-2 rounded-full;
}
</style>
