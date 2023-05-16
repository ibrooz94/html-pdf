import axios from 'axios'


const createNotifications = axios.create({
    baseURL: 'https://api-infracredit.azurewebsites.net/api/notifications/createnotification',
    json: true,
    method: 'POST'
})



export default {

    async getNotifications() {
        try {
            let response = await fetch(`https://api-infracredit.azurewebsites.net/api/notifications/getnotifications/${whom}`, {
            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async createNotification(userId, userFullNames, roleId, jobTitle, phoneNumber, address, departmentId, businessUnitId) {
        return createNotifications({
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
    },

    async editNotifications(emailAddress, FullName, userRoleId, jobTitle, phoneNumber, address, department, businessUnit) {
        fetch(`https://api-infracredit.azurewebsites.net/api/notifications/editnotifications/${whom}`, {
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
}