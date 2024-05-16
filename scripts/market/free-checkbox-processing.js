$(document).ready(function() {
    $('#free-checkbox').on("click", function () {
        let priceFrom = $('#price-from');
        let priceTo = $('#price-to');
        if (!$('#free-checkbox').prop('checked')) {
            priceFrom.prop('disabled', false);
            priceTo.prop('disabled', false);

            priceFrom.val(' ')
            priceTo.val(' ')
            $('.price-inputs-wrapper').show();
            $('.price-label').show();
        } else {
            priceFrom.prop('disabled', true);
            priceTo.prop('disabled', true);
            priceFrom.val('0')
            priceTo.val('0')

            $('.price-inputs-wrapper').hide();
            $('.price-label').hide();

        }
    });
});