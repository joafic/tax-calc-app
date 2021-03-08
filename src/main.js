import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import 'primevue/resources/themes/saga-green/theme.css'
import 'primeflex/primeflex.css';

const app = createApp(App);

app.use(PrimeVue);
app.component('Card', Card);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);

app.mount('#app')
