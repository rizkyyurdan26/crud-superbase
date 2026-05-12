<template>
  <div class="flex flex-col gap-5 p-5 items-start">
    <router-link
      to="/"
      class="border-2 px-2 rounded border-cyan-600 text-cyan-600"
      >Back</router-link
    >
    <!-- Title -->
    <h1 class="font-bold text-lg">
      {{ isEdit ? "Edit Data" : "Create New data" }}
    </h1>

    <!-- Form Input -->
    <form @submit.prevent="handleData" class="flex flex-col items-start gap-2">
      <div class="flex flex-col gap-2">
        <label>Product Name:</label>
        <input
          type="text"
          placeholder="Ex: Indomie"
          class="border border-slate-400 px-2 py-px rounded"
          required
          v-model="inputName"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label>Quantity:</label>
        <input
          type="number"
          placeholder="Ex: 100"
          class="border border-slate-400 px-2 py-px rounded"
          required
          v-model="inputQty"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label>Location:</label>
        <input
          type="text"
          placeholder="Ex: Rak-C"
          class="border border-slate-400 px-2 py-px rounded"
          required
          v-model="inputLocation"
        />
      </div>

      <button
        type="submit"
        class="bg-cyan-600 text-white font-semibold px-3 py-1 rounded"
      >
        {{ isEdit ? "Update" : "Create" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { useDataStore } from "../stores/maindata.store";

const isEdit = ref(false);
const isSaved = ref(false);
const inputName = ref("");
const inputQty = ref("");
const inputLocation = ref("");

const store = useDataStore();
const route = useRoute();
const router = useRouter();

const handleData = async () => {
  const payload = {
    productName: inputName.value,
    quantity: Number(inputQty.value),
    location: inputLocation.value,
  };

  if (!isEdit.value) {
    payload.sku = crypto.randomUUID();
  }

  if (isEdit.value) {
    if (confirm("Save edit data?")) {
      await store.editData(route.params.id, payload);
      isSaved.value = true;

      if (store.success.Edit) {
        alert("Data has been updated ✅");
        router.push("/");
      }
    }
  } else {
    if (confirm("Are you sure create this data?")) {
      await store.createData(payload);

      if (store.success.Create) {
        alert("New data has been created ✅");
        router.push("/");
      }
    }
  }

  inputName.value = "";
  inputQty.value = "";
  inputLocation.value = "";
};

onMounted(async () => {
  const id = route.params.id;

  if (id) {
    isEdit.value = true;

    if (store.dataResource.length === 0) {
      await store.getAllData();
    }

    const dataEdit = store.dataResource.find((item) => item.id == id);

    if (dataEdit) {
      inputName.value = dataEdit.productName;
      inputQty.value = dataEdit.quantity;
      inputLocation.value = dataEdit.location;
    }
  }
});

onBeforeRouteLeave((to, from) => {
  if (isEdit.value && !isSaved.value) {
    const answer = confirm(
      '"Are you sure left this page? \nAll change will not save"',
    );
    if (!answer) {
      return false;
    }
  }
});
</script>
