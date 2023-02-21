import { ArticlesCol } from "./collections";
Meteor.methods({
    addArticle: function ({ header, description, userId }) {
        return ArticlesCol.insert({
            userId,
            header,
            description,
            status: true,
            createdAt: new Date()
        })
    },
    getCount: function () {
        return ArticlesCol.find().count()
    }

})