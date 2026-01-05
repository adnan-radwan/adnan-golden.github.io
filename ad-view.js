/* ================================
   تحميل ID الإعلان من الرابط
================================ */
function getAdID() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

/* ================================
   عرض السعر
================================ */
function renderPrice(ad) {
  if (ad.newPrice) {
    return `<span class="price-new">${ad.newPrice}</span>`;
  }
  if (ad.oldPrice) {
    return `<span class="price-old">${ad.oldPrice}</span>`;
  }
  return `<span class="price-new">$0</span>`;
}

/* ================================
   تحميل الإعلان الأساسي
================================ */
function loadAd() {
  const id = getAdID();
  if (!id || !window.ads) return;

  const ad = ads.find(a => a.id === id);
  if (!ad) return;

  document.getElementById("adImage").src = ad.image;
  document.getElementById("adTitle").textContent = ad.title;
  document.getElementById("adPrice").innerHTML = renderPrice(ad);

  /* الشارات */
  let badges = "";
  if (ad.featured) badges += `<span class="badge badge-featured">مميز</span>`;
  if (ad.badge === "gold") badges += `<span class="badge badge-gold">ذهبي</span>`;
  if (ad.expired) badges += `<span class="badge badge-expired">منتهي</span>`;
  document.getElementById("adBadges").innerHTML = badges;

  /* الوصف */
  document.getElementById("adDesc").textContent = ad.desc || "لا يوجد وصف.";

  /* زر التواصل */
  document.getElementById("contactBtn").href = ad.link || "#";

  /* تحميل الإعلانات المشابهة */
  loadSimilar(ad.category, ad.id);
}

/* ================================
   الإعلانات المشابهة
================================ */
function loadSimilar(category, excludeID) {
  const grid = document.getElementById("similarGrid");
  let similar = ads.filter(a => a.category === category && a.id !== excludeID);
  similar = similar.slice(0, 4);

  grid.innerHTML = similar.map(ad => `
    <div class="sim-card">
      <img class="sim-img" src="${ad.image}">
      <div class="sim-body">
        ${ad.title}
        <a class="sim-link" href="/p/ad-viewhtml.html?id=${ad.id}">عرض</a>
      </div>
    </div>
  `).join("");
}

/* ================================
   نسخ الرابط
================================ */
function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  alert("تم نسخ رابط الإعلان");
}

/* ================================
   مشاركة الإعلان
================================ */
function shareAd() {
  if (navigator.share) {
    navigator.share({
      title: document.getElementById("adTitle").textContent,
      url: window.location.href
    });
  } else {
    alert("المشاركة غير مدعومة على هذا الجهاز");
  }
}

/* ================================
   تشغيل النظام
================================ */
loadAd();
