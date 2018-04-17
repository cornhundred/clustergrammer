var m3 = require('./mat3_transform');
var color_to_rgba = require('./color_to_rgba');
var color_table = require('./color_table.js');

module.exports = function make_viz_aid_tri_args(regl, params, inst_rc){

  /*

  Hacking Categories Plan
  ------------------------
  Make a buffer of vec4's that will pass rgba data for the different category
  colors. Then pass this as an attribute (or varying?) to the fragment shader.

  */

  // var inst_rgba = color_to_rgba('#ff0000', 0.5);
  var inst_rgba = color_to_rgba('purple', 0.95);

  var color_names = _.keys(color_table);

  var num_labels = params['num_'+inst_rc];

  var row_width = 0.025;
  var row_height = 1/num_labels;

  var zoom_function = function(context){
    return context.view;
  };

  /////////////////////////////////
  // Label Offset Buffer
  /////////////////////////////////

  var x_offset = -0.5 - row_width;

  var y_offset_array = [];
  for (var i = 0; i < num_labels; i++){
    y_offset_array[i] = 0.5 - row_height/2 - i * row_height;
  }

  const y_offset_buffer = regl.buffer({
    length: num_labels,
    type: 'float',
    usage: 'dynamic'
  });

  y_offset_buffer(y_offset_array);

  var scale_y = m3.scaling(2, 1);

  var rotation_radians;
  if (inst_rc === 'row'){
    rotation_radians = 0;
  } else if (inst_rc === 'col'){
    rotation_radians = Math.PI/2;
  }

  /////////////////////////////////
  // Label Color Buffer
  /////////////////////////////////

  var color_arr = [];
  for (var i = 0; i < num_labels; i ++){
    inst_color = color_names[i];
    color_arr[i] = color_to_rgba(inst_color, 1);
  }

  console.log(color_arr)

  var mat_rotate = m3.rotation(rotation_radians);

  var args = {

    vert: `
      precision highp float;
      attribute vec2 ini_position;
      attribute float y_offset_att;

      uniform mat3 mat_rotate;
      uniform mat3 scale_y;
      uniform mat4 zoom;
      uniform float x_offset_uni;

      varying vec3 new_position;
      varying vec3 vec_translate;

      void main () {

        new_position = vec3(ini_position, 0);

        vec_translate = vec3(x_offset_uni, y_offset_att, 0);


        // rotate translated triangles
        new_position = mat_rotate * ( new_position + vec_translate ) ;

        /*
          need to stretch column viz_aid_triangles in y direction
        */

        // depth is being set to 0.45
        gl_Position = zoom * vec4( vec2(new_position), 0.45, 1);

      }
    `,

    frag: `

      precision mediump float;
      uniform vec4 triangle_color;

      // color triangle red
      void main () {
        // gl_FragColor = vec4(0.6, 0.6, 0.6, opacity_vary);
        gl_FragColor = triangle_color;
      }

    `,

    // passing a fixed value for the triangle position
    attributes: {
      ini_position: [
        [row_width,  row_height/2],
        [row_width/2,  0.0],
        [row_width, -row_height/2],
      ],

      // pass y_offset_att buffer
      y_offset_att: {
        buffer: y_offset_buffer,
        divisor: 1
      }
    },

    uniforms: {
      zoom: zoom_function,
      mat_rotate: mat_rotate,
      scale_y: scale_y,
      x_offset_uni: x_offset,
      triangle_color: inst_rgba
    },

    count: 3,
    instances: num_labels,
    depth: {
      enable: true,
      mask: true,
      func: 'less',
      // func: 'greater',
      range: [0, 1]
    },

  };

  return args;

};