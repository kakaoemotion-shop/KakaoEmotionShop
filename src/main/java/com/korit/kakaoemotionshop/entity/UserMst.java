package com.korit.kakaoemotionshop.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserMst {

    private int userId;
    private String username;
    private String password;
    private String name;
    private String email;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    private List<RoleDtl> roleDtl;
}
