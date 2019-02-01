//= require jquery3
//= require popper
//= require bootstrap-sprockets
$(document).ready(function(){

    $(document).on('click', '#delete_section', function(event) {
        var section_id = $('.data').attr('id');
        $.ajax({
            'url': '/classes/delete',
            'method': 'POST',
            'data': {
                id: section_id
            },
            success: function (response) {
                $('#groups #' + section_id).remove();
                const next_button = get_next_button(section_id);
                if(next_button !== -1){
                    next_button.attr('class', 'btn btn-success btn-sm btn-block section');
                    next_button.click();
                } else {
                    $('#section_name_edit').val('').attr('data-name', '');
                    $('.data').attr('id', '');
                }
            },
            error: function (response) {
                alert(response);
            }
        });
    });

    $(document).on('click', '#save_section', function() {
        const name = $('#name_section').val();
        const groups = $('#groups');

        $.ajax({
            'url': '/classes/add',
            'method': 'POST',
            'data': {
                name: name
            },
            success: function(response) {
                groups.append('<button id="'+ response.msg +'" type="button" class="btn btn-success btn-sm btn-block section">'+ response.param +'</button>');
                groups.find('button').filter('#' + response.msg.toString()).click();
            }
        });
    });

    $(document).on('click', '#section_name_save', function() {
        input_field = $('#section_name_edit');
        const name = input_field.val();
        const old = input_field.attr('data-name');
        if(name.length > 1) {
            $.ajax({
                'url': '/classes/edit',
                'method': 'POST',
                'data': {
                    old: old,
                    new: name
                },
                success: function (response) {
                    console.log(response);
                    input_field.attr('data-name', name);
                    get_button(response.msg).html(name);
                },
                error: function (response) {
                    alert(response);
                }
            });
        }
    });
});

function get_button(id) {
    return $('#groups').find('button').filter('#' + (parseInt(id)).toString());
}

function get_next_button(id) {
    var button = $('#section_add_button').next();
    console.log("Here", button);
    if(button.length) {
        return button;
    }

    return -1;
}