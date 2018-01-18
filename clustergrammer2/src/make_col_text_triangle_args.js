var m3 = require('./mat3_transform');

module.exports = function make_col_text_triangle_args(regl, params, zoom_function){

  var col_x_offset = d3.scale.linear()
    .domain([50, 100])
    .range([-26.5, -53]);

  var x_offset = col_x_offset(params.text_zoom.col.inst_factor);

  var mat_rotate = m3.rotation(Math.PI/4);
  var mat_scale = m3.scaling(1, params.zoom_data.x.total_zoom);

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

      // last value is a sort-of zoom
      void main () {
        // reverse y position to get words to be upright
        gl_Position = zoom *
                      vec4(
                            mat_scale *
                            mat_rotate *
                            vec3(
                                  // (position.y) + offset[1] * scale_y,
                                  (position.y ) + offset[1] * scale_y,

                                  // position.x  * width_scale + 15.5,
                                  position.x  + 15.5,

                                  0.5),
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
      mat_scale: mat_scale
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