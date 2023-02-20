package com.korit.kakaoemotionshop.web.dto;

import lombok.Data;

import javax.annotation.sql.DataSourceDefinitions;
import java.time.LocalDate;

@Data
public class EmoticonAddDto {

    private String emoId;
    private String emoCode;
    private String emoName;
    private String company;
    private LocalDate emoDate;

}
