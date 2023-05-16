<script setup>
import { AccordionList, AccordionItem } from "vue3-rich-accordion";
import { ref } from "vue";
import PageHeader from '../../components/TopHeader.vue';
import uploadRequest from '../../components/uploadRequest'
const showResults = ref(false)
const showUploadModal = ref(false)

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

    <div v-if="showResults" class="overlay_" @click="showNewUserModal = false">
        <div class="modal_ animated fadeInRight" @click.stop>
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


    <div v-if="showPreferredBidders" class="overlay_" @click="showPreferredBidders = false">
        <div class="modals4_" @click.stop>
            <div class="midsect_">
                <h3>Add Bidders to RFQ</h3>
                <div class="bidderlist6_">
                    <label for="">Select Bidders: </label>
                    <div class="checkboxDiv">
                        {{ preferredBiddersSelected.toString() }}
                        <input style="border: 1px solid black; padding: 5px; margin: 5px; width: 100%;"
                            v-model="searchpreferredBidders" type="text" placeholder="Search..." />

                        <v-checkbox v-model="preferredBiddersSelected" :label="i.bidderName" :value="i.id"
                            v-for="i in preferredBidders" :key="i.id"></v-checkbox>
                    </div>
                </div>
                <div class="topBotton3_">
                    <button class="topButton_" @click="showPreferredBidders = false">Cancel</button>
                    <button class="topButton_" v-if="idPreferredBidders == 1"
                        @click="createLineSelectedBiddersLegal()">Submit</button>
                    <button class="topButton_" v-if="idPreferredBidders == 2"
                        @click="createLineSelectedBiddersESG()">Submit</button>
                    <button class="topButton_" v-if="idPreferredBidders == 3"
                        @click="createLineSelectedBiddersTechnical()">Submit</button>
                </div>
            </div>

        </div>
    </div>

    <div v-if="selectAllBiddersESG" class="overlay_" @click="selectAllBiddersESG = false">
        <div class="modals5_" @click.stop>
            <div class="midsect_">
                <h3>Select All Bidders</h3>
                <div class="bidderlist_">
                    <label for="">Do you want to select all {{ checkServiceLineCategoryESG }} Bidders? </label>
                </div>
                <div class="topBotton3_">
                    <button class="topButton_" @click="selectAllBiddersESG = false">No</button>
                    <button class="topButton_" @click.prevent="createLineAllBiddersESG()">Yes</button>
                </div>
            </div>
        </div>
    </div>

    <div v-if="selectAllBiddersLegal" class="overlay_" @click="selectAllBiddersLegal = false">
        <div class="modals5_" @click.stop>
            <div class="midsect_">
                <h3>Select All Bidders</h3>
                <div class="bidderlist_">
                    <label for="">Do you want to select all {{ checkServiceLineCategoryLegal }} Bidders? </label>
                </div>
                <div class="topBotton3_">
                    <button class="topButton_" @click="selectAllBiddersLegal = false">No</button>
                    <button class="topButton_" @click.prevent="createLineAllBiddersLegal()">Yes</button>
                </div>
            </div>

        </div>
    </div>

    <div v-if="selectAllBiddersTechnical" class="overlay_" @click="selectAllBiddersTechnical = false">
        <div class="modals5_" @click.stop>
            <div class="midsect_">
                <h3>Select All Bidders</h3>
                <div class="bidderlist_">
                    <label for="">Do you want to select all {{ checkServiceLineCategoryTechnical }} Bidders? </label>
                </div>
                <div class="topBotton3_">
                    <button class="topButton_" @click="selectAllBiddersTechnical = false">No</button>
                    <button class="topButton_" @click.prevent="createLineAllBiddersTechnical()">Yes</button>
                </div>
            </div>
        </div>
    </div>

    <div v-if="showUploadModal" class="overlay_" @click="showUploadModal = false">
        <div class="modal3" @click.stop>
            <div class="topUpload_">
                <img src="../../assets/images/upload_cloud.svg" />
                <div class="bottomContent">
                    <h2>Select a file or drag and drop here</h2>
                    <p>.xlsx, .xlsm or .xml, file size no more than 10MB</p>
                </div>
                <div class="upload">
                    <button class="loginBtn_" onclick="document.getElementById('getFile').click()">Upload file</button>
                    <input type='file' id="getFile" style="display:none" @change="submitFile()" accept="application/pdf"
                        ref="fileInput">

                </div>
                <p style="text-decoration: underline; font-weight: bold;">{{ example.name }}</p>
            </div>
            <div class="bottomUpload_">
                <div>
                    <div class="topBotton3_">
                        <button class="topButton_" @click="showUploadModal = false">Cancel</button>
                        <button class="topButton_" @click=sendUploadUrl()>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="showReviewQuotes" class="overlay_" @click="showReviewQuotes = false">
        <div class="modal4" @click.stop>
            <div class="frame_">
                <h3>Review Quotes</h3>
                <p>RFQ Number: {{ rfQNo }}</p>
                <p>Number of Vendors: {{ filteredbidderResponse.length }}</p>
            </div>
            <div class="tableframe_">
                <div class="rfqtableHeader2_">
                    <p class="tableHeadertext_">RFQ No</p>
                    <p class="tableHeadertext_">Amount</p>
                    <p class="tableHeadertext_">Status</p>
                    <p class="tableHeadertext_">Ranking</p>
                </div>
                <div class="rfqtableHeader2_" v-for="value in filteredbidderResponse" :key="value.rfqNo">
                    <p class="tableHeadertext_">{{ value.bidderId }}</p>
                    <p class="tableHeadertext_">{{ value.bidValue }}</p>
                    <p class="tableHeadertext_">{{ value.status }}</p>
                    <p class="tableHeadertext_">{{ numberranking++ }}</p>
                    <button class="topButton1_">Notify as Winner</button>
                </div>
            </div>
            <div class="topBotton2_">
                <button class="topButton_" @click="showReviewQuotes = !showReviewQuotes">Cancel</button>
                <button class="topButton_">Notify Winner</button>
            </div>
        </div>
    </div>

    <div v-if="showPreview" class="overlay_" @click="showPreview = false">
        <div class="modal5" @click.stop>
            <iframe :src=stores.testDocument3 height="100%" width="100%" title="Preview Template"></iframe>

        </div>
    </div>
    <PageHeader @selectOption="onOptionSelected"></PageHeader>
    <div class="sandbox">
        <div class="breadcrumb_">
            <p @click="$router.back()" style="cursor: pointer;">Back</p>
            <img src="../../assets/images/arrowdown.svg" />
            <p>Requisitions</p>
            <img src="../../assets/images/arrowdown.svg" />
            <p>Requisition Details</p>
        </div>
        <div class="topBotton_">
            <button class="topButton_" @click="onSubmit()" disabled>Begin RFQ</button>
            <button class="topButton_" @click="$router.go(-1)"> Back</button>
        </div>
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
                                <textarea class="textarea2_" name="textarea" rows="17" cols="55" v-model="description"
                                    :disabled="disableFieldGeneral"></textarea>
                            </div>
                            <div class="generalInput_">
                                <p>Background</p>
                                <textarea class="textarea2_" name="textarea" rows="17" cols="55" v-model="companyOverview"
                                    :disabled="disableFieldGeneral"></textarea>
                            </div>

                            <div class="generalInput_">
                                <p>Project Description</p>
                                <textarea class="textarea2_" name="textarea" rows="17" cols="55"
                                    :disabled="disableFieldGeneral" v-model="projectDescription"></textarea>
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


                <AccordionItem id="mId2" v-if="visible">
                    <template #summary>Legal RFQ Section</template>
                    <div class="legal_">
                        <div class="legalTop_">
                            <div>
                                <p>Scope of Work</p>
                                <textarea class="textarea3_" name="textarea" rows="17" cols="55"
                                    v-model.trim="scopeofWorkLegal" :disabled="disableFieldLegal"></textarea>
                            </div>

                            <div class="category_">
                                <p>Expiration Duration</p>
                                <div class="frame1234_">
                                    <input name="rfqno" type="number" placeholder="Input Days/Hours"
                                        v-model="selectTimeLegal" :disabled="disableFieldLegal">
                                    <select name="rfqstatus" class="rfqstatus_" v-model="selectTimeFrameworkLegal"
                                        :disabled="disableFieldLegal">
                                        <option value="Days">Days</option>
                                        <option value="Hours">Hours</option>
                                    </select>
                                </div>
                                <p>Service Category</p>
                                <select name="rfqstatus" class="rfqstatus3_" v-model="selectedServiceCategoryLineLegal"
                                    :disabled="disableFieldLegal">
                                    <option :value=serviceCategory.id v-for="serviceCategory in serviceCategoryLineLegal">{{
                                        serviceCategory.subCategoryName }}</option>
                                </select>
                            </div>
                            <div class="topBotton_2">
                                <button class="topButton_" @click="saveRFQLineLegal()">Save & Preview RFQ</button>
                                <button class="topButton_" @click="selectAllBiddersLegal = !selectAllBiddersLegal"
                                    :disabled="disablePreferredBidderBtnLegal">Select all
                                    Bidders</button>
                                <button class="topButton_" @click="getBiddersbyServiceCategoryLineIdLegal()"
                                    :disabled="disablePreferredBidderBtnLegal">Select
                                    Preferred Bidders</button>
                                <button class="topButton_" @click="notifyBiddersLegal()">Send RFQ to Bidders</button>
                            </div>
                        </div>
                        <b v-if="errorMessageId == 1"> {{ errorMessage }}</b>
                        <div class="tableV_">
                            <h3>Nominated Bidders</h3>
                            <div v-if="showTimeLegal">
                                <p style="color: #47B65C;">Invitation Date & Time: {{ invitationDateLegal }} GMT+1</p>
                                <p style="color: #227CBF;">Expiration Date & Time: {{ expirationDateLegal }} GMT+1</p>
                                <vue-countdown :time="timeLegal" :interval="100" v-slot="{ days, hours, minutes, seconds }"
                                    style="color: #FF0000;">
                                    Expiration Countdown：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{
                                        seconds
                                    }} seconds.
                                </vue-countdown>
                            </div>
                        </div>

                        <div class="Rfq_" v-if="nominatedBiddersLegal.length >= 1">

                            <div class="rfqtableHeader_">
                                <div class="tableHeader_">
                                    <p class="tableHeadertext_">Vendor Code </p>
                                    <img src="../../assets/images/sorticon.svg" class="sorticon"
                                        v-on:click="ascending = !ascending" />
                                </div>
                                <div class="tableHeader_">
                                    <p class="tableHeadertext_">Vendor Name </p>
                                    <img src="../../assets/images/sorticon.svg" class="sorticon"
                                        v-on:click="ascending = !ascending" />
                                </div>
                                <div class="tableHeader_">
                                    <p class="tableHeadertext_">Bid Submitted </p>
                                    <img src="../../assets/images/sorticon.svg" class="sorticon"
                                        v-on:click="ascending = !ascending" />
                                </div>
                                <div class="tableHeader_">
                                    <p class="tableHeadertext_">Bid Value </p>
                                    <img src="../../assets/images/sorticon.svg" class="sorticon"
                                        v-on:click="ascending = !ascending" />
                                </div>
                            </div>
                            <div class="rfqtableHeader_" v-for="biddersSelected in filteredBiddersLegal"
                                :key="biddersSelected.bidderId">
                                <p class="tablerowtext_" :style="{ cursor: 'pointer' }">{{ biddersSelected.bidderId }}</p>
                                <p class="tablerowtext_" :style="{ cursor: 'pointer' }">{{ biddersSelected.bidderName }}</p>
                                <p class="tablerowtext_" :style="{ cursor: 'pointer' }" v-if="showBidSubmitandValue">{{
                                    biddersSelected.bidSubmissionStatus }}</p>
                                <p class="tablerowtext_" :style="{ cursor: 'pointer' }" v-if="showBidSubmitandValue">{{
                                    biddersSelected.bidValue.toLocaleString("en-US") }}</p>
                            </div>
                            <div class="paginationButtons" v-if="showPagination">
                                <button @click="prevPage" :disabled="pageNumber == 1" class="paginationButton">
                                    &lt;
                                </button>
                                <p> ---{{ pageNumber }}---</p>
                                <button @click="nextPage()" :disabled="pageNumber >= pageCountLegal - 1"
                                    class="paginationButton">
                                    >
                                </button>
                            </div>
                        </div>
                        <div class="topBotton_">
                            <button class="topButton_" @click="resetLineBiddersLegal()">Reset Bidders</button>
                            <button class="topButton_" @click="reviewQuotes(1)">Review Quotes</button>
                            <button class="topButton_" @click="showUploadModal = !showUploadModal"> Upload Contract</button>
                            <button class="topButton_" @click="$router.push('/purchcontractdet')">View and Send
                                Contract</button>
                            <button class="topButton_">Notify Losers</button>
                        </div>
                    </div>
                </AccordionItem>
                <AccordionItem id="mId3" v-if="visible">
                    <template #summary>ESG RFQ Section</template>
                    <div class="legal_">
                        <div class="legalTop_">
                            <div>
                                <p>Scope of Work</p>
                                <textarea class="textarea3_" name="textarea" rows="17" cols="55"
                                    v-model.trim="scopeofWorkESG" :disabled="disableFieldESG"></textarea>
                            </div>

                            <div class="category_">
                                <p>Expiration Duration</p>
                                <div class="frame1234_">
                                    <input name="rfqno" type="number" placeholder="Input Days/Hours" v-model="selectTimeESG"
                                        :disabled="disableFieldESG">
                                    <select name="rfqstatus" class="rfqstatus_" v-model="selectTimeFrameworkESG"
                                        :disabled="disableFieldESG">
                                        <option value="Days">Days</option>
                                        <option value="Hours">Hours</option>
                                    </select>
                                </div>
                                <p>Service Category</p>
                                <select name="rfqstatus" class="rfqstatus3_" v-model="selectedServiceCategoryLineESG"
                                    :disabled="disableFieldESG">
                                    <option :value=serviceCategory.id v-for="serviceCategory in serviceCategoryLineESG">{{
                                        serviceCategory.subCategoryName }}</option>
                                </select>
                            </div>
                            <div class="topBotton_2">
                                <button class="topButton_" @click="saveRFQLineESG()">Save & Preview RFQ</button>
                                <button class="topButton_" @click="selectAllBiddersESG = !selectAllBiddersESG"
                                    :disabled="disablePreferredBidderBtnESG">Select all
                                    Bidders</button>
                                <button class="topButton_" @click="getBiddersbyServiceCategoryLineIdESG()"
                                    :disabled="disablePreferredBidderBtnESG">Select
                                    Preferred Bidders</button>
                                <button class="topButton_" @click="notifyBiddersESG()">Send RFQ to Bidders</button>
                            </div>
                        </div>
                        <b v-if="errorMessageId == 2"> {{ errorMessage }}</b>
                        <div class="tableV_">
                            <h3>Nominated Bidders</h3>
                            <div v-if="showTimeESG">
                                <p style="color: #47B65C;">Invitation Date & Time: {{ invitationDateESG }} GMT+1</p>
                                <p style="color: #227CBF;">Expiration Date & Time: {{ expirationDateESG }} GMT+1</p>
                                <vue-countdown :time="timeESG" :interval="100" v-slot="{ days, hours, minutes, seconds }"
                                    style="color: #FF0000;">
                                    Expiration Countdown：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{
                                        seconds
                                    }} seconds.
                                </vue-countdown>
                            </div>
                        </div>

                        <div class="Rfq_" v-if="nominatedBiddersESG.length >= 1">

                            <div class="rfqtableHeader_">
                                <div class="tableHeader_">
                                    <p class="tableHeadertext_">Vendor Code </p>
                                    <img src="../../assets/images/sorticon.svg" class="sorticon"
                                        v-on:click="ascending = !ascending" />
                                </div>
                                <div class="tableHeader_">
                                    <p class="tableHeadertext_">Vendor Name </p>
                                    <img src="../../assets/images/sorticon.svg" class="sorticon"
                                        v-on:click="ascending = !ascending" />
                                </div>
                                <div class="tableHeader_">
                                    <p class="tableHeadertext_">Bid Submitted </p>
                                    <img src="../../assets/images/sorticon.svg" class="sorticon"
                                        v-on:click="ascending = !ascending" />
                                </div>
                                <div class="tableHeader_">
                                    <p class="tableHeadertext_">Bid Value </p>
                                    <img src="../../assets/images/sorticon.svg" class="sorticon"
                                        v-on:click="ascending = !ascending" />
                                </div>
                            </div>

                            <div class="rfqtableHeader_" v-for="biddersSelected in filteredBiddersESG"
                                :key="biddersSelected.bidderId">
                                <p class="tablerowtext_" :style="{ cursor: 'pointer' }">{{ biddersSelected.bidderId }}</p>
                                <p class="tablerowtext_" :style="{ cursor: 'pointer' }">{{ biddersSelected.bidderName }}</p>
                                <p class="tablerowtext_" :style="{ cursor: 'pointer' }" v-if="showBidSubmitandValue">{{
                                    biddersSelected.bidSubmissionStatus }}</p>
                                <p class="tablerowtext_" :style="{ cursor: 'pointer' }" v-if="showBidSubmitandValue">{{
                                    biddersSelected.bidValue.toLocaleString("en-US") }}</p>
                            </div>
                            <div class="paginationButtons" v-if="showPagination">
                                <button @click="prevPage" :disabled="pageNumber == 1" class="paginationButton">
                                    &lt;
                                </button>
                                <p> ---{{ pageNumber }}---</p>
                                <button @click="nextPage()" :disabled="pageNumber >= pageCountESG - 1"
                                    class="paginationButton">
                                    >
                                </button>
                            </div>
                        </div>
                        <div class="topBotton_">
                            <button class="topButton_" @click="resetLineBiddersESG">Reset Bidders</button>
                            <button class="topButton_" @click="reviewQuotes(2)">Review Quotes</button>
                            <button class="topButton_" @click="showUploadModal = !showUploadModal"> Upload Contract</button>
                            <button class="topButton_" @click="$router.push('/purchcontractdet')">View and Send
                                Contract</button>
                            <button class="topButton_">Notify Losers</button>
                        </div>
                    </div>
                </AccordionItem>
                <AccordionItem id="mId4" v-if="visible">
                    <template #summary>Technical RFQ Section</template>
                    <div class="legal_">
                        <div class="legalTop_">
                            <div>
                                <p>Scope of Work</p>
                                <textarea class="textarea3_" name="textarea" rows="17" cols="55"
                                    v-model.trim="scopeofWorkTechnical" :disabled="disableFieldTechnical"></textarea>
                            </div>

                            <div class="category_">
                                <p>Expiration Duration</p>
                                <div class="frame1234_">
                                    <input name="rfqno" type="number" placeholder="Input Days/Hours"
                                        v-model="selectTimeTechnical" :disabled="disableFieldTechnical">
                                    <select name="rfqstatus" class="rfqstatus_" v-model="selectTimeFrameworkTechnical"
                                        :disabled="disableFieldTechnical">
                                        <option value="Days">Days</option>
                                        <option value="Hours">Hours</option>
                                    </select>
                                </div>
                                <p>Service Category</p>
                                <select name="rfqstatus" class="rfqstatus3_" v-model="selectedServiceCategoryLineTechnical"
                                    :disabled="disableFieldTechnical">
                                    <option :value=serviceCategory.id
                                        v-for="serviceCategory in serviceCategoryLineTechnical">{{
                                            serviceCategory.subCategoryName }}</option>
                                </select>
                            </div>
                            <div class="topBotton_2">
                                <button class="topButton_" @click="saveRFQLineTechnical()">Save & Preview RFQ</button>
                                <button class="topButton_" @click="selectAllBiddersTechnical = !selectAllBiddersTechnical"
                                    :disabled="disablePreferredBidderBtnTechnical">Select all
                                    Bidders</button>
                                <button class="topButton_" @click="getBiddersbyServiceCategoryLineIdTechnical()"
                                    :disabled="disablePreferredBidderBtnTechnical">Select Preferred Bidders</button>
                                <button class="topButton_" @click="notifyBiddersTechnical()">Send RFQ to Bidders</button>
                            </div>
                        </div>
                        <b v-if="errorMessageId == 3"> {{ errorMessage }}</b>
                        <div class="tableV_">
                            <h3>Nominated Bidders</h3>
                            <div v-if="showTimeTechnical">
                                <p style="color: #47B65C;">Invitation Date & Time: {{ invitationDateTechnical }} GMT+1</p>
                                <p style="color: #227CBF;">Expiration Date & Time: {{ expirationDateTechnical }} GMT+1</p>
                                <vue-countdown :time="timeTechnical" :interval="100"
                                    v-slot="{ days, hours, minutes, seconds }" style="color: #FF0000;">
                                    Expiration Countdown：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{
                                        seconds
                                    }} seconds.
                                </vue-countdown>
                            </div>
                        </div>

                        <div class="Rfq_" v-if="nominatedBiddersTechnical.length >= 1">
                            <div class="rfqtableHeader_">
                                <div class="tableHeader_">
                                    <p class="tableHeadertext_">Vendor Code </p>
                                    <img src="../../assets/images/sorticon.svg" class="sorticon"
                                        v-on:click="ascending = !ascending" />
                                </div>
                                <div class="tableHeader_">
                                    <p class="tableHeadertext_">Vendor Name </p>
                                    <img src="../../assets/images/sorticon.svg" class="sorticon"
                                        v-on:click="ascending = !ascending" />
                                </div>
                                <div class="tableHeader_">
                                    <p class="tableHeadertext_">Bid Submitted </p>
                                    <img src="../../assets/images/sorticon.svg" class="sorticon"
                                        v-on:click="ascending = !ascending" />
                                </div>
                                <div class="tableHeader_">
                                    <p class="tableHeadertext_">Bid Value </p>
                                    <img src="../../assets/images/sorticon.svg" class="sorticon"
                                        v-on:click="ascending = !ascending" />
                                </div>
                            </div>

                            <div class="rfqtableHeader_" v-for="biddersSelected in filteredBiddersTechnical"
                                :key="biddersSelected.bidderId">
                                <p class="tablerowtext_" :style="{ cursor: 'pointer' }">{{ biddersSelected.bidderId }}</p>
                                <p class="tablerowtext_" :style="{ cursor: 'pointer' }">{{ biddersSelected.bidderName }}</p>
                                <p class="tablerowtext_" :style="{ cursor: 'pointer' }" v-if="showBidSubmitandValue">{{
                                    biddersSelected.bidSubmissionStatus }}</p>
                                <p class="tablerowtext_" :style="{ cursor: 'pointer' }" v-if="showBidSubmitandValue">{{
                                    biddersSelected.bidValue.toLocaleString("en-US") }}</p>
                            </div>
                            <div class="paginationButtons" v-if="showPagination">
                                <button @click="prevPage" :disabled="pageNumber == 1" class="paginationButton">
                                    &lt;
                                </button>
                                <p> ---{{ pageNumber }}---</p>
                                <button @click="nextPage()" :disabled="pageNumber >= pageCountTechnical - 1"
                                    class="paginationButton">
                                    >
                                </button>
                            </div>
                        </div>
                        <div class="topBotton_">
                            <button class="topButton_">Reset Bidders</button>
                            <button class="topButton_" @click="reviewQuotes(3)">Review Quotes</button>
                            <button class="topButton_" @click="showUploadModal = !showUploadModal"> Upload Contract</button>
                            <button class="topButton_" @click="$router.push('/purchcontractdet')">View and Send
                                Contract</button>
                            <button class="topButton_">Notify Losers</button>
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
import { useCounterStore } from "../../store/piniaStore";
import pinia from "../../store/store";
import ESGTemplate from "../../components/ESGTemplate.js";
import TechnicalTemplate from "../../components/TechnicalTemplate.js";
import LegalDDTemplate from "../../components/LegalDDTemplate.js";
import biddersService from "../../services/biddersService";
import emailjs from 'emailjs-com';
const stores = useCounterStore(pinia);

export default {
    props: {
        size: {
            type: Number,
            required: false,
            default: 6
        }
    },
    data() {
        return {
            timeLegal: 0,
            timeTechnical: 0,
            timeESG: 0,
            numberranking: 1,
            showPreferredBidders: false,
            contractUploadUrl: '',
            searchpreferredBidders: '',
            selectedServiceCategoryLineESG: '',
            selectedServiceCategoryLineLegal: '',
            selectedServiceCategoryLineTechnical: '',
            selectTimeLegal: undefined,
            selectTimeTechnical: undefined,
            selectTimeESG: undefined,
            ascending: true,
            showPreview: false,
            showReviewQuotes: false,
            selectTimeFrameworkLegal: 'Days',
            selectTimeFrameworkTechnical: 'Days',
            selectTimeFrameworkESG: 'Days',
            showTimeLegal: false,
            showTimeTechnical: false,
            showTimeESG: false,
            pageNumber: 1,  // default to page 1
            sortBy: 'alphabetically',
            rfQNo: "",
            showPagination: false,
            errorMessage: '',
            id: '',
            idPreferredBidders: '',
            creationDate: '',
            invitationDateLegal: undefined,
            invitationDateESG: undefined,
            invitationDateTechnical: undefined,
            expirationDateESG: undefined,
            expirationDateTechnical: undefined,
            expirationDateLegal: undefined,
            showBidSubmitandValue: false,
            serviceCategory: [],
            serviceCategoryLineLegal: [],
            serviceCategoryLineESG: [],
            serviceCategoryLineTechnical: [],
            getRequisitionLinesbyReqId: [],
            getRequisition: [],
            requestor: '',
            businessUnit: undefined,
            department: undefined,
            businessUnitId: undefined,
            departmentId: undefined,
            description: '',
            interval: "",
            companyOverview: '',
            projectDescription: '',
            rfqStatus: 'open',
            requestoremail: '',
            scopeofWorkLegal: '',
            scopeofWorkTechnical: '',
            scopeofWorkESG: '',
            errorMessageId: '',
            example: '',
            preferredBidders: [],
            preferredBiddersSelected: [],
            visible: true,
            nominatedBiddersLegal: [],
            nominatedBiddersESG: [],
            nominatedBiddersTechnical: [],
            checkServiceLineCategoryLegal: '',
            checkServiceLineCategoryESG: '',
            checkServiceLineCategoryTechnical: '',
            selectAllBiddersLegal: false,
            selectAllBiddersTechnical: false,
            selectAllBiddersESG: false,
            disableReviewQuotesLegal: true,
            disableReviewQuotesTechical: true,
            disableReviewQuotesESG: true,
            disablePreferredBidderBtnLegal: false,
            disablePreferredBidderBtnTechnical: false,
            disablePreferredBidderBtnESG: false,
            disableFieldGeneral: false,
            disableFieldTechnical: false,
            disableFieldESG: false,
            disableFieldLegal: false,
            bidderResponseLegal: [],
            bidderResponseTechnical: [],
            bidderResponseESG: [],
            preferredBidders: [],
            toWhom: []
        };
    },

    async created() {
        this.getRequisition = await requisitionsServices.getRequisitions();
        this.serviceCategoryLineLegal = await administrationsService.getServiceLine(1)
        this.serviceCategoryLineTechnical = await administrationsService.getServiceLine(2)
        console.log(this.serviceCategoryLineTechnical)
        this.serviceCategoryLineESG = await administrationsService.getServiceLine(3)
        let requisition = this.getRequisition.find(o => o.id === stores.rfqNo)
        this.requestor = requisition.requestedFullName
        this.rfQNo = stores.rfqNo
        this.requestoremail = requisition.requestedBy
        this.businessUnit = requisition.businessUnitShortCode
        this.department = requisition.departmentShortCode
        this.businessUnitId = requisition.businessUnitId
        this.departmentId = requisition.departmentId
        this.projectDescription = requisition.projectDescription
        this.description = requisition.description
        this.companyOverview = requisition.companyOverview
        this.creationDate = requisition.createdDate.slice(0, 10).replace(/-/g, '-')
        this.serviceCategory = await administrationsService.getServiceCategory()
        this.getRequisitionLinesbyReqId = await requisitionsServices.getRequisitionLinesbyReqid(this.rfQNo);
        let RequisitionLinesLegal = this.getRequisitionLinesbyReqId.find(o => o.serviceCategoryId === 1)
        let RequisitionLinesTechnical = this.getRequisitionLinesbyReqId.find(o => o.serviceCategoryId === 2)
        let RequisitionLinesESG = this.getRequisitionLinesbyReqId.find(o => o.serviceCategoryId === 3)
        this.scopeofWorkLegal = RequisitionLinesLegal.scopeOfWork

        //adjust once the api is sorted
        this.selectedServiceCategoryLineLegal = RequisitionLinesLegal.serviceCategoryId
        this.selectedServiceCategoryLineTechnical = RequisitionLinesTechnical.serviceCategoryId
        this.selectedServiceCategoryLineESG = RequisitionLinesESG.serviceCategoryId


        this.scopeofWorkTechnical = RequisitionLinesTechnical.scopeOfWork
        this.scopeofWorkESG = RequisitionLinesESG.scopeOfWork
        await this.checkServiceLineidLegal()
        await this.checkServiceLineidTechnical()
        await this.checkServiceLineidESG()


        //time framework
        this.selectTimeFrameworkTechnical = RequisitionLinesTechnical.expirationDurationUnit
        this.selectTimeFrameworkLegal = RequisitionLinesLegal.expirationDurationUnit
        this.selectTimeFrameworkESG = RequisitionLinesESG.expirationDurationUnit


        //expiration time duration
        this.selectTimeLegal = RequisitionLinesLegal.expirationDuration
        this.selectTimeTechnical = RequisitionLinesTechnical.expirationDuration
        this.selectTimeESG = RequisitionLinesESG.expirationDuration


        //time date for requisition per line
        let expirationDateLegals = RequisitionLinesLegal.expirationDateTime
        let expirationDateTechnicals = RequisitionLinesTechnical.expirationDateTime
        let expirationDateESGs = RequisitionLinesESG.expirationDateTime

        let expireDateLegal = new Date(expirationDateLegals).getTime();
        let expireDateTechnical = new Date(expirationDateTechnicals).getTime();
        let expireDateESG = new Date(expirationDateESGs).getTime();

        this.expirationDateLegal = new Date(expireDateLegal + 1 * 60 * 60 * 1000).toJSON()
        this.expirationDateTechnical = new Date(expireDateTechnical + 1 * 60 * 60 * 1000).toJSON()
        this.expirationDateESG = new Date(expireDateESG + 1 * 60 * 60 * 1000).toJSON()

        let invitationDatesLegal = RequisitionLinesLegal.invitationSentDateTime
        let invitationDatesTechnical = RequisitionLinesTechnical.invitationSentDateTime
        let invitationDatesESG = RequisitionLinesESG.invitationSentDateTime

        let inviteDateLegal = new Date(invitationDatesLegal).getTime();
        let inviteDateTechnical = new Date(invitationDatesTechnical).getTime();
        let inviteDateESG = new Date(invitationDatesESG).getTime();

        this.invitationDateLegal = new Date(inviteDateLegal + 1 * 60 * 60 * 1000).toJSON()
        this.invitationDateTechnical = new Date(inviteDateTechnical + 1 * 60 * 60 * 1000).toJSON()
        this.invitationDateESG = new Date(inviteDateESG + 1 * 60 * 60 * 1000).toJSON()



        //keep for reference
        let inviteDateLegalss = new Date('2023-05-02T15:46:04.828').getTime();
        let updatedTime = new Date(inviteDateLegalss + 1 * 60 * 60 * 1000);


        if (this.invitationDateESG != null && this.expirationDateESG != null && this.invitationDateESG != new Date('1970-01-01T01:00:00.000Z').toJSON()) {
            this.timeFunctionESG()
            this.showTimeESG = true
            this.disableFieldGeneral = true
            this.disableFieldESG = true
        }
        console.log(this.invitationDateESG)
        if (this.invitationDateTechnical != null && this.expirationDateTechnical != null && this.invitationDateTechnical != new Date('1970-01-01T01:00:00.000Z').toJSON()) {
            this.timeFunctionTechnical()
            this.showTimeTechnical = true
            this.disableFieldGeneral = true
            this.disableFieldTechnical = true


        }

        if (this.invitationDateLegal != null && this.expirationDateLegal != null && this.invitationDateLegal != new Date('1970-01-01T01:00:00.000Z').toJSON()) {
            this.timeFunctionLegal()
            this.showTimeLegal = true
            this.disableFieldGeneral = true
            this.disableFieldLegal = true
        }


        //get Selected bidders by ServiceCategory
        let nominatedBidders = await requisitionsServices.getRequisitionBiddersbyRfqId(this.rfQNo)
        this.nominatedBiddersLegal = nominatedBidders.filter(o => o.serviceCategoryId == 1)
        console.log(this.nominatedBiddersLegal)
        this.nominatedBiddersTechnical = nominatedBidders.filter(o => o.serviceCategoryId == 2)
        this.nominatedBiddersESG = nominatedBidders.filter(o => o.serviceCategoryId == 3)
        this.bidderResponseLegal = this.nominatedBiddersLegal.filter(o => o.bidSubmissionStatus == true)
        this.bidderResponseTechnical = this.nominatedBiddersTechnical.filter(o => o.bidSubmissionStatus == true)
        this.bidderResponseESG = this.nominatedBiddersESG.filter(o => o.bidSubmissionStatus == true)

        //disable buttons
        this.disableButtonsESG()
        this.disableButtonsTechnical()
        this.disableButtonsLegal()
    },


    computed: {
        vModelItems() {
            return Object.entries(state.value);
        },
        pageCountLegal() {
            let l = this.nominatedBiddersLegal.length,
                s = this.size;
            return Math.ceil(l / s);
        },

        pageCountTechnical() {
            let l = this.nominatedBiddersTechnical.length,
                s = this.size;
            return Math.ceil(l / s);
        },

        pageCountESG() {
            let l = this.nominatedBiddersESG.length,
                s = this.size;
            return Math.ceil(l / s);
        },

        indexStart() {
            return (this.pageNumber - 1) * this.size;
        },
        indexEnd() {
            return this.indexStart + this.size;
        },

        filteredbidderResponse() {
            if (this.id == 1) {
                var contracts = this.bidderResponseLegal
            }
            else if (this.id == 2) {
                var contracts = this.bidderResponseESG
            }

            else if (this.id == 3) {
                var contracts = this.bidderResponseTechnical
            }
            // Sort by alphabetical order
            contracts = contracts.sort((a, b) => {
                if (this.sortBy == 'alphabetically') {
                    let fa = a.bidValue.toLowerCase(), fb = b.bidValue.toLowerCase()
                    if (fa < fb) {
                        return -1
                    }
                    if (fa > fb) {
                        return 1
                    }
                    return 0
                }
            })
            if (!this.ascending) {
                contracts.reverse()
            }
            return contracts
        },

        filteredBiddersLegal() {
            this.disableButtonsLegal()
            this.checkServiceLineidLegal()
            let contracts = this.nominatedBiddersLegal
            // this.toWhom = (contracts.biddersEmailAddress)
            // console.log(this.toWhom)
            // this.toWhom = (contracts.biddersEmailAddress).toString

            // Sort by alphabetical order
            contracts = contracts.sort((a, b) => {
                if (this.sortBy == 'alphabetically') {
                    let fa = a.bidderId.toLowerCase(), fb = b.bidderId.toLowerCase()

                    if (fa < fb) {
                        return -1
                    }
                    if (fa > fb) {
                        return 1
                    }
                    return 0
                }
            })
            if (!this.ascending) {
                contracts.reverse().slice(this.indexStart, this.indexEnd)
            }
            return contracts.slice(this.indexStart, this.indexEnd)
        },

        filteredBiddersESG() {
            this.disableButtonsESG()
            this.checkServiceLineidESG()
            let contracts = this.nominatedBiddersESG
            // this.toWhom = (contracts.biddersEmailAddress).toString()

            // Sort by alphabetical order
            contracts = contracts.sort((a, b) => {
                if (this.sortBy == 'alphabetically') {
                    let fa = a.bidderId.toLowerCase(), fb = b.bidderId.toLowerCase()

                    if (fa < fb) {
                        return -1
                    }
                    if (fa > fb) {
                        return 1
                    }
                    return 0
                }
            })
            if (!this.ascending) {
                contracts.reverse().slice(this.indexStart, this.indexEnd)
            }
            return contracts.slice(this.indexStart, this.indexEnd)
        },

        filteredBiddersTechnical() {
            this.disableButtonsTechnical()
            this.checkServiceLineidTechnical()
            let contracts = this.nominatedBiddersTechnical
            // this.toWhom = (contracts.biddersEmailAddress).toString()
            // Sort by alphabetical order
            contracts = contracts.sort((a, b) => {
                if (this.sortBy == 'alphabetically') {
                    let fa = a.bidderId.toLowerCase(), fb = b.bidderId.toLowerCase()

                    if (fa < fb) {
                        return -1
                    }
                    if (fa > fb) {
                        return 1
                    }
                    return 0
                }
            })
            if (!this.ascending) {
                contracts.reverse().slice(this.indexStart, this.indexEnd)
            }
            return contracts.slice(this.indexStart, this.indexEnd)
        },
    },

    methods: {
        async getBiddersbyServiceCategoryLineIdLegal() {
            if (this.selectedServiceCategoryLineLegal === '') {
                return this.errorMessage = 'fill in service category line'
            }
            this.idPreferredBidders = 1
            this.preferredBidders = await biddersService.getBiddersbyServiceCategoryLineId(this.selectedServiceCategoryLineLegal)
            this.showPreferredBidders = !this.showPreferredBidders
        },

        async getBiddersbyServiceCategoryLineIdTechnical() {
            if (this.selectedServiceCategoryLineTechnical == '') {
                return this.errorMessage = 'fill in service category line'
            }
            this.idPreferredBidders = 3
            this.preferredBidders = await biddersService.getBiddersbyServiceCategoryLineId(this.selectedServiceCategoryLineTechnical)
            this.showPreferredBidders = !this.showPreferredBidders
        },

        async getBiddersbyServiceCategoryLineIdESG() {
            if (this.selectedServiceCategoryLineESG == '') {
                return this.errorMessage = 'fill in service category line'
            }
            this.idPreferredBidders = 2
            this.preferredBidders = await biddersService.getBiddersbyServiceCategoryLineId(this.selectedServiceCategoryLineESG)
            this.showPreferredBidders = !this.showPreferredBidders
        },

        async getRequisitionLines() {
            this.getRequisitionLinesbyReqId = await requisitionsServices.getRequisitionLinesbyReqid(this.rfQNo);
            let RequisitionLinesLegal = this.getRequisitionLinesbyReqId.find(o => o.serviceCategoryId === 1)
            this.invitationDateLegal = RequisitionLinesLegal.invitationSentDateTime
            this.expirationDateLegal = RequisitionLinesLegal.expirationDateTime

            let RequisitionLinesTechnical = this.getRequisitionLinesbyReqId.find(o => o.serviceCategoryId === 2)
            this.invitationDateTechnical = RequisitionLinesTechnical.invitationSentDateTime
            this.expirationDateTechnical = RequisitionLinesTechnical.expirationDateTime

            let RequisitionLinesESG = this.getRequisitionLinesbyReqId.find(o => o.serviceCategoryId === 3)
            this.invitationDateESG = RequisitionLinesESG.invitationSentDateTime
            this.expirationDateESG = RequisitionLinesESG.expirationDateTime
        },
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        async checkServiceLineidLegal() {
            if (this.serviceCategoryLineLegal != []) {
                console.log(this.selectedServiceCategoryLineLegal)
                this.checkServiceLineCategoryLegal = (this.serviceCategoryLineLegal.find(o => o.id === this.selectedServiceCategoryLineLegal)).subCategoryName
            }
        },
        
        async checkServiceLineidTechnical() {
            if (this.serviceCategoryLineTechnical.length>0) {
               console.log(this.selectedServiceCategoryLineTechnical)
                this.checkServiceLineCategoryTechnical = (this.serviceCategoryLineTechnical.find(o => o.id === this.selectedServiceCategoryLineTechnical)).subCategoryName
            }
        },
        async checkServiceLineidESG() {
            if (this.serviceCategoryLineESG != []) {
                this.checkServiceLineCategoryESG = (this.serviceCategoryLineESG.find(o => o.id === this.selectedServiceCategoryLineESG)).subCategoryName
                console.log(this.checkServiceLineCategoryESG)
                console.log(this.selectedServiceCategoryLineESG)
            }
        },
        async saveRFQLineLegal() {
            if (this.scopeofWorkLegal.length < 10 || this.selectTimeLegal < 1 || this.selectTimeLegal == undefined || this.selectTimeFrameworkLegal.length < 2 || this.selectedServiceCategoryLineLegal.length < 2) {
                this.errorMessageId = 1
                return this.errorMessage = "Please fill in all fields appropraitely"
            }
            let ps = await requisitionsServices.updateRequisitionLine(this.rfQNo, 1, this.scopeofWorkLegal, this.selectTimeLegal, this.selectTimeFrameworkLegal, this.requestoremail);
            this.generatePDFLegal()
        },

        async saveRFQLineTechnical() {
            if (this.scopeofWorkTechnical.length < 10 || this.selectTimeTechnical < 1 || this.selectTimeTechnical == undefined || this.selectTimeFrameworkTechnical.length < 2 || this.selectedServiceCategoryLineTechnical.length < 2) {
                this.errorMessageId = 3
                return this.errorMessage = "Please fill in all fields appropraitely"
            }
            let ps = await requisitionsServices.updateRequisitionLine(this.rfQNo, 2, this.scopeofWorkTechnical, this.selectTimeTechnical, this.selectTimeFrameworkTechnical, this.requestoremail);
            this.generatePDFTechnical()
        },


        async saveRFQLineESG() {
            if (this.scopeofWorkESG.length < 10 || this.selectTimeESG < 1 || this.selectTimeESG == undefined || this.selectTimeFrameworkESG.length < 2 || this.selectedServiceCategoryLineESG.length < 2) {
                this.errorMessageId = 2
                return this.errorMessage = "Please fill in all fields appropraitely"
            }
            let ps = await requisitionsServices.updateRequisitionLine(this.rfQNo, 3, this.scopeofWorkESG, this.selectTimeESG, this.selectTimeFrameworkESG, this.requestoremail);
            this.generatePDFESG()
        },

        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        async submitFile() {
            this.example = this.$refs.fileInput.files[0];
            this.contractUploadUrl = await uploadRequest.uploadFiles(this.$refs.fileInput.files[0])
            console.log(this.contractUploadUrl)
        },

        async createLineAllBiddersLegal() {
            if (this.selectedServiceCategoryLineLegal.length < 2) {
                this.errorMessageId = 1
                return this.errorMessage = "Please fill in all fields appropraitely"
            }
            requisitionsServices.createRequisitionLineAllBidders(this.rfQNo, this.selectedServiceCategoryLineLegal, this.requestoremail);
            this.selectAllBiddersLegal = false;
            setTimeout(async () => {
                let nominatedBidders = await requisitionsServices.getRequisitionBiddersbyRfqId(this.rfQNo)
                this.nominatedBiddersLegal = nominatedBidders.filter(o => o.serviceCategoryId == 1)
            }, 2000);
        },

        async createLineAllBiddersTechnical() {
            if (this.selectedServiceCategoryLineTechnical.length < 2) {
                this.errorMessageId = 3
                return this.errorMessage = "Please fill in all fields appropraitely"
            }
            requisitionsServices.createRequisitionLineAllBidders(this.rfQNo, this.selectedServiceCategoryLineTechnical, this.requestoremail);
            this.selectAllBiddersTechnical = false;
            setTimeout(async () => {
                let nominatedBidders = await requisitionsServices.getRequisitionBiddersbyRfqId(this.rfQNo)
                this.nominatedBiddersTechnical = nominatedBidders.filter(o => o.serviceCategoryId == 2)
            }, 2000);
        },

        async createLineAllBiddersESG() {
            if (this.selectedServiceCategoryLineESG.length < 2) {
                this.errorMessageId = 2
                return this.errorMessage = "Please fill in all fields appropraitely"
            }
            requisitionsServices.createRequisitionLineAllBidders(this.rfQNo, this.selectedServiceCategoryLineESG, this.requestoremail);
            this.selectAllBiddersESG = false;
            setTimeout(async () => {
                let nominatedBidders = await requisitionsServices.getRequisitionBiddersbyRfqId(this.rfQNo)
                this.nominatedBiddersESG = nominatedBidders.filter(o => o.serviceCategoryId == 3)
            }, 2000);
        },


        async createLineSelectedBiddersESG() {
            if (this.selectedServiceCategoryLineESG.length < 2) {
                return this.errorMessage = "Please fill in all fields appropraitely"
            }
            requisitionsServices.createSelectedLineBidders(this.rfQNo, this.selectedServiceCategoryLineESG, this.requestoremail, this.preferredBiddersSelected.toString());
            this.showPreferredBidders = false;
            setTimeout(async () => {
                let nominatedBidders = await requisitionsServices.getRequisitionBiddersbyRfqId(this.rfQNo)
                this.nominatedBiddersESG = nominatedBidders.filter(o => o.serviceCategoryId == 3)
            }, 2000);
        },

        async createLineSelectedBiddersTechnical() {
            if (this.selectedServiceCategoryLineTechnical.length < 2) {
                return this.errorMessage = "Please fill in all fields appropraitely"
            }
            requisitionsServices.createSelectedLineBidders(this.rfQNo, this.selectedServiceCategoryLineESG, this.requestoremail, this.preferredBiddersSelected.toString());
            this.showPreferredBidders = false;
            setTimeout(async () => {
                let nominatedBidders = await requisitionsServices.getRequisitionBiddersbyRfqId(this.rfQNo)
                this.nominatedBiddersTechnical = nominatedBidders.filter(o => o.serviceCategoryId == 2)
            }, 2000);
        },

        async createLineSelectedBiddersLegal() {
            if (this.selectedServiceCategoryLineLegal.length < 2) {
                return this.errorMessage = "Please fill in all fields appropraitely"
            }
            this.preferredBiddersSelected.toString()
            requisitionsServices.createSelectedLineBidders(this.rfQNo, this.selectedServiceCategoryLineLegal, this.requestoremail, this.preferredBiddersSelected.toString());
            this.showPreferredBidders = false;
            setTimeout(async () => {
                let nominatedBidders = await requisitionsServices.getRequisitionBiddersbyRfqId(this.rfQNo)
                this.nominatedBiddersLegal = nominatedBidders.filter(o => o.serviceCategoryId == 1)
            }, 2000);
        },


        async resetLineBiddersLegal() {
            requisitionsServices.createResetRequisitionLinesBidderStatus(this.rfQNo, this.selectedServiceCategoryLineLegal)
            setTimeout(async () => {
                this.nominatedBiddersLegal = await requisitionsServices.getRequisitionBiddersbyRfqId(this.rfQNo)
            }, 2000);
        },

        async resetLineBiddersESG() {
            requisitionsServices.createResetRequisitionLinesBidderStatus(this.rfQNo, this.selectedServiceCategoryLineESG)
            setTimeout(async () => {
                this.nominatedBiddersESG = await requisitionsServices.getRequisitionBiddersbyRfqId(this.rfQNo)
            }, 2000);
        },

        async resetLineBiddersTechnical() {
            requisitionsServices.createResetRequisitionLinesBidderStatus(this.rfQNo, this.selectedServiceCategoryLineTechnical)
            setTimeout(async () => {
                this.nominatedBiddersTechnical = await requisitionsServices.getRequisitionBiddersbyRfqId(this.rfQNo)
            }, 2000);
        },

        async notifyBiddersLegal() {
            if (this.scopeofWorkLegal.length < 10 || this.selectTimeLegal < 1 || this.selectTimeLegal == undefined || this.selectTimeFrameworkLegal.length < 2 || this.selectedServiceCategoryLineLegal.length < 2) {
                return this.errorMessage = "Please fill in all fields appropraitely"
            }
            if (this.nominatedBiddersLegal.length < 1) {
                return this.errorMessage = "Please select Bidders"
            }
            this.disableFieldGeneral = true
            this.disableFieldLegal = true
            requisitionsServices.sendRFQToNominatedBidders(this.rfQNo, this.selectedServiceCategoryLine, this.requestoremail)
            try {
                emailjs.send("service_beqemfz", "rfq_notification_templat", {
                    rfqNo: this.rfQNo,
                    toWhom: 'samuel.odunuyi@codeware.com.ng',
                }, 'WvCTIZEVzCj8xv4Oy');

            } catch (error) {
                console.log({ error })
            }
            setTimeout(async () => {
                this.getRequisitionLines().then(this.timeFunctionLegal)
                this.nominatedBiddersLegal = await requisitionsServices.getRequisitionBiddersbyRfqId(this.rfQNo)
                this.showPagination = true
            }, 2000);
        },

        async notifyBiddersESG() {
            if (this.scopeofWorkESG.length < 10 || this.selectTimeESG < 1 || this.selectTimeESG == undefined || this.selectTimeFrameworkESG.length < 2 || this.selectedServiceCategoryLineESG.length < 2) {
                return this.errorMessage = "Please fill in all fields appropraitely"
            }
            if (this.nominatedBiddersESG.length < 1) {
                return this.errorMessage = "Please select Bidders"
            }
            requisitionsServices.sendRFQToNominatedBidders(this.rfQNo, this.selectedServiceCategoryLineESG, this.requestoremail)
            try {
                emailjs.send("service_beqemfz", "rfq_notification_templat", {
                    rfqNo: this.rfQNo,
                    toWhom: this.toWhom,
                }, 'WvCTIZEVzCj8xv4Oy');

            } catch (error) {
                console.log({ error })
            }
            this.disableFieldESG = true
            this.disableFieldGeneral = true
            setTimeout(async () => {
                this.getRequisitionLines().then(this.timeFunctionESG)
                this.nominatedBiddersESG = await requisitionsServices.getRequisitionBiddersbyRfqId(this.rfQNo)
                this.showPagination = true
            }, 2000);
        },

        async notifyBiddersTechnical() {
            if (this.scopeofWorkTechnical.length < 10 || this.selectTimeTechnical < 1 || this.selectTimeTechnical == undefined || this.selectTimeFrameworkTechnical.length < 2 || this.selectedServiceCategoryLineTechnical.length < 2) {
                return this.errorMessage = "Please fill in all fields appropraitely"
            }
            if (this.nominatedBiddersTechnical.length < 1) {
                return this.errorMessage = "Please select Bidders"
            }
            requisitionsServices.sendRFQToNominatedBidders(this.rfQNo, this.selectedServiceCategoryLineTechnical, this.requestoremail)
            try {
                emailjs.send("service_beqemfz", "rfq_notification_templat", {
                    rfqNo: this.rfQNo,
                    toWhom: this.toWhom,
                }, 'WvCTIZEVzCj8xv4Oy');

            } catch (error) {
                console.log({ error })
            }
            this.disableFieldGeneral = true
            this.disableFieldTechnical = true
            setTimeout(async () => {
                this.getRequisitionLines().then(this.timeFunctionTechnical)
                this.nominatedBiddersESG = await requisitionsServices.getRequisitionBiddersbyRfqId(this.rfQNo)
                this.showPagination = true
            }, 2000);
        },


        timeFunctionLegal() {
            this.showTimeLegal = true
            this.disabled = true
            const now = new Date(this.invitationDateLegal);
            const check = new Date(this.expirationDateLegal);
            this.timeLegal = check - now
            if (this.timeLegal < 0) {
                this.showBidSubmitandValue = true
            }
            this.errorMessage = ""
        },

        timeFunctionESG() {
            this.showTimeLegal = true
            this.disabled = true
            const now = new Date(this.invitationDateESG);
            const check = new Date(this.expirationDateESG);
            this.timeESG = check - now
            if (this.timeESG < 0) {
                this.showBidSubmitandValue = true
            }
            this.errorMessage = ""
        },

        timeFunctionTechnical() {
            this.showTimeTechnical = true
            this.disabled = true
            const now = new Date(this.invitationDateTechnical);
            const check = new Date(this.expirationDateTechnical);
            this.timeTechnical = check - now
            if (this.timeTechnical < 0) {
                this.showBidSubmitandValue = true
            }
            this.errorMessage = ""
        },

        generatePDFLegal() {
            LegalDDTemplate.exportPdfTemplate(this.companyOverview, this.projectDescription, this.scopeofWorkLegal, this.selectTimeLegal, this.selectTimeFrameworkLegal)
            this.showPreview = true
        },

        generatePDFESG() {
            ESGTemplate.exportPdfTemplate(this.companyOverview, this.projectDescription, this.scopeofWorkESG, this.selectTimeESG, this.selectTimeFrameworkESG)
            this.showPreview = true
        },

        generatePDFTechnical() {
            TechnicalTemplate.exportPdfTemplate(this.companyOverview, this.projectDescription, this.scopeofWorkTechnical, this.selectTimeTechnical, this.selectTimeFrameworkTechnical)
            this.showPreview = true
        },

        disableButtonsLegal() {
            if (this.nominatedBiddersLegal.length >= 1) {
                this.disablePreferredBidderBtnLegal = true
                this.disableReviewQuotesLegal = false
            }
            else {
                this.disablePreferredBidderBtnLegal = false
                this.disableReviewQuotesLegal = true
            }
        },

        disableButtonsESG() {
            if (this.nominatedBiddersESG.length >= 1) {
                this.disablePreferredBidderBtnESG = true
                this.disableReviewQuotesESG = false
            }
            else {
                this.disablePreferredBidderBtnESG = false
                this.disableReviewQuotesESG = true
            }
        },

        disableButtonsTechnical() {
            if (this.nominatedBiddersTechnical.length >= 1) {
                this.disablePreferredBidderBtnTechnical = true
                this.disableReviewQuotesTechical = false

            }
            else {
                this.disablePreferredBidderBtnTechnical = false
                this.disableReviewQuotesTechical = true
            }
        },

        async reviewQuotes(id) {
            this.showReviewQuotes = true
            this.id = id
            this.filteredbidderResponse
        }
    }
}
</script>


<style lang="scss">
@import "../../library/accordion/accordion-styles.scss";

.fullpage2 {
    width: 100%;
    padding-top: 200px;
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

input {
    width: 100vw;
}

input:disabled {
    background: #dddddd;
}

textarea:disabled {
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

.topButton_,
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
    height: 20px;
    border-radius: 10px;
    font-weight: 300;
    font-size: 11px;
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

button:disabled,
button:disabled:hover {
    background-color: #afafaf;
    color: #000000;
    border: none;
    cursor: context-menu;
}

.general_ {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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

.textarea2_ {
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
    width: 47vw;
    box-sizing: border-box;
    align-items: center;
    padding: 10px;
    gap: 71px;
    resize: none;
    height: 145px;
    border: 0.5px solid #808080;
    border-radius: 5px;
}


.rfqstatus_,
.rfqstatus2_,
.rfqstatus3_ {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 15px 8px 8px;
    width: 250px;
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

.generalInput_ {
    margin-top: 20px;
}

.generalInput_ textarea {
    width: 27.3vw;
}

.general2_ {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    width: 100%;

}

button .legal_ {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 10px 0px 10px 0px;
}

.checkboxDiv {
    border: 1px solid black;
    height: 250px;
    overflow-y: scroll;
    padding: 10px;
}

.bidderlist6_ {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
}

.legalTop_ {
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 2fr 1.5fr;
    grid-gap: 10px;
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
    font-size: 15px;
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
.modal5,
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

.modal5 {
    width: 840px;
    height: 612.81px;
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
    text-align: center;
    color: #282828;
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
    gap: 5px;
    margin-top: 5px;
    width: 410px;
    height: 255px;
}

.bidderlist_ label {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    text-align: center;
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

.modals4_,
.modals5_ {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    width: 553.49px;
    border-radius: 10px;
}

.modals4_ {
    height: 410px;
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


.hello ul {
    font-size: 14px;
    margin-left: 1rem;
}

.hello li {
    margin: 0 10px;
}

.hello {
    margin: auto 30px;
    text-align: justify;
    color: black;
}

.hello p {
    font-size: 14px;
}

.hello b {
    font-size: 15px;
}


@media (max-width: 1251px) {
    .textarea3_ {
        width: 100%;
    }
}
</style>