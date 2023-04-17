<template>
  <PopulationProfileUserHeader />
</template>

<script setup>
definePageMeta({
  middleware: ["logger"]
});
</script>

<script>
import { useUserStore } from '~/stores/User';

export default {
  data() {
    return {
      user: useUserStore()
    }
  },
  created() {
    this.user.getProfile();
  }
}
</script>