package com.korit.kakaoemotionshop.repository;

import com.korit.kakaoemotionshop.entity.BuyerMst;
import com.korit.kakaoemotionshop.web.dto.BuyerReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BuyerRepository {

    public int saveBuyer(BuyerMst buyerMst);
}
