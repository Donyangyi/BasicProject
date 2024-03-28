package kr.co.basic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.basic.bean.CodeDetail;
import kr.co.basic.bean.ProjectInfo;
import kr.co.basic.bean.UserProjectInfo;
import kr.co.basic.dao.ProjectInfoDao;
import kr.co.basic.service.ProjectInfoService;
import kr.co.basic.service.UserInfoService;

@Controller
@RequestMapping("/project_info")
public class ProjectInfoController {

	@Autowired
	private ProjectInfoDao projectInfoDao;
	
	@Autowired
	private ProjectInfoService projectInfoService;
	
	@Autowired
	private UserInfoService userInfoService;
	
	@GetMapping("/project_search")
	public String project_search(Model model) {
		List<ProjectInfo> prjList = projectInfoService.getAllPrj();
		model.addAttribute("prjList", prjList);
		
		return "project_info/project_search";
	}
	
	@GetMapping("/project_register")
	public String project_register() {
		return "project_info/project_register";
	}
	
	@GetMapping("/project_detail")
	public String project_detail(@ModelAttribute(value = "prjSeq") String prjSeq ,Model model) {
		//프로젝트 정보
		ProjectInfo prjInfo = projectInfoService.getPrjInfo(prjSeq);
		model.addAttribute("prjInfo", prjInfo);
		
		// 역할
		List<CodeDetail> roleList = userInfoService.getRoleNm();
		model.addAttribute("roleList", roleList);
		
		// 프로젝트에 참여하고 있는 인원 조회
		List<UserProjectInfo> userList = projectInfoDao.getUserList(prjSeq);
		model.addAttribute("userList", userList);
		
		return "project_info/project_detail";
	}
	
	@GetMapping("/project_edit")
	public String project_edit() {
		return "project_info/project_edit";
	}
	
	@GetMapping("/popup_user")
	public String popup_user() {
		return "project_info/popup_user";
	}
}
