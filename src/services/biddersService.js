import getAccessToken from '../store/checker'
import store from '../store/authStore'
import axios from 'axios'


const createBidder = axios.create({
    baseURL: 'https://api-infracredit.azurewebsites.net/api/bidders/createbidders',
    json: true,
    method: 'POST'
})


const createBidderServiceCategory = axios.create({
    baseURL: 'https://api-infracredit.azurewebsites.net/api/bidders/createBidderServiceCategories',
    json: true,
    method: 'POST'
})

export default {
    async createBidders(bidderNumber, bidderTINNumber, bidderName, dateModified, bidderStatus, address1, bidderCity, contactPerson, bidderPhoneNumber, bidderEmail, selectedPaymentType, selectedServiceType) {
        return createBidder({
            data: {
                id: bidderNumber,
                bidderName: bidderName,
                address: address1,
                city: bidderCity,
                postalCode: "",
                stateId: "",
                countryId: "",
                contactName: contactPerson,
                primaryContactNumber: bidderPhoneNumber,
                primaryEmailAddress: bidderEmail,
                tinNumber: bidderTINNumber,
                paymentTermId: 4,
                serviceCategoryId: selectedServiceType,
                createdBy: bidderEmail,
                lastModifiedBy: dateModified,
                createdDate: new Date().getDates,
                lastModifiedDate: dateModified,
                paymentTermDescription: selectedPaymentType,
            },
        }).then(req => {
            return req.data
        }).catch(err => console.log(err))
            ;

    },

    async createBidderServiceCategories(bidderNumber, selected) {
       console.log(bidderNumber, selected)
        return createBidderServiceCategory({
            data: {
                BidderId: bidderNumber,
                ServiceCategoryLineId: selected
            },
        }).then(req => {
            return req.data
        }).catch(err => console.log(err))
    },


    async getBidders() {
        try {
            let response = await fetch("https://api-infracredit.azurewebsites.net/api/bidders/getbidders");
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async editBidders(bidderNumber, bidderTINNumber, bidderName, dateModified, bidderStatus, address1, bidderCity, bidderState, contactPerson, bidderPhoneNumber, bidderEmail, selectedPaymentType, selectedServiceType) {
        fetch(`https://api-infracredit.azurewebsites.net/api/bidders/editBidders/?id=${bidderNumber}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: bidderNumber,
                bidderName: bidderName,
                address: address1,
                city: bidderCity,
                postalCode: " ",
                stateId: bidderState,
                countryId: " ",
                contactName: contactPerson,
                primaryContactNumber: bidderPhoneNumber,
                primaryEmailAddress: bidderEmail,
                tinNumber: bidderTINNumber,
                paymentTermId: 4,
                serviceCategoryId: selectedServiceType,
                createdBy: bidderEmail,
                lastModifiedBy: bidderEmail,
                lastModifiedDate: dateModified,
                paymentTermDescription: selectedPaymentType,
            })
        })
            .then(response => {
                response.json()
            })
    },

    async getBiddersbyServiceCategoryid(id) {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/bidders/getbiddersbyservicecategoryid/${id}`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async getBiddersbyServiceCategoryLineId(id) {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/bidders/getbidderbyservicecategorylineid/${id}`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async deleteBidders(id) {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/bidders/editBidders`);
            this.posts = await response.json();
            return posts
        } catch (error) {
            console.log(error)
        }
    },

    async getServiceLine(id) {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/bidders/getBidderServiceCategoryLines/${id}`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }

    },

    async getBidderRequisitionsById(id) {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/bidders/getBidderRequisitionsById/${id}`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }

    },

    async editBidValues(requisitionId, bidderId, bidValue, comments, lastModifiedDate, documentFileName) {
        console.log(requisitionId, bidderId, bidValue, comments, lastModifiedDate, documentFileName)
        fetch(`https://api-infracredit.azurewebsites.net/api/bidders/editBidValues`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requisitionId: requisitionId,
                bidderId: bidderId,
                bidValue: bidValue,
                comments: comments,
                lastModifiedBy: lastModifiedDate,
                documentFileName: documentFileName
            }),
        }).then(response => { return response.status })
    },
}