document.addEventListener('DOMContentLoaded', function() { 
 // 轮播图功能 
 const slides = document.querySelectorAll('.slide'); 
 let currentSlide = 0; 
 
 function showSlide(n) { 
 slides.forEach(slide => slide.classList.remove('active')); 
 currentSlide = (n + slides.length) % slides.length; 
 slides[currentSlide].classList.add('active'); 
 } 
 
 function nextSlide() { 
 showSlide(currentSlide + 1); 
 } 
 
 // 自动轮播 
 let slideInterval = setInterval(nextSlide, 5000); 
 
 // 鼠标悬停时暂停轮播 
 const slider = document.querySelector('.slider'); 
 slider.addEventListener('mouseenter', () => clearInterval(slideInterval)); 
 slider.addEventListener('mouseleave', () => { 
 clearInterval(slideInterval); 
 slideInterval = setInterval(nextSlide, 5000); 
 }); 
 
 // 初始化显示第一张幻灯片 
 if (slides.length > 0) { 
 showSlide(0); 
 } 
 
 // 社交图标点击事件 - 根据链接决定行为
 const socialIcons = document.querySelectorAll('.social-icon'); 
 const modal = document.getElementById('qr-modal'); 
 const modalImage = document.getElementById('qr-code-image'); 
 const platformName = document.getElementById('platform-name'); 
 const closeModal = document.querySelector('.close-modal'); 
 
 // 平台名称映射 
 const platformNames = { 
 weixin: '微信', 
 github: 'GitHub', 
 twitter: 'Twitter', 
 envelope: '邮箱', 
 weibo: '微博' 
 }; 
 
 socialIcons.forEach(icon => { 
 icon.addEventListener('click', function(e) { 
 e.preventDefault(); 
 const href = this.getAttribute('href');
 const platform = this.getAttribute('data-platform') || 
 this.querySelector('i').className.match(/fa-([a-z]+)/)[1]; 
 const qrSrc = this.getAttribute('data-qr');
 
 // 如果是邮箱或真实链接，直接打开对应客户端或页面
 if (platform === 'envelope' || href && href !== '#') { 
   if (platform === 'envelope') {
     window.location.href = `mailto:${href.substring(href.indexOf(':') + 1)}`;
   } else {
     window.open(href, '_blank');
   }
   return; 
 } 
 
 // 如果是带#和data-qr属性的链接，显示模态框 
 if (href === '#' && qrSrc) { 
   modalImage.src = qrSrc; 
   platformName.textContent = platformNames[platform] || platform; 
   modal.style.display = 'block'; 
 }
 
 // 添加点击波纹效果 
 this.classList.add('ripple'); 
 setTimeout(() => this.classList.remove('ripple'), 500); 
 }); 
 }); 
 
 // 关闭模态框 
 closeModal.addEventListener('click', () => { 
 modal.style.display = 'none'; 
 }); 
 
 // 点击模态框外部关闭 
 window.addEventListener('click', (e) => { 
 if (e.target === modal) { 
 modal.style.display = 'none'; 
 } 
 }); 
 
 // 添加页面加载动画 
 document.body.style.opacity = '0'; 
 document.body.style.transition = 'opacity 0.5s ease-out'; 
 
 window.addEventListener('load', function() { 
 document.body.style.opacity = '1'; 
 }); 
 
 // 添加滚动动画 
 const observerOptions = { 
 threshold: 0.1, 
 rootMargin: '0px 0px -50px 0px' 
 }; 
 
 const observer = new IntersectionObserver((entries) => { 
 entries.forEach(entry => { 
 if (entry.isIntersecting) { 
 entry.target.style.opacity = '1'; 
 entry.target.style.transform = 'translateY(0)'; 
 } 
 }); 
 }, observerOptions); 
 
 // 观察所有需要动画的元素 
 document.querySelectorAll('.section-title, .blog-post, .wechat-post, .social-icon').forEach(el => { 
 el.style.opacity = '0'; 
 el.style.transform = 'translateY(20px)'; 
 el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'; 
 observer.observe(el); 
 }); 
});