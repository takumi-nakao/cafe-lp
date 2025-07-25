// JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const mainVisual = document.getElementById("main-visual");
  const imageCounter = document.getElementById("image-counter");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  const images = [
    "images/Top/main.png",
    "images/Top/main2.png",
    "images/Top/main3.png",
  ];
  let currentIndex = 0;
  let intervalId;

  // 画像をセットしてカウンター更新する関数
  function showImage(index) {
    mainVisual.style.backgroundImage = `url(${images[index]})`;
    imageCounter.textContent = `${index + 1} / ${images.length}`;
  }

  // 次の画像へ
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  // 前の画像へ
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  // 自動スライド開始
  function startAutoSlide() {
    intervalId = setInterval(nextImage, 5000);
  }

  // 自動スライド停止
  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  // 初期表示（読み込み時すぐ画像をセット）
  showImage(currentIndex);
  startAutoSlide();

  // ボタンクリックイベント
  nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    nextImage();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    prevImage();
    startAutoSlide();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const catchCopy = document.querySelector("#catch-copy");

  // ① IntersectionObserverでヘッダー透明/スクロール時に色変更
  if (catchCopy) {
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            header.classList.remove("scrolled");
          } else {
            header.classList.add("scrolled");
          }
        });
      },
      { threshold: 0.1 }
    );
    headerObserver.observe(catchCopy);
  }

  // ② スクロールで出現アニメーション
  const appearObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        obs.unobserve(entry.target);
      }
    });
  });
  document
    .querySelectorAll("section")
    .forEach((el) => appearObserver.observe(el));

  // モーダル関連
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const modalClose = document.querySelector(".modal-close");

  if (modal && modalImg && modalClose) {
    document.querySelectorAll(".modal-trigger").forEach((img) => {
      img.addEventListener("click", () => {
        modalImg.src = img.src;
        modal.classList.remove("hidden");
      });
    });

    modalClose.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    modal.addEventListener("click", (e) => {
      if (e.target.id === "imageModal") {
        modal.classList.add("hidden");
      }
    });
  }

  // ④ トップに戻るボタン
  const scrollBtn = document.createElement("button");
  scrollBtn.id = "scrollToTop";
  scrollBtn.textContent = "∧";
  scrollBtn.style.display = "none";
  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ボタン表示制御（スクロールイベントまとめる）
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });

  // ⑤ ハンバーガーメニュー
  const toggle = document.querySelector("#menu-toggle");
  const navList = document.querySelector("nav ul");
  if (toggle && navList) {
    toggle.addEventListener("click", () => {
      navList.classList.toggle("open");
    });
  }
});
