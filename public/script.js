let images = [
    "../../images/DSC_0006...JPG",
    "../images/DSC_0001_4.JPG",
    "../images/DSC_0005.JPG",    
    // "../images/DSC_0006.JPG",
    "../images/DSC_0052.JPG",
    "../images/DSC_0110.JPG",
    "../images/DSC_0152.JPG",
    "../images/DSC_0193.JPG",    
    "../images/DSC_0053.JPG",
    "../images/DSC_0008.JPG",
    "../images/DSC_0194...JPG",
    
    
];
let currentIndex = 0;

function showImage(index) {
    let containers = document.querySelectorAll('.image-container');
    containers.forEach(container => container.classList.remove('visible'));
    containers[index].classList.add('visible');
}

function startGallery() {
    images.forEach((img, index) => {
        let imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.classList.add('image-container');
        if (index === 0) imgElement.classList.add('visible');
        document.getElementById('gallery').appendChild(imgElement);
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }, 4000);
}



window.onload = startGallery;
