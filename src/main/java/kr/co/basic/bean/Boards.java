package kr.co.basic.bean;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Boards {
	private String uesrSeq;
	private String boardSeq;
	private String categoriCd;
	private String boardTitle;
	private String boardContent;
	private Date boardRegiDate;
	
	private String detailNm;
	private String userNm;
}
