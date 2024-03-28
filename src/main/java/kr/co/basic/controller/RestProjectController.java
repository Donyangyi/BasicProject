package kr.co.basic.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.basic.bean.CodeDetail;
import kr.co.basic.bean.ProjectInfo;
import kr.co.basic.bean.UserInfo;
import kr.co.basic.bean.UserProjectInfo;
import kr.co.basic.dao.ProjectInfoDao;
import kr.co.basic.service.ProjectInfoService;
import kr.co.basic.service.UserInfoService;

@RestController
public class RestProjectController {
	
	@Autowired
	private ProjectInfoService projectInfoService;
	
	@Autowired
	private ProjectInfoDao projectInfoDao;
	
	@Autowired
	private UserInfoService userInfoService;
	
	//=====================================================Project Search==============================================================
	// 모든 프로젝트 조회
	@PostMapping("/project_info/search_project_pro")
	public List<ProjectInfo> getSearchPrj(@RequestBody ProjectInfo projectInfo){
		return projectInfoService.getPrjList(projectInfo);
	}
	
	//=====================================================Project Detail==============================================================
	
	@DeleteMapping("/project_info/prj-to-user-delete-pro")
	public ResponseEntity<?> deletePrjToUsers(@RequestBody List<UserProjectInfo> userProjectInfo) {
		boolean isdeleted = userInfoService.prjDeletePro(userProjectInfo);
		if (isdeleted) {
			return ResponseEntity.ok(Map.of("success", true, "message", "프로젝트 인원 삭제 성공"));
		} else {
			return ResponseEntity.ok(Map.of("success", false, "message", "프로젝트 인원 삭제 실패"));
		}
	}
	
	@PutMapping("/project_info/prj_user_update_pro")
	public ResponseEntity<?> updatePrjToUsers(@RequestBody List<UserProjectInfo> userProjectInfo) {
		boolean isUpdated = userInfoService.userPrjUpdatePro(userProjectInfo);
		if (isUpdated) {
			return ResponseEntity.ok(Map.of("success", true, "message", "프로젝트 인원 수정 성공"));
		} else {
			return ResponseEntity.ok(Map.of("success", false, "message", "프로젝트 인원 수정 실패"));
		}
	}
	//=====================================================Modal==============================================================
	// 해당 프로젝트에 참여하고 있지 않은 인원 조회
	@PostMapping("/project_info/get_condition_user")
	public ResponseEntity<?> getConUserList(@RequestBody UserProjectInfo userProjectInfo){
		
		List<UserInfo> users = projectInfoDao.getConUserList(userProjectInfo);
	    List<CodeDetail> roleList = userInfoService.getRoleNm();
	    
	    Map<String, Object> response = new HashMap<>();
	    response.put("users", users);
	    response.put("roleList", roleList);
		
		return ResponseEntity.ok(response);
	}
	// 프로젝트 참여
	@PostMapping("project_info/prj_join_pro")
	public ResponseEntity<?> prjAddPro(@RequestBody List<UserProjectInfo> userProjectsInfo){
		boolean isAdd = userInfoService.prjAddPro(userProjectsInfo);
		if (isAdd) {
			return ResponseEntity.ok(Map.of("success", true, "message", "프로젝트 인원 등록 성공"));
		} else {
			return ResponseEntity.ok(Map.of("success", false, "message", "프로젝트 인원 등록 실패"));
		}
	}
}
