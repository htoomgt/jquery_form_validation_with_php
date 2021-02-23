let emailHostResp = "";
$(document).ready(function(){
    // alert("Hello, this is jquery document ready!");
    $("#signupForm").validate({
        submitHandler: function(){
            $("#signupForm").ajaxSubmit({
                url : "formSubmit.php",
                type : "POST",
                success : function(resp){
                    Swal.fire({
                        title: "Good job!",
                        text: resp.message,
                        icon: "success",
                        confirmButtonText: "Cool, great!",
                    });
                }
            });
        },
        rules: {
            exampleInputEmail : {
                required: true,
                email: true,
                remote : {
                    url : "formSubmit.php",
                    type : "POST",
                    data : {
                        email_exists_check : "true",
                        email : function(){
                            return $("#exampleInputEmail").val();
                        },
                    }
                },
                emailHost : true,
                abcCheck : true,

            },
            exampleInputPassword : {
                required: true,
                minlength: 8
            },
            exampleInputConfirmPassword : {
                required: true,
                minlength: 8,
                equalTo : '#exampleInputPassword'
            }

        },
        messages:{
            exampleInputEmail : {
                required: "Please enter an email address",
                email: "Please enter valid format email address",
                remote : "Email address already exists",
                emailHost : "xyz.com Host is not allowed to signup here"
            },
            exampleInputPassword : {
                required: "Please enter password",
                minLength: "Please enter password with min 8 characters"
            },
            exampleInputConfirmPassword : {
                required: "Please enter confirm password",
                minLength: "Please enter password with min 8 characters",
                equalTo : 'Please enter same value as above'
            },
        }
    });

    $.validator.addMethod("emailHost", function(value, element){

        let dataToPost = {
            email_host_check : true,
            email : value,
        };
        $.ajax({
            url : "formSubmit.php",
            method : "POST",
            data : dataToPost,
            success : function(resp){
                // console.log(resp);
                emailHostResp = resp;

            },
            error : function(resp){
                console.log(resp);
            }
        }).done(function(resp){
            // emailHostResp = resp;

        });
        // console.log(data.responseJSON);
        // console.log(emailHostResp.isValid);
        return emailHostResp.isValid;
    });

    $.validator.addMethod("abcCheck",
        function(value, element){
            if(value === "abc@abc.com"){
                return false;
            }
            else{
                return true;
            }
        },
        "abc@abc.com is not allowed to text here"
    );
});

function debounce(fn, delay) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}