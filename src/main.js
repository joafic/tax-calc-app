import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Message from 'primevue/message';
import Tag from 'primevue/tag';
import InputSwitch from 'primevue/inputswitch';

import 'primevue/resources/themes/saga-green/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';

const app = createApp(App);

app.use(PrimeVue);
app.component('Card', Card);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Message', Message);
app.component('Tag', Tag);
app.component('InputSwitch', InputSwitch);


app.mount('#app')
