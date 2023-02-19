package com.korit.kakaoemotionshop.web.api;

import com.korit.kakaoemotionshop.aop.annotation.ParamsAspect;
import com.korit.kakaoemotionshop.aop.annotation.ValidAspect;
import com.korit.kakaoemotionshop.entity.EmoMst;
import com.korit.kakaoemotionshop.service.EmoService;
import com.korit.kakaoemotionshop.web.dto.CMRespDto;
import com.korit.kakaoemotionshop.web.dto.EmoReqDto;
import com.korit.kakaoemotionshop.web.dto.SearchReqDto;
import io.swagger.annotations.Api;
import org.apache.tomcat.jni.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@Api(tags = {"관리자 이모티콘 API"})
@RestController
@RequestMapping("/api/admin")
public class EmoApi {

    @Autowired
    private EmoService emoService;

    @ParamsAspect
    @ValidAspect
    @GetMapping("/emos")
    public ResponseEntity<CMRespDto<List<EmoMst>>> searchEmo(@Valid SearchReqDto searchReqDto,
                                                             BindingResult bindingResult) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),
                        "Successfully",
                        emoService.searchEmo(searchReqDto)));
    }

    @ParamsAspect
    @ValidAspect
    @PostMapping("/emo")
    public ResponseEntity<CMRespDto<?>> registerEmo(@Valid @RequestBody EmoReqDto emoReqDto,
                                                               BindingResult bindingResult) {
        emoService.registerEmo(emoReqDto);
        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(HttpStatus.CREATED.value(),
                        "Successfully", true));
    }

    @ParamsAspect
    @ValidAspect
    @PutMapping("/emo/{emoCode}")
    public ResponseEntity<CMRespDto<?>> modifyEmo(@PathVariable String emoCode,
                                                    @Valid @RequestBody EmoReqDto emoReqDto,
                                                    BindingResult bindingResult) {
        emoService.modifyEmo(emoReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),
                        "Successfully", true));
    }

    @ParamsAspect
    @DeleteMapping("/emo/{emoCode}")
    public ResponseEntity<CMRespDto<?>> removeEmo(@PathVariable String emoCode) {
        emoService.removeEmo(emoCode);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),
                        "Successfully", true));
    }

    @ParamsAspect
    @PostMapping("/emo/{emoCode}/images")
    public ResponseEntity<CMRespDto<?>> registerEmoImg(@PathVariable String emoCode,
                                                       @RequestPart List<MultipartFile> files) {
        emoService.registerEmoImages(emoCode, files);

//        for (MultipartFile file : files) {
//            System.out.println(file.getOriginalFilename());
//        }

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),
                        "Successfully",true));
    }

}
