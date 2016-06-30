<?php

$url = 'http://test.local.com:81/wp-json/wp/v2/posts/';

$fields = array(
    'key' => urlencode('4mjhgNw6lRIi'),
    'secret' => urlencode('mFB7LREynUy67pedHA95D5Pt7Ftv871QLAGipXUhCnBKcok7'),
);

$fields_string = '';

//url-ify the data for the POST
foreach ($fields as $key => $value) {
    $fields_string .= $key.'='.$value.'&';
}

rtrim($fields_string, '&');

//open connection
$ch = curl_init();

//set the url, number of POST vars, POST data
curl_setopt($ch, CURLOPT_URL, $url);
// curl_setopt($ch, CURLOPT_POST, count($fields));
// curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);

//execute post
$result = curl_exec($ch);

//close connection
curl_close($ch);
