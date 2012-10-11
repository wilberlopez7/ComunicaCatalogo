leftBanner = "";

function hiliteLink(e) {
    this.style.textDecoration="underline";
}

function dimliteLink(e) {
    this.style.textDecoration="none";
}
	
function linkTrick() {
    var links = document.getElementsByTagName("A");
    for (var i=0; i<links.length; i++) {
        links[i].onmouseover=hiliteLink;
        links[i].onmouseout=dimliteLink;
    }
}

function openWindow(url,name,winwidth,winheight) {
    newWin = window.open(url,name,'toolbar=yes,location=yno,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=yes,width='+winwidth+',height='+winheight);
    newWin.location.replace(url);
}

function openNewWindow(url,name,parms) {
    newWin = window.open('',name,parms);
    newWin.location.replace(url);
}

function GetTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var hora = "";
    var ultima = "";
    var fecha = "";
    var timeValue = "" + ((hours >12) ? hours -12 :hours)
    timeValue += ((minutes < 10) ? ":0" : ":") + minutes
    timeValue += (hours >= 12) ? " PM" : " AM"
    timerRunning = true;

    mydate = new Date();
    myday = mydate.getDay();
    mymonth = mydate.getMonth();
    myweekday= mydate.getDate();
    weekday= myweekday;
    myyear= mydate.getYear();
    year = myyear
    if(myday == 0) day = " Domingo "
    else if(myday == 1) day = " Lunes "
    else if(myday == 2) day = " Martes "
    else if(myday == 3) day = " Mi�rcoles "
    else if(myday == 4) day = " Jueves "
    else if(myday == 5) day = " Viernes "
    else if(myday == 6) day = " S�bado "
    if(mymonth == 0) month = "Enero "
    else if(mymonth ==1) month = "Febrero "
    else if(mymonth ==2) month = "Marzo "
    else if(mymonth ==3) month = "Abril "
    else if(mymonth ==4) month = "Mayo "
    else if(mymonth ==5) month = "Junio "
    else if(mymonth ==6) month = "Julio "
    else if(mymonth ==7) month = "Agosto "
    else if(mymonth ==8) month = "Septiembre "
    else if(mymonth ==9) month = "Octubre "
    else if(mymonth ==10) month = "Noviembre "
    else if(mymonth ==11) month = "Diciembre"

    var ultima=(day + weekday + " de " + month +" del "+ year);
    return(ultima);
}

function drawFLIPortalTop(banner) {
    var isNav4, isIE4;

    isNav4 = (document.layers)? true:false
    isIE4 = (document.all)? true:false
	
    HMTLStr = "";
    imageDir = "../Autos_Ejec/image/";

    /* Set the banner picture in the upper left */
    if (banner.length > 0)
        //leftBanner = "http://pepwav11117.mis.mex.pi.pvt/"+banner;
        leftBanner = banner;
    else
        leftBanner =  imageDir + "fli_portal_banner_gamesa2.jpg";

    /* Set links without underline for 4.x browsers */
    HTMLStr =
    "<style type=text/css>" +
    "A { text-decoration: none; }" +
    "</style>";
    if ((isNav4) || (isIE4)) document.write(HTMLStr);

    /* Global menu table starts here */
    HTMLStr =
    "<TABLE WIDTH='100%' CELLPADDING=0 CELLSPACING=0 BORDER=0>" +
    "<TR>" +
    "<TD VALIGN='TOP' ALIGN='LEFT' ROWSPAN=3><A HREF='**'><IMG SRC='" + leftBanner + "' ALT='Home' BORDER=0></A></TD>" +
    "<TD VALIGN='TOP' HEIGHT=20 ALIGN='RIGHT'><IMG SRC='" + imageDir + "curve1.gif' WIDTH=18 HEIGHT=20 ALT='' BORDER=0></TD>" +
    "<TD BGCOLOR='#9B8C7C' HEIGHT=20 VALIGN='MIDDLE' ALIGN='RIGHT' NOWRAP COLSPAN=3><FONT COLOR='#FFFFFF' FACE='Verdana, Arial' SIZE=1><B>"
    +
    GetTime() +
    "&nbsp;| " +
    /* No sobreescribir la descripcion PEP : ya que se actualiza con el programa hri832 segun lo capturado por compensaciones hasta que exista una manera de cambiarla directamente*/
    "PEP: $44.72000 " +
    "&nbsp;&nbsp;&nbsp;&nbsp;</B></FONT>" +
    "</TD>" +
    "</TR>" +
    "<TR>" +
    "<TD VALIGN='TOP' HEIGHT=20><IMG SRC='" + imageDir + "clearpixel.gif' WIDTH=19 HEIGHT=15 ALT='' BORDER=0></TD>" +
    "<TD BGCOLOR='#9B8C7C' HEIGHT=20 ALIGN='RIGHT'><IMG SRC='" + imageDir + "curve3.jpg' WIDTH=34 HEIGHT=20 ALT='' BORDER=0></td>" +
    "<TD  bgcolor='#000063' HEIGHT=20 VALIGN='MIDDLE' ALIGN='RIGHT' NOWRAP><b><FONT COLOR='#FFFFFF' FACE='Verdana, Arial' SIZE=1>";
		
    document.write(HTMLStr);
    /* Here are the global items for FLI Portal */


    document.write("&nbsp;&nbsp;<A HREF='' TARGET='_top'><FONT COLOR='#FFFFFF'></FONT></A>&nbsp;&nbsp;<FONT COLOR='#FFFFFF'></FONT>");
		
    /* Finish up the global menu table */
    HTMLStr =
    "</FONT></b>" +
    "</TD>" +
    "<TD BGCOLOR='#9B8C7C' HEIGHT=20 WIDTH=30 ALIGN='LEFT'><IMG SRC='" + imageDir + "curve4.jpg' WIDTH=30 HEIGHT=20 ALT='' BORDER=0></td>" +
    "</TR>" +
    "<TR>" +
    "<TD VALIGN='TOP' HEIGHT=20><IMG SRC='" + imageDir + "clearpixel.gif' WIDTH=19 HEIGHT=15 ALT='' BORDER=0></TD>" +
    "<TD VALIGN='MIDDLE' ALIGN='RIGHT' NOWRAP COLSPAN=3><B><FONT COLOR='black' FACE='Verdana, Arial' SIZE=1>&nbsp;&nbsp;" +
    "</font></b></TD>" +
    "</TR>" +
    "</TABLE>";
		
    document.write(HTMLStr);
}		
