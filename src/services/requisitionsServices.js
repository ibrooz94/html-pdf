import getAccessToken from '../store/checker'
import store from '../store/authStore'
import axios from 'axios'


const createRequisition = axios.create({
    baseURL: 'https://api-infracredit.azurewebsites.net/api/requisitions/createrequisitions',
    json: true,
    method: 'POST'
})

const createAllLineBidder = axios.create({
  baseURL: 'https://api-infracredit.azurewebsites.net/api/requisitions/createRequisitionLineAllBidders',
  json: true,
  method: 'POST'
})


const createSelectedLineBidder = axios.create({
  baseURL: 'https://api-infracredit.azurewebsites.net/api/requisitions/createRequisitionSelectedBidders',
  json: true,
  method: 'POST'
})

const createRequisitionLine = axios.create({
  baseURL: 'https://api-infracredit.azurewebsites.net/api/requisitions/createRequisitionLines',
  json: true,
  method: 'POST'
})

const createResetRequisitionLineBidderStatus = axios.create({
  baseURL: 'https://api-infracredit.azurewebsites.net/api/requisitions/createResetRequisitionLineBidderStatus',
  json: true,
  method: 'POST'
})

const sendRFQToNominatedBidder = axios.create({
  baseURL: 'https://api-infracredit.azurewebsites.net/api/requisitions/sendFRQToNominatedBidders',
  json: true,
  method: 'POST'
})

export default {

  async createRequisitions(requisitionDate, requestedBy, description, departmentId, businessUnitId, companyOverview, projectDescription, createdBy, createdDate) {
    return createRequisition({
          data: {
            requisitionDate: requisitionDate,
            requestedBy: requestedBy,
            description: description,
            departmentId: departmentId,
            businessUnitId: businessUnitId,
            companyOverview: companyOverview,
            projectDescription: projectDescription,
            createdBy: createdBy,
            createdDate: createdDate
          },
      }).then(req => {
          console.log(req.status)
          return req.data
      }).catch(err => console.log(err))
  },


  async createRequisitionLines(requisitionId, serviceCategoryId, ScopeOfWork, expirationDuration, ExpirationDurationUnit, createdBy) {
    console.log(requisitionId, serviceCategoryId, ScopeOfWork, expirationDuration, ExpirationDurationUnit, createdBy)
    return createRequisitionLine({
        data: {
          RequisitionId: requisitionId,
          ServiceCategoryId: serviceCategoryId,
          ScopeOfWork: ScopeOfWork,
          ExpirationDuration: expirationDuration,
          ExpirationDurationUnit: ExpirationDurationUnit,
          CreatedBy: createdBy,
        },
    }).then(req => {
        console.log(req.status)
        return req.data
    }).catch(err => console.log(err))
},


  async createRequisitionLineAllBidders(requisitionId, serviceCategoryLineId, createdBy) {
    return createAllLineBidder({
        data: {
          CreatedBy: createdBy,
          RequisitionId: requisitionId,
          serviceCategoryLineId: serviceCategoryLineId,
        },
    }).then(req => {
        console.log(req.status)
        return req.data
    }).catch(err => console.log(err))
},


async createSelectedLineBidders(requisitionId, serviceCategoryLineId, createdBy, bidderId) {
  return createSelectedLineBidder({
      data: {
        CreatedBy: createdBy,
        RequisitionId: requisitionId,
        bidderId: bidderId,
        serviceCategoryLineId: serviceCategoryLineId,
      },
  }).then(req => {
      console.log(req.status)
      return req.data
  }).catch(err => console.log(err))
},


async createResetRequisitionLinesBidderStatus(requisitionId, serviceCategoryLineId) {
  return createResetRequisitionLineBidderStatus({
      data: {
        RequisitionId: requisitionId,
        serviceCategoryLineId: serviceCategoryLineId,
      },
  }).then(req => {
      console.log(req.status)
      return req.data
  }).catch(err => console.log(err))
},


async sendRFQToNominatedBidders(requisitionId, serviceCategoryLineId, modifiedBy) {
  return sendRFQToNominatedBidder({
      data: {
        requisitionId: requisitionId,
        serviceCategoryId: serviceCategoryLineId,
        modifiedBy: modifiedBy,
      },
  }).then(req => {
      console.log(req.status)
      return req.status
  }).catch(err => console.log(err))
},

    async updateRequisitionLine(requisitionId, serviceCategoryId, scopeOfWork, expirationDuration, expirationDurationUnit, modifiedBy) {
      console.log(requisitionId, serviceCategoryId, scopeOfWork, expirationDuration, expirationDurationUnit, modifiedBy, new Date().toJSON()) 
      fetch(`https://api-infracredit.azurewebsites.net/api/requisitions/updaterequisitionlines`,{
          method:  'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            requisitionId: requisitionId,
            serviceCategoryId: serviceCategoryId,
            scopeOfWork: scopeOfWork,
            expirationDuration:expirationDuration,
            expirationDurationUnit:expirationDurationUnit, 
            modifiedBy: modifiedBy,
            modifiedDate: new Date().toJSON(),
          })
        })
          .then(response => {
            response.json()
        })
      },


    async getRequisitions() {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/Requisitions/`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async getRequisitionBiddersbyRfqId(id) {
      try {
          let response = await fetch(`https://api-infracredit.azurewebsites.net/api/requisitions/getrequisitionbiddersbyrrqid/${id}`);
          this.posts = await response.json();
          return this.posts
      } catch (error) {
          console.log(error)
      }
  },

    async getRequisitionLinesbyReqid(id) {
      try {
          let response = await fetch(`https://api-infracredit.azurewebsites.net/api/requisitions/getrequisitionlinesbyreqid/${id}`);
          this.posts = await response.json();
          return this.posts
      } catch (error) {
          console.log(error)
      }
  },


    async getRequisitionsbyId(id) {
      try {
          let response = await fetch(`https://api-infracredit.azurewebsites.net/api/Requisitionsbyid/${id}`);
          this.posts = await response.json();
          return this.posts
      } catch (error) {
          console.log(error)
      }
  },


    async getRequisitions() {
      try {
          let response = await fetch(`https://api-infracredit.azurewebsites.net/api/Requisitions/`);
          this.posts = await response.json();
          return this.posts
      } catch (error) {
          console.log(error)
      }
  },

}