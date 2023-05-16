<script setup>
// import { defineProps } from 'vue';
const emit = defineEmits(["selectOption"])

const emitSelectedOption = (isCorrect) => {
  emit("selectOption", isCorrect)
}
// const { modalValue } = defineProps(['modalValue'])
</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800&display=swap" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Aladin:wght@400&display=swap" />
  <div class="MainHeader">
    <div class="subheader">
      <div class="subheader1">
        <h1 class="pageheadertext">Report Manager</h1>

      </div>
      <div class="subheader2">
        <img src="../assets/images/InfraCredit.svg" alt="">
      </div>
      <div class="subheader3">

        <div class="notif">
          <div class="text-none" @click="emitSelectedOption(true)">
            <v-badge content=2 color="green-darken-1">
              <v-icon size="large" color="black">mdi-bell-outline</v-icon>
            </v-badge>
          </div>
        </div>

        <div class="user41">
          <img class="user-child37" alt="" src="../assets/images/ellipse-6@2x.png" />
          <div class="john-snow22" :style="{ cursor: 'context-menu' }">John</div>
        </div>

        <div class="div1237" @click="SignOut()">
          <img class="frame-icon67" alt="" src="../assets/images/frame67.svg" />
          <div class="john-snow22" >Logout</div>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import authenticationService from '../services/authenticationService';
export default {
  name: 'TopHeader',
  data() {
    return {
      account: undefined,
      name: '',
    };
  },

  methods: {
    async SignOut() {
      return authenticationService.SignOut();
    },
  },
};
</script>

<style scoped>
.subheader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  width: 100%;
  height: 85.63px;
  background: #ffffff;
  box-shadow: 0px 1px 0px rgba(18, 32, 59, 0.09);
}

.subheader3 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-top: 20px;
  width: 350px;
}


.user41 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-3xs);
  margin-right: 30px;
}

.notif {
  margin-right: 30px;
  margin-top: 5px;
  cursor: pointer;
}

.user-child37 {
  width: 32px;
  height: 32px;
  object-fit: cover;
}

.john-snow22 {
  line-height: 19.2px;
  font-family: Roboto;
  margin-top: 3px;
  margin-left: 5px;
  font-weight: 600;
  color: black;

}

.div1237 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-8xs);
  cursor: pointer;
}

.frame-icon67 {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  overflow: hidden;
}

.subheader2 img {
  height: 45.62px;
  width: 150px;
  top: 20px;
}

.pageheadertext {
  margin-top: 20px;
  cursor: context-menu;
  height: 30px;
  font-family: 'Aladin';
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 26px;
  background: linear-gradient(90deg, #227CBF 0%, #47B65C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
