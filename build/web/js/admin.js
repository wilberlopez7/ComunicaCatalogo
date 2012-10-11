
$(document).ready(function(){
     
    $("#cargando").hide();
    $("#divrecibo").hide();

    
   
   
    //Fechas para la consulta de recibo.....
    $("#pernomini").datepicker({
        dateFormat: 'yy/mm/dd',
        gotoCurrent: true
    });
    $("#pernomfin").datepicker({
        dateFormat: 'yy/mm/dd',
        gotoCurrent: true
    });

    //PETICION AJAX PARA CARGAR LAS DIVISIONES DE ACUERDO A UN BU
    $("#skeybu").change(function(){
        $("#cargando").show();
        $.post("comboLocalidad.jsp",{
            id:$(this).val()
        },function(data){
            $("#skeypro").html(data);
            $("#cargando").hide();
        })
    });

    //PETICION AJAX PARA CARGAR LAS SUBDIVISIONES DE ACUERDO A UNA DIVISION
    $("#skeypro").change(function(){
        $("#cargando").show();
        $.post("comboSubarea.jsp",{
            id:$(this).val()
        },function(data){
            $("#subarea").html(data);
            $("#cargando").hide();
        })
    });

    //SUBMIT PARA LA GENERACION DE REPORTES
    $("#frmParam").submit(function(){
        var anio = $("#skeyper1").val();
        var periodo = $("#skeyper2").val();
        var otrosPeriodos = $("#skeyper2").val();
        var skeyper = "";
        if(anio==0){
            skeyper = 0;
        }
        if(anio.substr(0, 2)== "20"){
            skeyper =  periodo+"/"+anio;
        }else{
            skeyper = anio;
            //otrosPeriodos = anio;
        }
        $("#cargando").show();
        $.post('reporteGral.jsp',{
                skeybu:$("#skeybu").val(),
                skeypro:$("#skeypro").val(),
                skeyper:skeyper,
                subarea:$("#subarea").val(),
                status:$("#estatus").val(),
                anio:$("#skeyper1").val(),
                periodo : otrosPeriodos
            },function(data){
            $("#reporte_content").html(data);
            $("#cargando").hide();
        })
        return false;
    });

    //SUBMIT PARA LA CONSULTA DE RECIBO....
    $("#frmAdmin").submit(function(){
        var nomina = $("#keyemp").val();
        var entero = /^[0-9]+$/;
        if(nomina!= "" && nomina.match(entero)){
            $("#cargando").show();
            $.post('repRecibosAdm.jsp',{
                keyemp:nomina,
                pernomini:$("#pernomini").val(),
                pernomfin:$("#pernomfin").val(),
                anio:$("#skeyper3").val(),
                periodo:$("#skeyper4").val()
                },function(data){
                $("#reporte_content").html(data);
                $("#cargando").hide();
            })
        }else{
            alert ("Captute el numero de nomina del empleado a consultar");
        }
        return false;
    });

//    $("#skeyper1").change(function(){
//        var entero = /^[0-9]+$/;
//        if(!$(this).val().match(entero)){
//            $("#skeyper2").hide();
//        }else{
//            $("#skeyper2").show();
//        }
//    });
  var mostrar = $("#var").val();  
  if(mostrar== '2'){   
      $("#divrecibo").show();  
    $("#divparametros").hide();
     
    $("li a").removeClass("current");
    $("#cr").addClass("current");
    $("#reporte_content").html(''); 
     }
      

});



function show(menu,div_mostrar, div_ocultar,c_url){
    $("#"+div_mostrar).show();
    $("#"+div_ocultar).hide();
   
    $("li a").removeClass("current");
    $("#"+menu).addClass("current");
    $("#reporte_content").html('');    
}

function valida() {

    lscadini = document.frmAdmin.pernomini.value;
    array_fecha = lscadini.split("/") ;
    ls_mes = array_fecha[0];
    ls_dia = array_fecha[1];
    ls_anio = array_fecha[2];
    lscadini = ls_anio + ls_mes + ls_dia;

    lscadfin = document.frmAdmin.pernomfin.value;
    array_fecha = lscadfin.split("/") ;
    ls_mes = array_fecha[0];
    ls_dia = array_fecha[1];
    ls_anio = array_fecha[2];
    lscadfin = ls_anio + ls_mes + ls_dia;

    if (lscadini > lscadfin) {
        alert ("La fecha inicial debe ser menor o igual a la fecha final ");
        document.frmAdmin.pernomini.focus;
        return false;
    }
}