package com.korit.kakaoemotionshop.service;

import com.korit.kakaoemotionshop.repository.EmoticonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class EmoticonService {

    private EmoticonRepository emoticonRepository;

    public void removeEmoticon(String emoCode){
        emoticonRepository.deleteEmoticon(emoCode);
    }
}
