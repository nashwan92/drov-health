export const messages: any = {
    en: {
      navHome: "Home",
      navProducts: "Products",
      navNews: "News",
      navJobs: "Jobs",
      navAdmin: "Admin",
      heroTitle: "Feel Better. Look Better.",
      heroSubtitle: "Premium health & beauty products from DROV.",
      heroButtonShop: "Shop Now",
      navAbout: "About"
    },
  
    ku: {
      navHome: "سەرەتا",
      navProducts: "بەرهەمەکان",
      navNews: "هەواڵ",
      navJobs: "کاری خۆبەخش",
      navAdmin: "ئەدمین",
      navAbout: "دەربارە",
      heroTitle: "باشتر هەست بکە، باشتر بێرەوەکەوە.",
      heroSubtitle: "بەرھەمە تەندروستی و جوانکارییەکان لەلایەن DROV.",
      heroButtonShop: "دەست بکە بە کڕین",
    },
  
    ar: {
      navHome: "الرئيسية",
      navProducts: "المنتجات",
      navNews: "الأخبار",
      navAbout: "من نحن",
      navJobs: "الوظائف",
      navAdmin: "لوحة التحكم",
      heroTitle: "اشعري بتحسن وظهور أفضل.",
      heroSubtitle: "منتجات صحية وجمالية مميزة مختارة من DROV.",
      heroButtonShop: "تسوق الآن",
    },
  };
  
  export function t(locale: string, key: string) {
    return messages[locale]?.[key] || messages.en[key];
  }
  