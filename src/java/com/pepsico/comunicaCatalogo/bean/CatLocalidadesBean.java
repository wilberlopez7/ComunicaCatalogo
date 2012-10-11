/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pepsico.comunicaCatalogo.bean;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.RemoteProperty;

/**
 *
 * @author Acer 4553
 */
@DataTransferObject
public class CatLocalidadesBean {

    @RemoteProperty
    private String idLocalidad;
    @RemoteProperty
    private String nombreLocalidad;
     @RemoteProperty
     private int contadorExistentes;

    public String getIdLocalidad() {
        return idLocalidad;
    }

    public void setIdLocalidad(String idLocalidad) {
        this.idLocalidad = idLocalidad;
    }

    public String getNombreLocalidad() {
        return nombreLocalidad;
    }

    public void setNombreLocalidad(String nombreLocalidad) {
        this.nombreLocalidad = nombreLocalidad;
    }

    public int getContadorExistentes() {
        return contadorExistentes;
    }

    public void setContadorExistentes(int contadorExistentes) {
        this.contadorExistentes = contadorExistentes;
    }
    
    
    
}
