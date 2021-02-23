<?php

//var_dump("abc"); exit();
if(isset($_POST['email_exists_check'])){
    $email = $_POST['email'];
    if($email === "robinhtoo@gmail.com"){

        resp_text('false');
    }
    else{
        resp_text('true');
    }
}

if(isset($_POST['email_host_check'])){
    $email  = $_POST['email'];
//    var_dump($_POST);exit();
//    var_dump(strpos($email, "xyz.com"));exit();
//    echo strpos($email,"@xyz.com"); exit();
//    echo preg_match("/@xyz.com/i", $email); exit();
    if(strpos($email,"@xyz.com") !== false){
        resp_json(["isValid" => false], 200);
    }
    else{
        resp_json(["isValid" => true], 200);
    }


}


if(isset($_POST['btnSubmit'])){

    resp_json(['status' => 'success', 'message' => 'Form successfully submitted'], 200);

}


function resp_json($data = [], $httpStatus = 200)
{
    http_response_code($httpStatus);
    header("content-type:application/json; charset=utf-8");
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK);
}

function resp_text($data, $httpStatus = 200)
{
    http_response_code($httpStatus);
    header("content-type:text/plain; charset=utf-8");
    echo $data;
}


