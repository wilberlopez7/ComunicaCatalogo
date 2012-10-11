/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pepsico.comunicaCatalogo.dao.impl;

import com.pepsico.comunicaCatalogo.bean.CatLocalidadesBean;
import com.pepsico.comunicaCatalogo.dao.DaoCatLocalidades;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;
import oracle.jdbc.OracleTypes;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

/**
 *
 * @author Acer 4553
 */
@Component
public class JdbDaoCatLocalidades implements DaoCatLocalidades{
    
     @Autowired
    @Qualifier("dsCm")
    private DataSource dsCm;
    private static Log logger = LogFactory.getLog(JdbDaoCatLocalidades.class);

    public List<CatLocalidadesBean> listaLocalidades(int emp) {
logger.debug("Lista Localidades");
        List listaLocalidades = new ArrayList<CatLocalidadesBean>();
        String query = "begin ?:= pkg_comunicados_mipepsico.getListaLocalidades(?); end;";
        CallableStatement stmt = null;
        Connection connection = null;
        ResultSet rset = null;
        try {
            connection = dsCm.getConnection();
            stmt = connection.prepareCall(query);
            stmt.registerOutParameter(1, OracleTypes.CURSOR);
            stmt.setInt(2, emp);
            stmt.execute();
            rset = (ResultSet) stmt.getObject(1);
            while (rset.next()) {
                CatLocalidadesBean beanCat = new CatLocalidadesBean();
                beanCat.setIdLocalidad(rset.getString("IDLOCALIDAD"));
                // System.out.println(beanCat.getIdre());
                beanCat.setNombreLocalidad(rset.getString("NOMBRELOCALIDAD"));
                listaLocalidades.add(beanCat);
            }

        } catch (SQLException ex) {
            logger.error(ex.getLocalizedMessage(), ex);
        } finally {
            try {
                logger.debug("Closing down all connections...");
                if (stmt != null) {
                    stmt.close();
                }
                if (rset != null) {
                    rset.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException ec) {
                logger.error(ec.getLocalizedMessage(), ec);
            }
        }
        return listaLocalidades;

    }

    public int insertLocalidad(String nombreLocalidad) {
logger.debug("Nva Localidad");
        String query = "{call pkg_comunicados_mipepsico.insertLocalidad(?,?)}";
        CallableStatement stmt = null;
        Connection connection = null;
        int r = 0;
        try {
            connection = dsCm.getConnection();
            stmt = connection.prepareCall(query);
            stmt.registerOutParameter(2, Types.INTEGER);
            stmt.setString(1, nombreLocalidad);
            stmt.execute();
            r = (Integer) stmt.getObject(2);

        } catch (SQLException ex) {
            logger.error(ex.getLocalizedMessage(), ex);
        } finally {
            try {
                logger.debug("Closing down all connections...");
                if (stmt != null) {
                    stmt.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException ec) {
                logger.error(ec.getLocalizedMessage(), ec);
            }
        }
        return r;
    }

    public int updateLocalidad(String idLocalidad, String nombreLocalidad) {
    logger.debug("actualiza localidad");
        String query = "{call pkg_comunicados_mipepsico.updateLocalidad(?,?,?)}";
        CallableStatement stmt = null;
        Connection connection = null;
        int r = 0;
        try {
            connection = dsCm.getConnection();
            stmt = connection.prepareCall(query);
            stmt.registerOutParameter(3, Types.INTEGER);
            stmt.setString(1, idLocalidad);
            stmt.setString(2, nombreLocalidad);
            stmt.execute();
            r = (Integer) stmt.getObject(3);

        } catch (SQLException ex) {
            logger.error(ex.getLocalizedMessage(), ex);
        } finally {
            try {
                logger.debug("Closing down all connections...");
                if (stmt != null) {
                    stmt.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException ec) {
                logger.error(ec.getLocalizedMessage(), ec);
            }
        }
        return r;
    }

    public int deleteLocalidad(String idLocalidad) {
logger.debug("Elimina localidad");
        String query = "{call pkg_comunicados_mipepsico.deleteLocalidad(?,?)}";
        CallableStatement stmt = null;
        Connection connection = null;
        int r = 0;
        try {
            connection = dsCm.getConnection();
            stmt = connection.prepareCall(query);
            stmt.registerOutParameter(2, Types.INTEGER);
            stmt.setString(1, idLocalidad);
            stmt.execute();
            r = (Integer) stmt.getObject(2);

        } catch (SQLException ex) {
            logger.error(ex.getLocalizedMessage(), ex);
        } finally {
            try {
                logger.debug("Closing down all connections...");
                if (stmt != null) {
                    stmt.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException ec) {
                logger.error(ec.getLocalizedMessage(), ec);
            }
        }
        return r;
    }
    
    public List<CatLocalidadesBean> contadorE(String con) {
        logger.debug("contador");

        List existe = new ArrayList<CatLocalidadesBean>();
        String query = "begin ?:= pkg_comunicados_mipepsico.contadorExistentes(?); end;";
        CallableStatement stmt = null;
        Connection connection = null;
        ResultSet rset = null;
        try {

            connection = dsCm.getConnection();
            stmt = connection.prepareCall(query);
            stmt.registerOutParameter(1, OracleTypes.CURSOR);
            stmt.setString(2, con);
            stmt.execute();
            rset = (ResultSet) stmt.getObject(1);
            while (rset.next()) {
                CatLocalidadesBean beanCat = new CatLocalidadesBean();
                try {
                    beanCat.setContadorExistentes(Integer.parseInt(rset.getString("con")));
                } catch (Exception e) {
                    beanCat.setContadorExistentes(1);
                }
                existe.add(beanCat);
            }
        } catch (SQLException ex) {
            logger.error(ex.getLocalizedMessage(), ex);
        } finally {
            try {
                logger.debug("Closing down all connections...");
                if (stmt != null) {
                    stmt.close();
                }
                if (rset != null) {
                    rset.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException ec) {
                logger.error(ec.getLocalizedMessage(), ec);
            }
        }
        return existe;
    }
   
     public  List<CatLocalidadesBean> listaLocalidades2(int emp){
        List<CatLocalidadesBean> listaLocalidades = new ArrayList<CatLocalidadesBean>();
        CatLocalidadesBean bean1 = new CatLocalidadesBean();
        CatLocalidadesBean bean2 = new CatLocalidadesBean();
        CatLocalidadesBean bean3 = new CatLocalidadesBean();
        CatLocalidadesBean bean4 = new CatLocalidadesBean();
        CatLocalidadesBean bean5 = new CatLocalidadesBean();
        bean1.setIdLocalidad("1");
        bean1.setNombreLocalidad("Los soles");
        listaLocalidades.add(bean1);
         bean2.setIdLocalidad("2");
        bean2.setIdLocalidad("Los soles II");
        listaLocalidades.add(bean2); 
        bean3.setIdLocalidad("3");
        bean3.setIdLocalidad("Los soles III");
        listaLocalidades.add(bean3); 
        bean4.setIdLocalidad("4");
        bean4.setIdLocalidad("Los soles IV");
        listaLocalidades.add(bean4); 
        bean5.setIdLocalidad("5");
        bean5.setIdLocalidad("Los soles V");
        listaLocalidades.add(bean5);
        return listaLocalidades;
        
        }
    
}
