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
  return basicLightbox.create(`
    <div class="modal">
      <img src="${largeImg}" width="700" height="400" alt="${altImages}">
    </div>
  `, {
    onShow: () => {
      document.addEventListener("keydown", (e) => keydownHandler(e, instance));
    },
    onClose: () => {
      document.removeEventListener("keydown", (e) => keydownHandler(e, instance));
    }
  });
}

gallery.addEventListener("click", (e) => {
  e.preventDefault();

  const target = e.target;
  const largeImg = target.dataset.source;
  const altImages = target.alt;

  if (target === e.currentTarget || !largeImg || !altImages) return;

  let instance = createModal(largeImg, altImages);

  instance.show();
});
