package com.ssacretary.db.repository;

import com.ssacretary.db.entity.SettingKeyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SettingKeywordRepository extends JpaRepository<SettingKeyword,Integer> {
    List<SettingKeyword> findBySetting_SettingId(int settingId);
}
