$(document).ready(function() {
    $('#free-checkbox').on("click", function () {
        let price = $('#price');
        if (!$('#free-checkbox').prop('checked')) {
            price.prop('disabled', false);

            price.val(' ')
            $('#price').show();
            $('#price-label').show();
        } else {
            price.prop('disabled', true);
            price.val('0')

            console.log(price.val())
            $('#price').hide();
            $('#price-label').hide();

        }
    });
});