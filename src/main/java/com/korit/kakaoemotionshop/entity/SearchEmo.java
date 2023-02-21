package com.korit.kakaoemotionshop.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SearchEmo {
    private int emoId;
    private String emoCode;
    private String emoName;
    private String company;
    private String emoDate;
    private String category;
    private String saveName;
    private LocalDate returnDate;
    private int userId;
//    private int emoId;
}
