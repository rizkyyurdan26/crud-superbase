<template>
  <div class="flex flex-col gap-3 items-start p-10">
    <h1 class="font-bold text-lg">
      {{ isEdit ? "Edit Data" : "Create Data" }}
    </h1>

    <form @submit.prevent="handleSubmit" class="space-y-3">
      <!-- Product Name -->
      <div class="flex flex-col gap-2 items-start">
        <label>Product Name:</label>
        <input
          type="text"
          required
          @input="isFilled = true"
          placeholder="Ex: Indomie"
          class="border border-slate-300 px-2 py-px rounded focus:outline-none"
          v-model="inputProductName"
        />
      </div>

      <!-- Quantity -->
      <div class="flex flex-col gap-2 items-start">
        <label>Quantity:</label>
        <input
          type="number"
          required
          @input="isFilled = true"
          placeholder="Ex: 100"
          class="border border-slate-300 px-2 py-px rounded focus:outline-none"
          v-model="inputQuantity"
        />
      </div>

      <!-- Location -->
      <div class="flex flex-col gap-2 items-start">
        <label>Location:</label>
        <input
          type="text"
          required
          @input="isFilled = true"
          placeholder="Ex: Rak-B"
          class="border border-slate-300 px-2 py-px rounded focus:outline-none"
          v-model="inputLocation"
        />
      </div>

      <!-- Button Submit -->
      <button
        type="submit"
        class="border-2 border-cyan-600 text-cyan-700 px-5 rounded"
      >
        {{ isEdit ? "Update" : "Create" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { useProductStore } from "../stores/product.store";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const isEdit = computed(() => {
  return route.path === `/edit/${route.params.id}`;
});

const isSaved = ref(false);
const isFilled = ref(false);

const inputProductName = ref("");
const inputQuantity = ref("");
const inputLocation = ref("");

const handleSubmit = async () => {
  const payload = {
    productName: inputProductName.value,
    quantity: inputQuantity.value,
    location: inputLocation.value,
  };

  if (!isEdit.value) {
    payload.sku = crypto.randomUUID();
  }

  if (isEdit.value) {
    if (confirm("Update Data?")) {
      try {
        await productStore.editData(route.params.id, payload);

        alert("Data has been updated ✅");
        isSaved.value = true;

        inputProductName.value = "";
        inputQuantity.value = "";
        inputLocation.value = "";

        router.push("/");
      } catch (err) {
        console.error("Failed Update", err);
      }
    }
  } else {
    if (confirm("Save new data?")) {
      try {
        await productStore.createData(payload);

        alert("Create Success ✅");
        isSaved.value = true;

        inputProductName.value = "";
        inputQuantity.value = "";
        inputLocation.value = "";

        router.push("/");
      } catch (err) {
        console.error("Failed Create New Data", err);
      }
    }
  }
};

onMounted(async () => {
  if (isEdit.value) {
    if (productStore.products.length === 0) {
      await productStore.getAllData();
    }
    const dataEdit = productStore.products.find(
      (item) => item.id == route.params.id,
    );

    if (dataEdit) {
      inputProductName.value = dataEdit.productName;
      inputQuantity.value = dataEdit.quantity;
      inputLocation.value = dataEdit.location;
    }
  }
});

onBeforeRouteLeave((to, from) => {
  if (isFilled.value && !isSaved.value) {
    return confirm("Leave this page will not save your modify");
  }
});
</script>
