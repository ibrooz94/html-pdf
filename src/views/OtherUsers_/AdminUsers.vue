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
  <div v-if="showNewUserModal" id="overlay" class="overlay" @click="showNewUserModal = false">
    <div class="modals" @click.stop>
      <div class="userdetailsheader">
        <p class="userdetailstext">User Details</p>
        <p @click="showNewUserModal = false" :style="{ cursor: 'pointer' }">X</p>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="Line">
          <div class="formDetails">
            <label>First Name</label>
            <input placeholder="First name" type="text" v-model="firstName" />
          </div>
          <div class="formDetails">
            <label>Last Name</label>
            <input placeholder="Last name" type="text" v-model="LastName" />
          </div>
          <div class="formDetails">
            <label>Job Title</label>
            <input placeholder="Job Title" type="text" v-model="jobTitle" />
          </div>
        </div>

        <div class="Line">
          <div class="formDetails">
            <label>Email Address</label>
            <input placeholder="Email Address" type="email" required v-model="emailAddress" :disabled="disabled" />
          </div>
          <div class="formDetails">
            <label>Phone Number</label>
            <input placeholder="Phone Number" type="number" v-model="phoneNumber" />
          </div>
          <div class="formDetails">
            <label>User Role</label>
            <select required v-model="userRoleId">
              <option value="" disabled selected>User Role</option>
              <option value=5>Basic</option>
              <option value=4>Finance Admin</option>
              <option value=3>Procurement Admin</option>
              <option value=2>IT Admin</option>
              <option value=6>Management</option>
              <option value=7>Bidder</option>
            </select>
          </div>

        </div>

        <div class="Line">
          <div class="formDetails">
            <label>Department</label>
            <select required v-model="departmentId" :disabled="disabled">
              <option value="" disabled selected>Select Department</option>
              <option :value=departmentList.id v-for="departmentList in departments">
                {{ departmentList.departmentDescription }}</option>
            </select>
          </div>

          <div class="formDetails">
            <label>Business Unit</label>
            <select required v-model="businessUnitId" :disabled="disabled">
              <option value="" disabled selected>Select Business Unit</option>
              <option :value=businessUnitList.id v-for="businessUnitList in businessUnits">
                {{ businessUnitList.businessUnitDescription }}</option>
            </select>
          </div>

        </div>

        <div class="Line">
          <div class="address">
            <label>Address</label>
            <input placeholder="Address" type="text" v-model="address" />
          </div>
        </div>
        <b style="margin-left: 15px;">{{ errorMessage }}</b>
        <div class="newUser" >
        <v-btn :loading="loading" class="flex-grow-1" height="48" rounded="xl" 
        v-on:click.prevent="onSubmitEdit" v-if='onEdits'>
          Submit
        </v-btn>
        <v-btn  :loading="loading" class="flex-grow-1" height="48" rounded="xl" variant="tonal"
        v-on:click.prevent="onSubmit" v-else>
          Submit
        </v-btn>
      </div>

      </form>
    </div>
  </div>

  <div v-if="showResults" class="overlay">
    <div class="modal2 animated fadeInRight">
      <div> <img src="../.././assets/images/bell.svg" alt=""> </div>
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

  <PageHeader @selectOption="onOptionSelected"></PageHeader>

  <body>

    <WelcomeHead></WelcomeHead>
    <div class="settingheader">
      <SettingsHeader></SettingsHeader>
      <button v-on:click="onNew" class="rfqbtn" v-if="$route.path == '/settings'">
        Add new User
      </button>
    </div>
    <div class="purchdetails">
      <div class="activityBoxPurch">
        <input type="text" v-model="searchValue" placeholder="Search..." />
        <button class="searchbtn"> Search </button>
      </div>
      <div class="Rfq">

        <div class="rfqtableHeader">
          <div class="tableHeader">
            <p class="tableHeadertext">Name</p>
            <img src="../../assets/images/sorticon.svg" class="sorticon" v-on:click="ascending = !ascending" />
          </div>
          <div class="tableHeader">
            <p class="tableHeadertext">Email</p>
            <img src="../../assets/images/sorticon.svg" class="sorticon" v-on:click="ascending = !ascending" />
          </div>
          <div class="tableHeader">
            <p class="tableHeadertext">Role</p>
            <img src="../../assets/images/sorticon.svg" class="sorticon" v-on:click="ascending = !ascending" />
          </div>
          <div class="tableHeader">
            <p class="tableHeadertext">Type</p>
            <img src="../../assets/images/sorticon.svg" class="sorticon" v-on:click="ascending = !ascending" />
          </div>
        </div>

        <div v-for="user in filteredUsers" :key="user.userId" class="rfqtableHeader" :style="{ cursor: 'pointer' }"
          @click="editAdmin(user.userFullName, user.userId, user.jobTitle, user.phoneNumber, user.roleName, user.address, user.departmentId, user.businessUnitId)"
          :onClick="onEdit">
          <p class="tablerowtext">{{ user.userFullName }}</p>
          <p class="tablerowtext">{{ user.userId }}</p>
          <p class="tablerowtext">{{ user.roleName }}</p>
          <p class="tablerowtext">{{ user.userType }}</p>
        </div>

        <div class="paginationButtons">
          <button @click="prevPage" :disabled="pageNumber == 1" class="paginationButton">
            Previous
          </button>
          <p> ---{{ pageNumber }}---</p>
          <button @click="nextPage()" class="paginationButton">
            Next
          </button>
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
import administrationsService from "../../services/administrationsService";
import settingsService from "../../services/settingsService";

export default {
  props: {
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
      ascending: true,
      completeValue: false,
      sortBy: 'alphabetically',
      pageNumber: 1,  // default to page 0
      adminUsers: [],
      disabled: false,
      firstName: "",
      LastName: "",
      FullName: "",
      jobTitle: "",
      emailAddress: "",
      departments: [],
      businessUnits: [],
      phoneNumber: "",
      errorMessage: '',
      loading: false,
      userRoleId: "",
      departmentId: undefined,
      businessUnitId: undefined,
      address: "",
      showResults: false,
      onEdits: false,
      showNewUserModal: false,
      searchValue: ''
    };
  },
  async created() {
    this.adminUsers = await administrationsService.getUserRoles();
    this.departments = await settingsService.getDepartments()
    this.businessUnits = await settingsService.getBusinessUnits()

  },

  computed: {
    pageCount() {
      let l = this.adminUsers.length,
        s = this.size;
      return Math.ceil(l / s);
    },

    indexStart() {
      return (this.pageNumber - 1) * this.size;
    },
    indexEnd() {
      return this.indexStart + this.size;
    },

    filteredUsers() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      let users = this.adminUsers


      if (this.searchValue != '' && this.searchValue) {
        users = users.filter((item) => {
          return item.userFullName
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
            item.userId.toLowerCase().includes(this.searchValue.toLowerCase())
        })
      }

      // Sort by alphabetical order
      users = users.sort((a, b) => {
        7
        if (this.sortBy == 'alphabetically') {
          let fa = a.userFullName.toLowerCase(), fb = b.userFullName.toLowerCase()

          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0

        }
      })
      // Show sorted array in descending or ascending order
      if (!this.ascending) {
        users.slice(this.indexStart, this.indexEnd)
      }

      return users.slice(this.indexStart, this.indexEnd)
    },
  },

  methods: {

    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },

    editAdmin(userFullName, userId, jobTitles, phoneNumbers, roles, addressUser, departments, businessUnits) {
      this.firstName = userFullName; this.emailAddress = userId, this.jobTitle = jobTitles,
        this.phoneNumber = phoneNumbers, this.userRoleId = roles, this.address = addressUser
      this.departmentId = departments, this.businessUnitId = businessUnits
      this.showNewUserModal = true
    },

    onEdit() {
      this.onEdits = true;
      this.disabled = true;
    },

    onNew() {
      this.showNewUserModal = true;
      this.disabled = false;
      this.firstName = "",
        this.LastName = "",
        this.FullName = "",
        this.jobTitle = "",
        this.emailAddress = "",
        this.phoneNumber = "",
        this.userRoleId = "",
        this.departmentId = undefined
      this.businessUnitId = undefined
      this.onEdits = false;

    },

    async onSubmit() {
      this.FullName = this.firstName.concat(' ', this.LastName)
      if (this.emailAddress == '', this.FullName == '', this.userRoleId == '', this.jobTitle == '', this.phoneNumber = '', this.address = '', this.departmentId == undefined, this.businessUnitId == undefined) {
        return this.errorMessage = "Please fill in all fields appropraitely"
      }
      await administrationsService.createUsers(this.emailAddress, this.FullName, this.userRoleId, this.jobTitle, this.phoneNumber, this.address, this.departmentId, this.businessUnitId)
      this.showNewUserModal = false;
      setTimeout(async () => {
        this.adminUsers = await administrationsService.getUserRoles()
      }, 2000);
    },

    async onSubmitEdit() {
      this.FullName = this.firstName.concat(' ', this.LastName)
      this.loading = true
      if (this.emailAddress == '', this.FullName == '', this.userRoleId == '', this.jobTitle == '', this.phoneNumber = '', this.address = '', this.departmentId == undefined, this.businessUnitId == undefined) {
        return this.errorMessage = "Please fill in all fields appropraitely"
      }
      await administrationsService.editUser(this.emailAddress, this.FullName, this.userRoleId, this.jobTitle, this.phoneNumber, this.address, this.departmentId, this.businessUnitId)

      setTimeout(async () => {
        this.loading = false
        this.showNewUserModal = false;
        this.adminUsers = await administrationsService.getUserRoles()
      }, 3000);
    }
  }

};
</script>
  
  
<style scoped>

.v-btn{
  background: linear-gradient(90deg, #227CBF 0%, #47B65C 100%);
  color: #FFFFFF;
  padding: 10px 60px 10px 60px;

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

.purchdetails {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px 20px 30px;
  width: 100%;
  border-radius: 10px;
  background: #ffffff;

}

.sorticon:hover {
  cursor: pointer;
}

.settingheader {
  display: flex;
  flex-direction: row;
  width: 100%;
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

.rfqbtn:hover,
.searchbtn:hover {
  background: linear-gradient(90deg, #47B65C 0%, #227CBF 100%);
  transition: 0.7s;
}

.Rfq {
  display: flex;
  flex-direction: column;
  padding: 20px 0px 0px 0px;
  gap: 30px;
  width: 100%;

}

.rfqtableHeader {
  width: 100%;
  background: #FFFFFF;
  display: grid;
  grid-template-columns: 1.5fr 2fr 1.5fr 1fr;
  grid-gap: 20px;
}

.tableHeader {
  display: flex;
  flex-direction: row;
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
  width: 100%;
  font-size: 16px;
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

.modals {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  position: relative;
  width: 900px;
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
  width: 900px;
  height: 44px;
  margin-top: -30px;
  background: #F7F7F7;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #E8E8E8;
  border-radius: 5px 5px 0px 0px;
  font-size: 20px;
}

.userdetailstext {
  font-family: Roboto;
  font-style: normal;
  font-weight: 600;
  color: #000000;
}

.Line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px 20px;
  width: 900px;
  height: 60px;
  margin-top: 25px;
}

input[type="email"]:disabled {
  background: #dddddd;
}

select:disabled {
  background: #dddddd;
}

.newUser {
  margin: 10px 0px 0px 15px;
}

.formDetails,
.address {
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

.activityBoxPurch input {
  align-items: center;
  border: 1px #000000 solid;
  padding: 10px 20px;
  gap: 21px;
  width: 350px;
  height: 40px;
}


.activityBoxPurch {
  width: 100%;
  justify-content: flex-end;
  display: flex;
  flex-direction: row;
  height: 40px;
  gap: 10px;
}

.formDetails input {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 10px 20px 10px 10px;
  gap: 71px;
  width: 270px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #E4E4E7;
  border-radius: 5px;
}

.address input {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px 10px 10px;
  gap: 71px;
  width: 860px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #E4E4E7;
  border-radius: 5px;
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