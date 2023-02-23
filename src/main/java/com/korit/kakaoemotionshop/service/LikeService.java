package com.korit.kakaoemotionshop.service;

import com.korit.kakaoemotionshop.entity.EmoLike;
import com.korit.kakaoemotionshop.exception.CustomLikeException;
import com.korit.kakaoemotionshop.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;

    public int like(int emoId, int userId) {
        EmoLike emoLike = EmoLike.builder()
                .emoId(emoId)
                .userId(userId)
                .build();

        if(likeRepository.getLikeStatus(emoLike) > 0) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("likeError", "좋아요를 취소해 주세요.");
            throw new CustomLikeException(errorMap);
        }

        likeRepository.addLike(emoLike);
        return emoId;
    }

    public int dislike(int emoId, int userId) {
        EmoLike emoLike = EmoLike.builder()
                .emoId(emoId)
                .userId(userId)
                .build();

        if(likeRepository.getLikeStatus(emoLike) == 0) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("likeError", "좋아요를 눌러주세요.");
            throw new CustomLikeException(errorMap);
        }

        likeRepository.deleteLike(emoLike);
        return emoId;
    }

}