//= require jquery3
//= require popper
//= require bootstrap-sprockets
$(document).ready(function () {

    $(document).on('click', '.section', function() {

        var i = $(this).index();
        $(this).attr('class', 'btn btn-success btn-sm btn-block section');
        $('.section').each(function (index, element) {
            if(index !== i - 1) {
                $(this).attr('class', 'btn btn-outline-success btn-sm btn-block section');
            }
        });

        $('#section_name_edit').val($(this).html()).attr('data-name', $(this).html());

        var section_id = $(this).attr('id');

        $('.data').attr('id', section_id);

        $.ajax({
            'url': '/items',
            'method': 'POST',
            'data': {
                section_id: section_id
            },
            success: function (response) {
                $("tbody").html(response);
            }
        });

    });

    $(document).on('click', '.edit_student', function() {
        var id = $(this).parent().attr('id');

        $('#student-form').modal('toggle');

        $('.modal-title').html('Edit Details');
        $('#add_data').attr('id', 'edit_data');

        $.ajax({
            'url': '/student',
            'method': 'POST',
            'data': {
                id: id
            },
            success: function (response) {
                $('#email_add').val(response.email);
                $('#name_add').val(response.name);
                $('#gpa_add').val(response.gpa);
            }
        });
    });

    $(document).on('click', '#add_button', function() {
        $('.modal-title').html('Add Details');
        $('#email_add').val('');
        $('#name_add').val('');
        $('#gpa_add').val('');

        $('#edit_data').attr('id', 'add_data');
    });
});