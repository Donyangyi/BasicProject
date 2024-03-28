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
	public String user_edit() {
		return "user_info/user_edit";
	}
	
	@GetMapping("/user_regi_list")
	public String user_regi_list() {
		return "user_info/user_regi_list";
	}
}
