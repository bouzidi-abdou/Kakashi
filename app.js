// --- 1. تأثير الكرات المتحركة (Kinet.js) ---

// التأكد من تحميل مكتبة kinet
if (typeof Kinet !== 'undefined') {
    window.onload = function() {
        const circle = document.getElementById('circle');
        
        // إعداد Kinet لتتبع الماوس
        let kinet = new Kinet({
            'movement': 10,
            'deceleration': 0.98,
        });

        // ربط حركة الماوس بدائرة المؤشر
        kinet.on('tick', (instances) => {
            const { x, y } = instances[0];
            
            // تطبيق الحركة مع تحسين الأداء (استخدام translate3d)
            circle.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`;
        });

        // تشغيل العداد عند تحميل الصفحة
        animateStats();
    }
}


// --- 2. دالة العداد المتحرك للإحصائيات (تستخدم أرقام إنجليزية) ---
function animateStats() {
    const statElements = document.querySelectorAll('.stat-number');
    const duration = 2000; // مدة العد (2 ثانية)

    statElements.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const startValue = parseInt(stat.getAttribute('data-start')) || 0; 
        let current = startValue;
        const increment = (target - startValue) / (duration / 16); 

        // وضع القيمة الابتدائية مباشرة في العنصر 
        // لا نستخدم toLocaleString هنا لضمان بقاء الأرقام إنجليزية
        stat.textContent = startValue; 

        const updateCount = () => {
            current += increment;
            
            if (current < target) {
                // تحديث النص بالقيمة الحالية (باستخدام Math.ceil وتركها كنص عادي)
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateCount); // استدعاء متكرر للأنيميشن
            } else {
                // الوصول للقيمة النهائية
                stat.textContent = target;
            }
        };

        // بدء العد
        updateCount();
    });
}