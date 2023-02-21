import './login.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
Template.login.events({
    'submit #login': function (e, t) {
        e.preventDefault()
        let username = e.currentTarget[0].value, password = e.currentTarget[1].value
        Meteor.loginWithPassword(username, password, function (err) {
            if (err) console.log(err)
            else {
               FlowRouter.go('/home')
            }
        })
    }
})