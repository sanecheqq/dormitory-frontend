const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
$.ajax({
    url: 'http://localhost:8070/market/products/' + productId,
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
        // console.log(template);
        $('#old-images-wrapper').append(template(jsonData));

        // let decodedJWT = decodeJWT(localStorage.getItem('jwt'));

    }
});