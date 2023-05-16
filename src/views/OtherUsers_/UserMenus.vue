<script setup>
import { ref } from "vue";
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
  <div v-if="showResults" class="overlay">
    <div class="modal animated fadeInRight">
      <div> <img src="../.././assets/images/bell.svg" alt=""> </div>
      <div class="notetext">
        <h2>New RFQ!</h2>
        <div></div>
        <p>Mark John just created a new RFQ.</p>
      </div>
      <div class="options" :style="{ cursor: 'pointer' }">
        <h3>See details</h3>
        <p @click="showResults = false">Hide</p>
      </div>
    </div>
  </div>

  <PageHeader @selectOption="onOptionSelected"></PageHeader>

  <body>
    <WelcomeHead></WelcomeHead>
    <SettingsHeader></SettingsHeader>
    <div class="MainHead">
      <div class="topItems2">
        <div class="tabmenu">
          <label for="">Roles</label>
          <select v-model="selectedType">
            <option value="" disabled selected hidden>Select</option>
            <option value="Basic">Basic</option>
            <option value="Finance Admin">Finance Admin</option>
            <option value="Procurement Admin">Procurement Admin</option>
            <option value="IT Admin">IT Admin</option>
            <option value="Management">Management</option>
            <option value="Bidder">Bidder</option>
          </select>
        </div>
      </div>
    </div>
    <div class="purchdetails">
      <div class="Rfq">

        <div class="rfqtableHeader">
          <div class="tableHeader">
            <p class="tableHeadertext">Menus</p>
            <img src="../../assets/images/sorticon.svg" class="sorticon" v-on:click="ascending = !ascending" />
          </div>
          <div class="tableHeader">
            <p class="tableHeadertext">Read Permission</p>
            <img src="../../assets/images/sorticon.svg" class="sorticon" v-on:click="ascending = !ascending" />
          </div>
          <div class="tableHeader">
            <p class="tableHeadertext">Insert Permission</p>
            <img src="../../assets/images/sorticon.svg" class="sorticon" v-on:click="ascending = !ascending" />
          </div>
          <div class="tableHeader">
            <p class="tableHeadertext">Modify Permission</p>
            <img src="../../assets/images/sorticon.svg" class="sorticon" v-on:click="ascending = !ascending" />
          </div>
          <div class="tableHeader">
            <p class="tableHeadertext">Delete Permission</p>
            <img src="../../assets/images/sorticon.svg" class="sorticon" v-on:click="ascending = !ascending" />
          </div>
        </div>

        <div class="rfqtableHeader" v-for="userPermissions in filteredUsers" :key="userPermissions.pages">
          <p class="tablerowtext" :style="{ cursor: 'pointer' }">{{ userPermissions.pages }}</p>
          <p class="tablerowtext" :style="{ cursor: 'pointer' }">{{ userPermissions.readPermission }}</p>
          <p class="tablerowtext" :style="{ cursor: 'pointer' }">{{ userPermissions.insertPermission }}</p>
          <p class="tablerowtext" :style="{ cursor: 'pointer' }">{{ userPermissions.modifyPermission }}</p>
          <p class="tablerowtext" :style="{ cursor: 'pointer' }">{{ userPermissions.deletePermission }}</p>
        </div>
      </div>
    </div>

  </body>
</template>
  
  
<script>
import { ref } from "vue";
import WelcomeHead from '../../components/PageMenuHeader.vue';
import PageHeader from '../../components/TopHeader.vue'
import SettingsHeader from "../../components/SettingsHeader.vue";
export default {
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
  components: {
    WelcomeHead, PageHeader, SettingsHeader
  },
  data() {
    return {
      selectedType: "",
      ascending: true,
      completeValue: false,
      sortBy: 'alphabetically',
      pageNumber: 0,  // default to page 0
      basicPermissions: [],
      basicPermissions: [
        { "pages": "Request for Quotes", "readPermission": "Yes", "insertPermission": "No", "modifyPermission": "No", "deletePermission": "No" },
        { "pages": "Purchase Order", "readPermission": "Yes", "insertPermission": "No", "modifyPermission": "No", "deletePermission": "No" },
        { "pages": "Waybill", "readPermission": "Yes", "insertPermission": "No", "modifyPermission": "No", "deletePermission": "No" },
        { "pages": "Invoice", "readPermission": "Yes", "insertPermission": "No", "modifyPermission": "indirect", "deletePermission": "No" },
        { "pages": "Issue Resolution", "readPermission": "Yes", "insertPermission": "Indirect", "modifyPermission": "No", "deletePermission": "No" },
        { "pages": "Payment receipt", "readPermission": "Yes", "insertPermission": "No", "modifyPermission": "indirect", "deletePermission": "No" },
      ],
      approverPermissions: [
        { "pages": "Request for Quotes", "readPermission": "Yes", "insertPermission": "No", "modifyPermission": "No", "deletePermission": "No" },
        { "pages": "Purchase Order", "readPermission": "Yes", "insertPermission": "No", "modifyPermission": "No", "deletePermission": "No" },
        { "pages": "Waybill", "readPermission": "Yes", "insertPermission": "No", "modifyPermission": "No", "deletePermission": "No" },
        { "pages": "Invoice", "readPermission": "Yes", "insertPermission": "No", "modifyPermission": "indirect", "deletePermission": "No" },
        { "pages": "Issue Resolution", "readPermission": "Yes", "insertPermission": "Indirect", "modifyPermission": "No", "deletePermission": "No" },
        { "pages": "Payment receipt", "readPermission": "Yes", "insertPermission": "No", "modifyPermission": "indirect", "deletePermission": "No" },
      ],
    };
  },
  computed: {
    filteredUsers() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      let users = this.basicPermissions

      // Sort by alphabetical order
      users = users.sort((a, b) => {
        if (this.sortBy == 'alphabetically') {
          let fa = a.pages.toLowerCase(), fb = b.pages.toLowerCase()

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
        users.reverse().slice(start, end)
      }

      return users.slice(start, end)
    },
  },

};
</script>
  
  
<style scoped>
.MainHead {
  width: 100%;

}

.topItems2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  width: 100%;
}

.tabmenu {
  width: 100%;
  margin-top: 1px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 45px;
}

.btn {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

select {
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
  width: 270px;
  height: 40px;
  border-radius: 8px;
  font-family: Roboto;
  font-size: 12px;
}

.btns {
  box-sizing: border-box;
  display: flex;
  width: 233px;
  height: 40px;
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
  padding: 20px 0px 0px 0px;
  gap: 20px;
  width: 100%;
  background: #FFFFFF;
  border-radius: 10px;
}

.sorticon:hover {
  cursor: pointer;
}

.Rfq {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
}

.tableHeader{
  display: flex;
  flex-direction: row;
}

.rfqtableHeader {
  padding: 15px 20px;
  width: 100%;
  background: #FFFFFF;
  align-items: center;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 1.3fr;
  grid-gap: 20px;
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

.tablerowtext {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: #000000;
  text-align: left;

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

.modal img {
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


@media (min-width: 1024px) {
  .Home {
    min-height: 100vh;
    display: flex;
    align-items: center;

  }
}</style>