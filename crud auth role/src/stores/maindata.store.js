import { defineStore } from "pinia";
import { ref } from "vue";
import { dataResourcheService } from "../services/stocks.service";

export const useDataStore = defineStore("data", () => {
  const dataResource = ref([]);
  const services = dataResourcheService;

  const loading = ref({
    Get: false,
    GetId: false,
    Create: false,
    Edit: false,
    Delete: false,
  });

  const error = ref({
    Get: null,
    GetId: null,
    Create: null,
    Edit: null,
    Delete: null,
  });

  const success = ref({
    Create: false,
    Edit: false,
    Delete: false,
  });

  async function getAllData() {
    loading.value.Get = true;
    error.value.Get = null;

    try {
      const data = await services.getAll();
      //   console.log(data);
      dataResource.value = data;
    } catch (err) {
      error.value.Get =
        err.response?.data?.message || err.message || "Failed Get Data";
    } finally {
      loading.value.Get = false;
    }
  }

  async function getDataId(id) {
    loading.value.GetId = true;
    error.value.GetId = null;

    try {
      const data = await services.getId(id);
      // console.log(data);
      return data;
    } catch (err) {
      error.value.GetId =
        err.response?.data?.message || err.message || "Data Not Found";
    } finally {
      loading.value.GetId = false;
    }
  }

  async function createData(payload) {
    loading.value.Create = true;
    error.value.Create = null;
    success.value.Create = false;

    try {
      const data = await services.create(payload);
      dataResource.value.unshift(data);
      success.value.Create = true;
      return data;
    } catch (err) {
      error.value.Create =
        err.response?.data?.message || err.message || "Failed Create New Data";
    } finally {
      loading.value.Create = false;
    }
  }

  async function editData(id, payload) {
    loading.value.Edit = true;
    error.value.Edit = null;
    success.value.Edit = false;

    try {
      const data = await services.edit(id, payload);

      const idx = dataResource.value.findIndex((d) => d.id === id);

      if (idx !== -1) {
        dataResource.value[idx] = { ...dataResource.value[idx], ...data };
      }
      success.value.Edit = true;
      return data;
    } catch (err) {
      error.value.Edit =
        err.response?.data?.message || err.message || "Failed Edit Data";
    } finally {
      loading.value.Edit = false;
    }
  }

  async function deleteData(id) {
    loading.value.Delete = true;
    error.value.Delete = null;
    success.value.Delete = false;

    try {
      await services.delete(id);
      dataResource.value = dataResource.value.filter((d) => d.id !== id);
      success.value.Delete = true;
    } catch (err) {
      error.value.Delete =
        err.response?.data?.message || err.message || "Failed Delete Data";
    } finally {
      loading.value.Delete = false;
    }
  }

  return {
    dataResource,
    loading,
    error,
    success,

    getAllData,
    getDataId,
    createData,
    editData,
    deleteData,
  };
});
