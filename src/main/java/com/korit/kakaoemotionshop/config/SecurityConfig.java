package com.korit.kakaoemotionshop.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@EnableWebSecurity  //WebSecurity  설정한다 기존에 있는 security 를 버리고 새로설정?
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public BCryptPasswordEncoder passwordEncoder () {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
        //PathRequest.toStaticResources().atCommonLocations() : static 폴더안에 있는 경로를 보안을 걸지 않는다
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.httpBasic().disable(); //disable() : 비활성화
        http.authorizeRequests()
                .antMatchers("/mypage/**", "/security/**")//요청 주소로 들어가면 ,  .antMatchers: 요청주소
                .authenticated() //인증이 필요하다
                .antMatchers("/admin/**")
                .hasRole("ADMIN")
                .anyRequest()// 다른 주소들은
                .permitAll() //모든 권한을 줘라
                .and()
                .formLogin()  //form 으로 로그인 한다
                .loginPage("/account/login") //로그인 페이지 get 요청
                .loginProcessingUrl("/account/login") //login.html 에 form 의 action 은 post 요청인데 controller 에 post 요청을 만들지 않았다 그 post 요청은 .loginProcessingUrl 이 로그인 인증 post 요청을 날린다
//                .successForwardUrl("/mypage") //이전 요청 다 무시하고 성공하면 무조건 해당 경로로 들어가라
                .failureForwardUrl("/account/login/error")//로그인 실패 했을때 무조건 해당 경로로 들어가라, controller 는 PostMapping 으로
                .defaultSuccessUrl("/index"); //로그인 성공시 /index 로 넘어간다 ,  defaultSuccessUrl 들어갈 경로의 페이지가 없는 경우 들어가는 곳
    }
}
