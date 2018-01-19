var calc_row_text_triangles = require('./calc_row_text_triangles');

module.exports = function calc_viz_area(params){

  console.log('calc_viz_area');

  var zoom_data = params.zoom_data;

  if (zoom_data.y.total_zoom > zoom_data.y.zoom_step) {

    if (zoom_data.y.show_text === false){
      zoom_data.y.show_text = true;

      // console.log('calc_viz_area once');
      // params.row_text_triangles = calc_row_text_triangles(params);

    }

  } else {

    zoom_data.y.show_text = false;

  }

};