package com.korit.kakaoemotionshop.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/account")
public class AccountController {

    @GetMapping("/login")
    public String login() { return "account/login"; }

    @GetMapping("/login/error")
    public String loginerror() { return "account/login_error"; }

    @GetMapping("/register")
    public String register() { return "account/register_sign"; }

    @GetMapping("/mypage")
    public String mypage() { return "account/mypage"; }
}
