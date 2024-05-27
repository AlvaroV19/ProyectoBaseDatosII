<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Proveedor</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-modal :is-open="modalIsOpen" @didDismiss="modalIsOpen = false" :css-class="['my-custom-modal']">
        <div id="modal-content">
          <div id="data-form">
            <InputComponent v-model="tipoDocumento" id="tipoDocumento" name="tipoDocumento" label="Tipo de documento: " />
            <InputComponent v-model="documento" type="number" id="documento" name="documento" label="Documento: " />
            <InputComponent v-model="nombre" id="nombre" name="nombre" label="Nombre: " />
            <InputComponent v-model="metodoPago" id="metodoPago" name="metodoPago" label="Metodo de Pago: " />
            <InputComponent v-model="direccion" id="direccion" name="direccion" label="Direccion: " />
          </div>
          <div>
            <ButtonComponent v-if="showCreated" id="created" value="Agregar" expand="full" color="warning" nameMethod="createRecord"
              @click="createRecord" />
            <ButtonComponent v-if="showUpdated" id="updated" value="Modificar" expand="full" color="warning" nameMethod="updateRecord"
              @click="updateRecord" />
          </div>
        </div>
      </ion-modal>
      <div class="table-container">
          <ion-list>
            <!-- Iterar sobre items para mostrar los datos en tarjetas -->
            <ion-card v-for="(item, index) in items" :key="index" class="card-width">
              <ion-card-content>
                <ion-item>
                  <ion-label>Id: </ion-label>
                  <ion-label>{{ item.id }}</ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>Tipo documento: </ion-label>
                  <ion-label>{{ item.tipoDocumento }}</ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>Documento: </ion-label>
                  <ion-label>{{ item.documento }}</ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>Nombre: </ion-label>
                  <ion-label>{{ item.nombre }}</ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>Metodo Pago: </ion-label>
                  <ion-label>{{ item.metodoPago }}</ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>Direccion: </ion-label>
                  <ion-label>{{ item.direccion }}</ion-label>
                </ion-item>
              </ion-card-content>
              <ion-item>
                <!-- Botones de editar y eliminar -->
                <ion-button @click="fetchRecordById(item.id)">
                  <ion-icon :icon="IonIcons.createOutline"></ion-icon>
                </ion-button>
                <ion-button @click="deleteRecordPhysical(item.id)">
                  <ion-icon :icon="IonIcons.trash"></ion-icon>
                </ion-button>
              </ion-item>
            </ion-card>
          </ion-list>
        </div>
      <ion-button @click="openModalAdd">
        <ion-icon :icon="IonIcons.addSharp"></ion-icon>
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonModal, IonButton, IonSelect, IonSelectOption } from '@ionic/vue';
import InputComponent from '@/components/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import * as IonIcons from 'ionicons/icons';
import axios from 'axios';
import { onMounted, ref } from 'vue';


// Rutas de la API
const baseURL = 'http://localhost:9000/backend/api/cliente';
let clienteJs = {
    tipoDocumento: '',
    documento: '',
    nombre: '',
    metodoPago: '',
    direccion: ''
}

const modalIsOpen = ref(false);
const items = ref<Array<ItemType>>([]);
const id = ref('');
const tipoDocumento = ref('');
const documento = ref('');
const nombre = ref('');
const metodoPago = ref('');
const direccion = ref('');

const showCreated = ref<boolean>(true);
const showUpdated = ref<boolean>(false);

// Definir las propiedades que controlarán la visibilidad de los botones
const props = defineProps({
  showCreated: { type: Boolean, default: true },
  showUpdated: { type: Boolean, default: false },
});

// Tipos
interface ItemType {
  id: string;
  tipoDocumento: string;
  documento: number;
  nombre: string;
  metodoPago: string;
  direccion: string;
}

onMounted(() => {
  findAllRecords();
});

// Métodos para interactuar con la API
// Obtener todos los registros
async function findAllRecords() {
  try {
    const response = await axios.get(baseURL);
    items.value = response.data;
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los registros:', error);
    throw error;
  }
}

// Obtener por ID
async function fetchRecordById(recordId: string) {
  try {
    await openModalAdd();
    const response = await axios.get(`${baseURL}/${recordId}`);
    const data = response.data;
    id.value = data.id;
    tipoDocumento.value=data.tipoDocumento;
    documento.value=data.documento;
    nombre.value=data.nombre;
    metodoPago.value=data.metodoPago;
    direccion.value=data.direccion;
    showCreated.value = false;
    showUpdated.value = true;
    return response.data;
  } catch (error) {
    console.error('Error al obtener el registro por ID:', error);
    throw error;
  }
}

// Crear registro
async function createRecord() {
  const data = {
    tipoDocumento: tipoDocumento.value,
    documento: documento.value,
    nombre: nombre.value,
    metodoPago: metodoPago.value,
    direccion: direccion.value,
  };

  try {
    const response = await axios.post(baseURL, data);
    console.log('Registro creado exitosamente:', response.data);
    await findAllRecords();
    await clearData();
    await closeModal();
  } catch (error) {
    console.error('Error al crear el registro:', error);
  }
}


// Actualizar registro
async function updateRecord() {
  const data = {
    id: id.value,
    tipoDocumento: tipoDocumento.value,
    documento: documento.value,
    nombre: nombre.value,
    metodoPago: metodoPago.value,
    direccion: direccion.value,
  };
  try {
    const response = await axios.put(`${baseURL}/${data.id}`, data);
    await closeModal();
    await findAllRecords();
    await clearData();

    showCreated.value = true;
    showUpdated.value = false;

    return response.data;
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    throw error;
  }
}

// Eliminar registro físico
async function deleteRecordPhysical(id: string) {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    await findAllRecords();
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el registro físico:', error);
    throw error;
  }
}

// Eliminado lógico
async function deleteRecordLogical(id) {
  try {
    const response = await axios.put(`${baseURL}/delete-logical/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al realizar el eliminado lógico:', error);
    throw error;
  }
}

async function clearData() {
    tipoDocumento.value='';
    documento.value='';
    nombre.value='';
    metodoPago.value='';
    direccion.value='';
}

const openModalAdd = () => {
  modalIsOpen.value = true;
};

const closeModal = () => {
  modalIsOpen.value = false;
};

</script>

<style scoped src="../theme/container.css"></style>