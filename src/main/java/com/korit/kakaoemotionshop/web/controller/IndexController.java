package com.korit.kakaoemotionshop.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping({"","/index"})
    public String index() { return "/kakaopage/index"; }

    @GetMapping("/search")
    public String searchResult() { return "/kakaopage/main_search"; }
}
