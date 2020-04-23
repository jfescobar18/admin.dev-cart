function EnableDevTools() {
    return window.config.EnableDevTools;
}

function APIUrl() {
    return window.config.APIUrl;
}

function formatMoney(amount, decimalCount = 2, decimal = '.', thousands = ',') {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? '-' : '';

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        var formattedAmount = '$' + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');
        return formattedAmount;
    } catch (e) {
        console.log(e)
    }
}

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

function animInputs() {
    $('.input-file').each(function () {
        var $input = $(this),
            $label = $input.next('.js-labelFile'),
            labelVal = $label.html();

        $input.on('change', function (element) {
            var fileName = '';
            if (element.target.value) fileName = element.target.value.split('\\').pop();
            fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
        });
    });
}

function showLoader() {
    var loader = document.getElementById('loader');
    loader.className += ' displayed';
}

function hideLoader() {
    var loader = document.getElementById('loader');
    loader.className = loader.className.replace(/\bdisplayed\b/g, '');
}

function error_swal(title, message) {
    swal({
        icon: "error",
        title: title,
        text: message
    });
}

function warning_swal(title, message) {
    swal({
        icon: "info",
        title: title,
        text: message
    });
}

function succes_swal(title, message) {
    swal({
        icon: "success",
        title: title,
        text: message
    });
}