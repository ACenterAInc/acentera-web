//We should be using Ember but it was easier to have ember only for the Application,
//and for login pages not using any ember for now since it was done prior the use of ember

function cleanRegisterAlert() {
         $('#register-alert-box').removeClass("alert-danger");
         $('#register-alert-box').removeClass("alert-success");
         $('#register-alert-box').removeClass("alert-primary");
         $('#register-alert-box').removeClass("alert-success");
         $('#register-alert-box').html('');
}


function passwordValidate(field, comp) {
    $('#register-alert-box').removeClass("alert-success");
    if (field.value.length >= 2) {
        $('#' + field.id).addClass('success').removeClass('error');
    } else {
        $('#' + field.id).addClass('error').removeClass('success');
    }
    if (comp) {
      cleanRegisterAlert();
      if ( comp[0].value.length >= 1 ){
        passwordCompare(comp[0], $('#regpassword')[0])
      }
    }

}

function passwordCompare(field1, field2) {
    cleanRegisterAlert();
    $('#register-alert-box').removeClass("alert-success");

    //console.log(field1.value+ ' vs ' + field2.value);
    if (field1.value == field2.value) {
        if (field2.value == undefined) {
                $('#' + field2.id).addClass('error').removeClass('success');
                $('#register-alert-box').addClass('alert-danger');
                $('#register-alert-box').html('Typed passwords does not match.');
        } else {
                $('#' + field1.id).addClass('success').removeClass('error');
                $('#register-alert-box').html('');
                cleanRegisterAlert();
        }
    } else {

        $('#register-alert-box').html('');
//                $("#register-alert-box").append('<div>' + '<a data-dismiss="alert">Ã/a>  Password does not match </div>');

        $('#' + field1.id).addClass('error').removeClass('success');
        $('#register-alert-box').addClass('alert-danger');
        $('#register-alert-box').html('Typed passwords does not match.');
    }
}


function submitForm( regpassword, confirm) {
    cleanRegisterAlert();
    $("#btnRegister").attr('disabled', 'disabled');
    $("#btnRegister").text('Processing...');
       var formValid = false;

        formValid = true;

     $('#register-alert-box').hide();
     passwordCompare($("#passwordsignup_confirm")[0], $('#regpassword')[0]);
     if ( !  $("#passwordsignup_confirm").hasClass('success') ) {
        $("#btnRegister").text('Change Password & Sign in');
        $("#btnRegister").attr('disabled', null);
        $('#register-alert-box').show();
        return;
     }

     if ( !  $("#regpassword").hasClass('success') ) {
        $("#btnRegister").text('Change Password & Sign in');
        $("#btnRegister").attr('disabled', null);
        $('#register-alert-box').show();
        return;
     }
     $('#register-alert-box').show();




    formValid = true;
    if (formValid) {

        var data = {
                token: $("#token")[0].value,
                new_token: $("#new_token")[0].value,
                password: regpassword.value,
                confirm: confirm.value,
              }

        $.post('/recoveremail', data, function(response) {

                if (response.success) {
                        $("#btnRegister").text('Success...');

                        var data = {
                             email: response.email,
                             password: regpassword.value
                        }


                        $.post('/authenticate', data, function(response) {
                                // Do something with the request

                                if (response.success) {
                                    $('#register-alert-box').addClass('alert-success');
                                    $('#register-alert-box').html('Logged in.');
                                    setTimeout(function() { document.location.href = '../' }, 500 );
                                } else {
                                        //response = {"success":false,"code":"CAPTCHA_001","message":"Invalid captcha"}
                                        $('#register-alert-box').addClass('alert-error');
                                        $('#login-alert-box').html('An error occured while loggin in.');
                                        setTimeout(function() { document.location.href = '../' }, 500 );
                                }
                        }, 'json');

                } else {
        $('#register-alert-box').show();
        $('#register-alert-box').html('Token has been expired.');
        $('#register-alert-box').addClass("error");
        setTimeout(function() {
                               document.location.href = '/';
                        }, 5000);


                }


        }, 'json');


    }
}


