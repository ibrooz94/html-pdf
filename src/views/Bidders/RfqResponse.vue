<script setup>
import { AccordionList, AccordionItem } from "vue3-rich-accordion";
import { ref } from "vue";
import PageHeader from '../../components/TopHeader.vue';
const showUploadModal = ref(false)
const errorMessage = ref("")
const showResults = ref(false);

const onOptionSelected = (isCorrect) => {
    if (isCorrect) {
        showResults.value = !showResults.value
    }
}

</script>

<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Aladin">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">

    <div v-if="showResults" class="overlay2">
        <div class="modal2 animated fadeInRight">
            <div> <img src="../../assets/images/bell.svg" alt=""> </div>
            <div class="notetext">
                <h2>New RFQ!</h2>
                <p>Mark John just created a new RFQ.</p>
            </div>
            <div class="options" :style="{ cursor: 'pointer' }">
                <h3>See details</h3>
                <p @click="showResults = false">Hide</p>
            </div>
        </div>
    </div>

    <div v-if="showUploadModal" class="overlay">
        <div class="modal">
            <div class="topUpload">
                <img src="../../assets/images/upload_cloud.svg" />
                <div class="bottomContent">
                    <h2>Select a file or drag and drop here</h2>
                    <p>.xlsx, .xlsm or .xml, file size no more than 10MB</p>
                </div>
                <div class="upload">
                    <button class="loginBtn" onclick="document.getElementById('getFile').click()">Upload file</button>
                    <input type='file' id="getFile" style="display:none" @change="submitFile()" accept="application/pdf"
                        ref="fileInput">

                </div>
                <p style="text-decoration: underline; font-weight: bold;">{{ fileName.name }}</p>
            </div>
            <div class="bottomUpload">
                <div>
                    <div class="topBotton">
                        <button class="topButton" @click="showUploadModal = false">Cancel</button>
                        <button class="topButton" @click="showUploadModal = false">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <PageHeader @selectOption="onOptionSelected"></PageHeader>

    <div class="sandbox">
        <div class="breadcrumb">
            <p @click="$router.push('/bidders')" style="cursor: pointer;">Dashboard</p>
            <img src="../../assets/images/arrowdown.svg" />
            <p>Bid Details</p>
        </div>
        <div class="topBotton">
            <button class="loginBtn" @click="downloadRFQ()">Download RFQ</button>
            <button class="loginBtn" @click="submitResponse()" :disabled="disableResponse">Submit Response</button>
        </div>

        <div class="sandbox__accordion-block" :style="{ width: '100%' }">
            <AccordionList v-model:state="state">
                <AccordionItem id="mId1" default-opened>
                    <template #summary> General</template>
                    <div class="maingeneral">
                        <div class="general">
                            <div class="generalInput">
                                <p>RFQ No:</p>
                                <input name="rfqno" type="text" disabled v-model="rfqNo">
                            </div>
                            <div class="generalInput">
                                <p>Creation Date:</p>
                                <input name="creationDate" type="date" disabled v-model="rfqCreationDate">
                            </div>

                            <div class="tableV">
                                <div>
                                    <p style="color: #47B65C;">Invitation Date & Time: {{ InvitationDate }} GMT+1</p>
                                    <p style="color: #227CBF;">Expiration Date & Time: {{ ExpirationDate }} GMT+1</p>
                                    <vue-countdown :time="time" :interval="100" v-slot="{ days, hours, minutes, seconds }"
                                        style="color: #FF0000;">
                                        Expiration Countdown：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{
                                            seconds
                                        }} seconds.
                                    </vue-countdown>
                                </div>
                            </div>

                        </div>
                        <div class="legal">

                            <div class="legalTop">

                                <div id="lineTop">
                                    <p>Company Overview:</p>
                                    <textarea class="textarea2" name="textarea" rows="17" cols="55"
                                        v-model="companyOverview" disabled></textarea>
                                </div>

                                <div>
                                    <p>Project Description:</p>
                                    <textarea class="textarea2" name="textarea" rows="17" cols="55" disabled
                                        v-model="projectDescription"></textarea>
                                </div>

                                <div>
                                    <p>Scope of Work:</p>
                                    <textarea class="textarea2" name="textarea" rows="17" cols="55" v-model="scopeOfWork"
                                        disabled></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionItem>


                <AccordionItem id="mId2">
                    <template #summary>RFQ Response</template>
                    <div class="legal">
                        <div class="generalInput">
                            <p>Bid Value:</p>
                            <input ref="inputRef" type="text" v-model="bidValue" :options="{ currency: 'NGN' }"
                                :disabled="disableResponse" />
                        </div>
                        <div>
                            <p>Comment (Optional):</p>
                            <textarea class="textarea" name="textarea" rows="12" cols="162" v-model="comments"
                                :disabled="disableResponse"></textarea>
                        </div>
                        <div class="Rfq">

                            <div class="topBotton" style="justify-content: flex-start;">
                                <button class="loginBtn" @click="showUploadModal = true" :disabled="disableResponse">Upload
                                    Supporting Document</button>
                            </div>

                        </div>

                    </div>
                </AccordionItem>
            </AccordionList>
        </div>
    </div>
</template>

<script>
import CurrencyInput from "../../components/VCurrencyField.vue";
import { useCounterStore } from "../../store/piniaStore"
import pinia from "../../store/store";
import biddersService from "../../services/biddersService";
import uploadRequest from '../../components/uploadRequest'
import ESGTemplate from "../../components/ESGTemplate.js";
import TechnicalTemplate from "../../components/TechnicalTemplate.js";
import LegalDDTemplate from "../../components/LegalDDTemplate.js";
const stores = useCounterStore(pinia);

export default {
    data() {
        return {
            bidValue: 0,
            rfqValues: [],
            companyOverview: '',
            projectDescription: '',
            scopeOfWork: '',
            comments: '',
            rfqCreationDate: '',
            InvitationDate: '',
            ExpirationDate: '',
            time: 0,
            rfqNo: '',
            fileName: '',
            dateModified: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
            disableResponse: false,
            serviceCategoryId: 0
        };
    },

    async created() {
        let rfqDetails = await biddersService.getBidderRequisitionsById(stores.bidderId)
        this.rfqValues = (rfqDetails.filter(o => o.id === stores.rfqNo))[0]
        this.rfqNo = this.rfqValues.id
        this.companyOverview = this.rfqValues.companyOverview
        this.projectDescription = this.rfqValues.projectDescription
        this.scopeOfWork = this.rfqValues.scopeOfWork
        this.comments = this.rfqValues.comments
        this.rfqCreationDate = this.rfqValues.createdDate.slice(0, 10).replace(/-/g, '-')

        let expirationDates = this.rfqValues.expirationDateTime
        let invitationDates = this.rfqValues.invitationSentDateTime

        let expireDate = new Date(expirationDates).getTime();
        let inviteDate = new Date(invitationDates).getTime();

        this.InvitationDate = new Date(inviteDate + 1 * 60 * 60 * 1000).toJSON()
        this.ExpirationDate = new Date(expireDate + 1 * 60 * 60 * 1000).toJSON()


        this.serviceCategoryId = this.rfqValues.serviceCategoryId
        this.bidValue = this.rfqValues.bidValue
        if (this.rfqValues.bidSubmissionStatus == true) {
            this.disableResponse = true
        }
        this.timeFunction()
    },

    methods: {
        async submitFile() {
            this.fileName = this.$refs.fileInput.files[0];
            this.contractUploadUrl = await uploadRequest.uploadFiles(this.$refs.fileInput.files[0])
            console.log(this.contractUploadUrl)
        },

        async submitResponse() {
            await biddersService.editBidValues(this.rfqNo, stores.bidderId, this.bidValue, this.comments, this.dateModified, this.contractUploadUrl)
            setTimeout(async () => {
                window.location.reload();
            }, 3000);

        },

        downloadRFQ() {
            if (this.serviceCategoryId == 1) {
                LegalDDTemplate.exportPdfDownload(this.rfqNo, this.companyOverview, this.projectDescription, this.scopeOfWork, this.ExpirationDate)
            }

            if (this.serviceCategoryId == 2) {
                TechnicalTemplate.exportPdfDownload(this.rfqNo, this.companyOverview, this.projectDescription, this.scopeOfWork, this.ExpirationDate)
            }

            if (this.serviceCategoryId == 2) {
                ESGTemplate.exportPdfDownload(this.rfqNo, this.companyOverview, this.projectDescription, this.scopeOfWork, this.ExpirationDate)
            }
        },

        timeFunction() {
            const now = new Date();
            const check = this.ExpirationDate;
            this.time = check - now
        },
    }

};
</script>


<style lang="scss">
@import "../../library/accordion/accordion-styles.scss";

.sandbox {
    display: flex;
    justify-content: space-between;
    font-family: "Roboto", sans-serif;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 50px;
    gap: 20px;
    background: #FAFAFB;

    @media only screen and (max-width: 700px) {
        flex-wrap: wrap;
    }

    .v-model-rep {
        min-width: 300px;
        margin-left: 5px;

        @media only screen and (max-width: 700px) {
            flex-basis: 100%;
        }

        & button {
            font-size: 14px;
            line-height: 20px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            padding: 8px 12px;
            border-radius: 6px;

            &:nth-child(2n + 1) {
                background: #6002ee;
                color: #ffffff;
                margin-right: 12px;
                border: 1px solid #6002ee;
            }

            &:nth-child(2n) {
                background: transparent;
                border: 1px solid #6002ee;
                color: #6002ee;
                margin-right: 12px;
            }
        }
    }
}

.topBotton {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 7px;
    flex-direction: row;
    padding: 20px 20px 0px 0px;
}

.loginBtn:hover {
    background: linear-gradient(90deg, #47B65C 0%, #227CBF 100%);
    transition: 0.7s;
}

.loginBtn {
    width: 230px;
    height: 43px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;
    cursor: pointer;
    border: none;
    background: linear-gradient(90deg, #227CBF 0%, #47B65C 100%);
    border-radius: 50px;
}

.topButton {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 15px;
    width: 200px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #227CBF;
    border-radius: 50px;
    font-family: Roboto;
    font-weight: 400;
    font-size: 14px;
    color: #227CBF;
}

.topButton:hover {
    background-color: #47B65C;
    color: #FFFFFF;
    border: none;
}

button:hover {
    cursor: pointer;
}

.general {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}

.Rfq {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 0px 0px 0px;
    gap: 20px;
    width: 100%;
}

.rfqtableHeader {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 15px 20px;
    gap: 190px;
    width: 100%;
    height: 30px;
    background: #FFFFFF;
    align-items: center;
}

.tableHeader {
    display: flex;
    flex-direction: row;
    width: 100%;
}


.tableHeadertext {
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
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

.tablerowtext {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    width: 100%;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    text-align: left;
}


.textarea {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    gap: 71px;
    width: 100%;
    height: 110px;
    border: 0.5px solid #808080;
    border-radius: 5px;
    resize: none;
}

.rfqstatus {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    width: 220px;
    height: 38px;
    background: #FAFAFB;
    border: 0.5px solid #808080;
    border-radius: 5px;
}

.generalInput Input {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    margin-right: 15px;
    gap: 71px;
    width: 220px;
    height: 35px;
    border: 0.5px solid #808080;
    border-radius: 5px;
    font-family: Roboto;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    color: #000000;
}

.generalInput {
    margin-top: 20px;
}

.legal {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 10px 0px 10px 0px;
}

.legalTop {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 20px;
}

.lineTop {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 5px;

    width: 300px;
    height: 120px;
}

.textarea2 {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    gap: 71px;
    width: 393px;
    resize: none;
    height: 115px;
    border: 0.5px solid #808080;
    border-radius: 5px;
}

.bottomContent h2 {
    text-align: center;
    font-family: Roboto;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #227CBF;
}

.bottomContent p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 5px;
    line-height: 19px;
    text-align: center;
    color: #808080;
}

.breadcrumb {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 10px;
    width: 311px;
    height: 15px;
}

.breadcrumb p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #808080;
}

.category {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;
    width: 270px;
}

.category p {
    margin-bottom: -10px;
}

.frame1234 {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 0px;
    gap: 20px;
    width: 270px;
}

.frame1234 input {
    align-items: center;
    padding: 10px;
    height: 35px;
    border: 0.5px solid #808080;
    border-radius: 5px;
}

.tableV {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px 10px;
    gap: 10px;
    width: 100%;
    border-bottom: 2px solid #FAFAFB;

}

.tableV h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    color: #47B65C;
}

.paginationicons {
    align-self: flex-end;
    padding: 20px;
    display: flex;
    margin-right: 45px;
}

.paginationicons img {
    cursor: pointer;
    width: 15px;
    height: 15px;
    filter: invert(12%) sepia(9%) saturate(0%) hue-rotate(50deg) brightness(15%) contrast(104%);
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
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-top: 10px;
    width: 551px;
    height: 385px;
    border-radius: 10px;
}

.topUpload {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px;
    gap: 24px;
    width: 531px;
    height: 287px;
    background: #FAFAFB;
    border-width: 1px 1px 0px 1px;
    border-style: dashed;
    border-color: #000000;
    border-radius: 5px 5px 0px 0px;
}

.bottomUpload {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 10px;
    width: 531px;
    height: 80px;
    background: #808080;
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.1);
    border-radius: 0px 0px 10px 10px;
}



.overlay2 {
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