import { URL } from "../common/urlMapper.js";
import { parameter } from "../common/parameter.js";

export default class Comment {
	constructor() {}
	
	arrangeCommentsCountAndAverageScore(commentsCountAndAverageScore) {
		const gradeContainer = document.querySelector('.grade_area');

		const graphAverageScoreContainer = gradeContainer.querySelector('.graph_value');
		const averageScoreContainer = gradeContainer.querySelector('.text_value');
		const averageScoreSpan = averageScoreContainer.querySelector('span');

		// 소수점 한자리까지만 출력
		const averageScore = commentsCountAndAverageScore.averageScore.toString().substr(0, 3);
		averageScoreSpan.innerText = averageScore;
		
		// 100분위를 표현하기 위한 *20(최대가 5이므로)
		graphAverageScoreContainer.style.width = `${averageScore * 20}%`;
		
		const countContainer = gradeContainer.querySelector('.join_count');
		const countEm = countContainer.querySelector('em');

		countEm.innerText = `${commentsCountAndAverageScore.totalCount}건`;
	}
	
	arrangeComments(comments) {
		const commentsContainer = document.querySelector('.list_short_review');
	
		const commentsTemplate = document.querySelector("#comment").innerText;
		const bindCommentsTemplate = Handlebars.compile(commentsTemplate);
		
		let commentsHtml = comments.reduce(function(prevCommentsHtml, nextComment) {
			return prevCommentsHtml + bindCommentsTemplate(nextComment);
		}, "");
		
		commentsContainer.innerHTML += commentsHtml;
	}
	
	// 뒤로 가기 시, displayInfoId detail.html로 넘겨주기.
	setDisplayInfoIdForDetail(displayInfoId) {
		const allCommentsButton = document.querySelector('.btn_back');
		allCommentsButton.href = `/detail.html?displayInfoId=${displayInfoId}`;
	}
	
	getComments(url) {
		fetch(url)
		    .then(response => {
		      	return response.json();
		    })
			.then(data => {
				this.arrangeComments(data.comments);
				this.arrangeCommentsCountAndAverageScore(data.commentsCountAndAverageScore);
			})
		    .catch(error => {
		    	console.error(error);
		    })
	}
	
	initAllComments() {
		const displayInfoId = parameter.getDisplayInfoId();
		const query = `?displayInfoId=${displayInfoId}`;
		
		this.setDisplayInfoIdForDetail(displayInfoId);	
		
		this.getComments(URL.allComments + query)
	}
	
	initComments() {
		const displayInfoId = parameter.getDisplayInfoId();
		const query = `?displayInfoId=${displayInfoId}`;	
		
		this.getComments(URL.comments + query)
	}
}