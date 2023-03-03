package com.korit.kakaoemotionshop.service;

import com.korit.kakaoemotionshop.entity.HotSearchEmo;
import com.korit.kakaoemotionshop.repository.HotSearchRepository;
import com.korit.kakaoemotionshop.web.dto.HotSearchReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HotSearchService {

    private final HotSearchRepository hotSearchRepository;

    public int getSearchTotalCount(HotSearchReqDto hotSearchReqDto) {
        return hotSearchRepository.getUserSearchEmoTotalCount(hotSearchReqDto);
    }

    public List<HotSearchEmo> getSearchEmos(HotSearchReqDto hotSearchReqDto) {
        hotSearchReqDto.setIndex();
        return hotSearchRepository.userSearchEmo(hotSearchReqDto);
    }
}