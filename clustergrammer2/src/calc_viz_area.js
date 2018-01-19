module.exports = function calc_viz_area(params){


  var zoom_data = params.zoom_data;

  if (zoom_data.y.total_zoom > zoom_data.y.zoom_step) {

    if (zoom_data.y.show_text === false){
      zoom_data.y.show_text = true;
      console.log('calc_viz_area once');
    }

  } else {

    zoom_data.y.show_text = false;

  }

};