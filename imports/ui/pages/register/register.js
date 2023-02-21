import './register.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
Template.register.events({
    "submit #register": function (e, t) {
        e.preventDefault()
        let data = {}
        data.email = e.currentTarget[0].value
        data.username = e.currentTarget[1].value
        data.password = e.currentTarget[2].value
        Meteor.call('addUser', data, function (err, res) {
            if (err) console.log(err)
            else {
                FlowRouter.go('/login')
            }
        })
    }
})