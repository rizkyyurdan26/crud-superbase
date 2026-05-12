<template>
  <div class="overflow-x-auto mt-5">
    <table class="w-full min-w-lg">
      <thead class="bg-cyan-600 rounded">
        <tr class="text-white">
          <th class="px-5 py-2">No</th>
          <th class="px-5 py-2">Name</th>
          <th class="px-5 py-2">Quantity</th>
          <th class="px-5 py-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="loading" class="text-center">
          <td colspan="4" class="text-center text-lg py-2">Loading..</td>
        </tr>
        <tr v-else-if="error" class="text-center">
          <td colspan="4" class="text-center text-lg py-2">{{ error }}</td>
        </tr>
        <tr v-else class="text-center" v-for="(item, i) in data" :key="item.id">
          <td class="px-5 py-2">{{ i + 1 }}</td>
          <td class="px-5 py-2">{{ item.productName }}</td>
          <td class="px-5 py-2">{{ item.quantity }}</td>
          <td class="space-x-2">
            <button @click="emit('detail', item.id)">📑</button>
            <button  @click="emit('edit', item)">✏️</button>
            <button @click="emit('delete', item)">❌</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore()
defineProps({
  data: Array,

  loading: Boolean,
  error: String,
});

const emit = defineEmits(["detail", "edit", "delete"]);
</script>
