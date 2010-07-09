TileMill.backend = {};

TileMill.backend.servers = { 'python': {} };
TileMill.backend.rasterizers = { 'tilelive': {} };

// Python backend
TileMill.backend.servers.python.list = function(type, callback) {
  var cache = TileMill.cache.get('python-list', type);
  if (cache) {
    callback(cache);
  }
  else {
    $.getJSON(TileMill.settings.pythonServer + 'list', { 'type': type }, function(data) {
      TileMill.cache.set('python-list', type, data);
      callback(data);
    });
  }
}

// TileLive backend
TileMill.backend.rasterizers.tilelive.values = function(layer, field) {
  
}

$.each(['list'], function(i, func) {
  TileMill.backend[func] = TileMill.backend.servers[TileMill.settings.server][func];
});

$.each(['values'], function(i, func) {
  TileMill.backend[func] = TileMill.backend.rasterizers[TileMill.settings.rasterizer][func];
});