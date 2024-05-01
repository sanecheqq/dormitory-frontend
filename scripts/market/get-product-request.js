const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
$.ajax({
    url: 'http://192.168.0.15:8100/products/' + productId,
    type: 'GET',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    },
    dataType: 'json',
    success: function (jsonData) {
        console.log('Получены данные:', jsonData);
        $('#name').val(jsonData.name);
        $('#category').val(jsonData.category);
        $('#description').text(jsonData.description);
        $('#price').val(jsonData.price);
        //todo: чек названия переменных
        let template = Handlebars.compile($('#old-images-template').html());
        $('#old-images-wrapper').html(template(jsonData.images));

        // let decodedJWT = decodeJWT(localStorage.getItem('jwt'));

    }
});