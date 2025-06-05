/**
 * 企业官网主要JavaScript文件
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initMobileMenu();
    initScrollHeader();
    initBackToTop();
    initTabsSystem();
    initCasesSlider();
    initContactForm();
    initAnimations();
});

/**
 * 移动端菜单功能
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('show');
        });
        
        // 点击菜单项后关闭菜单
        const menuItems = mainNav.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('show');
                }
            });
        });
        
        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mainNav.classList.remove('show');
            }
        });
    }
}

/**
 * 滚动时改变头部样式
 */
function initScrollHeader() {
    const header = document.querySelector('.header');
    const scrollThreshold = 100;
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/**
 * 返回顶部按钮
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    const scrollThreshold = 300;
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > scrollThreshold) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * 标签页系统
 */
function initTabsSystem() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有活动状态
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // 隐藏所有标签内容
                const tabPanes = document.querySelectorAll('.tab-pane');
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // 激活当前标签
                this.classList.add('active');
                
                // 显示对应内容
                const targetId = this.getAttribute('data-target');
                const targetPane = document.getElementById(targetId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
}

/**
 * 案例轮播
 */
function initCasesSlider() {
    const casesSlider = document.querySelector('.cases-slider');
    const caseItems = document.querySelectorAll('.case-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (casesSlider && caseItems.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        // 初始化显示第一个案例，隐藏其他
        updateSlider();
        
        // 上一个案例
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + caseItems.length) % caseItems.length;
            updateSlider();
        });
        
        // 下一个案例
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % caseItems.length;
            updateSlider();
        });
        
        function updateSlider() {
            caseItems.forEach((item, index) => {
                if (index === currentIndex) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        // 自动轮播
        let autoSlideInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % caseItems.length;
            updateSlider();
        }, 5000);
        
        // 鼠标悬停时暂停轮播
        casesSlider.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });
        
        // 鼠标离开时恢复轮播
        casesSlider.addEventListener('mouseleave', function() {
            autoSlideInterval = setInterval(function() {
                currentIndex = (currentIndex + 1) % caseItems.length;
                updateSlider();
            }, 5000);
        });
    }
}

/**
 * 联系表单处理
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // 简单的表单验证
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // 验证邮箱格式
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // 在实际应用中，这里应该发送AJAX请求到服务器
                console.log('表单数据:', formValues);
                
                // 显示成功消息
                alert('感谢您的留言，我们会尽快与您联系！');
                
                // 重置表单
                contactForm.reset();
            } else {
                alert('请正确填写所有必填字段');
            }
        });
    }
}

/**
 * 页面滚动动画
 */
function initAnimations() {
    // 平滑滚动到锚点
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 获取header高度，用于偏移
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 更新URL，但不滚动
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // 导航菜单高亮当前部分
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
}