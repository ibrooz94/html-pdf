<script setup>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import htmlToPdfmake from "html-to-pdfmake";
import nunjucks from "nunjucks";
var htmlContent = require('./data/raw.html');


function pdfCall() {
    const obj = nunjucks.render(htmlContent, { name: 'James' });

    var html = htmlToPdfmake(obj);

    const pdfDocGenerator = pdfMake.createPdf({ content: html });

    return pdfDocGenerator.open()
}



</script>

<template>
    <button @click="pdfCall"> Click Me </button>
</template>

<style scoped></style>