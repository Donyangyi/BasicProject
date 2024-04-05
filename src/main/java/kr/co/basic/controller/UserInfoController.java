package kr.co.basic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.basic.bean.CodeDetail;
import kr.co.basic.bean.ProjectInfo;
import kr.co.basic.bean.UserInfo;
import kr.co.basic.bean.UserProjectInfo;
import kr.co.basic.bean.UserSkill;
import kr.co.basic.dao.UserDao;
import kr.co.basic.dao.UserInfoDao;
import kr.co.basic.service.UserInfoService;

@Controller
@RequestMapping("/user_info")
public class UserInfoController {
	
	@Autowired
	private UserInfoDao userInfoDao;
	
	@Autowired
	private UserInfoService userInfoService;
	
	@Autowired
	private UserDao userDao;
	
	@GetMapping("/user_search")
	public String user_search(Model model, @RequestParam(value = "page", defaultValue = "1") int page) {
		model.addAttribute("page", page);
		
		List<UserSkill> positionBean = userDao.searchAllPosition();
		model.addAttribute("positionBean", positionBean);
		
		List<UserSkill> workStateBean = userDao.searchAllWorkState();
		model.addAttribute("workStateBean", workStateBean);
		
		List<UserSkill> listCountBean = userDao.searchAllListCount();
		model.addAttribute("listCountBean", listCountBean);
		return "user_info/user_search"; 
	}
	
	@GetMapping("/user_detail")
	public String user_detail(Model model, @RequestParam(value = "userSeq") String userSeq) {
		// 유저 개인 정보
		UserInfo userBean = userInfoDao.getUserInfo(userSeq);
		model.addAttribute("userBean", userBean);
		
		// 유저 스킬 정보
		String userSkills = userInfoDao.getUserSkills(userSeq);
		model.addAttribute("userSkills", userSkills);
		
		// 유저 한명의 프로젝트
		List<UserProjectInfo> userProjectInfo = userInfoService.getUserProjectInfo(userSeq);
		model.addAttribute("userProjectInfo", userProjectInfo);
		
		// 역할
		List<CodeDetail> roleList = userInfoService.getRoleNm();
		model.addAttribute("roleList", roleList);
		return "user_info/user_detail";
	}
	
	@GetMapping("/popup_project")
	public String popup_project(@RequestParam(value = "userSeq") String userSeq, Model model) {
		model.addAttribute("userSeq",userSeq);
		return "user_info/popup_project";
	}
	
	@GetMapping("/user_edit")
	public String user_edit(@RequestParam(value = "userSeq") String userSeq, Model model) {
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
		
		// 유저 개인 정보
		UserInfo userBean = userInfoDao.getUserInfo(userSeq);
		model.addAttribute("userBean", userBean);
		
		// 해당 회원의 보유 스킬
		List<UserSkill> skillList = userDao.getUserSkills(userSeq);
		model.addAttribute("skillList", skillList);
		
		// 모든 재직상태 조회
		List<UserSkill> workStateBean = userDao.searchAllWorkState();
		model.addAttribute("workStateBean", workStateBean);
		
		model.addAttribute("userSeq", userSeq);
		return "user_info/user_edit";
	}
	
	@GetMapping("/user_regi_admin")
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
		
		// 모든 전화번호 정보 조회
		List<UserSkill> phoneNumberBean = userDao.searchAllPhoneNumber();
		model.addAttribute("phoneNumberBean", phoneNumberBean);
		
		// 모든 기술등급 정보 조회
		List<UserSkill> emailBean = userDao.searchAllEmail();
		model.addAttribute("emailBean", emailBean);
		
		// 모든 재직상태 조회
		List<UserSkill> workStateBean = userDao.searchAllWorkState();
		model.addAttribute("workStateBean", workStateBean);
		
		// 모든 등록상태 조회
		List<UserSkill> regiStateBean = userDao.searchAllRegiState();
		model.addAttribute("regiStateBean", regiStateBean);
		
		return "user_info/user_regi_admin";
	}
	
	@GetMapping("/user_regi_list")
	public String user_regi_list() {
		return "user_info/user_regi_list";
	}
}
