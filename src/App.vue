<template>
<div class="p-grid p-jc-center">
  <div class="p-col-12 p-md-6 p-lg-6">
    <Card>
    <template #header>
        
    </template>
    <template #title>
        Advanced Card
    </template>
    <template #content>
      <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col">
              <label for="field1">Valor</label>
              <InputText id="field1" type="text" class="p-inputtext-sm"/>
          </div>
          <div class="p-field p-col">
              <label for="field2">Valor máximo</label>
              <InputText id="field2" type="text" class="p-inputtext-sm"/>
          </div>
      </div>
    </template>
    <template #footer>
        <Button icon="pi pi-check" label="Calcular" />
        <Button icon="pi pi-times" label="Limpar" class="p-button-secondary" style="margin-left: .5em" />
    </template>
</Card></div>
  
</div>
</template>

<script>

export default {
  name: 'App',

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: linear-gradient( rgba(04, 213, 146),rgba(4, 213, 49)) fixed;
}

</style>
