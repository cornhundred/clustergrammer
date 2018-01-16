module.exports = function calc_spillover_positions(viz_dim){

  var height_to_width = viz_dim.canvas.height/viz_dim.canvas.width;
  var scaled_height = 0.5 / height_to_width;

  var spillover_positions = {}
  spillover_positions['mat'] = [
    // left spillover rect
    {'pos': [[-1, 1], [-0.5, -1], [-1.0, -1]]},
    {'pos': [[-1, 1], [-0.5,  1], [-0.5, -1]]},

    // right spillover rect
    {'pos': [[1, 1], [0.5, -1], [1.0, -1]]},
    {'pos': [[1, 1], [0.5,  1], [0.5, -1]]},

    // top spillover rect
    {'pos': [[-0.5, 1], [-0.5, scaled_height], [0.5, 1]]},
    {'pos': [[ 0.5, 1], [0.5, scaled_height], [-0.5, scaled_height]]},

    // bottom spillover rect
    {'pos': [[-0.5, -1], [-0.5, -scaled_height], [0.5, -1]]},
    {'pos': [[ 0.5, -1], [0.5, -scaled_height], [-0.5, -scaled_height]]},
  ];

  spillover_positions['corners'] = [
    // top-left spillover rect
    {'pos': [[-1, 1], [-0.5, scaled_height], [-1.0, scaled_height]]},
    {'pos': [[-1, 1], [-0.5,  1], [-0.5, scaled_height]]},

    // bottom-left spillover rect
    {'pos': [[-1, -1], [-0.5, -scaled_height], [-1.0, -scaled_height]]},
    {'pos': [[-1, -1], [-0.5,  -1], [-0.5, -scaled_height]]},

    // top-right spillover rect
    {'pos': [[1, 1], [0.5, scaled_height], [1.0, scaled_height]]},
    {'pos': [[1, 1], [0.5,  1], [0.5, scaled_height]]},

    // bottom-right spillover rect
    {'pos': [[1, -1], [0.5, -scaled_height], [1.0, -scaled_height]]},
    {'pos': [[1, -1], [0.5,  -1], [0.5, -scaled_height]]},

  ];

  return spillover_positions;
}