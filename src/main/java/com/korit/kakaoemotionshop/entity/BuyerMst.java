package com.korit.kakaoemotionshop.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuyerMst {
    private int buyId;
    private  String emoName;
    private  String buyerName;
    private  String buyerEmail;
}
