package com.korit.kakaoemotionshop.repository;

//        C : 이모티콘 등록
//        R : 1. 이모티콘 전체 조회
//               검색
        //        - 이모티콘 코드
        //        - 이모티콘명
        //        - 회사
//              2. 이모티콘 코드 조회
//        U : 이모티콘 수정
//        D : 이모티콘 삭제

import com.korit.kakaoemotionshop.entity.EmoMst;
import com.korit.kakaoemotionshop.web.dto.SearchReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface EmoRepository {
    public List<EmoMst> searchEmo(SearchReqDto searchReqDto);
}
