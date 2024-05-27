<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <br>
      <div id="container">
        <ion-button href="/cliente">Ir a Clientes</ion-button>
        <br>
        <ion-button href="/producto">Ir a productos</ion-button>
        <br>
        <ion-button href="/proveedor">Ir a proveedor</ion-button>
        <br>
        <ion-button href="/factura">Ir a factura</ion-button>
        <br>
        <ion-button href="/detalleFactura">Ir a detalle factura</ion-button>

      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
</script>

<style scoped>
#container{
  text-align: center;
}
</style>
