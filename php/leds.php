<?php
$colorArray[];
$NUM_LEDS = 60;

for($i = 0; $i < NUM_LEDS; i++){
    $colorArray[] = ($_POST[i]);
}



$command = escapeshellcmd('/var/www/led-web-controller/python/led_output.py '.$colorArray);
$file_handle = fopen('sharedmem.txt','w+');
fwrite($file_handle,"Before exec");
fclose($file_handle);
$output = shell_exec($command);
echo $output;




?>
