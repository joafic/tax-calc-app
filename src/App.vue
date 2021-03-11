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
               :min="0" 
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
             <small class="p-d-block">Taxa de 2,99%</small>
              </td>
            <th>R$ {{cardFee.toFixed(2)}}</th>
          </tr>
          <tr>
            <td>Juros do parcelamento <i style="font-size:0.8em" class="pi pi-question-circle" title="teste dsc"></i>
            <small class="p-d-block">Taxa de 3,49% por parcela.</small></td>
            <th>R$ {{installmentFee.toFixed(2)}}</th>
          </tr>
          <tr>
            <td>Valor da parcela</td>
            <th>{{parcel}}x R$ {{installment}}</th>
          </tr>
          <tr>
            <td>Valor total do boleto parcelado</td>
            <th>R$ {{installment * parcel}}</th>
          </tr>
          <tr>
            <td>Valor de cashback a receber</td>
            <th>R$ {{cashback.toFixed(2)}}</th>
          </tr>
          </tbody>
          <tfoot>
            <tr>
            <td colspan="2">
              <!--<span><Tag :severity="'success'" :rounded="true">1234,00 - 4.564,00 = R$5.464,00</Tag></span>-->
                <Message :severity="result.severity" :closable=false>{{`${result.msg} R$ ${result.diff !=0 ? (result.diff).toFixed(2): ''}`}}</Message>
              </td>
            </tr>
          </tfoot>

        </table>
     </div>
    </template>
    <template #footer style="margin-top:2em">
        <Button icon="pi pi-check" label="Calcular" @click="calc"/>
        <Button icon="pi pi-circle-off" label="Limpar" class="p-button-secondary" style="margin-left: .5em" />
    </template>
</Card>
</div>

</div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
  name: 'App',

setup(){
  const parcelFee = 3.49/100; //3,49%
  const picpayFee = 2.99/100; //2,99%
  const a = ref('text');
  const result = ref({severity:'',msg:'Aguardando cálculo',diff:0});
  const boleto = ref(1604.00);
  const max_cashback = ref(0);
  const parcel = ref(2);
  const percent = ref(10);
  const cardFee = ref(0);
  const installment = ref(0);
  const totalWithFees = ref(0);
  const installmentFee = ref(0);
  const cashback = ref(0);

  watch([parcel,percent],function(){
    if(parcel.value > 1){
      calc();
    }
    });

  const calc = () => {
    
    //juros ao pagar com cartão
    cardFee.value = boleto.value * picpayFee;

    //total a ser parcelado incuindo taxa do cartão
    const value = parseFloat((boleto.value + cardFee.value).toFixed(2))

    //total do boleto com as taxas
    totalWithFees.value = (value * parcelFee / (1 - Math.pow(1 + parcelFee, -parcel.value)) * parcel.value).toFixed(2);

    //parcela do cartão
    installment.value = (totalWithFees.value / parcel.value).toFixed(2);

    //juros de parcelamento
    installmentFee.value = (totalWithFees.value - value);

    //cashback 
    cashback.value = (totalWithFees.value * percent.value/100);

    console.log(parseFloat( cardFee.value) + parseFloat(installmentFee.value))

    result.value.diff = cashback.value - (installmentFee.value+cardFee.value)

    if(result.value.diff > 0){
      result.value.severity = 'success'
      result.value.msg = 'O valor de cashback é superior ao valor das taxas!'
    }else{
      result.value.severity = 'error'
      result.value.msg = 'O valor das taxas é superior ao valor de cashback.'
    }

  }

  return {a, boleto,max_cashback,parcel,percent,calc,cardFee,installment,totalWithFees,installmentFee,cashback,result}
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
.p-card .p-card-footer{
  padding: 45em 0 0 0;
}
small {
  font-size: .8em ;
  color:  #8c8d8c;
}
</style>
