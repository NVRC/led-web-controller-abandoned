<?php

    //Node.js would be a good alternative to this tedious php workflow

    $command = escapeshellcmd('python /var/www/led-web-controller/python/led_output.py  123');
    $output = shell_exec($command);
    echo $output;

    /*
    $colorArray = array();
    $NUM_LEDS = 60;

    for($i = 0; $i < $NUM_LEDS; $i++){
        $colorArray[] = $_POST[$i];
    }
    */






?>
