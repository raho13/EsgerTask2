import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import "../../ui/layout/mainLayout/mainLayout"
import '../../ui/pages/home/home'
import '../../ui/pages/register/register'
import '../../ui/pages/login/login'
import '../../ui/pages/account/account'
import '../../ui/components/article/article'
import '../../ui/components/navbar/navbar'
import '../../ui/components/popup/popup'

FlowRouter.route('/home/:pageId', {
    name: 'home',
    action() {
        BlazeLayout.render("mainLayout", {
            main: 'home'
        })
    }
})
FlowRouter.route('/home', {
    action() {
        FlowRouter.go('/home/1')
    }
})

FlowRouter.route('/login', {
    name: 'login',
    action() {
        BlazeLayout.render("mainLayout", {
            main: 'login'
        })
    }
})

FlowRouter.route('/register', {
    name: 'register',
    action() {
        BlazeLayout.render("mainLayout", {
            main: 'register'
        })
    }
})

FlowRouter.route('/account/:pageId', {
    name: 'account',
    action() {
        BlazeLayout.render("mainLayout", {
            main: 'account'
        })
    }
})
FlowRouter.route('/account', {
    action() {
        FlowRouter.go('/account/1')
    }
})

FlowRouter.route('/', {
    action() {
        FlowRouter.go('/home');
    }
})
function trackRouteEntry(context, redirect) {
    if (!Meteor.userId() && !Meteor.loggingIn()) {
        redirect('/login')
    }
}
FlowRouter.triggers.enter([trackRouteEntry], {
    except: ['login', 'register']
})
FlowRouter.route('*', {
    action: function () {
        redirect('/login')
    }
});