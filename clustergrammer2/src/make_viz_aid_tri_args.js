var m3 = require('./mat3_transform');

module.exports = function make_viz_aid_tri_args(regl, params, inst_rc){

  var num_rows = params['num_'+inst_rc];

  var row_width = 0.025;
  var row_height = 1/num_rows;

  var zoom_function = function(context){
    return context.view;
  };

  /////////////////////////////////
  // make buffer for row offsets
  /////////////////////////////////

  var x_offset = -0.5 - row_width;

  var y_offset_array = [];
  for (var i = 0; i < num_rows; i++){
    y_offset_array[i] = 0.5 - row_height/2 - i * row_height;
  }

  const y_offset_buffer = regl.buffer({
    length: num_rows,
    type: 'float',
    usage: 'dynamic'
  });

  y_offset_buffer(y_offset_array);

  var scale_y = m3.scaling(2., 1);

  var rotation_radians;
  if (inst_rc === 'row'){
    rotation_radians = 0;
  } else if (inst_rc === 'col'){
    rotation_radians = Math.PI/2;
  }

  var mat_rotate = m3.rotation(rotation_radians);

  var args = {

    vert: `
      precision highp float;
      attribute vec2 position;
      attribute float y_offset_att;

      uniform mat3 mat_rotate;
      uniform mat3 scale_y;
      uniform mat4 zoom;
      uniform float x_offset;

      varying vec3 new_position;
      varying vec3 vec_translate;

      void main () {

        new_position = vec3(position, 0);

        vec_translate = vec3(x_offset, y_offset_att, 0);

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

      // color triangle red
      void main () {
        gl_FragColor = vec4(0.6, 0.6, 0.6, 1);
      }

    `,

    attributes: {
      position: [
        [row_width,  row_height/2],
        [row_width/2,  0.0],
        [row_width, -row_height/2],
      ],
      y_offset_att: {
        buffer: y_offset_buffer,
        divisor: 1
      }
    },

    uniforms: {
      zoom: zoom_function,
      mat_rotate: mat_rotate,
      scale_y: scale_y,
      x_offset: x_offset
    },

    count: 3,
    instances: num_rows,
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