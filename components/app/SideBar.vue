<template>
  <div class="w-[300px] min-w-[300px] h-full">
    <div class="px-4 py-2 h-[80px]">
      <div
        class="w-full h-full bg-primary rounded-lg flex items-center justify-center px-2"
      >
        <img src="/icons/logo2.png" alt="DWCL-Logo-2" />
      </div>
    </div>
    <div class="py-2 px-4 flex flex-col space-y-1.5">
      <NuxtLink
        v-for="route in routes"
        :to="route.link"
        class="flex justify-start items-center pl-4 font-semibold text-sm h-10 rounded-lg hover:bg-slate-100 text-gray-700"
        :class="[currRoute == route.link ? 'bg-slate-100' : '']"
      >
        <Icon :name="route.icon" class="mr-4 w-5 h-5" />
        {{ route.text }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const userStore = useUserStore();
const routes = userStore.routes;

const currRoute = computed(() => useRoute().name?.toString().split("-")[1]);
</script>

<style></style>
