var CANV_WIDTH = 1000;
var CANV_HEIGHT = 600;

var IMG_MOD_W = 400;

var debug_img = null;

// get the keys of the variable all_texts
var MODES = Object.keys(data);
// var MODES = ['bike_svgs', 'smiley_svgs'];
var mode_idx = 0;

// ========== BIG STACK OF GLOBAL VARS LUL ==========

// the konva layer
var layer = null;
// render a image on the canvas
function render_image(image_path, location_x, location_y, width, height) {
    console.log(image_path);

    var imageObj = new Image();
    imageObj.onload = function() {
        var image = new Konva.Image({
            x: location_x,
            y: location_y,
            image: imageObj,
            width: width,
            height: height,
            draggable: true
        });

        debug_img = image;
        layer.add(image);
        layer.draw();

    };
    imageObj.src = image_path;
}

// render a string on the canvas
function render_text(text_string, location_x, location_y, width, height, font_size=20) {
    var text = new Konva.Text({
        x: location_x,
        y: location_y,
        text: text_string,
        fontSize: font_size,
        fontFamily: 'Calibri',
        fill: 'black',
        width: width,
        height: height,
        align: 'center',
        draggable: true
    });
    layer.add(text);
    // make sure the text is always on top
    text.moveToTop();
    layer.draw();
}

// rerender all the shapes resulting from the action sequence
function render_state() {
    // clear everything
    layer.destroyChildren();

    // make the background a very light grey
    var background = new Konva.Rect({
        x: 0,
        y: 0,
        width: CANV_WIDTH,
        height: CANV_HEIGHT,
        fill: '#fafafa',
    });
    layer.add(background);

    // render the svg, first get the name of the object
    var svg_name = MODES[mode_idx];
    // the svg path is in assets/name-of-svg.svg
    var svg_path = 'assets/' + svg_name + '.svg';
    render_image(svg_path, 0, 100, IMG_MOD_W, IMG_MOD_W);

    // render the text
    var text = data[svg_name]["explanation"];
    render_text(text, IMG_MOD_W+20, 100, IMG_MOD_W, IMG_MOD_W);

    // take svg_name, replace all '1' substrings with empty
    var svg_noone = svg_name.replace(/1/g, '');
    render_text(svg_noone, 0, 40, IMG_MOD_W, 40, 40);
}



// on document ready
$(document).ready(function() {

    // add the logic on the prev/next buttons
    $('#prev').click(function() {
        if (mode_idx > 0) {
            mode_idx -= 1;
            render_state();
        }
    });
    $('#next').click(function() {
        let range_end = MODES.length;
        if (mode_idx < range_end) {
            mode_idx += 1;
            render_state();
        }
    });

    // add logic to the drawing button
    $('#drawing').click(function() {
        // switch the mode using modulo arith
        mode_idx = (mode_idx + 1) % MODES.length;
        // reset the generation index
        generation_idx = 1;
        // render the state
        render_state();
    });

    // make a new konva stage
    var stage = new Konva.Stage({
        container: 'konva-holder',
        width: CANV_WIDTH,
        height: CANV_HEIGHT,
    });

    // add a layer and add to stage
    layer = new Konva.Layer();
    stage.add(layer);

    // render state
    render_state();
});