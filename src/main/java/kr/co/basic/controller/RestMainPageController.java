package kr.co.basic.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.basic.bean.Boards;
import kr.co.basic.bean.Comments;
import kr.co.basic.service.MainPageService;

@RestController
public class RestMainPageController {
	
	@Autowired
	private MainPageService mainPageService;
	
	// 대댓글 작성
	@PostMapping("/main_page/submit_reply_pro")
	public ResponseEntity<?> submitReplyPro(@RequestBody Comments comments){
		boolean isSubmit = mainPageService.submitReplyPro(comments);
		
		if(isSubmit) {
			return ResponseEntity.ok().body(Map.of("success", true , "message", "댓글이 성공적으로 등록되었습니다."));
		} else {
			return ResponseEntity.ok().body(Map.of("success", false , "message", "댓글 등록에 실패했습니다."));
		}
			
	}
	
	@PostMapping("/main_page/submit_new_comment_pro")
	public ResponseEntity<?> submitNewCommentPro(@RequestBody Comments comments){
		boolean isRegi = mainPageService.submitReplyPro(comments);
		if(isRegi) {
			return ResponseEntity.ok().body(Map.of("success", true , "message", "댓글이 성공적으로 등록되었습니다."));
		} else {
			return ResponseEntity.ok().body(Map.of("success", false , "message", "댓글 등록에 실패했습니다."));
		}
	}
	
	@PutMapping("update-board-pro")
	public ResponseEntity<?> updateBoardPro(@RequestBody Boards boards){
		boolean isUpdate = mainPageService.updateBoardPro(boards);
		if(isUpdate) {
			return ResponseEntity.ok().body(Map.of("success", true , "message", "성공 적으로 수정 되었습니다."));
		} else {
			return ResponseEntity.ok().body(Map.of("success", false , "message", "수정 도중 오류가 발생 했습니다."));
		}
	}
	
	@DeleteMapping("delete-board-pro")
	public ResponseEntity<?> deleteBoardPro(@RequestBody List<String> boardSeqs){
		boolean isDelete = mainPageService.deleteBoardPro(boardSeqs);
		if(isDelete) {
			return ResponseEntity.ok().body(Map.of("success", true , "message", "성공 적으로 삭제 되었습니다."));
		} else {
			return ResponseEntity.ok().body(Map.of("success", false , "message", "삭제 도중 오류가 발생 했습니다."));
		}
	}
}
