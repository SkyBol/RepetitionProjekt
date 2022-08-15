package ch.noseryoung.blockshop.blockshop.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private static final String PATH = "/api/**";

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {}

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {}

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/login").permitAll();
        // TODO
    }
}
