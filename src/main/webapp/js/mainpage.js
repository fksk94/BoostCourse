import { BASE_URL, URL } from "./urlMapper.js";

const promotionsContainer = document.getElementsByClassName("visual_img")[0];
let animationCount = 0;

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

function displayPromotions (promotions) {
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

fetch(URL.promotions)
    .then(response => {
      	return response.json();
    })
	.then(data => {
		displayPromotions(data.items);
	})
    .catch(error => {
    	console.error(error);
    })



const moveToTopButton = document.getElementsByClassName("lnk_top")[0];

moveToTopButton.addEventListener('click', () => {
    window.scrollTo(0,0);
})


