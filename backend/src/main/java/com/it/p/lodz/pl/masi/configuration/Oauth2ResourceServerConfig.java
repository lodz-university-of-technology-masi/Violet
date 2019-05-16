package com.it.p.lodz.pl.masi.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
                .antMatchers("/candidate/**").permitAll()
                .antMatchers("/test/version/{\\d+}").permitAll()
                .antMatchers("/language/list").permitAll()
                .antMatchers("/metric/add").permitAll()
                .antMatchers( "/moderator/**").hasAuthority("moderator")
                .antMatchers(HttpMethod.DELETE, "/moderator/test/{\\d+}").hasAuthority("moderator")
                .antMatchers("/user/redactor/**").hasAuthority("redactor")
                .antMatchers("/user/identity").hasAnyAuthority("redactor", "moderator")
                .antMatchers("/redactor/**").hasAuthority("redactor")
                .antMatchers(HttpMethod.GET, "/user/redactor/{\\d+}").hasAuthority("redactor")
                .antMatchers(HttpMethod.DELETE,"/user/redactor/{\\d+}").hasAuthority("redactor")
                .antMatchers(HttpMethod.PUT,"/user/redactor/{\\d+}").hasAuthority("redactor")
                .antMatchers("/position/**").hasAuthority("moderator")
                .antMatchers(HttpMethod.PUT, "/test/modify/**").hasAuthority("moderator")
                .and().exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler());
    }
}
