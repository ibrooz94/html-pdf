<script setup>
import { RouterLink } from 'vue-router';
// const emit = defineEmits(["selectedButton"])
// const emitSelectedButton = (isCorrects) => {
//   emit("selectedButton", isCorrects)
// }
</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Aladin">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
  <div class="MainHead">
    <div class="WelcomeNote">
      <h2><b>Hi John, </b>Welcome to Sapphire Procure</h2>
    </div>

    <div class="topItems">
    <!-- <div class="topItems"> -->
      <div class="tabmenu">
        <RouterLink to="/" active-class="active" class="inactive">Dashboard</RouterLink>
        <RouterLink to="/biddersList" active-class="active" class="inactive">Other Page</RouterLink>
      </div>
    </div>




    <!-- <div class="topItems" v-if="showBasicMenu"> -->
    

    <!-- <div class="topItems" v-if="userRoleId > 7"> -->
  </div>
</template>

<script>
import authenticationService from '../services/authenticationService';
import { useCounterStore } from "../store/piniaStore"
import pinia from "../store/store";


export default {
  name: 'PageMenuHeader',
  data() {
    return {
      stores: useCounterStore(pinia),
      account: undefined,
      firstName: undefined,
      userRoleId: '',
      showBidderMenu: false,
      showBasicMenu: false,
      showFinanceAdminMenu: false,
      showProcurementAdminMenu: false,
      showITAdminMenu: false,
      showManagementMenu: false,
      text: 'myrecords',
    };
  },

  async created() {
    this.userRoleId = this.stores.signedInUserRole
    if (this.userRoleId == 'IT Admin') {
      this.showITAdminMenu = true
    }
    else if (this.userRoleId == 'Procurement Admin') {
      this.showProcurementAdminMenu = true
    }
    else if (this.userRoleId == 'Finance Admin') {
      this.showFinanceAdminMenu = true
    }
    else if (this.userRoleId == 'Basic') {
      this.showBasicMenu = true
    }
    else if (this.userRoleId == 'Management') {
      this.showManagementMenu = true
    }
    else if (this.userRoleId == 'Bidder') {
      this.showBidderMenu = true
    }
  },

  // mounted() {
  //   const accounts = authenticationService.msalInstance.getAllAccounts();
  //   this.account = accounts[0];
  //   this.firstName = this.account.name
  //   this.firstName = this.firstName.substring(0, this.firstName.indexOf(' '));
  // },
};

</script>

<style scoped>
.MainHead {
  width: 100%;
}

.rfqbtn {
  border: none;
  width: 80px;
  height: 27px;
  border-radius: 6px;
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  background-color: #ffffff;
  color: black;
  line-height: 14px;
}

.rfqbtn2 {
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


.rfqbtn:active {
  background: linear-gradient(90deg, #227CBF 0%, #47B65C 100%);
  color: white;
}

.rfqbtn:hover {
  background: linear-gradient(90deg, #227CBF 0%, #47B65C 100%);
  color: white;
}

.WelcomeNote {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0px;
  gap: 10px;
  height: 24px;
  flex: none;
  order: 0;
  flex-grow: 0
}

.WelcomeNote b {
  height: 24px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.inactive {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  font-family: Roboto;
  text-decoration: none;
  color: #808080;
}

.active {
  color: #227CBF;
  border-bottom: 1.5px solid #227CBF;
  padding-bottom: 14px;
  cursor: default;
}


.WelcomeNote h2 {
  height: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #808080;
}

.tabmenu {
  margin-top: 20px;
  width: 1045px;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 30px;

}

.topItems {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 44px;
  border-bottom: 0.5px solid #808080;
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



.rfqbtn:hover,
.rfqbtn2:hover {
  background: linear-gradient(90deg, #47B65C 0%, #227CBF 100%);
  transition: 0.7s;
}
</style>
