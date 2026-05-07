<template>
  <div class="flex flex-col gap-5 p-10 items-start">
    <router-link
      to="/"
      class="border-2 px-2 rounded border-slate-400 text-slate-600"
      >< Back</router-link
    >
    <h1 class="text-xl font-semibold">
      {{isEdit ? "Update Data" : "Create Data" }}
    </h1>
    <!-- Form Input -->
    <form @submit.prevent="handleData" class="space-y-5">
      <div class="flex flex-col gap-1 items-start">
        <label>Product Name:</label>
        <input
          type="text"
          placeholder="Input Product name"
          v-model="inputName"
          required
          class="border border-slate-400 px-2 py-1 rounded"
        />
      </div>
      <div class="flex flex-col gap-1 items-start">
        <label>Quantity:</label>
        <input
          type="number"
          placeholder="Input Quantity"
          v-model="inputQty"
          required
          class="border border-slate-400 px-2 py-1 rounded"
        />
      </div>
      <div class="flex flex-col gap-1 items-start">
        <label>Location:</label>
        <input
          type="text"
          placeholder="ex: rak-001"
          v-model="inputLocation"
          required
          class="border border-slate-400 px-2 py-1 rounded"
        />
      </div>

      <button
        class="bg-cyan-600 text-white font-semibold px-4 py-1 rounded-lg"
        type="submit"
      >
        {{ isEdit ? "Update" : "Create" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useMaindataStore } from "../stores/maindata.store";
import { useRoute, useRouter } from "vue-router";

const store = useMaindataStore();
const router = useRouter();
const route = useRoute();

const inputName = ref("");
const inputQty = ref(null);
const inputLocation = ref("");
const isEdit = ref(false);

const handleData = async () => {
  const payload = {
    name: inputName.value,
    quantity: Number(inputQty.value),
    location: inputLocation.value,
  };

  if (!isEdit.value) {
    payload.sku = crypto.randomUUID();
  }

  if (isEdit.value) {
    if (confirm("Is data completed?")) {
      const idx = store.updateData.id;
      await store.updateProduct(idx, payload);
      if (store.successUpdate) {
        alert("Data has been updated");
        router.push("/");
      }
    }
  } else {
    if (confirm("Is data completed?")) {
      if (store.errorCreate) {
        alert(store.errorCreate);
      }

      await store.createProduct(payload);
      if (store.successCreate) {
        // Clean data before route
        alert("Data has been created");
        router.push("/");
      }
    }

    inputName.value = "";
    inputQty.value = "";
    inputLocation.value = null;
  }
};

onMounted(() => {
  const handleEditData = store.updateData;
  if (handleEditData) {
    isEdit.value = true
    inputName.value = handleEditData.name;
    inputQty.value = handleEditData.quantity;
    inputLocation.value = handleEditData.location;
  }
});
</script>
