<template>
    <div class="flex flex-col gap-2 p-10 items-start">
        <router-link to="/" class="border-2 px-2 rounded border-slate-400 text-slate-600">< Back</router-link>
        <h1 class="font-semibold text-xl">Product Detail</h1>
        
        <!-- Loading / error -->
        <p v-if="store.loadingGetId" class="w-full text-center">Loading...</p>
        <p v-if="store.errorGetId" class="w-full text-center">{{ store.errorGetId }}</p>

        <!-- Table Detail -->
        <Table v-else :data="store.detailData" section="detail"/>
        
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMaindataStore } from '../stores/maindata.store';
import { useRoute } from 'vue-router';
import Table from '../components/Table.vue';

const store = useMaindataStore()
const route = useRoute()

onMounted(async () => {
    await store.getDataId(route.params.id)
})
</script>
