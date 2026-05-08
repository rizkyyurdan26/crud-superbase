<template>
  <div class="overflow-x-auto">
    <table class="w-full min-w-lg">
      <thead class="bg-cyan-600 text-white text-xl font-semibold">
        <tr>
          <th class="border rounded-l-lg py-2">No</th>
          <th class="border px-4">Product Name</th>
          <th class="border px-4">Quantity</th>
          <th class="border px-4 rounded-r-lg">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="loading">
          <td colspan="4" class="text-center py-2">Loading...</td>
        </tr>
        <tr v-else-if="error">
          <td colspan="4" class="text-center py-2">{{ error }}</td>
        </tr>
        <tr
          v-else
          v-for="(item, i) in data"
          :key="item.id"
          class="text-md font-medium text-center border-b border-slate-300"
        >
          <td class="py-2">{{ i + 1 }}</td>
          <td class="">{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td class="space-x-3">
            <button
              class="text-lg cursor-pointer"
              @click="emit('detail', item.id)"
            >
              📑
            </button>
            <button
              class="text-lg cursor-pointer"
              @click="emit('update', item)"
            >
              ✏️
            </button>
            <button
              class="text-lg cursor-pointer"
              @click="emit('delete', item)"
            >
              ❌
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  data: Array,
  loading: Boolean,
  error: String,
});

const emit = defineEmits(["detail", "update", "delete"]);
</script>
