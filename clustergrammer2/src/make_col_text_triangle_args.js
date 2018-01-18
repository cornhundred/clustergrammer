var m3 = require('./mat3_transform');

module.exports = function make_col_text_triangle_args(regl, params, zoom_function){

  var col_x_offset = d3.scale.linear()
    .domain([50, 100])
    .range([-26.5, -53]);

  var x_offset = col_x_offset(params.text_zoom.col.inst_factor);

  /*
  Not using mat_translate since each label needs to be translated a specific
  amount that is saved in the batch data.
  */
  var mat_rotate = m3.rotation(Math.PI/4);
  var mat_scale = m3.scaling(1, params.zoom_data.x.total_zoom);
  var mat_reduce_text_size = m3.scaling(0.75, 0.75);

  var args = {
    vert: `
      precision mediump float;
      attribute vec2 position;
      uniform mat4 zoom;
      uniform vec2 offset;
      uniform float x_offset;
      uniform float scale_y;
      uniform float width_scale;
      uniform mat3 mat_rotate;
      uniform mat3 mat_scale;
      uniform mat3 mat_reduce_text_size;

      // last value is a sort-of zoom
      void main () {
        // reverse y position to get words to be upright
        gl_Position = zoom *

          vec4(
                ////////////////////
                // make vec3
                ////////////////////

                // stretch letters vertically to maintain proportions
                mat_scale *

                // rotate text triangles
                mat_rotate *

                mat_reduce_text_size *

                // text triangles
                vec3(position.y, position.x, 0.5) +

                // apply translation to rotated text
                vec3( offset[1] * scale_y, 15.3, 0),

                ////////////////////
                // add vec4 element
                ////////////////////

                // zoom element in vec4
                scale_y

          );

      }`,
    frag: `
      precision mediump float;
      void main () {
        gl_FragColor = vec4(0.2, 0.2, 0.2, 1.0);
      }`,
    attributes: {
      position: regl.prop('positions')
    },
    elements: regl.prop('cells'),
    uniforms: {
      zoom: zoom_function,
      offset: regl.prop('offset'),
      x_offset: x_offset,
      scale_y: params.text_zoom.col.inst_factor,
      width_scale: params.zoom_data.y.total_zoom,
      mat_rotate: mat_rotate,
      mat_scale: mat_scale,
      mat_reduce_text_size: mat_reduce_text_size,
    },
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