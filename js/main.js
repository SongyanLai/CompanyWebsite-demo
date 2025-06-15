


/**
 * =============================================================================
 * 企业官网主要 JavaScript 文件（已合并轮播图与原有功能脚本，并添加了详细注释）
 * =============================================================================
 *
 * 本文件集成了以下功能：
 * 1. 轮播图（首页幻灯片自动切换）
 * 2. 移动端菜单功能
 * 3. 滚动时改变头部样式
 * 4. 返回顶部按钮
 * 5. 标签页系统（产品展示部分）
 * 6. 成功案例轮播
 * 7. 联系表单处理与验证
 * 8. 页面滚动动画（锚点平滑滚动与导航高亮）
 *
 * 使用说明：
 * - 将此文件命名为 `main.js`（或其他自定义名称），并在 HTML 底部引入即可。
 * - 确保在 HTML 中已经加载了对应的 CSS，如轮播图样式、主样式等。
 * - 请根据项目实际需求，自行调整参数（如轮播间隔时间、滚动阈值、高度偏移等）。
 *
 * 作者：Songyan Lai
 * 最后更新时间：2025-06-05
 */

document.addEventListener("DOMContentLoaded", function () {
  // 页面 DOM 完全加载后，依次初始化所有功能模块
  initCarousel(); // 首页轮播图初始化
  initMobileMenu(); // 移动端菜单功能初始化
  initScrollHeader(); // 滚动时改变头部样式初始化
  initBackToTop(); // 返回顶部按钮初始化
  initTabsSystem(); // 标签页系统初始化
  initCasesSlider(); // 成功案例轮播初始化
  initContactForm(); // 联系表单处理初始化
  initAnimations(); // 页面滚动动画初始化
});

/*=============================================================================
  1. 轮播图功能：自动切换首页幻灯片
=============================================================================*/
/**
 * 初始化首页轮播图功能
 * - 自动每隔 intervalTime 毫秒切换到下一张幻灯片
 * - 当前幻灯片使用 CSS 类 "active" 来控制显示与隐藏
 */
function initCarousel() {
  // 选取所有轮播图的幻灯片元素
  const slides = document.querySelectorAll(".carousel .slide");
  if (!slides || slides.length === 0) {
    // 如果页面中未找到任何幻灯片，则不执行下面逻辑
    return;
  }

  let currentIndex = 0; // 当前显示的幻灯片索引，初始为 0
  const intervalTime = 5000; // 自动切换时间间隔，单位：毫秒（此处设置为 5 秒）

  /**
   * 显示指定索引的幻灯片，其他幻灯片隐藏
   * @param {number} index - 要显示的幻灯片索引
   */
  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active"); // 为当前幻灯片添加 "active" 类，使其可见
      } else {
        slide.classList.remove("active"); // 移除其他幻灯片的 "active" 类，使其隐藏
      }
    });
  }

  /**
   * 切换到下一张幻灯片
   * 循环播放：如果当前已经是最后一张，则切换到第一张
   */
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  // 初始化：先显示第一张幻灯片
  showSlide(currentIndex);

  // 启动定时器，实现自动轮播
  setInterval(nextSlide, intervalTime);
}

/*=============================================================================
  2. 移动端菜单功能
=============================================================================*/
/**
 * 初始化移动端菜单：
 * - 点击“汉堡”按钮时，展开/收起主导航
 * - 点击菜单项时，如果屏幕宽度小于等于 768px，则自动收起菜单
 * - 点击页面其他区域时，也会收起已展开的菜单
 */
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn"); // “汉堡”图标按钮
  const mainNav = document.querySelector(".main-nav"); // 导航菜单（ul 列表）

  // 如果页面中找不到相应元素，则直接返回
  if (!mobileMenuBtn || !mainNav) return;

  // 点击“汉堡”按钮，切换导航菜单的显示状态
  mobileMenuBtn.addEventListener("click", function (event) {
    event.stopPropagation(); // 阻止事件冒泡，防止触发 document.click
    mainNav.classList.toggle("show");
  });

  // 点击导航菜单中的任意链接，如果屏幕较窄，则收起菜单
  const menuItems = mainNav.querySelectorAll("a");
  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        mainNav.classList.remove("show");
      }
    });
  });

  // 点击页面其他地方时，收起已展开的菜单
  document.addEventListener("click", function (event) {
    // 如果点击目标不在导航菜单内，且不在按钮本身，则收起
    if (
      !mainNav.contains(event.target) &&
      !mobileMenuBtn.contains(event.target)
    ) {
      mainNav.classList.remove("show");
    }
  });

  // 窗口尺寸变化时，如果宽度大于 768px，确保导航菜单始终可见
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      mainNav.classList.remove("show"); // 移除可能残留的“show”类
    }
  });
}

/*=============================================================================
  3. 滚动时改变头部样式
=============================================================================*/
/**
 * 当页面向下滚动超过一定阈值（scrollThreshold）时，为 header 添加 "scrolled" 类，
 * 用于改变头部样式（如背景色、阴影等）。当回到阈值上方时，移除该类。
 */
function initScrollHeader() {
  const header = document.querySelector(".header");
  const scrollThreshold = 100; // 滚动多少像素后触发样式改变

  if (!header) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/*=============================================================================
  4. 返回顶部按钮
=============================================================================*/
/**
 * 当页面向下滚动超过 scrollThreshold 像素时，显示“返回顶部”按钮；
 * 点击按钮时，平滑滚动回到页面顶部。
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  const scrollThreshold = 300; // 滚动多少像素后显示按钮

  if (!backToTopBtn) return;

  // 页面滚动时检测是否达到阈值，决定按钮的显示或隐藏
  window.addEventListener("scroll", function () {
    if (window.scrollY > scrollThreshold) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // 点击按钮时，阻止默认链接行为，平滑滚动到顶部
  backToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/*=============================================================================
  5. 标签页系统（产品展示部分）
=============================================================================*/
/**
 * 点击“Tab 按钮”切换对应的标签内容：
 * - 为所有按钮移除“active”类，然后为当前按钮添加“active”类
 * - 隐藏所有标签内容，再显示与当前按钮 data-target 属性对应的内容
 */
function initTabsSystem() {
  const tabBtns = document.querySelectorAll(".tab-btn"); // 所有 Tab 按钮

  if (!tabBtns || tabBtns.length === 0) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // 移除所有按钮的“active”状态
      tabBtns.forEach((b) => b.classList.remove("active"));

      // 隐藏所有标签内容
      const tabPanes = document.querySelectorAll(".tab-pane");
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      // 为当前按钮添加“active”样式
      this.classList.add("active");

      // 根据 data-target 属性值，显示对应的内容区域
      const targetId = this.getAttribute("data-target");
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });
}

/*=============================================================================
  6. 成功案例轮播
=============================================================================*/
/**
 * 实现手动+自动的案例轮播：
 * - prevBtn、nextBtn 控制手动切换上一条/下一条案例
 * - autoSlideInterval 每隔 intervalTime 毫秒自动切换
 * - 鼠标悬停时暂停自动轮播，鼠标离开时恢复
 */
function initCasesSlider() {
  const casesSlider = document.querySelector(".cases-slider"); // 案例轮播整体容器
  const caseItems = document.querySelectorAll(".case-item"); // 每条案例元素（数组）
  const prevBtn = document.querySelector(".prev-btn"); // “上一条”按钮
  const nextBtn = document.querySelector(".next-btn"); // “下一条”按钮

  // 如果未找到对应元素，则不执行后续逻辑
  if (!casesSlider || caseItems.length === 0 || !prevBtn || !nextBtn) return;

  let currentIndex = 0; // 当前显示的案例索引
  const intervalTime = 5000; // 自动轮播时间间隔，单位：毫秒（5 秒）

  /**
   * 更新案例显示逻辑：
   * - 将索引等于 currentIndex 的案例显示（display: flex）
   * - 其他案例隐藏（display: none）
   */
  function updateSlider() {
    caseItems.forEach((item, index) => {
      if (index === currentIndex) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }

  // 初始化：先只显示第一条案例
  updateSlider();

  // 点击“上一条”按钮
  prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + caseItems.length) % caseItems.length;
    updateSlider();
  });

  // 点击“下一条”按钮
  nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % caseItems.length;
    updateSlider();
  });

  // 启动自动轮播
  let autoSlideInterval = setInterval(function () {
    currentIndex = (currentIndex + 1) % caseItems.length;
    updateSlider();
  }, intervalTime);

  // 鼠标悬停时暂停自动轮播
  casesSlider.addEventListener("mouseenter", function () {
    clearInterval(autoSlideInterval);
  });

  // 鼠标离开时恢复自动轮播
  casesSlider.addEventListener("mouseleave", function () {
    autoSlideInterval = setInterval(function () {
      currentIndex = (currentIndex + 1) % caseItems.length;
      updateSlider();
    }, intervalTime);
  });
}

/*=============================================================================
  7. 联系表单处理与验证
=============================================================================*/
/**
 * 实现联系表单的前端验证与提交模拟：
 * - 阻止默认表单提交行为
 * - 遍历所有 required 字段，判空并标记错误
 * - 验证邮箱格式是否正确
 * - 验证通过后，在控制台打印表单数据，并弹出成功提示，然后重置表单
 */
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // 阻止默认的表单提交刷新行为

    // 通过 FormData 获取表单所有字段及其值
    const formData = new FormData(contactForm);
    const formValues = {};
    for (let [key, value] of formData.entries()) {
      formValues[key] = value.trim();
    }

    // 简单前端验证：所有 required 字段必须非空
    let isValid = true;
    const requiredFields = contactForm.querySelectorAll("[required]");
    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add("error"); // 标记错误样式（需在 CSS 中定义 .error）
      } else {
        field.classList.remove("error");
      }
    });

    // 验证邮箱格式
    const emailField = contactForm.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailField.value.trim())) {
        isValid = false;
        emailField.classList.add("error");
      } else {
        emailField.classList.remove("error");
      }
    }

    if (isValid) {
      // 模拟提交：在控制台打印表单数据
      console.log("表单数据:", formValues);

      // 弹出成功提示
      alert("感谢您的留言，我们会尽快与您联系！");

      // 重置表单，清空所有字段
      contactForm.reset();
    } else {
      // 验证失败时，提示用户检查必填字段
      alert("请正确填写所有必填字段及邮箱格式");
    }
  });
}

/*=============================================================================
  8. 页面滚动动画（锚点平滑滚动与导航高亮）
=============================================================================*/
/**
 * 8.1 实现锚点链接的平滑滚动（带 header 高度偏移）
 * - 对所有以 “#” 开头且不等于 "#" 的链接进行监听
 * - 计算目标元素在可视区域距页面顶部的实际位置，减去 header 的高度，实现准确对齐
 * - 使用 history.pushState 来更新 URL，但不触发跳转
 *
 * 8.2 导航菜单高亮当前所在板块
 * - 在页面滚动时，循环检测当前滚动位置所属区块
 * - 根据区块 ID，给对应导航菜单项添加 “active” 类，其余移除
 */
function initAnimations() {
  /*--------------------------
      8.1 锚点平滑滚动
    --------------------------*/
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // 阻止默认跳转

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      // 获取 header 的高度，用于向上偏移，避免内容被遮挡
      const header = document.querySelector(".header");
      const headerHeight = header ? header.offsetHeight : 0;

      // 目标元素距离文档顶部的距离
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      // 使用原生 scrollTo 实现平滑滚动
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // 更新 URL（仅改变哈希，不跳转）
      history.pushState(null, null, targetId);
    });
  });

  /*--------------------------
      8.2 导航菜单高亮当前区块
    --------------------------*/
  const sections = document.querySelectorAll("section[id]"); // 页面中所有带 id 的区块
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]'); // 导航中的锚点链接

  window.addEventListener("scroll", function () {
    let currentSectionId = "";

    // 计算 header 高度（用于偏移）
    const header = document.querySelector(".header");
    const headerHeight = header ? header.offsetHeight : 0;

    sections.forEach((section) => {
      // 区块顶部位置相对于文档顶部再减去 headerHeight 和一个偏移值（100px），
      // 用于触发高亮的提前量，以保证滚动条略微进入区块时即可高亮
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // 遍历所有导航链接，移除“active”类后，如果 href 与 currentSectionId 匹配，则添加“active”
    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === "#" + currentSectionId) {
        link.classList.add("active");
      }
    });
  });
}
