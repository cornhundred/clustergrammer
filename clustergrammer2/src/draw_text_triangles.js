module.exports = function draw_text_triangles(regl, params, zoom_function){

  var args = {
    vert: `
      precision mediump float;
      attribute vec2 position;
      uniform mat4 zoom;
      uniform vec2 offset;
      uniform float text_zoom;

      // last value is a sort-of zoom
      void main () {
        // reverse y position to get words to be upright
        gl_Position = zoom *
                      vec4(
                            position.x + offset[0],
                           -position.y + offset[1],
                           // depth
                           0.50,
                           // zoom
                           text_zoom);
      }`,
    frag: `
      precision mediump float;
      void main () {
        gl_FragColor = vec4(0.2, 0.2, 0.2, 1.0);
      }`,
    attributes: {
      // position: text_vect.positions
      position: regl.prop('positions')
    },
    // elements: text_vect.cells,
    elements: regl.prop('cells'),
    uniforms: {
      zoom: zoom_function,
      offset: regl.prop('offset'),
      text_zoom: params.text_zoom.row
    },
    depth: {
      enable: true,
      mask: true,
      func: 'less',
      // func: 'greater',
      range: [0, 1]
    },
  };

  var draw_function = regl(args);

  return draw_function;

};