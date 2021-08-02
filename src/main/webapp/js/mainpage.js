import { BASE_URL, URL } from "./urlMapper.js";

// 프로모션 캐러셀(무한 슬라이드) 컨테이너 선택
const promotionsContainer = document.getElementsByClassName("visual_img")[0];
let animationCount = 0;

// 프로모션 캐러셀(무한 슬라이드) 화면 이동
function moveCarousel (promotionsLength) {
	promotionsContainer.style.transition = "0.5s";
	promotionsContainer.style.transform = "translateX(-100%)";
	
	container.ontransitionend = () => {
		promotionsContainer.removeAttribute("style")
		
		if (animationCount % promotionsLength === 0) {
			const firstPromotion = promotionsContainer.firstChild;
			const lastPromotion = promotionsContainer.removeChild(firstPromotion);
			promotionsContainer.appendChild(lastPromotion);	
		}
		
		const firstPromotion = promotionsContainer.firstChild;
		const lastPromotion = promotionsContainer.removeChild(firstPromotion);
		promotionsContainer.appendChild(lastPromotion);	
		animationCount++;
	}
}

// 각 프로모션을 보여줄 박스 생성 및 프로모션 데이터 입력 후 배치
function arrangePromotions (promotions) {
	promotions.forEach(promotion => {
		const promotionBox = document.createElement("li");
		const promotionImage = document.createElement('img');
		
		promotionImage.src = BASE_URL + promotion.productImageUrl;
		promotionImage.className = "background_image"
		promotionBox.className = "item";
		
        promotionBox.appendChild(promotionImage);
		promotionsContainer.appendChild(promotionBox);
	})
	
	setInterval(moveCarousel, 3000, promotions.length);
}

// 프로모션 데이터 가져오기
fetch(URL.promotions)
    .then(response => {
      	return response.json();
    })
	.then(data => {
		arrangePromotions(data.data);
	})
    .catch(error => {
    	console.error(error);
    })

// 카테고리 컨테이너 선택
const categoriesContainer = document.getElementsByClassName("event_tab_lst")[0];

// 카테고리 배치
function arrangeCategories (categories) {
	categories.forEach(category => {
		const categoryBox = document.createElement("li");
		const categoryLink = document.createElement("a");
		
		categoryBox.setAttribute("data-category", category.id);
		categoryBox.className = "item";
		categoryLink.innerText = category.name;
		categoryLink.className = "anchor";
		
        categoryBox.appendChild(categoryLink);
		categoriesContainer.appendChild(categoryBox);
	})
}

// 카테고리 가져오기
fetch(URL.categories)
    .then(response => {
      	return response.json();
    })
	.then(data => {
		arrangeCategories(data.data);
	})
    .catch(error => {
    	console.error(error);
    })


// TOP 버튼 누를 시, 화면 상단으로 이동
const moveToTopButton = document.getElementsByClassName("lnk_top")[0];

moveToTopButton.addEventListener('click', () => {
    window.scrollTo(0,0);
})


