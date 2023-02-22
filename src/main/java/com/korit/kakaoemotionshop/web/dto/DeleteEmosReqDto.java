package com.korit.kakaoemotionshop.web.dto;

import lombok.Data;

import java.util.List;

@Data
public class DeleteEmosReqDto {
    private List<Integer> emoId;
}
