"use strict";

class UserArrow {
    constructor(id, origin_pt, destination_pt, parent=undefined){
        this.parent = parent || svg_map;
        this.svg_elem = d3.select(this.parent);
        this.pt1 = origin_pt;
        this.pt2 = destination_pt;
        this.id = id;

        this.drag_behavior = d3.drag()
             .subject(function() {
                    var t = d3.select(this),
                        prev_translate = t.attr("transform");
                    prev_translate = prev_translate ? prev_translate.slice(10, -1).split(',').map(f => +f) : [0, 0];
                    return {
                        x: t.attr("x") + prev_translate[0], y: t.attr("y") + prev_translate[1]
                    };
                })
            .on("start", () => {
                d3.event.sourceEvent.stopPropagation();
                if(map_div.select("#hand_button").classed("active"))
                    zoom.on("zoom", null);
              })
            .on("end", () => {
                if(map_div.select("#hand_button").classed("active"))
                    zoom.on("zoom", zoom_without_redraw);
              })
            .on("drag", function(){
                d3.event.sourceEvent.preventDefault();
                let t = d3.select(this),
                    scale_value = t.attr("scale"),
                    rotation_value = t.attr("rotate");
                scale_value = scale_value ? "scale(" + scale_value + ")" : "";
                rotation_value = rotation_value ? "rotate(" + rotation_value + ",0,0)" : "";
                t.attr('transform', 'translate(' + [d3.event.x, d3.event.y] + ')' + scale_value + rotation_value);
              });

        let defs = parent.querySelector("defs"),
            markers = defs ? defs.querySelector("marker") : null;

        if(!markers){
            this.add_defs_marker();
        }
        this.draw()
    }

    add_defs_marker(){
        defs.append("marker")
            .attrs({"id":"arrow_head", "viewBox":"0 -5 10 10",
                  "refX":5, "refY":0, "orient":"auto",
                  "markerWidth":4, "markerHeight":4})
            .style("stroke-width", 1)
        	.append("path")
        	.attr("d", "M0,-5L10,0L0,5")
        	.attr("class","arrowHead");
        if(this.parent.childNodes[0].tagName != "defs"){
            this.parent.insertBefore(defs.node(), this.parent.childNodes[0]);
        }
    }

    draw(){
        let context_menu = new ContextMenu(),
            getItems = () =>  [
                {"name": "Edit style/position...", "action": () => { this.editStyle(); }},
                {"name": "Up element", "action": () => { this.up_element(); }},
                {"name": "Down element", "action": () => { this.down_element(); }},
                {"name": "Delete", "action": () => { this.arrow.remove(); }}
            ];

        this.arrow = this.svg_elem.append('g')
                .attrs({"class": "arrow legend_features legend", "id": this.id});

        this.arrow.insert("line")
        		.attrs({"class":"legend_features",
        			  "marker-end":"url(#arrow_head)",
        			  "x1": this.pt1[0], "y1": this.pt1[1],
        			  "x2":this.pt2[0], "y2": this.pt2[1]})
                .styles({"stroke-width": 5, stroke: "#000"});

        this.arrow.call(this.drag_behavior);

        this.arrow.on("contextmenu", () => {
            context_menu.showMenu(d3.event,
                                  document.querySelector("body"),
                                  getItems());
            });
    }

    up_element(){
        let lgd_features = this.parent.querySelectorAll(".legend"),
            nb_lgd_features = lgd_features.length,
            self_position;
        for(let i=0; i<nb_lgd_features; i++){
            if(lgd_features[i].id == this.id){
                self_position = i;
            }
        }
        if(self_position == nb_lgd_features - 1){
            return;
        } else {
            this.parent.insertBefore(lgd_features[self_position + 1], lgd_features[self_position])
        }
    }

    down_element(){
        let lgd_features = this.parent.querySelectorAll(".legend"),
            nb_lgd_features = lgd_features.length,
            self_position;
        for(let i=0; i<nb_lgd_features; i++){
            if(lgd_features[i].id == this.id){
                self_position = i;
            }
        }
        if(self_position == 0){
            return;
        } else {
            this.parent.insertBefore(lgd_features[self_position], lgd_features[self_position - 1]);
        }

    }

}

class Textbox {
    // woo lets use ES2015 classes !
    constructor(parent, new_id_txt_annot, position=[10, 30]){
        this.x = position[0];
        this.y = position[1];
        this.fontsize = 14;

        function end_edit_action(){
            inner_ft.attr("contentEditable", "false");
            inner_ft.style("background-color", "transparent");
            inner_ft.style("border", "");
            // Recompute the size of the p inside the foreignObj
            let inner_bbox = inner_p.getBoundingClientRect();
            foreign_obj.setAttributeNS(null, "width", [inner_bbox.width + 2, "px"].join('')); // +2px are for the border
            foreign_obj.setAttributeNS(null, "height", [inner_bbox.height + 2, "px"].join(''));
            d3.select("body").classed("noselect", false);
            state = null;
        };

        var current_timeout, state;
        let context_menu = new ContextMenu(),
            getItems = () =>  [
                {"name": "Edit style...", "action": () => { this.editStyle(); }},
                {"name": "Up element", "action": () => { this.up_element(); }},
                {"name": "Down element", "action": () => { this.down_element(); }},
                {"name": "Delete", "action": () => { this.text_annot.remove(); }}
            ];

        let drag_txt_annot = d3.drag()
             .subject(function() {
                    var t = d3.select(this.parentElement),
                        prev_translate = t.attr("transform");
                    prev_translate = prev_translate ? prev_translate.slice(10, -1).split(',').map(f => +f) : [0, 0];
                    return {
                        x: t.attr("x") - prev_translate[0],
                        y: t.attr("y") - prev_translate[1]
                    };
                })
            .on("start", () => {
                d3.event.sourceEvent.stopPropagation();
                if(map_div.select("#hand_button").classed("active"))
                    zoom.on("zoom", null);
              })
            .on("end", () => {
                if(map_div.select("#hand_button").classed("active"))
                    zoom.on("zoom", zoom_without_redraw);
              })
            .on("drag", function(){
                d3.event.sourceEvent.preventDefault();
                d3.select(this.parentElement).attr("x", d3.event.x).attr("y", d3.event.y);
              });

        let foreign_obj = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        foreign_obj.setAttributeNS(null, "x", this.x);
        foreign_obj.setAttributeNS(null, "y", this.y);
        foreign_obj.setAttributeNS(null, "overflow", "visible");
        foreign_obj.setAttributeNS(null, "width", "100%");
        foreign_obj.setAttributeNS(null, "height", "100%");
        foreign_obj.setAttributeNS(null, "class", "legend txt_annot");
        foreign_obj.id = new_id_txt_annot;

        let inner_p = document.createElement("p");
        inner_p.setAttribute("id", "in_" + new_id_txt_annot);
        inner_p.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        inner_p.style = "display:table-cell;padding:10px;color:#000;"
            + "opacity:1;font-family:'Verdana,Geneva,sans-serif';font-size:14px;white-space: pre;"
            + "word-wrap: normal; overflow: visible; overflow-y: visible; overflow-x: visible;"
        inner_p.innerHTML = "Enter your text...";
        foreign_obj.appendChild(inner_p);
        parent.appendChild(foreign_obj);

        // foreignObj size was set to 100% for fully rendering its content,
        // now we can reduce its size to the inner content
        // (it will avoid it to overlay some other svg elements)
        {
            let inner_bbox = inner_p.getBoundingClientRect();
            foreign_obj.setAttributeNS(null, "width", [inner_bbox.width + 2, "px"].join('')); // +2px are for the border
            foreign_obj.setAttributeNS(null, "height", [inner_bbox.height + 2, "px"].join(''));
        }

        var frgn_obj = map.select("#" + new_id_txt_annot),
            inner_ft = frgn_obj.select('p');
        inner_ft.call(drag_txt_annot);

        inner_ft.on("contextmenu", () => {
            context_menu.showMenu(d3.event,
                                  document.querySelector("body"),
                                  getItems());
            });

        inner_ft.on("dblclick", () => { d3.event.stopPropagation(); });

        inner_ft.on("mouseover", () => {
                    inner_ft.attr("contentEditable", "true"); // Not sure if its better to change this than always letting it editable
                    inner_ft.style("background-color", "white");
                    inner_ft.style("border", "1px solid red");
                    inner_ft.on("keyup", () => {
                        clearTimeout(current_timeout);
                        current_timeout = setTimeout(end_edit_action, 7500);
                        state = "keyup";
                    })
                    // toogle the size of the container to 100% while we are using it :
                    foreign_obj.setAttributeNS(null, "width", "100%");
                    foreign_obj.setAttributeNS(null, "height", "100%");
                    d3.select("body").classed("noselect", true);
                })
                .on("mouseout", () => {
                    // use a small delay after leaving the box before deactiving it :
                    if(!state){
                        clearTimeout(current_timeout);
                        current_timeout = setTimeout(end_edit_action, 2500);
                    }
                });

        this.text_annot = frgn_obj;
        this.font_family = 'Verdana,Geneva,sans-serif';
        this.id = new_id_txt_annot;
    }

    editStyle(){
        let current_options = {size: this.text_annot.select("p").style("font-size"),
                               content: this.text_annot.select("p").html(),
                               font: ""};
        let self = this;
        var a = make_confirm_dialog("", "Valid", "Cancel", "Textbox options", "styleTextAnnotation")
            .then(function(confirmed){
                if(!confirmed){
                    self.text_annot.select("p").text(current_options.content);
                    self.fontsize = current_options.size;
                }
            });
        let box_content = d3.select(".styleTextAnnotation").insert("div").attr("id", "styleTextAnnotation");
        box_content.append("p").html("Font size ")
                .append("input").attrs({type: "number", id: "font_size", min: 0, max: 34, step: 0.1, value: this.fontsize})
                .on("change", function(){
                    self.fontsize = +this.value;
                    self.text_annot.select("p").style("font-size", self.fontsize + "px")
                });
        let font_select = box_content.append("p").html("Default font family ")
                .insert("select")
                .on("change", function(){
                    self.text_annot.select("p").style("font-family", this.value);
                });
        available_fonts.forEach(function(font){
            font_select.append("option").text(font[0]).attr("value", font[1])
        });
        font_select.node().selectedIndex = available_fonts.map(d => d[1] == this.font_family ? "1" : "0").indexOf("1");

        let content_modif_zone = box_content.append("p");
        content_modif_zone.append("span")
                .html("Content ");
        content_modif_zone.append("img")
            .attrs({"id": "btn_info_text_annotation", "src": "/static/img/Information.png", "width": "17", "height": "17",  "alt": "Information"})
            .styles({"cursor": "pointer", "vertical-align": "bottom"});
        content_modif_zone.append("span")
                .html("<br>");
        content_modif_zone.append("textarea")
                .attr("id", "annotation_content")
                .style("margin", "5px 0px 0px")
                .on("keyup", function(){
                    self._text = this.value;
                    self.text_annot.select("p").html(this.value)
                });


        document.getElementById("annotation_content").value = current_options.content;

    }

    up_element(){
        let lgd_features = document.querySelectorAll(".legend"),
            nb_lgd_features = lgd_features.length,
            self_position;
        for(let i=0; i<nb_lgd_features; i++){
            if(lgd_features[i].id == this.id){
                self_position = i;
            }
        }
        if(self_position == nb_lgd_features){
            return;
        } else {
            console.log(lgd_features[self_position])
            console.log(lgd_features[self_position + 1])
            map.node().insertBefore(lgd_features[self_position + 1], lgd_features[self_position])
        }
    }

    down_element(){
        let lgd_features = document.querySelectorAll(".legend"),
            nb_lgd_features = lgd_features.length,
            self_position;
        for(let i=0; i<nb_lgd_features; i++){
            if(lgd_features[i].id == this.id){
                self_position = i;
            }
        }
        if(self_position == 0){
            return;
        } else {
            map.node().insertBefore(lgd_features[self_position], lgd_features[self_position - 1]);
        }

    }

}
