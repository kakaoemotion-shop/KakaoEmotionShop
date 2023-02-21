package com.korit.kakaoemotionshop.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
public class SearchEmoReqDto {
    private int page;
    private String searchValue;
    private List<String> categories;
    private int count;
    private int userId;

    @ApiModelProperty(hidden = true)
    private int index;

    public void setIndex() {
        index = (page - 1) * count;
    }

}
