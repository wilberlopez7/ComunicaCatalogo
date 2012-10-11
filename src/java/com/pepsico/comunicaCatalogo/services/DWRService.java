package com.pepsico.comunicaCatalogo.services;

import com.pepsico.comunicaCatalogo.bean.CatLocalidadesBean;
import com.pepsico.comunicaCatalogo.dao.DaoCatLocalidades;
import java.util.ArrayList;
import java.util.List;
import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;

/*
 * To change this template, choose Tools | Templates and open the template in
 * the editor.
 */
@RemoteProxy(name = "dwrService")
public class DWRService {
    
    public DWRService() {
    }
    @Autowired
    private DaoCatLocalidades daoCat;
    
    @RemoteMethod
    public List<CatLocalidadesBean> ListaLocalidades(int emp) {
       // List<CatLocalidadesBean> localidades = new ArrayList<CatLocalidadesBean>();
         List localidades = daoCat.listaLocalidades(emp);
        //localidades = daoCat.listaLocalidades(emp);
       //  System.out.println("localidades"+localidades);
     
        return localidades;

        
    }
    

    
    @RemoteMethod
    public String test(String prueba){
    return prueba;
    }
    
    @RemoteMethod
    public int insertLocalidad(String nombreLocalidad) {
        int resultado = 0;
        resultado = daoCat.insertLocalidad(nombreLocalidad);
        
        return resultado;
    }
    
      @RemoteMethod
    public int insertaL(String nombreLocalidad) {
        int resultado = 0;
        resultado = daoCat.insertLocalidad(nombreLocalidad);

        return resultado;
    }
    
    
    @RemoteMethod
    public int updateLocalidad(String idLocalidad, String nombreLocalidad) {
        int resultado = 0;
        resultado = daoCat.updateLocalidad(idLocalidad, nombreLocalidad);
        return resultado;
    }
    
    @RemoteMethod
    public int deleteLocalidad(String idLocalidad) {
        int resultado = 0;
        resultado = daoCat.deleteLocalidad(idLocalidad);
        return resultado;
    }
    
      @RemoteMethod
    public String contadorExistente(String nombreLocalidad) {
        String resultado = "";
        List<CatLocalidadesBean> list = daoCat.contadorE(nombreLocalidad);
        if (!list.isEmpty()) {
            for (int i = 0; i < list.size(); i++) {
                resultado = String.valueOf(list.get(i).getContadorExistentes());
            }
        }
        resultado = resultado+"/"+nombreLocalidad;
        return resultado;
    }
}
