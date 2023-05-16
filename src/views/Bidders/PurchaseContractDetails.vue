<script setup>
import { ref } from "vue";
import WelcomeHead from '../../components/PageMenuHeader.vue';
import PageHeader from '../../components/TopHeader.vue';
import { useCounterStore } from "../../store/piniaStore";
import pinia from "../../store/store";
const showUploadModal = ref(false)
const showRatingModal = ref(false)
const showEmailModal = ref(false)
const ratingProffessionality = ref(0)
const ratingTime = ref(0)
const ratingQuality = ref(30)
const ratingReliability = ref(0)
const ratingResponsive = ref(0)
var newComment = ref("")
const comments = ref([])
const errorMessage = ref("")
var disabled=ref(false)

const stores = useCounterStore(pinia);
const showResults = ref(false)
const saveComment = () =>{
  disabled.value=true
}

const onOptionSelected = (isCorrect) => {
  if (isCorrect) {
    const ps = showResults.value = !showResults.value
    return ps
  }
}

const removeComment = () => {
  newComment.value=''
}    
</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Aladin">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
  <link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">

  <div v-if="showRatingModal" class="overlay" @click="showRatingModal = false">
    <div class="modals" @click.stop>
      <h3>Bidder Performance Rating</h3>
      <div class="text-center">
      </div>

      <div class="ratingtext">
        <li>Timeliness of response</li>
        <div class="ratingdetails">
          <v-rating v-model="ratingTime" bg-color="orange-lighten-1" color="#47B65C" density="compact" hover
            half-increments></v-rating>
        </div>
      </div>
      <div class="ratingtext">
        <li>Quality of Report</li>
        <div class="ratingdetails">
          <v-rating v-model="ratingQuality" bg-color="orange-lighten-1" color="#47B65C" density="compact" hover
            half-increments></v-rating>
        </div>
      </div>
      <div class="ratingtext">
        <li>Responsiveness of Consultant</li>
        <div class="ratingdetails">
          <v-rating v-model="ratingResponsive" bg-color="orange-lighten-1" color="#47B65C" density="compact" hover
            half-increments></v-rating>
        </div>
      </div>
      <div class="ratingtext">
        <li>Reliability of the report</li>
        <div class="ratingdetails">
          <v-rating v-model="ratingReliability" bg-color="orange-lighten-1" color="#47B65C" density="compact" hover
            half-increments></v-rating>
        </div>
      </div>
      <div class="ratingtext">
        <li>Professionality and attitude to work</li>
        <div class="ratingdetails">
          <v-rating v-model="ratingProffessionality" bg-color="orange-lighten-1" color="#47B65C" density="compact" hover
            half-increments></v-rating>
        </div>
      </div>
      <div class="buttonsave">
        <button class="save" @click="showRatingModal = false">Save</button>
      </div>
    </div>
  </div>


  <div v-if="showUploadModal" class="overlay" @click="showUploadModal = false">
    <div class="modal3" @click.stop>
            <div class="topUpload">
                <img src="../../assets/images/upload_cloud.svg" />
                <div class="bottomContent">
                    <h2>Select a file or drag and drop here</h2>
                    <p>.pdf, file size no more than 30MB</p>
                </div>
                <div class="upload">
                    <button class="loginBtn" onclick="document.getElementById('getFile').click()"
                        v-on:click="submitFile">Select file</button>
                    <input type='file' id="getFile" style="display:none" @change="uploadFile">
                </div>
                <p style="text-decoration: underline; font-weight: bold; cursor: pointer;" v-if="contractUploaded">View
                    Contract</p>
            </div>
            <div class="bottomUpload">
                <div>
                    <div class="topBotton3">
                        <button class="topButton" @click="showUploadModal = false">Cancel</button>
                        <button class="topButton" @click="showUploadModal = false">Upload</button>
                    </div>
                </div>
            </div>
          </div>
  </div>

  <div v-if="showEmailModal" class="overlay" @click="showEmailModal = false">
    <div class="emailModal" @click.stop>
      <h3>Notify Winner for Signature</h3>
      <div class="ratingtext2">Email:<input name="email" class="email" type="email" placeholder="Enter email"/></div>
      <div class="ratingtext2">cc:<input name="email" class="email" type="email" placeholder="Enter email"/></div>
      <div class="ratingtext2">Subject<input name="subject" class="subject" type="text" placeholder="Subject"/></div>
      <div class="ratingtext2">
        Message
        <textarea class="textarea2" name="textarea" rows="17" cols="55"></textarea>
      </div>
      <div class="buttonsave">
        <button class="save" @click="showEmailModal = false">Send</button>
      </div>
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
    <div class="Rfq">

      <div class="topBotton">
        <button class="topButton" v-on:click="showUploadModal = true">Upload Signed Contract</button>
      </div>

      <div class="mainPage">
        <div class="contractPreview"><iframe :src=stores.testDocument3 height="100%" width="100%" title="Purchase Contract Preview"></iframe></div>
        <div class="comments">
          <div>
            <b>Comment (Optional)</b>
            <textarea class="textarea" name="textarea" rows="17" cols="55" v-model.trim="newComment" :disabled="disabled"></textarea>
            <p v-if="errorMessage">{{ errorMessage }}</p>
          </div>

          <div class="commentBtnGroup">
            <div class="formButton1">
              <button class="topButton1" @click="saveComment()">Save Comment</button>
              <button class="topButton1" @click="disabled=false">Edit Comment</button>
            </div>

            <div class="formBotton2">
              <button class="topButton2" @click=removeComment>Delete Comments</button>
            </div>
          </div>
          <div class="uploads">
            <img src="../../assets/images/upload.svg" alt="">
            <strong>Uploaded files</strong>
          </div>
          <div class="uploadedfiles">
            <p>document-name.PDF</p>
            <p>Preview</p>
            <p>5.7MB</p>
          </div>

        </div>
        <div>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
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

b {
  margin-top: 40px;
}

.ratingdetails {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;
  width: 250.97px;
  height: 21px;
  font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #9FA1A2;
}

.Rfq {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px;
  gap: 20px;
  width: 100%;
  border-radius: 10px;
  background: #FFFFFF;
}

.topBotton {
  display: flex;
  gap: 7px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 20px 20px 0px 20px;
}

.mainPage {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 20px 20px 20px;
  gap: 30px;
  width: 100%;
  height: 665.37px;

}

.topButton {
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


.textarea2 {
  width: 100%;
  font-size: 17px;

}

.textarea {
  display: flex;
  flex-direction: column;
  justify-content: start;
  justify-items: start;
  align-content: start;
  vertical-align: top;
  align-items: flex-start;
  gap: 5px;
  font-size: 17px;
  width: 415px;
  resize: none;
  height: 262.37px;
}

.formButton1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 415px;
  height: 40px;

}

.topButton1 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  border: 1px solid #FFFFFF;
  width: 415px;
  height: 40px;
  background: #47B65C;
  border-radius: 50px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  box-sizing: border-box;
  color: #FFFFFF;
}

.topButton1:hover {
  background-color: #FAFAFB;
  color: #47B65C;
  border-color: #47B65C;
}

.topButton2 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  width: 415px;
  height: 40px;
  background: #FF0000;
  border: 1px solid #FFFFFF;
  border-radius: 50px;
}

.comments {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;
  width: 100%;
  height: 665.37px;
}

.commentBtnGroup {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 415px;
  height: 90px;
}

.uploads {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0px;
  gap: 5px;
  width: 131px;
  height: 24px;
}

.uploads img {
  width: 20px;
  height: 24px
}

.contractPreview{
  width: 2000px;
  height: 100%;
}

.uploadedfiles {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 9px 10px;
  width: 415px;
  height: 34px;
  border: 1px solid #47B65C;
  border-radius: 4px;
}

.uploadedfiles img {
  width: 16px;
  height: 16px
}

h1 {
  font-weight: bold;
  margin-bottom: 25px;
  font-size: 75px;
}

header button {
  border: none;
  padding: 10px;
  width: 40px;
  height: 50x;
  cursor: pointer;
  background-color: rgb(21, 20, 20);
  color: white;
  border-radius: 100%;
  font-size: 20px;
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

    .modal3 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 30px;
        gap: 20px;
        position: relative;
        width: 540px;
        height: 400.81px;
        background: #FAFAFB;
        border-radius: 10px;
    }

.modals {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  position: relative;
  width: 553.49px;
  border-radius: 10px;
}

.emailModal {
  top: -30px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 703.49px;
  margin-top: 100px;
  border-radius: 10px;
}

.emailModal h3 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 705px;
  margin-top: -30px;
  height: 64px;
  font-family: Roboto;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #FFFFFF;
  background: #227CBF;
}

.emailModal {
  top: -30px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 703.49px;
  margin-top: 100px;
  border-radius: 10px;
}

.ratingtext {
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: grid;
  margin-top: 20px;
  align-items: center;
  color: #000000;
  height: 31.92px;
  width: 100%;
  grid-template-columns: 1.5fr 2fr;
  grid-gap: 20px;
}

.ratingtext2 {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  align-items: center;
  gap: 50px;
  width: 100%;
  height: 230x;
  margin-top: 20px;
}

.demo {
  width: 755px;
  height: 665.37px;
}

.ratingtext2 input {
  padding: 7px;
  width: 100%;
}

.modals h3 {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: left;
  color: #000000;
}

.modals button {
  width: 100%;
  border: none;
}

.commentText {
  padding: 5px;
  width: 100%;
}

.modals .save {
  margin-top: 7px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 200px;
  height: 40px;
  background: linear-gradient(90deg, #227CBF 0%, #47B65C 100%);
  border-radius: 50px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  color: #FFFFFF;
}

.emailModal .save {
  border: none;
  margin-top: 7px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 200px;
  height: 40px;
  background: linear-gradient(90deg, #227CBF 0%, #47B65C 100%);
  border-radius: 50px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
}

.buttonsave {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 10px;
  margin-top: 10px;
  width: 493.49px;
  height: 40px;
}

.save:hover {
  background: linear-gradient(90deg, #47B65C 0%, #227CBF 100%);
  transition: 0.7s;
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
  padding: 10px;
  cursor: pointer;
  background: linear-gradient(90deg, #227CBF 0%, #47B65C 100%);
  border-radius: 50px;
}


.topButton:hover {
  background-color: #47B65C;
  color: #FFFFFF;
  border: none;
}

button:hover {
  cursor: pointer;
}

.topBotton3 {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 7px;
  flex-direction: row;
  padding: 20px 20px 0px 0px;
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
}
</style>
