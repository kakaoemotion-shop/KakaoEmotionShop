package com.korit.kakaoemotionshop.web.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/account")
public class AccountController {

    @GetMapping("/login")
    public String login() { return "account/login"; }


    @PostMapping("/login/error")
    public String loginError() {
        return "account/login_error";
    }

    @GetMapping("/register")
    public String register() { return "account/register_sign"; }

//    @PostMapping("/logout")
//    public String logout(HttpSession session) {
//        session.invalidate();
//        return "redirect:/  "; //주소 요청으로 변경
//    }
}
