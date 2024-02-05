function renderGallery(images) {
  const renderGalleryItem = images.map(createGalleryItem);
  gallery.append(...renderGalleryItem);
}

renderGallery(images);

gallery.addEventListener("click", (e) => {
  e.preventDefault();

  const target = e.target;
  const largeImg = target.dataset.source;
  const altImages = target.alt;

  if (target === e.currentTarget || !largeImg || !altImages) return;

  const instance = basicLightbox.create(`
    <div class="modal">
      <img src="${largeImg}" width="700" height="400" alt="${altImages}">
    </div>
  `);

  instance.onShow(() => {
    document.addEventListener("keydown", keydownHandler);
  });

  instance.onClose(() => {
    document.removeEventListener("keydown", keydownHandler);
  });

  instance.show();

  function keydownHandler(keyEsc) {
    if (keyEsc.code === "Escape") {
      instance.close();
    }
  }
});
