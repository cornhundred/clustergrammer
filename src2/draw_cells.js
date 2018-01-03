var make_position_arr = require('./make_position_arr');
blend_info = require('./blend_info')

module.exports = function(regl, network, mat_data){

  console.log('num_row: ' + String(num_row))
  console.log('num_col: ' + String(num_col))
  var zoom_function = function(context){

    return context.view;
  }

  num_row = mat_data.length;
  num_col = mat_data[0].length;

  // Generate opacity array
  //////////////////////////
  opacity_arr = [].concat.apply([], mat_data)

  abs_max_val = _.max(opacity_arr, function(d){
    return Math.abs(d);
  })

  opacity_scale = d3.scale.linear();

  opacity_domain = abs_max_val /1.5;
  opacity_range = 0.80;

  opacity_scale
    .domain([-opacity_domain, opacity_domain])
    .range([-opacity_range, opacity_range])
    .clamp(true);

  opacity_arr = opacity_arr.map(function(x) {
    return opacity_scale(x)
  });


  var position_arr = make_position_arr(num_row, num_col)

  // Generate Buffers
  ///////////////////////////
  position_buffer = regl.buffer(position_arr);

  const opacity_buffer = regl.buffer({
    // length: opacity_arr.length,
    type: 'float',
    usage: 'dynamic'
  });

  opacity_buffer(opacity_arr);

  // bottom half
  var bottom_half = [
    [1/num_col, 0.0],
    [0.0,       0.0],
    [0.0,       1/num_row]
  ];

  // top half
  var top_half = [
    [1/num_col, 0.0 ],
    [1/num_col, 1/num_row],
    [0.0,       1/num_row]
    ];

  var vert_string = `
    precision highp float;

    attribute vec2 position;

    // These three are instanced attributes.
    attribute vec2 pos_att;
    attribute float opacity_att;
    uniform mat4 zoom;

    // pass varying variables to fragment from vector
    varying float var_opacity;

    void main() {

      gl_Position = zoom *
                    vec4( position.x + pos_att.x,
                          position.y + pos_att.y,
                          0,
                          1
                        );

      // pass attribute (in vert) to varying in frag
      var_opacity = opacity_att;

    }`;

  var frag_string = `
    precision highp float;
    varying float var_opacity;
    uniform vec3 inst_color;
    varying vec3 tmp_color;
    void main() {

      // tmp_color = vec3(0, 0, 1);

      // manually tweaking opacity range, will improve to match old version

      if (var_opacity > 0.0){
        gl_FragColor = vec4(1, 0, 0, abs(var_opacity) + 0.15);
      } else {
        gl_FragColor = vec4(0, 0, 1, abs(var_opacity) + 0.15);
      }

    }`;

  var num_instances = position_arr.length;

  regl_props = {
    vert: vert_string,
    frag: frag_string,
    attributes: {
      position: '',
      pos_att: {
        buffer: position_buffer,
        divisor: 1
      },
      opacity_att: {
        buffer: opacity_buffer,
        divisor: 1
        }
    },
    depth: {
      enable: false
    },
    blend: blend_info,
    count: 3,
    uniforms: {
      zoom: zoom_function,
      inst_color: [0,0,1],
    },
    instances: num_instances,
  };

  // draw top and bottom of matrix cells
  //////////////////////////////////////
  var draw_cells = {};

  bot_props = regl_props;
  bot_props.attributes.position = bottom_half;
  draw_cells.bot = regl(bot_props)

  top_props = regl_props;
  top_props.attributes.position = top_half;
  draw_cells.top = regl(top_props);

  return draw_cells;

};