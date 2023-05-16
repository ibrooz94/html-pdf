<script setup>
import { AccordionList, AccordionItem } from "vue3-rich-accordion";
import { ref } from "vue";
import PageHeader from '../../components/TopHeader.vue';
const showResults = ref(false)

const onOptionSelected = (isCorrect) => {
    if (isCorrect) {
        const ps = showResults.value = !showResults.value
        return ps
    }
}
</script>

<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Aladin">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
    <div v-if="showResults" class="overlay_">
        <div class="modal_ animated fadeInRight">
            <div> <img src="../.././assets/images/bell.svg" alt=""> </div>
            <div class="notetext_">
                <h2>New RFQ!</h2>
                <p>Mark John just created a new RFQ.</p>
            </div>
            <div class="options_" :style="{ cursor: 'pointer' }">
                <h3>See details</h3>
                <p @click="showResults = false">Hide</p>
            </div>
        </div>
    </div>
    <PageHeader @selectOption="onOptionSelected"></PageHeader>
    <div class="sandbox fullpage">
        <div class="topBotton_">
            <button class="topButton_" @click="onSubmit()" :disabled="disableSave">Begin RFQ</button>
            <button class="topButton_" @click="$router.go(-1)"> Back</button>
        </div>
        <b style="color:red">{{errorMessage}}</b>
        <div class="sandbox__accordion-block" :style="{ width: '100%' }">
            <AccordionList v-model:state="state">
                <AccordionItem id="mId1" default-opened>
                    <template #summary> General</template>
                    <div class="maingeneral">
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

                        <div class="general2_">
                            <div class="generalInput_">
                                <p>Transaction/Request name</p>
                                <textarea class="textarea2_" name="textarea" rows="17" cols="5"
                                    v-model="description"></textarea>
                            </div>
                            <div class="generalInput_">
                                <p>Company Overview</p>
                                <textarea class="textarea2_" name="textarea" rows="17" cols="55"
                                    v-model="companyOverview"></textarea>
                            </div>

                            <div class="generalInput_">
                                <p>Project Description</p>
                                <textarea class="textarea2_" name="textarea" rows="17" cols="55"
                                    v-model="projectDescription"></textarea>
                            </div>
                        </div>
                        <div class="generalInput_">
                            <p>Requisition Status</p>
                            <select name="rfqstatus" class="rfqstatus_" disabled v-model="rfqStatus">
                                <option value="open">Open</option>
                                <option value="submitted">Submitted</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                    </div>
                </AccordionItem>
            </AccordionList>
        </div>
    </div>
    <div class="fullpage2"></div>
</template>

<script>
import administrationsService from "../../services/administrationsService";
import requisitionsServices from "../../services/requisitionsServices";
import router from "../../router";

export default {
    props: {
        size: {
            type: Number,
            required: false,
            default: 4
        }
    },
    data() {
        return {
            errorMessage: '',
            ascending: true,
            pageNumber: 0,  // default to page 0
            sortBy: 'alphabetically',
            rfQNo: "",
            serviceCategory: [],
            user: [],
            requestor: '',
            creationDate: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
            businessUnit: undefined,
            department: undefined,
            businessUnitId: undefined,
            departmentId: undefined,
            description: '',
            companyOverview: '',
            projectDescription: '',
            rfqStatus: 'open',
            disableSave: false
        };
    },

    async created() {
        this.user = await administrationsService.getUserRoles()
        let getLoggedInUserRoles = this.user.find(o => o.userId === stores.signedInUserEmail)
        this.requestor = getLoggedInUserRoles.userFullName
        this.requestoremail = getLoggedInUserRoles.userId
        this.businessUnit = getLoggedInUserRoles.businessUnitDescription
        this.department = getLoggedInUserRoles.departmentDescription
        this.businessUnitId = getLoggedInUserRoles.businessUnitId
        this.departmentId = getLoggedInUserRoles.departmentId
        this.serviceCategory = await administrationsService.getServiceCategory()
    },

    methods: {
        async onSubmit() {
            if (this.creationDate=='' || this.requestoremail=='' || this.description=='' || this.departmentId=='' || this.businessUnitId=='' || this.companyOverview=='' || this.projectDescription=='' || this.requestoremail == '' || this.creationDate == ''){
                return this.errorMessage = 'Please fill all fields'
            }
            this.errorMessage=''
            let rfqReturn = await requisitionsServices.createRequisitions(this.creationDate, this.requestoremail, this.description, this.departmentId, this.businessUnitId, this.companyOverview, this.projectDescription, this.requestoremail, this.creationDate);
            this.rfQNo = rfqReturn.id
            if (this.rfQNo.length > 3) {
                this.disableSave = true
                setTimeout(async () => {
                    stores.rfqNo = this.rfQNo
                    router.replace(`/rfqedit/${this.rfQNo}`)
                }, 2000);
            }
        },
    }

};
</script>


<style lang="scss">
@import "../../library/accordion/accordion-styles.scss";

.fullpage2 {
    width: 100%;
    padding-top: 400px;
    background: #FAFAFB;
}

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

.topBotton_ {
    display: flex;
    width: 100%;
    gap: 7px;
    flex-direction: row;
    padding: 20px 20px 0px 0px;
}

.topBotton_2 {
    display: flex;
    width: 100%;
    gap: 7px;
    flex-direction: column;
    padding: 20px 20px 0px 0px;
}


.topBotton2_ {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 7px;
    padding: 20px 20px 0px 0px;
    justify-content: center;
}

input:disabled {
    background: #dddddd;
}

.topButton1_ {
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


.topButton1_ {
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

.topButton1_ {
    box-sizing: border-box;
    padding: 15px;
    width: 82px;
    height: 20px;
    background: #FFFFFF;
    border: 1px solid #227CBF;
    border-radius: 10px;
    font-family: Roboto;
    font-weight: 300;
    font-size: 11px;
    color: #227CBF;
}

.topButton_:hover,
.topButton1_:hover {
    background-color: #47B65C;
    color: #FFFFFF;
    border: none;
}

button:hover {
    cursor: pointer;
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

.Rfq_ {
    align-items: flex-start;
    padding-top: 20px x;
    width: 100%;
}

.rfqtableHeader_ {
    padding: 10px 20px;
    width: 100%;
    background: #FFFFFF;
    align-items: center;
    display: grid;
    grid-template-columns: 1.5fr 2fr 1.5fr 1fr;
    grid-gap: 80px;
    width: 100%;
}

.rfqtableHeader2_ {
    padding: 5px 20px;
    width: 100%;
    background: #FFFFFF;
    align-items: center;
    display: grid;
    grid-template-columns: 1.5fr 1.5fr 1fr 1.5fr 1.5fr;
    grid-gap: 20px;
}

.tableHeader_ {
    display: flex;
    flex-direction: row;
    gap: 5px;
}

.sortIcon_ {
    cursor: pointer;
}


.tableHeadertext_ {
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #808080;
    text-align: left;
}

.tablerowtext1_ {
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

.tablerowtext_ {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    width: 100%;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    text-align: left;
}


.textarea_ {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    gap: 71px;
    width: 100%;
    height: 100px;
    border: 0.5px solid #808080;
    border-radius: 5px;
    resize: none;
}


.textarea3_ {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    gap: 71px;
    width: 380px;
    resize: none;
    height: 115px;
    border: 0.5px solid #808080;
    border-radius: 5px;
}

.textarea3_ {
    width: 600px;
}


.rfqstatus_,
.rfqstatus2_,
.rfqstatus3_ {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    width: 220px;
    height: 40px;
    background: #FAFAFB;
    border: 0.5px solid #808080;
    border-radius: 5px;
}

.rfqstatus3_ {
    width: 193px;

}

.rfqstatus_,
.rfqstatus3_ {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    background-image: url('../../assets/images/arrow_right.svg');
    background-repeat: no-repeat;
    background-position-x: 96%;
    background-position-y: 13px;
}

.rfqstatus2_ {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    height: 35px;
}

.generalInput_ Input {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
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

.generalInput_ {
    margin-top: 20px;
}

.generalInput_ p {
    color: black
}

.legal_ {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 10px 0px 10px 0px;
}

.legalTop_ {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    padding: 0px;
    gap: 60px;
}

.lineTop_ {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 5px;
    width: 300px;
    height: 120px;
}



.breadcrumb_ {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 10px;
    width: 311px;
    height: 15px;
}

.breadcrumb_ p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #808080;
}

.category_ {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;
    width: 270px;
}

.category_ p {
    margin-bottom: -10px;
}

.frame1234_ {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 0px;
    gap: 20px;
    width: 270px;
}

.category_ input {
    align-items: center;
    padding: 10px;
    height: 40px;
    border: 0.5px solid #000000;
    border-radius: 5px;
}

.category_ select {
    border: 1px #000000 solid;
}

.tableV_ {
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

.tableV_ h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    color: #47B65C;
}

.paginationicons_ {
    justify-content: flex-end;
    padding: 20px;
    display: flex;
    margin-right: 45px;
}

.paginationicons_ img {
    cursor: pointer;
    width: 15px;
    height: 15px;
    filter: invert(12%) sepia(9%) saturate(0%) hue-rotate(50deg) brightness(15%) contrast(104%);
}


.overlay_ {
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

.modal_ {
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

.modal4,
.modal3 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    gap: 20px;
    position: relative;
    width: 640px;
    height: 512.81px;
    background: #FAFAFB;
    border-radius: 10px;
}

.modal3 {
    width: 540px;
    height: 400.81px;
}

.frame_ {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 540px;
    height: 79px;
}

.frame_ h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    color: #47B65C;
}

.frame_ p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #47B65C;
}

.tableframe_ {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 0px 0px;
    gap: 20px;
    width: 580px;
    height: 295.81px;
    background: #FFFFFF;
    overflow: auto;
    border-radius: 10px;
}

.midsect_ h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    text-align: center;
    color: #282828;
}

.midsect_ {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 10px;
    width: 361px;
    height: 144px;
}

.notetext_ {
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

.modal_ img {
    margin-top: 5px;
}


.options_ {
    padding: 5px;
}

.options_ h3 {
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

.bidderlist_ {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 5px;
    margin-top: 5px;
    width: 361px;
    height: 55px;
}

.bidderlist_ label {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
}

select {
    border: 5px yellow solid;

}

.bidderlist_ select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    background-image: url('../../assets/images/arrow_right.svg');
    background-repeat: no-repeat;
    background-position-x: 98%;
    background-position-y: 10px;
    border: 1px solid #dfdfdf;
    border-radius: 2px;
    padding-left: 10px;
    width: 220px;
    height: 35px;
    border-radius: 5px;
    font-family: Roboto;
    font-size: 12px;
}

.options_ p {
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

.modals_ {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    position: relative;
    width: 553.49px;
    border-radius: 10px;
}

.topUpload_ {
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

.bottomUpload_ {
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


.loginBtn_:hover {
    background: linear-gradient(90deg, #47B65C 0%, #227CBF 100%);
    transition: 0.7s;
}

.loginBtn_ {
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

.topBotton3_ {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 7px;
    flex-direction: row;
    padding: 20px 20px 0px 0px;
}
</style>