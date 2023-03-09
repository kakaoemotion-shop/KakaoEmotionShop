package com.korit.kakaoemotionshop.web.dto;

import lombok.Data;

@Data
public class BuyerReqDto {
    private int buyId;
    private  String emoName;
    private  String buyerName;
    private  String buyerEmail;
}
