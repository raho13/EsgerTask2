import './popup.html'
Template.popup.events({
    "submit #addArticle": function (e, t) {
        e.preventDefault()
        let data = {}
        data.header = $('#articleHeader').val();
        data.description = $('#articleDescription').val()
        data.userId = Meteor.userId()
        Meteor.call('addArticle', data, function (err, res) {
            if (err) console.log(err)
            else {
                $('#exampleModal').modal('hide')
                // document.getElementById('exampleModal').reset()
            }
        })
    }
})