package kr.co.basic.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.basic.bean.Boards;
import kr.co.basic.bean.Comments;
import kr.co.basic.bean.PageBean;
import kr.co.basic.bean.UserInfo;
import kr.co.basic.dao.MainPageDao;
import kr.co.basic.service.MainPageService;

@Controller
@RequestMapping("/main_page")
public class MainPageController {
	
	@Autowired
	private MainPageService mainPageService;
	
	@Autowired
	private MainPageDao mainPageDao;

	@Resource(name = "loginUserBean")
	private UserInfo loginUserBean;
	
	@GetMapping("/main")
	public String main(Model model, @RequestParam(value = "page", defaultValue = "1") int page) {
		
		List<Boards> boards = mainPageService.BoardAllInfo(page); //전체 게시판 정보 출력
		model.addAttribute("boards", boards); //전체 게시판 세션에 저장
		
		return "main_page/main";
	}
	
	@GetMapping("/detail")
	public String detail(Model model, @RequestParam(value = "page", defaultValue = "1") int page,
						 @RequestParam(value = "categoriCd") String categoriCd) {
		model.addAttribute("page", page);
		
		List<Boards> boards = mainPageService.getBoardInfo(page, categoriCd);
		model.addAttribute("boards", boards); //전체 게시판 세션에 저장
		
		PageBean pageBean = mainPageService.getPageBean(boards, page, categoriCd);
		model.addAttribute("pageBean", pageBean);
		
		model.addAttribute("categoriCd", categoriCd);

		return "main_page/detail";
	}
	
	@GetMapping("/board_detail")
	public String board_detail(@RequestParam(value = "boardSeq") String boardSeq, Model model) {
		
		Boards boardBean = mainPageDao.getBoardInfo(boardSeq);
		model.addAttribute("boardBean", boardBean);
		
		List<Comments> commentBean = mainPageDao.getComments(boardSeq);
		model.addAttribute("commentBean", commentBean);
		
		return "main_page/board_detail";
	}
	
	@GetMapping("/board")
	public String board(@RequestParam(value = "categoriCd") String categoriCd, Model model) {
		model.addAttribute("categoriCd", categoriCd);
		return "main_page/board";
	}
	
	// 게시글 생성
	@PostMapping("/submitPost")
	public String submitPost(@ModelAttribute Boards boards) {
		boolean isSubmit = mainPageService.submitPost(boards);
		if(isSubmit) {
			return "main_page/success";
		} else {
			return "main_page/failed";
		}
	}
	
	// 게시글 수정
	@GetMapping("/board_modify")
	public String board_modify(@RequestParam(value = "boardSeq") String boardSeq ,Model model) {
		Boards boardBean = mainPageDao.getBoardInfo(boardSeq);
		model.addAttribute("boardBean", boardBean);
		
		return "main_page/board_modify";
	}
}
