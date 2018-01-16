module.exports = function make_cameras(zoom_data){

  const cameras = {}
  var ini_scale = 1.0 ;
  var zoom_range = {
      xrange: [-ini_scale, ini_scale],
      yrange: [-ini_scale, ini_scale]
    };

  // requiring camera and
  cameras['mat'] = require('./custom_camera_2d')(
    regl, zoom_range, zoom_data, 'matrix'
  );

  cameras['row-labels'] = require('./custom_camera_2d')(
    regl, zoom_range, zoom_data, 'row-labels'
  );

  cameras['row-label-text'] = require('./custom_camera_2d')(
    regl, zoom_range, zoom_data, 'row-label-text'
  );

  cameras['col-labels'] = require('./custom_camera_2d')(
    regl, zoom_range, zoom_data, 'col-labels'
  );

  cameras['static'] = require('./custom_camera_2d')(
    regl, zoom_range, zoom_data, 'static'
  );

  return cameras;
}