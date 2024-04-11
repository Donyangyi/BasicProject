package kr.co.basic.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.session.RowBounds;

import kr.co.basic.bean.Boards;

public interface MainPageMapper {
	
	//전체 게시판 정보 출력
	@Select("select cd.dtlCodeNm as detailNm, iu.userNm, b.boardSeq, b.boardTitle, b.boardContent, b.boardRegiDate, b.categoriCd "
			+ "from BOARDS b join INFO_USER iu on b.userSeq = iu.userSeq "
			+ "join CODE_DETAIL cd on cd.dCode = 'D090' and cd.dtlCode = b.categoriCd "
			+ "where cd.dCode = 'D090' and b.categoriCd = #{categoriCd} order by boardSeq desc")
	List<Boards> BoardAllInfo(String categoriCd, RowBounds rowBounds);
	
	//전체 게시판 종류 갯수
	@Select("select count(distinct categoriCd) from BOARDS")
	int BoardCnt();
	
	//각 게시판 별 게시글 갯수
	@Select("select count(boardSeq) from BOARDS where categoricd = #{categoriCd}")
	int getBoardCnt(String categoriCd);
	
}
