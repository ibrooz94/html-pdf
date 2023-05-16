import { createRouter, createWebHistory } from 'vue-router'
import LoginAuth from '../views/general/LoginAuth.vue'
import HomeView from '../views/OtherUsers_/Home.vue'
import NewRfq from '../views/general/NewRFQView.vue'
import PurchContract from '../views/general/PurchaseContracts.vue'
import PurchContractDet from '../views/general/PurchaseContractDetails.vue'
import Settings from '../views/OtherUsers_/Settings.vue'
import userRolesSetting from '../views/OtherUsers_/UserRoles.vue'
import AdminUsers from '../views/OtherUsers_/AdminUsers.vue'
import userMenus from '../views/OtherUsers_/UserMenus.vue'
import biddersList from '../views/OtherUsers_/BiddersList.vue'
import BusinessUnit from '../views/OtherUsers_/BusinessUnit.vue'
import Department from '../views/OtherUsers_/Department.vue'

import rfqBids from '../views/Bidders/rfqBids.vue'
import rfqResponse from '../views/Bidders/RfqResponse.vue'
import BiddersHome from '../views/Bidders/BiddersHome.vue'
import BasicTeamRequisition from '../views/basicrequestor/TeamRequisitions.vue'
import BasicHomeView from '../views/basicrequestor/BasicRequestorHome.vue'
import EditRfq from '../views/general/EditRFQView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      
      path: '/login',
      name: 'Login',
      component: LoginAuth
    },
    
    {
      path: "/settings",
      name: 'settings',
      component: Settings,
      children:[
        {
          path: '', 
          name: 'settings',
          component: AdminUsers
        },

        {
          path: 'usermenus',
          name: 'usermenus',
          component: userMenus
        },
        

        {
          path: 'userRolesSetting',
          name: 'userRolesSetting',
          component: userRolesSetting
        },

        {
          path: 'department',
          name: 'department',
          component: Department
        },
    
        {
          path: 'businessUnit',
          name: 'businessUnit',
          component: BusinessUnit
        },

      ]
    },

    {
      path: '/biddersList',
      name: 'biddersList',
      component: biddersList
    },

     {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/basichome',
      name: 'basichome',
      component: BasicHomeView
    },


    {
      path: '/newrfq',
      name: 'newrfq',
      component: NewRfq
    },

    {
      path: "/rfqedit/:id",  
      name: "rfqedit",
      component: EditRfq
  },

    
    {
      path: '/purchcontract',
      name: 'purchcontract',
      component: PurchContract
    },

    {
      path: '/purchcontractdet',
      name: 'purchcontractdet',
      component: PurchContractDet,
      meta: {requiresAuth: true}
    },

    {
      path: "/rfqresponse/:id",  
      name: 'rfqResponse',
      component: rfqResponse
    },


    {
      path: '/rfqBids',
      name: 'rfqBids',
      component: rfqBids
    },

    {
      path: '/bidders',
      name: 'Bidders',
      component: BiddersHome
    },

    {
      path: '/basicteamrequisition',
      name: 'basicteamrequisition',
      component: BasicTeamRequisition
    },

  ]
})

//  router.beforeEach(async (to) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//    const publicPages = ['/login'];
//    const authRequired = !publicPages.includes(to.path);
//    const auth = authenticationService.msalInstance.getAllAccounts();
//    if (authRequired && auth.length==0) {
//      return '/login';
//    }
//  });




export default router
