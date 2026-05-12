<template>
  <div class="flex w-full h-screen items-center justify-center mx-auto">
    <form
      @submit.prevent="handleSubmit"
      class="space-y-5 p-10 bg-cyan-600 rounded-xl text-white"
    >
      <h1 class="font-bold text-lg">
        {{ isEdit ? "Edit Product" : "Create Product" }}
      </h1>

      <div class="flex flex-col gap-2">
        <label>Product Name</label>
        <input
          type="text"
          required
          @input="isFilled = true"
          placeholder="Ex: Indomie"
          class="border border-slate-300 px-2 py-1 rounded focus:outline-none"
          v-model="inputName"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label>Quantity</label>
        <input
          type="number"
          required
          @input="isFilled = true"
          placeholder="Ex: 100"
          class="border border-slate-300 px-2 py-1 rounded focus:outline-none"
          v-model="inputQty"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label>Location</label>
        <input
          type="text"
          required
          @input="isFilled = true"
          placeholder="Ex: Rak-b"
          class="border border-slate-300 px-2 py-1 rounded focus:outline-none"
          v-model="inputLocation"
        />
      </div>

      <button type="submit" class="border-2 border-white rounded-lg px-5 py-1">
        {{ isEdit ? "Update" : "Create" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { useDataStore } from "../stores/data.store";

const dataStore = useDataStore();
const route = useRoute();
const router = useRouter();

const isEdit = computed(() => {
  return route.path === `/edit/${route.params.id}`;
});

const isSaved = ref(false);
const isFilled = ref(false);

const inputName = ref("");
const inputQty = ref("");
const inputLocation = ref("");

const handleSubmit = async () => {
  const payload = {
    name: inputName.value,
    quantity: Number(inputQty.value),
    location: inputLocation.value,
  };

  if (!isEdit.value) {
    payload.sku = crypto.randomUUID();
  }

  if (isEdit.value) {
    if (confirm("Update this data?")) {
      await dataStore.updateThisData(route.params.id, payload);
      if (dataStore.success.Update) {
        isSaved.value = true;
        alert("Update Success ✅");
        inputName.value = "";
        inputQty.value = "";
        inputLocation.value = "";
        router.push("/");
      }
    }
  } else {
    if (confirm("Are you sure create this data?")) {
      await dataStore.createNewData(payload);

      if (dataStore.success.Create) {
        alert("New data has been created ✅");
        inputName.value = "";
        inputQty.value = "";
        inputLocation.value = "";
        router.push("/");
      }
    }
  }
};

onMounted(async () => {
  if (isEdit.value) {
    if (dataStore.mainData.length === 0) {
      await dataStore.getAllData();
    }

    const dataEdit = dataStore.mainData.find(
      (item) => item.id == route.params.id,
    );

    if (dataEdit) {
      inputName.value = dataEdit.name;
      inputQty.value = dataEdit.quantity;
      inputLocation.value = dataEdit.location;
    }
  }
});

onBeforeRouteLeave((to, from) => {
  if (isFilled.value && !isSaved.value) {
    return confirm("Yakin mau keluar? Perubahan belum disimpan.");
  }
});
</script>
