const vectorizeText = require('vectorize-text')

module.exports = function draw_text_triangles(regl, zoom_function){

  // max ~200 min ~20
  var font_detail = 200;
  var text_vect = vectorizeText('Title', {
    textAlign: 'center',
    textBaseline: 'middle',
    triangles:true,
    size:font_detail,
    font:'"Open Sans", verdana, arial, sans-serif'
  });

  // var text_vect = regl.prop('text_vect');
  // console.log('here')
  // console.log(regl.prop('text_vect'))

  var args = {
    vert: `
      precision mediump float;
      attribute vec2 position;
      uniform mat4 zoom;

      void main () {
        // reverse y position to get words to be upright
        gl_Position = zoom * vec4( 0.2*position.x, -0.2 * position.y + 1.2, 0.0, 2.0);
      }`,
    frag: `
      precision mediump float;
      void main () {
        gl_FragColor = vec4(1, 0, 0, 1.0);
      }`,
    attributes: {
      position: text_vect.positions
    },
    // elements: text_vect.cells,
    elements: regl.prop('cells'),
    uniforms: {
      zoom: zoom_function
    }
  }

 // // Spillover triangles
 //  ///////////////////////////////
 //  var args = {
 //    // In a draw call, we can pass the shader source code to regl
 //    frag: `
 //    precision mediump float;
 //    uniform vec4 color;
 //    void main () {
 //      gl_FragColor = color;
 //    }`,

 //    vert: `
 //    precision mediump float;
 //    attribute vec2 position;
 //    uniform float inst_depth;
 //    void main () {
 //      // positioned further up (matrix is lower at 0.)
 //      gl_Position = vec4(position, inst_depth, 1);
 //    }`,

 //    attributes: {
 //      position: regl.prop('cells')
 //    },

 //    uniforms: {
 //      color: [1, 0, 0, 1],
 //      inst_depth: 0
 //    },

 //    count: 3,
 //    depth: {
 //      enable: true,
 //      mask: true,
 //      func: 'less',
 //      // func: 'greater',
 //      range: [0, 1]
 //    },
 //  }

  draw_function = regl(args);

  return draw_function;

};