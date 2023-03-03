package com.korit.kakaoemotionshop.repository;

import com.korit.kakaoemotionshop.entity.HotSearchEmo;
import com.korit.kakaoemotionshop.web.dto.HotSearchReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface HotSearchRepository {

    public int getUserSearchEmoTotalCount(HotSearchReqDto hotSearchReqDto);
    public List<HotSearchEmo> userSearchEmo(HotSearchReqDto hotSearchReqDto);
}