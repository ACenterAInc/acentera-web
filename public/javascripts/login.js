//We should be using Ember but it was easier to have ember only for the Application,
//and for login pages not using any ember for now since it was done prior the use of ember


var _gaq=_gaq||[];_gaq.push(['_setAccount','UA-34138073-2']);_gaq.push(['_trackPageview']);(function(){var ga=document.createElement('script');ga.type='text/javascript';ga.async=true;ga.src=('https:'==document.location.protocol?'https://ssl':'http://www')+'.google-analytics.com/ga.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga,s);})();




if (prefix == undefined) {
    var prefix = "/";
}


var successFn = function(data) {

	cleanRegisterAlert();
        if(data == "true"){
            $('#register-alert-box').html('');
            $("#register-alert-box").append('<strong>Error! &nbsp;</strong>Email Id Already exist '+ '</div>');

            $("#regemail").removeClass("success");
            $("#regemail").addClass("error");

            $("#register-alert-box").addClass('alert-danger');
        }
        else{
            $('#register-alert-box').html('');
	        $("#register-alert-box").addClass("alert-success");
            $("#register-alert-box").append('<strong>Success! &nbsp;</strong>Valid Email Id '+ '</div>');

            $("#regemail").removeClass("error");
            $("#regemail").addClass("success");
        }

};

var errorFn = function(err) {

}


function cleanRegisterAlert() {
         $('#register-alert-box').removeClass("alert-info");
         $('#register-alert-box').removeClass("alert-danger");
         $('#register-alert-box').removeClass("alert-success");
         $('#register-alert-box').removeClass("alert-primary");
         $('#register-alert-box').removeClass("alert-success");
         $('#register-alert-box').html('');
}

function cleanLoginAlert() {

         $('#login-alert-box').removeClass("alert-info");
         $('#login-alert-box').removeClass("alert-danger");
         $('#login-alert-box').removeClass("alert-success");
         $('#login-alert-box').removeClass("alert-primary");
}



var successMustExistFn = function(data) {
  cleanLoginAlert();
  if(data == "false"){
     $('#login-alert-box').html('');
     $('#login-alert-box').addClass("alert-danger");
     $("#login-alert-box").append('<strong>Error! &nbsp;</strong>Email does not exist '+ '</div>');

     $("#email").removeClass("success");
     $("#email").addClass("error");

  }  else  {
     $('#login-alert-box').html('');
     $("#login-alert-box").append('<strong></strong> '+ '</div>');

     $("#email").removeClass("error");
     $("#email").addClass("success");
  }

};


var ajax2 = {
    success: successFn,
    error: errorFn
}


var ajax1 = {
    success: successMustExistFn,
    error: errorFn
}

function isEmailExist(obj, async) {
    var val = obj.value;

    if (async == undefined) {
       as = true;
    } else {
       as = false;
    }

    //TODO: We should remove the ajax call and just use a email validator using javascript..
    var resp = false;
    if (isValidEmailAddress(val)) {
          $.ajax({
          url: prefix + "validate/email/" + val,
          async:   as,
          context: document.body,
          success: successMustExistFn,
          error: errorFn,
          });
    } else {
         $('#login-alert-box').html('');
         $("#login-alert-box").append('<strong>Error! &nbsp;</strong>Invalid email format '+ '</div>');

         cleanLoginAlert();
             $("#email").removeClass("success");
             $("#email").addClass("error");
         $('#login-alert-box').addClass("alert-danger");
    }
}


function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
            // alert( pattern.test(emailAddress) );
            return pattern.test(emailAddress);
};





function isEmailNotExist(obj, async) {
    var val = obj.value;
    cleanRegisterAlert();

    if (async == undefined) {
       as = true;
    } else {
       as = false;
    }

    var resp = false;
    if (isValidEmailAddress(val)) {
          $.ajax({
          url: prefix + "validate/email/" + val,
          async:   as,
          context: document.body,
          success: successFn,
          error: errorFn,
          });
    } else {

         cleanRegisterAlert();

         $("#register-alert-box").append('<strong>Error! &nbsp;</strong>Invalid email format</div>');


        $("#regemail").removeClass("success");
             $("#regemail").addClass("error");
            $('#register-alert-box').addClass("alert-danger");
    }
}



        function toregister() {
            $('#register').addClass('animate').removeClass('hidden');
            $('#login').addClass('animate').removeClass('hidden');
        }

        function tologin() {
             $('#register').addClass('animate').removeClass('hidden');
             $('#login').addClass('animate').removeClass('hidden');
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


        function checkCaptcha() {

                if ( $("#recaptcha_response_field").is(':disabled') ) {

                } else {
                    var data = {
                        challenge: $('#recaptcha_challenge_field')[0].value,
                        captcha: $('#recaptcha_response_field')[0].value
                    }

                    $.post(prefix + 'validateCaptcha/', data, function(response) {
                            if (response.success) {
                                $("#recaptcha_response_field").addClass("success").removeClass("error");
                                $("#recaptcha_response_field").prop('disabled', true);
                            } else {
                                $("#recaptcha_response_field").addClass("error").removeClass("success");

                                $("#recaptcha_response_field").text("");
                                $("#recaptcha_reload").click();
                                setTimeout(function() {
                                    $('#recaptcha_reload').click();
                                }, 800);
                            }

                    }, 'json');
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
                $('#' + field1.id).addClass('error').removeClass('success');
	            $('#register-alert-box').addClass('alert-danger');
	            $('#register-alert-box').html('Typed passwords does not match.');
            }
        }

        function submitLoginForm( email, password) {
            //TODO: Generate a public key value based on a random value that Play would generate in the html?

            var token = "";
            //Encrypt the Password using the Token

            var formValid = false;

            formValid = true;
            formValid = true;


            $('#register-alert-box').hide();
            isEmailExist(email,1);
            if ( !  $("#email").hasClass('success') ) {
                return;
            }

            passwordValidate(password);

	        if (! $("#password").hasClass('success') ) {
		        return;
	        }


            if (formValid) {

                var data = {
                    email: email.value ,
                    password: password.value
                }

                $.post(prefix + 'authenticate', data, function(response) {
                    // Do something with the request

                    //console.log(response);
                    if (response.success) {
                        $('#login-alert-box').html('authenticated');
                        $('#login-alert-box').addClass('alert-success');

                        try {
                            var oldUrl = window.location.hash;
                            if ((oldUrl == "") || (oldUrl == undefined)) {
                                if (("" + document.location.href).indexOf("/admin") > 0) {
                                    document.location.href = "/admin/";
                                    return;
                                } else {
                                    document.location.href = prefix;
                                    return;
                                }
                                document.location.href = prefix;
                                return;
                            } else {
                               if (oldUrl.indexOf('/') >= 0) {
                                   document.location.href = prefix;
                                   //document.location.href = prefix + oldUrl;
                                   return;
                               } else {
                                 document.location.href = prefix;
                                 return;
                               }
                           }
                       } catch (ee) {
                            if (("" + document.location.href).indexOf("/admin") > 0) {
                                document.location.href = "/admin/";
                            } else {
                                document.location.href = prefix;
                            }
                       }
                    } else {
                        $('#login-alert-box').html( response.message );
                        $('#login-alert-box').addClass('alert-danger');
                        $("#password").addClass('error');
                    }


                }, 'json');

            }

        }



        function submitForm( regemail, regpassword, confirm, captchafield, captcharesp) {
            cleanRegisterAlert();
            $("#btnRegister").attr('disabled', 'disabled');
            $("#btnRegister").text('Processing...');
            var formValid = false;

            formValid = true;


       	    $('#register-alert-box').hide();
	        isEmailNotExist(regemail,1);
	        if ( !  $("#regemail").hasClass('success') ) {
		        $("#btnRegister").text('Register');
	            $("#btnRegister").attr('disabled', null);
       	        $('#register-alert-box').show();
		        return;
            }
	        passwordCompare($("#passwordsignup_confirm")[0], $('#regpassword')[0]);
	        if ( !  $("#passwordsignup_confirm").hasClass('success') ) {
		        $("#btnRegister").text('Register');
	            $("#btnRegister").attr('disabled', null);
       	        $('#register-alert-box').show();
		        return;
	        }

	        if ( !  $("#regpassword").hasClass('success') ) {
		        $("#btnRegister").text('Register');
	            $("#btnRegister").attr('disabled', null);
       	        $('#register-alert-box').show();
		        return;
	        }
       	    $('#register-alert-box').show();




            formValid = true;
            if (formValid) {

                var data = {
                        jsonemail: regemail.value,
                        password: regpassword.value,
                        confirm: confirm.value,
                        challenge: captchafield.value,
                        captcha: captcharesp.value
                      }

                $.post(prefix + 'createAccount/' + regemail.value + '', data, function(response) {
                    // Do something with the request

                    if (response.success) {
				        $("#btnRegister").text('Success...');
                        var data = {
                            email: regemail.value,
                            password: regpassword.value
                        }
                        $('#register-alert-box').html('Account  created successfully. Login in..');
                        $('#register-alert-box').addClass('alert-success');

				        setTimeout(function() {
                                  $.post(prefix + 'authenticate', data, function(response) {
                                    // Do something with the request

                                    if (response.success) {
                                        $('#login-alert-box').html('');

                                        setTimeout(function() {
                                            var oldUrl = window.location.hash;
                                            if ((oldUrl == "")) {
                                                document.location.href = prefix;
                                             } else {
                                                if (oldUrl.indexOf('/') >= 0) {
                                                    document.location.href = prefix + oldUrl;
                                                } else {
                                                    document.location.href = prefix;
                                                }
                                             }
                                        }, 100);
                                    } else {
	                                    document.location.href = prefix + 'login';
                                    }
                                   });
				        }, 500);

                    } else {
				        $("#btnRegister").text('Register');
			            $("#btnRegister").attr('disabled', null);

                        $("#recaptcha_reload").click();

                          if (response.code == "CAPTCHA_001") {
                                $('#register-alert-box').html('');
                                $("#recaptcha_response_field").addClass("error").removeClass("success");
                          } else {
                                $('#register-alert-box').html('');
                                $('#register-alert-box').addClass("error");
                                $("#register-alert-box").append('<div>' + ' ' + response.message + ' </div>');
                          }
                    }
                }, 'json');


            }
        }




//Animation setup functions on keypress login / register
$(document).ready(function() {
         var fullUrl = document.URL.split('#')[0];
         var section = document.URL.split('#')[1];


         if (section == undefined) {
               if (fullUrl.indexOf('login')) {
                    $('#login').removeClass('hidden');
               } else {
                    $('#register').removeClass('hidden');
               }

         } else if (section == "tologin") {
               $('#login').addClass('animate').removeClass('hidden');
         } else if (section == "toregister") {
                $('#register').addClass('animate').removeClass('hidden');
         } else {
            $('#login').addClass('animate').removeClass('hidden');
         }

         setTimeout( function () { $("#register-alert-box").html(''); $("#login-alert-box").html('');cleanLoginAlert();cleanRegisterAlert(); }, 3000);


         $("#recaptcha_response_field").blur(function() {
             $(this).removeClass('error');
             //   checkCaptcha();
         });



        function tryLogin() {
                    passwordValidate($('#password')[0]);

                    $('#loginBtn').focus();

                     setTimeout( function() {
                        submitLoginForm( $('#email')[0], $('#password')[0] );
                     }, 300);
        }

        setTimeout(function() {
            $('#password').keypress(function (e) {
                if (e.which == 13) {
                    tryLogin();
                    return false;
                }
            });
        }, 1000);


});


//Aninmations
 $(document).ready(function() {
    var activeForm = window.location.hash + ' > form';

	if (activeForm == '#signup > form') {
		$("#login").removeClass("active");
		$("#forgot").removeClass("active");
		$("#signup").addClass("animate");
		$("#signup").addClass("active");
		$("#signup > form").addClass('magictime swap');

		setTimeout(function() {
          $("#signup > form").removeClass('magictime swap');
        }, 300);

	} else if (activeForm == '#login > form')  {
		$("#signup").removeClass("active");
		$("#forgot").removeClass("active");
		$("#login").addClass("animate");
		$("#login").addClass("active");
		$("#login > form").addClass('magictime swap');

			setTimeout(function() {
          $("#login > form").removeClass('magictime swap');
        }, 300);

    } else if (activeForm == '#forgot > form')  {
		$("#signup").removeClass("active");
		$("#login").removeClass("active");
		$("#forgot").addClass("animate");
		$("#forgot").addClass("active");
		$("#forgot > form").addClass('magictime swap');

		setTimeout(function() {
          $("#forgot > form").removeClass('magictime swap');
        }, 300);

	} else {
		$("#signup").removeClass("active");
		$("#forgot").removeClass("active");
		$("#login").addClass("active");
        $("#login > form").addClass('magictime swap');

        setTimeout(function() {
          $("#login > form").removeClass('magictime swap');
        }, 300);
	}
    //set timer to 1 seconds, after that, unload the magic animation


    $('.list-inline li > a').click(function() {
        var activeForm = $(this).attr('href') + ' > form';
        if ($(this).attr('href') == '#signup') {
            $("#login").removeClass("active");
            $("#forgot").removeClass("active");
            $("#signup").addClass("animate");
            $("#signup").addClass("active");
        } else if ($(this).attr('href') == '#login')  {
            $("#signup").removeClass("active");
            $("#forgot").removeClass("active");
            $("#login").addClass("animate");
            $("#login").addClass("active");
        } else if ($(this).attr('href') == '#forgot')  {
            $("#signup").removeClass("active");
            $("#login").removeClass("active");
            $("#forgot").addClass("animate");
            $("#forgot").addClass("active");
        }

        $(activeForm).addClass('magictime swap');

        //set timer to 1 seconds, after that, unload the magic animation
        setTimeout(function() {
              $(activeForm).removeClass('magictime swap');
            }, 1000);
     });
});