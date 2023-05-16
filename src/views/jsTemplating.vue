<script setup>
import { reactive  } from "vue";
import Mustache from "mustache";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import docTemplate from "./data/docTemplate.json"

var data = reactive({
  name: "",
});

function pdfCall() {
  var final = JSON.parse(Mustache.render(JSON.stringify(docTemplate), data));

  const pdfDocGenerator = pdfMake.createPdf({content: final});

  return pdfDocGenerator.open()
}

</script>

<template>
  <label>
    Enter Name: 
    <input v-model="data.name" type="text">
  </label>

  <button @click="pdfCall"> Click Me </button>
</template>

<style scoped>

</style>