package kr.co.basic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.basic.bean.Boards;
import kr.co.basic.service.MainPageService;

@Controller
@RequestMapping("/main_page")
public class MainPageController {
	
	@Autowired
	private MainPageService mainPageService;

	@GetMapping("/main")
	public String main(Model model, @RequestParam(value = "page", defaultValue = "1") int page) {
		
		List<Boards> boards = mainPageService.BoardAllInfo(page); //전체 게시판 정보 출력
		model.addAttribute("boards", boards); //전체 게시판 세션에 저장
		
		return "main_page/main";
	}
}
