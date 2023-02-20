package com.korit.kakaoemotionshop.web.api.admin;

import com.korit.kakaoemotionshop.aop.annotation.ParamsAspect;
import com.korit.kakaoemotionshop.service.EmoticonService;
import com.korit.kakaoemotionshop.web.dto.CMRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin")
public class EmoticonApi {
// 등록 수저 조회

    private EmoticonService emoticonService;

    @ParamsAspect
    @DeleteMapping("/emoticon/{emoCode}")
    public ResponseEntity<CMRespDto<?>> removeEmoticon(@PathVariable String emoCode){
        emoticonService.removeEmoticon(emoCode);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),"Success", true));
    }
}
