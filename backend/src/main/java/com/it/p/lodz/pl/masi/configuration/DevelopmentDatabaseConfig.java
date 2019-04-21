package com.it.p.lodz.pl.masi.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

import javax.sql.DataSource;
import java.sql.Driver;

@Configuration
public class DevelopmentDatabaseConfig {

//    protected static final int DB_PORT = 5432;
//
//    @Bean(name = "mariadb4j")
//    public MariaDB4jSpringService mariaDB4j() {
//        MariaDB4jSpringService service = new MariaDB4jSpringService();
//        service.setDefaultPort(DB_PORT);
//        return service;
//    }
//
//    @Bean
//    @DependsOn("postgreSQL")
//    public DataSource ds() {
//        SimpleDriverDataSource ds = new SimpleDriverDataSource();
//        ds.setDriverClass(Driver.class);
//        ds.setUrl(String.format("jdbc:mysql://localhost:%d/test", DB_PORT));
//        ds.setUsername("root");
//        return ds;
//    }
//
//    @Bean
//    public DataSource dataSource() {
//        DriverManagerDataSource driver = new DriverManagerDataSource();
//        driver.setDriverClassName("org.postgresql.Driver");
//        driver.setUrl("jdbc:postgresql://localhost:5432/masi");
//        driver.setUsername("masi");
//        driver.setPassword("M@Si-uSEr!=Hri");
//        return driver;
//    }
}
