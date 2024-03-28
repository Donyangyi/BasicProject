package kr.co.basic.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;

import kr.co.basic.bean.UserInfo;
import kr.co.basic.bean.UserSkill;

public interface UserMapper {

	// 모든 스킬 정보 조회
	@Select("select dtlCode, dtlCodeNm from code_detail where dCode = 'D060' order by TO_NUMBER(dtlCode)")
	List<UserSkill> searchAllSkill();
	
	// 모든 성별 정보 조회
	@Select("select dtlCode, dtlCodeNm from code_detail where dCode = 'D010' order by TO_NUMBER(dtlCode)")
	List<UserSkill> searchAllGender();
	
	// 모든 직급 정보 조회
	@Select("select dtlCode, dtlCodeNm from code_detail where dCode = 'D020' order by TO_NUMBER(dtlCode)")
	List<UserSkill> searchAllPosition();
	
	// 모든 기술등급 정보 조회
	@Select("select dtlCode, dtlCodeNm from code_detail where dCode = 'D030' order by TO_NUMBER(dtlCode)")
	List<UserSkill> searchAllSkillLevel();
	
	// 모든 전화번호 정보 조회
	@Select("select dtlCode, dtlCodeNm from code_detail where dCode = 'D100' order by TO_NUMBER(dtlCode)")
	List<UserSkill> searchAllPhoneNumber();
	
	// 모든 이메일 정보 조회
	@Select("select dtlCode, dtlCodeNm from code_detail where dCode = 'D110' order by TO_NUMBER(dtlCode)")
	List<UserSkill> searchAllEmail();
	
	// 아이디 중복 검사
	@Select("select userId from info_user where userId = #{userId}")
	String duplicateCheck(String userId);
	
	// 유저 추가
	@SelectKey(statement = "select 'U'||lpad(userSeq_inc.nextval, 3, 0) from dual", keyProperty = "userSeq", before = true, resultType = String.class)
	@Insert("INSERT INTO INFO_USER "
			+ "( "
			+ "userSeq, userNm, userId, "
			+ "userPw, genderCd, phoneNumber, "
			+ "regiDate, posCd, skillRankCd, "
			+ "email, address, workStateCd, "
			+ "userStateCd, userRegiDate, userImage "
			+ ") "
			+ "VALUES "
			+ "( "
			+ "#{userSeq}, #{userNm}, #{userId}, "
			+ "#{userPw}, #{genderCd}, #{phoneNumber}, "
			+ "#{regiDate}, #{posCd, jdbcType=VARCHAR}, #{skillRankCd ,jdbcType=VARCHAR}, "
			+ "#{email, jdbcType=VARCHAR}, #{address}, #{workStateCd}, "
			+ "#{userStateCd}, sysdate, #{userImage})")
	void regiUserPro(UserInfo userInfo);
	
	// 유저의 고유번호 조회
	@Select("select userSeq from info_user "
			+ "where userNm = #{userNm} and phonenumber = #{phoneNumber}")
	String getUserSeq(UserInfo userInfo);
	
	// 유저 스킬 추가
	@Insert("insert into info_user_skill (userSeq, dtlCode) "
			+ "values (#{userSeq}, #{dtlCode})")
	void regiSkill(UserSkill userSkill);
}
