/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pepsico.comunicaCatalogo.dao;

import com.pepsico.comunicaCatalogo.bean.CatLocalidadesBean;
import java.util.List;

/**
 *
 * @author Acer 4553
 */
public interface DaoCatLocalidades {
    
    public List<CatLocalidadesBean> contadorE(String con);
    public List<CatLocalidadesBean> listaLocalidades(int emp);

    public int insertLocalidad(String nombreLocalidad);

    public int updateLocalidad(String idLocalidad, String nombreLocalidad);

    public int deleteLocalidad(String idLocalidad);
}
