function renderGallery(images) {
  const renderGalleryItem = images.map(createGalleryItem);
  gallery.append(...renderGalleryItem);
}

renderGallery(images);

gallery.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target === e.currentTarget) return;

  const largeImg = e.target.dataset.source;
  const altImages = e.target.alt;

  const instance = basicLightbox.create(`
    <div class="modal">
      <img src="${largeImg}" width="700" height="400" alt="${altImages}">
    </div>
  `);

  instance.show();

  document.addEventListener("keydown", keydownHandler);

  function keydownHandler(keyEsc) {
    if (keyEsc.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", keydownHandler);
    }
  }
});
