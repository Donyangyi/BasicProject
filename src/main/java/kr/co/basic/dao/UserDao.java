package kr.co.basic.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.co.basic.bean.UserInfo;
import kr.co.basic.bean.UserSkill;
import kr.co.basic.mapper.UserMapper;

@Repository
public class UserDao {
	@Autowired
	private UserMapper userMapper;
	
	// 모든 스킬 정보 조회
	public List<UserSkill> searchAllSkill() {
		return userMapper.searchAllSkill();
	}
	
	// 모든 성별 정보 조회
	public List<UserSkill> searchAllGender() {
		return userMapper.searchAllGender();
	}
	
	// 모든 직급 정보 조회
	public List<UserSkill> searchAllPosition() {
		return userMapper.searchAllPosition();
	}
	
	// 모든 기술등급 정보 조회
	public List<UserSkill> searchAllSkillLevel() {
		return userMapper.searchAllSkillLevel();
	}
	
	// 모든 전화번호 정보 조회
	public List<UserSkill> searchAllPhoneNumber() {
		return userMapper.searchAllPhoneNumber();
	}
	
	// 모든 전화번호 정보 조회
	public List<UserSkill> searchAllEmail() {
		return userMapper.searchAllEmail();
	}
	
	// 모든 이메일 정보 조회
	public void regiUserPro(UserInfo userInfo) {
		userMapper.regiUserPro(userInfo);
	}
}
