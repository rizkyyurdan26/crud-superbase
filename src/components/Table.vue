<template>
  <table class="min-w-full">
    <thead class="bg-cyan-600 rounded">
      <tr class="text-white">
        <th v-if="section === 'home'" class="px-5 py-2">No</th>
        <th v-if="section === 'detail'" class="px-5 py-2">Uniq ID</th>
        <th class="px-5 py-2">Name</th>
        <th class="px-5 py-2">Quantity</th>
        <th v-if="section === 'detail'" class="px-5 py-2">Location</th>
        <th v-if="section === 'home'" class="px-5 py-2">Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr class="text-center" v-for="(item, i) in data" :key="item.id">
        <td v-if="section === 'home'" class="px-5 py-2">{{ i + 1 }}</td>
        <td v-if="section === 'detail'" class="px-5 py-2">{{ item.sku }}</td>
        <td class="px-5 py-2">{{ item.name }}</td>
        <td class="px-5 py-2">{{ item.quantity }}</td>
        <td v-if="section === 'detail'" class="px-5 py-2">
          {{ item.location }}
        </td>
        <td v-if="section === 'home'" class="space-x-2">
          <button @click="emit('detail', item.id)">📑</button>
          <button @click="emit('update', item)">✏️</button>
          <button @click="emit('delete', item)">❌</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  data: Array,
  section: {
    type: String,
    default: "home",
  },
});

const emit = defineEmits(["detail", "update", "delete"]);
</script>
