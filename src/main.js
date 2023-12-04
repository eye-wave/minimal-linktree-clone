document.querySelectorAll("[data-src]")
  .forEach(img => {
    img.src = img.dataset.src
    img.onload =() => img.removeAttribute("style")
  })
