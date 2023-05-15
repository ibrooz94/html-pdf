
<script setup>
import { ref, onMounted, markRaw } from "vue";
import exportPdfTemplate from "./data/jsTemplate"

import { Chart, Colors, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables, Colors, ChartDataLabels)


const chartRef = ref(null);
const creationDate = ref(new Date().toISOString().split('T')[0])
const rfQNo = ref(32)
const requestor = ref("John")
const businessUnit = ref("C3")
const department = ref("Sales")
const staticVal = ref(89)

const newGurantees = ref()
const newMandates = ref()
const creditApproved = ref()
const followMandates = ref()


onMounted(() => {

  const ctx = document.getElementById('myChart');
  const data = {
    labels: [
      'New Guarantees',
      `New Mandates`,
      'Follow Mandates'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [newGurantees.value, newMandates.value, followMandates.value],
      datalabels: {
        anchor: 'center'
      },
      hoverOffset: 4
    }],
  }
  const options = {
    devicePixelRatio: 2,
    plugins: {
      datalabels: {
        color: 'white',
        display: 'auto',
        borderColor: 'white',
        borderRadius: 25,
        borderWidth: 2,
        // font: {
        //   size: 58
        // },
        // formatter: function(value, context) {
        //   if (value){
        //     return context.chart.data.labels[context.dataIndex] +"\n" + value;
        //   }
        // },
        backgroundColor: function(context) {
          return context.dataset.backgroundColor;
        },        
      }
    }
  }
  const config = {
    type: 'doughnut',
    data: data,
    options: options
  };

  const createdChart = new Chart(ctx, config);
  chartRef.value = markRaw(createdChart)

})

const updateChart = () => {
  return new Promise((resolve, reject) => {
    const chart = chartRef.value;
    chart.data.datasets[0].data = [newGurantees.value, newMandates.value, followMandates.value]
    chart.update('none');
    resolve()
  });
};

const pdfCall = async () => {

  await updateChart();
  const ctx = document.getElementById('myChart');
  const chartsImage = ctx.toDataURL('image/png');

  try {
    const exportPdf = exportPdfTemplate(
      rfQNo.value, chartsImage, creationDate.value, requestor.value, businessUnit.value, department.value,
      newGurantees.value, newMandates.value, followMandates.value, creditApproved.value,
      staticVal.value, staticVal.value, staticVal.value, staticVal.value);

    return exportPdf.open();

  } catch (error) {
    console.error(error);
  }
}

</script>

<template>
  <!-- Chart Js -->
   <div class="chartImage" > 
    <canvas id="myChart" ></canvas>
  </div>

  <div class="general_">
    <div class="generalInput_">
      <p>RFQ NO</p>
      <input name="rfqno" type="text" v-model="rfQNo" disabled>
    </div>
    <div class="generalInput_">
      <p>Creation Date</p>
      <input name="creationDate" type="date" v-model="creationDate" disabled>
    </div>
    <div class="generalInput_">
      <p>Requestor</p>
      <input name="requestor" type="text" v-model="requestor" disabled>
    </div>
    <div class="generalInput_">
      <p>Business Unit</p>
      <input name="requestor" type="text" v-model="businessUnit" disabled>

    </div>
    <div class="generalInput_">
      <p>Department</p>
      <input name="requestor" type="text" v-model="department" disabled>
    </div>
  </div>

  <div class="general_">
    <div class="generalInput_">
      <p>New Gurantees</p>
      <input type="text" v-model="newGurantees">
    </div>
    <div class="generalInput_">
      <p> New Mandates</p>
      <input type="text" v-model="newMandates">
    </div>
    <div class="generalInput_">
      <p>Follow On Mandates</p>
      <input type="text" v-model="followMandates">
    </div>
    <div class="generalInput_">
      <p>Credit Approved Deals</p>
      <input type="text" v-model="creditApproved">
    </div>
  </div>

  <button @click="pdfCall"> Click Me </button>
</template>

<style scoped>
.chartImage{
  position: absolute;
  top: -5000px;
}
.general_ {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

.generalInput_ Input {
  align-items: center;
  padding: 10px;
  height: 35px;
  border: 0.5px solid #808080;
  border-radius: 5px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 12px;
  width: 16vw;
  line-height: 14px;
  color: #000000;
}
</style>