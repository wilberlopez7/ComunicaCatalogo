(function( $ ) {
    $.widget( "ui.combobox", {
        _create: function() {
            var input,
            self = this,
            select = this.element.hide(),
            selected = select.children( ":selected" ),
            value = selected.val() ? selected.text() : "",
            wrapper = this.wrapper = $( "<span>" )
            .addClass( "ui-combobox" )
            .insertAfter( select );

            input = $( "<input>" )
            .appendTo( wrapper )
            .val( value )
            .addClass( "ui-state-default ui-combobox-input" )
            .autocomplete({
                delay: 0,
                minLength: 0,
                source: function( request, response ) {
                    var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
                    response( select.children( "option" ).map(function() {
                        var text = $( this ).text();
                        if ( this.value && ( !request.term || matcher.test(text) ) )
                            return {
                                label: text.replace(
                                    new RegExp(
                                        "(?![^&;]+;)(?!<[^<>]*)(" +
                                        $.ui.autocomplete.escapeRegex(request.term) +
                                        ")(?![^<>]*>)(?![^&;]+;)", "gi"
                                        ), "<strong>$1</strong>" ),
                                value: text,
                                option: this
                            };
                    }) );
                },
                select: function( event, ui ) {
                    ui.item.option.selected = true;
                    self._trigger( "selected", event, {
                        item: ui.item.option
                    });
                },
                change: function( event, ui ) {
                    if ( !ui.item ) {
                        var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" ),
                        valid = false;
                        select.children( "option" ).each(function() {
                            if ( $( this ).text().match( matcher ) ) {
                                this.selected = valid = true;
                                return false;
                            }
                        });
                        if ( !valid ) {
                            // remove invalid value, as it didn't match anything
                            $( this ).val( "" );
                            select.val( "" );
                            input.data( "autocomplete" ).term = "";
                            return false;
                        }
                    }
                }
            })
            .addClass( "ui-widget ui-widget-content ui-corner-left" );

            input.data( "autocomplete" )._renderItem = function( ul, item ) {
                return $( "<li></li>" )
                .data( "item.autocomplete", item )
                .append( "<a>" + item.label + "</a>" )
                                                
                .appendTo( ul );
            };

            $( "<a>" )
            .attr( "tabIndex", -1 )
            .attr( "title", "Show All Items" )
            .appendTo( wrapper )
            .button({
                icons: {
                    primary: "ui-icon-triangle-1-s"
                },
                text: false
            })
            .removeClass( "ui-corner-all" )
            .addClass( "ui-corner-right ui-combobox-toggle" )
            .click(function() {
                // close if already visible
                if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
                    input.autocomplete( "close" );
                    return;
                }

                // work around a bug (likely same cause as #5265)
                $( this ).blur();

                // pass empty string as value to search for, displaying all results
                input.autocomplete( "search", "" );
                input.focus();
            });
        },

        destroy: function() {
            this.wrapper.remove();
            this.element.show();
            $.Widget.prototype.destroy.call( this );
        }
    });
})( jQuery );

  function agregarFila(obj){
      
                $("#cant_campos").val(parseInt($("#cant_campos").val()) + 1);
                var oId = $("#cant_campos").val();
                var idCat=$( "#combobox" ).val();
                var tipoRechazo = $( "#combobox option:selected").html();
                var idcausa= $("input[name='radio']:checked").val();
                var idLabel = $(":radio[name='radio']:checked").attr("id");         
                var causa = $('label[for='+idLabel+']').html();       
               
               
                var strHtml1 = "<td>" + tipoRechazo+ '<input type="hidden" id="hdnTiporechazo_' + idCat + '" name="hdnTiporechazo_' + oId + '" value="' + tipoRechazo + '"/> <input type="hidden" id="idRechazo_' + idCat + '" name="idRechazo_'+ oId +'" value="' +idCat+ '"/></td>';
                var strHtml2 = "<td>" + causa +'<input type="hidden" id="hdnCausa_' + idcausa + '" name="hdnCausa_' + oId + '" value="' + causa + '"/> <input type="hidden" id="idRechazo_' + idCat + '" name="idCausa_'+ oId +'" value="' +idcausa+ '"/></td>' ;
		
                var strHtml3 = '<td><div align="center"><img src="../../img/delete.png" width="16" height="16" alt="Eliminar" onclick="if(confirm(\'Realmente desea eliminar este rechazo?\')){eliminarFila(' + oId + ');}"/></div>';
                strHtml3 += '<input type="hidden" id="hdnIdCampos_' + oId +'" name="hdnIdCampos_' + oId +'" value="' + oId + '" /></td>';
                var strHtmlTr = "<tr id='rowDetalle_" + oId + "'></tr>";
                var strHtmlFinal = strHtml1 + strHtml2 + strHtml3;
                //tambien se puede agregar todo el HTML de una sola vez.
                //var strHtmlTr = "<tr id='rowDetalle_" + oId + "'>" + strHtml1 + strHtml2 + strHtml3 + strHtml4 + strHtml5 + strHtml6 +"</tr>";
                $("#tbDetalle").append(strHtmlTr);
                //si se agrega el HTML de una sola vez se debe comentar la linea siguiente.
                $("#rowDetalle_" + oId).html(strHtmlFinal);
                 
                return false;
               
            }
            function eliminarFila(oId){
               
                  $("#num_campos").val(parseInt($("#num_campos").val()) - 1);
                $("#rowDetalle_" + oId).remove();
              
               
                return false;
            }

            function cancelar(){
                $("#tbDetalle").html("");
                 $("#num_campos").val(0);
                 
                //alert($("#num_campos").val())
                return false;
            }
         
                  
            function createTable(obj){
           
                var tipoRechazo = $( "#combobox option:selected").html();              
                var idLabel = $(":radio[name='radio']:checked").attr("id");         
                var causa = $('label[for='+idLabel+']').html();  
                //alert($( "#combobox option:selected").html());
                if($( "#combobox option:selected").html() && $("input[name='radio']:checked").val() ){
                    if(validaRegistro(tipoRechazo,causa)){
                        alert("Ya existe un rechazo generado para la combinaci&oacute;n de concepto y causa, favor de revisar los datos.");
                        return false;
                    }
                    else{
                        
                         $("#num_campos").val(parseInt($("#num_campos").val()) + 1);
                        agregarFila(obj);
                    
                       // alert("AgregaRegistro");
                    }  
                }
                else {
                    alert("Favor de seleccionar un concepto de rechazo y una causa antes de generar el rechazo");
                }
        
            }
            function validaRegistro(tipoRechazo,causa){
                
                var existe= false;
                                   
                $("#tblDetalle tbody tr").each(function (index) {
                
               
                    var campo1, campo2;
                    $(this).children("td").each(function (index2) {
                        switch (index2) {
                            case 0:
                                campo1 = $(this).text();
                                campo1= $.trim(campo1);
                                break;
                            case 1:
                                campo2 = $(this).text();
                                campo2= $.trim(campo2);
                                break;
                       
                        }
                      
                        $(this).css("background-color", "#ECF8E0");
                    })
                
    
                   // alert(campo1 + ' hola ' + campo2 );
                    if(tipoRechazo == campo1 && causa == campo2){
                       // alert(tipoRechazo+"igual"+campo1);                       
                        existe= true;
                        
                    }
                        
                })
                return existe;  
            }        
            
        function validaInfo(){             
           var numReg= new String($("#num_campos").val());              
       
           if(numReg != "0"){     
               return true;
             }
             else {
                  alert("Para poder rechazar un recibo es necesario generar por lo menos un rechazo dentro del mismo.");
               return false;
             }
              
         }
   $(function() {
                $( "#combobox" ).combobox();                                   
                $( "#radio" ).buttonset();                   
                               
                               
           
        
            });   