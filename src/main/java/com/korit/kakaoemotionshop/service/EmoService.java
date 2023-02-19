package com.korit.kakaoemotionshop.service;

import com.korit.kakaoemotionshop.entity.EmoMst;
import com.korit.kakaoemotionshop.exception.CustomValidationException;
import com.korit.kakaoemotionshop.repository.EmoRepository;
import com.korit.kakaoemotionshop.web.dto.EmoReqDto;
import com.korit.kakaoemotionshop.web.dto.SearchReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmoService {

    @Autowired
    private EmoRepository emoRepository;

    public List<EmoMst> searchEmo(SearchReqDto searchReqDto){
        searchReqDto.setIndex();
        return emoRepository.searchEmo(searchReqDto);
    }

    public void registerEmo(EmoReqDto emoReqDto){
        duplicateEmoCode(emoReqDto.getEmoCode());
        emoRepository.saveEmo(emoReqDto);
    }

    private void duplicateEmoCode(String emoCode){
        EmoMst emoMst = emoRepository.findEmoByEmoCode(emoCode);
        if(emoMst != null){
            Map<String,String> errorMap = new HashMap<>();
            errorMap.put("emoCode","이미 존재하는 이모티콘코드입니다.");

            throw new CustomValidationException(errorMap);
        }
    }

    public void modifyEmo(EmoReqDto emoReqDto) {
        emoRepository.updateEmoByEmoCode(emoReqDto);
    }

    public void removeEmo(String emoCode) {
        emoRepository.deleteEmo(emoCode);
    }
}
