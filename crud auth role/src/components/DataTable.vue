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
          <th v-if="!isDetail">Action</th>
        </tr>
      </thead>

      <tbody>
        <!-- Handling before get data -->
        <tr v-if="loading">
          <td colspan="4" class="text-center">Loading...</td>
        </tr>
        <tr v-else-if="error">
          <td colspan="4" class="text-center">
            {{ error }}
          </td>
        </tr>
        <tr v-else-if="products.length === 0">
          <td colspan="4" class="text-center">Data is unvailable</td>
        </tr>

        <!-- Handling data -->
        <template v-else>
          <tr v-for="(item, i) in products" :key="item.id" class="text-center">
            <td v-if="!isDetail" class="py-1">{{ i + 1 }}</td>
            <td v-if="isDetail" class="py-2 w-90 break-all">{{ item.sku }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.quantity }}</td>
            <td v-if="isDetail">{{ item.location }}</td>
            <td v-if="!isDetail" class="space-x-2">
              <button @click="$emit('detail', item.id)">📑</button>
              <button @click="$emit('edit', item)">✏️</button>
              <button @click="$emit('delete', item)">❌</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isDetail = computed(() => {
  return route.path === `/product/${route.params.id}`;
});

defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  loading: Boolean,
  error: String,
});

defineEmits(["detail", "edit", "delete"]);
</script>
