/*
 * Copyright 2015-2017 WorldWind Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

requirejs(['./WorldWindShim',
        './LayerManager'],
    function (WorldWind,
              LayerManager) {
        "use strict";

        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        var wwd = new WorldWind.WorldWindow("canvasOne");

        // Standard WorldWind layers
        var layers = [
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            // {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
            // {layer: new WorldWind.RenderableLayer('Hello'), enabled: false},
            // {layer: new WorldWind.BingAerialLayer(null), enabled: false},
            // {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: false},
            // {layer: new WorldWind.BingRoadsLayer(null), enabled: false},
            // {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }


        // Create a layer manager for controlling layer visibility.
        // var layerManager = new LayerManager(wwd);

        // Web Map Service information from NASA's Near Earth Observations WMS
        // var serviceAddress = "https://neo.sci.gsfc.nasa.gov/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
        var serviceAddress = "http://aworldbridgelabs.com:8080/geoserver/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
        // Named layer displaying Average Temperature data
        // var layerName = "MOD_LSTD_CLIM_M";
        // var layerName = "USGS:0_GAPLandCover";

        var pizza = 0;

        var layerName = ["USGS:1_SatelliteViewShadedRelief", "USGS:2_SatelliteViewShadedRelief", "USGS:3_SatelliteViewShadedRelief"];
        // Called asynchronously to parse and create the WMS layer
        var createLayer = function (xmlDom) {

            for (var i = 0; i < layerName.length; i++) {

                var wms = new WorldWind.WmsCapabilities(xmlDom);
                console.log(wms);
                // Create a WmsCapabilities object from the XML DOM
                // Retrieve a WmsLayerCapabilities object by the desired layer name
                var wmsLayerCapabilities = wms.getNamedLayer(layerName[i]);
                console.log(wmsLayerCapabilities);
                // Form a configuration object from the WmsLayerCapability object
                var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
                // Modify the configuration objects title property to a more user friendly title
                wmsConfig.title = layerName[i];
                console.log(wmsConfig);


                // Create the WMS Layer from the configuration object
                var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
                wmsLayer.enabled = false;


                // Add the layers to WorldWind and update the layer manager
                wwd.addLayer(wmsLayer);
                console.log(wwd.layers);
                // wwd.layer(layerName[i]).enabled = false;

                // layerManager.synchronizeLayerList();

                // $(".test").off('click');
            }
        };

        // Called if an error occurs during WMS Capabilities document retrieval
        var logError = function (jqXhr, text, exception) {
            console.log("There was a failure retrieving the capabilities document: " + text + " exception: " + exception);
        };

        $.get(serviceAddress).done(createLayer).fail(logError);

        console.log(wwd.layers);

        $('#toggleOne').on('click', function () {
            var checkBox = document.getElementById("toggleOne");

            if (checkBox.checked === true) {
                console.log("HELLO");
                for (var a = 0; a < wwd.layers.length; a++) {
                    if (wwd.layers[a].displayName === "USGS:1_SatelliteViewShadedRelief") {
                        wwd.layers[a].enabled = true;
                        break
                    }

                }
            } if (checkBox.checked === false) {
                console.log("first button");
                for (var b = 0; b < wwd.layers.length; b++) {
                    if (wwd.layers[b].displayName === "USGS:1_SatelliteViewShadedRelief") {
                        wwd.layers[b].enabled = false;
                        break

                    }
                }
            }
        });

        $('#toggleTwo').on('click', function () {
            var checkBox = document.getElementById("toggleTwo");

            if (checkBox.checked === true) {
                console.log("BYE");
                for (var a = 0; a < wwd.layers.length; a++) {
                    if (wwd.layers[a].displayName === "USGS:2_SatelliteViewShadedRelief") {
                        wwd.layers[a].enabled = true;
                        break
                    }

                }
            } if (checkBox.checked === false) {
                console.log("second button");
                for (var b = 0; b < wwd.layers.length; b++) {
                    if (wwd.layers[b].displayName === "USGS:2_SatelliteViewShadedRelief") {
                        wwd.layers[b].enabled = false;
                        break

                    }
                }
            }
        });

        $('#toggleThree').on('click', function () {
            var checkBox = document.getElementById("toggleThree");

            if (checkBox.checked === true) {
                console.log("HI AGAIN");
                for (var a = 0; a < wwd.layers.length; a++) {
                    if (wwd.layers[a].displayName === "USGS:3_SatelliteViewShadedRelief") {
                        wwd.layers[a].enabled = true;
                        break
                    }

                }
            } if (checkBox.checked === false) {
                console.log("third button");
                for (var b = 0; b < wwd.layers.length; b++) {
                    if (wwd.layers[b].displayName === "USGS:3_SatelliteViewShadedRelief") {
                        wwd.layers[b].enabled = false;
                        break

                    }
                }
            }
        });



        // var continent = ["North America"];
        // var country = ["United States","Canada"];
        // var state = ["Alaska", "Toronto"];
        //
        //
        // document.getElementById("special").addEventListener("change", function(e){
        //     var select2 = document.getElementById("special2");
        //
        //     select2.innerHTML = "";
        //
        //     var aItems = [];
        //     if(this.value === "2"){
        //         aItems = country;
        //         console.log("see how well it works");
        //     // } else if (this.value === "3") {
        //     //     aItems = state;
        //     } else if(this.value === "1") {
        //         aItems = continent;
        //     }
        //     for(var i=0,len=aItems.length; i<len;i++) {
        //         var option = document.createElement("option");
        //         option.value= (i+1);
        //         var textNode = document.createTextNode(aItems[i]);
        //         option.appendChild(textNode);
        //         select2.appendChild(option);
        //
        //     }
        //
        // }, false);
        //
        // document.getElementById("special").addEventListener("change", function(e){
        //     var select3 = document.getElementById("special2");
        //
        //     select3.innerHTML = "";
        //
        //     var aItems = [];
        //     if(this.value === "2") {
        //         aItems = state[];
        //     }
        //     // } else if(this.value === "3") {
        //     //     aItems = state[0];
        //     // }
        //     for(var i=0,len=aItems.length; i<len;i++) {
        //         var option = document.createElement("option");
        //         option.value= (i+1);
        //         var textNode = document.createTextNode(aItems[i]);
        //         option.appendChild(textNode);
        //         select3.appendChild(option);
        //
        //     }
        //
        // }, false);
        //
        // document.getElementById("special2").addEventListener("change", function(e){
        //     var select2 = document.getElementById("special3");
        //
        //     select2.innerHTML = "";
        //
        //     var aItems = [];
        //     if(this.value === "2"){
        //         aItems = country;
        //         console.log("see how well it works");
        //         // } else if (this.value === "3") {
        //         //     aItems = state;
        //     } else if(this.value === "1") {
        //         aItems = continent;
        //     }
        //     for(var i=0,len=aItems.length; i<len;i++) {
        //         var option = document.createElement("option");
        //         option.value= (i+1);
        //         var textNode = document.createTextNode(aItems[i]);
        //         option.appendChild(textNode);
        //         select2.appendChild(option);
        //
        //     }
        //
        // }, false);
        //
        // document.getElementById("special2").addEventListener("change", function(e){
        //     var select3 = document.getElementById("special3");
        //
        //     select3.innerHTML = "";
        //
        //     var aItems = [];
        //     if(this.value === "2") {
        //         aItems = country;
        //     } else if(this.value === "3") {
        //         aItems = state;
        //     }
        //     for(var i=0,len=aItems.length; i<len;i++) {
        //         var option = document.createElement("option");
        //         option.value= (i+1);
        //         var textNode = document.createTextNode(aItems[i]);
        //         option.appendChild(textNode);
        //         select3.appendChild(option);
        //
        //     }
        //
        // }, false);



        // $('.testOne').on('click',function () {
        //
        //     var test1 = document.getElementById("firstB");
        //
        //     if (test1.id === "firstB") {
        //
        //         if (pizza === 0) {
        //             console.log("first pic success");
        //             for (var a = 0; a < wwd.layers.length; a++) {
        //                if (wwd.layers[a].displayName === "USGS:1_SatelliteViewShadedRelief") {
        //                    wwd.layers[a].enabled = true;
        //                    pizza = 1;
        //                    break
        //                }
        //
        //             }
        //
        //         } else {
        //             console.log("first button");
        //             for (var b = 0; b < wwd.layers.length; b++) {
        //                 if (wwd.layers[b].displayName === "USGS:1_SatelliteViewShadedRelief") {
        //                     wwd.layers[b].enabled = false;
        //                     pizza = 0;
        //                     break
        //                 }
        //             }
        //
        //         }
        //
        //     }
        // });
        //
        // $('.testTwo').on('click', function () {
        //         // var test1 = $('#firstB').val;
        //
        //     var test2 = document.getElementById("secondB");
        //     if (test2.id === "secondB") {
        //
        //
        //         if (pizza === 0) {
        //
        //             for (var a = 0; a < wwd.layers.length; a++) {
        //                 console.log(wwd.layers[a].displayName);
        //
        //
        //                 if (wwd.layers[a].displayName === "USGS:2_SatelliteViewShadedRelief") {
        //                     wwd.layers[a].enabled = true;
        //                     console.log("second pic success");
        //                     pizza = 1;
        //                     break
        //                 }
        //             }
        //         } else {
        //             // console.log("hi")
        //
        //             for (var b = 0; b < wwd.layers.length; b++) {
        //                 if (wwd.layers[b].displayName === "USGS:2_SatelliteViewShadedRelief") {
        //                     wwd.layers[b].enabled = false;
        //                     console.log("second button");
        //                     pizza = 0;
        //                     break
        //                 }
        //             }
        //         }
        //     }
        // });
        //
        //
        // $('.testThree').on('click', function () {
        //
        //     var test3 = document.getElementById("thirdB");
        //
        //     if (test3.id === "thirdB") {
        //         if (pizza === 0) {
        //
        //             console.log("third pic success");
        //
        //             for (var a = 0; a < wwd.layers.length; a++) {
        //
        //                 if (wwd.layers[a].displayName === "USGS:3_SatelliteViewShadedRelief") {
        //                  wwd.layers[a].enabled = true;
        //                  pizza = 1;
        //                  break
        //
        //                 }
        //             }
        //
        //         } else {
        //             console.log("third button");
        //             for (var b = 0; b < wwd.layers.length; b++) {
        //                 if (wwd.layers[b].displayName === "USGS:3_SatelliteViewShadedRelief") {
        //                     wwd.layers[b].enabled = false;
        //                     pizza = 0;
        //                     break
        //                 }
        //             }
        //
        //             }
        //
        //         }
        //
        //
        //     })
        });



