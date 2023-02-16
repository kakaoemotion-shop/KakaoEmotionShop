package com.korit.kakaoemotionshop.web.dto;

import lombok.Data;

import java.util.List;

@Data
public class DeleteEmoReqDto {
    private List<Integer> userIds;
}
