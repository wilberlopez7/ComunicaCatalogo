<%-- 
    Document   : catLocalidades
    Created on : 9/10/2012, 12:44:28 PM
    Author     : Acer 4553
--%>

<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>

<html>
    <%String contextPath = request.getContextPath();%>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="../css/jquery-ui-1.8.6.custom.css" type="text/css" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="../css/demo_table.css" />
        <script src="../js/jquery.toolsfull.min.js"></script>
        <script type="text/javascript" language="javascript" src="../js/jquery.dataTables.js"></script> 
        <script type="text/javascript" src="<%=contextPath%>/dwr/engine.js"></script><!--necesaria para CatalogosNomina-->
        <script type="text/javascript" src="<%=contextPath%>/dwr/util.js"></script><!--necesaria para CatalogosNomina-->
        <script type="text/javascript" src="<%=contextPath%>/dwr/interface/dwrService.js"></script>

        <title>Catalogo Localidades</title>
        
        <style>
              .modal {
                background-color:#E1EAEF;
                display:none;
                width:350px;
                padding:45px;
                text-align:left;
                border:2px solid #333;
                 -moz-border-radius:6px;
                -webkit-border-radius:6px;
                -moz-box-shadow: 0 0 50px #ccc;
                -webkit-box-shadow: 0 0 50px #ccc;
                font:normal 12px verdana, arial, helvetica, sans-serif;
            }
                
            .modal h2 {
                
                margin:0px;
                padding:10px 0 10px 45px;
                border-bottom:1px solid #333;
                font-size:20px;
            }
        </style>
        <script>
            function getResListaLocalidades(listalocalidades) {
                var linea = " <div id=\"demo\"  > <table border=\"1\" id=\"tablLocalidad\" class=\"display\" width=\"100%\"  >";
                linea = linea + "<thead><tr><th>#</th><th>Localidad</th><th>ACCIÓN</th></tr></thead>";
                listaTd = new Array();
                linea=linea+"<tbody>";
                for(var i=0;i<listalocalidades.length;i++){                    
                    fila=listalocalidades[i];
                    idTd= fila.nombreLocalidad;                   
                    listaTd[i]="mod"+fila.nombreLocalidad;
                    var num=[i+1]; 
                    linea = linea + "<tr><td width=\"5%\">" + num+ "</td><td align=\"left\">" + fila.nombreLocalidad+ "</td><td width=\"10%\">\n\
              <IMG id=del title=\"borrar\" SRC=\"../img/pagina/delete.jpg\" ALIGN=\"LEFT\" BORDER=1 onclick=\"borrarLocalidad("+ "'"+fila.idLocalidad+"'" +");\">\n\
              <IMG id=mod title=\"modificar\" "+fila.idLocalidad+"  onclick=\"updateLocalidad("+ "'"+fila.idLocalidad+"'"+",'"+fila.nombreLocalidad+"'" +");\"  title=\"modificar\" SRC=\"../img/pagina/edit.png\" ALIGN=\"right\" BORDER=1  >\n\
                </td></tr>";
                }
                linea = linea + "</tbody></table></div>";
                dwr.util.setValue('listaLocalidad', linea,{
                    escapeHtml:false});             
                $(document).ready(function() {
                    $('#tablLocalidad').dataTable();
                } );               
                // alert(listalocalidades.length);
            }
            
            function mostrarlistaLocalidades(){
               
                dwrService.ListaLocalidades(0,{
                    callback: getResListaLocalidades
                });
            
            }
            function borrarLocalidad(idLocalidad){
                // alert(idLocalidad);
                var borrarok = confirm("¿Seguro que desea borrar la localidad?"); 
                if(borrarok){
                    var idLoc ="";
                    idLoc = idLocalidad;
                    dwrService.deleteLocalidad(idLoc,{
                        callback: getResBorrarLocalidad
                    });
                }
            }          
            
            function getResBorrarLocalidad(resultado){
                if(resultado!=0){
                    mostrarlistaLocalidades();                    
                }
                else{
                    alert("Hubo un error al borrar el registro intentalo mas tarde");                       
                }                 
            }
            
            function updateLocalidad(idLocalidad,nombreLocalidad){
                dwr.util.setValue('idLocalidad', idLocalidad); 
                dwr.util.setValue('Loc', nombreLocalidad); 
          
           
                $("#promptUpdateLocalidad").overlay({
                    mask: {
                        color: '#000000',
                        loadSpeed: 200,
                        opacity: 0.5
                    } , 
                    closeOnClick: false
                }).load();
           
                $("#promptUpdateLocalidad form").submit(function(e) { 
                    // obtiene los datos que ingresa el usuari
                    var idLocalidad=  dwr.util.getValue('idLocalidad');
                    var Loc= dwr.util.getValue('Loc');
                    dwrService.contadorExistente(Loc,{
                        callback: getresultadocontador
                    });
                        
                    function getresultadocontador(resultado){
                        var array = resultado.split("/")
                        var num = array[0];
                        Loc = array[1];
                        
                        if (num ==0){
                             
                            dwrService.updateLocalidad(idLocalidad,Loc,{
                                callback: getresultain
                            });
                            mostrarlistaLocalidades();
                                
                            function getresultain(c){
                                if(c ==1){
                                     
                                    mostrarlistaLocalidades();
                                }else{
                                    alert('No se pudo guardar la localidad, favor de intentarlo mas tarde.');
                                   
                                }
                            }
                        }else{
                            alert('La localidad ya existe en la base de datos');
                        }
                    }  
                    $("#promptUpdateLocalidad").overlay().close();
                    return e.preventDefault();
                });
                 
            }  
            
            

        </script>
        <script>
            $(document).ready(function() {
                mostrarlistaLocalidades();
                
                var triggers = $(".modalInputLocalidad").overlay({  
                    mask: {
                        color: '#000000',
                        loadSpeed: 200,
                        opacity: 0.5
                    },
                    closeOnClick: false
                });

                $("#cerrarVentanaRe").click(function() { 
                    //reset de valores del formulario
                    $("#promptAddLocalidad form").children('input').val('');  
                    triggers.eq(0).overlay().close();
                });
                $("#promptAddLocalidad form").submit(function(e) {
                    var nombreLocalidad = $("#nomLoc", this).val();
                    if((nombreLocalidad!= null && nombreLocalidad!= "")){
                        dwrService.contadorExistente(nombreLocalidad,{
                            callback: getresultadocontador
                        });
                        
                        function getresultadocontador(resultado){
                            //  alert(resultado);
                            var array = resultado.split("/")
                            var num = array[0];
                            var con = array[1];
                          
                            if (num <1){
                                dwrService.insertaL(con,{
                                    callback: getresultain
                                });
                 
                                function getresultain(c){
                                    if(c ==1){
                                        triggers.eq(0).overlay().close();
                                        $("#promptAddLocalidad form").children('input, textarea').val('');
                                        mostrarlistaLocalidades();
                                    }else{
                                        alert('No se pudo guardar la localidad, favor de intentarlo mas tarde.');
                                        triggers.eq(0).overlay().close();
                                    }
                                }
                            }else{
                                alert('La localidad ya existe en la base de datos');
                            }
                        }  
                        
                    }else{
                        alert("El nombre de la localidad es requerido"); 
                    }
                    return e.preventDefault();
                });
                $("#promptUpdateLocalidad").overlay({
                    mask: {
                        color: '#000000',
                        loadSpeed: 200,
                        opacity: 0.5
                    },
                    closeOnClick: false
                 
                });
            });
            
        </script>
    </head>
    <body>

        </br>
        </br>
        </br>
        <table width="90%" border="0">
            <tr>
                <td width="17%" align="right"> 
                    <input type="button"  class="modalInputLocalidad"  value="Agregar Localidad" style="display: inline-block;
                           margin-top: 10px;
                           margin-right:80px;
                           padding: 5px 5px;
                           background: #08377D;                        
                           font-size: 12px;
                           font-weight:bold;
                           letter-spacing:2px;
                           color: #FFFFFF; "  rel="#promptAddLocalidad"></input>
                </td>
            </tr>
        </table>
        <br />

        <div id="listaLocalidad">  ${lista} </div>
        <div class="modal" id="promptAddLocalidad">
            <h2>Agregar Localidad</h2>

            <p>
                Ingrese el nombre de la localidad
            </p>

            <!-- formulario de registro dentro del formulario -->

            <form>
                <label>Localidad *</label><input type="text" id="nomLoc" maxlength="39" title="nombreLocalidad" style="width: 200px; border: 2px solid #cccccc;padding: 5px;font-family: Tahoma, sans-serif;" /> <br /> 
                <br />
                <button type="submit" style="display: inline-block;margin-top: 10px;padding: 5px 5px;background: #08377D;
                        border-radius: 10px;font-size: 12px; font-weight:bold;
                        letter-spacing:1px;color: #FFFFFF; "> Guardar </button>
                <button type="button" id="cerrarVentanaRe" 
                        style="display: inline-block;margin-top: 10px;padding: 5px 5px;background: #08377D;
                        border-radius: 10px;font-size: 12px; font-weight:bold;
                        letter-spacing:1px;color: #FFFFFF; "> Cancelar </button>
            </form>
            <br />
        </div>

   
        <div class="modal" id="promptUpdateLocalidad">
            <h2>Modificar Localidad</h2>

            <p >
                Ingrese la modificación
            </p>

         
            <form >
                Localidad: <input type="text" id="Loc" style="width: 200px; border: 2px solid #cccccc;padding: 5px;font-family: Tahoma, sans-serif;">
                <input type="hidden"   id="idLocalidad">
                <br />
                <button type="submit" style="display: inline-block;margin-top: 10px;padding: 5px 5px;background: #08377D;
                        border-radius: 10px;font-size: 12px; font-weight:bold;
                        letter-spacing:1px;color: #FFFFFF; "> Guardar
                </button>
                <button type="button" class="close" 
                        style="display: inline-block;margin-top: 10px;padding: 5px 5px;background: #08377D;
                        border-radius: 10px;font-size: 12px; font-weight:bold;
                        letter-spacing:1px;color: #FFFFFF; ">
                    Cancelar </button>

            </form>
            <br />

        </div>
        <script>
            $(document).ready(function() {
                $('input#nombreLocalidad').focus();
            });
        </script>  

    </body>

</html>