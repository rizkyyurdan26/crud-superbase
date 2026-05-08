<template>
  <div class="p-10 space-y-5">
    <h1 class="font-semibold text-xl">
      {{ isEdit ? "Update Data" : "Create New Data" }}
    </h1>
    <form @submit.prevent="handleData" class="space-y-5">
      <div class="flex flex-col gap-1 items-start">
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Ex: Indomie"
          class="border border-slate-400 rounded px-2 py-px"
          required
          v-model="inputName"
        />
      </div>
      <div class="flex flex-col gap-1 items-start">
        <label>Quantity</label>
        <input
          type="number"
          placeholder="Ex: 100"
          class="border border-slate-400 rounded px-2 py-px"
          required
          v-model="inputQty"
        />
      </div>
      <div class="flex flex-col gap-1 items-start">
        <label>Location</label>
        <input
          type="text"
          placeholder="Ex: Rak-001"
          class="border border-slate-400 rounded px-2 py-px"
          required
          v-model="inputLocation"
        />
      </div>
      <button
        type="submit"
        class="text-cyan-700 border-2 border-cyan-600 cursor-pointer px-2 font-semibold rounded-lg"
      >
        {{ isEdit ? "Update" : "Create" }}
      </button>
    </form>

    <div>
      <p v-if="store.loading.Create" class="text-center">Creating Data...</p>
      <p v-if="store.error.Create" class="text-center text-red-500">
        {{ store.error.Create }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useDataStore } from "../stores/data.store";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";

const store = useDataStore();
const router = useRouter();
const route = useRoute();

const isEdit = ref(false);
const isSave = ref(false);

const inputName = ref("");
const inputQty = ref("");
const inputLocation = ref("");

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
    if (confirm("Are you sure edit this data?")) {
      await store.updateThisData(route.params.id, payload);
      if (store.success.Update) {
        alert("New data has been Update ✅");
        isSave.value = true;
        router.push("/");
      }
    }
  } else {
    if (confirm("Are you sure create this data?")) {
      await store.createNewData(payload);
      if (store.success.Create) {
        alert("Data has been Created ✅");
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

    if (store.mainData.length === 0){
        await store.getAllData();
    }

    const editData = store.mainData.find((item) => item.id == id);

    if (editData) {
      inputName.value = editData.name;
      inputQty.value = editData.quantity;
      inputLocation.value = editData.location;
    } else {
      alert("Data is not found");
      router.push("/");
    }
  }
});

onBeforeRouteLeave((to, from) => {
  if (isEdit.value && !isSave.value) {
    const answer = confirm(
      "Are you sure left this page? \nAll change will not save",
    );
    if (!answer) {
      return false;
    }
  }

});
</script>
