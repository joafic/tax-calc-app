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
        <div class="p-grid p-col-6">
          <label for="vl_boleto" class="p-col-5">Valor do boleto:</label>
          <div class="p-field p-col p-md-5">
                
                <InputNumber id="vl_boleto" class="p-inputtext-sm" 
                mode="currency" 
                currency="BRL" 
                currencyDisplay="symbol" 
                locale="pt-BR" 
                minFractionDigits="2" 
                placeholder="R$ Ex: 200,00"/>
          </div>
        </div>
        
        
        <div class="p-grid p-col-6">
          <label for="vl_boleto" class="p-col-7">Valor máximo de cashback:</label>
          <div class="p-field p-col p-md-5">
                
                <InputNumber id="vl_boleto" class="p-inputtext-sm" 
                mode="currency" 
                currency="BRL" 
                currencyDisplay="symbol" 
                locale="pt-BR" 
                minFractionDigits="2" 
                placeholder="R$ Ex: 200,00"/>
          </div>
        </div>
      </div>

      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col p-md-5">
            <span class="p-float-label">
              <label for="username" class="p-col">Quantidade de parcelas:</label>
              <InputText id="username" type="text" class="p-inputtext-sm" placeholder="Ex: 2"/>
          </span>
        </div>
        <div class="p-field p-col ">
          <span class="p-float-label">
            <label for="username" class="p-col">Username</label>
            <InputText id="username" type="text"  class="p-inputtext-sm"/>
          </span>
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
