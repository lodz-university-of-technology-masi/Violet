package com.it.p.lodz.pl.masi.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;

@Configuration
@EnableResourceServer
public class Oauth2ResourceServerConfig extends ResourceServerConfigurerAdapter {


    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
//                .antMatchers(HttpMethod.GET, "/candidate/positions").hasAuthority("moderator")
//                .antMatchers(HttpMethod.GET, "/position/list").hasAuthority("moderator")
//                .antMatchers(HttpMethod.POST, "/position/add").hasAuthority("moderator")
//                .antMatchers(HttpMethod.GET, "/candidate/list/test").hasAuthority("moderator")
//                .antMatchers(HttpMethod.GET, "/moderator/list/test").hasAuthority("moderator")
//                .antMatchers(HttpMethod.POST, "/user/redactor/add").hasAuthority("moderator")
//                .antMatchers(HttpMethod.GET, "/user/redactor").hasAuthority("moderator")
//                .antMatchers(HttpMethod.DELETE, "/user/redactor/{\\d+}").hasAuthority("moderator")
//                .antMatchers(HttpMethod.PUT, "/user/redactor/{\\d+}").hasAuthority("moderator")
                .anyRequest().hasAuthority("moderator")
                .antMatchers("/login").permitAll()
                .and().formLogin().permitAll()
                .and().exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler());
    }
}