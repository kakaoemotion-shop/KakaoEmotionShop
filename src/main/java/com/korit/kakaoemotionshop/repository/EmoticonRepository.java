package com.korit.kakaoemotionshop.repository;

import com.korit.kakaoemotionshop.entity.EmoMst;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface EmoticonRepository {
    public List getEmoticonAdd(EmoMst emoMst);
    public List deleteEmoticon(String emoCode);
}
