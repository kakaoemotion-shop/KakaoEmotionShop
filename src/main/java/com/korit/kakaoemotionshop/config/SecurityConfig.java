package com.korit.kakaoemotionshop.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.http.HttpSession;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

//    private final PrincipalOAuth2DetailsService principalOAuth2DetailsService;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .requestMatchers(PathRequest
                        .toStaticResources()
                        .atCommonLocations());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.httpBasic().disable();
        http.authorizeRequests()
                .antMatchers("/mypage/**")
                .authenticated()
                .anyRequest()
                .permitAll()
                .and()
                .formLogin()
                .loginPage("/account/login")
                .loginProcessingUrl("/account/login")
//                .failureForwardUrl("/account/login_error")
                .defaultSuccessUrl("/index");
//                .and()
//                .logout() //로그아웃 처리를 해준다.
//                .logoutSuccessUrl("/index") // 로그아웃 성공시 리다이렉트 주소
//                .logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
//                .logoutUrl("/account/logout") //로그아웃 처리 URL 설정
//                .deleteCookies("") //로그아웃 할 때, 삭제할 쿠키.
//                .logoutSuccessHandler((request, response, authentication) -> response.sendRedirect("/login")) //로그아웃 성공 후, 개발자가 추가하고 싶은 기능이 있을 때 추가한다.
//                .addLogoutHandler((request, response, authentication) -> { //로그아웃 할 때, 사용자가 지정한 행동을 하고 싶을 때
//                    System.out.println("logout Success!");
//                    HttpSession session = request.getSession();
//                    session.invalidate();
//                })
//                .invalidateHttpSession(true); // 로그아웃 이후 세션 전체 삭제 여부

    }
}
