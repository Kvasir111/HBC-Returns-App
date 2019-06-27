<?php


class sendMail{

    function __construct(){
        //constructor
    }
    function sendEmail($customerFirst, $customerLast, $recipient){
        $subject = "Thank you for Returning your equipment to HBC ".$customerFirst.$customerLast;
        $body = "Attached is your copy of your return information, thank you for visiting HBC!";

        $headers = "From: JasonStatham@hbci.com". "\r\n";
        mail($recipient,$subject, $body, $headers);
    }
}