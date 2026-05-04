# Задача
Переработать главный экран лендинга WhatsDo (whatsdo.com) под business-first подход. Текущая v3-v4 пытались обслужить три аудитории на одной странице, и это не сработало — посетитель не понимает, на кого ориентирован сайт. Решение: главная только для бизнеса, для других аудиторий — отдельные точки входа из шапки.

# Стратегический контекст

WhatsDo — execution layer для AI. AI-агенты могут думать, но не могут действовать. WhatsDo даёт им единый API, чтобы бронировать, платить, подтверждать и координировать реальные услуги.

Три аудитории, три разных сценария — НО на главной обслуживаем только бизнес:

1. **Бизнес (главная аудитория главной страницы)** — владельцы ресторанов, салонов, студий, отелей, инвесторы. Скроллят, читают, оценивают. Главная страница — для них.

2. **Кастомер** — пришёл по QR-коду, хочет попробовать чат. Живёт на отдельной странице `/try`. С главной туда ведёт кнопка «Try the chat» в хедере.

3. **Девелопер** — хочет API, его пока нет. Живёт на отдельной странице `/developers` с waitlist. С главной туда ведёт ссылка «For developers».

# Хедер — две главные кнопки + одна ссылка

Структура шапки:

```
┌─────────────────────────────────────────────────────────────────────┐
│  WhatsDo    How it works   Use cases   For developers       [Try the chat]  [Get started]  │
└─────────────────────────────────────────────────────────────────────┘
```

- **«Try the chat»** — вторичная кнопка (outline). Ведёт на `/try`.
- **«Get started»** — основная кнопка (filled, чёрная). Ведёт на онбординг бизнеса (форма / Talk to sales).
- **«For developers»** — текстовая ссылка в навигации. Ведёт на `/developers`.

# Тон

Смелый, уверенный, B2B-инфраструктурный. Никаких хеджей вроде "we aim to" или "we hope to". Утверждения. Тон Stripe — конкретно, по делу, без философии в hero.

# СТРУКТУРА ГЛАВНОЙ

## Section 1: Hero — конкретный B2B-оффер

Hero занимает 100vh. Никаких чат-инпутов. Никаких лайфстайл-фотографий. Никаких манифестов про будущее AI на первом экране.

**H1 (одна строка, конкретно про продукт):**
"The execution layer for AI agents."

**Sub (одна-две строки, объясняет функцию):**
"WhatsDo lets AI agents discover, book, and pay for your services through a single API. Bookings come pre-paid, in real time, into the tools you already use."

**CTA — две кнопки:**
- Primary: "Get started" (ведёт на онбординг)
- Secondary: "Talk to sales" или "See how it works" (ведёт ниже на How it works)

**Визуал hero справа — мокап дашборда бизнеса:**

Стилизованный мокап админ-панели "Today's bookings · ● Live", через который видно входящие AI-бронирования в реальном времени. НЕ скриншот реального продукта — иллюстративный мокап в стиле Stripe / Linear / Square. Минималистичный, в палитре сайта.

```
┌──────────────────────────────────────────────────┐
│  Today's bookings                       ● Live   │
├──────────────────────────────────────────────────┤
│  🤖  Table for 2 · 7:30 PM         $0 hold      │
│      via AI · 2 min ago            Confirmed     │
├──────────────────────────────────────────────────┤
│  🤖  Haircut · Sat 2:00 PM         $45 paid     │
│      via AI · 5 min ago            Confirmed     │
├──────────────────────────────────────────────────┤
│  🤖  Yoga class · Sun 10 AM        $25 paid     │
│      via AI · 18 min ago           Confirmed     │
├──────────────────────────────────────────────────┤
│  👤  Walk-in · 8:00 PM             $0           │
│      Direct · 12 min ago           Pending       │
└──────────────────────────────────────────────────┘
```

Иконка 🤖 для AI-бронирований, 👤 для обычных. Цифры тикают, иногда сверху прилетает новая запись (раз в 10-15 секунд).

**Под hero — маленькая полоска с логотипами AI-ассистентов:**
"Works with ChatGPT · Claude · Gemini · Perplexity"

## Section 2: Удар проблемы — "AI can recommend, but it cannot act."

Двухколоночный layout. Слева текст, справа phone-мокап.

**Слева (крупный заголовок):**
"AI can recommend, 
but it cannot act."

**Подзаголовок:**
"AI suggests where to go but cannot book, pay, or coordinate logistics. Every action still requires manual completion. We fix that."

**Справа — phone-мокап (минималистичный чёрный фрейм с notch):**

Чат-сцена, где AI не может выполнить действия:
```
User: "Call a Waymo to SF MoMA"
AI: "I can't call rides."

User: "Book a table at Gjelina"
AI: "I can't make reservations."

User: "Send $20 on Venmo"
AI: "I can't access payment apps."

User: ":("
```

Тёмный фон телефона, белый текст. Грустный смайл в конце — человеческая деталь.

**Под мокапом — переход:**
Чёрная разделительная линия + bold:
"WhatsDo: The Execution Layer"
"Book → Pay → Confirm → Coordinate through a single, unified API."

## Section 3: The Paradigm Shift

Полноширинный блок.

**Заголовок:**
"From thinking to doing."

**Подзаголовок:**
"AI is shifting how demand is captured. The next layer isn't recommendations — it's execution."

**Двухколоночная сетка:**

```
┌─────────────────────────────────────┬──────────────────────────────────────┐
│ OLD WORLD                           │ NEW WORLD                            │
│                                     │                                      │
│ Search → Click → Book → Pay         │ Intent → AI Decides → AI Executes    │
│                                     │                                      │
│ User executes every step.           │ User approves once.                  │
└─────────────────────────────────────┴──────────────────────────────────────┘
```

Слева — серый, скучный. Справа — чёрный, акцентный.

**Под блоком:**
"This isn't a feature. It's a shift in how demand is captured."

## Section 4: Manifest — "People won't browse websites anymore"

Полноширинная секция, минималистичная, крупная типографика.

**H1:**
"People won't browse websites anymore. 
They'll ask their AI."

**Sub:**
"We're not another marketing channel. We're the rails AI agents use to actually transact."

Никаких иконок, никаких графиков. Только текст. Один экран.

## Section 5: For business — мозаика "что они получают"

**Заголовок:**
"Every AI decision is a customer reaching you."

**Sub:**
"Bookings come pre-paid, in real time, from any AI assistant — landing in tools you already use."

**Мозаика — сетка карточек (3-4 в ряд, 8-12 всего):**

Каждая карточка — короткая микро-сцена "получения":
- 🍽 Ristorante Lina — "Table for 2 booked · $0 hold · 7:30 PM"
- ✂ Studio Nord — "Haircut booked · $45 paid · Sat 2 PM"
- 🧘 Sky Yoga — "Class reserved · $25 paid · Sun 10 AM"
- 🎬 IMAX Downtown — "2 tickets · $34 paid · 8 PM tonight"
- 🍝 Night+Market — "Pad thai delivery · $28 · 32 min away"
- 🏠 Mira Cleaning — "Deep clean booked · $120 paid · Fri 9 AM"
- 🎫 The Highline — "Rooftop · 30 people · $1,200 hold · Fri 7 PM"
- 🚕 Uber — "Ride to SFMoMA · $18 · 5 min away"
- 🩺 Dr. Park Clinic — "Consult · $200 · Wed 11:15 AM"
- 🏨 Casa Marvila — "3 nights held · $480 · May 12-15"

Время тикает ("just now → 2 min ago → 5 min ago"), иногда прилетает новая карточка сверху (раз в 10-15 секунд). Создаёт ощущение живого потока.

## Section 6: How it works — 4 шага

**Заголовок:**
"A seamless, fully automated flow."
**Sub:** "No app switching. No friction."

**Четыре шага в линию:**

01 — **AI Intent Capture**
User expresses a real-world need to their preferred AI agent.

02 — **Intelligent Decisioning**
AI agent determines the best course of action and logistics.

03 — **Unified Execution**
WhatsDo API triggers the booking and handles the payment.

04 — **Real-world Fulfillment**
Service provider executes, completing the loop.

Стиль: чёрная вертикальная линия слева, номер шага, заголовок, описание.

## Section 7: Works with every AI assistant

Чёрная секция (как в v3).

**Заголовок:**
"Works with every AI assistant."

**Sub:**
"ChatGPT, Claude, Gemini, Perplexity — and any agent built on our API."

**Логотипы AI-ассистентов** (сохранить из v3).

**Под логотипами три капабилити:**
- New customer channel — Get discovered by every major AI assistant.
- Bookings & payments — Pre-paid, real-time, automatic.
- Real-time availability — Stays in sync with your existing system.

## Section 8: Use Cases carousel

Расширенная карусель индустрий из v3 (12 индустрий + Anything else через Merchant SDK).

**Починить два бага из v3:**
- "Restaurants" описание сейчас про йогу/фитнес — поправить на нормальный рестораный сценарий.
- "Local services" и "Home services" сейчас идентичный контент (Mira Cleaning) — выбрать одну индустрию или развести по разным примерам.

## Section 9: Metrics — TAM/SAM/SOM

Заменить нынешние "1B+ / 100M+ / $15T+" на правдивые цифры из питч-дека:

**Заголовок:** "A multi-trillion-dollar shift."

**Три цифры:**
- **$15T+** — U.S. Services Economy (TAM)
- **$1.7T** — High-frequency, AI-executable categories (SAM)
- **$8B-$15B** — Projected GTV at 0.5-1% capture (SOM)

Подпись: "Sources: FRED/BEA, National Restaurant Association, Live Nation, IBISWorld."

## Section 10: Why now — three forces converging

**Заголовок:**
"Why now."

**Три колонки:**

01 — **The agent explosion**
ChatGPT, Claude, Gemini and others have a billion+ users. AI agents are becoming the default interface for discovery.

02 — **APIs and payments matured**
Stripe, modern booking systems, and structured APIs make agent-driven commerce technically possible for the first time.

03 — **Users want delegation**
The shift from interaction to delegation is happening. Users want outcomes, not interfaces.

**Под блоком:**
"This is a once-in-a-decade platform opportunity. Whoever owns execution captures the demand."

## Section 11: Infrastructure for AI execution

Оставить как в v3 — четыре технических pillara:
- Secure payment infrastructure
- Real-time signals
- Agent-ready API
- Scalable network

## Section 12: Built by — credibility block

**Заголовок:**
"Built by operators who've shipped at scale."

**Карточки фаундеров (компактные, в одну линию):**

- **Evgeniy Kabanov** · Founder · 25+ years · Kea Bank, Puller, Palladium
- **Stanislav Veretennikov** · CTO · ex-Meta, Cherry Labs
- **Olga Leskova** · CPO · ex-Nuvolo (1 exit)
- **Yulia Tarasova** · COO · ex-Picsart, XOR AI, Praktika.AI
- **Vitaly Tkachenko** · Head of Design · ex-Walmart, Kea Bank
- **Alex Rassanov** · Sr. Engineer · ex-Dell
- **Artem Trifaniuk** · Full-Stack Engineer · ex-Siena AI

Стиль: маленькое фото или инициалы в круге, имя, роль, регалии. Линкуется на LinkedIn.

## Section 13: FAQ

**Заголовок:** "Common questions" (НЕ "How it works for your business" — это сейчас баг, дублирует другую секцию).

**Q: What is WhatsDo?**
A: WhatsDo is the execution layer for AI agents. It lets autonomous assistants book, order, and pay for real-world services on behalf of users — with availability, pricing, and confirmation handled in a single API call.

**Q: How is it different from Stripe or booking platforms?**
A: Stripe handles payments. Booking platforms handle scheduling. WhatsDo unifies discovery, booking, payment, and confirmation in one call — built specifically for autonomous AI agents.

**Q: How do AI agents interact with my business?**
A: Agents call our REST/streaming API; you receive structured booking events on your existing system — POS, calendar, PMS.

**Q: How hard is integration?**
A: Most merchants are live in under a day with our SDKs and pre-built connectors.

**Q: Is it secure and compliant?**
A: PCI-DSS Level 1, SOC 2 Type II, and 3-D Secure across all card transactions.

## Section 14: Final CTA

**Заголовок:**
"Let AI agents book, order, and pay for your services."

**Две кнопки:**
- Primary: "Get started"
- Secondary: "Talk to sales"

# ЧТО УДАЛИТЬ ИЗ ТЕКУЩЕЙ ВЕРСИИ

- Hero-заголовок "AI can plan it. Now it can do it." — заменить на конкретный про продукт ("The execution layer for AI agents").
- Hero чат-инпут — удалить полностью. Чат живёт на /try, ссылка из хедера.
- "For business owners ↓" якорь — больше не нужен, главная и так для бизнеса.
- Карусель индустрий с лайфстайл-фото в hero (если она там осталась) — удалить.
- Любые упоминания "Three sides of one network" / "For customers / business / developers" табов — удалить, логика перенесена в хедер с двумя кнопками + ссылку на /developers.
- Hero-инпут с placeholder-ротацией — удалить, его логика теперь живёт на /try.

# СТРАНИЦЫ /TRY И /DEVELOPERS

В этой итерации НЕ делаем — только заглушки роутов, которые ведут на пустые страницы с надписью "Coming soon". Полные страницы соберём отдельно. Главное сейчас — что ссылки в хедере и кнопки ведут на правильные URL.

# ТЕХНИЧЕСКИЕ ТРЕБОВАНИЯ

- WhatsDo пишется только так — слитно, без апострофа. В коде, alt-текстах, мета-тегах, везде одинаково.
- Цветовая палитра: бежевый #F6EFE5 (фон), чёрный, белый. Чёрные секции для Solution и Why Now.
- Типографика — оставить текущую.
- Phone-мокап в Section 2 — статичный SVG. Минималистичный чёрный фрейм с notch (iOS-style).
- Дашборд-мокап в hero и в Section 6 — стилизованная HTML-таблица в палитре сайта, не скриншот.
- Мозаика в Section 5 — карточки с тикающим временем, новая карточка прилетает раз в 10-15 секунд (неназойливо).
- Мобильная адаптация: дашборд-мокап скейлится, мозаика становится 1-2 в ряд, founders block — горизонтальный скролл.

# ФОРМАТ ВЫВОДА

1. Сначала покажи план: что меняется в hero, какие секции добавляются/удаляются, как работают ссылки в хедере.
2. Потом — код.
3. Если есть сомнения по визуалу дашборд-мокапа в hero — задай вопросы до начала работы.
