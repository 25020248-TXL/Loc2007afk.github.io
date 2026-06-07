/**
 * SCRIPT.JS - Digital Portfolio của Nguyễn Công Minh
 * Chức năng:
 *  1. Khởi tạo thư viện AOS (Animate On Scroll)
 *  2. Hiệu ứng Navbar khi cuộn trang
 *  3. Active nav-link theo section đang xem (Intersection Observer)
 *  4. Hamburger menu cho mobile
 *  5. Nút Scroll to Top
 *  6. Tạo các hạt (particles) trang trí nền Hero
 */

/* ============================================================
   1. KHỞI TẠO AOS (Animate On Scroll)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Khởi tạo AOS với cấu hình tùy chỉnh
  AOS.init({
    duration: 800,       // Thời gian animation (ms)
    once: false,         // Chạy animation mỗi khi cuộn đến phần tử
    mirror: true,        // Animate elements out while scrolling past them
    offset: 80,          // Khoảng cách từ mép viewport để kích hoạt animation
    easing: 'ease-out-cubic', // Hàm easing mượt mà
  });

  /* ============================================================
     2. NAVBAR - Thêm class .scrolled khi cuộn xuống
     ============================================================ */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    // Thêm class 'scrolled' khi cuộn hơn 50px để kích hoạt glass effect
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Gắn event listener cho sự kiện cuộn
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Kiểm tra ngay khi tải trang

  /* ============================================================
     3. ACTIVE NAV LINK - Highlight link theo section đang xem
     ============================================================ */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  // Dùng IntersectionObserver để theo dõi section nào đang hiện trên màn hình
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Xóa class 'active' khỏi tất cả các link
        navLinks.forEach(link => link.classList.remove('active'));

        // Tìm link tương ứng với section đang hiển thị và thêm 'active'
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px', // Kích hoạt khi section chiếm vùng giữa màn hình
    threshold: 0,
  });

  // Đăng ký quan sát tất cả các section
  sections.forEach(section => sectionObserver.observe(section));

  /* ============================================================
     4. HAMBURGER MENU - Menu mobile
     ============================================================ */
  const hamburgerBtn = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('open');
    hamburgerBtn.classList.toggle('open', isOpen);
    // Cập nhật aria-expanded cho accessibility
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  });

  // Đóng menu mobile khi click vào một nav-link
  navLinksEl.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Đóng menu mobile khi click ra ngoài
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinksEl.classList.contains('open')) {
      navLinksEl.classList.remove('open');
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  });

  /* ============================================================
     5. SCROLL TO TOP BUTTON
     ============================================================ */
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // Hiện/ẩn nút khi cuộn
  function handleScrollTopVisibility() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });
  handleScrollTopVisibility();

  // Cuộn lên đầu trang khi click nút
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============================================================
     6. PARTICLES GENERATOR - Bọt bong bóng toàn trang
     ============================================================ */
  const particlesContainer = document.getElementById('particles');

  // Tăng số lượng hạt để phủ toàn trang
  const PARTICLE_COUNT = 55;

  // Màu sắc các hạt (đa dạng hơn)
  const PARTICLE_COLORS = [
    'rgba(59,130,246,',   // blue
    'rgba(139,92,246,',   // purple
    'rgba(6,182,212,',    // cyan
    'rgba(16,185,129,',   // green
    'rgba(236,72,153,',   // pink
    'rgba(245,158,11,',   // amber
  ];

  /**
   * Tạo ngẫu nhiên một số trong khoảng [min, max]
   */
  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Tạo từng hạt và thêm vào container
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Kích thước hạt ngẫu nhiên (4px - 14px)
    const size = randomBetween(4, 14);
    // Màu ngẫu nhiên
    const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    // Độ mờ ngẫu nhiên
    const opacity = randomBetween(0.15, 0.5);
    // Thời gian bay từ dưới lên (8s - 18s)
    const duration = randomBetween(8, 18);
    // Delay ngẫu nhiên để các hạt không đồng bộ
    const delay = randomBetween(0, duration);
    // Độ lệch ngang (lắc sang trái/phải)
    const drift = randomBetween(-40, 40);

    // Vị trí ngang ngẫu nhiên trên toàn chiều rộng
    const posX = randomBetween(2, 98);

    // Áp dụng style
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color}${opacity});
      left: ${posX}%;
      --duration: ${duration}s;
      --delay: -${delay}s;
      --opacity: ${opacity};
      --drift: ${drift}px;
    `;

    particlesContainer.appendChild(particle);
  }


  /* ============================================================
     7. SMOOTH HOVER EFFECT cho project cards (hiệu ứng theo chuột)
     ============================================================ */
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      // Tính toán vị trí chuột tương đối so với card (từ -0.5 đến 0.5)
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Áp dụng hiệu ứng nghiêng nhẹ theo hướng chuột (tilt effect)
      card.style.transform = `
        translateY(-6px)
        rotateX(${-y * 6}deg)
        rotateY(${x * 6}deg)
      `;
      card.style.transition = 'transform 0.1s ease';
    });

    // Reset về trạng thái ban đầu khi chuột rời đi
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.35s ease';
    });
  });

  /* ============================================================
     8. COUNTER ANIMATION - Đếm số trong hero-stats
     ============================================================ */
  /**
   * Animate số từ 0 đến giá trị đích
   * @param {HTMLElement} el - Phần tử chứa số
   * @param {number} target  - Giá trị đích
   * @param {number} duration - Thời gian animation (ms)
   */
  function animateCounter(el, target, duration = 1200) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Hàm easing: ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Quan sát hero-stats, khi xuất hiện thì kích hoạt counter animation
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate số "7" bài tập
          const statProjects = document.getElementById('statProjects');
          if (statProjects) animateCounter(statProjects, 7, 900);

          // Animate HSA score "120"
          const statScore = document.getElementById('statScore');
          if (statScore) animateCounter(statScore, 120, 1400);

          // Chỉ chạy 1 lần
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(heroStats);
  }

}); // Kết thúc DOMContentLoaded

/* ============================================================
   9. THEME TOGGLE - Chuyển đổi giao diện sáng/tối
   ============================================================ */
(function () {
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  // Khôi phục theme đã lưu (hoặc mặc định dark)
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem('portfolio-theme', next);

      // Ripple effect khi click
      const track = themeToggleBtn.querySelector('.theme-toggle__track');
      track.style.transform = 'scale(0.92)';
      setTimeout(() => { track.style.transform = ''; }, 150);
    });
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      htmlEl.setAttribute('data-theme', 'light');
    } else {
      htmlEl.removeAttribute('data-theme');
    }
    // Cập nhật ARIA label
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng'
      );
      themeToggleBtn.setAttribute(
        'title',
        theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng'
      );
    }
  }
})();
