import { useLanguageStore } from '@/store/languageStore'

type TranslationKey = keyof typeof translations.en

const translations = {
  en: {
    // Brand
    brandName: 'World Taza',
    brandNameAr: 'عالم طازة',
    brandFull: 'World Taza | عالم طازة',
    tagline: 'The taste starts here',
    taglineAr: 'الطعم يبدأ هنا',
    since: 'Since 2004',
    
    // Branch Selection & Hero
    selectBranch: 'Select your branch',
    selectBranchDesc: 'Choose the nearest World Taza branch to start your order.',
    selectBranchAndOrder: 'Select a branch and order.',
    orderFromBranchDesc: 'Search the menu, add items, and send your order directly to the selected World Taza branch on WhatsApp.',
    ourBranches: 'Our Branches',
    browseMenuNotice: 'Viewing full menu. Select a branch above to start ordering.',
    selectBranchToOrderPrompt: 'Please select a branch first to place an order.',
    startOrder: 'Start Order',
    viewBranches: 'View Branches',
    deliveryAvailable: 'Delivery Available',
    pickupOnly: 'Pickup Only',
    
    // Header
    call: 'Call',
    whatsapp: 'WhatsApp',
    switchLang: 'عربي',
    
    // Menu
    menuTitle: 'Menu',
    searchPlaceholder: 'Search broast, zinger, fries...',
    all: 'All',
    noMatch: 'No matching items found.',
    soldOut: 'Sold Out',
    addItem: 'Add',
    addToCart: 'Add to Cart',
    from: 'From',
    
    // Flavors
    normal: 'Normal',
    spicy: 'Spicy',
    
    // Variants
    regular: 'Regular',
    sandwich: 'Sandwich',
    meal: 'Meal',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    half: 'Half',
    full: 'Full',
    
    // Cart
    yourOrder: 'Your Order',
    cartEmpty: 'Your cart is empty. Browse the menu and add items.',
    cartItems: 'items',
    viewOrder: 'View Order',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery Fee',
    total: 'Total',
    free: 'Free',
    clearCart: 'Clear Cart',
    sendOrder: 'Place Order',
    clearCartConfirm: 'Clear all items from your cart?',
    
    // Checkout
    chooseOrderType: 'Complete Your Order',
    serviceType: 'Service Type',
    pickup: 'Pickup from Branch',
    delivery: 'Delivery',
    customerName: 'Your Name',
    customerNamePlaceholder: 'Enter your name',
    phoneNumber: 'Phone Number',
    phonePlaceholder: '05XXXXXXXX',
    buildingDetails: 'Building & Address Details',
    buildingPlaceholder: 'Building, floor, apartment, landmark',
    locationLink: 'Google Maps Location Link',
    locationPlaceholder: 'Paste your Google Maps link',
    willShareLocation: 'I will share my live location on WhatsApp',
    sendToWhatsapp: 'Send to WhatsApp',
    cancel: 'Cancel',
    payment: 'Payment Method',
    cash: 'Cash',
    card: 'Card',
    
    // Delivery messages
    deliveryUnavailable: 'Delivery is not available for this branch. Please select pickup.',
    deliveryReady: 'Delivery within 4 km. Minimum order 30 SAR. Delivery charge: 5 SAR (free over 100 SAR).',
    deliveryMinimum: 'Minimum order for delivery is 30 SAR. Please add more items or select pickup.',
    pickupReady: 'Your order will be prepared for pickup at the branch.',
    
    // Validation
    nameRequired: 'Please enter your name.',
    phoneRequired: 'Please enter a valid Saudi phone number.',
    phoneInvalid: 'Invalid phone format. Use 05XXXXXXXX or +9665XXXXXXXX.',
    addressRequired: 'Please enter your delivery address.',
    
    // Branch switch
    switchBranchTitle: 'Change Branch?',
    switchBranchMessage: 'Changing branch will clear your current cart. Continue?',
    confirm: 'Yes, Change',
    keepCurrent: 'Keep Current',
    
    // Admin
    adminTitle: 'World Taza Manager',
    adminLogin: 'Manager Login',
    email: 'Email',
    password: 'Password',
    login: 'Log In',
    logout: 'Log Out',
    loginError: 'Invalid email or password.',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    editItem: 'Edit Item',
    addNewItem: 'Add New Item',
    save: 'Save',
    delete: 'Delete',
    itemName: 'Item Name',
    price: 'Price',
    category: 'Category',
    adminNotConfigured: 'Admin requires Supabase configuration. Use PIN 1234 for demo mode.',
    enterPin: 'Enter PIN',
    
    // Footer
    footer: '© 2026 World Taza | عالم طازة. All rights reserved.',
    
    // Misc
    sendingTo: 'Sending to',
    pickupDelivery: 'Pickup / Delivery',
    pickupOnlyLabel: 'Pickup Only',
    changeBranch: 'Change Branch',
    orderFrom: 'Order from',
    imageReference: 'Image for reference only.',
  },
  ar: {
    // Brand  
    brandName: 'عالم طازة',
    brandNameAr: 'عالم طازة',
    brandFull: 'عالم طازة | World Taza',
    tagline: 'الطعم يبدأ هنا',
    taglineAr: 'الطعم يبدأ هنا',
    since: 'منذ 2004',
    
    // Branch Selection & Hero
    selectBranch: 'اختر فرعك',
    selectBranchDesc: 'اختر أقرب فرع عالم طازة لبدء طلبك.',
    selectBranchAndOrder: 'اختر فرعك واطلب.',
    orderFromBranchDesc: 'ابحث في المنيو، أضف الأصناف، وأرسل طلبك مباشرة إلى فرع عالم طازة المختار عبر واتساب.',
    ourBranches: 'فروعنا في جدة',
    browseMenuNotice: 'عرض المنيو الكامل. اختر فرعاً أعلاه لبدء الطلب.',
    selectBranchToOrderPrompt: 'يرجى اختيار الفرع أولاً لإضافة الأصناف والطلب.',
    startOrder: 'ابدأ الطلب',
    viewBranches: 'عرض الفروع',
    deliveryAvailable: 'التوصيل متوفر',
    pickupOnly: 'استلام فقط',
    
    // Header
    call: 'اتصال',
    whatsapp: 'واتساب',
    switchLang: 'English',
    
    // Menu
    menuTitle: 'المنيو',
    searchPlaceholder: 'ابحث عن بروست، زنجر، بطاطس...',
    all: 'الكل',
    noMatch: 'لا توجد نتيجة مطابقة.',
    soldOut: 'غير متوفر',
    addItem: 'إضافة',
    addToCart: 'إضافة إلى السلة',
    from: 'من',
    
    // Flavors
    normal: 'عادي',
    spicy: 'حراق',
    
    // Variants
    regular: 'عادي',
    sandwich: 'ساندوتش',
    meal: 'وجبة',
    small: 'صغير',
    medium: 'وسط',
    large: 'كبير',
    half: 'نصف',
    full: 'كامل',
    
    // Cart
    yourOrder: 'طلبك',
    cartEmpty: 'السلة فارغة. تصفح المنيو وأضف الأصناف.',
    cartItems: 'أصناف',
    viewOrder: 'عرض الطلب',
    subtotal: 'المجموع',
    deliveryFee: 'رسوم التوصيل',
    total: 'الإجمالي',
    free: 'مجاناً',
    clearCart: 'مسح السلة',
    sendOrder: 'إرسال الطلب',
    clearCartConfirm: 'مسح جميع الأصناف من السلة؟',
    
    // Checkout
    chooseOrderType: 'أكمل طلبك',
    serviceType: 'نوع الخدمة',
    pickup: 'استلام من الفرع',
    delivery: 'توصيل',
    customerName: 'اسمك',
    customerNamePlaceholder: 'اكتب اسمك',
    phoneNumber: 'رقم الجوال',
    phonePlaceholder: '05XXXXXXXX',
    buildingDetails: 'تفاصيل المبنى والعنوان',
    buildingPlaceholder: 'المبنى، الدور، الشقة، علامة قريبة',
    locationLink: 'رابط الموقع من خرائط جوجل',
    locationPlaceholder: 'الصق رابط خرائط جوجل',
    willShareLocation: 'سأرسل موقعي الحالي عبر واتساب',
    sendToWhatsapp: 'إرسال إلى واتساب',
    cancel: 'إلغاء',
    payment: 'طريقة الدفع',
    cash: 'كاش',
    card: 'بطاقة',
    
    // Delivery messages
    deliveryUnavailable: 'التوصيل غير متوفر لهذا الفرع. يرجى اختيار الاستلام.',
    deliveryReady: 'التوصيل ضمن 4 كم. الحد الأدنى 30 ريال. رسوم التوصيل 5 ريال (مجاناً فوق 100 ريال).',
    deliveryMinimum: 'الحد الأدنى للتوصيل 30 ريال. أضف أصناف أخرى أو اختر الاستلام.',
    pickupReady: 'سيتم تجهيز طلبك للاستلام من الفرع.',
    
    // Validation
    nameRequired: 'يرجى إدخال اسمك.',
    phoneRequired: 'يرجى إدخال رقم جوال سعودي صحيح.',
    phoneInvalid: 'صيغة الرقم غير صحيحة. استخدم 05XXXXXXXX أو 9665XXXXXXXX+.',
    addressRequired: 'يرجى إدخال عنوان التوصيل.',
    
    // Branch switch
    switchBranchTitle: 'تغيير الفرع؟',
    switchBranchMessage: 'تغيير الفرع سيمسح السلة الحالية. هل تريد المتابعة؟',
    confirm: 'نعم، غيّر',
    keepCurrent: 'الإبقاء على الحالي',
    
    // Admin
    adminTitle: 'مدير عالم طازة',
    adminLogin: 'دخول المدير',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    loginError: 'بريد إلكتروني أو كلمة مرور غير صحيحة.',
    inStock: 'متوفر',
    outOfStock: 'غير متوفر',
    editItem: 'تعديل الصنف',
    addNewItem: 'إضافة صنف جديد',
    save: 'حفظ',
    delete: 'حذف',
    itemName: 'اسم الصنف',
    price: 'السعر',
    category: 'الفئة',
    adminNotConfigured: 'المدير يتطلب إعداد Supabase. استخدم الرمز 1234 للوضع التجريبي.',
    enterPin: 'أدخل الرمز',
    
    // Footer
    footer: '© 2026 World Taza | عالم طازة. جميع الحقوق محفوظة.',
    
    // Misc
    sendingTo: 'الإرسال إلى',
    pickupDelivery: 'استلام / توصيل',
    pickupOnlyLabel: 'استلام فقط',
    changeBranch: 'تغيير الفرع',
    orderFrom: 'اطلب من',
    imageReference: 'الصورة للمرجع فقط.',
  },
} as const

export type Language = 'en' | 'ar'

export function useTranslation() {
  const language = useLanguageStore((s) => s.language)
  const t = (key: TranslationKey): string => {
    return translations[language][key] ?? translations.en[key] ?? key
  }
  return { t, language }
}

export function getTranslation(language: Language, key: TranslationKey): string {
  return translations[language][key] ?? translations.en[key] ?? key
}

export function formatMoney(value: number): string {
  return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)} SAR`
}

export function formatPhone(phone: string): string {
  return phone.replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
}
