package com.korit.kakaoemotionshop.repository;

import com.korit.kakaoemotionshop.entity.EmoLike;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LikeRepository {

    public int addLike(EmoLike emoLike);
    public int deleteLike(EmoLike emoLike);
    public int getLikeStatus(EmoLike emoLike);
<<<<<<< HEAD
    public int getLikeCount(int emoId);
=======
>>>>>>> 232f36b439b5274658e6eb6a5cc31d0511db3510
}
