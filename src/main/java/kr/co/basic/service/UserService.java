package kr.co.basic.service;

import java.io.File;
import java.util.List;

import javax.validation.Valid;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import kr.co.basic.bean.UserInfo;
import kr.co.basic.bean.UserSkill;
import kr.co.basic.dao.UserDao;
import kr.co.basic.dao.UserInfoDao;
import kr.co.basic.mapper.UserMapper;

@Service
@PropertySource("/WEB-INF/properties/option.properties")
public class UserService {
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private UserMapper userMapper;

	@Value("${path.upload}")
	private String path_upload;

	//파일 세이브
	private String saveUploadFile(MultipartFile upload_file) {
		String file_name = System.currentTimeMillis() + "_" + // 아래 코드가 같은 파일명을 업로드시에 오류가 발생해서 시간을 붙여서 겹치지 않도록 함.
				FilenameUtils.getBaseName(upload_file.getOriginalFilename()) + "."
				+ FilenameUtils.getExtension(upload_file.getOriginalFilename());

		try {
			upload_file.transferTo(new File(path_upload + "/" + file_name));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return file_name;
	}
	
	// 유저 추가
	public boolean regiUserPro(String name, String userId, String userPw, String gender, String phone,
							   String regiDate, String posCd, String skillRankCd, String email,
							   String address, String addressDetail, MultipartFile userImage, List<String> skills) {
		UserInfo userInfo = new UserInfo();
		userInfo.setUserNm(name);
		userInfo.setUserId(userId);
		userInfo.setUserPw(userPw);
		userInfo.setGenderCd(gender);
		userInfo.setPhoneNumber(phone);
		userInfo.setRegiDate(regiDate);
		userInfo.setPosCd(posCd);
		userInfo.setSkillRankCd(skillRankCd);
		userInfo.setEmail(email);
		userInfo.setWorkStateCd("1");
		userInfo.setUserStateCd("1");
		userInfo.setAddress(address + " " + addressDetail);
		userInfo.setUploadUserImage(userImage);
		
		MultipartFile upload_file = userInfo.getUploadUserImage();
		try {
			if (upload_file.getSize() > 0) { // upload_file이 있다면
				String file_name = saveUploadFile(upload_file);
				userInfo.setUserImage(file_name);
			}
			
			userDao.regiUserPro(userInfo);
			String userSeq = userMapper.getUserSeq(userInfo);
			
			for(int i = 0; i < skills.size(); i++) {
				UserSkill userSkill = new UserSkill();
				userSkill.setUserSeq(userSeq);
				userSkill.setDtlCode(skills.get(i));
				userMapper.regiSkill(userSkill);
			}
			
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	// 아이디 중복 검사
	public boolean duplicateCheck(String userId) {
		String checkUserId = userMapper.duplicateCheck(userId);
		if(checkUserId != null) {
			return false;
		} else {
			return true;
		}
	}
}
