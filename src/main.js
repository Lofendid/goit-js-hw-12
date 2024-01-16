import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const iconLeft = new URL('/img/icons/arrow-icons.svg#icon-left', import.meta.url).href; 
const iconRight = new URL('/img/icons/arrow-icons.svg#icon-right', import.meta.url).href; 
const iconError = new URL('/img/icons/error-icon.svg', import.meta.url).href;
const iconWarn = new URL('/img/icons/warning-icon.svg', import.meta.url).href;

const LS_QUERY = 'user-query'

const gallery = document.querySelector('.gallery');
const galleryForm = document.querySelector('.search-photos');
const loader = document.querySelector('.loader-wrapper');
const moreBtn = document.querySelector('.more-btn');

let page = 1;
let limit = 40;

const informUser = (message, title = 'ERROR', icon = iconError, color = 'rgba(239, 64, 64, 1)') => {
    iziToast.show({
        title: title,
        backgroundColor: color,
        theme: 'dark',
        message: message,
        position: 'topRight',
        timeout: 5000,
        iconUrl: icon,
    });
};

const getTotalPages = (images) => {
    return Math.ceil(images.totalHits / limit);
}

const getPhotos = async (userQuery) => {

    const response = await axios.get(`https://pixabay.com/api/`, {
        params: {
            key: '41527103-e0775164a767d3baf6162359a',
            q: encodeURIComponent(userQuery).replace(/%20/g, '+'),
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: limit,
            page: page,
        }
    })
    return response.data;
};
    const renderImages = (images) => {
        const allImages = images.hits;
        if (images.totalHits === 0) {
            loader.classList.add('visually-hidden');
            return informUser('Sorry, there are no images matching your search query. Please, try again!');
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
            gallery.insertAdjacentHTML('beforeend', galleryMarkup);
            const lightbox = new SimpleLightbox('.gallery a', {
                navText: [
                    `<svg width="24" height="24"><use href="${iconLeft}"></svg>`,
                    `<svg width="24" height="24"><use href="${iconRight}"></svg>`
                ],
                captionsData: "alt",
                captionDelay: false,
            });
            lightbox.refresh();
            loader.classList.add('visually-hidden');
        };
    };

const onClick = async () => {
    try {
        page += 1;
        const images = await getPhotos(sessionStorage.getItem(LS_QUERY));
        const totalPages = getTotalPages(images);
        if (page === totalPages) {
            moreBtn.classList.add('visually-hidden');
            informUser('The end of collection has been reached', 'INFO', iconWarn, 'rgba(167, 166, 145, 1)');
        };
        renderImages(images);
    }
    catch (error) {
        informUser(error.message);
    }
 };

const handleSubmit = async (e) => {
    e.preventDefault();
    gallery.innerHTML = '';
    loader.classList.remove('visually-hidden');
    const userQuery = e.target.elements[0].value.trim().toLowerCase().toString();
    sessionStorage.setItem(LS_QUERY, userQuery);
    page = 1;
    const images = await getPhotos(userQuery);
    const totalPages = getTotalPages(images);
    renderImages(images);
    if (page === totalPages) {
        moreBtn.classList.add('visually-hidden');
        informUser('The end of collection has been reached', 'INFO', iconWarn, 'rgba(167, 166, 145, 1)');
    }
    else if (page < totalPages) {
        moreBtn.classList.remove('visually-hidden');
    };
    e.target.reset();
 };

galleryForm.addEventListener('submit', handleSubmit);
moreBtn.addEventListener('click', onClick);