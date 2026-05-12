<template>
  <div class="overflow-x-auto">
    <table class="min-w-lg w-full">
      <thead>
        <tr class="bg-cyan-600 text-white table-fixed">
          <th v-if="!isDetail" class="py-2 border-r">No</th>
          <th v-if="isDetail" class="py-2 border-r">Unique</th>
          <th class="border-r">Product Name</th>
          <th class="border-r">Quantity</th>
          <th v-if="isDetail" class="border-r">Location</th>
          <th v-if="!isDetail" class="border-r">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, i) in data" :key="item.id" class="text-center">
          <td v-if="!isDetail">{{ i + 1 }}</td>
          <td v-if="isDetail">{{ item.sku }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td v-if="isDetail">{{ item.location }}</td>
          <td v-if="!isDetail" class="space-x-2">
            <button @click="emit('detail', item.id)">📑</button>
            <button @click="emit('edit', item)">✏️</button>
            <button @click="emit('delete', item)">❌</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter()

const isDetail = computed(() => {
  return route.path === `/product/${route.params.id}`
});

defineProps({
  data: Array,
});

const emit = defineEmits(["detail", "edit", "delete"]);
</script>
