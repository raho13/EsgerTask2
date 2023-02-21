import './home.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { ArticlesCol } from '../../../api/articles/collections';

Template.home.onCreated(function () {
    const self = this
    self.query = new ReactiveVar({})
    self.limit = new ReactiveVar(10)
    self.sort = new ReactiveVar()
    self.skip = new ReactiveVar(0)
    self.count = new ReactiveVar(0)
    if (parseInt(FlowRouter.getParam('pageId')) === 1) {
        self.skip.set(0)
    } else {
        self.skip.set((parseInt(FlowRouter.getParam('pageId')) * 10) - 10)
    }

    self.autorun(() => {
        self.sort.set({ createdAt: -1 })
        self.subscribe('getArticles', self.query.get(), self.limit.get(), self.skip.get(), self.sort.get());
    })
    self.autorun(() => {
        Meteor.call('getCount', function (err, res) {
            if (err) console.log(err)
            else {
                self.count.set(res)
            }
        })
    })
})

Template.home.helpers({
    articles: function () {
        const temp = Template.instance()
        return ArticlesCol.find(temp.query.get())
    },
})

Template.home.events({
    'click #next': function (e, t) {
        if (t.skip.get()+10 < t.count.get()){
            FlowRouter.go(`/home/${parseInt(FlowRouter.getParam('pageId')) + 1}`)
            t.skip.set(t.skip.get() + 10)
        }
    },
    'click #previous': function (e, t) {
        if (parseInt(FlowRouter.getParam('pageId')) > 1) {
            FlowRouter.go(`/home/${parseInt(FlowRouter.getParam('pageId')) - 1}`)
            t.skip.set(t.skip.get() - 10)
        }
    },
    'click #firstPage': function (e, t) {
        FlowRouter.go(`/home/1`)
        t.skip.set(0)
    },
    'click #lastPage': function (e, t) {
        if (parseInt(FlowRouter.getParam('pageId')) > 1) {
            FlowRouter.go(`/home/${parseInt(FlowRouter.getParam('pageId')) - 1}`)
            t.skip.set(t.skip.get() - 10)
        }
    },


});