////////////////////////////////////////////////////////////////////////
// Browse and upload buttons + related actions (conversion + displaying)
////////////////////////////////////////////////////////////////////////

function add_layer(d){
    var input = $(document.createElement('input')),
        res = [];

    input.attr("type", "file").attr("multiple", "").attr("name", "file[]").attr("enctype", "multipart/form-data");
    input.on('change', prepareUpload);

    if(this.parentNode.parentNode.id === "section1") target_layer_on_add = true;

    function prepareUpload(event){
        files = event.target.files;
        if(strContains(files[0].name, 'topojson')){
            handle_TopoJSON_files(files);
        } else if(files.length == 1 && (strContains(files[0].name, 'geojson')
                            || strContains(files[0].name, 'zip'))){
            handle_single_file(files);
        } else if(strContains(files[0].name.toLowerCase(), '.csv')
                    || strContains(files[0].name.toLowerCase(), '.tsv')) {
            handle_dataset(files)
        }
        else if(files.length >= 4){
            var filenames = [];
            for (var i=0; i<files.length; i++) filenames[i] = files[i].name;
            var res = strArraysContains(filenames, ['.shp', '.dbf', '.shx', '.prj']);
            if(res.length >= 4){
                var ajaxData = new FormData();
                ajaxData.append("action", "submit_form");
                $.each(input, function(i, obj) {
                    $.each(obj.files, function(j, file){
                        ajaxData.append('file['+j+']', file);
                    });
                });
                 $.ajax({
                    processData: false,
                    contentType: false,
                    cache: false,
                    url: '/convert_to_topojson',
                    data: ajaxData,
                    type: 'POST',
                    success: function(data) {add_layer_fun(data);},
                    error: function(error) {console.log(error); }
                    });
                }
            else {
                alert('Layers have to be uploaded one by one and all mandatory files (.shp, .dbf, .shx, .prj) have been provided for reading a Shapefile');
                }
        } else {
            alert('Invalid datasource (No GeoJSON/TopoJSON/zip/Shapefile detected)');
        }
    };
    input.trigger('click');
}

////////////////////////////////////////////////////////////////////////
// Some jQuery functions to handle drag-and-drop events :
////////////////////////////////////////////////////////////////////////

$(document).on('dragenter', '#section1,#section3', function() {
            target_layer_on_add = false
            $(this).css('border', '3px dashed green');
            return false;
});
$(document).on('dragover', '#section1,#section3', function(e){
            e.preventDefault();
            e.stopPropagation();
            $(this).css('border', '3px dashed green');
            return false;
});
$(document).on('dragleave', '#section1,#section3', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).css('border', '');
            return false;
});
$(document).on('drop', '#section1,#section3', function(e) {
   var files = e.originalEvent.dataTransfer.files;

   if(this.id === "section1") target_layer_on_add = true;
   e.preventDefault();e.stopPropagation();

   if(!(e.originalEvent.dataTransfer.files.length == 1)){
        var filenames = [];
        for(var i=0; i < files.length; i++){filenames[i] = files[i].name;}
        var result = strArraysContains(filenames, ['.shp', '.dbf', '.shx', '.prj']);

        if(result.length == 4){
            $(this).css('border', '3px dashed red');
            alert('All mandatory files (.shp, .dbf, .shx, .prj) have been provided for reading a Shapefile');
            $(this).css('border', '');
            var ajaxData = new FormData();
            ajaxData.append("action", "submit_form");
                $.each(files, function(j, file){
                    ajaxData.append('file['+j+']', file);
                });
                 $.ajax({
                    processData: false,
                    contentType: false,
                    cache: false,
                    url: '/convert_to_topojson',
                    data: ajaxData,
                    type: 'POST',
                    success: function(data) {add_layer_fun(data);},
                    error: function(error) {console.log(error); }
                    });
                }
            else {
                alert('Layers have to be uploaded one by one and all mandatory files (.shp, .dbf, .shx, .prj) have been provided for reading a Shapefile');
              }
        }
   else if(strContains(files[0].name.toLowerCase(), 'topojson')){
           //e.preventDefault();e.stopPropagation();
           $(this).css('border', '');

           if(target_layer_on_add && targeted_layer_added){
               alert("Only one layer can be added by this functionnality");
               return;
             }
           // Most direct way to add a layer :
           else handle_TopoJSON_files(files);
   }
   else if(strContains(files[0].name.toLowerCase(), 'geojson') 
            || strContains(files[0].type.toLowerCase(), 'application/zip')){
           //e.preventDefault();e.stopPropagation();
           $(this).css('border', '');

           if(target_layer_on_add && targeted_layer_added){
               alert("Only one layer can be added by this functionnality");
               return;
             }
           // Send the file to the server for conversion :
           else handle_single_file(files);
   }
  else if(strContains(files[0].name.toLowerCase(), '.csv')
            || strContains(files[0].name.toLowerCase(), '.tsv')) {
        alert('Dataset provided');
        e.preventDefault();e.stopPropagation();
        $(this).css('border', '');
        handle_dataset(files);
   }
  else {
        $(this).css('border', '3px dashed red');
        alert('Invalid datasource (No GeoJSON/TopoJSON/zip/Shapefile detected)');
        $(this).css('border', '');
    }
});

////////////////////////////////////////////////////////////////////////
// Functions to handles files according to their type
////////////////////////////////////////////////////////////////////////

// Now some functions to handle the dropped-file(s) :
// - By trying directly to add it if it's a TopoJSON :

function handle_TopoJSON_files(files) {
    var f = files[0],
        name = files[0].name,
        reader = new FileReader(),
        ajaxData = new FormData();
    /*
    ajaxData.append('file[]', file);
    $.ajax({
        processData: false,
        contentType: false,
        cache: false,
        global: false
        url: '/cache_topojson',
        data: ajaxData,
        type: 'POST',
        error: function(error) { console.log(error); }
    }); */

    reader.onloadend = function(){
        var text = reader.result;
        add_layer_fun(text);
        }
    reader.readAsText(f);
};

function handle_dataset(files){
  for(var i = 0; i != files.length; ++i) {
    var f = files[i],
        reader = new FileReader(),
        name = f.name;
    reader.onload = function(e) {
      var data = e.target.result;
      joined_dataset.push(d3.csv.parse(data))
    };
    reader.readAsText(f);
  }
  // TODO : check if there is x / y / lat /long fields to add this as a geom layers

  var txt = d3.select('#datag').html();
  if(txt.startsWith("User data : <b>Yes")) d3.select('#datag').html(txt + "<b> + Joined/external dataset</b>");
  else d3.select('#datag').html("User data : <b>Joined/external dataset</b>");

  var join_button = dv1.append("p").append("button").attr("id", "join_button").html("Valid the join").on("click", handle_join);
  if(!targeted_layer_added) join_button.node().disabled = true;
  d3.select("#section1").style("height", "185px");
}

// - By sending it to the server for conversion (GeoJSON to TopoJSON)
function handle_single_file(files) {
    var ajaxData = new FormData();
    ajaxData.append("action", "single_file");
    $.each(files, function(j, file){
        ajaxData.append('file[]', file);
    });
    $.ajax({
        processData: false,
        contentType: false,
        cache: false,
        url: '/convert_to_topojson',
        data: ajaxData,
        type: 'POST',
        success: function(data) {add_layer_fun(data);},
        error: function(error) {console.log(error);}
    });
};

// Add the TopoJSON to the 'svg' element :

function add_layer_fun(text){
    var parsedJSON = JSON.parse(text),
        bounds = [];

    if(parsedJSON.Error){  // Server returns a JSON reponse like {"Error":"The error"} if something went bad during the conversion
        alert(parsedJSON.Error);
        return;
    }

    console.log(parsedJSON);
    var type = "", data_to_load = undefined,
        layers_names = Object.getOwnPropertyNames(parsedJSON.objects);

    // Loop over the layers to add them all ?
    // Probably better open an alert asking to the user which one to load ?
    for(var i=0; i < layers_names.length; i++){
        if(strContains(parsedJSON.objects[layers_names[i]].geometries[0].type, 'oint')) type = 'Point';
        else if(strContains(parsedJSON.objects[layers_names[i]].geometries[0].type, 'tring')) type = 'Line';
        else if(strContains(parsedJSON.objects[layers_names[i]].geometries[0].type, 'olygon')) type = 'Polygon';

        if(parsedJSON.objects[layers_names[i]].geometries[0].properties && target_layer_on_add){
            user_data[layers_names[i]] = [];
            data_to_load = true;
        } else { data_to_load = false; }

        map.append("g").attr("id", layers_names[i])
              .attr("class", function(d) {
                return data_to_load ? "targeted_layer" : null;})
              .selectAll(".subunit")
              .data(topojson.feature(parsedJSON, parsedJSON.objects[layers_names[i]]).features)
              .enter().append("path")
              .attr("d", path)
              .attr("id", function(d) {
                if(data_to_load){
                    user_data[layers_names[i]].push(d.properties);
                    }
                return "item " + d.id;})
              .style("stroke-linecap", "round")
              .style("stroke", "red")
              .style("stroke-opacity", .4)
              .style("fill", function(){if(type != 'Line') return("beige");
                                        else return(null);})
              .style("fill-opacity", function(){if(type != 'Line') return(0.5);
                                                else return(0);})
              .attr("height", "100%")
              .attr("width", "100%");

        d3.select("#layer_menu")
              .append('p').html('<a href>- ' + layers_names[i]+"</a>");

        //try {bounds = d3.geo.bounds(parsedJSON.objects[layers_names[i]]);}
        //catch(err){ console.log(err); }

        class_name = target_layer_on_add ? "ui-state-default sortable_target " + layers_names[i] : "ui-state-default " + layers_names[i]
        layers_listed = layer_list.node()
        li = document.createElement("li");
        li.setAttribute("class", class_name);
        li.innerHTML = type + " - " + layers_names[i] + button_style + button_trash + button_active;
        layers_listed.insertBefore(li, layers_listed.childNodes[0])
        if(target_layer_on_add){
            d3.select('#input_geom').html("User geometry : <b>"+layers_names[i]+"</b> <i>("+type+")</i>");
            targeted_layer_added = true;
        }
        if(data_to_load){
             var nb_field = Object.getOwnPropertyNames(user_data[layers_names[i]][0]).length
             d3.select('#datag').html("User data : <b>Yes - Provided with geometries - "+nb_field+" field(s)</b>")
        }
    }
    if(target_layer_on_add && joined_dataset.length != 0){ d3.select("#join_button").node().disabled = false; }
    binds_layers_buttons();
    /*
    // Only zoom on the added layer if its the "targeted" one
    if(target_layer_on_add) { 
        if(parsedJSON.bbox) center_zoom_map(parsedJSON.bbox);
        //else if(bounds) center_zoom_map([bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1]]);
        else alert("The topojson was provided without bbox information");
      }
    */
    target_layer_on_add = false;
    alert('Layer successfully added to the canvas');
};

function center_zoom_map(bbox){
    console.log(bbox);
    var xmin= bbox[0],
        xmax= bbox[1],
        ymin= bbox[2],
        ymax= bbox[3];

    var bounds = [[bbox[0], bbox[2]], [bbox[1], bbox[3]]],
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2;
    console.log([dx, dy, x, y, proj(dx / w, dy / h)]);
    var scale = .9 / Math.max(proj(dx / w, dy / h)),
        translate = proj([w / 2 - scale * x, h / 2 - scale * y]);
    console.log(scale); console.log(translate);
    if(proj && scale) proj.scale(scale).translate(translate);
    /*
    var top_left = proj([xmin, ymax]),
        bottom_right = proj([xmax, ymin]),
        ctr = [bottom_right[0] - top_left[0], top_left[1] - bottom_right[1]];

    var current_trans = proj.translate(),
        current_scale = proj.scale(),
        new_scale = Math.max((bottom_right[0] - top_left[0]) / w, (top_left[1] - bottom_right[1]) / h),
        trans = [Math.abs(t[0] - new_scale * ctr[0]),
                 Math.abs(t[1] - new_scale * ctr[1])];
    new_scale = new_scale * s;
    console.log([proj.scale(), proj.center()[0], proj.center()[1], proj.translate()[0], proj.translate()[1]]);
    proj.translate([ctr[0]+new_scale, ctr[1]*new_scale])
    */
}

// Some helpers

function strContains(string1, substring){
    return string1.indexOf(substring) >= 0;
};

function strArraysContains(ArrString1, ArrSubstrings){
    var result = [];
    for(var i=0; i < ArrString1.length; i++){
        for(var j=0; j < ArrSubstrings.length; j++){
            if(strContains(ArrString1[i], ArrSubstrings[j])){
            result[result.length] = ArrSubstrings[j];
            }
        }
    }
    return result;
};