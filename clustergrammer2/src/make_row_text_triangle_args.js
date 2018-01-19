var m3 = require('./mat3_transform');

module.exports = function make_row_text_triangle_args(regl, params, zoom_function){

  var row_x_offset = d3.scale.linear()
    .domain([50, 100])
    .range([-26.1, -53]);

  var x_offset = row_x_offset(params.text_zoom.row.inst_factor);
  var scale_y = params.text_zoom.row.inst_factor;

  var mat_rotate = m3.rotation(Math.PI/2);

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

      // vec3 tmp = vec3(1,1,1);

      // last value is a sort-of zoom
      void main () {
        // reverse y position to get words to be upright

        gl_Position = zoom *
                      vec4(
                            (position.x * width_scale) + x_offset,
                           -position.y + (offset[1]) * scale_y,
                           // depth
                           0.50,
                           // zoom
                           scale_y);
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
      scale_y: scale_y,
      width_scale: params.zoom_data.y.total_zoom,
      mat_rotate: mat_rotate
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