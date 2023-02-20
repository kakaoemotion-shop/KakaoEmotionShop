package com.korit.kakaoemotionshop.web.api;

import com.korit.kakaoemotionshop.security.PrincipalDetails;
import com.korit.kakaoemotionshop.service.LikeService;
import com.korit.kakaoemotionshop.web.dto.CMRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LikeApi {

    @Autowired
    private LikeService likeService;

    @PostMapping("/emo/{emoId}/like")
    public ResponseEntity<CMRespDto<?>> like(@PathVariable int emoId,
                                             @AuthenticationPrincipal PrincipalDetails principalDetails){
        likeService.like(emoId, principalDetails.getUser().getUserId());
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",true));
    }

    @DeleteMapping("/emo/{emoId}/like")
    public ResponseEntity<CMRespDto<?>> dislike(@PathVariable int emoId,
                                             @AuthenticationPrincipal PrincipalDetails principalDetails){
        likeService.dislike(emoId, principalDetails.getUser().getUserId());
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",true));
    }

}
