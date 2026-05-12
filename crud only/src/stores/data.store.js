import { defineStore } from "pinia";
import { dataService } from "../services/data.services";
import { ref } from "vue";

export const useDataStore = defineStore("data", () => {
  const mainData = ref([]);

  const loading = ref({
    Get: false,
    Update: false,
    Delete: false,
    Create: false,
  });

  const error = ref({
    Get: null,
    Update: null,
    Delete: null,
    Create: null,
  });

  const success = ref({
    Create: false,
    Update: false,
    Delete: false,
  });

  async function getAllData() {
    loading.value.Get = true;
    error.value.Get = null;

    try {
      const data = await dataService.getAll();
      mainData.value = data;
      return data;
    } catch (err) {
      error.value.Get =
        err.response?.data?.message || err.message || "Failed Get Data";
    } finally {
      loading.value.Get = false;
    }
  }

  async function deleteDataId(id) {
    loading.value.Delete = true;
    error.value.Delete = null;
    success.value.Delete = false;

    try {
      await dataService.delete(id);
      mainData.value = mainData.value.filter((d) => d.id !== id);
      success.value.Delete = true;
    } catch (err) {
      error.value.Delete =
        err.response?.data?.message || err.message || "Failed Delete Data";
    } finally {
      loading.value.Delete = false;
    }
  }

  async function createNewData(payload) {
    loading.value.Create = true;
    error.value.Create = null;
    success.value.Create = false;

    try {
      const data = await dataService.create(payload);
      mainData.value.unshift(data);
      success.value.Create = true;
      return data;
    } catch (err) {
      error.value.Create =
        err.response?.data?.message || err.message || "Failed Create Data";
    } finally {
      loading.value.Create = false;
    }
  }

  async function updateThisData(id, payload) {
    loading.value.Update = true;
    error.value.Update = null;
    success.value.Update = false;

    try {
      const data = await dataService.edit(id, payload);
      const idx = mainData.value.findIndex((d) => d.id === id);

      if (idx !== -1) {
        mainData.value[idx] = { ...mainData.value[idx], ...data };
      }
      success.value.Update = true;
      return data;
    } catch (err) {
      error.value.Update =
        err.response?.data?.message || err.message || "Failed Update Data";
    } finally {
      loading.value.Update = false;
    }
  }

  return {
    mainData,
    loading,
    error,
    success,

    getAllData,
    deleteDataId,
    createNewData,
    updateThisData,
  };
});
