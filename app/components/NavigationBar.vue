<template>
  <nav class="flex justify-between p-4 bg-neutral-800" :key="refreshKey">
    <NuxtLink to="/">Website</NuxtLink>

    <ul class="inline-flex items-center gap-2">
      <UColorModeSwitch />
      <li><NuxtLink to="/sites">Sites</NuxtLink></li>
      <li><NuxtLink to="/about">About</NuxtLink></li>
      <div v-if="!user" class="inline-flex gap-2">
        <li><NuxtLink to="/login">login</NuxtLink></li>
        <li><NuxtLink to="/register">register</NuxtLink></li>
      </div>
      <div v-else class="inline-flex gap-2">
        {{ user.username }}
      </div>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const refreshKey = useState<number>("navbarRefreshKey", () => 0);
const user = ref<JwtUserInfo | null>(null);
onMounted(async () => {
  await verifyAuthentication();
});
async function verifyAuthentication() {
  const token = useCookie("jwt_token");
  if (!token) {
    return;
  }
  const result = await $fetch("/api/auth/verifyToken", {
    method: "POST",
    body: { token: token.value },
  });
  if (!result.succuss) {
    return;
  }
  user.value = result.user.user;
}
watch(refreshKey, async () => {
  await verifyAuthentication();
});
</script>
