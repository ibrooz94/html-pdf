import getAccessToken from '../store/checker'
import store from '../store/authStore'

import axios from 'axios'

const createDepartment = axios.create({
    baseURL: 'https://api-infracredit.azurewebsites.net/api/settings/createdepartments',
    json: true,
    method: 'POST'
})

const createBusinessUnit = axios.create({
    baseURL: 'https://api-infracredit.azurewebsites.net/api/settings/createbusinessunits',
    json: true,
    method: 'POST'
})

export default {

    async createDepartments(shortCode, departmentDescription) {
        return createDepartment({
            data: {
                ShortCode: shortCode,
                LastModifiedBy: store.state.signedInUseremail,
                DepartmentDescription: departmentDescription,
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async createBusinessUnits(shortCode, businessUnitDescription) {
        return createBusinessUnit({
            data: {
                ShortCode: shortCode,
                LastModifiedBy: store.state.signedInUseremail,
                BusinessUnitDescription: businessUnitDescription,
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },


    async getBusinessUnits() {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/settings/getbusinessunits/1`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async editBusinessUnits() {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/settings/editbusinessunits`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async deleteBusinessUnits(id) {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/settings/deletebusinessunits/${id}`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async getDepartments() {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/settings/getdepartments/1`, {
            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    

    async editDepartments() {
        try {
            let response = await fetch("https://api-infracredit.azurewebsites.net/api/settings/editdepartments");
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async deletedepartments(id) {
        try {
            await fetch(`https://api-infracredit.azurewebsites.net/api/settings/deletedepartments/${id}`, {
                method: 'DELETE',
                headers:{
                'Content-Type': 'application/json'
                },
                body: {
                    data
                }
            }).then(id=>{
                return id;
            });
        }catch (error) {
            console.log(error)
        }
    },
}