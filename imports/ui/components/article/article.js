import './article.html'
Template.article.onCreated(function () {
   // console.log(Template.currentData().data)
})

Template.article.helpers({
    userName:function(){
     return Meteor.users.find({_id:Template.instance().userId})
    }
})