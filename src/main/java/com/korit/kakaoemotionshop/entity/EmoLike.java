package com.korit.kakaoemotionshop.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class EmoLike {

    @ApiModelProperty(value = "좋아요번호", example = "1")
    private int likeId;

    @ApiModelProperty(value = "이모티콘ID", example = "1")
    private int emoId;

    @ApiModelProperty(value = "사용자ID", example = "1")
    private int userId;
}
