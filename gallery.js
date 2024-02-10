const gallery = document.querySelector('.gallery');

function renderGallery(images) {
  const renderGalleryItem = images.map(createGalleryItem);
  gallery.append(...renderGalleryItem);
}

function keydownHandler(e, instance) {
  if (e.code === "Escape") {
    instance.close();
  }
}

function createModal(largeImg, altImages) {
  const instance = basicLightbox.create(`
    <div class="modal">
      <img src="${largeImg}" width="700" height="400" alt="${altImages}">
    </div>
  `, {
    onShow: () => {
      document.addEventListener("keydown", keydownHandler);
    },
    onClose: () => {
      document.removeEventListener("keydown", keydownHandler);
    }
  });

  return instance;
}

gallery.addEventListener("click", (e) => {
  e.preventDefault();

  const target = e.target;
  const largeImg = target.dataset.source;
  const altImages = target.alt;

  if (target === e.currentTarget || !largeImg || !altImages) return;

  const instance = createModal(largeImg, altImages);
  instance.show();
});
