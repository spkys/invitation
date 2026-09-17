/* ==========================================================================
   Mobile Birthday Invitation JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initCalendarActions();
  initCopyButtons();
  initScrollAnimations();
});

// Target Date: 2026-09-27 12:00:00 KST
const TARGET_DATE = new Date('2026-09-27T12:00:00+09:00').getTime();
const EVENT_TITLE = "최승숙 여사님 생신 축하 식사 모임";
const EVENT_LOCATION = "경기 성남시 분당구 판교역로241번길 22 판교엠타워 1층 팔복 (삼평동 694)";
const EVENT_DESCRIPTION = "어머니 최승숙 여사님의 뜻깊은 생신을 축하드리는 가족·친지 식사 모임입니다.\\n장소: 판교 팔복 (판교엠타워 1층)\\n주차: 판교엠타워 지상 2~5층 (3시간 무료 주차 지원)";

/**
 * 1. Countdown Timer
 */
function initCountdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');
  const msgEl = document.getElementById('countdown-msg');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function update() {
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;

    if (distance < 0) {
      // Event day or past
      const elapsedDays = Math.floor(-distance / (1000 * 60 * 60 * 24));
      if (elapsedDays === 0) {
        daysEl.textContent = '0';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        if (msgEl) msgEl.textContent = '✨ 오늘 뜻깊은 생신 식사 모임이 열리는 날입니다!';
      } else {
        daysEl.textContent = '0';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        if (msgEl) msgEl.textContent = '축복 속에 행사가 원만히 마무리되었습니다. 감사합니다.';
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days;
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');

    if (msgEl) {
      msgEl.textContent = `어머니의 생신 모임까지 ${days}일 남았습니다.`;
    }
  }

  update();
  setInterval(update, 1000);
}

/**
 * 2. Calendar Actions (Google Calendar & .ics Download)
 */
function initCalendarActions() {
  const btnGoogle = document.getElementById('btn-google-cal');
  const btnIcs = document.getElementById('btn-download-ics');

  if (btnGoogle) {
    // 2026-09-27 12:00:00 KST is 2026-09-27 03:00:00 UTC
    // End: 15:00:00 KST is 06:00:00 UTC
    const googleUrl = new URL('https://calendar.google.com/calendar/render');
    googleUrl.searchParams.set('action', 'TEMPLATE');
    googleUrl.searchParams.set('text', EVENT_TITLE);
    googleUrl.searchParams.set('dates', '20260927T030000Z/20260927T060000Z');
    googleUrl.searchParams.set('details', EVENT_DESCRIPTION.replace(/\\n/g, '\n'));
    googleUrl.searchParams.set('location', EVENT_LOCATION);

    btnGoogle.href = googleUrl.toString();
    btnGoogle.target = '_blank';
    btnGoogle.rel = 'noopener noreferrer';
  }

  if (btnIcs) {
    btnIcs.addEventListener('click', (e) => {
      e.preventDefault();
      downloadIcsFile();
    });
  }
}

function downloadIcsFile() {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//spkys//Birthday Invitation//KO',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:birthday-invitation-20260927@spkys.github.io',
    'DTSTAMP:20260917T000000Z',
    'DTSTART:20260927T030000Z',
    'DTEND:20260927T060000Z',
    `SUMMARY:${EVENT_TITLE}`,
    `DESCRIPTION:${EVENT_DESCRIPTION}`,
    `LOCATION:${EVENT_LOCATION}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', '장모님_생신모임_20260927.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('캘린더 일정이 다운로드되었습니다.');
}

/**
 * 3. Copy Buttons (Address & Page Link)
 */
function initCopyButtons() {
  const btnCopyAddress = document.getElementById('btn-copy-address');
  const btnCopyLink = document.getElementById('btn-copy-link');
  const btnShareNative = document.getElementById('btn-share-native');

  if (btnCopyAddress) {
    btnCopyAddress.addEventListener('click', () => {
      const address = "경기도 성남시 분당구 판교역로241번길 22 판교엠타워 1층 팔복";
      copyToClipboard(address, '주소가 복사되었습니다. 지도 앱 등에 붙여넣기 하세요.');
    });
  }

  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', () => {
      copyToClipboard(window.location.href, '초대장 링크가 복사되었습니다.');
    });
  }

  if (btnShareNative) {
    btnShareNative.addEventListener('click', async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: '어머니 생신 축하 식사 초대장',
            text: '어머니의 뜻깊은 생신을 맞이하여 소중한 가족·친지분들을 모십니다.',
            url: window.location.href,
          });
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyToClipboard(window.location.href, '초대장 링크가 복사되었습니다.');
          }
        }
      } else {
        copyToClipboard(window.location.href, '초대장 링크가 복사되었습니다.');
      }
    });
  }

  const btnTmap = document.getElementById('btn-tmap-route');
  if (btnTmap) {
    btnTmap.addEventListener('click', (e) => {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (!isMobile) {
        e.preventDefault();
        showToast('티맵 길안내는 모바일 앱 전용입니다. 네이버 지도로 이동합니다.');
        window.open('https://naver.me/GWe2U1UG', '_blank');
      }
    });
  }
}

function copyToClipboard(text, successMsg) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg);
  } catch (e) {
    showToast('복사에 실패했습니다. 주소를 직접 선택해 주세요.');
  }
  document.body.removeChild(textarea);
}

/**
 * Toast Notification
 */
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  if (window.toastTimeout) {
    clearTimeout(window.toastTimeout);
  }

  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/**
 * 4. Scroll Reveal Animations
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
