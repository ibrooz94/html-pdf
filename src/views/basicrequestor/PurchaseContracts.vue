<script setup>
import { ref } from "vue";
const showFilter = ref(false)
const showResults =ref(false);

const toggleFilter = () => {
  showFilter.value = !showFilter.value;
}
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
    <div class="purchdetails">
      <div class="activityStatusPurch">
        <h2 class="activityHeaderPurch">
          My Purchase Contracts
        </h2>
        <div class="activityBoxPurch">
          <input type="text" v-model="searchValue" placeholder="Search Contracts..." />
          <button class="searchbtn"> Search </button>
          <img src="../../assets/images/Frame.svg" class="filter" @click="toggleFilter">
        </div>
      </div>
      <div class="filerdetails" v-if="showFilter">
        <label for="">Filter Criteria</label>
        <select v-model="selectedType">
          <option value="" disabled selected hidden>Criteria</option>
          <option value="contractNo">Contract No</option>
          <option value="date">Date</option>
        </select>
        <label for="" v-if="checkSelectionDate()">Date Options</label>
        <select v-model="selectedDateType" v-if="checkSelectionDate()">
          <option value="" disabled selected hidden>Date Option</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="thisweek">This week</option>
          <option value="thismonth">This Month</option>
          <option value="choosedate">Choose dates</option>
        </select>
        <div v-if="checkSelectionDateOption()" class="criteria">
          <label for="">Start Date: </label>
          <input type="date" v-model="startDate">
          <label for="">End Date: </label>
          <input type="date" v-model="endDate">
        </div>
        <div v-if="checkSelectionContractNo()" class="criteria">
          <label for="">From: </label>
          <input type="text" v-model="contractSearchValueTo">
          <label for="">To: </label>
          <input type="text" v-model="contractSearchValueFro">
          <p v-if='completeValue'>Please fill in both fields to filter</p>
        </div>
      </div>



      <div class="Rfq">

        <div class="rfqtableHeader">
          <div class="tableHeader">
            <p class="tableHeadertext">Contract No</p>
            <img src="../../assets/images/sorticon.svg" class="sorticon" v-on:click="ascending = !ascending" />
          </div>
          <div class="tableHeader">
            <p class="tableHeadertext">Description</p>
            <img src="../../assets/images/sorticon.svg" class="sorticon" v-on:click="ascending = !ascending" />
          </div>
          <div class="tableHeader">
            <p class="tableHeadertext">Contract Date & Time</p>
            <img src="../../assets/images/sorticon.svg" class="sorticon" v-on:click="ascending = !ascending" />
          </div>
        </div>

        <div class="rfqtableHeader" v-for="contract in filteredContracts" :key="contract.PONums"
          @click="$router.push('/purchcontractdet')">
          <p class="tablerowtext" :style="{ cursor: 'pointer' }">{{ contract.PONums }}</p>
          <p class="tablerowtext" :style="{ cursor: 'pointer' }">{{ contract.description }}</p>
          <p class="tablerowtext" :style="{ cursor: 'pointer' }">{{ contract.contractdatetime }}</p>
        </div>
        <p class="tablerowtext1"
          v-if="searchValue && !filteredContracts.length || contractSearchValueTo && contractSearchValueFro && !filteredContracts.length">
          No results found!</p>
        <div class="paginationicons" v-if="filteredContracts.length">
          <img v-if="pageNumber !== 0 && pageCount>1" src="../../assets/images/arrowsmdown-11.svg"
            @click="prevPage" :style="{ transform: 'rotate(90deg)'}" />
          <img v-else="pageNumber >! pageCount -1" src="../../assets/images/arrowsmdown-11.svg" @click="nextPage"
            :style="{ transform: 'rotate(270deg)' }" />
        </div>
      </div>
    </div>

  </body>
</template>


<script>
import { ref } from "vue";
import WelcomeHead from '../../components/BasicRequester/PageMenuHeader.vue';
import PageHeader from '../../components/TopHeader.vue'

export default {
  components: {
    WelcomeHead, PageHeader
  },
  props: {
    listData: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data() {
    return {
      ascending: true,
      completeValue: false,
      pageNumber: 0,  // default to page 0
      sortBy: 'alphabetically',
      searchValue: '',
      selectedType: '',
      selectedDateType: '',
      currentDate: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
      startDate: this.localizeDate(this.startDate),
      endDate: this.localizeDate(this.endDate),
      contractSearchValueTo: "",
      contractSearchValueFro: "",
      maxDateValue: null,
      purchcontracts: [
        { "PONums": "PO2568", "description": "Building Maintenance", "contractdatetime": "2023-11-15" },
        { "PONums": "PO2569", "description": "Building Maintenance", "contractdatetime": "2022-03-31" },
        { "PONums": "PO2570", "description": "IT Infrastructure", "contractdatetime": "2022-08-12" },
        { "PONums": "PO2571", "description": "Building Maintenance", "contractdatetime": "2023-03-02" },
        { "PONums": "PO2572", "description": "Building Maintenance", "contractdatetime": "2010-02-30" },
        { "PONums": "PO2573", "description": "IT Infrastructure", "contractdatetime": "2022-04-18" },
        { "PONums": "PO2574", "description": "IT Infrastructure", "contractdatetime": "2021-05-19" },
        { "PONums": "PO2575", "description": "IT Infrastructure", "contractdatetime": "2023-03-29" },
        { "PONums": "PO2576", "description": "Building Maintenance", "contractdatetime": "2022-03-07" },
        { "PONums": "PO2577", "description": "IT Infrastructure", "contractdatetime": "2023-02-14" },
        { "PONums": "PO2578", "description": "IT Infrastructure", "contractdatetime": "2021-10-24" },
        { "PONums": "PO2579", "description": "Building Maintenance", "contractdatetime": "2023-03-28" },
      ]
    };
  },
  computed: {

    pageCount() {
      let l = this.purchcontracts.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    filteredContracts() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      let contracts = this.purchcontracts

      // Process search input
      if (this.searchValue != '' && this.searchValue) {
        contracts = contracts.filter((item) => {
          return item.PONums
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
            item.description.toLowerCase().includes(this.searchValue.toLowerCase())
        })
      }

      //filter 
      if (this.startDate && this.endDate) {
        contracts = this.purchcontracts.filter((item) => {
          return this.startDate <= item.contractdatetime && item.contractdatetime <= this.endDate;
        })
      }

      if (this.contractSearchValueTo && this.contractSearchValueFro) {
        contracts = this.purchcontracts.filter((item) => {
          return this.contractSearchValueTo.toUpperCase() <= item.PONums && item.PONums <= this.contractSearchValueFro.toUpperCase();
        })
      }
      else if (!this.contractSearchValueTo && this.contractSearchValueFro || this.contractSearchValueTo && !this.contractSearchValueFro) {
        this.completeValue = true;
        return contracts = this.purchcontracts
      }

      if (this.startDate && !this.endDate) {
        contracts = this.purchcontracts.filter((item) => {
          return this.startDate <= item.contractdatetime
        })
      }
      if (!this.startDate && this.endDate) {
        contracts = this.purchcontracts.filter((item) => {
          return item.contractdatetime <= this.endDate;
        })
      }

      // Sort by alphabetical order
      contracts = contracts.sort((a, b) => {
        if (this.sortBy == 'alphabetically') {
          let fa = a.contractdatetime.toLowerCase(), fb = b.contractdatetime.toLowerCase()

          if (fa < fb) {
            return 1
          }
          if (fa > fb) {
            return -1
          }
          return 0

        }
      })

      // Show sorted array in descending or ascending order
      if (!this.ascending) {
        contracts.reverse().slice(start, end)
      }

      return contracts.slice(start, end)
    },
  },

  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    localizeDate(date) {
      // Date picker uses ISO format (yyyy-mm-dd), which is UTC. The data
      // contains locale specific date strings (mm/dd/yyyy), which `Date`
      // parses with local time-zone offset instead of UTC. Normalize the
      // ISO date so we're comparing local times.
      if (!date || !date.includes('-')) return date
      const [yyyy, mm, dd] = date.split('-')
      return new Date(`${mm}/${dd}/${yyyy}`)
    },
    formatDate(date) {
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(date))
    },
    checkSelectionDate() {
      if (this.selectedType == "date") {
        return true
      }
      return false

    },
    checkSelectionContractNo() {
      if (this.selectedType == "contractNo") {
        return true
      }
      return false

    },




    checkSelectionDateOption() {
      if (this.selectedDateType == "choosedate" && this.selectedType == "date") {
        this.startDate = "";
        return true
      }
      else if (this.selectedDateType == "today") {
        var date = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        this.startDate = date;
        this.endDate = date;
      }
      else if (this.selectedDateType == "yesterday") {
        var date = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        var yesterday = new Date(date);
        yesterday.setDate(yesterday.getDate() - 1)
        var yesterdayDate = yesterday.toJSON().slice(0, 10).replace(/-/g, '-');
        this.startDate = yesterdayDate;
        this.endDate = yesterdayDate;
      }

      else if (this.selectedDateType == "thisweek") {
        var date = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        var thisweek = new Date(date);
        thisweek.setDate(thisweek.getDate() - 7)
        var thisWeekDate = thisweek.toJSON().slice(0, 10).replace(/-/g, '-');
        this.startDate = thisWeekDate;
        this.endDate = date;
      }

      else if (this.selectedDateType == "thismonth") {
        var date = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        var thismonth = new Date(date);
        thismonth.setDate(thismonth.getDate() - 30)
        var thismonthDate = thismonth.toJSON().slice(0, 10).replace(/-/g, '-');
        this.startDate = thismonthDate;
        this.endDate = date;
      }
      return false

    }
  }

};
</script>


<style scoped>
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

.purchdetails {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px 0px;
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


.activityHeaderPurch {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #47B65C;
}

.activityBoxPurch input {
  align-items: center;
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
  align-items: center;
  padding: 10px 20px;
  gap: 21px;
  margin: 0px 50px 0px 20px;
  width: 150px;
}

.tableHeader {
  display: flex;
  flex-direction: row;
  width: 19.5%;
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
  height: 40px;
  background: linear-gradient(90deg, #227CBF 0%, #47B65C 100%);
  border-radius: 50px;
}

.rfqbtn:hover {
  background: linear-gradient(90deg, #47B65C 0%, #227CBF 100%);
  transition: 0.7s;
}

.filter {
  cursor: pointer;
}

.Rfq {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px 0px;
  gap: 20px;
  width: 100%;
}

.rfqtableHeader {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px 20px;
  gap: 250px;
  width: 100%;
  height: 30px;
  background: #FFFFFF;
  align-items: center;
}

.tableHeadertext {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  margin-right: 5px;
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

.rowStatus {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  height: 25px;
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