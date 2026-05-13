<template>
  <div class="p-10 flex flex-col gap-3">
    <h1 class="font-bold text-lg">All Products</h1>

    <router-link
      to="/"
      class="border-2 w-fit px-3 py-px rounded-lg border-cyan-600 text-cyan-700"
      >Back</router-link
    >

    <DataTable
      :products="dataDetail"
      :loading="productStore.loading"
      :error="productStore.error"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useProductStore } from "../stores/product.store";
import { useRoute } from "vue-router";
import DataTable from "../components/DataTable.vue";

const productStore = useProductStore();
const route = useRoute();
const dataDetail = ref([]);

onMounted(async () => {
  try {
    await productStore.getAllData();

    dataDetail.value = productStore.products.filter(
      (item) => item.id == route.params.id,
    );

    // console.log(dataDetail.value);
  } catch (err) {
    console.error("Get Detail Data Failed", err);
  }
});
</script>
