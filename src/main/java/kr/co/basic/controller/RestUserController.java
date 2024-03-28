package kr.co.basic.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.co.basic.bean.CodeDetail;
import kr.co.basic.bean.PageBean;
import kr.co.basic.bean.ProjectInfo;
import kr.co.basic.bean.UserInfo;
import kr.co.basic.bean.UserProjectInfo;
import kr.co.basic.service.UserInfoService;
import kr.co.basic.service.UserService;

@RestController
public class RestUserController {

	@Autowired
	private UserInfoService userInfoService;

	@Autowired
	private UserService userService;

	@Autowired
	private MessageSource messageSource;

	// ============================================================UserSearch====================================================================================
	@PostMapping("/user_info/user_search_pro")
	public ResponseEntity<?> user_search_pro(@RequestParam(value = "userNm", required = false) String userNm,
			@RequestParam(value = "posCd", required = false) String posCd,
			@RequestParam(value = "workStateCd", required = false) String workStateCd,
			@RequestParam(value = "startDate", required = false) String startDate,
			@RequestParam(value = "endDate", required = false) String endDate, @RequestParam(value = "page") int page,
			@RequestParam(value = "listSize") int listSize) {

		// 검색 조건을 이용한 사용자 정보 조회
		UserInfo userInfo = new UserInfo();
		userInfo.setUserNm(userNm);
		userInfo.setPosCd(posCd);
		userInfo.setWorkStateCd(workStateCd);
		userInfo.setStartDate(startDate);
		userInfo.setEndDate(endDate);

		List<UserInfo> users = userInfoService.userAllSearch(userInfo, page, listSize);
		PageBean pageBean = userInfoService.getSearchCnt(userInfo, page, listSize);

		Map<String, Object> response = new HashMap<>();
		response.put("users", users);
		response.put("pageBean", pageBean);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// 유효성 검사
	@PostMapping("/user/user_valid_pro")
	public ResponseEntity<?> regiCheckPro(@Valid @RequestBody UserInfo userInfo, BindingResult result) {
		if (result.hasErrors()) {
			Map<String, String> errors = result.getFieldErrors().stream()
					.collect(Collectors.toMap(FieldError::getField,
							error -> messageSource.getMessage(error, Locale.getDefault()),
							(existingValue, newValue) -> existingValue));
			return ResponseEntity.badRequest().body(errors);
		}
		return ResponseEntity.ok(Map.of("success", true, "message", "회원 등록 성공"));
		//ResponseEntity.ok().body("유효성 검사 성공")
		
	}

	// 유저 삭제
	@PostMapping("/user_info/user_delete_pro")
	public ResponseEntity<?> deleteUserPro(@RequestParam List<String> userSeq) {
		userInfoService.deleteUserPro(userSeq);
		return ResponseEntity.ok(Map.of("success", true, "message", "회원이 삭제 되었습니다."));
	}

	// ============================================================UserRegi====================================================================================
	// 유저 등록
	@PostMapping("/user/user_regi_pro")
	public ResponseEntity<?> regiUserPro(@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "userId", required = true) String userId,
			@RequestParam(value = "userPw", required = true) String userPw,
			@RequestParam(value = "genderCd", required = true) String gender,
			@RequestParam(value = "phone", required = true) String phone,
			@RequestParam(value = "regiDate", required = true) String regiDate,
			@RequestParam(value = "posCd", required = false) String posCd,
			@RequestParam(value = "skillRankCd", required = false) String skillRankCd,
			@RequestParam(value = "email", required = false) String email,
			@RequestParam(value = "address", required = true) String address,
			@RequestParam(value = "addressDetail", required = true) String addressDetail,
			@RequestParam(value = "skills", required = false) List<String> skills,
			@RequestParam(value = "userImage", required = true) MultipartFile userImage,
			RedirectAttributes redirectAttributes) {
		try {
			boolean isRegistered = userService.regiUserPro(name, userId, userPw, gender, phone, regiDate, posCd,
					skillRankCd, email, address, addressDetail, userImage, skills);
			if (isRegistered) {
				return ResponseEntity.ok(Map.of("success", true, "message", "사용자 등록 성공!"));
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(Map.of("success", false, "message", "사용자 등록 실패."));
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("success", false, "message", "등록 중 오류 발생: " + e.getMessage()));
			
		}
	}
	
	// 아이디 중복 검사
	@GetMapping("/user/duplicate_check_pro/{userId}")
	public ResponseEntity<?> duplicateCheck(@PathVariable(value = "userId") String userId) { 
		boolean isDuplicate = userService.duplicateCheck(userId);
	    if(isDuplicate) {
	    	return ResponseEntity.ok(Map.of("success", true, "message", "사용 가능한 아이디 입니다."));
		} else {
			return ResponseEntity.ok(Map.of("success", false, "message", "이미 사용중인 아이디 입니다."));
	    }
	}

	// ============================================================UserDetail====================================================================================
	// 유저 프로젝트 업데이트 (투입일, 철수일, 역할)
	@PostMapping("user_info/user_prj_update_pro")
	public ResponseEntity<?> userPrjUpdatePro(@RequestBody List<UserProjectInfo> userProjectInfo) {
		boolean isUpdated = userInfoService.userPrjUpdatePro(userProjectInfo);
		try {
			if (isUpdated) {
				return ResponseEntity.ok(Map.of("success", true, "message", "사용자 업데이트 성공"));
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(Map.of("success", false, "message", "사용자 업데이트 실패"));
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("success", false, "message", "업데이트 중 오류 발생: " + e.getMessage()));
		}
	}
	// 프로젝트 삭제
	@PostMapping("user_info/project_delete_pro")
	public ResponseEntity<?> prjDeletePro(@RequestBody List<UserProjectInfo> userProjectInfo){
		boolean isDeleted = userInfoService.prjDeletePro(userProjectInfo);
		if (isDeleted) {
			return ResponseEntity.ok(Map.of("success", true, "message", "사용자 업데이트 성공"));
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(Map.of("success", false, "message", "사용자 업데이트 실패"));
		}
	}
	
	// =========================================================UserDetail Modal=================================================================================
	// 해당 유저가 참여하지 않으며 검색 조건의 의한 프로젝트 조회
	@PostMapping("user_info/simple_project_search_pro")
	public ResponseEntity<?> simplePrjSearchPro(@RequestBody UserProjectInfo userProjectInfo){
		List<ProjectInfo> ConPrjList = userInfoService.getConPrjList(userProjectInfo);
		
		// 역할
		List<CodeDetail> roleList = userInfoService.getRoleNm();

		Map<String, Object> response = new HashMap<>();
		response.put("projects", ConPrjList);
		response.put("roleList", roleList);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	// 프로젝트 참여
	@PostMapping("user_info/prj_join_pro")
	public ResponseEntity<?> prjAddPro(@RequestBody List<UserProjectInfo> userProjectsInfo){
		boolean isAdd = userInfoService.prjAddPro(userProjectsInfo);
		if (isAdd) {
			return ResponseEntity.ok(Map.of("success", true, "message", "프로젝트 추가 성공"));
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(Map.of("success", false, "message", "프로젝트 추가 실패"));
		}
	}
}
