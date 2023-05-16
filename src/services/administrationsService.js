import getAccessToken from '../store/checker'
import store from '../store/authStore'
import axios from 'axios'


const createRole = axios.create({
    baseURL: 'https://api-infracredit.azurewebsites.net/api/administrations/createroles',
    json: true,
    method: 'POST'
})

const createUser = axios.create({
    baseURL: 'https://api-infracredit.azurewebsites.net/api/administrations/createUsers',
    json: true,
    method: 'POST'
})


export default {

    async getUserTypes() {
        try {
            let response = await fetch("https://api-infracredit.azurewebsites.net/api/administrations/getUserTypes", {
            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async getRoles() {
        try {
            let response = await fetch("https://api-infracredit.azurewebsites.net/api/administrations/getRoles", {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async createRoles(name, description, userType) {
        return createRole({
            data: {
                name: name,
                description: description,
                userType: userType
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async editRoles(id, names, descr, userTypes) {
        fetch(`https://api-infracredit.azurewebsites.net/api/administrations/editRoles/?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: names,
                description: descr,
                userType: userTypes,
            })
        })
            .then(response => {
                response.json()
            })
    },

    async deleteRoles(id) {
        try {
            await fetch(`https://api-infracredit.azurewebsites.net/api/administrations/deleteRoles?id=${id}`, {
                method: 'DELETE'
            }).catch(err => console.log(err))
        }
        catch (err) {
            console.log(err)
        }
    },


    async getUserRoles() {
        try {
            let response = await fetch("https://api-infracredit.azurewebsites.net/api/administrations/getuserroles");
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getLoggedInUser(id) {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/administrations/getloginuserdetails/${id}`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async createUsers(userId, userFullNames, roleId, jobTitle, phoneNumber, address, departmentId, businessUnitId) {
        return createUser({
            data: {
                userId: userId,
                userFullName: userFullNames,
                roleId: roleId,
                jobTitle: jobTitle,
                phoneNumber: phoneNumber,
                address: address,
                departmentId: departmentId,
                businessUnitId: businessUnitId
            },
        }).then(req => {
            return req.data
        }).catch(err => console.log(err))
            ;

    },

    async editUser(emailAddress, FullName, userRoleId, jobTitle, phoneNumber, address, department, businessUnit) {
        console.log(businessUnit)
        fetch(`https://api-infracredit.azurewebsites.net/api/administrations/editUsers/?id=${emailAddress}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: emailAddress,
                userFullName: FullName,
                jobTitle: jobTitle,
                phoneNumber: phoneNumber,
                address: address,
                roleId: userRoleId,
                departmentId: department,
                businessUnitId: businessUnit,
            })
        })
            .then(response => {
                response.json()
            })
    },

    async getLoggedInUserRoles(id) {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/administrations/getLoginUserDetails/${id}`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getServiceCategory() {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/administrations/getservicecategories`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getServiceLine(id) {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/administrations/getservicelines/${id}`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getMenus() {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/administrations/getmenus`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async createRoleMenus() {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/administrations/createrolemenus`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getRoleMenuPermissions(id) {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/administrations/getrolemenupermissions?id=${id}`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },
}