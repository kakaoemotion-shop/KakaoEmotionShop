package com.korit.kakaoemotionshop.config;

import com.korit.kakaoemotionshop.security.PrincipalOAuth2DetailsService;
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
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final PrincipalOAuth2DetailsService principalOAuth2DetailsService;

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
                .and()
                .oauth2Login() //oauth2 로그인 성공 후 가져올 때의 설정들
                .userInfoEndpoint() // 소셜로그인 성공 시 후속 조치를 진행할 UserService 인터페이스 구현체 등록
                .userService(principalOAuth2DetailsService) // 리소스 서버에서 사용자 정보를 가져온 상태에서 추가로 진행하고자 하는 기능 명시
                .and()
                .defaultSuccessUrl("/index");

    }
}
