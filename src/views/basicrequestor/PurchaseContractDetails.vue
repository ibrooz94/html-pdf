<script setup>
import { ref } from "vue";
import WelcomeHead from '../../components/BasicRequester/PageMenuHeader.vue';
import PageHeader from '../../components/TopHeader.vue'
import VuePdfEmbed from 'vue-pdf-embed';

const showRatingModal = ref(false)
const showEmailModal = ref(false)
const showCommentModal = ref(false)
const isLoading = ref(true)
const page = 1
const pageCount = 1
const pdfSource = ref('../../src/assets/documents/purchaseorder.pdf')
const showAllPages = ref(true)
const showResults =ref(false);

const onOptionSelected = (isCorrect) =>{
    if(isCorrect){
     showResults.value=!showResults.value
    }
}

const newComment = ref("")
const comments = ref([])
const errorMessage = ref("")

const addComment = () => {
  if (newComment.value.length < 10) {
    return errorMessage.value = "Note need to be 10 characters or more"
  }
  comments.value.push({
    text: newComment.value,
    date: new Date(),
    id: Math.floor(Math.random() * 1000000),
  });
  newComment.value = ""
  errorMessage.value = ""
}


const removeComment = (id) => {
  let updateCommentList = comments.value.filter((el) => el.id !== id);
  comments.value = updateCommentList;

}  
</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Aladin">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">

  <div v-if="showRatingModal" class="overlay">
    <div class="modal">
      <h3>Bidder Performance Rating</h3>
      <div class="ratingtext">
        <li>Quality Of Delivery</li>
        <div class="ratingdetails">
          <p>11 reviews</p>
        </div>
      </div>
      <div class="ratingtext">
        <li>Time Delivery</li>
        <div class="ratingdetails">
          <p>8 reviews</p>
        </div>
      </div>
      <div class="ratingtext">
        <li>Quality Of Delivery</li>
        <div class="ratingdetails">
          <p>3 reviews</p>
        </div>
      </div>
      <div class="ratingtext">
        <li>Quality Of Delivery</li>
        <div class="ratingdetails">
          <p>2 reviews</p>
        </div>
      </div>
      <div class="buttonsave">
        <button class="save" @click="showRatingModal = false">Save</button>
      </div>
    </div>
  </div>

  <div v-if="showCommentModal" class="overlay">
    <div class="modal">
      <h3>Contract Comments</h3>
      <div class="ratingdetails">
        <p>No Comments yet!</p>
      </div>
      <div v-for="comment in comments" :key="comment.id">
        <div class="ratingtext">
          <div class="commentText">{{ comment.text }}</div>
          <div class="ratingdetails" @click="removeComment(comment.id)" :style="{ cursor: 'pointer' }">
            <p>Delete</p>
          </div>
        </div>
      </div>
      <div class="buttonsave">
        <button class="save" @click="showCommentModal = false">Exit</button>
      </div>
    </div>
  </div>


  <div v-if="showEmailModal" class="overlay">
    <div class="emailModal">
      <h3>Notify Winner for Signture</h3>
      <div class="ratingtext2">Email:<input name="email" class="email" type="email" placeholder="Enter email" /></div>
      <div class="ratingtext2">cc:<input name="email" class="email" type="email" placeholder="Enter email" /></div>
      <div class="ratingtext2">Subject<input name="subject" class="subject" type="text" placeholder="Subject" /></div>
      <div class="ratingtext2">
        Message
        <textarea class="textarea2" name="textarea" rows="17" cols="55"></textarea>
      </div>
      <div class="buttonsave">
        <button class="save" @click="showEmailModal = false">Send</button>
      </div>
    </div>
  </div>

  
  <div v-if="showResults" class="overlay2">
    <div class="modal2 animated fadeInRight">
      <div> <img src="../../assets/images/bell.svg" alt="" > </div>
          <div class="notetext2">
            <h2>New RFQ!</h2>
            <p>Mark John just created a new RFQ.</p>
          </div>
          <div class="options2" :style="{cursor: 'pointer'}">
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
        <button class="topButton" v-on:click="showEmailModal = true">Notify Winner for Signature</button>
        <button class="topButton" v-on:click="showRatingModal = true">Rate Bidders Performance</button>
      </div>

      <div class="mainPage">

        <div class="app-content">
          <VuePdfEmbed ref="pdfRef" :source="pdfSource" :page="page"
            @rendered="handleDocumentRender" width="705" height= "165.37"/>
        </div>

        <div class="comments">
          <div>
            <b>Comment (Optional)</b>
            <textarea class="textarea" name="textarea" rows="17" cols="55" v-model.trim="newComment"></textarea>
            <p v-if="errorMessage">{{ errorMessage }}</p>
          </div>

          <div class="commentBtnGroup">
            <div class="formButton1">
              <button class="topButton1" @click="addComment()">Save Comment</button>
              <button class="topButton1" @click="showCommentModal = true">View Comments</button>
            </div>

            <div class="formBotton2">
              <button class="topButton2">Delete Comments</button>
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
            <img src="../../assets/images/Delete.svg" alt="" width="16px" height="16px">
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

.uploadedfiles img{
  width: 16px;
  height: 16px;
}

.ratingdetails {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;
  width: 166.97px;
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
  padding: 20px 20px 0px 20px;
  justify-content: flex-start;
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

.topButton:hover {
  background-color: #47B65C;
  color: #FFFFFF;
  border: none;
}

button:hover {
  cursor: pointer;
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
  width: 200px;
  height: 40px;
  background: #47B65C;
  border-radius: 50px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
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


main {
  height: 100vh;
  width: 100vw;
}

.container {
  max-width: 1000px;
  padding: 10px;
  margin: 0 auto;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.modal {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  position: relative;
  width: 553.49px;
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
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  margin-top: 20px;
  align-items: center;
  color: #000000;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 50px;
  height: 31.92px;
  width: 493.49px;
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

.modal h3 {
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

.modal button {
  padding: 10px 20px;
  font-size: 20x;
  width: 100%;
  background-color: blueviolet;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 10px;
}

.commentText {
  padding: 5px;
  width: 100%;
}

.modal .save {
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
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
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



@media (min-width: 1024px) {
  .Home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
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
  right:15px;
  border: 10px;
  width: 382px;
  height: 80px;
  border-radius: 10px;
  padding: 20px 20px 10px 25px;
  flex-direction: row; 
}

.notetext2 {
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

.options2{
  padding: 5px;
}

.options2 h3{
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

.options2 p{
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
