<template>
<div class="p-grid p-jc-center">
  <div class="p-col-12 p-md-7 p-lg-6 p-sm-12">
    <Card>
    
    <template #title>
       <div class="p-fluid p-formgrid p-grid ">
          <div class=" p-md-10 ">
            <label for="vl_boleto" class="p-d-flex p-jc-end">calc</label>
          </div>
          <div class=" p-md-2">
            <i class="pi pi-moon" title="teste dsc"></i>
          </div>
      </div>

    </template>
    <template #content>
      <div class="p-fluid p-formgrid p-grid ">
          <div class="p-field p-col p-md-6 ">
            <label for="vl_boleto" class="p-d-flex p-ai-start">Valor do boleto:</label>
            <div class="p-md-12">
               <InputNumber id="vl_boleto" class="p-inputtext-sm"
                :class="boleto ?? 'p-invalid'"
                v-on:change="calc"
                v-model="boleto"
                mode="currency" 
                currency="BRL" 
                currencyDisplay="symbol" 
                locale="pt-BR" 
                :minFractionDigits="2" 
                placeholder="R$ Ex: 200,00"/>
                <small v-if="!boleto" class="p-d-flex p-ai-start p-error">Preencha o valor do boleto.</small>
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
             <i class="pi pi-question-circle p-ml-1 p-ml-1" title="Juros de pare"></i>
           </label>
          <div class="p-md-12">
               <InputNumber id="vl_parcela" class="p-inputtext-sm" 
               v-model="parcel"
               mode="decimal" 
               showButtons 
               :min="2" 
               :max="24" 
               incrementButtonIcon="pi pi-plus" 
               decrementButtonIcon="pi pi-minus"/>
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
              Taxa de pagamento de boleto utilizando cartão de crédito
             <small class="p-d-block">Taxa de 2,99%</small>
              </td>
            <th>{{result.values.cardFee || '-'}}</th>
          </tr>
          <tr>
            <td>Juros do parcelamento <i style="font-size:0.8em" class="pi pi-question-circle" title="teste dsc"></i>
            <small class="p-d-block">Taxa de 3,49% por parcela.</small></td>
            <th>{{result.values.installmentFee || '-'}}</th>
          </tr>
          <tr>
            <td>Valor da parcela</td>
            <th>{{result.values.installment ? `${parcel}x ${result.values.installment}` : '-'}}</th>
          </tr>
          <tr>
            <td>Valor total do boleto parcelado</td>
            <th>{{result.values.totalWithFees || '-'}}</th>
          </tr>
          <tr>
            <td>Valor de cashback a receber</td>
            <th>{{result.values.cashback || '-'}}</th>
          </tr>
          </tbody>
          <tfoot>
            <tr>
            <td colspan="2">
              <!--<span><Tag :severity="'success'" :rounded="true">1234,00 - 4.564,00 = R$5.464,00</Tag></span>-->
                <Message :severity="result.severity" :closable=false>{{result.msg}}</Message>
              </td>
            </tr>
          </tfoot>

        </table>
     </div>
    </template>
    <template #footer style="margin-top:2em">
        <Button :disabled="!formState.isValid" icon="pi pi-check" label="Calcular" @click="calc"/>
        <Button icon="pi pi-circle-off" label="Limpar" @click="resetForm" class="p-button-secondary" style="margin-left: .5em" />
    </template>
</Card>
</div>

</div>
</template>

<script>
import { ref, watch, reactive } from 'vue';
export default {
  name: 'App',

  setup(){
    const parcelFee = 3.49/100; //3,49%
    const picpayFee = 2.99/100; //2,99%
    const boleto = ref();
    const max_cashback = ref();
    const parcel = ref(2);
    const percent = ref(0);
    const cardFee = ref(0);
    const installment = ref(0);
    const totalWithFees = ref(0);
    const installmentFee = ref(0);
    const cashback = ref(0);
    const formState = ref({isValid:false,class:'p-invalid'});
    const result = reactive({severity:'info',msg:'Aguardando cálculo',values:{}})

    watch([parcel,percent,boleto],function(){
      calc();
      //validateForm();
      //console.log(validateForm())
    });

    //validação do formulário
    const validateForm = () => {
      if(boleto.value > 0 && parcel.value > 1 && percent.value ){
        
        formState.value.isValid = true;
        formState.value.class = '';
      }else{
        formState.value.isValid = false;
        formState.value.class = 'p-invalid';
        resetState();
        console.log(boleto.value);
      }
      return formState;
    }

    const calc = () => {
      
      if(validateForm().value.isValid){
        
        //juros ao pagar com cartão
        cardFee.value = boleto.value * picpayFee;

        //total a ser parcelado incuindo taxa do cartão
        const value = parseFloat((boleto.value + cardFee.value).toFixed(2));

        //total do boleto com as taxas
        totalWithFees.value = (value * parcelFee / (1 - Math.pow(1 + parcelFee, -parcel.value)) * parcel.value);

        //parcela do cartão
        installment.value = (totalWithFees.value / parcel.value);

        //juros de parcelamento
        installmentFee.value = (totalWithFees.value - value);

        //cashback 
        cashback.value = (totalWithFees.value * percent.value/100);

        //diferencça de volor do cashback e taxas
        result.diff = cashback.value - (installmentFee.value + cardFee.value);

        //monta objeto de resultado
        result.values.cardFee = cardFee.value;
        result.values.cashback = cashback.value;
        result.values.totalWithFees = totalWithFees.value;
        result.values.installment = installment.value;
        result.values.installmentFee = installmentFee.value;
        result.values.diff = result.diff;

        Object.keys(result.values).map((key) => result.values[key] = "R$ " + parseFloat(result.values[key].toFixed(2)).toLocaleString())
        
        if(result.diff > 0){
          result.severity = 'success'
          result.msg = `O valor de cashback é superior ao valor das taxas! ${result.values.diff} 🤑🤑`;
        }else{
          result.severity = 'error'
          result.msg = `O valor das taxas é superior ao valor de cashback. ${result.values.diff}`;
        }

      }
      
    }
    //const reset = ()=>{{resetState(); resetForm();}}
    const resetState = () => {
      result.severity = 'info';
      result.msg = 'Aguardando cálculo';
      result.values = {};
    }
    const resetForm = () =>{
      boleto.value = 0;
      max_cashback.value = null;
      parcel.value = 2
      percent.value = null;
    }

    return {boleto,max_cashback,parcel,percent,calc,result,resetForm,formState}
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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

.p-message .p-message-icon {
    display: none;
}
.p-message.p-message-info {
  background: #f0f6f903 !important;
  color: #3d3d3d !important;
}
.p-card .p-card-footer{
  padding: 45em 0 0 0;
}
small {
  font-size: .8em ;
  color:  #495057;
}
</style>
