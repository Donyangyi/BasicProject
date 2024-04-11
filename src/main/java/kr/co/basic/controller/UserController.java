package kr.co.basic.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.basic.bean.UserInfo;
import kr.co.basic.bean.UserSkill;
import kr.co.basic.dao.UserDao;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserDao userDao;
	
	@Resource(name = "loginUserBean")
	private UserInfo loginUserBean;
	
	@GetMapping("/user_regi")
	public String user_regi(Model model) {
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
	
	@GetMapping("/not_login")
	public String not_login() {
		return "user/not_login";
	}
	
	@GetMapping("/logout_pro")
	public String logout_pro() {
		UserInfo user = new UserInfo();
		BeanUtils.copyProperties(user, loginUserBean);
		return "redirect:/main";
	}
	
	@GetMapping("/not_permission")
	public String not_permission() {
		return "user/not_permission";
	}

}
