const NUM_LEDS = 60;
var cpLinker;
var num_keyColor = 0;
var colorArray = new Array(60);





initLedButtons();

function initLedButtons(){
    var container = document.getElementById('led_buttons');
    for(i=0;i<NUM_LEDS;i++){
        var div = document.createElement('div');
        div.className = 'round_button';
        div.id = 'round_button_'+i;
        var att = document.createAttribute('keyColor');
        att.value = "false";

        div.setAttributeNode(att);

        div.addEventListener("click",isClicked);
        container.appendChild(div);

    }
}
function isClicked(){
    colorSel = document.getElementById('colorSel');
    colorSel.click();
    cpLinker = this.id;
    this.keyColor = "true";

    colorSel.addEventListener('change',changeColor);

}

function changeColor(){

    recentSel = document.getElementById(cpLinker);
    recentSel.style.background = this.value;
    num_keyColor++;

    master = document.querySelectorAll( '.round_button' );
    var i;
    var offset;

    for(i=0; i<master.length; i++){
        curr = master[i];
        if(curr.keyColor == "true"){
                if(num_keyColor > 1){
                    var currId = parseInt(recentSel.id.split("_")[2])
                    if(i != currId){
                        offset = currId - i;
                        let grad = new GradientArray();
                        var steps = Math.abs(offset)+1;

                        var stepGradient = grad.generateGradient(this.value,rgbToHex(curr.style.background),steps);

                        if(offset > 0){
                            var k;
                            for(k = 0; k<stepGradient.length; k++){
                                colorArray[currId - k] = stepGradient[k];
                                master[currId - k].style.background = stepGradient[k];
                                master[currId - k].keyColor = "true";
                                num_keyColor++;
                            }
                            i = currId + offset;
                        }
                        else if(offset < 0){
                            var k;
                            for(k = 0; k<stepGradient.length; k++){
                                colorArray[currId + k] = stepGradient[k];
                                master[currId + k].style.background = stepGradient[k];
                                master[currId + k].keyColor = "true";
                                num_keyColor++;
                            }
                        }



                    }
                }
            }
    }
}



function reset(){
    //var master = document.getElementsByClassName('round_button');
    master = document.querySelectorAll( '.round_button' );
    var i;
    for(i = 0; i < master.length; i++){
        curr = master[i];
        curr.style.background = "black";
        curr.keyColor = "false";
    }
    num_keyColor = 0;

}

function rgbToHex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
