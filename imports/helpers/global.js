Template.registerHelper("showTime", function (data) {
    return moment(data).format("HH:mm DD-MM-YYYY ")
})
