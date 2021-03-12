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
            <i class="pi pi-moon" title="Dark mode"></i>
          </div>
      </div>

    </template>
    <template #content>
      <div class="p-fluid p-formgrid p-grid ">
          <div class="p-field p-col p-md-6 ">
            <label for="vl_boleto" class="p-d-flex p-ai-start">Valor do boleto:</label>
            <div class="p-md-12">
               <InputNumber id="vl_boleto" class="p-inputtext-sm"
                :class="formState.class"
                @keyup="setBoletoValue"
                v-model="boleto"
                mode="currency" 
                currency="BRL" 
                currencyDisplay="symbol" 
                locale="pt-BR" 
                :minFractionDigits="2" 
                placeholder="R$ Ex: 200,00"/>
                <small v-if="!formState.isValid" class="p-d-flex p-ai-start p-error">{{formState.msg}}</small>
            </div>
          </div>
          <div class="p-field p-col p-md-6 p-inputtext-sm">
             <label for="vl_boleto" class="p-col-10 p-d-flex p-ai-start">Valor máximo de cashback:<span style="max-height:2em" class="p-col-1"><InputSwitch v-model="calcMax"/></span> </label>
              <div class="p-md-12">
                <InputNumber id="max_cashback" class="p-inputtext-sm" 
                v-model="max_cashback"
                :disabled="!calcMax"
                mode="currency" 
                currency="BRL" 
                currencyDisplay="symbol" 
                locale="pt-BR"
                :max="5000"
                :min="0"
                :minFractionDigits="2" 
                placeholder="R$ Ex: 200,00"/>
              </div>
          </div>
      </div>
      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col p-md-6">
           <label for="username" class="p-col-10 p-d-flex p-ai-start">Quantidade de parcelas:
             <i class="pi pi-question-circle p-ml-1 p-ml-1" title="Parcelamento de 2 a 12 parcelas."></i>
           </label>
          <div class="p-md-12">
               <InputNumber id="vl_parcela" class="p-inputtext-sm" 
               v-model="parcel"
               mode="decimal" 
               showButtons 
               :min="2" 
               :max="12"
               incrementButtonIcon="pi pi-plus" 
               decrementButtonIcon="pi pi-minus"/>
          </div>
        </div>
        <div class="p-field p-col p-md-6 ">
           <label for="username" class="p-col-10 p-d-flex p-ai-start">Percentual de cashback:
             <i class="pi pi-question-circle p-ml-1 p-ml-1" title="Percentual de cashback de acordo com a quantidade de parcelas informadas na promoção"></i>
           </label>
          <div class="p-md-12">
               <InputNumber id="percent" class="p-inputtext-sm" 
               v-model="percent"
               mode="decimal" 
               showButtons 
               :min="0" 
               :max="100"
               :step="5"
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
            <td>Juros do parcelamento <i style="font-size:0.8em" class="pi pi-question-circle" title="Taxa de 3.49% a.m"></i>
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
    const calcMax = ref(false);
    const max_cashback = ref();
    const parcel = ref(2);
    const percent = ref(0);
    const cardFee = ref(0);
    const installment = ref(0);
    const totalWithFees = ref(0);
    const installmentFee = ref(0);
    const cashback = ref(0);
    const formState = ref({isValid:false,class:'',msg:''});
    const result = reactive({severity:'info',msg:'Aguardando cálculo',values:{}})

    watch([parcel,percent,boleto],function(){
      calc();
    });

    //validação do formulário
    const validateForm = () => {
      if(boleto.value > 0 && boleto.value < 5000 && parcel.value > 1 && percent.value ){
        formState.value.isValid = true;
        formState.value.class = '';
      }else{
        formState.value.msg = boleto.value > 5000 ? "O valor do boleto não pode ser superior a R$5.000,00!" : '';
        formState.value.class = boleto.value >5000 ? 'p-invalid' : '';
        formState.value.isValid = false;

        result.severity = 'info';
        result.msg = 'Aguardando cálculo';
        result.values = {};
        
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

    const resetForm = () =>{
      boleto.value = null;
      max_cashback.value = null;
      parcel.value = 2
      percent.value = null;
      calcMax.value = false;
    }

    //Para corrigir bind do componente, que só ativa quando perde foco do input
    function setBoletoValue(e){
       boleto.value = parseFloat(e.target.value.substring(3).replaceAll('.',''))
    }

    return {boleto,max_cashback,parcel,percent,calc,result,resetForm,formState,setBoletoValue,calcMax}
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
