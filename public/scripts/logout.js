$('#accountManagement').on('click','#btnLogout', function (e) {
    e.preventDefault()  
    Promise.resolve(
        $.ajax({
            url: '/ajax/logout',
            method: 'GET',
            data:{action:'logout'}
        })
    )
        .then(json => {
            if (json.success) {
                $('#navContainer').load('/ #navContainer')
            } else {
                console.log("what happened")
            }
        })
        .catch(err => console.log(err))
})
