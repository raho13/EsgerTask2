import { Accounts } from "meteor/accounts-base"

Meteor.methods({
    addUser: function ({ username, email, password }) {
        let res = Accounts.createUser({
            username, email, password
        })
        return res
    }
})