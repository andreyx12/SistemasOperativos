
var home = {

    initNav:() => {
        /*  Inicializar barra lateral del menú */
        $('.sidenav').sidenav({
            preventScrolling: true,
            draggable: true
        });
        /*  Inicializar barra lateral */
        $('.sidenav-section').sidenav({
            edge: 'right'
        });
        /*  Inicializar autocompletar */
        $('input.autocomplete').autocomplete({
            data: {
              "Apple": null,
              "Microsoft": null,
              "Google": 'https://placehold.it/250x250'
            },
            onAutocomplete: function(txt) {
                console.log(txt);
            }
        });
    },

    convertLocalDateToUTCDate:(date, toUTC) => {
        /*  Convierte hora local a UTC */
        date = new Date(date);
        var localOffset = date.getTimezoneOffset() * 60000;
        var localTime = date.getTime();
        if (toUTC) {
            date = localTime + localOffset;
        } else {
            date = localTime - localOffset;
        }
        date = new Date(date);
        return date;
    },

    onFinish:() => {
        console.log("finished")
    },

    onClick:() => {
        alert("hola")
        socket.emit("message", "valor de prueba");
    },

    getServerTime:() => {
        var time = null; 
        $.ajax({url: '/getServerTimeZone', 
            async: false,
            dataType: 'text',
            success: function(text) {
                time = new Date(text);
            }, error: function(http, message, exc) { 
                time = new Date(); 
        }});
        return time;
    },

    initClocksInPartials:() => {

        $($(".param-class")).each(function() {

            var endDate = $(this).val();
            var elementNameId = $(this).attr('name');
            
            $('.' + elementNameId).countdown({
                until: home.convertLocalDateToUTCDate(endDate, true),
                layout: 'Restante: {d<}{dn} {dl} {d>}'+ 
                '{hn} {hl} {mn} {ml} y {sn} {sl}',
                serverSync: home.getServerTime,
                onExpiry: home.onFinish,
                expiryText: 'Tiempo finalizado'
            });
        });
    },

    initMainFlow:() => {
        home.initNav();
        home.initClocksInPartials();
    }
}

$(document).ready(function(){
    home.initMainFlow();
});