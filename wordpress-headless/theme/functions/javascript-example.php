<?php

function wordpress_theme_js()
{
    $path = get_template_directory_uri() . '/js/auto-tweet.js';
    wp_enqueue_script('admin_auto_tweet_script', $path, array('jquery'));
}
