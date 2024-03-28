package kr.co.basic.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.co.basic.bean.Boards;
import kr.co.basic.mapper.MainPageMapper;

@Repository
public class MainPageDao {
	
	@Autowired
	private MainPageMapper mainPageMapper;
	
	//전체 게시판 정보 출력
	public List<Boards> BoardAllInfo(String categoriCd, RowBounds rowBounds) {
		return  mainPageMapper.BoardAllInfo(categoriCd, rowBounds);
	}
	
	//각 게시판 별 게시글 갯수
	public int getBoardCnt(String categoriCd) {
		return mainPageMapper.getBoardCnt(categoriCd);
	}
}
