import { ArticlesCol } from "./collections";


Meteor.publishComposite('getArticles', function (query = {}, limit = 20, skip = 0, sort={} ) {
    return {
        find() {
            return ArticlesCol.find(query, { limit, skip, sort })
        },
        children: [{
            find(article) {
                return Meteor.users.find({ _id: article.userId })
            }
        }]

    }
})


// Meteor.publish('articleCount', function (query = {}) {

//     let count = 0;
//     let initializing = true;
//     let randomId = Random.id();
//     const handleCount = ArticlesCol.find(query).observeChanges({
//         added: () => {
//             count += 1;
//             if (!initializing) {
//                 this.changed('articles_count_col', randomId, {
//                     count
//                 });
//             }
//         },
//         removed: () => {
//             count -= 1;
//             this.changed('articles_count_col', randomId, {
//                 count
//             });
//         },
//     });

//     initializing = false;

//     this.added('articles_count_col', randomId, {
//         count
//     }, (err, res) => {
//         if (err) {
//             console.log('error' + err)
//         } else {
//             console.log('res=' + res)
//         }
//     });
//     this.ready();
//     this.onStop(() => handleCount.stop());

// });