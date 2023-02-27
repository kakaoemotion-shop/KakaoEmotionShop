package com.korit.kakaoemotionshop.service;

import com.korit.kakaoemotionshop.entity.EmoLike;
import com.korit.kakaoemotionshop.exception.CustomLikeException;
import com.korit.kakaoemotionshop.repository.LikeRepository;
<<<<<<< HEAD
import lombok.RequiredArgsConstructor;
=======
import org.springframework.beans.factory.annotation.Autowired;
>>>>>>> 232f36b439b5274658e6eb6a5cc31d0511db3510
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
<<<<<<< HEAD
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;

    public int like(int emoId, int userId) {
=======
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    public void like(int emoId, int userId) {
>>>>>>> 232f36b439b5274658e6eb6a5cc31d0511db3510
        EmoLike emoLike = EmoLike.builder()
                .emoId(emoId)
                .userId(userId)
                .build();
<<<<<<< HEAD

        if(likeRepository.getLikeStatus(emoLike) > 0) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("likeError", "좋아요를 취소해 주세요.");
            throw new CustomLikeException(errorMap);
        }

        likeRepository.addLike(emoLike);
        return emoId;
    }

    public int dislike(int emoId, int userId) {
=======
        if (likeRepository.getLikeStatus(emoLike) > 0 ) {
            Map<String,String> errorMap = new HashMap<>();
            errorMap.put("likeError","이미 좋아요를 눌렀습니다");
            throw new CustomLikeException(errorMap);
        }
        likeRepository.addLike(emoLike);
    }

    public void dislike(int emoId, int userId) {
>>>>>>> 232f36b439b5274658e6eb6a5cc31d0511db3510
        EmoLike emoLike = EmoLike.builder()
                .emoId(emoId)
                .userId(userId)
                .build();
<<<<<<< HEAD

        if(likeRepository.getLikeStatus(emoLike) == 0) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("likeError", "좋아요를 눌러주세요.");
            throw new CustomLikeException(errorMap);
        }

        likeRepository.deleteLike(emoLike);
        return emoId;
    }

}
=======
        if(likeRepository.getLikeStatus(emoLike) == 0 ) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("likeError","좋아요를 눌러주세요 ( 취소할 사항 없음 )");
        }
        likeRepository.deleteLike(emoLike);
    }
}
>>>>>>> 232f36b439b5274658e6eb6a5cc31d0511db3510
