<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Aladin">

    <div class="split left">
        <div class="centered">
            <header class="Mainheader">
                <h1 class="pageheadertext">SapphireProcure</h1>
                <img src="../../assets/images/InfraCredit.svg" alt="" class="pageheaderimg" width="145" height="50">
            </header>

            <div class="loginElements">
                <h1>Login</h1>
                <!-- <button @click="SignIn" class="loginBtn"> -->
                <button class="loginBtn" @click="$router.push('/')">
                    Click here to Login
                </button>
            </div>

        </div>
    </div>

    <div class="split right">
        <div class="centered">
        </div>
    </div>
</template>

<style scoped>
.split {
    height: 100%;
    width: 50%;
    position: fixed;

    top: 0;
    overflow-x: hidden;
}

.split:first-child {
    padding: 30px;

}

.left {
    left: 0;
    z-index: 1;
    background-color: white;
}

.right {
    z-index: 3;
    right: 0;
    background-color: white;
    background-image: url('../../assets/images/gel_images.jpg');
    background-repeat: no-repeat;
    background-size: cover;

}

/* If you want the content centered horizontally and vertically */


.Mainheader {
    padding-top: 30px;
    display: flex;
    width: 50%;
}

.pageheadertext {
    margin: 10px 20vw 0px 25px;
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

.loginElements {
    top: 186px;
    border-radius: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 30px;
    width: 50vw;
    height: 252px;
}

.loginElements h1 {
    width: 143.41px;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 800;
    font-size: 48px;
    line-height: 58px;
    text-align: center;
    color: #000000;
}

.loginElements h4 {
    width: 640px;
    height: 24px;
    left: 0px;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #227CBF;
}

.loginBtn {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 12px 10px;
    gap: 10px;
    cursor: pointer;
    width: 370px;
    height: 50px;
    background: linear-gradient(90deg, #227CBF 0%, #47B65C 100%);
    border-radius: 10px;
}

.loginBtn:hover {
    background: linear-gradient(90deg, #47B65C 0%, #227CBF 100%);
    transition: 0.7s;
}

@media (max-width: 971px) {
    .Mainheader{
        width: 600px;
        display: flex;
        flex-direction: column;
        gap:20px;
        margin: 0px;
    }

    .pageheadertext{
        margin:  0px 20px 0px 15vw;
        padding: 0px;
    }
    
    .Mainheader img{
        margin:  0px 20px 0px 16svw;
 
    }
}
</style>

<script>
import authenticationService from '../../services/authenticationService';
export default {
    name: 'LoginAuth',
    data() {
        return {
            account: undefined,
        };
    },

    mounted() {
        // const accounts = authenticationService.msalInstance.getAllAccounts();
        // if (accounts.length == 0) {
        //     return;
        // }
        // this.account = accounts[0];
        // this.$emitter.emit('login', this.account);
        // this.$router.replace(this.$route.query.redirect || '/');

    },
    methods: {
        async SignIn() {
            return authenticationService.SignIn();
            
        },
        async SignOut() {
            return authenticationService.SignOut();
        },
    },
};
</script>