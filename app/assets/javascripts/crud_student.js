//= require jquery3
//= require popper
//= require bootstrap-sprockets
$(document).ready(function() {
    $(document).on('click', '.fas', function() {
        var confirmation = confirm("Are you sure?");
        var element = $(this);

        if(confirmation) {
            var section_id = $('.data').attr('id');
            var id = element.parent().prev().prev().prev().prev().html();

            $.ajax({
                'url': '/delete',
                'method': 'POST',
                'data': {
                    'section_id': section_id,
                    'id': id
                },
                success: function (data, text, status) {
                    element.parent().parent().remove();
                },
                error: function (data, text, status) {
                    alert(data);
                }
            });
        }
    });


});