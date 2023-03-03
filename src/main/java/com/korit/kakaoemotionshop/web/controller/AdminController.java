package com.korit.kakaoemotionshop.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {
    @GetMapping("/emo")
    public String registerEmo() { return "admin/emotion_register"; }

    @GetMapping("/search")
    public String searchEmo() { return "admin/emotion_search"; }

    @GetMapping("/modify")
    public String modifyEmo() { return "admin/emotion_modification"; }
}
