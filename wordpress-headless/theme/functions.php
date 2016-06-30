<?php

if (!session_id()) {
    session_start();
}

// Examples
require_once('functions/javascript-example.php');

// Require
require_once('functions/media.php');
require_once('functions/permalinks.php');
require_once('functions/filters.php');
require_once('functions/hooks.php');
require_once('functions/init.php');
