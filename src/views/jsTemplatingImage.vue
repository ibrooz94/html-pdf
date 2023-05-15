<script setup>
import { reactive, ref } from "vue";
import Mustache from "mustache";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

import tableTemplate from "./data/tableTemplate.json"
import bg from "./assets/bg.png"

const creationDate = ref(new Date().toISOString().split('T')[0])
const rfQNo = ref(32)
const requestor = ref("John")
const businessUnit = ref("C3")
const department = ref("Sales")

const newGurantees = ref("")
const newMandates = ref("")
const followMandates = ref("")
const creditApproved = ref("")

const imgToDataUrl = (imageFile) => {
  return new Promise((resolve, reject) => {
    fetch(imageFile)
      .then(response => {
        return response.blob()
      })
      .then(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);

        reader.addEventListener('load', () => {
          resolve(reader.result)
        });
      })
      .catch(error => reject(error))
  });
}

const pdfCall = async () => {
  try {
    const data = {
      newGuarantees: newGurantees.value,
      newMandates: newMandates.value,
      followMandates: followMandates.value,
      creditApproved: creditApproved.value,
      image1: await imgToDataUrl(bg)
    };
    const final = JSON.parse(Mustache.render(JSON.stringify(tableTemplate), data));
    const pdfDocGenerator = pdfMake.createPdf({ content: final });
    return pdfDocGenerator.open();

  } catch (error) {
    console.error(error);
  }
}


</script>

<template>
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