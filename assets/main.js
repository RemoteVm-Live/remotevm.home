// Theme Toggle
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
}
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    document.getElementById('themeToggle').innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Mobile Menu - اصلاح شده و کاملاً ایمن
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const menuOverlay = document.getElementById('menuOverlay');

if (menuToggle && mobileMenu && closeMenuBtn && menuOverlay) {
    const openMenu = () => {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    // باز کردن منو
    menuToggle.addEventListener('click', openMenu);

    // بستن با دکمه X
    closeMenuBtn.addEventListener('click', closeMenu);

    // بستن با کلیک روی overlay
    menuOverlay.addEventListener('click', closeMenu);

    // بستن با ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // بستن با کلیک روی لینک‌ها
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Hide Overlay
setTimeout(() => document.getElementById('overlay').classList.add('hidden'), 2000);

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
});
document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// Features
const features = [
    { icon: 'fa-chalkboard-teacher', title: 'ساخت کلاس مجازی', desc: 'ساخت کلاس با چند کلیک.', url: 'https://class.remotevm.ir' },
    { icon: 'fa-phone', title: 'تماس تصویری', desc: 'شروع تماس ویدیویی با چند کلیک.', url: 'https://call.remotevm.ir' },
    { icon: 'fa-camera', title: 'انتقال تصویر دوربین موبایل', desc: 'دوربین موبایل را بدون نرم‌افزار به وب‌کم بی‌سیم تبدیل کنید.', url: 'https://webcam.remotevm.ir' },
    { icon: 'fa-video', title: 'ویدیو با کیفیت بالا', desc: 'انتقال ویدیو با رزولوشن بالا بدون تاخیر.' },
    { icon: 'fa-microphone', title: 'صدا استریو', desc: 'صدای شفاف و با کیفیت استریو.' },
    { icon: 'fa-users', title: 'ویدیو کنفرانس', desc: 'جلسات گروهی با چندین شرکت‌کننده.' },
    { icon: 'fa-lock', title: 'امنیت بالا', desc: 'رمزنگاری end-to-end برای حفظ حریم خصوصی.' },
    { icon: 'fa-mobile-alt', title: 'سازگار با موبایل', desc: 'پشتیبانی کامل از دستگاه‌های موبایل.' },
    { icon: 'fa-cloud', title: 'ارتباط P2P', desc: 'بدون نیاز به نصب نرم‌افزار.' }
];
const featuresContainer = document.getElementById('featuresContainer');
features.forEach((feature, index) => {
    const card = document.createElement('div');
    card.className = 'feature-card featured-card card-hover scroll-reveal cursor-custom animate-fade-in-up';
    card.style.animationDelay = `${index * 0.1}s`;
    let content = `
        <i class="fas ${feature.icon} feature-icon micro-animation"></i>
        <h3 class="feature-title text-xl font-semibold mb-2">${feature.title}</h3>
        <p class="feature-desc text-l-400">${feature.desc}</p>
    `;
    if (feature.url) {
        content += `<a href="${feature.url}" target="_blank" rel="noopener noreferrer" class="btn-modern mt-4 block w-full text-center">شروع کنید</a>`;
    }
    card.innerHTML = content;
    featuresContainer.appendChild(card);
});

// Toggle Animation
document.querySelectorAll('.toggle-switch input').forEach(toggle => {
    toggle.addEventListener('change', (e) => {
        const slider = e.target.nextElementSibling;
        if (slider) slider.style.transform = e.target.checked ? 'translateX(-2px)' : 'translateX(0)';
    });
});

// Micro Interactions
document.querySelectorAll('.micro-animation').forEach(el => {
    el.addEventListener('mouseenter', () => el.style.transform = 'rotate(5deg) scale(1.1)');
    el.addEventListener('mouseleave', () => el.style.transform = 'rotate(0deg) scale(1)');
});

// Call Logic
const startCallBtn = document.getElementById('startCallBtn');
const stopCallBtn = document.getElementById('stopCallBtn');
const resetCallBtn = document.getElementById('resetCallBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const muteBtn = document.getElementById('muteBtn');
const qualitySelect = document.getElementById('qualitySelect');
const uiCheckbox = document.getElementById('uiCheckbox');
const stereoCheckbox = document.getElementById('stereoCheckbox');
const codecSelect = document.getElementById('codecSelect');
const bitrateRange = document.getElementById('bitrateRange');
const bitrateValue = document.getElementById('bitrateValue');
const conferenceCheckbox = document.getElementById('conferenceCheckbox');
const selfviewCheckbox = document.getElementById('selfviewCheckbox');
const vdoFrame = document.getElementById('vdoFrame');
const callContainer = document.getElementById('callContainer');
const obsSection = document.getElementById('obsSection');
const obsLink = document.getElementById('obsLink');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const copyMessage = document.getElementById('copyMessage');
const errorMessage = document.getElementById('errorMessage');
const inviteSection = document.getElementById('inviteSection');
const inviteLink = document.getElementById('inviteLink');
const copyInviteBtn = document.getElementById('copyInviteBtn');
const copyInviteMessage = document.getElementById('copyInviteMessage');
const errorInviteMessage = document.getElementById('errorInviteMessage');
const loadingOverlay = document.getElementById('loadingOverlay');
const statusIndicator = document.getElementById('statusIndicator');
const advancedSettingsToggle = document.getElementById('advancedSettingsToggle');
const advancedSettingsPanel = document.getElementById('advancedSettingsPanel');
const videoCallCard = document.getElementById('call');
const audioDeviceSelect = document.getElementById('audioDeviceSelect');
const videoDeviceSelect = document.getElementById('videoDeviceSelect');
bitrateValue.textContent = `${bitrateRange.value} kbps`;
advancedSettingsToggle.addEventListener('click', () => {
    advancedSettingsPanel.classList.toggle('hidden');
    const icon = advancedSettingsToggle.querySelector('i');
    icon.style.transform = advancedSettingsPanel.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
});
bitrateRange.addEventListener('input', () => {
    bitrateValue.textContent = `${bitrateRange.value} kbps`;
});

// Device Enumeration
if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    navigator.mediaDevices.enumerateDevices().then(devices => {
        const audioDevices = devices.filter(device => device.kind === 'audioinput');
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        audioDeviceSelect.innerHTML = '<option value="">دستگاه پیش‌فرض</option>';
        videoDeviceSelect.innerHTML = '<option value="">دوربین پیش‌فرض</option>';
        audioDevices.forEach((device, index) => {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || `میکروفون ${index + 1}`;
            audioDeviceSelect.appendChild(option);
        });
        videoDevices.forEach((device, index) => {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || `دوربین ${index + 1}`;
            videoDeviceSelect.appendChild(option);
        });
    }).catch(err => console.warn('مشکل در دسترسی به دستگاه‌های ورودی/خروجی:', err));
}

// Enable/Disable Selfview based on Conference mode
conferenceCheckbox.addEventListener('change', () => {
    selfviewCheckbox.disabled = !conferenceCheckbox.checked;
    if (!conferenceCheckbox.checked) {
        selfviewCheckbox.checked = false;
        const slider = selfviewCheckbox.nextElementSibling;
        if (slider) slider.style.transform = 'translateX(0)';
    }
});

function generateRandomString(length = 10) {
    return Math.random().toString(36).substring(2, length + 2);
}

function getParams(isViewer = false) {
    let params = [];
    if (!isViewer) {
        const quality = qualitySelect.value;
        if (quality) params.push(`quality=${quality}`);
        const audioDevice = audioDeviceSelect.value;
        if (audioDevice) params.push(`audioinput=${audioDevice}`);
        const videoDevice = videoDeviceSelect.value;
        if (videoDevice) params.push(`videoinput=${videoDevice}`);
    }
    const codec = codecSelect.value;
    if (codec) params.push(`codec=${codec}`);
    const bitrate = bitrateRange.value;
    if (bitrate) params.push(`vb=${bitrate}`);
    if (stereoCheckbox.checked) params.push('stereo=1');
    if (uiCheckbox.checked) params.push('cleanoutput=1');
    if (conferenceCheckbox.checked && selfviewCheckbox.checked) params.push('minipreview=1');
    return params.length ? `&${params.join('&')}` : '';
}

function updateUrlParams(baseUrl, newParams) {
    if (!baseUrl) return '';
    try {
        const url = new URL(baseUrl, 'https://live.remotevm.ir/');
        const searchParams = new URLSearchParams(url.search);
        for (const key of Array.from(searchParams.keys())) {
            if (key !== 'room' && key !== 'push' && key !== 'view' && key !== 'scene') {
                searchParams.delete(key);
            }
        }
        if (newParams) {
            const paramsString = newParams.replace(/^&/, '');
            const newSearchParams = new URLSearchParams(paramsString);
            for (const [key, value] of newSearchParams) {
                searchParams.set(key, value);
            }
        }
        url.search = searchParams.toString();
        return url.toString();
    } catch (error) {
        console.error('خطا در بروزرسانی پارامترهای URL:', error);
        return baseUrl;
    }
}

let currentID = '';
let isConference = false;
let baseObsUrl = '';
let baseInviteUrl = '';
let baseIframeUrl = '';
let isIframeLoaded = false;
let isMuted = false;
let loadingTimer = null;

function setupIframeLoadHandler() {
    if (loadingTimer) {
        clearTimeout(loadingTimer);
        loadingTimer = null;
    }
    vdoFrame.onload = null;
    vdoFrame.onload = function () {
        console.log('iframe loaded');
        isIframeLoaded = true;
        loadingOverlay.classList.add('hidden');
        if (loadingTimer) {
            clearTimeout(loadingTimer);
            loadingTimer = null;
        }
    };
    loadingTimer = setTimeout(() => {
        console.log('loading timeout reached');
        if (!isIframeLoaded) {
            isIframeLoaded = true;
            loadingOverlay.classList.add('hidden');
        }
        loadingTimer = null;
    }, 8000);
}

function updateCallLinks(changedElement, isStart = false) {
    if (!currentID) return;
    const isConferenceChange = changedElement === conferenceCheckbox;
    const newIsConference = conferenceCheckbox.checked;
    if ((isConferenceChange && newIsConference !== isConference) || isStart) {
        isConference = newIsConference;
        if (isConference) {
            baseIframeUrl = `https://live.remotevm.ir/?room=${currentID}`;
            baseObsUrl = `https://live.remotevm.ir/?room=${currentID}&scene=0`;
            baseInviteUrl = `https://live.remotevm.ir/?room=${currentID}`;
            inviteSection.classList.remove('hidden');
        } else {
            baseIframeUrl = `https://live.remotevm.ir/?push=${currentID}`;
            baseObsUrl = `https://live.remotevm.ir/?view=${currentID}`;
            baseInviteUrl = '';
            inviteSection.classList.add('hidden');
            selfviewCheckbox.checked = false;
            const slider = selfviewCheckbox.nextElementSibling;
            if (slider) slider.style.transform = 'translateX(0)';
        }
        loadingOverlay.classList.remove('hidden');
        isIframeLoaded = false;
        setupIframeLoadHandler();
        vdoFrame.src = updateUrlParams(baseIframeUrl, getParams());
        isMuted = false;
        muteBtn.innerHTML = '<i class="fas fa-microphone"></i> بی‌صدا';
    }
    obsLink.value = updateUrlParams(baseObsUrl, getParams(true));
    if (isConference) {
        inviteLink.value = updateUrlParams(baseInviteUrl, getParams());
    }
}

startCallBtn.addEventListener('click', () => {
    try {
        currentID = generateRandomString();
        baseObsUrl = '';
        baseInviteUrl = '';
        baseIframeUrl = '';
        callContainer.classList.remove('hidden');
        loadingOverlay.classList.remove('hidden');
        obsSection.classList.remove('hidden');
        updateCallLinks(startCallBtn, true);
        startCallBtn.classList.add('hidden');
        stopCallBtn.classList.remove('hidden');
        resetCallBtn.classList.remove('hidden');
        fullscreenBtn.classList.remove('hidden');
        muteBtn.classList.remove('hidden');
        statusIndicator.classList.remove('status-inactive');
        statusIndicator.classList.add('status-active');
        videoCallCard.classList.add('active');
    } catch (error) {
        console.error('خطا در شروع تماس:', error);
        errorMessage.textContent = 'خطا در شروع تماس. لطفاً دوباره تلاش کنید.';
        errorMessage.classList.remove('hidden');
        setTimeout(() => errorMessage.classList.add('hidden'), 3000);
    }
});

stopCallBtn.addEventListener('click', () => {
    try {
        if (loadingTimer) {
            clearTimeout(loadingTimer);
            loadingTimer = null;
        }
        vdoFrame.src = '';
        obsLink.value = '';
        inviteLink.value = '';
        loadingOverlay.classList.add('hidden');
        callContainer.classList.add('hidden');
        obsSection.classList.add('hidden');
        inviteSection.classList.add('hidden');
        startCallBtn.classList.remove('hidden');
        stopCallBtn.classList.add('hidden');
        resetCallBtn.classList.add('hidden');
        fullscreenBtn.classList.add('hidden');
        muteBtn.classList.add('hidden');
        statusIndicator.classList.add('status-inactive');
        statusIndicator.classList.remove('status-active');
        videoCallCard.classList.remove('active');
        currentID = '';
        baseObsUrl = '';
        baseInviteUrl = '';
        baseIframeUrl = '';
        isIframeLoaded = false;
        isMuted = false;
        selfviewCheckbox.checked = false;
        selfviewCheckbox.disabled = true;
        const slider = selfviewCheckbox.nextElementSibling;
        if (slider) slider.style.transform = 'translateX(0)';
    } catch (error) {
        console.error('خطا در توقف تماس:', error);
    }
});

resetCallBtn.addEventListener('click', () => {
    if (!currentID || !baseIframeUrl) return;
    try {
        loadingOverlay.classList.remove('hidden');
        isIframeLoaded = false;
        setupIframeLoadHandler();
        vdoFrame.src = updateUrlParams(baseIframeUrl, getParams());
        updateCallLinks(resetCallBtn);
        isMuted = false;
        muteBtn.innerHTML = '<i class="fas fa-microphone"></i> بی‌صدا';
    } catch (error) {
        console.error('خطا در بازنشانی تماس:', error);
        errorMessage.textContent = 'خطا در بازنشانی تماس. لطفاً دوباره تلاش کنید.';
        errorMessage.classList.remove('hidden');
        setTimeout(() => errorMessage.classList.add('hidden'), 3000);
    }
});

fullscreenBtn.addEventListener('click', () => {
    try {
        if (vdoFrame.requestFullscreen) {
            vdoFrame.requestFullscreen();
        } else if (vdoFrame.mozRequestFullScreen) {
            vdoFrame.mozRequestFullScreen();
        } else if (vdoFrame.webkitRequestFullscreen) {
            vdoFrame.webkitRequestFullscreen();
        } else if (vdoFrame.msRequestFullscreen) {
            vdoFrame.msRequestFullscreen();
        }
    } catch (error) {
        console.error('خطا در ورود به حالت تمام‌صفحه:', error);
        errorMessage.textContent = 'خطا در نمایش تمام‌صفحه.';
        errorMessage.classList.remove('hidden');
        setTimeout(() => errorMessage.classList.add('hidden'), 3000);
    }
});

muteBtn.addEventListener('click', () => {
    if (!isIframeLoaded) {
        errorMessage.textContent = 'لطفاً صبر کنید تا ارتباط برقرار شود.';
        errorMessage.classList.remove('hidden');
        setTimeout(() => errorMessage.classList.add('hidden'), 3000);
        return;
    }
    try {
        isMuted = !isMuted;
        muteBtn.innerHTML = isMuted ? '<i class="fas fa-microphone-slash"></i> باصدا' : '<i class="fas fa-microphone"></i> بی‌صدا';
        vdoFrame.contentWindow.postMessage({ mute: isMuted }, 'https://live.remotevm.ir');
    } catch (err) {
        console.error('خطا در تغییر وضعیت بی‌صدا:', err);
        errorMessage.textContent = 'خطا در تغییر وضعیت میکروفون.';
        errorMessage.classList.remove('hidden');
        setTimeout(() => errorMessage.classList.add('hidden'), 3000);
    }
});

copyLinkBtn.addEventListener('click', () => {
    if (!obsLink.value) return;
    try {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(obsLink.value).then(() => {
                copyMessage.textContent = 'لینک با موفقیت کپی شد!';
                copyMessage.classList.remove('hidden');
                setTimeout(() => copyMessage.classList.add('hidden'), 3000);
            }).catch(err => {
                console.error('خطا در کپی لینک:', err);
                obsLink.select();
                document.execCommand('copy');
                copyMessage.textContent = 'لینک کپی شد!';
                copyMessage.classList.remove('hidden');
                setTimeout(() => copyMessage.classList.add('hidden'), 3000);
            });
        } else {
            obsLink.select();
            document.execCommand('copy');
            copyMessage.textContent = 'لینک کپی شد!';
            copyMessage.classList.remove('hidden');
            setTimeout(() => copyMessage.classList.add('hidden'), 3000);
        }
    } catch (err) {
        console.error('خطا در کپی لینک:', err);
        errorMessage.textContent = 'خطا در کپی لینک.';
        errorMessage.classList.remove('hidden');
        setTimeout(() => errorMessage.classList.add('hidden'), 3000);
    }
});

copyInviteBtn.addEventListener('click', () => {
    if (!inviteLink.value) return;
    try {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(inviteLink.value).then(() => {
                copyInviteMessage.textContent = 'لینک دعوت با موفقیت کپی شد!';
                copyInviteMessage.classList.remove('hidden');
                setTimeout(() => copyInviteMessage.classList.add('hidden'), 3000);
            }).catch(err => {
                console.error('خطا در کپی لینک دعوت:', err);
                inviteLink.select();
                document.execCommand('copy');
                copyInviteMessage.textContent = 'لینک دعوت کپی شد!';
                copyInviteMessage.classList.remove('hidden');
                setTimeout(() => copyInviteMessage.classList.add('hidden'), 3000);
            });
        } else {
            inviteLink.select();
            document.execCommand('copy');
            copyInviteMessage.textContent = 'لینک دعوت کپی شد!';
            copyInviteMessage.classList.remove('hidden');
            setTimeout(() => copyInviteMessage.classList.add('hidden'), 3000);
        }
    } catch (err) {
        console.error('خطا در کپی لینک دعوت:', err);
        errorInviteMessage.textContent = 'خطا در کپی لینک دعوت.';
        errorInviteMessage.classList.remove('hidden');
        setTimeout(() => errorInviteMessage.classList.add('hidden'), 3000);
    }
});

[qualitySelect, codecSelect, bitrateRange, stereoCheckbox, uiCheckbox, conferenceCheckbox, selfviewCheckbox, audioDeviceSelect, videoDeviceSelect].forEach(element => {
    element.addEventListener('change', () => updateCallLinks(element));
});

window.addEventListener('message', (event) => {
    if (event.origin !== 'https://live.remotevm.ir') return;
    try {
        const data = event.data;
        if (data.connected === true) {
            loadingOverlay.classList.add('hidden');
            isIframeLoaded = true;
            if (loadingTimer) {
                clearTimeout(loadingTimer);
                loadingTimer = null;
            }
        } else if (data.connected === false) {
            errorMessage.textContent = 'ارتباط قطع شد. در حال تلاش مجدد...';
            errorMessage.classList.remove('hidden');
            setTimeout(() => errorMessage.classList.add('hidden'), 3000);
        }
        if (data.isMuted !== undefined) {
            isMuted = data.isMuted;
            muteBtn.innerHTML = isMuted ? '<i class="fas fa-microphone-slash"></i> باصدا' : '<i class="fas fa-microphone"></i> بی‌صدا';
        }
    } catch (error) {
        console.error('خطا در پردازش پیام از iframe:', error);
    }
});

// Initial status
statusIndicator.classList.add('status-inactive');