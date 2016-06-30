<?php

add_action('after_setup_theme', 'wordpress_theme_setup');
add_action('admin_enqueue_scripts', 'wordpress_theme_enqueue_js');
add_action('init', 'wordpress_theme_init');
