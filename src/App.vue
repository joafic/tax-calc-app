<template>
<div class="p-grid p-jc-center">
  <div class="p-col-12 p-md-6 p-lg-6">
    <Card>
    <template #header>
        
    </template>
    <template #title>
       <div class="p-fluid p-formgrid p-grid ">
          <div class=" p-md-10 ">
            <label for="vl_boleto" class="p-d-flex p-jc-end">{{a}}</label>
          </div>
          <div class=" p-md-2">
            <i class="pi pi-moon" title="teste dsc"></i>
          </div>
      </div>

    </template>
    <template #content>
      <div class="p-fluid p-formgrid p-grid ">
          <div class="p-field p-col p-md-6 ">
            <label for="vl_boleto" class=" p-d-flex p-ai-start">Valor do boleto:</label>
            <div class="p-md-12">
               <InputNumber id="vl_boleto" class="p-inputtext-sm" 
                v-model="boleto"
                mode="currency" 
                currency="BRL" 
                currencyDisplay="symbol" 
                locale="pt-BR" 
                :minFractionDigits="2" 
                placeholder="R$ Ex: 200,00"/>
            </div>
          </div>
          <div class="p-field p-col p-md-6">
             <label for="vl_boleto" class="p-col-10 p-d-flex p-ai-start">Valor máximo de cashback da promoção:</label>
              <div class="p-md-12">
                <InputNumber id="max_cashback" class="p-inputtext-sm" 
                v-model="max_cashback"
                mode="currency" 
                currency="BRL" 
                currencyDisplay="symbol" 
                locale="pt-BR" 
                :minFractionDigits="2" 
                placeholder="R$ Ex: 200,00"/>
              </div>
          </div>
      </div>
      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col p-md-6">
           <label for="username" class="p-col-10 p-d-flex p-ai-start">Quantidade de parcelas:
             <i class="pi pi-question-circle p-ml-1 p-ml-1" title="teste dsc"></i>
           </label>
          <div class="p-md-12">
               <InputNumber id="vl_parcela" class="p-inputtext-sm" 
               v-model="parcel"
               mode="decimal" 
               showButtons 
               :min="0" 
               :max="24" 
               incrementButtonIcon="pi pi-plus" 
               decrementButtonIcon="pi pi-minus" />
          </div>
        </div>
        <div class="p-field p-col p-md-6 ">
           <label for="username" class="p-col-10 p-d-flex p-ai-start">Percentual de cashback:
             <i class="pi pi-question-circle p-ml-1 p-ml-1" title="Percentual de cashback de acordo com a quantidade de parcelas"></i>
           </label>
          <div class="p-md-12">
               <InputNumber id="percent" class="p-inputtext-sm" 
               v-model="percent"
               mode="decimal" 
               showButtons 
               :min="2" 
               :max="100"
               suffix="%"
               placeholder="Ex: 20"
               incrementButtonIcon="pi pi-plus" 
               decrementButtonIcon="pi pi-minus" />
          </div>
        </div>
      </div>
     <div class="p-field p-col">
        <table>
          <tbody>
          <tr>
            <td>
              Taxa de pagamento de boleto utilizando cartão
             <small class="p-d-block">This is some smaller text.</small>
              </td>
            <th>2.99%</th>
          </tr>
          <tr>
            <td>Juros do parcelamento <i style="font-size:0.8em" class="pi pi-question-circle" title="teste dsc"></i></td>
            <th>R$ 1564.1</th>
          </tr>
          <tr>
            <td>Valor da parcela</td>
            <th>2x R$ 456,54</th>
          </tr>
          <tr>
            <td>Valor total do boleto parcelado</td>
            <th>R$ 23423</th>
          </tr>
          <tr>
            <td>Valor de cashback a receber</td>
            <th>R$ 323</th>
          </tr>
          </tbody>
          <tfoot>
            <tr>
            <td colspan="2">
              <!--<span><Tag :severity="'success'" :rounded="true">1234,00 - 4.564,00 = R$5.464,00</Tag></span>-->
                <Message :severity="severity" :closable=false>{{max_cashback}}</Message>
              </td>
            </tr>
          </tfoot>
          
        </table>
     </div>
    </template>
    <template #footer>
        <Button icon="pi pi-check" label="Calcular" @click="calc"/>
        <Button icon="pi pi-circle-off" label="Limpar" class="p-button-secondary" style="margin-left: .5em" />
    </template>
</Card>
</div>

</div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',

setup(){
  const a = ref('text');
  const severity = ref('success');
  const boleto = ref(0);
  const max_cashback = ref(0);
  const parcel = ref(0);
  const percent = ref(0);

  const calc = () => {
    console.log(boleto.value)
    console.log(max_cashback.value)
    console.log(parcel.value)
    console.log(percent.value)
  }

  return {a,severity, boleto,max_cashback,parcel,percent,calc}
}
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 50px;
  background: linear-gradient( rgba(04, 213, 146),rgba(4, 213, 49)) fixed;
}
table {
  border-collapse: collapse;
  border-style: hidden;
   table-layout:fixed;
  border-spacing: 0;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 7px;
  border: 1px solid #ddd;
}
td{
  width: 69%;
}
th{
  text-align: start;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.p-message .p-message-icon{
    display: none;
}
small {
  font-size: .8em ;
  color:  #8c8d8c;
}
</style>
