import { BASE_URL, URL } from "./urlMapper.js";

// ---------- 함수 영역 시작 ------------------

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

// 카테고리 배치
function arrangeCategories (categories) {
	categories.forEach(category => {
		const categoryBox = document.createElement("li");
		const categoryLink = document.createElement("a");
		
		categoryBox.className = "item";
		categoryLink.setAttribute("categoryId", category.id);
		categoryLink.innerText = category.name;
		categoryLink.className = "anchor";
		
        categoryBox.appendChild(categoryLink);
		categoriesContainer.appendChild(categoryBox);
	})
}

// 상품 추가하기.
function arrangeMoreProducts(products) {
	const productsContainers = document.getElementsByClassName('lst_event_box');
	
	for (let i = 0; i < products.length; i++) {
		const productBox = document.createElement("li");
		productBox.className = "item";
		
		const productLink = document.createElement("a");
		productLink.setAttribute("productId", products[i].id);
		productLink.href = BASE_URL + "detail.html";
		productLink.className = "item_book";
		
		const productPreview = document.createElement("div");
		productPreview.className = "item_preview";
		
		const productThumnail = document.createElement("img");
		productThumnail.alt = products[i].title;
		productThumnail.className = "img_thumb";
		productThumnail.src = BASE_URL + products[i].productImageUrl;
		
		const productThumnailBorder = document.createElement("span");
		productThumnailBorder.className = "img_border";
		
		const productContentBox = document.createElement("div");
		productContentBox.className = "event_txt";
		
		const productTitle = document.createElement("h4");
		productTitle.className = "event_txt_tit";
		productTitle.innerText = products[i].title;
		
		const productPlace = document.createElement("small");
		productPlace.className = "sm";
		productPlace.innerText = products[i].place;
		
		const productContent = document.createElement("p");
		productContent.className = "event_txt_dsc";
		productContent.innerText = products[i].content;
		
		productTitle.appendChild(productPlace);
		
		productContentBox.appendChild(productTitle);
		productContentBox.appendChild(productContent);
		
		productPreview.appendChild(productThumnail);
		productPreview.appendChild(productThumnailBorder);
		
		productLink.appendChild(productPreview);
		productLink.appendChild(productContentBox);
		
		productBox.appendChild(productLink);
		productsContainers[i % 2].appendChild(productBox);
		
		productsCount++;
	}
}

// 상품 배치하기.
function arrangeProducts(products) {
	const productsContainers = document.getElementsByClassName('lst_event_box');
	
	for (let i = 0; i < productsContainers.length; i++) {
		productsContainers[i].innerHTML = "";
	}
	
	productsCount = 0;
	
	arrangeMoreProducts(products);
}

// 전시 갯수 현황판 변경
function changeTotalCount(totalCount) {
	const totalCountBox = document.getElementsByClassName('totalCount')[0];
			
	totalCountBox.innerText = totalCount;
}

// 카테고리 변경 후, 상품 배치 함수, 전시 갯수 변경 함수 호출.
function changeCategory(target) {
	const categoryButtons = categoriesContainer.getElementsByTagName("a");
	
	for (let i = 0; i < categoryButtons.length; i++) {
		categoryButtons[i].className = "anchor";
	}
	target.className = "anchor active";
	
	let query = "";
	const categoryId = target.getAttribute("categoryId");
	
	if (categoryId != 0) {
		query = "?categoryId=" + categoryId;
	}
	
	// 상품 가져오기
	fetch(URL.products + query)
	    .then(response => {
	      	return response.json();
	    })
		.then(data => {
			const moreButton = document.getElementsByClassName("more")[0];
			
			if (data.data.products.length < 4) {
				moreButton.style.display = "none";
			} else {
				moreButton.style.display = "block"
			}
			
			changeTotalCount(data.data.totalCount);
			arrangeProducts(data.data.products);
		})
	    .catch(error => {
	    	console.error(error);
	    })
}

// ---------- 함수 영역 끝 --------------------
// ---------- 초기 실행 영역 시작 ---------------

// 프로모션 캐러셀(무한 슬라이드) 컨테이너 선택
const promotionsContainer = document.getElementsByClassName("visual_img")[0];
let animationCount = 0;

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

// event delegation: 클릭한 카테고리를 찾아서 변경 함수 실행
categoriesContainer.onclick = function(event) {
	let target = event.target;

	if (target.tagName === 'A') {
		changeCategory(target);
	}
};

// 전체리스트 카테고리 상품 가져오기.
const categoryButton = categoriesContainer.getElementsByTagName("a")[0];
let productsCount = 0;

changeCategory(categoryButton);

// 더 보기 버튼 누를 시, 상품리스트 추가
const moreButton = document.getElementsByClassName("more")[0];

moreButton.addEventListener("click", () => {
	const selectedCategory = categoriesContainer.getElementsByClassName("active")[0];
	const categoryId = selectedCategory.getAttribute("categoryId");
	
	let query = "?start=" + productsCount;
	
	if (categoryId != 0) {
		query = query + "&categoryId=" + categoryId;
	}
	
	// 상품 가져오기
	fetch(URL.products + query)
	    .then(response => {
	      	return response.json();
	    })
		.then(data => {
			if (data.data.products.length < 4) {
				moreButton.style.display = "none";
			}
			arrangeMoreProducts(data.data.products);
		})
	    .catch(error => {
	    	console.error(error);
	    })
	
})

// TOP 버튼 누를 시, 화면 상단으로 이동
const moveToTopButton = document.getElementsByClassName("lnk_top")[0];

moveToTopButton.addEventListener("click", () => {
    window.scrollTo(0,0);
})

// ---------- 초기 실행 영역 끝 ----------------