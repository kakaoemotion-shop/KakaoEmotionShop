package com.korit.kakaoemotionshop.web.api;


import com.korit.kakaoemotionshop.security.PrincipalDetails;
import com.korit.kakaoemotionshop.service.HotSearchService;
import com.korit.kakaoemotionshop.web.dto.CMRespDto;
import com.korit.kakaoemotionshop.web.dto.HotSearchReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class HotSearchApi {

    private final HotSearchService hotSearchService;

    @GetMapping("/hot/search")
    public ResponseEntity<CMRespDto<?>> search(HotSearchReqDto hotSearchReqDto,
                                               @AuthenticationPrincipal PrincipalDetails principalDetails) {
        if(principalDetails != null) {
            hotSearchReqDto.setUserId(principalDetails.getUser().getUserId());
        }

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),
                        "Successfully",hotSearchService.getSearchEmos(hotSearchReqDto)));

    }

    @GetMapping("/hot/search/totalcount")
    public ResponseEntity<CMRespDto<?>> getSearchEmoTotalCount(HotSearchReqDto hotSearchReqDto) {

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),
                        "Successfully",hotSearchService.getSearchTotalCount(hotSearchReqDto)));

    }
}
