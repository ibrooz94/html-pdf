<script setup>
import { ref } from "vue";
import PageHeader from '../../components/TopHeader.vue';
import WelcomeHead from '../../components/PageMenuHeader.vue';
const showResults =ref(false);


const values = ref([
  { "newactivityText": "New", "newactivityValue": 5 }, { "newactivityText": "In Progress", "newactivityValue": 10 },
  { "newactivityText": "Completed", "newactivityValue": 135 }, { "newactivityText": "Pending Rating", "newactivityValue": 2 }]);

const rfqvalues = ref([
  { rfqNo: "SD2568", description: "Building Maintenance", expirationdate: "2022-01-28 14:53 GTM+1", status: "Pending" },
  { rfqNo: "SD2569", description: "Building Maintenance", expirationdate: "2022-01-28 15:23 GTM+1", status: "Pending" },
  { rfqNo: "SD2570", description: "Building Maintenance", expirationdate: "2022-01-29 17:12 GTM+1", status: "Pending" },
  { rfqNo: "SD2571", description: "Building Maintenance", expirationdate: "2022-01-31 14:53 GTM+1", status: "Pending" },
  { rfqNo: "SD2572", description: "Building Maintenance", expirationdate: "2022-01-28 14:53 GTM+1", status: "Pending" },
  { rfqNo: "SD2573", description: "IT Infrastructure", expirationdate: "2022-02-03 14:35 GTM+1", status: "Completed" },
  { rfqNo: "SD2574", description: "IT Infrastructure", expirationdate: "2022-02-04 12:11 GTM+1", status: "Completed" },
  { rfqNo: "SD2575", description: "IT Infrastructure", expirationdate: "2022-02-04 09:22 GTM+1", status: "Completed" },
])

const onOptionSelected = (isCorrect) =>{
    if(isCorrect){
     showResults.value=!showResults.value
    }
}
</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Aladin">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">

  <div v-if="showResults" class="overlay">
    <div class="modal animated fadeInRight">
      <div> <img src="../../assets/images/bell.svg" alt="" > </div>
          <div class="notetext">
            <h2>New RFQ!</h2>
            <p>Mark John just created a new RFQ.</p>
          </div>
          <div class="options" :style="{cursor: 'pointer'}">
            <h3>See details</h3>  
            <p @click="showResults = false">Hide</p>
          </div>
    </div>
  </div>

  <PageHeader @selectOption="onOptionSelected"></PageHeader>

  <body>
    <WelcomeHead></WelcomeHead>
    <div class="activityStatus">
      <h2 class="activityHeader">
        Activity Status
      </h2>
      <div class="activityBoxGroup">
        <div class="activityBox" v-for="value in values">
          <Transition>
            <p class="activityText">{{ value.newactivityText }}</p>
          </Transition>
          <Transition>
            <p class="activityValue">{{ value.newactivityValue }}</p>
          </Transition>
        </div>
    </div>
  </div>


    <div class="Rfq">
      <div class="rfqheader">
        <h3>My Recent Requisitions</h3>
      </div>
      <div class="rfqtableHeader">
        <p class="tableHeadertext">RFQ No</p>
        <p class="tableHeadertext">Description</p>
        <p class="tableHeadertext">Expiration Date & Time</p>
        <p class="tableHeadertext">Status</p>
      </div>

      <div class="rfqtableHeader2" v-for="value in rfqvalues" @click="$router.push('/newrfq')">
        <p class="tablerowtext" :style="{ cursor: 'pointer' }">{{ value.rfqNo }}</p>
        <p class="tablerowtext" :style="{ cursor: 'pointer' }">{{ value.description }}</p>
        <p class="tablerowtext" :style="{ cursor: 'pointer' }">{{ value.expirationdate }}</p>

        <div class="div244" v-if="value.status == 'Pending'">
          <img class="child57" alt="" src="../../assets/images/ellipse-84.svg" />
          <div class="pending21"> {{ value.status }}</div>
        </div>

        <div class="div248" v-else="value.status=='Completed'">
          <img class="child61" alt="" src="../../assets/images/ellipse-85.svg" />
          <div class="completed22"> {{ value.status }}</div>
        </div>

      </div>
      <div>
      </div>
    </div>
  </body>
</template>

<style scoped>
.child57 {
  width: 9.9px;
  height: 10px;
}

.pending21 {
  width: 66.34px;
  margin-bottom: 33px;
}

.div244 {
  width: 100px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 6px;
  height: 25px;
  background-color: #FEF9C3;
  color: #713F12;
  border-radius: 40px;
  padding: 8px 8px 5px 11px;
  line-height: 11.4px;
  font-size: 12px;
}

.child61 {
  width: 9.9px;
  height: 10px;
}

.completed22 {
  width: 66.34px;
}

.div248 {
  width: 100px;
  display: flex;
  flex-direction: row;
  gap: 6px;
  height: 25px;
  background-color: #DCFCE7;
  color: #14532D;
  border-radius: 40px;
  padding: 8px 8px 5px 11px;
  line-height: 10.4px;
  font-size: 12px;
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

.activityBoxGroup {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
  height: 120px;
  background: #FFFFFF;
  cursor: context-menu;
}

.activityBox {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 15px;
  gap: 10px;
  width: 216.67px;
  height: 120px;
  background: #227CBF;
  border: 1px solid #FFFFFF;

}

.activityStatus {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 20px 30px;
  gap: 20px;
  width: 100%;
  height: 219px;
  border-radius: 10px;
  background: #FFFFFF;
}

.activityHeader {
  width: 156px;
  height: 29px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #47B65C;
}

.activityText {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #FAFAFB;
  animation: fadeIn 1000ms;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.activityValue {
  width: 21px;
  height: 44px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  color: #FFFFFF;
  animation: fadeIn 1000ms;
}

.Rfq {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px 0px;
  gap: 20px;
  width: 100%;
  height: 504px;
  border-radius: 10px;
  background: #FFFFFF;
}

.rfqheader h3 {
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #47B65C;
  padding: 0px 20px;
  gap: 10px;

}

.rfqtableHeader {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px 20px;
  gap: 160px;
  width: 100%;
  height: 30px;
  background: #FFFFFF;
  align-items: center;
}

.rfqtableHeader2 {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px 20px;
  width: 100%;
  height: 30px;
  background: #FFFFFF;
  align-items: center;
}

.tableHeadertext {
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #808080;
  text-align: left;

}

.tablerowtext {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  width: 25vw;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  text-align: left;
}



.rowStatusText {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  text-align: left;
  color: #713F12;
  padding: 5px 10px;
  border-radius: 40px;
  font-size: 12px;
  line-height: 14px;
  width: 100px;
}


@media (min-width: 1024px) {
  .Home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
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

.modal {
  vertical-align: middle;
  position: absolute;
  background-color: white;
  z-index: 10;
  display: flex;
  top: 85px;
  right:15px;
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

.options{
  padding: 5px;
}

.options h3{
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

.options p{
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
            margin-bottom:60px;
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

