package com.korit.kakaoemotionshop.service;

import com.korit.kakaoemotionshop.entity.EmoMst;
import com.korit.kakaoemotionshop.repository.EmoRepository;
import com.korit.kakaoemotionshop.web.dto.SearchReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmoService {

    @Autowired
    private EmoRepository emoRepository;

    public List<EmoMst> searchEmo(SearchReqDto searchReqDto){
        searchReqDto.setIndex();
        return emoRepository.searchEmo(searchReqDto);
    }
}
