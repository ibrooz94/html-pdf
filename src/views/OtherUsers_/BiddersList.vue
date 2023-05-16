<script setup>

import { ref, onMounted, markRaw } from "vue";
import exportPdfTemplate from "../../data/jsTemplate"

import { Chart, Colors, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables, Colors, ChartDataLabels)

import PageHeader from '../../components/TopHeader.vue'

const chartRef = ref(null);
const creationDate = ref(new Date().toISOString().split('T')[0])
const rfQNo = ref("SD00001")
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
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Aladin">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">

  <PageHeader @selectOption="onOptionSelected"></PageHeader>

  <body>
    <div class="chartImage" > 
    <canvas id="myChart" ></canvas>
  </div>
    <div class="topItems">
      <!-- <div class="topItems"> -->
      <div class="tabmenu">
        <RouterLink to="/" active-class="active" class="inactive">Dashboard</RouterLink>
        <RouterLink to="/biddersList" active-class="active" class="inactive">My Report Details</RouterLink>
      </div>
    </div>

    <div class="maingeneral">

      <div class="genBtn">
        <button class="btns">
          Save as draft
        </button>
        <button class="btns">
          Delete
        </button>
      </div>

      <div class="general_">
    <div class="generalInput_">
      <p>Report No</p>
      <input name="rfqno" type="text" v-model="rfQNo" disabled>
    </div>
    <div class="generalInput_">
      <p>Creation Date</p>
      <input name="creationDate" type="date" v-model="creationDate" disabled>
    </div>
    <div class="generalInput_">
      <p>User</p>
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
      <p> Size of New Guarantees Executed</p>
      <input type="text" v-model="newMandates">
    </div>
    <div class="generalInput_">
      <p>Size of New Mandates Signed</p>
      <input type="text" v-model="followMandates">
    </div>
    <div class="generalInput_">
      <p>Credit Approved Deals</p>
      <input type="text" v-model="creditApproved" >
    </div>
  </div>

  

  <div class="genBtn">
        <button class="btns" @click="pdfCall">
          Preview Template
        </button>
        <button class="btns">
          Submit
        </button>
      </div>
    </div>
  </body>
</template>


<style scoped>
.chartImage{
  position: absolute;
  top: -8000px;
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

.inactive {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  font-family: Roboto;
  text-decoration: none;
  color: #808080;
}

.active {
  color: #227CBF;
  border-bottom: 1.5px solid #227CBF;
  padding-bottom: 14px;
  cursor: default;
}

.maingeneral {
  background-color: white;
  width: 90vw;
  height: 60vh;
  padding-right: 20px;
  padding-left: 20px;
}

.genBtn {
  display: flex;
}

.loginBtn {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 12px 10px;
  margin-top: 20px;
  margin-right: 20px;
  gap: 10px;
  cursor: pointer;
  width: 270px;
  height: 50px;
  background: white;
  color: #227CBF;
  border: 2px solid #227CBF;
  border-radius: 30px;
}

.tabmenu {
  margin-top: 20px;
  width: 1045px;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 30px;

}

.general2_ {
  display: grid;
  grid-template-columns: 1.5fr 2fr 1.5fr;
  width: 20vw;
  grid-gap: 29px;
}

.general_ {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.generalInput_ p {
  font-size: 12px;
}

.resize {
  width: 280px;
  font-size: 12px;
}

.paginationButtons {
  justify-content: flex-end;
  align-self: flex-end;
  padding: 20px;
  display: flex;
  margin-right: 45px;

}

.paginationButton {
  background-color: #FFFFFF;
}

body {
  font-family: Roboto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 50px;
  gap: 20px;
  width: 100%;
  height: 100%;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;
  background: #FAFAFB;
}

.btn {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.btns {
  box-sizing: border-box;
  display: flex;
  width: 233px;
  height: 40px;
  margin: 20px 10px 10px 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #FFFFFF;
  border: 1px solid #227CBF;
  border-radius: 50px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  color: #227CBF;
}

.btns:hover {
  background-color: #47B65C;
  color: #FFFFFF;
  border: none;
}

.purchdetails {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 30px;
  gap: 20px;
  width: 100%;
  background: #FFFFFF;
  border-radius: 10px;
}

.activityBoxPurch {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 20px;
  width: 620px;
  height: 40px;
}

.sorticon:hover {
  cursor: pointer;
}

.activityStatusPurch {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  gap: 10px;
  width: 100%;
  height: 40px;
}

.activityBoxPurch input {
  align-items: center;
  border: 1px #000000 solid;
  padding: 10px 20px;
  gap: 21px;
  width: 350px;
  height: 40px;
  left: 0px;
  top: 0px;
}

.filerdetails input {
  align-items: center;
  padding: 5px 10px;
  gap: 21px;
  margin: 0px 20px 0px 20px;
  width: 200px;
  border-radius: 6px;
  border: 0.5px solid black;
  height: 40px;
  background: #FAFAFB;

}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url('../../assets/images/arrow_right.svg');
  background-repeat: no-repeat;
  background-position-x: 98%;
  background-position-y: 13px;
  border: 1px solid #E4E4E7;
  border-radius: 2px;
  padding-left: 10px;
  width: 270px;
  height: 40px;
  border-radius: 5px;
  font-family: Roboto;
  font-size: 12px;
}

.filerdetails {
  width: 100%;
  padding: 0px 20px 0px 20px;
}

.criteria {
  margin-top: 20px;
}

.searchbtn {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  border: none;
  cursor: pointer;
  width: 200px;
  margin: 30px;
  height: 40px;
  background: linear-gradient(90deg, #227CBF 0%, #47B65C 100%);
  border-radius: 50px;
}


.filter {
  cursor: pointer;
}

.Rfq {
  padding: 20px 0px 20px 0px;
  gap: 20px;
  width: 100%;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.493);
  z-index: 10;
  display: flex;
  overflow: auto;
  align-items: center;
  justify-content: center;
}

.modals {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 550px;
  padding: 30px;
  position: relative;
  width: 690px;
  border-radius: 5px;
  border: 1px solid #E4E4E7;
}

.userdetailsheader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  gap: 10px;
  width: 650px;
  height: 44px;
  font-size: 20px;
}

.userdetailstext {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
}

.Line {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0px 20px;
  width: 100%;
  margin-top: 15px;
}

.Lines {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0px 20px;
  width: 620px;
  height: 60px;
  margin-top: 15px;
}

.RowLine {
  align-items: flex-start;
  align-items: center;
  width: 150px;
  display: flex;
  flex-wrap: wrap;
}

.rfqbtn {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  margin-top: 27px;
  line-height: 19px;
  color: #FFFFFF;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  border: none;
  cursor: pointer;
  width: 200px;
  height: 40px;
  background: linear-gradient(90deg, #227CBF 0%, #47B65C 100%);
  border-radius: 50px;
}

.rfqtableHeader {
  padding: 15px 20px;
  background: #FFFFFF;
  align-items: center;
  display: grid;
  grid-template-columns: 2fr 2.5fr 2.5fr 2.5fr 2fr;
  grid-gap: 20px;
}

.tableHeader {
  flex-direction: row;
  display: flex;
}

.tableHeadertext {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  margin-right: 5px;
  font-size: 15px;
  line-height: 19px;
  color: #808080;
  text-align: left;
}

.tablerowtext1 {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  width: 100%;
  font-size: 16px;
  line-height: 19px;
  margin-left: 20px;
  color: #000000;
  text-align: left;
}

.LineHeader {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0px 10px 20px;
  gap: 10px;
  width: 650px;
  height: 44px;
  background: #F7F7F7;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #E8E8E8;
  border-radius: 5px 5px 0px 0px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
}

.tablerowtext {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  width: 100%;
  font-size: 14px;
  line-height: 19px;
  color: #000000;
  text-align: left;

}

.formDetails,
.formDetails7 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;
  width: 270px;
  height: 60px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
}

.formDetails7 {
  overflow-y: scroll;
  height: 120px;
  width: 250px;
}

.formDetails2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  padding: 0px 0px 0px 20px;
  line-height: 19px;
  color: #000000;
  gap: 30px;
  width: 280px;
}

.formDetails input {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px 10px 10px;
  gap: 71px;
  width: 270px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #E4E4E7;
  border-radius: 5px;
}

.formBox {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 15px;
  gap: 10px;
  width: 652px;
  background: #FFFFFF;
  border: 1px solid #E4E4E7;
  border-radius: 5px;
}


.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.493);
  z-index: 10;
  display: flex;
  overflow: auto;
  align-items: center;
  justify-content: center;
}

.modal2 {
  vertical-align: middle;
  position: absolute;
  background-color: white;
  z-index: 10;
  display: flex;
  top: 85px;
  right: 15px;
  border: 10px;
  width: 382px;
  height: 80px;
  border-radius: 10px;
  padding: 20px 20px 10px 25px;
  flex-direction: row;

}


.notetext {
  margin-left: 10px;
  font-family: Roboto;
  display: flex;
  flex-direction: column;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  padding-right: 10px;
  line-height: 14px;
  border-right: 1px solid #E4E4E7;
  color: #000000;
  justify-content: space-around;
}

.modals img {
  margin-top: 5px;
}

.options {
  padding: 5px;
}

.options h3 {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 14px;
  margin: 5px;
  border-bottom: 1px solid #E4E4E7;
  text-align: center;
  color: #227CBF;
  border-bottom: #808080;
}

.options p {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #808080;
}

.animated {
  background-image: url(/css/images/logo.png);
  background-repeat: no-repeat;
  background-position: left top;
  margin-bottom: 60px;
  -webkit-animation-duration: 0.9s;
  animation-duration: 0.9s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInRight {
  0% {
    opacity: 0;
    -webkit-transform: translateX(20px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
}
</style>