// MangWilBread JavaScript - Interactive Features

// 1. Database Produk Roti
const products = [
  {
    id: 1,
    name: "Roti Sobek Cokelat Keju",
    category: "roti-sobek",
    price: 28000,
    priceFormatted: "Rp 28.000",
    description: "Perpaduan klasik cokelat premium dan keju cheddar gurih di dalam roti sobek yang super lembut.",
    image: "assets/roti_sobek.png"
  },
  {
    id: 2,
    name: "Roti Keset Susu Mentega",
    category: "roti-sobek",
    price: 25000,
    priceFormatted: "Rp 25.000",
    description: "Roti keset dengan olesan mentega premium dan susu manis melimpah, dipanggang sempurna hingga wangi.",
    image: "assets/roti_keset.png"
  },
  {
    id: 3,
    name: "Roti Abon Sapi Spesial",
    category: "roti-asin",
    price: 12500,
    priceFormatted: "Rp 12.500",
    description: "Roti gurih lembut berlapis mayones krimi manis dan ditaburi abon sapi asli berkualitas melimpah.",
    image: "assets/roti_abon.png"
  },
  {
    id: 4,
    name: "Roti Unyil Aneka Rasa (Isi 10)",
    category: "roti-manis",
    price: 20000,
    priceFormatted: "Rp 20.000",
    description: "Roti mini imut dengan 10 macam isian berbeda mulai dari keju, sosis, cokelat, hingga selai buah segar.",
    image: "assets/roti_unyil.png"
  },
  {
    id: 5,
    name: "Roti Cokelat Jadul Meses",
    category: "roti-manis",
    price: 10000,
    priceFormatted: "Rp 10.000",
    description: "Bernostalgia dengan roti cokelat bertekstur lembut diisi pasta cokelat pekat dan meses manis melimpah.",
    image: "assets/roti_cokelat_jadul.png"
  }
];

// 2. Render Produk Secara Dinamis
function renderProducts(filterCategory = "all") {
  const productGrid = document.getElementById("product-grid");
  if (!productGrid) return;

  productGrid.innerHTML = "";

  const filteredProducts = filterCategory === "all" 
    ? products 
    : products.filter(p => p.category === filterCategory);

  filteredProducts.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product-card fade-in";
    
    // Format pesan WhatsApp
    const message = `Halo MangWilBread! Saya ingin memesan roti homemade berikut:
- Nama Produk: ${product.name}
- Harga: ${product.priceFormatted}
- Jumlah: 1 pcs

Mohon informasi ketersediaan dan ongkos kirim ke alamat saya. Terima kasih!`;
    const waUrl = `https://wa.me/6282250561757?text=${encodeURIComponent(message)}`;

    productCard.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
        <span class="product-tag">${formatCategoryName(product.category)}</span>
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${product.priceFormatted}</span>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-accent btn-order">
            <i class="fab fa-whatsapp"></i> Pesan
          </a>
        </div>
      </div>
    `;
    productGrid.appendChild(productCard);
  });
}

// Utility: Format kategori untuk tag produk
function formatCategoryName(category) {
  switch (category) {
    case "roti-sobek": return "Roti Sobek";
    case "roti-asin": return "Roti Asin";
    case "roti-manis": return "Roti Manis";
    default: return "Roti";
  }
}

// 3. Filter Kategori Handler
function initProductFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Ubah kelas aktif tombol
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter produk
      const category = btn.getAttribute("data-filter");
      renderProducts(category);
    });
  });
}

// 4. Sticky Header Effect & Active Link Scroll
function handleHeaderScroll() {
  const header = document.querySelector(".header");
  const scrollBtn = document.querySelector(".back-to-top");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }

    if (window.scrollY > 500) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });
}

// 5. FAQ Accordion Toggle
function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      
      // Tutup semua FAQ lainnya
      faqItems.forEach(faq => faq.classList.remove("active"));
      
      // Toggle aktif untuk yang diklik
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

// 6. Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
      
      // Ubah ikon hamburger ke silang
      const icon = menuToggle.querySelector("i");
      if (navMenu.classList.contains("active")) {
        icon.className = "fas fa-times";
      } else {
        icon.className = "fas fa-bars";
      }
    });

    // Tutup menu jika tautan diklik
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        icon.className = "fas fa-bars";
      });
    });
  }
}

// Initialize all features on DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initProductFilter();
  handleHeaderScroll();
  initFAQAccordion();
  initMobileMenu();

  // Animasi smooth scroll untuk navigasi browser jadul/safari
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
