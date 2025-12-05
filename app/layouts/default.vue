<template>
  <UMain class="h-screen flex flex-col overflow-hidden">
    <nav-header />
    <div class="flex flex-1 overflow-hidden">
      <side-bar />
      <div class="flex-1 overflow-auto p-4"><slot /></div>
    </div>
  </UMain>
</template>
