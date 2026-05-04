# Задача
Полностью переработать лендинг WhatsDo (whatsdo.com) на основе материалов из питч-деков и встреч с фаундером. Текущая v3 потеряла главное: связную историю продукта. Сейчас у нас есть весь нужный контент — нужно собрать из него лендинг, который объясняет продукт за один скролл.

# О продукте (для понимания контекста)

WhatsDo — execution layer для AI. AI-агенты могут думать, но не могут действовать. WhatsDo даёт им единый API, чтобы бронировать, платить, подтверждать и координировать реальные услуги.

Три аудитории, три разных способа работы с лендингом:

1. **Кастомер** — пришёл по QR-коду, хочет сразу попробовать чат, который умеет действовать. Решение: большая кнопка/инпут в hero, запускает WhatsDo-чат.

2. **Бизнес** — владелец ресторана/салона/студии или инвестор. Скроллит, читает, изучает. Решение: основной контент страницы — для него.

3. **Девелопер** — хочет интегрироваться. API пока не готов. Решение: маленький waitlist-блок ближе к концу. Email-капча.

# Тон

Смелый, уверенный. Никаких хеджей вроде "we aim to" или "we hope to". Утверждения. В духе "новый Stripe для эпохи AI".

# СТРУКТУРА ЛЕНДИНГА

## Section 1: Hero — большой чат-инпут для кастомера

Hero занимает 100vh. Никаких табов с переключением аудиторий. Никаких лайфстайл-фотографий.

**H1 (одна короткая строка):**
"AI can plan it. Now it can do it."

(Альтернатива для теста: "Your AI can think. Now it can act.")

**Sub (одна строка):**
"WhatsDo is the execution layer that turns AI decisions into real-world actions — book, pay, confirm, all in one call."

**Главный элемент — большой текстовый инпут в стиле ChatGPT:**

```
┌──────────────────────────────────────────┐
│ 💬                                        │
│ Book a table for 2 tonight at 7:30...   │
│                                       → │
└──────────────────────────────────────────┘
```

- Placeholder ротируется каждые 2-3 секунды:
  · "Book a table for 2 tonight at 7:30..."
  · "Schedule a haircut next Friday afternoon..."
  · "Order pad thai for delivery in 30 min..."
  · "Reserve a Vinyasa class for Saturday..."
  · "Get tickets for Dune at 8pm..."
  · "Book the rooftop for 30 people Friday..."
  · "Call a Waymo to SF MoMA..."
  · "Send $20 on Venmo to Maria..."

- При клике/фокусе → запускается WhatsDo-чат (модал или /chat). Если бэкенд не готов, делаем заглушку: "Coming soon — drop your email" с email-капчей.

**Под инпутом мелким шрифтом:**
"Works with ChatGPT · Claude · Gemini · Perplexity"

**Маленький якорь снизу:** "↓ For business owners"

## Section 2: Удар проблемы — "AI can recommend, but it cannot act."

Это **ключевой emotional hook** всей страницы. Берём напрямую из Uber-деки.

**Layout:** двухколоночный. Слева — текст, справа — phone-мокап.

**Слева (крупный заголовок):**
"AI can recommend, 
but it cannot act."

**Подзаголовок:**
"AI suggests where to go but cannot book, pay, or coordinate logistics. Every action still requires manual completion."

**Справа — phone-мокап с чатом:**

В мокапе пользователь пишет команды, AI отвечает, что не может:

```
User: "Call a Waymo to SF MoMA"
AI: "I can't call rides."

User: "Book a table at Gjelina"
AI: "I can't make reservations."

User: "Send $20 on Venmo"
AI: "I can't access payment apps."

User: ":("
```

Стиль чата: тёмный фон телефона, белый текст. Минималистично. Грустный смайл в конце — человеческая деталь, которая бьёт.

**Под мокапом / под текстом — переход:**
Чёрная разделительная линия + маленький bold:
"WhatsDo: The Execution Layer"
"Book → Pay → Confirm → Coordinate through a single, unified API."

## Section 3: The Paradigm Shift

Полноширинный блок с двумя колонками "Old World" vs "New World".

**Заголовок секции:**
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

Слева — серый, скучный. Справа — чёрный, акцентный. Контраст должен быть визуально считываемым.

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

Это ответ на запрос фаундера про мозаику индустрий.

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

Карточки оживают: цифры тикают, прилетают новые записи ("just now → 2 min ago → 5 min ago"). Создаёт ощущение живого потока заказов от AI.

Если оживление сложно — статичные карточки тоже OK.

## Section 6: Dashboard mockup — что видит бизнес у себя

Это визуализация того, как WhatsDo выглядит для бизнеса. Стилизованный мокап админ-панели — НЕ скриншот реального продукта.

**Заголовок:**
"This is what your dashboard looks like."

**Sub:**
"Every booking from every AI agent — confirmed, paid, in one place. No new tools. No replacing your stack."

**Мокап — таблица "Today's bookings · ● Live":**

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
│  👤  Walk-in · 8:00 PM             $0           │
│      Direct · 12 min ago           Pending       │
├──────────────────────────────────────────────────┤
│  🤖  Yoga class · Sun 10 AM        $25 paid     │
│      via AI · 18 min ago           Confirmed     │
└──────────────────────────────────────────────────┘
```

Иконка 🤖 для AI-бронирований, 👤 для обычных — показывает соотношение и подсвечивает новый канал.

## Section 7: How it works — 4 шага

Берём структуру из Uber-деки.

**Заголовок:**
"A seamless, fully automated flow."
**Sub:** "No app switching. No friction."

**Четыре шага в столбик или в линию:**

01 — **AI Intent Capture**
User expresses a real-world need to their preferred AI agent.

02 — **Intelligent Decisioning**
AI agent determines the best course of action and logistics.

03 — **Unified Execution**
WhatsDo API triggers the booking and handles the payment.

04 — **Real-world Fulfillment**
Service provider executes, completing the loop.

Стиль: чёрная вертикальная линия слева, номер шага, заголовок, описание. Минималистично.

## Section 8: Works with every AI assistant

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

## Section 9: Use Cases carousel

Оставить расширенную карусель из v3 (12 индустрий + Anything else через Merchant SDK). Она там сделана хорошо.

Только починить два бага:
- "Restaurants" описание — сейчас текст про йогу/фитнес, поправить на нормальное про рестораны.
- "Local services" и "Home services" — сейчас идентичный контент (Mira Cleaning). Выбрать одну индустрию или развести по разным примерам.

## Section 10: Metrics — TAM/SAM/SOM

Заменить нынешние "1B+ / 100M+ / $15T+" на более правдивые цифры из питч-дека:

**Заголовок:** "A multi-trillion-dollar shift."

**Три цифры:**
- **$15T+** — U.S. Services Economy (TAM)
- **$1.7T** — High-frequency, AI-executable categories (SAM)
- **$8B-$15B** — Projected GTV at 0.5-1% capture (SOM)

Подпись: "Sources: FRED/BEA, National Restaurant Association, Live Nation, IBISWorld."

## Section 11: Why now — three forces converging

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

## Section 12: Infrastructure for AI execution

Оставить как в v3 — четыре технических pillara:
- Secure payment infrastructure
- Real-time signals
- Agent-ready API
- Scalable network

## Section 13: Built by — credibility block (НОВАЯ СЕКЦИЯ)

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

Стиль: маленькое фото (если есть) или просто инициалы в круге, имя, роль, регалии. Можно линкнуть LinkedIn.

## Section 14: FAQ

**Заголовок:** "Common questions" (НЕ "How it works for your business" — это сейчас баг, дублирует другую секцию).

**Q: What is WhatsDo?**
A: WhatsDo is the execution layer for AI agents. It lets autonomous assistants book, order, and pay for real-world services on behalf of users — with availability, pricing, and confirmation handled in a single API call.

(В v3 на этот вопрос дан неверный ответ из секции Infrastructure — исправить.)

**Q: How is it different from Stripe or booking platforms?**
A: Stripe handles payments. Booking platforms handle scheduling. WhatsDo unifies discovery, booking, payment, and confirmation in one call — built specifically for autonomous AI agents.

**Q: How do AI agents interact with my business?**
A: Agents call our REST/streaming API; you receive structured booking events on your existing system — POS, calendar, PMS.

**Q: How hard is integration?**
A: Most merchants are live in under a day with our SDKs and pre-built connectors.

**Q: Is it secure and compliant?**
A: PCI-DSS Level 1, SOC 2 Type II, and 3-D Secure across all card transactions.

## Section 15: Developer waitlist (маленький блок)

Узкая полоса, не отдельный экран.

**Заголовок:** "Building on WhatsDo? Docs are in active development."

**Sub:** "REST + streaming API, sandbox, and SDKs. Built for developers shipping the next layer of the AI stack."

**Email-инпут + кнопка:** "Get early access"

**Микрокопи:** "We'll reach out personally when docs are ready."

## Section 16: Final CTA

Оставить как есть в v3.
"Let AI agents book, order, and pay for your services."
CTAs: "Get started" / "How it works".

# ЧТО УДАЛИТЬ ИЗ V3

- Нынешний hero-заголовок "People won't browse websites anymore" на первом экране — переезжает в манифест-секцию (Section 4).
- Hero-карусель с лайфстайл-фотографиями (йога с гантелями, гора с Дюной) — удалить полностью.
- Секция "Three sides of one network" с табами внизу — удалить, логика трёх аудиторий теперь распределена по странице:
  · Customer обслуживается hero-инпутом.
  · Business — основным контентом.
  · Developer — мини-секцией Section 15.

# ТЕХНИЧЕСКИЕ ТРЕБОВАНИЯ

- WhatsDo пишется только так — слитно, без апострофа. В коде, alt-текстах, мета-тегах, везде одинаково.
- Цветовая палитра: бежевый #F6EFE5 (фон), чёрный, белый. Чёрные секции для Solution и Why Now.
- Типографика — оставить текущую.
- Hero-инпут поведение: при клике запускает WhatsDo-чат. Если бэкенд не готов — модал "Coming soon, leave email".
- Phone-мокап в Section 2 — статичный SVG, не анимация. Можно чёрный градиентный фон у phone frame.
- Дашборд-мокап в Section 6 — стилизованная HTML-таблица в палитре сайта, не скриншот.
- Мобильная адаптация: phone-мокап и dashboard-мокап скейлятся, мозаика становится 2-в-ряд, founders block становится горизонтальным скроллом.

# ФОРМАТ ВЫВОДА

1. Сначала покажи план: какие секции добавляются, удаляются, меняются местами относительно v3.
2. Потом — код по секциям.
3. Если нужны уточнения по визуалу phone-мокапа в Section 2 или dashboard-мокапа в Section 6 — задай вопросы до начала работы.
