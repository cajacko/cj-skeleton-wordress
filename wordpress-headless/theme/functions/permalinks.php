<?php

function wordpress_theme_permalinks()
{
    global $wp_rewrite;
    $wp_rewrite->set_permalink_structure('/%postname%/');
}
