VEXO ULTIMATE — نسخه چندفایلی با بک‌اند Firebase
=================================================

این بسته شامل پیاده‌سازی سمت مرورگر و Cloud Functions است. ZIP به معنی آنلاین‌شدن خودکار نیست:
برای واقعی‌شدن سرویس‌ها باید مراحل زیر را در حساب Firebase خودت انجام بدهی و توابع را Deploy کنی.
هیچ رمز عبور، کلید خصوصی یا عبارت بازیابی کیف پول در فایل‌ها قرار داده نشده است.

قابلیت‌های پیاده‌سازی‌شده در کد
------------------------------
1) ورود/ثبت‌نام Email و Google با Firebase Authentication.
2) ساخت خودکار Player ID یکتای ۱۰ رقمی در سرور و ثبت index برای جست‌وجوی GOD.
3) کیف پول Gold / Silver / Bronze / VXB با خواندن فقط برای صاحب حساب؛ تغییر موجودی فقط از Cloud Functions.
4) تاریخچه تراکنش‌ها، آمار بازی و ذخیره مسابقه.
5) بازی Bot با انتخاب تصادفی سمت سرور؛ برد +20 VXB و باخت -5 VXB (موجودی منفی نمی‌شود).
6) بازی چندنفره: صف تصادفی، اتاق خصوصی ۸ کاراکتری، ارسال حرکت و نمایش نتیجه پس از حرکت هر دو بازیکن.
7) GOD Admin با جست‌وجوی Player ID، اصلاح موجودی با دلیل اجباری، محدود/رفع محدودیت حساب، آمار و گزارش تغییرات.
8) سفارش TON Testnet و بررسی سمت سرور با TON Center؛ فقط شبکه آزمایشی و بدون ارزش پولی واقعی.
9) تنظیم تبلیغات و چهار لینک کانال رسمی.

نکته مهم پرداخت
---------------
پرداخت فعال فقط روی TON TESTNET طراحی شده است. مقادیر 0.1 / 0.5 / 1 TON صرفاً مقادیر آزمایشی تنظیم‌شده در کد هستند.
این نسخه پرداخت Mainnet، برداشت پول، فروش واقعی و توکن Jetton را فعال نمی‌کند. برای تأیید پرداخت،
سرور آدرس دریافت‌کننده، مقدار دقیق و memo یکتا را در تراکنش‌های شبکه آزمایشی بررسی می‌کند.
پشتیبانی API شبکه ممکن است با تغییرات TON Center نیازمند تطبیق باشد؛ قبل از استفاده، با چند کیف پول تست‌نت
و تراکنش‌های واقعی آزمایشی آن را تست کن. هرگز اسکرین‌شات پرداخت را مدرک قطعی ندان.

مرحله ۱ — تنظیم Firebase Web
----------------------------
1) کانفیگ پروژه vexo-v2 در فایل js/firebase-config.js قرار داده شده است. اگر پروژه دیگری ساختی، مقادیر را با Web App config همان پروژه جایگزین کن.
2) Firebase Console > Authentication > Sign-in method: روش Email/Password را فعال کن؛ برای دکمه گوگل، Google provider را هم فعال کن.
3) Authentication > Settings > Authorized domains: دامنه GitHub Pages یا هاست خودت را اضافه کن.
4) Realtime Database را ایجاد کن.
5) صفحه اصلی سایت (index.html) اکنون فقط دروازه ورود است: کاربر بدون نشست معتبر به login.html هدایت می‌شود و پس از ورود/ثبت‌نام به dashboard.html می‌رود. لینک خدمات فقط بعد از ورود در داشبورد نمایش داده می‌شوند.
6) ثبت‌نام ایمیل/رمز عبور با createUserWithEmailAndPassword انجام می‌شود؛ نام نمایشی با updateProfile ذخیره و سپس تابع امن ensurePlayer برای ساخت پروفایل، شناسه Player ID و کیف پول اولیه فراخوانی می‌شود.

مرحله ۲ — تنظیم قوانین دیتابیس
------------------------------
فایل firebase-database.rules.json را در Firebase Realtime Database > Rules منتشر کن.
قواعد عمداً نوشتن مستقیم از مرورگر در wallet، transactions، profiles، rooms و تنظیمات را مسدود می‌کند.
همه تغییرات مالی و بازی باید از Cloud Functions عبور کنند.

مرحله ۳ — نصب ابزارهای سرور و Deploy
------------------------------------
Cloud Functions به Node.js 20 و Firebase CLI و معمولاً پلن Blaze نیاز دارد. Windows 8 ممکن است
نسخه‌های جدید Node/Firebase CLI را پشتیبانی نکند؛ برای Deploy می‌توانی از کامپیوتر جدیدتر یا Cloud Shell استفاده کنی.

در پوشه اصلی پروژه:
  npm install -g firebase-tools
  firebase login
  firebase use vexo-v2
  npm --prefix functions install
  firebase deploy --only database,functions

در صورت درخواست، Billing/Blaze را فعال کن. قبل از Deploy هزینه‌های احتمالی Functions، Database و خروجی شبکه را بررسی کن.

مرحله ۴ — فعال‌سازی GOD برای اولین بار
-------------------------------------
برای جلوگیری از راه‌اندازی عمومی و ناامن، هیچ دکمه یا تابع عمومی برای ساخت اولین GOD وجود ندارد.
ابتدا حساب alireza.rashidi.king@gmail.com را از صفحه ثبت‌نام بساز و یک بار وارد سایت شو.
سپس از یک محیط مورد اعتماد که دسترسی مالک Firebase دارد:
  cd functions
  npm install
  gcloud auth application-default login
  set GCLOUD_PROJECT=vexo-v2
  node bootstrap-god.js alireza.rashidi.king@gmail.com

در PowerShell به‌جای set از این دستور استفاده کن:
  $env:GCLOUD_PROJECT="vexo-v2"

پس از پیام موفقیت، از سایت خارج شو و دوباره وارد شو تا custom claim جدید دریافت شود.
فایل bootstrap-god.js را به هیچ وب‌سایت یا مخزن عمومی به‌عنوان endpoint تبدیل نکن.

مرحله ۵ — TON Testnet
---------------------
1) یک کیف پول مخصوص TON Testnet بساز؛ از کیف پول اصلی و دارایی واقعی استفاده نکن.
2) یک آدرس دریافت‌کننده تست‌نت داشته باش و API Key تست‌نت TON Center بگیر.
3) از functions/.env.example یک فایل functions/.env بساز و دو مقدار را وارد کن:
   VEXO_TON_TESTNET_RECEIVER
   TONCENTER_TESTNET_API_KEY
4) دوباره توابع را Deploy کن:
   firebase deploy --only functions
5) در فروشگاه، سفارش تست‌نت بساز؛ مبلغ و memo دقیق را در کیف پول تست‌نت بفرست؛ سپس Verify را بزن.
6) اول با مقادیر کم و حساب آزمایشی تست کن. هیچ‌وقت عبارت بازیابی یا کلید خصوصی را در سایت وارد نکن.

ساختار اصلی
------------
index.html / login.html / dashboard.html / game.html / profile.html / store.html / admin.html
css/                         استایل‌ها
js/                          ماژول‌های Firebase و رابط کاربری
functions/index.js           توابع امن سمت سرور
functions/bootstrap-god.js   راه‌اندازی اولیه GOD از محیط مورد اعتماد
functions/.env.example       الگوی تنظیمات TON Testnet
firebase-database.rules.json قوانین Realtime Database
firebase.json                تنظیمات Hosting و Functions

نکات امنیت و محدودیت
--------------------
- Firebase Hosting یا GitHub Pages فقط فایل‌های فرانت‌اند را میزبانی می‌کند؛ توابع باید جداگانه Deploy شوند.
- کد کلاینت هیچ‌گاه منبع معتبر موجودی نیست. Rules نوشتن مستقیم مالی را مسدود می‌کند.
- پرداخت فعلی فقط TON Testnet است؛ TON Mainnet و Jetton Mainnet عمداً غیرفعال‌اند.
- پاداش بازی فقط VXB است؛ بازی Gold تولید نمی‌کند. سقف ۱۰۰ Gold روزانه برای پاداش‌های Gold سمت سرور در نظر گرفته شده و فعلاً هیچ مسیر بازی Gold صادر نمی‌کند.
- چندنفره و سفارش‌ها پس از Deploy و تست دو حساب مستقل کار می‌کنند؛ تا آن زمان زنده و آنلاین محسوب نمی‌شوند.
- این پروژه بررسی حقوقی یا ممیزی امنیتی مستقل نشده است. پیش از عرضه عمومی، تست نفوذ، محدودسازی نرخ درخواست، سیاست حریم خصوصی، شرایط استفاده و الزامات قانونی پرداخت را انجام بده.
