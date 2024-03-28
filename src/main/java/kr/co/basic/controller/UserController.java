package kr.co.basic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.basic.bean.UserSkill;
import kr.co.basic.dao.UserDao;
import kr.co.basic.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserDao userDao;
	
	@GetMapping("/user_regi")
	public String main(Model model) {
		// 모든 스킬 정보 조회
		List<UserSkill> skillBean = userDao.searchAllSkill();
		model.addAttribute("skillBean", skillBean);
		
		// 모든 성별 정보 조회
		List<UserSkill> genderBean = userDao.searchAllGender();
		model.addAttribute("genderBean", genderBean);
		
		// 모든 직급 정보 조회
		List<UserSkill> positionBean = userDao.searchAllPosition();
		model.addAttribute("positionBean", positionBean);
		
		// 모든 기술등급 정보 조회
		List<UserSkill> skillLevelBean = userDao.searchAllSkillLevel();
		model.addAttribute("skillLevelBean", skillLevelBean);
		
		// 모든 기술등급 정보 조회
		List<UserSkill> phoneNumberBean = userDao.searchAllPhoneNumber();
		model.addAttribute("phoneNumberBean", phoneNumberBean);
		
		// 모든 기술등급 정보 조회
		List<UserSkill> emailBean = userDao.searchAllEmail();
		model.addAttribute("emailBean", emailBean);
		
		return "user/user_regi";
	}

}
