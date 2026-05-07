<template>
  <div class="flex flex-col gap-5 p-10 items-start">
    <h1 class="font-semibold">Data Products</h1>
    <!-- Create Button -->
    <router-link to="/create"
      class="border-2 border-cyan-600 px-2 text-cyan-600 rounded font-semibold"
    >
      Create New
    </router-link>

    <!-- Loading / Error -->
    <p v-if="store.errorGet" class="text-center w-full">{{ store.errorGet }}</p>
    <p v-if="store.loadingGet" class="text-center w-full">Loading...</p>

    <!-- Table Data -->
    <Table v-else :data="store.mainData" @detail="handleDetail" @delete="handleDelete" @update="handleUpdate" section="home"/>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useMaindataStore } from "../stores/maindata.store";
import Table from "../components/Table.vue";
import { useRoute, useRouter } from "vue-router";

const store = useMaindataStore();
const router = useRouter();
const routes = useRoute()

const handleDetail = (id) => {
    router.push(`/product/${id}`)
}

const handleUpdate = (item) => {
    if (confirm(`Want to edit ${item.name}?`)){
        store.updateData = item
        router.push(`/edit`)
    }
}
async function handleDelete(item) {
    if (confirm(`Are you sure delete ${item.name}?`)){
        await store.deleteData(item.id)
        if (store.successDelete){
            alert(`${item.name} has been deleted`)
        }
    } else return
}


onMounted(async () => {
  await store.getAll();
  
});
</script>
