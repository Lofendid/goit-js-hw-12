import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const iconLeft = new URL('../img/icons/arrow-icons.svg#icon-left', import.meta.url).href; 
const iconRight = new URL('../img/icons/arrow-icons.svg#icon-right', import.meta.url).href; 

const iconError = new URL('/img/icons/error-icon.svg', import.meta.url).href;

const gallery = document.querySelector('.gallery');
const galleryForm = document.querySelector('.search-photos');
const loader = document.querySelector('.loader-wrapper');

const mistake = (message) => {
    iziToast.show({
        title: 'ERROR',
        backgroundColor: 'rgba(239, 64, 64, 1)',
        theme: 'dark',
        message: message,
        position: 'topRight',
        timeout: 5000,
        iconUrl: iconError,
    });
};

const getPhotos = (userQuery) => {
    const searchParams = new URLSearchParams({
        key: '41527103-e0775164a767d3baf6162359a',
        q: encodeURIComponent(userQuery).replace(/%20/g, '+'),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    });

    const BASE_URL = `https://pixabay.com/api/?${searchParams}`;

    fetch(BASE_URL, {
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Sorry, there are some internal mistakes. Please, try reload the page!');
            }
            else return res.json();
        })
        .then(res => {
            const allImages = res.hits;
            if (res.total === 0) {
                throw new Error('Sorry, there are no images matching your search query. Please, try again!');
            }
            else {
                const galleryMarkup = allImages.map(({ webformatURL: preview, largeImageURL: original, tags: description }) => {
                    return `
                        <li class="gallery-item">
                            <a class="gallery-link" href="${original}">
                                <img
                                    loading="lazy"
                                    class="gallery-image"
                                    src="${preview}"
                                    alt="${description}"
                                />
                            </a>
                        </li>
                        `
                }).join('');
                gallery.innerHTML = galleryMarkup;
                const lightbox = new SimpleLightbox('.gallery a', {
                    navText: [
                        `<svg width="24" height="24"><use href="${iconLeft}"></svg>`,
                        `<svg width="24" height="24"><use href="${iconRight}"></svg>`
                    ],
                    captionsData: "alt",
                    captionDelay: false,
                });
                lightbox.refresh();
            };
        })
        .catch(err => {
            mistake(err.message);
        })
        .finally(() => {
            loader.classList.add('visually-hidden');
        });
};

const handleSubmit = (e) => {
    e.preventDefault();
    gallery.innerHTML = '';
    loader.classList.remove('visually-hidden');
    const userQuery = e.target.elements[0].value.trim().toLowerCase().toString();
    getPhotos(userQuery);
    e.target.reset();
 };

galleryForm.addEventListener('submit', handleSubmit);