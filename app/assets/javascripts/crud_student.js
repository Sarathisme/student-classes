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
                'url': '/students/delete',
                'method': 'POST',
                'data': {
                    'section_id': section_id,
                    'id': id
                },
                success: function (data, text, status) {
                    if(data.param === 'success') {
                        element.parent().parent().remove();
                    }else{
                        appendAlerts(data.msg);
                    }
                },
                error: function (data, text, status) {
                    appendAlerts(data)
                }
            });
        }
    });

    $(document).on('click', '#add_data', function (message) {
        var section_id = $('.data').attr('id');

        var name = $('#name_add').val();
        var email = $('#email_add').val();
        var gpa = $('#gpa_add').val();

        if(isNaN(parseInt(section_id))){
            appendAlerts("Enter a section");
        } else {

            $.ajax({
               'url': '/students/add',
               'method': 'POST',
               'data': {
                   section_id: section_id,
                   email: email,
                   name: name,
                   gpa: gpa
               },
                success: function(response) {
                   if(response.param === 'success') {
                       var row = '<tr class="list-group-item-action" id=' + response.msg.id + ' data-toggle="modal" data-target="#student-form">\n' +
                           '      <th scope="row" class="text-center edit_student">' + response.msg.id + '</th>\n' +
                           '      <td class="text-center name edit_student">' + response.msg.name + '</td>\n' +
                           '      <td class="text-center email edit_student">' + response.msg.email + '</td>\n' +
                           '      <td class="text-center gpa edit_student">' + response.msg.gpa + '</td>\n' +
                           '      <td class="text-center"><a href=\'#\' class="fas fa-trash"></a></td>\n' +
                           '    </tr>';
                       $('tbody').append(row);
                       $('#student-form').modal('toggle');
                   } else {
                        appendAlerts("Student exists!");
                   }
                },
                error: function (response) {
                    console.log(response);
                    appendAlerts(response);
                }
            });
        }
    });

    $(document).on('click', '#edit_data', function(){
        var email = $('#email_add').val();
        var name = $('#name_add').val();
        var gpa = $('#gpa_add').val();

        $.ajax({
           'url': '/students/edit',
           'method': 'POST',
           'data': {
               'email': email,
               'name': name,
               'gpa': gpa
           },
           success: function(response) {
               if(response.param === 'success'){
                   const student = $('tbody').find('tr').filter('#' + response.msg.id);
                   console.log(student, response);
                   student.find('th').html(response.msg.id);
                   student.find('.name').html(response.msg.name);
                   student.find('.email').html(response.msg.email);
                   student.find('.gpa').html(response.msg.gpa);
               } else {
                   appendAlerts(response.msg);
               }
           }, error: function (response) {
                appendAlerts(response.msg);
            }
        });
    });
});

function appendAlerts(message) {

    var alert = '<div class="alert alert-warning alert-dismissible fade show" role="alert">\n' +
        '  <strong>Holy guacamole!</strong> You should check in on some of those fields below.\n' +
        '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
        '    <span aria-hidden="true">&times;</span>\n' +
        '  </button>\n' +
        '</div>';

    $('#alerts').append(alert);
}